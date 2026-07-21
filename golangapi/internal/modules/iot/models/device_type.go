package models

type DeviceType struct {
	TypeID   int    `gorm:"column:type_id;primaryKey;autoIncrement"`
	TypeName string `gorm:"column:type_name;type:varchar(255)"`
	BaseModel
	StatusModel
}

func (DeviceType) TableName() string {
	return "sd_iot_device_type"
}
