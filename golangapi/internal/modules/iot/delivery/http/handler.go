package http

import (
	"context"
	"encoding/json"
	"icmongolang/config"
	"icmongolang/internal/modules/iot/presenter"
	"icmongolang/internal/modules/iot/usecase"
	"icmongolang/pkg/helpers"
	"icmongolang/pkg/httpErrors"
	"icmongolang/pkg/logger"
	"icmongolang/pkg/responses"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/go-chi/render"
)

type Configuration struct {
	cfg *config.Config
}

// Cache interface (same as MQTT handler)
type Cache interface {
	Get(ctx context.Context, key string, dst interface{}) error
	Set(ctx context.Context, key string, value interface{}, ttl time.Duration) error
}

type cachedTopicData struct {
	Data     []byte    `json:"data"`
	CachedAt time.Time `json:"cached_at"`
}

type MQTT3Handler struct {
	uc     usecase.MQTT3UseCase
	cfg    *config.Config
	logger logger.Logger
	cache  Cache
}

func NewMQTT3Handler(uc usecase.MQTT3UseCase, log logger.Logger, cache Cache) *MQTT3Handler {
	return &MQTT3Handler{uc: uc, logger: log, cache: cache}
}

// -------------------- GetTopicData (request-response with cache) --------------------
// GetTopicData godoc
// @Summary      Get live or cached MQTT topic data
// @Description  Subscribes to the given topic, waits for a single message, then unsubscribes. Caches the result for 60 seconds.
// @Description  Use &delcache=1 to force deletion of the cached value and fetch a fresh payload.
// @Tags         iot
// @Accept       json
// @Produce      json
// @Param        topic query string true "MQTT topic name (e.g. BAACTW05/DATA)"
// @Param        delcache query string false "Delete cache (1 to delete)" Enums(1)
// @Success      200 {object} responses.SwaggerSuccessResponse
// @Failure      400 {object} responses.ErrorResponse
// @Failure      500 {object} responses.ErrorResponse
// @Router       /iot/topic [get]
func (h *MQTT3Handler) GetTopicData(w http.ResponseWriter, r *http.Request) {
	startTime := time.Now()
	topic := strings.TrimSpace(r.URL.Query().Get("topic"))
	if topic == "" {
		h.logger.Warn("GetTopicData: missing topic parameter")
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusBadRequest, "topic is required")))
		return
	}
	delCache := r.URL.Query().Get("delcache") == "1"

	h.logger.Infof("GetTopicData: topic=%s, delCache=%v", topic, delCache)

	TimeLoc := helpers.GetTimeLocation()
	mqttConnected := h.uc.IsConnected()
	cacheEnabled := h.uc.IsCacheEnabled() // you may need to add this method or just assume true

	// Fetch from use case (which handles its own Redis cache)
	resp, err := h.uc.GetTopicData(r.Context(), topic, delCache)
	if err != nil {
		h.logger.Errorf("GetTopicData: MQTT fetch failed: %v", err)
		// Check for timeout/deadline exceeded errors and provide a fallback
		errMsg := err.Error()
		if strings.Contains(errMsg, "timeout") || strings.Contains(errMsg, "deadline exceeded") {
			// Provide meaningful fake data as last resort (only if needed)
			fallbackData := []byte("30.50,80.5,25.50,75.5")
			render.Render(w, r, responses.CreateSuccessResponse(presenter.TopicDataResponse{
				Topic:         topic,
				Payload:       processPayload(fallbackData),
				From:          "fallback",
				Cache:         false,
				Timestamp:     time.Now().In(TimeLoc).Format("2006-01-02 15:04:05"),
				MqttConnected: mqttConnected,
				CacheEnabled:  cacheEnabled,
				ErrorDetail:   err.Error(),
			}))
			return
		}
		// Other errors (e.g., connection refused)
		render.Render(w, r, responses.CreateSuccessResponse(presenter.TopicDataResponse{
			Topic:         topic,
			Payload:       nil,
			From:          "error",
			Cache:         false,
			Timestamp:     time.Now().In(TimeLoc).Format("2006-01-02 15:04:05"),
			MqttConnected: mqttConnected,
			CacheEnabled:  cacheEnabled,
			ErrorDetail:   err.Error(),
		}))
		return
	}

	// Add extra fields for response
	resp.Timestamp = time.Now().In(TimeLoc).Format("2006-01-02 15:04:05")
	resp.MqttConnected = mqttConnected
	resp.CacheEnabled = cacheEnabled

	render.Render(w, r, responses.CreateSuccessResponse(resp))
	h.logger.Infof("GetTopicData: completed in %dms", time.Since(startTime).Milliseconds())
}

// GetTopicDataDeviceChart godoc
// @Summary      Get device chart data (historical) + latest MQTT payload
// @Description  Returns time‑series data from InfluxDB for the given topic/bucket,
// @Description  plus the most recent MQTT message received on that topic.
// @Description  Uses Redis cache for both parts (45s for chart, 10s for live payload).
// @Description  Use &delcache=1 to force deletion of all caches and fetch fresh data.
// @Tags         iot
// @Accept       json
// @Produce      json
// @Param        bucket    query string false "InfluxDB bucket name (e.g. AIRCOM1 default from topic)" default(AIRCOM1)
// @Param        topic     query string true  "MQTT topic (e.g. AIRCOM1/DATA)" default(AIRCOM1/DATA)
// @Param        measurement query string false "Measurement name (default 'temperature')" default(temperature)
// @Param        field     query string false "Field name (default 'value')" default(value)
// @Param        start     query string false "Start time (e.g. -10m, -1h, 2023-01-01T00:00:00Z)" default(-10m)
// @Param        stop      query string false "Stop time (default now())"
// @Param        limit     query int    false "Limit (default 100)" default(100)
// @Param        delcache  query string false "Delete all caches (1 to delete)" Enums(1)
// @Success      200 {object} responses.SwaggerSuccessResponse{data=map[string]interface{}}
// @Failure      400 {object} responses.ErrorResponse
// @Failure      500 {object} responses.ErrorResponse
// @Router       /iot/topicdevicechart [get]
func (h *MQTT3Handler) GetTopicDataDeviceChart(w http.ResponseWriter, r *http.Request) {
	startTime := time.Now()

	// Build request map from query parameters
	req := make(map[string]interface{})

	// Bucket (default: AIRCOM1)
	if bucket := strings.TrimSpace(r.URL.Query().Get("bucket")); bucket != "" {
		req["bucket"] = bucket
	} else {
		req["bucket"] = "AIRCOM1"
	}

	// Topic (required)
	topic := strings.TrimSpace(r.URL.Query().Get("topic"))
	if topic == "" {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusBadRequest, "topic is required")))
		return
	}
	req["topic"] = topic

	// Measurement (default: temperature)
	if measurement := strings.TrimSpace(r.URL.Query().Get("measurement")); measurement != "" {
		req["measurement"] = measurement
	} else {
		req["measurement"] = "temperature"
	}

	// Field (default: value)
	if field := strings.TrimSpace(r.URL.Query().Get("field")); field != "" {
		req["field"] = field
	} else {
		req["field"] = "value" // FIXED: was incorrectly setting measurement
	}

	// Start (default: -10m)
	if start := strings.TrimSpace(r.URL.Query().Get("start")); start != "" {
		req["start"] = start
	} else {
		req["start"] = "-10m"
	}

	// Stop (optional, default now() is handled by the use case)
	if stop := strings.TrimSpace(r.URL.Query().Get("stop")); stop != "" {
		req["stop"] = stop
	}
	// No error is returned when stop is missing – the use case will apply a default.

	// Limit (default: 100)
	limitStr := strings.TrimSpace(r.URL.Query().Get("limit"))
	if limitStr == "" {
		req["limit"] = 100
	} else if limit, err := strconv.Atoi(limitStr); err == nil && limit > 0 {
		req["limit"] = limit
	} else {
		// non‑numeric or <=0 → fallback to default 100
		req["limit"] = 100
	}

	// Delete cache flag
	if r.URL.Query().Get("delcache") == "1" {
		req["delcache"] = 1
	}

	h.logger.Infof("GetTopicDataDeviceChart: req=%+v", req)

	// Call the combined use case
	result, err := h.uc.GetTopicDataDeviceChart(r.Context(), req)
	if err != nil {
		h.logger.Errorf("GetTopicDataDeviceChart: use case error: %v", err)
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusInternalServerError, err.Error())))
		return
	}

	render.Render(w, r, responses.CreateSuccessResponse(result))
	h.logger.Infof("GetTopicDataDeviceChart: completed in %dms", time.Since(startTime).Milliseconds())
}

// -------------------- DeviceControls --------------------
// DeviceControls godoc
// @Summary      Send control command to an MQTT device via query parameters
// @Description  Publishes a control message to a topic (usually ending with CONTROL) using GET query params
// @Tags         iot
// @Accept       json
// @Produce      json
// @Param        topic query string true "MQTT topic name (e.g. BAACTW05/CONTROL)"
// @Param        message query string true "Control message (e.g., ON, OFF, 1, 0)"
// @Success      200 {object} responses.SwaggerSuccessResponse
// @Failure      400 {object} responses.ErrorResponse
// @Failure      500 {object} responses.ErrorResponse
// @Router       /iot/controls [get]
func (h *MQTT3Handler) DeviceControls(w http.ResponseWriter, r *http.Request) {
	topic := strings.TrimSpace(r.URL.Query().Get("topic"))
	if topic == "" {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusBadRequest, "topic is required")))
		return
	}
	message := strings.TrimSpace(r.URL.Query().Get("message"))
	if message == "" {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusBadRequest, "message is required")))
		return
	}
	req := &presenter.ControlRequest{
		Topic:   topic,
		Message: message,
	}
	if err := h.uc.DeviceControl(r.Context(), req); err != nil {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusInternalServerError, err.Error())))
		return
	}
	render.Render(w, r, responses.CreateSuccessResponse(map[string]string{"status": "ok", "statusCode": "200"}))
}

// -------------------- DeviceControl --------------------
// DeviceControl godoc
// @Summary      Send control command to an MQTT device
// @Description  Publishes a control message to a topic (usually ending with CONTROL)
// @Tags         iot
// @Accept       json
// @Produce      json
// @Param        request body presenter.ControlRequest true "Control request"
// @Success      200 {object} responses.SwaggerSuccessResponse
// @Failure      400 {object} responses.ErrorResponse
// @Failure      500 {object} responses.ErrorResponse
// @Security     OAuth2Password
// @Router       /iot/control [post]
func (h *MQTT3Handler) DeviceControl(w http.ResponseWriter, r *http.Request) {
	var req presenter.ControlRequest
	if err := render.DecodeJSON(r.Body, &req); err != nil {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.ErrValidation(err)))
		return
	}
	if err := h.uc.DeviceControl(r.Context(), &req); err != nil {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusInternalServerError, err.Error())))
		return
	}
	render.Render(w, r, responses.CreateSuccessResponse(map[string]string{"status": "ok"}))
}

// -------------------- GetDeviceList --------------------
// GetDeviceList godoc
// @Summary      List devices with pagination
// @Description  Returns a paginated list of devices
// @Tags         iot
// @Param        page query int false "Page number (default:1)"
// @Param        pageSize query int false "Items per page (default:10)"
// @Param        bucket query string false "Filter by bucket"
// @Param        hardware_id query int false "Filter by hardware ID"
// @Param        type_id query int false "Filter by device type ID"
// @Param        keyword query string false "Search keyword"
// @Param        lang query string false "Language (en/th)"
// @Success      200 {object} responses.SwaggerSuccessResponse
// @Failure      500 {object} responses.ErrorResponse
// @Security     OAuth2Password
// @Router       /iot/device [get]
func (h *MQTT3Handler) GetDeviceList(w http.ResponseWriter, r *http.Request) {
	page, _ := strconv.Atoi(r.URL.Query().Get("page"))
	pageSize, _ := strconv.Atoi(r.URL.Query().Get("pageSize"))
	if page <= 0 {
		page = 1
	}
	if pageSize <= 0 {
		pageSize = 1000
	}
	req := presenter.DeviceListRequest{
		Page:       page,
		PageSize:   pageSize,
		Bucket:     r.URL.Query().Get("bucket"),
		HardwareId: atoi(r.URL.Query().Get("hardware_id")),
		TypeId:     atoi(r.URL.Query().Get("type_id")),
		Keyword:    r.URL.Query().Get("keyword"),
		Lang:       r.URL.Query().Get("lang"),
	}
	devices, total, err := h.uc.GetDeviceList(r.Context(), &req)
	if err != nil {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusInternalServerError, err.Error())))
		return
	}

	// Calculate total pages
	totalPage := 0
	if pageSize > 0 && total > 0 {
		totalPage = int((total + int64(pageSize) - 1) / int64(pageSize))
	}

	render.Render(w, r, responses.CreateSuccessResponse(map[string]interface{}{
		"data":      devices,
		"total":     total,
		"page":      page,
		"pageSize":  pageSize,
		"totalPage": totalPage,
	}))
}

// GetDeviceBuckets godoc
// @Summary      Get devices by bucket
// @Description  Returns all devices belonging to a specific bucket
// @Tags         iot
// @Param        bucket query string true "Bucket name"
// @Success      200 {object} responses.SwaggerSuccessResponse
// @Failure      400 {object} responses.ErrorResponse
// @Failure      500 {object} responses.ErrorResponse
// @Security     OAuth2Password
// @Router       /iot/devicebuckets [get]
func (h *MQTT3Handler) GetDeviceBuckets(w http.ResponseWriter, r *http.Request) {
	bucket := r.URL.Query().Get("bucket")
	if bucket == "" {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusBadRequest, "bucket is required")))
		return
	}
	resp, err := h.uc.GetDeviceBuckets(r.Context(), bucket)
	if err != nil {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusInternalServerError, err.Error())))
		return
	}
	render.Render(w, r, responses.CreateSuccessResponse(resp))
}

// GetSenserCharts godoc
// @Summary      Get time-series chart data from InfluxDB
// @Description  Returns aggregated data points
// @Tags         iot
// @Param        bucket query string true "InfluxDB bucket"
// @Param        measurement query string true "Measurement name"
// @Param        field query string false "Field name (default:value)"
// @Param        start query string false "Start time"
// @Param        stop query string false "Stop time"
// @Param        limit query int false "Max points"
// @Success      200 {object} responses.SwaggerSuccessResponse
// @Failure      400 {object} responses.ErrorResponse
// @Failure      500 {object} responses.ErrorResponse
// @Security     OAuth2Password
// @Router       /iot/sensercharts [get]
func (h *MQTT3Handler) GetSenserCharts(w http.ResponseWriter, r *http.Request) {
	req := presenter.SenserChartRequest{
		Bucket:      r.URL.Query().Get("bucket"),
		Measurement: r.URL.Query().Get("measurement"),
		Field:       r.URL.Query().Get("field"),
		Start:       r.URL.Query().Get("start"),
		Stop:        r.URL.Query().Get("stop"),
		Limit:       atoi(r.URL.Query().Get("limit")),
	}
	if req.Bucket == "" || req.Measurement == "" {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusBadRequest, "bucket and measurement are required")))
		return
	}
	resp, err := h.uc.GetSenserCharts(r.Context(), &req)
	if err != nil {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusInternalServerError, err.Error())))
		return
	}
	render.Render(w, r, responses.CreateSuccessResponse(resp))
}

// GetDeviceByLocation godoc
// @Summary      Get devices by location ID
// @Description  Returns all devices that belong to a specific location
// @Tags         iot
// @Param        location_id query int true "Location ID"
// @Success      200 {object} responses.SwaggerSuccessResponse
// @Failure      400 {object} responses.ErrorResponse
// @Failure      500 {object} responses.ErrorResponse
// @Security     OAuth2Password
// @Router       /iot/locationdevice [get]
func (h *MQTT3Handler) GetDeviceByLocation(w http.ResponseWriter, r *http.Request) {
	locationID := atoi(r.URL.Query().Get("location_id"))
	if locationID == 0 {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusBadRequest, "location_id is required")))
		return
	}
	devices, err := h.uc.GetDeviceListByLocation(r.Context(), locationID)
	if err != nil {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusInternalServerError, err.Error())))
		return
	}
	render.Render(w, r, responses.CreateSuccessResponse(devices))
}

// GetDeviceSenserCharts godoc
// @Summary      Get device sensor chart data (alias for /iot/sensercharts)
// @Description  Alias for GetSenserCharts – returns time‑series chart data from InfluxDB for a specific device/sensor.
// @Description  This endpoint behaves identically to GET /iot/sensercharts.
// @Tags         iot
// @Accept       json
// @Produce      json
// @Param        bucket       query string true  "InfluxDB bucket name (e.g., AIRCOM1)"
// @Param        measurement  query string true  "Measurement name (e.g., temperature)"
// @Param        field        query string false "Field name (default: value)"
// @Param        start        query string false "Start time (e.g., -10m, -1h, RFC3339)"
// @Param        stop         query string false "Stop time (e.g., now(), RFC3339)"
// @Param        limit        query int    false "Maximum number of points (default: 100)"
// @Success      200 {object} responses.SwaggerSuccessResponse{data=presenter.SenserChartResponse}
// @Failure      400 {object} responses.ErrorResponse
// @Failure      500 {object} responses.ErrorResponse
// @Router       /iot/devicesensercharts [get]
func (h *MQTT3Handler) GetDeviceSenserCharts(w http.ResponseWriter, r *http.Request) {
	h.GetSenserCharts(w, r)
}

// GetAlarmDeviceStatus godoc
// @Summary      Get alarm status of devices
// @Description  Returns current alarm status for devices
// @Tags         iot
// @Param        bucket query string false "Filter by bucket"
// @Param        measurement query string false "Filter by measurement"
// @Param        device_id query int false "Filter by device ID"
// @Param        type_id query int false "Filter by device type ID"
// @Param        hardware_id query int false "Filter by hardware ID"
// @Param        page query int false "Page number (default:1)"
// @Param        pageSize query int false "Items per page (default:1000)"
// @Success      200 {object} responses.SwaggerSuccessResponse
// @Failure      500 {object} responses.ErrorResponse
// @Security     OAuth2Password
// @Router       /iot/alarmdevicestatus [get]
func (h *MQTT3Handler) GetAlarmDeviceStatus(w http.ResponseWriter, r *http.Request) {
	params := make(map[string]interface{})
	for k, v := range r.URL.Query() {
		if len(v) > 0 {
			params[k] = v[0]
		}
	}
	if page := r.URL.Query().Get("page"); page != "" {
		params["page"] = page
	}
	if pageSize := r.URL.Query().Get("pageSize"); pageSize != "" {
		params["pageSize"] = pageSize
	}

	if bucket := r.URL.Query().Get("bucket"); bucket != "" {
		params["bucket"] = bucket
	}

	if measurement := r.URL.Query().Get("measurement"); measurement != "" {
		params["measurement"] = measurement
	}

	if device_id := r.URL.Query().Get("device_id"); device_id != "" {
		params["device_id"] = device_id
	}

	if type_id := r.URL.Query().Get("type_id"); type_id != "" {
		params["type_id"] = type_id
	}

	if hardware_id := r.URL.Query().Get("hardware_id"); hardware_id != "" {
		params["hardware_id"] = hardware_id
	}

	if keyword := r.URL.Query().Get("keyword"); keyword != "" {
		params["keyword"] = keyword
	}

	resp, err := h.uc.GetAlarmDeviceStatus(r.Context(), params)
	if err != nil {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusInternalServerError, err.Error())))
		return
	}
	render.Render(w, r, responses.CreateSuccessResponse(resp))
}

// GetAlarmDeviceStatusControl godoc
// @Summary      Get alarm status with control information
// @Description  Returns alarm status and available control actions for each device
// @Tags         iot
// @Param        bucket query string false "Filter by bucket"
// @Param        device_id query int false "Filter by device ID"
// @Param        type_id query int false "Filter by device type ID"
// @Param        hardware_id query int false "Filter by hardware ID"
// @Success      200 {object} responses.SwaggerSuccessResponse
// @Failure      500 {object} responses.ErrorResponse
// @Security     OAuth2Password
// @Router       /iot/alarmdevicestatuscontrol [get]
func (h *MQTT3Handler) GetAlarmDeviceStatusControl(w http.ResponseWriter, r *http.Request) {
	params := make(map[string]interface{})
	for k, v := range r.URL.Query() {
		if len(v) > 0 {
			params[k] = v[0]
		}
	}
	resp, err := h.uc.GetAlarmDeviceStatusControl(r.Context(), params)
	if err != nil {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusInternalServerError, err.Error())))
		return
	}
	render.Render(w, r, responses.CreateSuccessResponse(resp))
}

// GetMonitorDeviceGroup godoc
// @Summary      Get device groups for monitoring dashboard
// @Description  Returns devices grouped by type/location
// @Tags         iot
// @Param        bucket query string true "Bucket name"
// @Param        location_id query int false "Filter by location ID"
// @Param        hardware_id query int false "Filter by hardware ID"
// @Param        lang query string false "Filter by lang"
// @Param        delcache query int 0 "Set delcache"
// @Success      200 {object} responses.SwaggerSuccessResponse
// @Failure      500 {object} responses.ErrorResponse
// @Router       /iot/monitordevicegroup [get]
func (h *MQTT3Handler) GetMonitorDeviceGroup(w http.ResponseWriter, r *http.Request) {
	params := make(map[string]interface{})
	for k, v := range r.URL.Query() {
		if len(v) > 0 {
			params[k] = v[0]
		}
	}
	resp, err := h.uc.GetMonitorDeviceGroup(r.Context(), params)
	if err != nil {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusInternalServerError, err.Error())))
		return
	}
	render.Render(w, r, responses.CreateSuccessResponse(resp))
}

// GetMonitorDeviceChart godoc
// @Summary      Get chart data for monitoring dashboard
// @Description  Returns time‑series data for devices in a group
// @Tags         iot
// @Param        bucket query string true "Bucket name"
// @Param        measurement query string true "Measurement name"
// @Param        field query string false "Field name"
// @Param        start query string false "Start time"
// @Param        stop query string false "Stop time"
// @Param        limit query int false "Limit"
// @Success      200 {object} responses.SwaggerSuccessResponse
// @Failure      500 {object} responses.ErrorResponse
// @Router       /iot/monitordevicechart [get]
func (h *MQTT3Handler) GetMonitorDeviceChart(w http.ResponseWriter, r *http.Request) {
	params := make(map[string]interface{})
	for k, v := range r.URL.Query() {
		if len(v) > 0 {
			params[k] = v[0]
		}
	}
	resp, err := h.uc.GetMonitorDeviceChart(r.Context(), params)
	if err != nil {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusInternalServerError, err.Error())))
		return
	}
	render.Render(w, r, responses.CreateSuccessResponse(resp))
}

// -------------------- helpers --------------------
func atoi(s string) int {
	v, _ := strconv.Atoi(s)
	return v
}

func processPayload(data []byte) interface{} {
	str := strings.TrimSpace(string(data))
	if strings.Contains(str, ",") {
		return strings.Split(str, ",")
	}
	return str
}

// -------------------- Device Status & Config --------------------
// GetDeviceStatus godoc
// @Summary      Get device status
// @Description  Returns current status of a device
// @Tags         iot
// @Param        deviceId query string true "Device ID"
// @Success      200 {object} responses.SwaggerSuccessResponse{data=presenter.DeviceStatusResponse}
// @Failure      400 {object} responses.ErrorResponse
// @Failure      500 {object} responses.ErrorResponse
// @Router       /iot/devicestatus [get]
func (h *MQTT3Handler) GetDeviceStatus(w http.ResponseWriter, r *http.Request) {
	deviceID := strings.TrimSpace(r.URL.Query().Get("deviceId"))
	if deviceID == "" {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusBadRequest, "deviceId is required")))
		return
	}
	resp, err := h.uc.GetDeviceStatus(r.Context(), deviceID)
	if err != nil {
		h.logger.Errorf("GetDeviceStatus error: %v", err)
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusInternalServerError, err.Error())))
		return
	}
	render.Render(w, r, responses.CreateSuccessResponse(resp))
}

// UpdateDeviceStatus godoc
// @Summary      Update device status
// @Description  Updates device status fields
// @Tags         iot
// @Accept       json
// @Produce      json
// @Param        request body map[string]interface{} true "Device status data (must include deviceId)"
// @Success      200 {object} responses.SwaggerSuccessResponse
// @Failure      400 {object} responses.ErrorResponse
// @Failure      500 {object} responses.ErrorResponse
// @Router       /iot/devicestatus [put]
func (h *MQTT3Handler) UpdateDeviceStatus(w http.ResponseWriter, r *http.Request) {
	var req map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.ErrValidation(err)))
		return
	}
	deviceID, ok := req["deviceId"].(string)
	if !ok || deviceID == "" {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusBadRequest, "deviceId is required")))
		return
	}
	if err := h.uc.UpdateDeviceStatus(r.Context(), deviceID, req); err != nil {
		h.logger.Errorf("UpdateDeviceStatus error: %v", err)
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusInternalServerError, err.Error())))
		return
	}
	render.Render(w, r, responses.CreateSuccessResponse(map[string]string{"status": "updated"}))
}

// GetDeviceConfig godoc
// @Summary      Get device configuration
// @Description  Returns device configuration
// @Tags         iot
// @Param        deviceId query string true "Device ID"
// @Success      200 {object} map[string]interface{}
// @Failure      400 {object} responses.ErrorResponse
// @Failure      500 {object} responses.ErrorResponse
// @Router       /iot/deviceconfig [get]
func (h *MQTT3Handler) GetDeviceConfig(w http.ResponseWriter, r *http.Request) {
	deviceID := strings.TrimSpace(r.URL.Query().Get("deviceId"))
	if deviceID == "" {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusBadRequest, "deviceId is required")))
		return
	}
	cfg, err := h.uc.GetDeviceConfig(r.Context(), deviceID)
	if err != nil {
		h.logger.Errorf("GetDeviceConfig error: %v", err)
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusInternalServerError, err.Error())))
		return
	}
	render.Render(w, r, responses.CreateSuccessResponse(cfg))
}

// UpdateDeviceConfig godoc
// @Summary      Update device configuration
// @Description  Updates device configuration (merges with existing)
// @Tags         iot
// @Accept       json
// @Produce      json
// @Param        request body map[string]interface{} true "New config (must include deviceId)"
// @Success      200 {object} responses.SwaggerSuccessResponse
// @Failure      400 {object} responses.ErrorResponse
// @Failure      500 {object} responses.ErrorResponse
// @Router       /iot/updatedeviceconfig [put]
func (h *MQTT3Handler) UpdateDeviceConfig(w http.ResponseWriter, r *http.Request) {
	var req map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.ErrValidation(err)))
		return
	}
	deviceID, ok := req["deviceId"].(string)
	if !ok || deviceID == "" {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusBadRequest, "deviceId is required")))
		return
	}
	// remove deviceId from config to merge
	delete(req, "deviceId")
	if err := h.uc.UpdateDeviceConfig(r.Context(), deviceID, req); err != nil {
		h.logger.Errorf("UpdateDeviceConfig error: %v", err)
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusInternalServerError, err.Error())))
		return
	}
	render.Render(w, r, responses.CreateSuccessResponse(map[string]string{"status": "updated"}))
}

// ListIotData godoc
// @Summary      List IoT data with pagination
// @Description  Returns paginated IoT data for a device
// @Tags         iot
// @Param        deviceId query string true "Device ID"
// @Param        page query int false "Page number"
// @Param        limit query int false "Items per page"
// @Param        startDate query string false "Start date (RFC3339)"
// @Param        endDate query string false "End date (RFC3339)"
// @Success      200 {object} responses.SwaggerSuccessResponse{data=presenter.PaginatedIotData}
// @Failure      400 {object} responses.ErrorResponse
// @Failure      500 {object} responses.ErrorResponse
// @Router       /iot/deviceiotdata [get]
func (h *MQTT3Handler) ListIotData(w http.ResponseWriter, r *http.Request) {
	opts := &presenter.IotDataListOptions{
		Page:     atoi(r.URL.Query().Get("page")),
		Limit:    atoi(r.URL.Query().Get("limit")),
		DeviceID: strings.TrimSpace(r.URL.Query().Get("deviceId")),
	}
	if opts.Page <= 0 {
		opts.Page = 1
	}
	if opts.Limit <= 0 {
		opts.Limit = 50
	}
	// parse dates if provided
	if start := r.URL.Query().Get("startDate"); start != "" {
		if t, err := time.Parse(time.RFC3339, start); err == nil {
			opts.StartDate = &t
		}
	}
	if end := r.URL.Query().Get("endDate"); end != "" {
		if t, err := time.Parse(time.RFC3339, end); err == nil {
			opts.EndDate = &t
		}
	}
	if opts.DeviceID == "" {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusBadRequest, "deviceId is required")))
		return
	}
	resp, err := h.uc.ListIotData(r.Context(), opts)
	if err != nil {
		h.logger.Errorf("ListIotData error: %v", err)
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusInternalServerError, err.Error())))
		return
	}
	render.Render(w, r, responses.CreateSuccessResponse(resp))
}

// CleanupOldData godoc
// @Summary      Delete old IoT data
// @Description  Deletes data older than specified days
// @Tags         iot
// @Param        days query int false "Number of days (default 30)"
// @Success      200 {object} responses.SwaggerSuccessResponse
// @Failure      500 {object} responses.ErrorResponse
// @Router       /iot/devicedatacleanup [delete]
func (h *MQTT3Handler) CleanupOldData(w http.ResponseWriter, r *http.Request) {
	days := atoi(r.URL.Query().Get("days"))
	if days <= 0 {
		days = 30
	}
	count, err := h.uc.CleanupOldData(r.Context(), days)
	if err != nil {
		h.logger.Errorf("CleanupOldData error: %v", err)
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusInternalServerError, err.Error())))
		return
	}
	render.Render(w, r, responses.CreateSuccessResponse(map[string]int64{"deleted": count}))
}

// GetDeviceStats godoc
// @Summary      Get device statistics
// @Description  Returns statistics for a device (count, first/last record, etc.)
// @Tags         iot
// @Param        deviceId query string true "Device ID"
// @Success      200 {object} responses.SwaggerSuccessResponse{data=presenter.DeviceStats}
// @Failure      400 {object} responses.ErrorResponse
// @Failure      500 {object} responses.ErrorResponse
// @Router       /iot/devicestats [get]
func (h *MQTT3Handler) GetDeviceStats(w http.ResponseWriter, r *http.Request) {
	deviceID := strings.TrimSpace(r.URL.Query().Get("deviceId"))
	if deviceID == "" {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusBadRequest, "deviceId is required")))
		return
	}
	stats, err := h.uc.GetDeviceStats(r.Context(), deviceID)
	if err != nil {
		h.logger.Errorf("GetDeviceStats error: %v", err)
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusInternalServerError, err.Error())))
		return
	}
	render.Render(w, r, responses.CreateSuccessResponse(stats))
}

// ExportData godoc
// @Summary      Export IoT data
// @Description  Exports data in CSV or JSON format
// @Tags         iot
// @Param        deviceId query string true "Device ID"
// @Param        startDate query string true "Start date (RFC3339)"
// @Param        endDate query string true "End date (RFC3339)"
// @Param        format query string false "Format: csv or json (default json)"
// @Success      200 {file} file
// @Failure      400 {object} responses.ErrorResponse
// @Failure      500 {object} responses.ErrorResponse
// @Router       /iot/devicedataexport [get]
func (h *MQTT3Handler) ExportData(w http.ResponseWriter, r *http.Request) {
	deviceID := strings.TrimSpace(r.URL.Query().Get("deviceId"))
	if deviceID == "" {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusBadRequest, "deviceId is required")))
		return
	}
	startStr := r.URL.Query().Get("startDate")
	endStr := r.URL.Query().Get("endDate")
	if startStr == "" || endStr == "" {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusBadRequest, "startDate and endDate are required")))
		return
	}
	start, err := time.Parse(time.RFC3339, startStr)
	if err != nil {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusBadRequest, "invalid startDate format (RFC3339)")))
		return
	}
	end, err := time.Parse(time.RFC3339, endStr)
	if err != nil {
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusBadRequest, "invalid endDate format (RFC3339)")))
		return
	}
	format := strings.ToLower(r.URL.Query().Get("format"))
	if format != "csv" {
		format = "json"
	}
	req := &presenter.ExportRequest{
		DeviceID:  deviceID,
		StartDate: start,
		EndDate:   end,
		Format:    format,
	}
	data, contentType, err := h.uc.ExportData(r.Context(), req)
	if err != nil {
		h.logger.Errorf("ExportData error: %v", err)
		render.Render(w, r, responses.CreateErrorResponse(httpErrors.NewError(http.StatusInternalServerError, err.Error())))
		return
	}
	w.Header().Set("Content-Type", contentType)
	if format == "csv" {
		w.Header().Set("Content-Disposition", "attachment; filename=data.csv")
	} else {
		w.Header().Set("Content-Disposition", "attachment; filename=data.json")
	}
	w.Write(data)
}
