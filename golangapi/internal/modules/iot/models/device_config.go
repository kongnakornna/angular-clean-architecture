package models

import (
	"time"

	"gorm.io/datatypes"
)

// DeviceConfig corresponds to TypeORM entity DeviceConfig
type DeviceConfig struct {
	ID            int            `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	DeviceID      string         `gorm:"column:device_id;type:varchar(50);uniqueIndex" json:"deviceId"`
	Config        datatypes.JSON `gorm:"column:config;type:jsonb" json:"config,omitempty" swaggertype:"object"`
	Status        string         `gorm:"column:status;type:varchar(20);default:'active'" json:"status"`
	Notes         *string        `gorm:"column:notes;type:text" json:"notes,omitempty"`
	UpdatedBy     *string        `gorm:"column:updated_by;type:varchar(100)" json:"updatedBy,omitempty"`
	CreatedAt     time.Time      `gorm:"column:created_at;autoCreateTime" json:"createdAt"`
	UpdatedAt     time.Time      `gorm:"column:updated_at;autoUpdateTime" json:"updatedAt"`
	LastAppliedAt *time.Time     `gorm:"column:last_applied_at;type:timestamptz" json:"lastAppliedAt,omitempty"`
}

func (DeviceConfig) TableName() string {
	return "device_config"
}
