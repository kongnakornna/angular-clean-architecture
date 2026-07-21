package models

import (
	"time"

	"gorm.io/datatypes"
)

// DeviceStatus corresponds to TypeORM entity DeviceStatus
type DeviceStatus struct {
	ID              int            `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	DeviceID        string         `gorm:"column:device_id;type:varchar(50);uniqueIndex" json:"deviceId"`
	IsOnline        bool           `gorm:"column:is_online;default:true;index" json:"isOnline"`
	IsActive        bool           `gorm:"column:is_active;default:true;index" json:"isActive"`
	LastSeen        time.Time      `gorm:"column:last_seen;type:timestamptz;index" json:"lastSeen"`
	LastData        datatypes.JSON `gorm:"column:last_data;type:jsonb" json:"lastData,omitempty"`
	BatteryLevel    *int           `gorm:"column:battery_level;type:int" json:"batteryLevel,omitempty"`
	SignalStrength  *int           `gorm:"column:signal_strength;type:int" json:"signalStrength,omitempty"`
	Temperature     *float64       `gorm:"column:temperature;type:float" json:"temperature,omitempty"`
	Humidity        *float64       `gorm:"column:humidity;type:float" json:"humidity,omitempty"`
	FirmwareVersion *string        `gorm:"column:firmware_version;type:varchar(20)" json:"firmwareVersion,omitempty"`
	Uptime          *int           `gorm:"column:uptime;type:int" json:"uptime,omitempty"`
	Location        datatypes.JSON `gorm:"column:location;type:jsonb" json:"location,omitempty"`
	NetworkInfo     datatypes.JSON `gorm:"column:network_info;type:jsonb" json:"networkInfo,omitempty"`
	HardwareInfo    datatypes.JSON `gorm:"column:hardware_info;type:jsonb" json:"hardwareInfo,omitempty"`
	Metrics         datatypes.JSON `gorm:"column:metrics;type:jsonb" json:"metrics,omitempty"`
	StatusMessage   *string        `gorm:"column:status_message;type:text" json:"statusMessage,omitempty"`
	CustomFields    datatypes.JSON `gorm:"column:custom_fields;type:jsonb" json:"customFields,omitempty"`
	CreatedAt       time.Time      `gorm:"column:created_at;autoCreateTime" json:"createdAt"`
	UpdatedAt       time.Time      `gorm:"column:updated_at;autoUpdateTime" json:"updatedAt"`
	FirstSeen       *time.Time     `gorm:"column:first_seen;type:timestamptz" json:"firstSeen,omitempty"`
	LastMaintenance *time.Time     `gorm:"column:last_maintenance;type:timestamptz" json:"lastMaintenance,omitempty"`
	ConnectionCount int            `gorm:"column:connection_count;default:0" json:"connectionCount"`
}

func (DeviceStatus) TableName() string {
	return "device_status"
}
