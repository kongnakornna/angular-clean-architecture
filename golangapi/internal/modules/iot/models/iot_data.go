package models

import (
	"time"

	"gorm.io/datatypes"
)

// IotData corresponds to TypeORM entity IotData
type IotData struct {
	ID          int            `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	DeviceID    string         `gorm:"column:device_id;type:varchar(50);index:idx_iot_data_device_id_timestamp,priority:1" json:"deviceId"`
	Data        datatypes.JSON `gorm:"column:data;type:jsonb" json:"data" swaggertype:"object"` // ✅ added swaggertype
	Timestamp   time.Time      `gorm:"column:timestamp;type:timestamptz;default:CURRENT_TIMESTAMP;index:idx_iot_data_device_id_timestamp,priority:2" json:"timestamp"`
	Location    datatypes.JSON `gorm:"column:location;type:jsonb" json:"location,omitempty" swaggertype:"object"` // also add here if needed
	Metadata    datatypes.JSON `gorm:"column:metadata;type:jsonb" json:"metadata,omitempty" swaggertype:"object"`
	DataType    *string        `gorm:"column:data_type;type:varchar(20)" json:"dataType,omitempty"`
	DataQuality *float64       `gorm:"column:data_quality;type:float" json:"dataQuality,omitempty"`
	CreatedAt   time.Time      `gorm:"column:created_at;autoCreateTime;index:idx_iot_data_device_id_created_at,priority:2" json:"createdAt"`
}

func (IotData) TableName() string {
	return "iot_data"
}
