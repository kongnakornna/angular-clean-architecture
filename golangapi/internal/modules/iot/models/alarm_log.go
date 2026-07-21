package models

import (
	"time"
)

// AlarmProcessLog หลัก
type AlarmProcessLog struct {
	ID              string    `gorm:"column:id;primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	AlarmActionID   int       `gorm:"column:alarm_action_id" json:"alarm_action_id"`
	DeviceID        int       `gorm:"column:device_id" json:"device_id"`
	TypeID          int       `gorm:"column:type_id" json:"type_id"` // email=1, control=1, etc
	Event           string    `gorm:"column:event;type:varchar(255)" json:"event"`
	AlarmType       string    `gorm:"column:alarm_type;type:varchar(255)" json:"alarm_type"`
	StatusWarning   string    `gorm:"column:status_warning;type:varchar(150)" json:"status_warning"`
	RecoveryWarning string    `gorm:"column:recovery_warning;type:varchar(150)" json:"recovery_warning"`
	StatusAlert     string    `gorm:"column:status_alert;type:varchar(150)" json:"status_alert"`
	RecoveryAlert   string    `gorm:"column:recovery_alert;type:varchar(150)" json:"recovery_alert"`
	EmailAlarm      int       `gorm:"column:email_alarm;default:0" json:"email_alarm"`
	LineAlarm       int       `gorm:"column:line_alarm;default:0" json:"line_alarm"`
	TelegramAlarm   int       `gorm:"column:telegram_alarm;default:0" json:"telegram_alarm"`
	SmsAlarm        int       `gorm:"column:sms_alarm;default:0" json:"sms_alarm"`
	NoncAlarm       int       `gorm:"column:nonc_alarm;default:0" json:"nonc_alarm"`
	Status          string    `gorm:"column:status;type:varchar(150)" json:"status"`
	Date            string    `gorm:"column:date;type:varchar(100)" json:"date"`
	Time            string    `gorm:"column:time;type:varchar(50)" json:"time"`
	Data            string    `gorm:"column:data;type:varchar(255)" json:"data"`
	DataAlarm       string    `gorm:"column:data_alarm;type:varchar(255)" json:"data_alarm"`
	AlarmStatus     string    `gorm:"column:alarm_status;type:varchar(255)" json:"alarm_status"`
	Subject         string    `gorm:"column:subject;type:varchar(255)" json:"subject"`
	Content         string    `gorm:"column:content;type:varchar(255)" json:"content"`
	CreatedAt       time.Time `gorm:"column:createddate;autoCreateTime" json:"created_at"`
	UpdatedAt       time.Time `gorm:"column:updateddate;autoUpdateTime" json:"updated_at"`
}

func (AlarmProcessLog) TableName() string {
	return "sd_alarm_process_log"
}

// AlarmProcessLogEmail สำหรับ email logs
type AlarmProcessLogEmail struct {
	ID              string    `gorm:"column:id;primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	AlarmActionID   int       `gorm:"column:alarm_action_id" json:"alarm_action_id"`
	DeviceID        int       `gorm:"column:device_id" json:"device_id"`
	TypeID          int       `gorm:"column:type_id" json:"type_id"`
	Event           string    `gorm:"column:event;type:varchar(255)" json:"event"`
	AlarmType       string    `gorm:"column:alarm_type;type:varchar(255)" json:"alarm_type"`
	StatusWarning   string    `gorm:"column:status_warning;type:varchar(150)" json:"status_warning"`
	RecoveryWarning string    `gorm:"column:recovery_warning;type:varchar(150)" json:"recovery_warning"`
	StatusAlert     string    `gorm:"column:status_alert;type:varchar(150)" json:"status_alert"`
	RecoveryAlert   string    `gorm:"column:recovery_alert;type:varchar(150)" json:"recovery_alert"`
	EmailAlarm      int       `gorm:"column:email_alarm;default:0" json:"email_alarm"`
	LineAlarm       int       `gorm:"column:line_alarm;default:0" json:"line_alarm"`
	TelegramAlarm   int       `gorm:"column:telegram_alarm;default:0" json:"telegram_alarm"`
	SmsAlarm        int       `gorm:"column:sms_alarm;default:0" json:"sms_alarm"`
	NoncAlarm       int       `gorm:"column:nonc_alarm;default:0" json:"nonc_alarm"`
	Status          string    `gorm:"column:status;type:varchar(150)" json:"status"`
	Date            string    `gorm:"column:date;type:varchar(100)" json:"date"`
	Time            string    `gorm:"column:time;type:varchar(50)" json:"time"`
	Data            string    `gorm:"column:data;type:varchar(255)" json:"data"`
	DataAlarm       string    `gorm:"column:data_alarm;type:varchar(255)" json:"data_alarm"`
	AlarmStatus     string    `gorm:"column:alarm_status;type:varchar(255)" json:"alarm_status"`
	Subject         string    `gorm:"column:subject;type:varchar(255)" json:"subject"`
	Content         string    `gorm:"column:content;type:varchar(255)" json:"content"`
	CreatedAt       time.Time `gorm:"column:createddate;autoCreateTime" json:"created_at"`
	UpdatedAt       time.Time `gorm:"column:updateddate;autoUpdateTime" json:"updated_at"`
}

func (AlarmProcessLogEmail) TableName() string {
	return "sd_alarm_process_log_email"
}

// AlarmProcessLogTemp สำหรับ temporary logs
type AlarmProcessLogTemp struct {
	ID              string    `gorm:"column:id;primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	AlarmActionID   int       `gorm:"column:alarm_action_id" json:"alarm_action_id"`
	DeviceID        int       `gorm:"column:device_id" json:"device_id"`
	TypeID          int       `gorm:"column:type_id" json:"type_id"`
	Event           string    `gorm:"column:event;type:varchar(255)" json:"event"`
	AlarmType       string    `gorm:"column:alarm_type;type:varchar(255)" json:"alarm_type"`
	StatusWarning   string    `gorm:"column:status_warning;type:varchar(150)" json:"status_warning"`
	RecoveryWarning string    `gorm:"column:recovery_warning;type:varchar(150)" json:"recovery_warning"`
	StatusAlert     string    `gorm:"column:status_alert;type:varchar(150)" json:"status_alert"`
	RecoveryAlert   string    `gorm:"column:recovery_alert;type:varchar(150)" json:"recovery_alert"`
	EmailAlarm      int       `gorm:"column:email_alarm;default:0" json:"email_alarm"`
	LineAlarm       int       `gorm:"column:line_alarm;default:0" json:"line_alarm"`
	TelegramAlarm   int       `gorm:"column:telegram_alarm;default:0" json:"telegram_alarm"`
	SmsAlarm        int       `gorm:"column:sms_alarm;default:0" json:"sms_alarm"`
	NoncAlarm       int       `gorm:"column:nonc_alarm;default:0" json:"nonc_alarm"`
	Status          string    `gorm:"column:status;type:varchar(150)" json:"status"`
	Date            string    `gorm:"column:date;type:varchar(100)" json:"date"`
	Time            string    `gorm:"column:time;type:varchar(50)" json:"time"`
	Data            string    `gorm:"column:data;type:varchar(255)" json:"data"`
	DataAlarm       string    `gorm:"column:data_alarm;type:varchar(255)" json:"data_alarm"`
	AlarmStatus     string    `gorm:"column:alarm_status;type:varchar(255)" json:"alarm_status"`
	Subject         string    `gorm:"column:subject;type:varchar(255)" json:"subject"`
	Content         string    `gorm:"column:content;type:varchar(255)" json:"content"`
	CreatedAt       time.Time `gorm:"column:createddate;autoCreateTime" json:"created_at"`
	UpdatedAt       time.Time `gorm:"column:updateddate;autoUpdateTime" json:"updated_at"`
}

func (AlarmProcessLogTemp) TableName() string {
	return "sd_alarm_process_log_temp"
}
