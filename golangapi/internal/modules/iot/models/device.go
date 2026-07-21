package models

import (
	"time"
)

type Device struct {
	DeviceID             int        `gorm:"column:device_id;primaryKey;autoIncrement" json:"device_id"`
	SettingID            int        `gorm:"column:setting_id" json:"setting_id"`
	TypeID               int        `gorm:"column:type_id"`
	Type                 DeviceType `gorm:"foreignKey:TypeID;references:TypeID" json:"type,omitempty"`
	LocationID           int        `gorm:"column:location_id" json:"location_id"`
	DeviceName           string     `gorm:"column:device_name;type:varchar(255)" json:"device_name"`
	SN                   string     `gorm:"column:sn;type:varchar(255);uniqueIndex" json:"sn"`
	HardwareID           int        `gorm:"column:hardware_id" json:"hardware_id"`
	StatusWarning        string     `gorm:"column:status_warning;type:varchar(150)" json:"status_warning"`
	RecoveryWarning      string     `gorm:"column:recovery_warning;type:varchar(150)" json:"recovery_warning"`
	StatusAlert          string     `gorm:"column:status_alert;type:varchar(150)" json:"status_alert"`
	RecoveryAlert        string     `gorm:"column:recovery_alert;type:varchar(150)" json:"recovery_alert"`
	TimeLife             int        `gorm:"column:time_life;default:1" json:"time_life"`
	Period               string     `gorm:"column:period;type:varchar(150)" json:"period"`
	WorkStatus           int        `gorm:"column:work_status;default:1" json:"work_status"`
	Max                  string     `gorm:"column:max;type:varchar(255)" json:"max"`
	Min                  string     `gorm:"column:min;type:varchar(255)" json:"min"`
	Model                string     `gorm:"column:model;type:varchar(255)" json:"model"`
	Vendor               string     `gorm:"column:vendor;type:varchar(255)" json:"vendor"`
	CompareValue         string     `gorm:"column:comparevalue;type:varchar(255)" json:"comparevalue"`
	Unit                 string     `gorm:"column:unit;type:varchar(255)" json:"unit"`
	HostID               string     `gorm:"column:host_id"`
	OID                  string     `gorm:"column:oid;type:varchar(255)" json:"oid"`
	ActionID             int        `gorm:"column:action_id" json:"action_id"`
	StatusAlertID        int        `gorm:"column:status_alert_id" json:"status_alert_id"`
	MqttDataValue        string     `gorm:"column:mqtt_data_value;type:varchar(255)" json:"mqtt_data_value"`
	MqttDataControl      string     `gorm:"column:mqtt_data_control;type:varchar(255)" json:"mqtt_data_control"`
	Measurement          string     `gorm:"column:measurement;type:varchar(255)" json:"measurement"`
	MqttControlOn        string     `gorm:"column:mqtt_control_on;type:varchar(255);default:'1'" json:"mqtt_control_on"`
	MqttControlOff       string     `gorm:"column:mqtt_control_off;type:varchar(255);default:'0'" json:"mqtt_control_off"`
	Org                  string     `gorm:"column:org;type:varchar(255)" json:"org"`
	Bucket               string     `gorm:"column:bucket;type:varchar(255)" json:"bucket"`
	Status               int        `gorm:"column:status" json:"status"`
	MqttDeviceName       string     `gorm:"column:mqtt_device_name;type:varchar(255)" json:"mqtt_device_name"`
	MqttStatusOverName   string     `gorm:"column:mqtt_status_over_name;type:text" json:"mqtt_status_over_name"`
	MqttStatusDataName   string     `gorm:"column:mqtt_status_data_name;type:text" json:"mqtt_status_data_name"`
	MqttActRelayName     string     `gorm:"column:mqtt_act_relay_name;type:text" json:"mqtt_act_relay_name"`
	MqttControlRelayName string     `gorm:"column:mqtt_control_relay_name;type:text" json:"mqtt_control_relay_name"`
	Layout               int        `gorm:"column:layout;default:1" json:"layout"`
	AlertSet             int        `gorm:"column:alert_set;default:1" json:"alert_set"`
	IconNormal           string     `gorm:"column:icon_normal;type:text" json:"icon_normal"`
	IconWarning          string     `gorm:"column:icon_warning;type:text" json:"icon_warning"`
	IconAlert            string     `gorm:"column:icon_alert;type:text" json:"icon_alert"`
	Icon                 string     `gorm:"column:icon;type:text" json:"icon"`
	IconOn               string     `gorm:"column:icon_on;type:text" json:"icon_on"`
	IconOff              string     `gorm:"column:icon_off;type:text" json:"icon_off"`
	ColorNormal          string     `gorm:"column:color_normal;default:'#22C55E'" json:"color_normal"`
	ColorWarning         string     `gorm:"column:color_warning;default:'#F59E0B'" json:"color_warning"`
	ColorAlert           string     `gorm:"column:color_alert;default:'#EF4444'" json:"color_alert"`
	Code                 string     `gorm:"column:code;default:'normal'" json:"code"`
	Menu                 int        `gorm:"column:menu;default:1" json:"menu"`
	CalibrationAdd       string     `gorm:"column:calibration_add;type:varchar(250);default:'0'" json:"calibration_add"`
	CalibrationSubtract  string     `gorm:"column:calibration_subtract;type:varchar(250);default:'0'" json:"calibration_subtract"`
	CalibrationType      int        `gorm:"column:calibration_type;default:3" json:"calibration_type"` // 1=add,2=subtract,3=none
	CreatedAt            time.Time  `gorm:"column:createddate;autoCreateTime" json:"created_at"`
	UpdatedAt            time.Time  `gorm:"column:updateddate;autoUpdateTime" json:"updated_at"`

	// ⚠️  Ignore these fields during migration (they cause GORM errors due to missing foreign keys)
	Mqtt     Mqtt     `gorm:"-" json:"mqtt,omitempty"`
	Location Location `gorm:"-" json:"location,omitempty"`
}

func (Device) TableName() string {
	return "sd_iot_device"
}
