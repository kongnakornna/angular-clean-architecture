// internal/modules/iot/presenter/presenter.go
package presenter

import (
	"time"
)

type DeviceListRequest struct {
	Page       int    `json:"page"`
	PageSize   int    `json:"pageSize"`
	Bucket     string `json:"bucket"`
	HardwareId int    `json:"hardware_id"`
	TypeId     int    `json:"type_id"`
	Keyword    string `json:"keyword"`
	Lang       string `json:"lang"`
}

type DeviceDetailResponse struct {
	DeviceId        int    `json:"device_id"`
	DeviceName      string `json:"device_name"`
	TypeName        string `json:"type_name"`
	ValueData       string `json:"value_data"`
	Unit            string `json:"unit"`
	Status          int    `json:"status"`
	AlarmTitle      string `json:"alarm_title"`
	StatusWarning   string `json:"status_warning,omitempty"`
	StatusAlert     string `json:"status_alert,omitempty"`
	RecoveryWarning string `json:"recovery_warning,omitempty"`
	RecoveryAlert   string `json:"recovery_alert,omitempty"`
	Icon            string `json:"icon,omitempty"`
	ColorNormal     string `json:"color_normal,omitempty"`
	ColorWarning    string `json:"color_warning,omitempty"`
	ColorAlert      string `json:"color_alert,omitempty"`
}

type TopicDataResponse struct {
	Topic         string      `json:"topic"`
	Payload       interface{} `json:"payload"`
	From          string      `json:"from"`  // "cache", "mqtt", "error", "fallback"
	Cache         bool        `json:"cache"` // true if from cache
	Timestamp     string      `json:"timestamp,omitempty"`
	MqttConnected bool        `json:"mqtt_connected,omitempty"`
	CacheEnabled  bool        `json:"cache_enabled,omitempty"` // เพิ่ม field นี้
	ErrorDetail   string      `json:"error_detail,omitempty"`
}

type ControlRequest struct {
	Topic   string `json:"topic"  example:"CMONBUGKET01/CONTROL"`
	Message string `json:"message"  example:"ON"`
}

type SenserChartRequest struct {
	Bucket      string `json:"bucket"`
	Measurement string `json:"measurement"`
	Field       string `json:"field"`
	Start       string `json:"start"`
	Stop        string `json:"stop"`
	Limit       int    `json:"limit"`
}

type SenserChartResponse struct {
	Data  []float64 `json:"data"`
	Date  []string  `json:"date"`
	Cache string    `json:"cache"`
}

type DeviceBucketsResponse struct {
	Bucket  string                 `json:"bucket"`
	Devices []DeviceDetailResponse `json:"devices"`
}

// MQTTTopicDataResponse สำหรับ GET /mqtt/gettopicdata
type MQTTTopicDataResponse struct {
	StatusCode      int         `json:"statuscode" example:"200"`
	Code            int         `json:"code" example:"200"`
	Topic           string      `json:"topic" example:"AIRCOM4/DATA"`
	Payload         interface{} `json:"payload"` // ✅ remove example:"25.5,60,1013"
	From            string      `json:"from" example:"mqtt"`
	Timestamp       string      `json:"timestamp" example:"2026-06-08T12:36:58+07:00"`
	Message         string      `json:"message" example:"live data"`
	MqttConnected   bool        `json:"mqtt_connected,omitempty" example:"true"`
	CacheEnabled    bool        `json:"cache_enabled,omitempty" example:"true"`
	CacheHit        bool        `json:"cache_hit,omitempty" example:"false"`
	DataLength      int         `json:"data_length,omitempty" example:"128"`
	FetchDurationMs int64       `json:"fetch_duration_ms,omitempty" example:"145"`
	ErrorDetail     string      `json:"error_detail,omitempty" example:"timeout waiting for message"`
}

type DeviceListResponse struct {
	Data  []DeviceDetailResponse `json:"data"`
	Total int64                  `json:"total"`
	Page  int                    `json:"page"`
}

type DeviceStatusResponse struct {
	DeviceID        string                 `json:"deviceId"`
	IsOnline        bool                   `json:"isOnline"`
	IsActive        bool                   `json:"isActive"`
	LastSeen        time.Time              `json:"lastSeen"`
	BatteryLevel    *int                   `json:"batteryLevel,omitempty"`
	SignalStrength  *int                   `json:"signalStrength,omitempty"`
	FirmwareVersion *string                `json:"firmwareVersion,omitempty"`
	Location        map[string]interface{} `json:"location,omitempty"`
	LastData        map[string]interface{} `json:"lastData,omitempty"`
	Uptime          string                 `json:"uptime"`
}

type IotDataListOptions struct {
	Page      int        `json:"page"`
	Limit     int        `json:"limit"`
	DeviceID  string     `json:"deviceId"`
	StartDate *time.Time `json:"startDate,omitempty"`
	EndDate   *time.Time `json:"endDate,omitempty"`
	DataType  string     `json:"dataType,omitempty"`
	SortBy    string     `json:"sortBy,omitempty"`
	SortOrder string     `json:"sortOrder,omitempty"`
}
type IotDataResponse struct {
	ID        int         `json:"id"`
	DeviceID  string      `json:"device_id"`
	Data      interface{} `json:"data"`
	Timestamp time.Time   `json:"timestamp"`
	Location  interface{} `json:"location,omitempty"`
	Metadata  interface{} `json:"metadata,omitempty"`
}

type Pagination struct {
	Page  int   `json:"page"`
	Limit int   `json:"limit"`
	Total int64 `json:"total"`
	Pages int   `json:"pages,omitempty"`
}

type PaginatedIotData struct {
	Data       []IotDataResponse `json:"data"`
	Pagination Pagination        `json:"pagination"`
}

type DeviceStats struct {
	Count       int                    `json:"count"`
	FirstRecord *time.Time             `json:"firstRecord,omitempty"`
	LastRecord  *time.Time             `json:"lastRecord,omitempty"`
	DataPoints  map[string]interface{} `json:"dataPoints,omitempty"`
}

type ExportRequest struct {
	DeviceID  string    `json:"deviceId"`
	StartDate time.Time `json:"startDate"`
	EndDate   time.Time `json:"endDate"`
	Format    string    `json:"format"`
}
