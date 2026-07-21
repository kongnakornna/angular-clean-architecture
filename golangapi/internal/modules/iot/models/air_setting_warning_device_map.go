package models

// AirSettingWarningDeviceMap corresponds to TypeORM entity airsettingwarningdevicemap
type AirSettingWarningDeviceMap struct {
	ID                  string `gorm:"primaryKey;type:uuid;default:gen_random_uuid();column:id" json:"id"`
	AirSettingWarningID *int   `gorm:"column:air_setting_warning_id;type:int" json:"air_setting_warning_id,omitempty"`
	AirControlID        *int   `gorm:"column:air_control_id;type:int" json:"air_control_id,omitempty"`
	DeviceID            *int   `gorm:"column:device_id;type:int" json:"device_id,omitempty"`
}

func (AirSettingWarningDeviceMap) TableName() string {
	return "sd_air_setting_warning_device_map"
}
