package models

import (
	"time"

	"gorm.io/datatypes"
)

// DeviceSchedule corresponds to TypeORM entity DeviceSchedule
type DeviceSchedule struct {
	ID             int            `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	DeviceID       int            `gorm:"column:device_id;index" json:"DeviceId"`
	Device         *Device        `gorm:"foreignKey:DeviceID;references:DeviceID" json:"Device,omitempty"`
	Name           string         `gorm:"column:name;type:varchar(200)" json:"name"`
	Description    *string        `gorm:"column:description;type:text" json:"description,omitempty"`
	ScheduleType   string         `gorm:"column:schedule_type;type:varchar(50);index" json:"scheduleType"`
	ScheduleConfig datatypes.JSON `gorm:"column:schedule_config;type:jsonb" json:"scheduleConfig"`
	Action         datatypes.JSON `gorm:"column:action;type:jsonb" json:"action"`
	IsActive       bool           `gorm:"column:is_active;default:true;index" json:"isActive"`
	LastRunAt      *time.Time     `gorm:"column:last_run_at" json:"lastRunAt,omitempty"`
	NextRunAt      *time.Time     `gorm:"column:next_run_at;index" json:"nextRunAt,omitempty"`
	RunCount       int            `gorm:"column:run_count;default:0" json:"runCount"`
	CreatedAt      time.Time      `gorm:"column:created_at;autoCreateTime" json:"createdAt"`
	UpdatedAt      time.Time      `gorm:"column:updated_at;autoUpdateTime" json:"updatedAt"`
}

func (DeviceSchedule) TableName() string {
	return "sd_device_schedule"
}
