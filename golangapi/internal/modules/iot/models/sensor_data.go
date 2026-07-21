package models

import (
	"time"

	"gorm.io/datatypes"
)

// SensorData corresponds to TypeORM entity SensorData
type SensorData struct {
	ID                 int               `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	DeviceID           int               `gorm:"column:device_id;index" json:"DeviceId"`
	Device             *Device           `gorm:"foreignKey:DeviceID;references:DeviceID" json:"Device,omitempty"`
	Value              float64           `gorm:"column:value;type:decimal(10,2)" json:"value"`
	RawData            datatypes.JSON    `gorm:"column:raw_data;type:jsonb" json:"rawData,omitempty"`
	NotificationTypeID *int              `gorm:"column:notification_type_id;index" json:"notificationTypeId,omitempty"`
	NotificationType   *NotificationType `gorm:"foreignKey:NotificationTypeID;references:ID" json:"notificationType,omitempty"`
	BatteryLevel       *float64          `gorm:"column:battery_level;type:decimal(5,2)" json:"batteryLevel,omitempty"`
	SignalStrength     *int              `gorm:"column:signal_strength" json:"signalStrength,omitempty"`
	Timestamp          time.Time         `gorm:"column:timestamp;default:CURRENT_TIMESTAMP;index" json:"timestamp"`
	CreatedAt          time.Time         `gorm:"column:created_at;autoCreateTime" json:"createdAt"`
}

func (SensorData) TableName() string {
	return "sd_sensor_data"
}
