package models

import "time"

// AirControlLog corresponds to TypeORM entity aircontrollog
type AirControlLog struct {
	ID                  string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid();column:id" json:"id"`
	AlarmActionID       *int      `gorm:"column:alarm_action_id;type:int" json:"alarm_action_id,omitempty"`
	AirControlID        *int      `gorm:"column:air_control_id;type:int" json:"air_control_id,omitempty"`
	DeviceID            *int      `gorm:"column:device_id;type:int" json:"device_id,omitempty"`
	TypeID              *int      `gorm:"column:type_id;type:int" json:"type_id,omitempty"`
	Temperature         *string   `gorm:"column:temperature;type:varchar(255)" json:"temperature,omitempty"`
	Warning             *string   `gorm:"column:warning;type:varchar(255)" json:"warning,omitempty"`
	Recovery            *string   `gorm:"column:recovery;type:varchar(150)" json:"recovery,omitempty"`
	Period              *string   `gorm:"column:period;type:varchar(150)" json:"period,omitempty"`
	Percent             *string   `gorm:"column:percent;type:varchar(150)" json:"percent,omitempty"`
	FireAlarm           *string   `gorm:"column:firealarm;type:varchar(150)" json:"firealarm,omitempty"`
	HumidityAlarm       *string   `gorm:"column:humidityalarm;type:varchar(150)" json:"humidityalarm,omitempty"`
	Air2Alarm           *string   `gorm:"column:air2_alarm;type:varchar(150)" json:"air2_alarm,omitempty"`
	Air1Alarm           *string   `gorm:"column:air1_alarm;type:varchar(150)" json:"air1_alarm,omitempty"`
	TemperatureAlarm    *string   `gorm:"column:temperaturealarm;type:varchar(150)" json:"temperaturealarm,omitempty"`
	Mode                *string   `gorm:"column:mode;type:varchar(150)" json:"mode,omitempty"`
	StateAir1           *string   `gorm:"column:state_air1;type:varchar(150)" json:"state_air1,omitempty"`
	StateAir2           *string   `gorm:"column:state_air2;type:varchar(150)" json:"state_air2,omitempty"`
	TemperatureAlarmOff *string   `gorm:"column:temperaturealarmoff;type:varchar(150)" json:"temperaturealarmoff,omitempty"`
	UpsAlarm            *string   `gorm:"column:ups_alarm;type:varchar(150)" json:"ups_alarm,omitempty"`
	Ups2Alarm           *string   `gorm:"column:ups2_alarm;type:varchar(150)" json:"ups2_alarm,omitempty"`
	HssdAlarm           *string   `gorm:"column:hssdalarm;type:varchar(150)" json:"hssdalarm,omitempty"`
	WaterLeakAlarm      *string   `gorm:"column:waterleakalarm;type:varchar(150)" json:"waterleakalarm,omitempty"`
	Date                string    `gorm:"column:date;type:varchar(100)" json:"date"`
	Time                string    `gorm:"column:time;type:varchar(50)" json:"time"`
	Data                *string   `gorm:"column:data;type:varchar(255)" json:"data,omitempty"`
	Status              *string   `gorm:"column:status;type:varchar(150)" json:"status,omitempty"`
	CreatedAt           time.Time `gorm:"column:createddate;autoCreateTime" json:"createddate"`
	UpdatedAt           time.Time `gorm:"column:updateddate;autoUpdateTime" json:"updateddate"`
}

func (AirControlLog) TableName() string {
	return "sd_air_control_log"
}
