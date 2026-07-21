package usecase

import (
	"context"
	"crypto/md5"
	"encoding/json"
	"fmt"
	"icmongolang/config"
	"icmongolang/internal/modules/iot/iothelper"
	"icmongolang/internal/modules/iot/models"
	"icmongolang/internal/modules/iot/presenter"
	"icmongolang/internal/modules/iot/repository"
	"icmongolang/pkg/helpers"
	"icmongolang/pkg/influxdb"
	"icmongolang/pkg/logger"
	"icmongolang/pkg/mqtt"
	"reflect"
	"strconv"
	"strings"
	"time"

	"github.com/redis/go-redis/v9"
)

// MQTT3UseCase defines all business logic for IoT/MQTT v3.1.1
type MQTT3UseCase interface {
	// Existing methods
	GetTopicData(ctx context.Context, topic string, delCache bool) (*presenter.TopicDataResponse, error)
	DeviceControl(ctx context.Context, req *presenter.ControlRequest) error
	DeviceControls(ctx context.Context, req *presenter.ControlRequest) error
	GetDeviceList(ctx context.Context, req *presenter.DeviceListRequest) ([]presenter.DeviceDetailResponse, int64, error)
	GetDeviceListPage(ctx context.Context, req *presenter.DeviceListRequest) ([]presenter.DeviceDetailResponse, int64, error)
	GetDeviceBuckets(ctx context.Context, bucket string) (*presenter.DeviceBucketsResponse, error)
	GetDeviceListByLocation(ctx context.Context, locationID int) ([]presenter.DeviceDetailResponse, error)
	GetSenserCharts(ctx context.Context, req *presenter.SenserChartRequest) (*presenter.SenserChartResponse, error)
	GetSenserDataChart(ctx context.Context, req *presenter.SenserChartRequest) (*presenter.SenserChartResponse, error)
	GetSenserData(ctx context.Context, req *presenter.SenserChartRequest) (*presenter.SenserChartResponse, error)
	GetDeviceSenserCharts(ctx context.Context, req *presenter.SenserChartRequest) (*presenter.SenserChartResponse, error)
	GetAlarmDeviceStatus(ctx context.Context, req map[string]interface{}) (interface{}, error)
	GetAlarmDeviceStatusControl(ctx context.Context, req map[string]interface{}) (interface{}, error)
	GetMonitorDeviceGroup(ctx context.Context, req map[string]interface{}) (interface{}, error)
	GetMonitorDeviceChart(ctx context.Context, req map[string]interface{}) (interface{}, error)
	GetTopicDataDeviceChart(ctx context.Context, req map[string]interface{}) (interface{}, error)
	IsConnected() bool
	IsCacheEnabled() bool

	// New methods for device management and data processing
	GetDeviceStatus(ctx context.Context, deviceID string) (*presenter.DeviceStatusResponse, error)
	UpdateDeviceStatus(ctx context.Context, deviceID string, data map[string]interface{}) error
	GetDeviceConfig(ctx context.Context, deviceID string) (*models.DeviceConfig, error)
	UpdateDeviceConfig(ctx context.Context, deviceID string, config map[string]interface{}) error
	ProcessMqttData(ctx context.Context, deviceID string, rawData string) (*models.IotData, error)
	GetLatestData(ctx context.Context, deviceID string, limit int) ([]models.IotData, error)
	GetDataByDateRange(ctx context.Context, deviceID string, start, end time.Time) ([]models.IotData, error)
	CleanupOldData(ctx context.Context, days int) (int64, error)
	ListIotData(ctx context.Context, opts *presenter.IotDataListOptions) (*presenter.PaginatedIotData, error)
	GetDeviceStats(ctx context.Context, deviceID string) (*presenter.DeviceStats, error)
	ExportData(ctx context.Context, req *presenter.ExportRequest) ([]byte, string, error)
}

type mqtt3UseCase struct {
	// Existing repositories
	deviceRepo   repository.DeviceRepository
	alarmLogRepo repository.AlarmLogRepository
	mqttClient   mqtt.Client
	redisClient  *redis.Client
	influxClient *influxdb.InfluxClient
	logger       logger.Logger
	cfg          *config.Config

	// New repositories
	deviceStatusRepo repository.DeviceStatusRepository
	deviceConfigRepo repository.DeviceConfigRepository
	iotDataRepo      repository.IotDataRepository
	activityLogRepo  repository.ActivityLogRepository
	commandLogRepo   repository.CommandLogRepository
	deviceAlertRepo  repository.DeviceAlertRepository
}

// NewMQTT3UseCase creates a new MQTT3 use case
func NewMQTT3UseCase(
	deviceRepo repository.DeviceRepository,
	alarmLogRepo repository.AlarmLogRepository,
	mqttClient mqtt.Client,
	redisClient *redis.Client,
	influxClient *influxdb.InfluxClient,
	log logger.Logger,
	cfg *config.Config,
	// New dependencies
	deviceStatusRepo repository.DeviceStatusRepository,
	deviceConfigRepo repository.DeviceConfigRepository,
	iotDataRepo repository.IotDataRepository,
	activityLogRepo repository.ActivityLogRepository,
	commandLogRepo repository.CommandLogRepository,
	deviceAlertRepo repository.DeviceAlertRepository,
) MQTT3UseCase {
	return &mqtt3UseCase{
		deviceRepo:       deviceRepo,
		alarmLogRepo:     alarmLogRepo,
		mqttClient:       mqttClient,
		redisClient:      redisClient,
		influxClient:     influxClient,
		logger:           log,
		cfg:              cfg,
		deviceStatusRepo: deviceStatusRepo,
		deviceConfigRepo: deviceConfigRepo,
		iotDataRepo:      iotDataRepo,
		activityLogRepo:  activityLogRepo,
		commandLogRepo:   commandLogRepo,
		deviceAlertRepo:  deviceAlertRepo,
	}
}

// ============================================================================
// EXISTING METHODS (unchanged, copied from original file)
// ============================================================================

// IsConnected returns MQTT connection status
func (u *mqtt3UseCase) IsConnected() bool {
	return u.mqttClient.IsConnected()
}

// IsCacheEnabled returns true if Redis cache is available
func (u *mqtt3UseCase) IsCacheEnabled() bool {
	return u.redisClient != nil
}

// GetTopicData fetches live or cached MQTT topic data.
// If delCache is true, the cached entry for the topic is deleted before any operation.
func (u *mqtt3UseCase) GetTopicData(ctx context.Context, topic string, delCache bool) (*presenter.TopicDataResponse, error) {
	cacheKey := "mqtt_topic:" + topic
	cacheEnabled := u.IsCacheEnabled()

	// Delete cache if requested
	if cacheEnabled && delCache {
		if err := u.redisClient.Del(ctx, cacheKey).Err(); err != nil {
			u.logger.Warnf("GetTopicData: failed to delete cache for topic %s: %v", topic, err)
		} else {
			u.logger.Infof("GetTopicData: cache deleted for topic %s", topic)
		}
	}

	// 1. Try Redis cache (if available and not forced to delete)
	if cacheEnabled && !delCache {
		cached, err := u.redisClient.Get(ctx, cacheKey).Bytes()
		if err == nil && len(cached) > 0 {
			u.logger.Debugf("GetTopicData: cache HIT for topic %s", topic)
			var payload interface{}
			if err := json.Unmarshal(cached, &payload); err != nil {
				payload = string(cached)
			}
			return &presenter.TopicDataResponse{
				Topic:   topic,
				Payload: payload,
				From:    "cache",
				Cache:   true,
			}, nil
		}
		u.logger.Debugf("GetTopicData: cache MISS for topic %s", topic)
	}

	// 2. Fetch from MQTT with a reasonable timeout (5 seconds)
	mqttCtx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	data, err := u.mqttClient.GetDataFromTopic(mqttCtx, topic, 5*time.Second)
	if err != nil {
		// If we have cached data (even if we didn't try it before, e.g., after delCache), serve it as fallback.
		if cacheEnabled {
			cached, cacheErr := u.redisClient.Get(ctx, cacheKey).Bytes()
			if cacheErr == nil && len(cached) > 0 {
				u.logger.Warnf("GetTopicData: MQTT fetch failed (%v), serving cached data as fallback", err)
				var payload interface{}
				if err := json.Unmarshal(cached, &payload); err != nil {
					payload = string(cached)
				}
				return &presenter.TopicDataResponse{
					Topic:   topic,
					Payload: payload,
					From:    "cache_fallback",
					Cache:   true,
				}, nil
			}
		}
		// No cache fallback available – return the error
		if ctx.Err() != nil {
			return nil, ctx.Err()
		}
		return nil, fmt.Errorf("mqtt fetch failed: %w", err)
	}

	// 3. Parse payload (JSON or raw string)
	var payload interface{}
	if err := json.Unmarshal(data, &payload); err != nil {
		payload = string(data)
	}

	// 4. Store raw data in cache (TTL = 10 seconds – adjust to your publishing interval)
	if cacheEnabled {
		if err := u.redisClient.Set(ctx, cacheKey, data, 10*time.Second).Err(); err != nil {
			u.logger.Warnf("GetTopicData: failed to cache payload: %v", err)
		}
	}

	return &presenter.TopicDataResponse{
		Topic:   topic,
		Payload: payload,
		From:    "mqtt",
		Cache:   false,
	}, nil
}

// DeviceControl publishes a control message
func (u *mqtt3UseCase) DeviceControl(ctx context.Context, req *presenter.ControlRequest) error {
	return u.mqttClient.Publish(req.Topic, 1, false, req.Message)
}

// DeviceControls publishes a control message
func (u *mqtt3UseCase) DeviceControls(ctx context.Context, req *presenter.ControlRequest) error {
	return u.mqttClient.Publish(req.Topic, 1, false, req.Message)
}

// GetDeviceList returns paginated devices with basic filters
func (u *mqtt3UseCase) GetDeviceList(ctx context.Context, req *presenter.DeviceListRequest) ([]presenter.DeviceDetailResponse, int64, error) {
	filter := make(map[string]interface{})
	if req.Bucket != "" {
		filter["bucket"] = req.Bucket
	}
	if req.HardwareId != 0 {
		filter["hardware_id"] = req.HardwareId
	}
	devices, total, err := u.deviceRepo.ListDevices(filter, req.Page, req.PageSize)
	if err != nil {
		return nil, 0, err
	}
	result := make([]presenter.DeviceDetailResponse, len(devices))
	for i, dev := range devices {
		typeName := ""
		result[i] = presenter.DeviceDetailResponse{
			DeviceId:   dev.DeviceID,
			DeviceName: dev.DeviceName,
			TypeName:   typeName,
			Unit:       dev.Unit,
			Status:     dev.Status,
		}
	}
	return result, total, nil
}

// GetDeviceListPage is an alias
func (u *mqtt3UseCase) GetDeviceListPage(ctx context.Context, req *presenter.DeviceListRequest) ([]presenter.DeviceDetailResponse, int64, error) {
	return u.GetDeviceList(ctx, req)
}

// GetDeviceBuckets returns devices grouped by bucket
func (u *mqtt3UseCase) GetDeviceBuckets(ctx context.Context, bucket string) (*presenter.DeviceBucketsResponse, error) {
	devices, err := u.deviceRepo.GetDevicesByBucket(bucket)
	if err != nil {
		return nil, err
	}
	resp := &presenter.DeviceBucketsResponse{Bucket: bucket}
	for _, dev := range devices {
		typeName := ""
		resp.Devices = append(resp.Devices, presenter.DeviceDetailResponse{
			DeviceId:   dev.DeviceID,
			DeviceName: dev.DeviceName,
			TypeName:   typeName,
			Unit:       dev.Unit,
		})
	}
	return resp, nil
}

// GetDeviceListByLocation returns devices for a location
func (u *mqtt3UseCase) GetDeviceListByLocation(ctx context.Context, locationID int) ([]presenter.DeviceDetailResponse, error) {
	devices, err := u.deviceRepo.GetDevicesByLocation(locationID)
	if err != nil {
		return nil, err
	}
	result := make([]presenter.DeviceDetailResponse, len(devices))
	for i, dev := range devices {
		typeName := ""
		result[i] = presenter.DeviceDetailResponse{
			DeviceId:   dev.DeviceID,
			DeviceName: dev.DeviceName,
			TypeName:   typeName,
			Unit:       dev.Unit,
		}
	}
	return result, nil
}

// GetSenserCharts retrieves time series data from InfluxDB
func (u *mqtt3UseCase) GetSenserCharts(ctx context.Context, req *presenter.SenserChartRequest) (*presenter.SenserChartResponse, error) {
	params := influxdb.QueryParams{
		Measurement: req.Measurement,
		Field:       req.Field,
		Bucket:      req.Bucket,
		Start:       req.Start,
		Stop:        req.Stop,
		Limit:       req.Limit,
	}
	results, err := u.influxClient.QueryFilterData(params)
	if err != nil {
		return nil, err
	}
	var data []float64
	var date []string
	for _, r := range results {
		if val, ok := r["_value"].(float64); ok {
			data = append(data, val)
		}
		if t, ok := r["_time"].(time.Time); ok {
			date = append(date, t.Format("2006-01-02 15:04:05"))
		}
	}
	return &presenter.SenserChartResponse{Data: data, Date: date, Cache: "no cache"}, nil
}

// GetSenserDataChart alias
func (u *mqtt3UseCase) GetSenserDataChart(ctx context.Context, req *presenter.SenserChartRequest) (*presenter.SenserChartResponse, error) {
	return u.GetSenserCharts(ctx, req)
}

// GetSenserData alias
func (u *mqtt3UseCase) GetSenserData(ctx context.Context, req *presenter.SenserChartRequest) (*presenter.SenserChartResponse, error) {
	return u.GetSenserCharts(ctx, req)
}

// GetDeviceSenserCharts alias
func (u *mqtt3UseCase) GetDeviceSenserCharts(ctx context.Context, req *presenter.SenserChartRequest) (*presenter.SenserChartResponse, error) {
	return u.GetSenserCharts(ctx, req)
}

// GetAlarmDeviceStatus
func (u *mqtt3UseCase) GetAlarmDeviceStatus(ctx context.Context, req map[string]interface{}) (interface{}, error) {
	// โหลด Bangkok timezone (UTC+7)
	TimeLoc := helpers.GetTimeLocation()
	// 1. Extract bucket (required)
	bucket := ""
	if v, ok := req["bucket"]; ok {
		bucket = fmt.Sprintf("%v", v)
	}
	if bucket == "" {
		return nil, fmt.Errorf("bucket is required")
	}

	page := 1
	if v, ok := req["page"]; ok {
		if p, err := strconv.Atoi(fmt.Sprintf("%v", v)); err == nil && p > 0 {
			page = p
		}
	}
	if page == 0 {
		return nil, fmt.Errorf("page is required")
	}

	pageSize := 1000
	if v, ok := req["pageSize"]; ok {
		if ps, err := strconv.Atoi(fmt.Sprintf("%v", v)); err == nil && ps > 0 {
			pageSize = ps
		}
	}
	if pageSize == 0 {
		return nil, fmt.Errorf("pageSize is required")
	}
	measurement := ""
	if v, ok := req["measurement"]; ok {
		measurement = fmt.Sprintf("%v", v)
	}
	if measurement == "" {
		//return nil, fmt.Errorf("measurement is required")
		measurement = "temperature" // default
	}

	// 2. Prepare device list request with sensible defaults
	listReq := &repository.DeviceListAlarmRequest{
		Page:     page,
		PageSize: pageSize,
		Status:   1,
		Bucket:   bucket,
	}
	if page, ok := req["page"]; ok {
		if p, err := strconv.Atoi(fmt.Sprintf("%v", page)); err == nil && p > 0 {
			listReq.Page = p
		}
	}
	if pageSize, ok := req["pageSize"]; ok {
		if ps, err := strconv.Atoi(fmt.Sprintf("%v", pageSize)); err == nil && ps > 0 {
			listReq.PageSize = ps
		}
	}
	// Optionally accept other filters
	if v, ok := req["device_id"]; ok {
		listReq.DeviceID = fmt.Sprintf("%v", v)
	}
	if v, ok := req["type_id"]; ok {
		listReq.TypeID = toInt(v)
	}
	if v, ok := req["hardware_id"]; ok {
		listReq.HardwareID = toInt(v)
	}
	if v, ok := req["keyword"]; ok {
		listReq.Keyword = fmt.Sprintf("%v", v)
	}

	// 3. Fetch devices from repository
	//
	deviceResult, err := u.deviceRepo.ListDevicesWithAlarm(ctx, listReq)
	if err != nil {
		return nil, err
	}

	// 4. Group devices by hardware_id
	var deviceSensors []interface{} // hardware_id == 1
	var deviceIO []interface{}      // hardware_id == 2
	var deviceControl []interface{} // hardware_id == 3
	var deviceIOInfo []interface{}  // simplified version for "deviceioinfo"

	for _, dev := range deviceResult.Items {
		devMap := structToMap(dev)
		switch dev.HardwareID {
		case 1:
			deviceSensors = append(deviceSensors, devMap)
		case 2:
			deviceIO = append(deviceIO, devMap)
		case 3:
			deviceControl = append(deviceControl, devMap)
		}
		// deviceioinfo: simpler representation
		ioInfo := map[string]interface{}{
			"device_id":      dev.DeviceID,
			"type_id":        dev.TypeID,
			"status":         dev.Status,
			"device_name":    dev.DeviceName,
			"timestamp":      helpers.GetCurrentFullDatenow(),
			"subject":        dev.StatusWarning,
			"value_data":     dev.MqttDataValue,
			"dataAlarm":      0,
			"eventControl":   1,
			"value_data_msg": dev.MqttDataValue,
		}
		deviceIOInfo = append(deviceIOInfo, ioInfo)
	}

	// 5. MQTT connection status
	mqttConnected := u.mqttClient.IsConnected()
	checkConnectionMqtt := map[string]interface{}{
		"isConnected": mqttConnected,
		"connected":   mqttConnected,
		"status":      1,
		"msg":         "MQTT Connection Status: Connected",
	}
	if !mqttConnected {
		checkConnectionMqtt["status"] = 0
		checkConnectionMqtt["msg"] = "MQTT Connection Status: Disconnected"
	}

	// ====== 6. ดึงข้อมูล MQTT ล่าสุดแบบยืดหยุ่น ======
	var mqttRawPayload string
	var fromCache bool
	var cacheTime int64
	cacheEnabled := u.IsCacheEnabled()
	var mqttDataMap map[string]interface{} // map ชื่อฟิลด์ -> ค่า (string หรือ number)

	if mqttConnected && len(deviceResult.Items) > 0 {
		firstDevice := deviceResult.Items[0]
		topic := firstDevice.MqttDataValue
		if topic == "" {
			topic = bucket + "/DATA"
		}

		mqttCacheKey := "mqtt_payload:" + bucket // ใช้ key เดียวกันกับ GetMonitorDeviceGroup

		// 1) ลองอ่านจาก Redis cache
		if cacheEnabled {
			cached, _ := u.redisClient.Get(ctx, mqttCacheKey).Bytes()
			if len(cached) > 0 {
				mqttRawPayload = string(cached)
				fromCache = true
				cacheTime = 15 // โดยประมาณ
				u.logger.Debug("MQTT payload from cache")
			}
		}

		// 2) ถ้าไม่เจอใน cache หรือ cache ว่าง ให้ดึงจาก MQTT
		if mqttRawPayload == "" {
			mqttCtx, mqttCancel := context.WithTimeout(ctx, 5*time.Second)
			defer mqttCancel()

			payload, err := u.mqttClient.GetDataFromTopic(mqttCtx, topic, 5*time.Second)
			if err == nil && len(payload) > 0 {
				mqttRawPayload = string(payload)
				fromCache = false
				cacheTime = 0
				if cacheEnabled {
					_ = u.redisClient.Set(ctx, mqttCacheKey, payload, 60*time.Second).Err()
				}
			} else {
				u.logger.Warnf("Failed to get data from MQTT topic %s: %v", topic, err)
				// ถ้าดึงไม่ได้ แต่มี cache เก่า (ซึ่งอาจจะยังอยู่) เราก็จะใช้ cache ที่ได้ไว้แล้ว
				// แต่ถ้า cache ก็ไม่มี mqttRawPayload จะเป็น "" และจะแสดง "No data"
			}
		}

		// 3) ถ้ามี payload ให้แยกส่วนและสร้าง mqttDataMap
		if mqttRawPayload != "" {
			parts := strings.Split(mqttRawPayload, ",")
			var configMap map[string]string
			if firstDevice.MqttStatusDataName != "" {
				if err := json.Unmarshal([]byte(firstDevice.MqttStatusDataName), &configMap); err != nil {
					u.logger.Warnf("Failed to parse MqttStatusDataName: %v", err)
					configMap = nil
				}
			}
			mqttDataMap = make(map[string]interface{}, len(parts))
			for i, val := range parts {
				key := fmt.Sprintf("%d", i)
				if configMap != nil {
					if mapped, ok := configMap[key]; ok {
						key = mapped
					}
				}
				// ตัดช่องว่าง และพยายามแปลงเป็นตัวเลขถ้าเป็นไปได้ (เพื่อให้ response มีข้อมูลที่ใช้งานง่าย)
				trimmed := strings.TrimSpace(val)
				if f, err := strconv.ParseFloat(trimmed, 64); err == nil {
					mqttDataMap[key] = f
				} else {
					mqttDataMap[key] = trimmed
				}
			}
		}
	}

	// ====== 7. สร้าง mqttrs และ mqttData สำหรับ response ======
	mqttrs := map[string]interface{}{
		"case":        0,
		"status":      0,
		"msg":         "No data available",
		"fromCache":   false,
		"time":        0,
		"timestamp":   helpers.GetCurrentFullDatenow(),
		"isConnected": mqttConnected,
	}
	mqttData := make(map[string]interface{})

	if mqttRawPayload != "" && mqttDataMap != nil {
		mqttrs = map[string]interface{}{
			"case":        1,
			"status":      1,
			"msg":         mqttRawPayload, // ข้อมูลดิบ
			"fromCache":   fromCache,
			"time":        cacheTime,
			"timestamp":   helpers.GetCurrentFullDatenow(),
			"isConnected": mqttConnected,
		}
		// คัดลอกข้อมูลที่แยกแล้ว (อาจมีทั้งตัวเลขและข้อความ)
		for k, v := range mqttDataMap {
			mqttData[k] = v
		}
	}

	// 7. Chart data from InfluxDB
	chartData := map[string]interface{}{
		"bucket": bucket,
		"field":  "value",
		"info":   map[string]interface{}{},
		"data":   []float64{},
		"date":   []string{},
		"name":   "value",
		"cache":  "no cache",
	}
	if u.influxClient != nil {
		now := time.Now()
		start := now.Add(-15 * time.Minute).Format(time.RFC3339)
		stop := now.Format(time.RFC3339)
		params := influxdb.QueryParams{
			Measurement: measurement, // could be made configurable per device
			Field:       "value",
			Bucket:      bucket,
			Start:       start,
			Stop:        stop,
			Limit:       150,
		}
		results, err := u.influxClient.QueryFilterData(params)
		if err == nil {
			var dataPoints []float64
			var timePoints []string
			for _, r := range results {
				if val, ok := r["_value"].(float64); ok {
					dataPoints = append(dataPoints, val)
				}
				if t, ok := r["_time"].(time.Time); ok {
					timePoints = append(timePoints, helpers.TimeConvertermas(t.In(TimeLoc)))
				}
			}
			chartData["data"] = dataPoints
			chartData["date"] = timePoints
			chartData["info"] = map[string]interface{}{
				"bucket":      bucket,
				"measurement": measurement,
				"result":      "last",
				"table":       0,
				"field":       "value",
				"start":       start,
				"stop":        stop,
				"time":        helpers.TimeConvertermas(time.Now().In(TimeLoc)),
				"value": func() interface{} {
					if len(dataPoints) > 0 {
						return dataPoints[len(dataPoints)-1]
					}
					return nil
				}(),
			}
		} else {
			u.logger.Warnf("Failed to query InfluxDB: %v", err)
		}
	}

	// 8. Build final response
	response := map[string]interface{}{
		"statuscode": 200,
		"status":     "success",
		"Mqttstatus": 1,
		"payload": map[string]interface{}{
			"checkConnectionMqtt": checkConnectionMqtt,
			"mqttrs":              mqttrs,
			"mqttname":            getMqttNameFromDevices(deviceResult.Items),
			"bucket":              bucket,
			"time":                helpers.GetCurrentFullDatenow(),
			"mqttdata":            mqttData,
			"deviceioinfo":        deviceIOInfo,
			"devicesensor":        deviceSensors,
			"deviceio":            deviceIO,
			//"devicecontrol":       deviceControl,
			"cache": "cache",
			"chart": chartData,
		},
		"message":    "check Connection Status Mqtt",
		"message_th": "check Connection Status Mqtt",
	}
	return response, nil
}

// GetAlarmDeviceStatusControl returns the same as GetAlarmDeviceStatus (for compatibility)
func (u *mqtt3UseCase) GetAlarmDeviceStatusControl(ctx context.Context, req map[string]interface{}) (interface{}, error) {
	return u.GetAlarmDeviceStatus(ctx, req)
}

// GetMonitorDeviceGroup returns devices grouped by hardware type, enriched with live MQTT data, calibration, and alarm status.
func (u *mqtt3UseCase) GetMonitorDeviceGroup(ctx context.Context, req map[string]interface{}) (interface{}, error) {
	// Ensure config is present
	if u.cfg == nil {
		return nil, fmt.Errorf("configuration not initialized")
	}
	baseUrl := strings.TrimSuffix(u.cfg.Server.BaseUrl, "/")

	defer func() {
		if r := recover(); r != nil {
			u.logger.Errorf("GetMonitorDeviceGroup panic recovered: %v", r)
		}
	}()

	// 🔥 Increase overall timeout to 15 seconds (adjust as needed)
	ctx, cancel := context.WithTimeout(ctx, 15*time.Second)
	defer cancel()

	// 1. Extract parameters
	bucket := ""
	if v, ok := req["bucket"]; ok {
		bucket = fmt.Sprintf("%v", v)
	}
	if bucket == "" {
		return nil, fmt.Errorf("bucket is required")
	}

	locationID := 0
	if v, ok := req["location_id"]; ok {
		if id, err := strconv.Atoi(fmt.Sprintf("%v", v)); err == nil {
			locationID = id
		}
	}

	hardwareID := 0
	if v, ok := req["hardware_id"]; ok {
		if id, err := strconv.Atoi(fmt.Sprintf("%v", v)); err == nil {
			hardwareID = id
		}
	}

	lang := "en"
	if v, ok := req["lang"]; ok {
		lang = fmt.Sprintf("%v", v)
		if lang != "en" && lang != "th" {
			lang = "en"
		}
	}

	delcache := 0
	if v, ok := req["delcache"]; ok {
		if val, err := strconv.Atoi(fmt.Sprintf("%v", v)); err == nil {
			delcache = val
		}
	}

	// 2. Device list caching (15 minutes)
	cacheEnabled := u.IsCacheEnabled()
	deviceCacheKey := "mqtt_device_list:" + fmt.Sprintf("%x", md5.Sum([]byte(fmt.Sprintf("%s:%d:%d:%s", bucket, locationID, hardwareID, lang))))
	const deviceCacheTTL = 15 * time.Minute
	var deviceResult *repository.PaginatedDeviceResult
	var fromDeviceCache bool

	if cacheEnabled && delcache == 1 {
		_ = u.redisClient.Del(ctx, deviceCacheKey).Err()
	}

	if cacheEnabled && delcache != 1 {
		cached, err := u.redisClient.Get(ctx, deviceCacheKey).Bytes()
		if err == nil {
			var items []repository.DeviceAlarmListItem
			if err := json.Unmarshal(cached, &items); err == nil {
				deviceResult = &repository.PaginatedDeviceResult{
					Items:      items,
					TotalCount: int64(len(items)),
					Page:       1,
					PageSize:   len(items),
				}
				fromDeviceCache = true
			}
		}
	}

	if deviceResult == nil {
		// Limit to 1000 devices to keep response fast
		const maxPageSize = 1000
		listReq := &repository.DeviceListAlarmRequest{
			Page:       1,
			PageSize:   maxPageSize,
			Status:     1,
			Bucket:     bucket,
			LocationID: locationID,
			HardwareID: hardwareID,
		}
		var err error
		deviceResult, err = u.deviceRepo.ListDevicesWithAlarm(ctx, listReq)
		if err != nil {
			return nil, fmt.Errorf("failed to fetch devices: %w", err)
		}
		if deviceResult.TotalCount > maxPageSize {
			return nil, fmt.Errorf("too many devices (%d) in bucket %s. Please use hardware_id or location_id filter", deviceResult.TotalCount, bucket)
		}
		if cacheEnabled && deviceResult != nil {
			data, _ := json.Marshal(deviceResult.Items)
			_ = u.redisClient.Set(ctx, deviceCacheKey, data, deviceCacheTTL).Err()
		}
	}

	if deviceResult == nil || len(deviceResult.Items) == 0 {
		return []map[string]interface{}{}, nil
	}

	// 3. MQTT data with short timeout and Redis cache
	var mqttDataMap map[string]interface{}
	var mqttRawPayload string
	mqttConnected := false
	if u.mqttClient != nil {
		mqttConnected = u.mqttClient.IsConnected()
	}

	if mqttConnected && len(deviceResult.Items) > 0 {
		firstDevice := deviceResult.Items[0]
		topic := firstDevice.MqttDataValue
		if topic == "" {
			topic = bucket + "/DATA"
		}

		mqttCacheKey := "mqtt_payload:" + bucket

		// Try Redis cache first (TTL is 30 seconds, but we'll accept it even if stale)
		if cacheEnabled {
			cached, _ := u.redisClient.Get(ctx, mqttCacheKey).Bytes()
			if len(cached) > 0 {
				mqttRawPayload = string(cached)
				u.logger.Debug("MQTT payload from cache")
			}
		}

		// If not cached, fetch from MQTT with a shorter timeout (5 seconds)
		if mqttRawPayload == "" {
			// Use a separate context with its own timeout, but still respect the parent context
			mqttCtx, mqttCancel := context.WithTimeout(ctx, 5*time.Second)
			defer mqttCancel()

			payload, err := u.mqttClient.GetDataFromTopic(mqttCtx, topic, 5*time.Second)
			if err == nil && len(payload) > 0 {
				mqttRawPayload = string(payload)
				if cacheEnabled {
					_ = u.redisClient.Set(ctx, mqttCacheKey, payload, 30*time.Second).Err()
				}
			} else {
				u.logger.Warnf("MQTT fetch failed: %v", err)
				// Optionally, try to serve an even older cached value (e.g., from a secondary key) if needed
				// For now, we just leave mqttRawPayload empty -> devices will show "0" as fallback
			}
		}

		// Parse payload if available
		if mqttRawPayload != "" {
			parts := strings.Split(mqttRawPayload, ",")
			var configMap map[string]string
			if firstDevice.MqttStatusDataName != "" {
				_ = json.Unmarshal([]byte(firstDevice.MqttStatusDataName), &configMap)
			}
			mqttDataMap = make(map[string]interface{}, len(parts))
			for i, val := range parts {
				key := fmt.Sprintf("%d", i)
				if configMap != nil {
					if mapped, ok := configMap[key]; ok {
						key = mapped
					}
				}
				mqttDataMap[key] = strings.TrimSpace(val)
			}
		}
	}

	// 4. Enrich devices (without early context cancellation inside the loop)
	enrichedDevices := make([]map[string]interface{}, 0, len(deviceResult.Items))
	groupNames := map[int]string{
		1: "Sensor",
		2: "IO Sensor",
		3: "IO Control",
		4: "Critical Sensor",
	}

	for _, dev := range deviceResult.Items {
		// Do NOT check ctx.Done() here – if the context expires, the function will return an error
		// after the loop anyway. We want to finish enriching all devices if possible.
		enriched := make(map[string]interface{}, 30)

		// Basic fields
		enriched["device_id"] = dev.DeviceID
		enriched["device_name"] = dev.DeviceName
		enriched["hardware_id"] = dev.HardwareID
		enriched["type_id"] = dev.TypeID
		enriched["type_name"] = dev.TypeName
		enriched["location_name"] = dev.LocationName
		enriched["unit"] = dev.Unit
		enriched["status"] = dev.Status
		enriched["layout"] = dev.Layout
		enriched["menu"] = dev.Menu
		enriched["mqtt_data_value"] = dev.MqttDataValue
		enriched["mqtt_data_control"] = dev.MqttDataControl
		enriched["measurement"] = dev.Measurement
		enriched["mqtt_control_on"] = dev.MqttControlOn
		enriched["mqtt_control_off"] = dev.MqttControlOff
		enriched["icon"] = dev.Icon
		enriched["icon_on"] = dev.IconOn
		enriched["icon_off"] = dev.IconOff

		// Value from MQTT (fallback to "0" if not available)
		var rawValue interface{} = "0"
		if mqttDataMap != nil {
			if val, ok := mqttDataMap[dev.Measurement]; ok {
				rawValue = val
			} else if val, ok := mqttDataMap[dev.MqttDeviceName]; ok {
				rawValue = val
			}
		}
		valueDataFloat := toFloat(rawValue)
		//originalValue := valueDataFloat

		// Calibration for hardware_id == 1
		if dev.HardwareID == 1 {
			switch dev.CalibrationType {
			case 1:
				valueDataFloat = valueDataFloat + toFloat(dev.CalibrationAdd)
			case 2:
				valueDataFloat = valueDataFloat - toFloat(dev.CalibrationSubtract)
			}
		}
		var valueDataStr string
		if dev.HardwareID == 1 {
			valueDataStr = fmt.Sprintf("%.2f", valueDataFloat)
		} else {
			valueDataStr = fmt.Sprintf("%v", rawValue)
		}
		enriched["value_data"] = valueDataStr
		//enriched["value_data_org"] = fmt.Sprintf("%v", originalValue)

		// Alarm evaluation
		alarmDto := iothelper.AlarmDetailDto{
			HardwareID:      dev.HardwareID,
			ValueData:       valueDataStr,
			Max:             dev.Max,
			Min:             dev.Min,
			StatusAlert:     dev.StatusAlert,
			StatusWarning:   dev.StatusWarning,
			RecoveryWarning: dev.RecoveryWarning,
			RecoveryAlert:   dev.RecoveryAlert,
			DeviceName:      dev.DeviceName,
			ActionName:      dev.MqttName,
			MqttName:        dev.MqttName,
			MqttControlOn:   dev.MqttControlOn,
			MqttControlOff:  dev.MqttControlOff,
			CountAlarm:      0,
			Event:           1,
			Unit:            dev.Unit,
		}
		var alarmResult iothelper.AlarmDetailResult
		if lang == "th" {
			alarmResult = iothelper.AlarmDetailValidateTh(alarmDto)
		} else {
			alarmResult = iothelper.AlarmDetailValidateEn(alarmDto)
		}
		enriched["alarm_title"] = alarmResult.Title
		enriched["alarm_subject"] = alarmResult.Subject
		enriched["alarm_status"] = alarmResult.Status
		//enriched["alarm_status_set"] = alarmResult.AlarmStatusSet

		// Control URL and icon
		if dev.HardwareID > 1 {
			if valueDataFloat >= 1 {
				enriched["control"] = fmt.Sprintf(baseUrl+"/iot/controls?topic=%s&message=%s", dev.MqttDataControl, dev.MqttControlOff)
				enriched["devicedata"] = "OFF"
				enriched["icon_access"] = dev.IconOff
			} else {
				enriched["control"] = fmt.Sprintf(baseUrl+"/iot/controls?topic=%s&message=%s", dev.MqttDataControl, dev.MqttControlOn)
				enriched["devicedata"] = "ON"
				enriched["icon_access"] = dev.IconOn
			}
		} else {
			enriched["control"] = []string{}
			enriched["devicedata"] = valueDataStr + " " + dev.Unit
			enriched["icon_access"] = dev.Icon
		}
		enriched["graph"] = baseUrl + "/iot/monitordevicechart?bucket=" + bucket + "&measurement=" + dev.Measurement + "&field=value&start=-5m&stop=now()&limit=120&lang=" + lang
		enriched["timestamp"] = helpers.GetCurrentFullDatenow()
		enriched["mqtt_connected"] = mqttConnected
		enriched["cache_used"] = fromDeviceCache
		//enriched["full_data"] = fmt.Sprintf("%v %s", valueDataStr, dev.Unit)

		enrichedDevices = append(enrichedDevices, enriched)
	}

	// 5. Group by hardware_id
	groups := make(map[int][]map[string]interface{})
	for _, ed := range enrichedDevices {
		hwID := toInt(ed["hardware_id"])
		groups[hwID] = append(groups[hwID], ed)
	}

	// 6. Build response groups
	responseGroups := make([]map[string]interface{}, 0, len(groups))
	for hwID, devs := range groups {
		groupName := groupNames[hwID]
		if groupName == "" {
			groupName = "Unknown"
		}
		responseGroups = append(responseGroups, map[string]interface{}{
			"group_id":   hwID,
			"group_name": groupName,
			"count":      len(devs),
			"devices":    devs,
		})
	}

	// 7. Layout
	layout := 2
	if len(enrichedDevices) > 0 {
		if l, ok := enrichedDevices[0]["layout"].(int); ok {
			layout = l
		}
	}
	layoutName := "Card"
	switch layout {
	case 1:
		layoutName = "Right Menu"
	case 2:
		layoutName = "Card"
	case 3:
		layoutName = "Left Menu"
	default:
		layoutName = "Footer Menu"
	}

	// 8. Final response
	response := map[string]interface{}{
		"bucket":           bucket,
		"timestamp":        helpers.GetCurrentFullDatenow(),
		"device_count":     len(enrichedDevices),
		"layout":           layout,
		"layout_name":      layoutName,
		"group_name":       groupNames[hardwareID],
		"device_type":      groupNames[hardwareID],
		"data":             responseGroups,
		"mqtt_connected":   mqttConnected,
		"mqtt_raw_payload": mqttRawPayload,
		"cache_used":       fromDeviceCache,
	}

	// 9. Cache final response (5 minutes)
	if cacheEnabled {
		finalCacheKey := "iot_group:" + fmt.Sprintf("%x", md5.Sum([]byte(fmt.Sprintf("%s:%d:%d:%s", bucket, locationID, hardwareID, lang))))
		data, _ := json.Marshal(response)
		_ = u.redisClient.Set(ctx, finalCacheKey, data, 5*time.Minute).Err()
	}

	return response, nil
}

// GetMonitorDeviceChart retrieves chart data from InfluxDB with caching.
// It extracts sensor values and timestamps, converts UTC timestamps to Asia/Bangkok (UTC+7),
// and returns them with the custom format "2006-01-02:15:04:05".
func (u *mqtt3UseCase) GetMonitorDeviceChart(ctx context.Context, req map[string]interface{}) (interface{}, error) {
	// 1. Extract required parameters from request
	bucket := ""
	if v, ok := req["bucket"]; ok {
		bucket = fmt.Sprintf("%v", v)
	}
	if bucket == "" {
		return nil, fmt.Errorf("bucket is required")
	}

	measurement := ""
	if v, ok := req["measurement"]; ok {
		measurement = fmt.Sprintf("%v", v)
	}
	if measurement == "" {
		measurement = "temperature" // fallback default
	}

	field := "value"
	if v, ok := req["field"]; ok {
		field = fmt.Sprintf("%v", v)
	}

	start := "-10m" // default: last 10 minutes
	if v, ok := req["start"]; ok {
		start = fmt.Sprintf("%v", v)
	}

	stop := "now()"
	if v, ok := req["stop"]; ok {
		stop = fmt.Sprintf("%v", v)
	}

	limit := 100
	if v, ok := req["limit"]; ok {
		if l, err := strconv.Atoi(fmt.Sprintf("%v", v)); err == nil && l > 0 {
			limit = l
		}
	}

	// cache_delete: if 1, delete existing cache and force a fresh query
	cacheDelete := 0
	if v, ok := req["cache_delete"]; ok {
		if val, err := strconv.Atoi(fmt.Sprintf("%v", v)); err == nil {
			cacheDelete = val
		}
	}

	// 2. Build cache key (hashed to avoid too long keys)
	cacheKey := fmt.Sprintf("monitor_chart:%s:%s:%s:%s:%s:%d",
		bucket, measurement, field, start, stop, limit)
	md5hash := fmt.Sprintf("%x", md5.Sum([]byte(cacheKey)))
	cacheKey = "mqtt_chart:" + md5hash

	// 3. Handle cache deletion if requested
	cacheEnabled := u.IsCacheEnabled()
	if cacheEnabled && cacheDelete == 1 {
		if err := u.redisClient.Del(ctx, cacheKey).Err(); err != nil {
			u.logger.Warnf("GetMonitorDeviceChart: failed to delete cache: %v", err)
		} else {
			u.logger.Infof("GetMonitorDeviceChart: cache deleted for key %s", cacheKey)
		}
	}

	// 4. Try to read from cache (skip if cacheDelete=1)
	if cacheEnabled && cacheDelete != 1 {
		cached, err := u.redisClient.Get(ctx, cacheKey).Bytes()
		if err == nil {
			var result map[string]interface{}
			if err := json.Unmarshal(cached, &result); err == nil {
				u.logger.Debugf("GetMonitorDeviceChart: cache hit for %s", bucket)
				result["cache"] = "cache"
				return result, nil
			}
		}
	}

	// 5. Query InfluxDB
	if u.influxClient == nil {
		return nil, fmt.Errorf("influx client not available")
	}

	params := influxdb.QueryParams{
		Measurement: measurement,
		Field:       field,
		Bucket:      bucket,
		Start:       start,
		Stop:        stop,
		Limit:       limit,
	}
	results, err := u.influxClient.QueryFilterData(params)
	if err != nil {
		u.logger.Errorf("GetMonitorDeviceChart: InfluxDB query failed: %v", err)
		// Return empty structure on error
		emptyResult := map[string]interface{}{
			"data":  []float64{},
			"date":  []string{},
			"cache": "error",
			"error": err.Error(),
		}
		return emptyResult, nil
	}

	// 6. Build data arrays with timezone conversion to Asia/Bangkok (UTC+7)
	var dataPoints []float64
	var timePoints []string

	// Load Asia/Bangkok timezone from helpers
	bangkokLoc := helpers.GetTimeLocation()

	for _, r := range results {
		if val, ok := r["_value"].(float64); ok {
			dataPoints = append(dataPoints, val)
		}
		if t, ok := r["_time"].(time.Time); ok {
			// Convert UTC to Asia/Bangkok (UTC+7)
			bangkokTime := t.In(bangkokLoc)
			// Format with colon separator: "2006-01-02:15:04:05"
			timePoints = append(timePoints, bangkokTime.Format("2006-01-02:15:04:05"))
		}
	}

	// Prepare response
	response := map[string]interface{}{
		"data":  dataPoints,
		"date":  timePoints,
		"cache": "no cache",
	}

	// 7. Store in cache with 45 seconds TTL (short because sensor data changes frequently)
	if cacheEnabled {
		dataBytes, _ := json.Marshal(response)
		if err := u.redisClient.Set(ctx, cacheKey, dataBytes, 45*time.Second).Err(); err != nil {
			u.logger.Warnf("GetMonitorDeviceChart: failed to cache: %v", err)
		} else {
			u.logger.Debugf("GetMonitorDeviceChart: cached with TTL 45s")
		}
	}

	return response, nil
}

// GetTopicDataDeviceChart returns historical chart data + latest MQTT payload
func (u *mqtt3UseCase) GetTopicDataDeviceChart(ctx context.Context, req map[string]interface{}) (interface{}, error) {
	// ======================== 1. Extract parameters ========================
	bucket := ""
	if v, ok := req["bucket"]; ok {
		bucket = fmt.Sprintf("%v", v)
	}
	if bucket == "" {
		return nil, fmt.Errorf("bucket is required")
	}

	topic := ""
	if v, ok := req["topic"]; ok {
		topic = fmt.Sprintf("%v", v)
	}
	if topic == "" {
		topic = bucket + "/DATA"
	}

	measurement := ""
	if v, ok := req["measurement"]; ok {
		measurement = fmt.Sprintf("%v", v)
	}
	if measurement == "" {
		measurement = "temperature"
	}

	field := "value"
	if v, ok := req["field"]; ok {
		field = fmt.Sprintf("%v", v)
	}

	start := "-10m"
	if v, ok := req["start"]; ok {
		start = fmt.Sprintf("%v", v)
	}

	stop := "now()"
	if v, ok := req["stop"]; ok {
		stop = fmt.Sprintf("%v", v)
	}

	limit := 100
	if v, ok := req["limit"]; ok {
		if l, err := strconv.Atoi(fmt.Sprintf("%v", v)); err == nil && l > 0 {
			limit = l
		}
	}

	cacheDelete := 0
	if v, ok := req["delcache"]; ok {
		if val, err := strconv.Atoi(fmt.Sprintf("%v", v)); err == nil {
			cacheDelete = val
		}
	}
	cacheEnabled := u.IsCacheEnabled()

	// ======================== 2. Cache key for chart data ========================
	cacheKeyChart := fmt.Sprintf("monitor_chart:%s:%s:%s:%s:%s:%d",
		bucket, measurement, field, start, stop, limit)
	md5hash := fmt.Sprintf("%x", md5.Sum([]byte(cacheKeyChart)))
	cacheKeyChart = "mqtt_chart:" + md5hash

	// ======================== 3. Delete chart cache if requested ========================
	if cacheEnabled && cacheDelete == 1 {
		if err := u.redisClient.Del(ctx, cacheKeyChart).Err(); err != nil {
			u.logger.Warnf("GetTopicDataDeviceChart: failed to delete chart cache: %v", err)
		} else {
			u.logger.Infof("GetTopicDataDeviceChart: chart cache deleted for key %s", cacheKeyChart)
		}
	}

	// ======================== 4. Try reading chart from cache ========================
	var chartResponse map[string]interface{}
	fromCache := false

	if cacheEnabled && cacheDelete != 1 {
		cached, err := u.redisClient.Get(ctx, cacheKeyChart).Bytes()
		if err == nil {
			var result map[string]interface{}
			if err := json.Unmarshal(cached, &result); err == nil {
				u.logger.Debugf("GetTopicDataDeviceChart: chart cache HIT for %s", bucket)
				chartResponse = result
				fromCache = true
			}
		}
	}

	// 5. If cache miss, query InfluxDB
	if !fromCache {
		if u.influxClient == nil {
			return nil, fmt.Errorf("influx client not available")
		}
		params := influxdb.QueryParams{
			Measurement: measurement,
			Field:       field,
			Bucket:      bucket,
			Start:       start,
			Stop:        stop,
			Limit:       limit,
		}
		results, err := u.influxClient.QueryFilterData(params)
		if err != nil {
			u.logger.Errorf("GetTopicDataDeviceChart: InfluxDB query failed: %v", err)
			chartResponse = map[string]interface{}{
				"data":  []float64{},
				"date":  []string{},
				"error": err.Error(),
			}
		} else {
			var dataPoints []float64
			var timePoints []string
			bangkokLoc := helpers.GetTimeLocation()
			for _, r := range results {
				if val, ok := r["_value"].(float64); ok {
					dataPoints = append(dataPoints, val)
				}
				if t, ok := r["_time"].(time.Time); ok {
					bangkokTime := t.In(bangkokLoc)
					timePoints = append(timePoints, bangkokTime.Format("2006-01-02:15:04:05"))
				}
			}
			chartResponse = map[string]interface{}{
				"data": dataPoints,
				"date": timePoints,
			}
		}

		// store in cache (TTL 45s)
		if cacheEnabled {
			dataBytes, _ := json.Marshal(chartResponse)
			if err := u.redisClient.Set(ctx, cacheKeyChart, dataBytes, 45*time.Second).Err(); err != nil {
				u.logger.Warnf("GetTopicDataDeviceChart: failed to cache chart: %v", err)
			}
		}
	}

	// ======================== 6. Get latest MQTT payload (logic from GetTopic) ========================
	cacheKeyMqtt := "mqtt_topic:" + topic
	var mqttPayload interface{}
	mqttFrom := ""
	mqttError := ""

	// Delete MQTT cache if requested
	if cacheEnabled && cacheDelete == 1 {
		if err := u.redisClient.Del(ctx, cacheKeyMqtt).Err(); err != nil {
			u.logger.Warnf("GetTopicDataDeviceChart: failed to delete MQTT cache: %v", err)
		}
	}

	// Try MQTT cache
	if cacheEnabled && cacheDelete != 1 {
		cached, err := u.redisClient.Get(ctx, cacheKeyMqtt).Bytes()
		if err == nil && len(cached) > 0 {
			if err := json.Unmarshal(cached, &mqttPayload); err != nil {
				mqttPayload = string(cached)
			}
			mqttFrom = "cache"
		}
	}

	// If not in cache, fetch from MQTT
	if mqttFrom == "" {
		mqttCtx, cancel := context.WithTimeout(ctx, 5*time.Second)
		defer cancel()
		data, err := u.mqttClient.GetDataFromTopic(mqttCtx, topic, 5*time.Second)
		if err != nil {
			mqttError = err.Error()
			// Fallback to cache if available
			if cacheEnabled {
				if cached, cacheErr := u.redisClient.Get(ctx, cacheKeyMqtt).Bytes(); cacheErr == nil && len(cached) > 0 {
					if err := json.Unmarshal(cached, &mqttPayload); err != nil {
						mqttPayload = string(cached)
					}
					mqttFrom = "cache_fallback"
					mqttError = ""
					u.logger.Warnf("GetTopicDataDeviceChart: MQTT fetch failed, using cache fallback: %v", err)
				}
			}
		} else {
			if err := json.Unmarshal(data, &mqttPayload); err != nil {
				mqttPayload = string(data)
			}
			mqttFrom = "mqtt"
			if cacheEnabled {
				if err := u.redisClient.Set(ctx, cacheKeyMqtt, data, 10*time.Second).Err(); err != nil {
					u.logger.Warnf("GetTopicDataDeviceChart: failed to cache MQTT payload: %v", err)
				}
			}
		}
	}

	// ======================== 7. Build final response ========================
	response := map[string]interface{}{
		"topic":          topic,
		"chart":          chartResponse,
		"latest_payload": mqttPayload,
		"latest_from":    mqttFrom,
		"cache":          "no cache",
	}
	if fromCache {
		response["cache"] = "cache"
	}
	if mqttError != "" {
		response["latest_error"] = mqttError
	}

	return response, nil
}

// ============================================================================
// NEW METHODS (device management & data processing) - FIXED
// ============================================================================

func (u *mqtt3UseCase) GetDeviceStatus(ctx context.Context, deviceID string) (*presenter.DeviceStatusResponse, error) {
	status, err := u.deviceStatusRepo.GetByDeviceID(ctx, deviceID)
	if err != nil {
		return nil, err
	}
	if status == nil {
		// create default status
		now := time.Now()
		status = &models.DeviceStatus{
			DeviceID:  deviceID,
			IsOnline:  false,
			IsActive:  true,
			LastSeen:  now,
			CreatedAt: now,
			UpdatedAt: now,
		}
		_ = u.deviceStatusRepo.Upsert(ctx, status)
	}
	// calculate online status
	fifteenMinAgo := time.Now().Add(-15 * time.Minute)
	isOnline := status.LastSeen.After(fifteenMinAgo)

	uptime := "0s"
	if status.FirstSeen != nil {
		dur := time.Since(*status.FirstSeen)
		uptime = dur.String()
	}

	// Unmarshal JSON fields to maps
	var location map[string]interface{}
	if len(status.Location) > 0 {
		_ = json.Unmarshal(status.Location, &location)
	}
	var lastData map[string]interface{}
	if len(status.LastData) > 0 {
		_ = json.Unmarshal(status.LastData, &lastData)
	}

	return &presenter.DeviceStatusResponse{
		DeviceID:        status.DeviceID,
		IsOnline:        isOnline,
		IsActive:        status.IsActive,
		LastSeen:        status.LastSeen,
		BatteryLevel:    status.BatteryLevel,
		SignalStrength:  status.SignalStrength,
		FirmwareVersion: status.FirmwareVersion,
		Location:        location,
		LastData:        lastData,
		Uptime:          uptime,
	}, nil
}

func (u *mqtt3UseCase) UpdateDeviceStatus(ctx context.Context, deviceID string, data map[string]interface{}) error {
	status, err := u.deviceStatusRepo.GetByDeviceID(ctx, deviceID)
	if err != nil {
		return err
	}
	if status == nil {
		status = &models.DeviceStatus{DeviceID: deviceID}
	}
	status.LastSeen = time.Now()

	// Marshal data to JSON
	jsonData, err := json.Marshal(data)
	if err != nil {
		return err
	}
	status.LastData = jsonData
	status.IsOnline = true

	// Update fields from data
	if battery, ok := data["battery"].(float64); ok {
		b := int(battery)
		status.BatteryLevel = &b
	}
	if signal, ok := data["signal"].(float64); ok {
		s := int(signal)
		status.SignalStrength = &s
	}
	if firmware, ok := data["firmware"].(string); ok {
		status.FirmwareVersion = &firmware
	}
	if loc, ok := data["location"].(map[string]interface{}); ok {
		locJSON, err := json.Marshal(loc)
		if err == nil {
			status.Location = locJSON
		}
	}
	status.UpdatedAt = time.Now()
	return u.deviceStatusRepo.Upsert(ctx, status)
}

func (u *mqtt3UseCase) GetDeviceConfig(ctx context.Context, deviceID string) (*models.DeviceConfig, error) {
	cfg, err := u.deviceConfigRepo.GetByDeviceID(ctx, deviceID)
	if err != nil {
		return nil, err
	}
	if cfg == nil {
		// return default config
		defaultConfig := map[string]interface{}{
			"general": map[string]interface{}{
				"deviceName": "",
				"timezone":   "Asia/Bangkok",
				"location": map[string]interface{}{
					"lat": 0, "lng": 0, "address": "",
				},
			},
			"reporting": map[string]interface{}{
				"enabled":  true,
				"interval": 300,
				"format":   "json",
			},
			"thresholds": map[string]interface{}{
				"temperature": map[string]interface{}{"min": 15, "max": 40},
				"humidity":    map[string]interface{}{"min": 30, "max": 80},
			},
			"alerts": map[string]interface{}{
				"enabled": true,
				"email":   []string{},
				"sms":     []string{},
			},
		}
		defaultCfgBytes, _ := json.Marshal(defaultConfig)
		cfg = &models.DeviceConfig{
			DeviceID:  deviceID,
			Config:    defaultCfgBytes,
			Status:    "active",
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		}
		_ = u.deviceConfigRepo.Upsert(ctx, cfg)
	}
	return cfg, nil
}

func (u *mqtt3UseCase) UpdateDeviceConfig(ctx context.Context, deviceID string, config map[string]interface{}) error {
	cfg, err := u.deviceConfigRepo.GetByDeviceID(ctx, deviceID)
	if err != nil {
		return err
	}
	if cfg == nil {
		cfg = &models.DeviceConfig{DeviceID: deviceID}
	}
	// merge config
	existing := make(map[string]interface{})
	if len(cfg.Config) > 0 {
		_ = json.Unmarshal(cfg.Config, &existing)
	}
	merged := deepMerge(existing, config)
	mergedBytes, _ := json.Marshal(merged)
	cfg.Config = mergedBytes
	cfg.UpdatedAt = time.Now()
	return u.deviceConfigRepo.Upsert(ctx, cfg)
}

func (u *mqtt3UseCase) ProcessMqttData(ctx context.Context, deviceID string, rawData string) (*models.IotData, error) {
	// ดึงข้อมูลอุปกรณ์เพื่อนำ MqttStatusDataName
	var configMap map[string]string
	listReq := &repository.DeviceListAlarmRequest{
		DeviceID: deviceID,
		Page:     1,
		PageSize: 1,
	}
	deviceResult, err := u.deviceRepo.ListDevicesWithAlarm(ctx, listReq)
	if err == nil && len(deviceResult.Items) > 0 {
		device := deviceResult.Items[0]
		if device.MqttStatusDataName != "" {
			if err := json.Unmarshal([]byte(device.MqttStatusDataName), &configMap); err != nil {
				u.logger.Warnf("ProcessMqttData: failed to parse MqttStatusDataName for device %s: %v", deviceID, err)
				configMap = nil
			}
		}
	} else {
		u.logger.Warnf("ProcessMqttData: device %s not found, using index-based mapping", deviceID)
	}
	// 2. แยก rawData ด้วย comma
	parts := strings.Split(rawData, ",")
	dataMap := make(map[string]interface{})

	// 3. สร้าง map โดยใช้ configMap หรือ index ถ้าไม่มี config
	for i, val := range parts {
		key := fmt.Sprintf("%d", i)
		if configMap != nil {
			if mapped, ok := configMap[key]; ok {
				key = mapped
			}
		}
		trimmed := strings.TrimSpace(val)
		// พยายามแปลงเป็น float64 ถ้าได้
		if f, err := strconv.ParseFloat(trimmed, 64); err == nil {
			dataMap[key] = f
		} else {
			dataMap[key] = trimmed
		}
	}

	// 4. เก็บ raw data ไว้ด้วย
	dataMap["raw"] = rawData

	// 5. Marshal เป็น JSON
	jsonData, err := json.Marshal(dataMap)
	if err != nil {
		return nil, err
	}

	// 6. สร้าง IotData object
	iotData := &models.IotData{
		DeviceID:  deviceID,
		Data:      jsonData,
		Timestamp: time.Now(),
		CreatedAt: time.Now(),
	}

	// 7. บันทึกลง repository
	if err := u.iotDataRepo.Create(ctx, iotData); err != nil {
		return nil, err
	}

	// 8. อัปเดตสถานะอุปกรณ์
	_ = u.UpdateDeviceStatus(ctx, deviceID, dataMap)

	// 9. บันทึก activity log
	_ = u.logActivity(ctx, "DATA_RECEIVED", "Received data from "+deviceID, deviceID, nil)

	return iotData, nil
}

func (u *mqtt3UseCase) GetLatestData(ctx context.Context, deviceID string, limit int) ([]models.IotData, error) {
	if limit <= 0 {
		limit = 10
	}
	return u.iotDataRepo.GetByDeviceID(ctx, deviceID, limit, 0)
}

func (u *mqtt3UseCase) GetDataByDateRange(ctx context.Context, deviceID string, start, end time.Time) ([]models.IotData, error) {
	return u.iotDataRepo.GetByDateRange(ctx, deviceID, start, end)
}

func (u *mqtt3UseCase) CleanupOldData(ctx context.Context, days int) (int64, error) {
	cutoff := time.Now().Add(-time.Duration(days) * 24 * time.Hour)
	return u.iotDataRepo.DeleteOlderThan(ctx, cutoff)
}

func (u *mqtt3UseCase) ListIotData(ctx context.Context, opts *presenter.IotDataListOptions) (*presenter.PaginatedIotData, error) {
	if opts.Limit <= 0 {
		opts.Limit = 50
	}
	if opts.Page <= 0 {
		opts.Page = 1
	}
	offset := (opts.Page - 1) * opts.Limit

	total, err := u.iotDataRepo.CountByDeviceID(ctx, opts.DeviceID)
	if err != nil {
		return nil, err
	}

	items, err := u.iotDataRepo.GetByDeviceID(ctx, opts.DeviceID, opts.Limit, offset)
	if err != nil {
		return nil, err
	}

	responseItems := make([]presenter.IotDataResponse, len(items))
	for i, item := range items {
		responseItems[i] = u.convertToIotDataResponse(item)
	}

	pages := int((total + int64(opts.Limit) - 1) / int64(opts.Limit))

	return &presenter.PaginatedIotData{
		Data: responseItems,
		Pagination: presenter.Pagination{
			Total: total,
			Page:  opts.Page,
			Limit: opts.Limit,
			Pages: pages,
		},
	}, nil
}

func (u *mqtt3UseCase) convertToIotDataResponse(item models.IotData) presenter.IotDataResponse {
	return presenter.IotDataResponse{
		ID:        item.ID,
		DeviceID:  item.DeviceID,
		Data:      item.Data, // datatypes.JSON is okay if the response uses same type
		Timestamp: item.Timestamp,
	}
}

func (u *mqtt3UseCase) GetDeviceStats(ctx context.Context, deviceID string) (*presenter.DeviceStats, error) {
	data, err := u.iotDataRepo.GetByDeviceID(ctx, deviceID, 1000, 0)
	if err != nil {
		return nil, err
	}
	stats := &presenter.DeviceStats{
		Count: len(data),
	}
	if len(data) > 0 {
		stats.LastRecord = &data[0].Timestamp
		stats.FirstRecord = &data[len(data)-1].Timestamp
	}
	return stats, nil
}

func (u *mqtt3UseCase) ExportData(ctx context.Context, req *presenter.ExportRequest) ([]byte, string, error) {
	data, err := u.iotDataRepo.GetByDateRange(ctx, req.DeviceID, req.StartDate, req.EndDate)
	if err != nil {
		return nil, "", err
	}
	if req.Format == "csv" {
		var csvRows [][]string
		csvRows = append(csvRows, []string{"timestamp", "device_id", "data"})
		for _, d := range data {
			dataJSON, _ := json.Marshal(d.Data)
			csvRows = append(csvRows, []string{
				d.Timestamp.Format(time.RFC3339),
				d.DeviceID,
				string(dataJSON),
			})
		}
		var out []byte
		for _, row := range csvRows {
			out = append(out, strings.Join(row, ",")...)
			out = append(out, '\n')
		}
		return out, "text/csv", nil
	}
	// default JSON
	jsonData, err := json.Marshal(data)
	if err != nil {
		return nil, "", err
	}
	return jsonData, "application/json", nil
}

// ============================================================================
// HELPER FUNCTIONS (copied from original)
// ============================================================================

func toFloat(v interface{}) float64 {
	switch val := v.(type) {
	case float64:
		return val
	case int:
		return float64(val)
	case int64:
		return float64(val)
	case string:
		f, _ := strconv.ParseFloat(val, 64)
		return f
	default:
		return 0
	}
}

func toInt(v interface{}) int {
	switch val := v.(type) {
	case int:
		return val
	case int64:
		return int(val)
	case float64:
		return int(val)
	case string:
		i, _ := strconv.Atoi(val)
		return i
	default:
		return 0
	}
}

func parseFloat(s string) float64 {
	f, _ := strconv.ParseFloat(s, 64)
	return f
}

func parseInt(s string) int {
	i, _ := strconv.Atoi(s)
	return i
}

func structToMap(item interface{}) map[string]interface{} {
	val := reflect.ValueOf(item)
	if val.Kind() == reflect.Ptr {
		val = val.Elem()
	}
	if val.Kind() != reflect.Struct {
		return nil
	}
	result := make(map[string]interface{})
	typ := val.Type()
	for i := range val.NumField() {
		field := typ.Field(i)
		if !field.IsExported() {
			continue
		}
		jsonTag := field.Tag.Get("json")
		if jsonTag == "" || jsonTag == "-" {
			continue
		}
		name := strings.Split(jsonTag, ",")[0]
		result[name] = val.Field(i).Interface()
	}
	return result
}

func getMqttNameFromDevices(devices []repository.DeviceAlarmListItem) string {
	for _, d := range devices {
		if d.MqttName != "" {
			return d.MqttName
		}
	}
	return ""
}

func deepMerge(a, b map[string]interface{}) map[string]interface{} {
	result := make(map[string]interface{})
	for k, v := range a {
		result[k] = v
	}
	for k, v := range b {
		if vMap, ok := v.(map[string]interface{}); ok {
			if existing, ok := result[k].(map[string]interface{}); ok {
				result[k] = deepMerge(existing, vMap)
			} else {
				result[k] = vMap
			}
		} else {
			result[k] = v
		}
	}
	return result
}

func (u *mqtt3UseCase) logActivity(ctx context.Context, typ, details, deviceID string, data interface{}) error {
	jsonData, _ := json.Marshal(data)
	log := &models.ActivityLog{
		Type:      typ,
		DeviceID:  &deviceID,
		Details:   details,
		Severity:  "info",
		Timestamp: time.Now(),
		CreatedAt: time.Now(),
	}
	if jsonData != nil {
		log.Data = jsonData
	}
	return u.activityLogRepo.Create(ctx, log)
}

// enrichDevice enriches a single device with alarm status, control URLs, icons, etc.
func (u *mqtt3UseCase) enrichDevice(dev repository.DeviceAlarmListItem, mqttDataMap map[string]interface{}, mqttConnected bool, lang string, baseUrl string, fromDeviceCache bool) map[string]interface{} {
	enriched := make(map[string]interface{}, 30)
	// Copy basic fields
	enriched["device_id"] = dev.DeviceID
	enriched["device_name"] = dev.DeviceName
	enriched["hardware_id"] = dev.HardwareID
	enriched["type_id"] = dev.TypeID
	enriched["type_name"] = dev.TypeName
	enriched["location_name"] = dev.LocationName
	enriched["unit"] = dev.Unit
	enriched["status"] = dev.Status
	enriched["layout"] = dev.Layout
	enriched["menu"] = dev.Menu
	enriched["mqtt_data_value"] = dev.MqttDataValue
	enriched["mqtt_data_control"] = dev.MqttDataControl
	enriched["measurement"] = dev.Measurement
	enriched["mqtt_control_on"] = dev.MqttControlOn
	enriched["mqtt_control_off"] = dev.MqttControlOff
	enriched["icon"] = dev.Icon
	enriched["icon_on"] = dev.IconOn
	enriched["icon_off"] = dev.IconOff

	// Value from MQTT (fallback to "0")
	var rawValue interface{} = "0"
	if mqttDataMap != nil {
		if val, ok := mqttDataMap[dev.Measurement]; ok {
			rawValue = val
		} else if val, ok := mqttDataMap[dev.MqttDeviceName]; ok {
			rawValue = val
		}
	}
	valueDataFloat := toFloat(rawValue)

	// Calibration for hardware_id == 1
	if dev.HardwareID == 1 {
		switch dev.CalibrationType {
		case 1:
			valueDataFloat += toFloat(dev.CalibrationAdd)
		case 2:
			valueDataFloat -= toFloat(dev.CalibrationSubtract)
		}
	}
	var valueDataStr string
	if dev.HardwareID == 1 {
		valueDataStr = fmt.Sprintf("%.2f", valueDataFloat)
	} else {
		valueDataStr = fmt.Sprintf("%v", rawValue)
	}
	enriched["value_data"] = valueDataStr

	// Alarm evaluation
	alarmDto := iothelper.AlarmDetailDto{
		HardwareID:      dev.HardwareID,
		ValueData:       valueDataStr,
		Max:             dev.Max,
		Min:             dev.Min,
		StatusAlert:     dev.StatusAlert,
		StatusWarning:   dev.StatusWarning,
		RecoveryWarning: dev.RecoveryWarning,
		RecoveryAlert:   dev.RecoveryAlert,
		DeviceName:      dev.DeviceName,
		ActionName:      dev.MqttName,
		MqttName:        dev.MqttName,
		MqttControlOn:   dev.MqttControlOn,
		MqttControlOff:  dev.MqttControlOff,
		CountAlarm:      0,
		Event:           1,
		Unit:            dev.Unit,
	}
	var alarmResult iothelper.AlarmDetailResult
	if lang == "th" {
		alarmResult = iothelper.AlarmDetailValidateTh(alarmDto)
	} else {
		alarmResult = iothelper.AlarmDetailValidateEn(alarmDto)
	}
	enriched["alarm_title"] = alarmResult.Title
	enriched["alarm_subject"] = alarmResult.Subject
	enriched["alarm_status"] = alarmResult.Status

	// Control URL and icon
	if dev.HardwareID > 1 {
		if valueDataFloat >= 1 {
			enriched["control"] = fmt.Sprintf(baseUrl+"/iot/controls?topic=%s&message=%s", dev.MqttDataControl, dev.MqttControlOff)
			enriched["devicedata"] = "OFF"
			enriched["icon_access"] = dev.IconOff
		} else {
			enriched["control"] = fmt.Sprintf(baseUrl+"/iot/controls?topic=%s&message=%s", dev.MqttDataControl, dev.MqttControlOn)
			enriched["devicedata"] = "ON"
			enriched["icon_access"] = dev.IconOn
		}
	} else {
		enriched["control"] = []string{}
		enriched["devicedata"] = valueDataStr + " " + dev.Unit
		enriched["icon_access"] = dev.Icon
	}
	enriched["graph"] = fmt.Sprintf(baseUrl+"/iot/monitordevicechart?bucket=%s&measurement=%s&field=value&start=-5m&stop=now()&limit=120&lang=%s",
		dev.DeviceBucket, dev.Measurement, lang)
	enriched["timestamp"] = helpers.GetCurrentFullDatenow()
	enriched["mqtt_connected"] = mqttConnected
	enriched["cache_used"] = fromDeviceCache

	return enriched
}
