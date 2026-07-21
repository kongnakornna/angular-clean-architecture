package models

import "time"

// AirSettingWarning corresponds to TypeORM entity airsettingwarning
type AirSettingWarning struct {
	AirSettingWarningID int       `gorm:"primaryKey;autoIncrement;column:air_setting_warning_id" json:"air_setting_warning_id"`
	TypeID              *int      `gorm:"column:type_id;type:int" json:"type_id,omitempty"`
	DeviceID            *int      `gorm:"column:device_id;type:int" json:"device_id,omitempty"`
	PeriodID            *int      `gorm:"column:period_id;type:int" json:"period_id,omitempty"`
	EventName           *string   `gorm:"column:event_name;type:varchar(255)" json:"event_name,omitempty"`
	Date                string    `gorm:"column:date;type:varchar(100)" json:"date"`
	Time                string    `gorm:"column:time;type:varchar(50)" json:"time"`
	Data                *string   `gorm:"column:data;type:varchar(255)" json:"data,omitempty"`
	Status              *string   `gorm:"column:status;type:varchar(150)" json:"status,omitempty"`
	Active              *int      `gorm:"column:active;type:int" json:"active,omitempty"`
	CreatedAt           time.Time `gorm:"column:createddate;autoCreateTime" json:"createddate"`
	UpdatedAt           time.Time `gorm:"column:updateddate;autoUpdateTime" json:"updateddate"`
}

func (AirSettingWarning) TableName() string {
	return "sd_air_setting_warning"
}
