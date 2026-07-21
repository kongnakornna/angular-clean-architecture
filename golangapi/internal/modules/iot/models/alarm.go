package models

// DeviceAlarmAction กำหนดค่าการแจ้งเตือนสำหรับ alarm แต่ละประเภท
type DeviceAlarmAction struct {
	AlarmActionID   int    `gorm:"column:alarm_action_id;primaryKey;autoIncrement" json:"alarm_action_id"`
	ActionName      string `gorm:"column:action_name;type:varchar(255)" json:"action_name"`
	StatusWarning   string `gorm:"column:status_warning;type:varchar(150)" json:"status_warning"`
	RecoveryWarning string `gorm:"column:recovery_warning;type:varchar(150)" json:"recovery_warning"`
	StatusAlert     string `gorm:"column:status_alert;type:varchar(150)" json:"status_alert"`
	RecoveryAlert   string `gorm:"column:recovery_alert;type:varchar(150)" json:"recovery_alert"`
	EmailAlarm      int    `gorm:"column:email_alarm;default:0" json:"email_alarm"`
	LineAlarm       int    `gorm:"column:line_alarm;default:0" json:"line_alarm"`
	TelegramAlarm   int    `gorm:"column:telegram_alarm;default:0" json:"telegram_alarm"`
	SmsAlarm        int    `gorm:"column:sms_alarm;default:0" json:"sms_alarm"`
	NoncAlarm       int    `gorm:"column:nonc_alarm;default:0" json:"nonc_alarm"`
	TimeLife        int    `gorm:"column:time_life" json:"time_life"`
	Event           int    `gorm:"column:event" json:"event"` // 0=OFF,1=ON
	Status          int    `gorm:"column:status;default:1" json:"status"`
	BaseModel
}

func (DeviceAlarmAction) TableName() string {
	return "sd_iot_device_alarm_action"
}

// AlarmDevice mapping device กับ alarm action
type AlarmDevice struct {
	ID            string `gorm:"column:id;primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	AlarmActionID int    `gorm:"column:alarm_action_id" json:"alarm_action_id"`
	DeviceID      int    `gorm:"column:device_id" json:"device_id"`
}

func (AlarmDevice) TableName() string {
	return "sd_iot_alarm_device"
}

// AlarmDeviceEvent mapping device event กับ alarm action
type AlarmDeviceEvent struct {
	ID            string `gorm:"column:id;primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	AlarmActionID int    `gorm:"column:alarm_action_id" json:"alarm_action_id"`
	DeviceID      int    `gorm:"column:device_id" json:"device_id"`
}

func (AlarmDeviceEvent) TableName() string {
	return "sd_iot_alarm_device_event"
}
