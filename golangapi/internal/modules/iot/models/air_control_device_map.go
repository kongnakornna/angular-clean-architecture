package models

// AirControlDeviceMap corresponds to TypeORM entity aircontroldevicemap
type AirControlDeviceMap struct {
	ID           string `gorm:"primaryKey;type:uuid;default:gen_random_uuid();column:id" json:"id"`
	AirControlID *int   `gorm:"column:air_control_id;type:int" json:"air_control_id,omitempty"`
	DeviceID     *int   `gorm:"column:device_id;type:int" json:"device_id,omitempty"`
}

func (AirControlDeviceMap) TableName() string {
	return "sd_air_control_device_map"
}
