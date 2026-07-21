package models

type Location struct {
	LocationID     int    `gorm:"column:location_id;primaryKey;autoIncrement" json:"location_id"`
	LocationName   string `gorm:"column:location_name;type:varchar(255)" json:"location_name"`
	IPAddress      string `gorm:"column:ipaddress;type:varchar(255)" json:"ipaddress"`
	LocationDetail string `gorm:"column:location_detail;type:text" json:"location_detail"`
	ConfigData     string `gorm:"column:configdata;type:text" json:"configdata"`
	BaseModel
	StatusModel
}

func (Location) TableName() string {
	return "sd_iot_location"
}
