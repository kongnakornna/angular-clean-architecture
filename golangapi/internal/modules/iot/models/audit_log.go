package models

import (
	"time"

	"gorm.io/datatypes"
)

// AuditLog corresponds to TypeORM entity AuditLog
type AuditLog struct {
	AuditID     int            `gorm:"primaryKey;autoIncrement;column:audit_id" json:"audit_id"`
	UserID      *string        `gorm:"column:user_id;index" json:"userId,omitempty"`
	UserName    *string        `gorm:"column:user_name;type:varchar(200)" json:"userName,omitempty"`
	Action      string         `gorm:"column:action;type:varchar(50);index" json:"action"`
	EntityType  string         `gorm:"column:entity_type;type:varchar(100);index" json:"entityType"`
	EntityID    int            `gorm:"column:entity_id;index" json:"entityId"`
	Before      datatypes.JSON `gorm:"column:before;type:jsonb" json:"before,omitempty"`
	After       datatypes.JSON `gorm:"column:after;type:jsonb" json:"after,omitempty"`
	Changes     datatypes.JSON `gorm:"column:changes;type:jsonb" json:"changes,omitempty"`
	IPAddress   *string        `gorm:"column:ip_address;type:varchar(45)" json:"ipAddress,omitempty"`
	UserAgent   *string        `gorm:"column:user_agent;type:text" json:"userAgent,omitempty"`
	ActionTime  time.Time      `gorm:"column:action_time;default:CURRENT_TIMESTAMP;index" json:"actionTime"`
	Description *string        `gorm:"column:description;type:text" json:"description,omitempty"`
	CreatedAt   time.Time      `gorm:"column:created_at;autoCreateTime" json:"createdAt"`
}

func (AuditLog) TableName() string {
	return "sd_audit_log"
}
