package models

import "time"

// AirPeriod corresponds to TypeORM entity airperiod
type AirPeriod struct {
	AirPeriodID int       `gorm:"primaryKey;autoIncrement;column:air_period_id" json:"air_period_id"`
	Name        *string   `gorm:"column:name;type:varchar(255)" json:"name,omitempty"`
	Data        *string   `gorm:"column:data;type:varchar(255)" json:"data,omitempty"`
	Status      *string   `gorm:"column:status;type:varchar(150)" json:"status,omitempty"`
	Active      *int      `gorm:"column:active;type:int" json:"active,omitempty"`
	CreatedAt   time.Time `gorm:"column:createddate;autoCreateTime" json:"createddate"`
	UpdatedAt   time.Time `gorm:"column:updateddate;autoUpdateTime" json:"updateddate"`
}

func (AirPeriod) TableName() string {
	return "sd_air_period"
}
