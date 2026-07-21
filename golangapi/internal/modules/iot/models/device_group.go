package models

import (
	"time"

	"gorm.io/datatypes"
)

// DeviceGroup corresponds to TypeORM entity DeviceGroup
type DeviceGroup struct {
	ID          int            `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	Name        string         `gorm:"column:name;type:varchar(200)" json:"name"`
	Description *string        `gorm:"column:description;type:text" json:"description,omitempty"`
	GroupType   string         `gorm:"column:group_type;type:varchar(50);default:'custom';index" json:"groupType"`
	IsActive    bool           `gorm:"column:is_active;default:true;index" json:"isActive"`
	Config      datatypes.JSON `gorm:"column:config;type:jsonb" json:"config,omitempty"`
	CreatedAt   time.Time      `gorm:"column:created_at;autoCreateTime" json:"createdAt"`
	UpdatedAt   time.Time      `gorm:"column:updated_at;autoUpdateTime" json:"updatedAt"`
}

func (DeviceGroup) TableName() string {
	return "sd_device_group"
}
