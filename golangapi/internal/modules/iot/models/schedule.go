package models

import (
	"time"
)

type Schedule struct {
	ScheduleID   int       `gorm:"column:schedule_id;primaryKey;autoIncrement" json:"schedule_id"`
	ScheduleName string    `gorm:"column:schedule_name;type:varchar(255)" json:"schedule_name"`
	DeviceID     int       `gorm:"column:device_id" json:"device_id"`
	Start        string    `gorm:"column:start;type:varchar(50)" json:"start"` // time like "08:00"
	Event        int       `gorm:"column:event" json:"event"`                  // 1=ON,0=OFF
	Sunday       int       `gorm:"column:sunday;default:0" json:"sunday"`
	Monday       int       `gorm:"column:monday;default:0" json:"monday"`
	Tuesday      int       `gorm:"column:tuesday;default:0" json:"tuesday"`
	Wednesday    int       `gorm:"column:wednesday;default:0" json:"wednesday"`
	Thursday     int       `gorm:"column:thursday;default:0" json:"thursday"`
	Friday       int       `gorm:"column:friday;default:0" json:"friday"`
	Saturday     int       `gorm:"column:saturday;default:0" json:"saturday"`
	Status       int       `gorm:"column:status;default:1" json:"status"`
	CreatedAt    time.Time `gorm:"column:createddate;autoCreateTime" json:"created_at"`
	UpdatedAt    time.Time `gorm:"column:updateddate;autoUpdateTime" json:"updated_at"`
}

func (Schedule) TableName() string {
	return "sd_iot_schedule"
}

// ScheduleDevice mapping schedule กับ device
type ScheduleDevice struct {
	ScheduleID int `gorm:"column:schedule_id;primaryKey" json:"schedule_id"`
	DeviceID   int `gorm:"column:device_id;primaryKey" json:"device_id"`
}

func (ScheduleDevice) TableName() string {
	return "sd_iot_schedule_device"
}

// ScheduleProcessLog บันทึกการทำงานของ schedule
type ScheduleProcessLog struct {
	ID                 string    `gorm:"column:id;primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	ScheduleID         int       `gorm:"column:schedule_id" json:"schedule_id"`
	DeviceID           int       `gorm:"column:device_id" json:"device_id"`
	ScheduleEventStart string    `gorm:"column:schedule_event_start;type:varchar(50)" json:"schedule_event_start"`
	Day                string    `gorm:"column:day;type:varchar(20)" json:"day"`
	Doday              string    `gorm:"column:doday;type:varchar(20)" json:"doday"`
	DoTime             string    `gorm:"column:dotime;type:varchar(50)" json:"dotime"`
	ScheduleEvent      string    `gorm:"column:schedule_event;type:varchar(50)" json:"schedule_event"`
	DeviceStatus       string    `gorm:"column:device_status;type:varchar(50)" json:"device_status"`
	Status             int       `gorm:"column:status;default:0" json:"status"`
	Date               string    `gorm:"column:date;type:varchar(20)" json:"date"`
	Time               string    `gorm:"column:time;type:varchar(20)" json:"time"`
	CreatedAt          time.Time `gorm:"column:createddate;autoCreateTime" json:"created_at"`
	UpdatedAt          time.Time `gorm:"column:updateddate;autoUpdateTime" json:"updated_at"`
}

func (ScheduleProcessLog) TableName() string {
	return "sd_schedule_process_log"
}
