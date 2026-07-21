package models

// AirPeriodDeviceMap corresponds to TypeORM entity airperioddevicemap
type AirPeriodDeviceMap struct {
	ID           string `gorm:"primaryKey;type:uuid;default:gen_random_uuid();column:id" json:"id"`
	AirPeriodID  *int   `gorm:"column:air_period_id;type:int" json:"air_period_id,omitempty"`
	AirControlID *int   `gorm:"column:air_control_id;type:int" json:"air_control_id,omitempty"`
	DeviceID     *int   `gorm:"column:device_id;type:int" json:"device_id,omitempty"`
}

func (AirPeriodDeviceMap) TableName() string {
	return "sd_air_period_device_map"
}
