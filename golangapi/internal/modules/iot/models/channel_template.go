package models

import (
	"time"

	"gorm.io/datatypes"
)

// ChannelTemplate corresponds to TypeORM entity ChannelTemplate
type ChannelTemplate struct {
	ID                 int            `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	Name               string         `gorm:"column:name;type:varchar(200)" json:"name"`
	Description        *string        `gorm:"column:description;type:text" json:"description,omitempty"`
	ChannelID          int            `gorm:"column:channel_id;type:int;index" json:"channelId"`
	NotificationTypeID int            `gorm:"column:notification_type_id;type:int;index" json:"notificationTypeId"`
	Template           string         `gorm:"column:template;type:text" json:"template"`
	Variables          datatypes.JSON `gorm:"column:variables;type:jsonb" json:"variables,omitempty"`
	IsActive           bool           `gorm:"column:is_active;default:true" json:"isActive"`
	IsDefault          bool           `gorm:"column:is_default;default:false" json:"isDefault"`
	CreatedAt          time.Time      `gorm:"column:created_at;autoCreateTime" json:"createdAt"`
	UpdatedAt          time.Time      `gorm:"column:updated_at;autoUpdateTime" json:"updatedAt"`
}

func (ChannelTemplate) TableName() string {
	return "sd_channel_template"
}
