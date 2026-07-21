package models

import (
	"time"

	"gorm.io/datatypes"
)

// DeviceAlert corresponds to TypeORM entity DeviceAlert
type DeviceAlert struct {
	ID                int            `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	DeviceID          string         `gorm:"column:device_id;type:varchar(50);index:idx_device_alert_device_id_created_at,priority:1" json:"deviceId"`
	Type              string         `gorm:"column:type;type:varchar(50);index:idx_device_alert_type_severity,priority:1" json:"type"`
	Metric            *string        `gorm:"column:metric;type:varchar(100)" json:"metric,omitempty"`
	Value             *float64       `gorm:"column:value;type:float" json:"value,omitempty"`
	Threshold         datatypes.JSON `gorm:"column:threshold;type:jsonb" json:"threshold,omitempty"`
	Severity          string         `gorm:"column:severity;type:varchar(20);default:'low'" json:"severity"`
	Message           string         `gorm:"column:message;type:varchar(500)" json:"message"`
	Details           datatypes.JSON `gorm:"column:details;type:jsonb" json:"details,omitempty"`
	Resolved          bool           `gorm:"column:resolved;default:false" json:"resolved"`
	ResolutionNotes   *string        `gorm:"column:resolution_notes;type:text" json:"resolutionNotes,omitempty"`
	ResolvedBy        *string        `gorm:"column:resolved_by;type:varchar(100)" json:"resolvedBy,omitempty"`
	ResolvedAt        *time.Time     `gorm:"column:resolved_at;type:timestamptz" json:"resolvedAt,omitempty"`
	Acknowledged      bool           `gorm:"column:acknowledged;default:false" json:"acknowledged"`
	AcknowledgedBy    *string        `gorm:"column:acknowledged_by;type:varchar(100)" json:"acknowledgedBy,omitempty"`
	AcknowledgedAt    *time.Time     `gorm:"column:acknowledged_at;type:timestamptz" json:"acknowledgedAt,omitempty"`
	Escalation        datatypes.JSON `gorm:"column:escalation;type:jsonb" json:"escalation,omitempty"`
	DataID            *int           `gorm:"column:data_id;type:int" json:"dataId,omitempty"`
	CreatedAt         time.Time      `gorm:"column:created_at;autoCreateTime;index:idx_device_alert_device_id_created_at,priority:2;index:idx_device_alert_resolved_created_at,priority:2" json:"createdAt"`
	UpdatedAt         time.Time      `gorm:"column:updated_at;autoUpdateTime" json:"updatedAt"`
	ExpiresAt         *time.Time     `gorm:"column:expires_at;type:timestamptz" json:"expiresAt,omitempty"`
	NotificationCount int            `gorm:"column:notification_count;default:0" json:"notificationCount"`
}

func (DeviceAlert) TableName() string {
	return "device_alert"
}
