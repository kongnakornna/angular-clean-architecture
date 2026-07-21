package models

type Mqtt struct {
	MqttID        int    `gorm:"column:mqtt_id;primaryKey;autoIncrement" json:"mqtt_id"`
	MqttTypeID    int    `gorm:"column:mqtt_type_id" json:"mqtt_type_id"`
	Sort          int    `gorm:"column:sort;default:1" json:"sort"`
	MqttName      string `gorm:"column:mqtt_name;type:varchar(255)" json:"mqtt_name"`
	Host          string `gorm:"column:host;type:varchar(255)" json:"host"`
	Port          int    `gorm:"column:port" json:"port"`
	Username      string `gorm:"column:username;type:varchar(255)" json:"username"`
	Password      string `gorm:"column:password;type:varchar(255)" json:"password"`
	Secret        string `gorm:"column:secret;type:varchar(255)" json:"secret"`
	ExpireIn      string `gorm:"column:expire_in;type:varchar(255)" json:"expire_in"`
	TokenValue    string `gorm:"column:token_value;type:text" json:"token_value"`
	Org           string `gorm:"column:org;type:varchar(255)" json:"org"`
	Bucket        string `gorm:"column:bucket;type:varchar(255)" json:"bucket"`
	Envavorment   string `gorm:"column:envavorment;type:varchar(255)" json:"envavorment"`
	LocationID    int    `gorm:"column:location_id" json:"location_id"`
	Latitude      string `gorm:"column:latitude;type:varchar(255)" json:"latitude"`
	Longitude     string `gorm:"column:longitude;type:varchar(255)" json:"longitude"`
	Zoom          int    `gorm:"column:zoom;default:6" json:"zoom"`
	MqttMainID    int    `gorm:"column:mqtt_main_id;default:1" json:"mqtt_main_id"`
	Configuration string `gorm:"column:configuration;type:text" json:"configuration"`
	BaseModel
	StatusModel
}

func (Mqtt) TableName() string {
	return "sd_iot_mqtt"
}
