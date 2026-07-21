package models

import (
	"time"

	"gorm.io/datatypes"
)

// CommandLog corresponds to TypeORM entity CommandLog
type CommandLog struct {
	ID         int            `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	DeviceID   string         `gorm:"column:device_id;type:varchar(50);index" json:"deviceId"`
	Action     string         `gorm:"column:action;type:varchar(100)" json:"action"`
	Parameters datatypes.JSON `gorm:"column:parameters;type:jsonb" json:"parameters,omitempty"`
	Metadata   datatypes.JSON `gorm:"column:metadata;type:jsonb" json:"metadata,omitempty"`
	Status     string         `gorm:"column:status;type:varchar(50);default:'pending'" json:"status"`
	IssuedBy   *string        `gorm:"column:issued_by;type:varchar(100)" json:"issuedBy,omitempty"`
	ClientIP   *string        `gorm:"column:client_ip;type:varchar(45)" json:"clientIp,omitempty"`
	Response   datatypes.JSON `gorm:"column:response;type:jsonb" json:"response,omitempty"`
	Error      *string        `gorm:"column:error;type:varchar(500)" json:"error,omitempty"`
	IssuedAt   time.Time      `gorm:"column:issued_at;type:timestamptz" json:"issuedAt"`
	SentAt     *time.Time     `gorm:"column:sent_at;type:timestamptz" json:"sentAt,omitempty"`
	ExecutedAt *time.Time     `gorm:"column:executed_at;type:timestamptz" json:"executedAt,omitempty"`
	FailedAt   *time.Time     `gorm:"column:failed_at;type:timestamptz" json:"failedAt,omitempty"`
	CreatedAt  time.Time      `gorm:"column:created_at;autoCreateTime" json:"createdAt"`
	UpdatedAt  time.Time      `gorm:"column:updated_at;autoUpdateTime" json:"updatedAt"`
}

func (CommandLog) TableName() string {
	return "command_log"
}
