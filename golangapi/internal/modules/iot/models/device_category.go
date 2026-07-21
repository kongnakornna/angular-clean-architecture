package models

import (
	"time"
)

// DeviceCategory corresponds to TypeORM entity DeviceCategory
type DeviceCategory struct {
	ID          int       `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	Name        string    `gorm:"column:name;type:varchar(100)" json:"name"`
	Description *string   `gorm:"column:description;type:text" json:"description,omitempty"`
	Icon        *string   `gorm:"column:icon;type:varchar(100)" json:"icon,omitempty"`
	CreatedAt   time.Time `gorm:"column:created_at;autoCreateTime" json:"createdAt"`
}

func (DeviceCategory) TableName() string {
	return "sd_device_category"
}
