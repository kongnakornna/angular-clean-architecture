package models

import (
	"time"

	"gorm.io/datatypes"
)

// GroupNotificationConfig corresponds to TypeORM entity GroupNotificationConfig
type GroupNotificationConfig struct {
	ID                     int                  `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	GroupID                int                  `gorm:"column:group_id;index;uniqueIndex:unique_group_channel_type,priority:1" json:"groupId"`
	Group                  *DeviceGroup         `gorm:"foreignKey:GroupID;references:ID" json:"group,omitempty"`
	NotificationChannelID  int                  `gorm:"column:notification_channel_id;index;uniqueIndex:unique_group_channel_type,priority:2" json:"notificationChannelId"`
	NotificationChannel    *NotificationChannel `gorm:"foreignKey:NotificationChannelID;references:ID" json:"notificationChannel,omitempty"`
	NotificationTypeID     int                  `gorm:"column:notification_type_id;index;uniqueIndex:unique_group_channel_type,priority:3" json:"notificationTypeId"`
	NotificationType       *NotificationType    `gorm:"foreignKey:NotificationTypeID;references:ID" json:"notificationType,omitempty"`
	Config                 datatypes.JSON       `gorm:"column:config;type:jsonb" json:"config,omitempty"`
	IsActive               bool                 `gorm:"column:is_active;default:true" json:"isActive"`
	EscalationLevel        int                  `gorm:"column:escalation_level;default:1" json:"escalationLevel"`
	EscalationDelayMinutes int                  `gorm:"column:escalation_delay_minutes;default:30" json:"escalationDelayMinutes"`
	CreatedAt              time.Time            `gorm:"column:created_at;autoCreateTime" json:"createdAt"`
}

func (GroupNotificationConfig) TableName() string {
	return "sd_group_notification_config"
}
