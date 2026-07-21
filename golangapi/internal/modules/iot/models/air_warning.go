package models

import "time"

// AirWarning corresponds to TypeORM entity airwarning
type AirWarning struct {
	AirWarningID int       `gorm:"primaryKey;autoIncrement;column:air_warning_id" json:"air_warning_id"`
	Name         *string   `gorm:"column:name;type:varchar(255)" json:"name,omitempty"`
	Data         *string   `gorm:"column:data;type:varchar(255)" json:"data,omitempty"`
	Status       *string   `gorm:"column:status;type:varchar(150)" json:"status,omitempty"`
	Active       *int      `gorm:"column:active;type:int" json:"active,omitempty"`
	CreatedAt    time.Time `gorm:"column:createddate;autoCreateTime" json:"createddate"`
	UpdatedAt    time.Time `gorm:"column:updateddate;autoUpdateTime" json:"updateddate"`
}

func (AirWarning) TableName() string {
	return "sd_air_warning"
}
