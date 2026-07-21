package models

import (
	"time"

	"gorm.io/datatypes"
)

// NotificationLog corresponds to TypeORM entity NotificationLog
type NotificationLog struct {
	ID                    int                  `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	DeviceID              *int                 `gorm:"column:device_id;index" json:"DeviceId,omitempty"`
	Device                *Device              `gorm:"foreignKey:DeviceID;references:DeviceID" json:"Device,omitempty"`
	NotificationTypeID    *int                 `gorm:"column:notification_type_id;index" json:"notificationTypeId,omitempty"`
	NotificationType      *NotificationType    `gorm:"foreignKey:NotificationTypeID;references:ID" json:"notificationType,omitempty"`
	NotificationChannelID *int                 `gorm:"column:notification_channel_id;index" json:"notificationChannelId,omitempty"`
	Channel               *NotificationChannel `gorm:"foreignKey:NotificationChannelID;references:ID" json:"channel,omitempty"`
	TemplateID            *int                 `gorm:"column:template_id" json:"templateId,omitempty"`
	Message               string               `gorm:"column:message;type:text" json:"message"`
	Status                string               `gorm:"column:status;type:varchar(20);default:'pending';index" json:"status"`
	ResponseData          datatypes.JSON       `gorm:"column:response_data;type:jsonb" json:"responseData,omitempty"`
	SentAt                *time.Time           `gorm:"column:sent_at" json:"sentAt,omitempty"`
	DeliveredAt           *time.Time           `gorm:"column:delivered_at" json:"deliveredAt,omitempty"`
	ReadAt                *time.Time           `gorm:"column:read_at" json:"read_at,omitempty"`
	RetryCount            int                  `gorm:"column:retry_count;default:0" json:"retryCount"`
	ErrorMessage          *string              `gorm:"column:error_message;type:text" json:"errorMessage,omitempty"`
	MessageID             *string              `gorm:"column:message_id;type:varchar(100)" json:"messageId,omitempty"`
	Recipient             *string              `gorm:"column:recipient;type:varchar(255)" json:"recipient,omitempty"`
	CreatedAt             time.Time            `gorm:"column:created_at;autoCreateTime;index" json:"createdAt"`
}

func (NotificationLog) TableName() string {
	return "sd_notification_log"
}
