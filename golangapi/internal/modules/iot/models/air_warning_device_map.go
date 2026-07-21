package models

// AirWarningDeviceMap corresponds to TypeORM entity airwarningdevicemap
type AirWarningDeviceMap struct {
	ID           string `gorm:"primaryKey;type:uuid;default:gen_random_uuid();column:id" json:"id"`
	AirWarningID *int   `gorm:"column:air_warning_id;type:int" json:"air_warning_id,omitempty"`
	AirControlID *int   `gorm:"column:air_control_id;type:int" json:"air_control_id,omitempty"`
	DeviceID     *int   `gorm:"column:device_id;type:int" json:"device_id,omitempty"`
}

func (AirWarningDeviceMap) TableName() string {
	return "sd_air_warning_device_map"
}
