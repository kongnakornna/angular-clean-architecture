package models

import (
	"time"
)

// NotificationType corresponds to TypeORM entity NotificationType
type NotificationType struct {
	ID              int       `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	Name            string    `gorm:"column:name;type:varchar(50)" json:"name"`
	Description     *string   `gorm:"column:description;type:text" json:"description,omitempty"`
	CooldownMinutes int       `gorm:"column:cooldown_minutes;default:10" json:"cooldownMinutes"`
	IsActive        bool      `gorm:"column:is_active;default:true" json:"isActive"`
	Icon            *string   `gorm:"column:icon;type:varchar(100)" json:"icon,omitempty"`
	Color           *string   `gorm:"column:color;type:varchar(20)" json:"color,omitempty"`
	CreatedAt       time.Time `gorm:"column:created_at;autoCreateTime" json:"createdAt"`
	UpdatedAt       time.Time `gorm:"column:updated_at;autoUpdateTime" json:"updatedAt"`
}

func (NotificationType) TableName() string {
	return "sd_notification_type"
}
