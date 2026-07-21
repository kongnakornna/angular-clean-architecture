package models

import (
	"time"
)

type MqttHost struct {
	ID        string    `gorm:"column:id;primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	Hostname  string    `gorm:"column:hostname;type:varchar(255)" json:"hostname"`
	Host      string    `gorm:"column:host;type:varchar(255)" json:"host"`
	Port      string    `gorm:"column:port;type:varchar(255)" json:"port"`
	Username  string    `gorm:"column:username;type:varchar(255)" json:"username"`
	Password  string    `gorm:"column:password;type:varchar(255)" json:"password"`
	IDHost    int       `gorm:"column:idhost" json:"idhost"`
	Status    int       `gorm:"column:status" json:"status"`
	CreatedAt time.Time `gorm:"column:createddate;autoCreateTime" json:"created_at"`
	UpdatedAt time.Time `gorm:"column:updateddate;autoUpdateTime" json:"updated_at"`
}

func (MqttHost) TableName() string {
	return "sd_mqtt_host"
}
