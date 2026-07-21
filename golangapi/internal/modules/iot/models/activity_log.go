package models

import (
	"time"

	"gorm.io/datatypes"
)

// ActivityLog corresponds to TypeORM entity ActivityLog
type ActivityLog struct {
	ID            int            `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	Type          string         `gorm:"column:type;type:varchar(50)" json:"type"`
	DeviceID      *string        `gorm:"column:device_id;type:varchar(50)" json:"deviceId,omitempty"`
	UserID        *string        `gorm:"column:user_id;type:varchar(100)" json:"userId,omitempty"`
	Details       string         `gorm:"column:details;type:varchar(500)" json:"details"`
	Data          datatypes.JSON `gorm:"column:data;type:jsonb" json:"data,omitempty"`
	Severity      string         `gorm:"column:severity;type:varchar(20);default:'info'" json:"severity"`
	IPAddress     *string        `gorm:"column:ip_address;type:varchar(45)" json:"ipAddress,omitempty"`
	UserAgent     *string        `gorm:"column:user_agent;type:varchar(500)" json:"userAgent,omitempty"`
	SessionID     *string        `gorm:"column:session_id;type:varchar(100)" json:"sessionId,omitempty"`
	CorrelationID *string        `gorm:"column:correlation_id;type:varchar(100)" json:"correlationId,omitempty"`
	Timestamp     time.Time      `gorm:"column:timestamp;type:timestamptz" json:"timestamp"`
	StackTrace    *string        `gorm:"column:stack_trace;type:text" json:"stackTrace,omitempty"`
	CreatedAt     time.Time      `gorm:"column:created_at;autoCreateTime" json:"createdAt"`
}

func (ActivityLog) TableName() string {
	return "activity_log"
}
