package models

import (
	"time"
)

type BaseModel struct {
	CreatedAt time.Time `gorm:"column:createddate;autoCreateTime" json:"created_at"`
	UpdatedAt time.Time `gorm:"column:updateddate;autoUpdateTime" json:"updated_at"`
}

type StatusModel struct {
	Status int `gorm:"column:status;default:1" json:"status"`
}
