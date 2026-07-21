package models

import (
	"time"
)

type MqttLog struct {
	ID         string    `gorm:"column:id;primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	Name       string    `gorm:"column:name;type:varchar(255)" json:"name"`
	StatusMqtt int       `gorm:"column:statusmqtt" json:"statusmqtt"`
	Msg        string    `gorm:"column:msg;type:text" json:"msg"`
	DeviceID   int       `gorm:"column:device_id" json:"device_id"`
	TypeID     int       `gorm:"column:type_id" json:"type_id"`
	DeviceName string    `gorm:"column:device_name;type:varchar(255)" json:"device_name"`
	Date       string    `gorm:"column:date;type:varchar(20)" json:"date"`
	Time       string    `gorm:"column:time;type:varchar(20)" json:"time"`
	Data       string    `gorm:"column:data;type:text" json:"data"`
	Status     int       `gorm:"column:status" json:"status"`
	CreatedAt  time.Time `gorm:"column:createddate;autoCreateTime" json:"created_at"`
}

func (MqttLog) TableName() string {
	return "mqttlog" // ตาม entity ที่ให้มา
}
