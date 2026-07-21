package models

import (
	"time"
)

// DeviceStatusHistory corresponds to TypeORM entity DeviceStatusHistory
type DeviceStatusHistory struct {
	ID                 int               `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	DeviceID           int               `gorm:"column:device_id;index" json:"DeviceId"`
	Device             *Device           `gorm:"foreignKey:DeviceID;references:DeviceID" json:"Device,omitempty"`
	Status             *string           `gorm:"column:status;type:varchar(50)" json:"status,omitempty"`
	Value              *float64          `gorm:"column:value;type:decimal(10,2)" json:"value,omitempty"`
	NotificationTypeID *int              `gorm:"column:notification_type_id;index" json:"notificationTypeId,omitempty"`
	NotificationType   *NotificationType `gorm:"foreignKey:NotificationTypeID;references:ID" json:"notificationType,omitempty"`
	DurationMinutes    *int              `gorm:"column:duration_minutes" json:"durationMinutes,omitempty"`
	PreviousStatus     *string           `gorm:"column:previous_status;type:varchar(50)" json:"previousStatus,omitempty"`
	PreviousValue      *float64          `gorm:"column:previous_value;type:decimal(10,2)" json:"previousValue,omitempty"`
	ChangeReason       *string           `gorm:"column:change_reason;type:text" json:"changeReason,omitempty"`
	CreatedAt          time.Time         `gorm:"column:created_at;autoCreateTime;index" json:"createdAt"`
}

func (DeviceStatusHistory) TableName() string {
	return "sd_device_status_history"
}
