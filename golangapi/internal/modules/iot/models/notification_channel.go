package models

import (
	"time"
)

// NotificationChannel corresponds to TypeORM entity NotificationChannel
type NotificationChannel struct {
	ID           int       `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	Name         string    `gorm:"column:name;type:varchar(100)" json:"name"`
	Description  *string   `gorm:"column:description;type:text" json:"description,omitempty"`
	Icon         *string   `gorm:"column:icon;type:varchar(100)" json:"icon,omitempty"`
	HandlerClass *string   `gorm:"column:handler_class;type:varchar(200)" json:"handlerClass,omitempty"`
	IsActive     bool      `gorm:"column:is_active;default:true" json:"isActive"`
	CreatedAt    time.Time `gorm:"column:created_at;autoCreateTime" json:"createdAt"`
}

func (NotificationChannel) TableName() string {
	return "sd_notification_channel"
}
