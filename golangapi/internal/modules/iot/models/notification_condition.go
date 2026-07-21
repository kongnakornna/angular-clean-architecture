package models

import (
	"time"
)

// NotificationCondition corresponds to TypeORM entity NotificationCondition
type NotificationCondition struct {
	ID                 int               `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	DeviceID           int               `gorm:"column:device_id;index" json:"DeviceId"`
	Device             *Device           `gorm:"foreignKey:DeviceID;references:DeviceID" json:"Device,omitempty"`
	NotificationTypeID int               `gorm:"column:notification_type_id;index" json:"notificationTypeId"`
	NotificationType   *NotificationType `gorm:"foreignKey:NotificationTypeID;references:ID" json:"notificationType,omitempty"`
	MinValue           *float64          `gorm:"column:min_value;type:decimal(10,2)" json:"minValue,omitempty"`
	MaxValue           *float64          `gorm:"column:max_value;type:decimal(10,2)" json:"maxValue,omitempty"`
	ConditionOperator  string            `gorm:"column:condition_operator;type:varchar(10);default:'between'" json:"conditionOperator"`
	Priority           int               `gorm:"column:priority;default:1" json:"priority"`
	IsActive           bool              `gorm:"column:is_active;default:true;index" json:"isActive"`
	CreatedAt          time.Time         `gorm:"column:created_at;autoCreateTime" json:"createdAt"`
}

func (NotificationCondition) TableName() string {
	return "sd_notification_condition"
}
