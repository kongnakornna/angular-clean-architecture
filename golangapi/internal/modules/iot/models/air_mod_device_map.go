package models

// AirModDeviceMap corresponds to TypeORM entity airmoddevicemap
type AirModDeviceMap struct {
	ID           string `gorm:"primaryKey;type:uuid;default:gen_random_uuid();column:id" json:"id"`
	AirModID     *int   `gorm:"column:air_mod_id;type:int" json:"air_mod_id,omitempty"`
	AirControlID *int   `gorm:"column:air_control_id;type:int" json:"air_control_id,omitempty"`
	DeviceID     *int   `gorm:"column:device_id;type:int" json:"device_id,omitempty"`
}

func (AirModDeviceMap) TableName() string {
	return "sd_air_mod_device_map"
}
