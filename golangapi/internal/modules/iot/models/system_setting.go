package models

import (
	"time"

	"gorm.io/datatypes"
)

// SystemSetting corresponds to TypeORM entity SystemSetting
type SystemSetting struct {
	ID          int            `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	Key         string         `gorm:"column:key;type:varchar(100);uniqueIndex" json:"key"`
	Value       datatypes.JSON `gorm:"column:value;type:jsonb" json:"value"`
	Category    *string        `gorm:"column:category;type:varchar(50);index" json:"category,omitempty"`
	Description *string        `gorm:"column:description;type:text" json:"description,omitempty"`
	IsPublic    bool           `gorm:"column:is_public;default:false" json:"isPublic"`
	CreatedAt   time.Time      `gorm:"column:created_at;autoCreateTime" json:"createdAt"`
	UpdatedAt   time.Time      `gorm:"column:updated_at;autoUpdateTime" json:"updatedAt"`
}

func (SystemSetting) TableName() string {
	return "sd_system_setting"
}
