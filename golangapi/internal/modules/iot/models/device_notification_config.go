package models

import (
	"time"

	"gorm.io/datatypes"
)

// DeviceNotificationConfig corresponds to TypeORM entity DeviceNotificationConfig
type DeviceNotificationConfig struct {
	ID                    int                  `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	DeviceID              int                  `gorm:"column:device_id;index;uniqueIndex:unique_Device_channel_type,priority:1" json:"DeviceId"`
	Device                *Device              `gorm:"foreignKey:DeviceID;references:DeviceID" json:"Device,omitempty"`
	NotificationChannelID int                  `gorm:"column:notification_channel_id;index;uniqueIndex:unique_Device_channel_type,priority:2" json:"notificationChannelId"`
	Channel               *NotificationChannel `gorm:"foreignKey:NotificationChannelID;references:ID" json:"channel,omitempty"`
	NotificationTypeID    int                  `gorm:"column:notification_type_id;index;uniqueIndex:unique_Device_channel_type,priority:3" json:"notificationTypeId"`
	NotificationType      *NotificationType    `gorm:"foreignKey:NotificationTypeID;references:ID" json:"notificationType,omitempty"`
	Config                datatypes.JSON       `gorm:"column:config;type:jsonb" json:"config,omitempty"`
	IsActive              bool                 `gorm:"column:is_active;default:true;index" json:"isActive"`
	RetryCount            int                  `gorm:"column:retry_count;default:3" json:"retryCount"`
	RetryDelayMinutes     int                  `gorm:"column:retry_delay_minutes;default:5" json:"retryDelayMinutes"`
	CreatedAt             time.Time            `gorm:"column:created_at;autoCreateTime" json:"createdAt"`
}

func (DeviceNotificationConfig) TableName() string {
	return "sd_device_notification_config"
}
