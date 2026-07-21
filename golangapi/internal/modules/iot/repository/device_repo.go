package repository

import (
	"context"
	"fmt"
	"icmongolang/internal/models"
	"strings"
	"time"

	"gorm.io/gorm"
)

// DeviceRepository interface
type DeviceRepository interface {
	GetDeviceByID(id int) (*models.Device, error)
	GetDevicesByBucket(bucket string) ([]models.Device, error)
	GetDevicesByLocation(locationID int) ([]models.Device, error)
	ListDevices(filter map[string]interface{}, page, pageSize int) ([]models.Device, int64, error)
	ListDevicesWithAlarm(ctx context.Context, req *DeviceListAlarmRequest) (*PaginatedDeviceResult, error)
}

type deviceRepo struct {
	db *gorm.DB
}

func NewDeviceRepository(db *gorm.DB) DeviceRepository {
	return &deviceRepo{db: db}
}

// ---------- basic methods (no problematic preloads) ----------
func (r *deviceRepo) GetDeviceByID(id int) (*models.Device, error) {
	var device models.Device
	// Preload removed – use joins if needed, but for now fetch only device
	err := r.db.First(&device, id).Error
	return &device, err
}

func (r *deviceRepo) GetDevicesByBucket(bucket string) ([]models.Device, error) {
	var devices []models.Device
	// Simple query – no Preload("Type") to avoid relation errors
	err := r.db.Where("bucket = ?", bucket).Find(&devices).Error
	return devices, err
}

func (r *deviceRepo) GetDevicesByLocation(locationID int) ([]models.Device, error) {
	var devices []models.Device
	// Preload removed
	err := r.db.Where("location_id = ?", locationID).Find(&devices).Error
	return devices, err
}

func (r *deviceRepo) ListDevices(filter map[string]interface{}, page, pageSize int) ([]models.Device, int64, error) {
	// Sanitize pagination
	if page <= 0 {
		page = 1
	}
	if pageSize <= 0 {
		pageSize = 10
	}
	const maxPageSize = 100
	if pageSize > maxPageSize {
		pageSize = maxPageSize
	}

	allowedColumns := map[string]bool{
		"device_id":   true,
		"type_id":     true,
		"hardware_id": true,
		"location_id": true,
		"mqtt_id":     true,
		"status":      true,
		"bucket":      true,
		"org":         true,
	}

	query := r.db.Model(&models.Device{})

	for key, val := range filter {
		if !allowedColumns[key] {
			continue
		}
		// Skip empty values to avoid useless WHERE clauses
		if val == nil || val == "" || (val == 0 && key != "status") {
			continue
		}
		query = query.Where(key+" = ?", val)
	}

	// Count total matching records
	var total int64
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}
	if total == 0 {
		return []models.Device{}, 0, nil
	}

	// Fetch paginated results – NO PRELOAD (TypeName not used in basic list)
	var devices []models.Device
	err := query.
		Order("device_id ASC").
		Offset((page - 1) * pageSize).
		Limit(pageSize).
		Find(&devices).Error

	if err != nil {
		return nil, 0, err
	}
	return devices, total, nil
}

// ---------- types for advanced listing with joins (ListDevicesWithAlarm) ----------
type DeviceListAlarmRequest struct {
	DeviceID        string
	MqttID          string
	Keyword         string
	Status          int
	Bucket          string
	Org             string
	TypeID          int
	LocationID      int
	SN              string
	StatusWarning   string
	RecoveryWarning string
	StatusAlert     string
	RecoveryAlert   string
	TimeLife        int
	Period          string
	Max             string
	Min             string
	HardwareID      int
	Model           string
	Vendor          string
	CompareValue    string
	Oid             string
	ActionID        int
	MqttDataValue   string
	MqttDataControl string
	CreatedDate     *time.Time
	UpdatedDate     *time.Time
	Page            int
	PageSize        int
	IsCount         bool
	Sort            string
}

type DeviceAlarmListItem struct {
	DeviceID             int       `gorm:"column:device_id"`
	MqttID               int       `gorm:"column:mqtt_id"`
	SettingID            int       `gorm:"column:setting_id"`
	TypeID               int       `gorm:"column:type_id"`
	DeviceName           string    `gorm:"column:device_name"`
	SN                   string    `gorm:"column:sn"`
	HardwareID           int       `gorm:"column:hardware_id"`
	StatusWarning        string    `gorm:"column:status_warning"`
	RecoveryWarning      string    `gorm:"column:recovery_warning"`
	StatusAlert          string    `gorm:"column:status_alert"`
	RecoveryAlert        string    `gorm:"column:recovery_alert"`
	TimeLife             int       `gorm:"column:time_life"`
	Period               string    `gorm:"column:period"`
	WorkStatus           int       `gorm:"column:work_status"`
	Layout               int       `gorm:"column:layout"`
	Menu                 int       `gorm:"column:menu"`
	Max                  string    `gorm:"column:max"`
	Min                  string    `gorm:"column:min"`
	Oid                  string    `gorm:"column:oid"`
	CalibrationAdd       string    `gorm:"column:calibration_add"`
	CalibrationSubtract  string    `gorm:"column:calibration_subtract"`
	CalibrationType      int       `gorm:"column:calibration_type"`
	MqttDataValue        string    `gorm:"column:mqtt_data_value"`
	MqttDataControl      string    `gorm:"column:mqtt_data_control"`
	Model                string    `gorm:"column:model"`
	Vendor               string    `gorm:"column:vendor"`
	CompareValue         string    `gorm:"column:comparevalue"`
	CreatedDate          time.Time `gorm:"column:createddate"`
	UpdatedDate          time.Time `gorm:"column:updateddate"`
	Status               int       `gorm:"column:status"`
	Unit                 string    `gorm:"column:unit"`
	ActionID             int       `gorm:"column:action_id"`
	StatusAlertID        int       `gorm:"column:status_alert_id"`
	Measurement          string    `gorm:"column:measurement"`
	MqttControlOn        string    `gorm:"column:mqtt_control_on"`
	MqttControlOff       string    `gorm:"column:mqtt_control_off"`
	DeviceOrg            string    `gorm:"column:device_org"`
	DeviceBucket         string    `gorm:"column:device_bucket"`
	TypeName             string    `gorm:"column:type_name"`
	LocationName         string    `gorm:"column:location_name"`
	ConfigData           string    `gorm:"column:configdata"`
	MqttName             string    `gorm:"column:mqtt_name"`
	MqttOrg              string    `gorm:"column:mqtt_org"`
	MqttBucket           string    `gorm:"column:mqtt_bucket"`
	MqttEnvavorment      string    `gorm:"column:mqtt_envavorment"`
	MqttHost             string    `gorm:"column:mqtt_host"`
	MqttPort             int       `gorm:"column:mqtt_port"`
	MqttDeviceName       string    `gorm:"column:mqtt_device_name"`
	MqttStatusOverName   string    `gorm:"column:mqtt_status_over_name"`
	MqttStatusDataName   string    `gorm:"column:mqtt_status_data_name"`
	MqttActRelayName     string    `gorm:"column:mqtt_act_relay_name"`
	MqttControlRelayName string    `gorm:"column:mqtt_control_relay_name"`
	HostName             string    `gorm:"column:host_name"`
	Port                 int       `gorm:"column:port"`
	HostID               string    `gorm:"column:host_id"`
	HardwareTypeName     string    `gorm:"column:hardware_type_name"`
	LayoutApp            string    `gorm:"column:layoutapp"`
	CalibrationTypeDesc  string    `gorm:"column:calibrationtype"`
	Icon                 string    `gorm:"column:icon"`
	IconOn               string    `gorm:"column:icon_on"`
	IconOff              string    `gorm:"column:icon_off"`
	IconNormal           string    `gorm:"column:icon_normal"`
	IconWarning          string    `gorm:"column:icon_warning"`
	IconAlert            string    `gorm:"column:icon_alert"`
}

type PaginatedDeviceResult struct {
	Items      []DeviceAlarmListItem `json:"items"`
	TotalCount int64                 `json:"total_count"`
	Page       int                   `json:"page"`
	PageSize   int                   `json:"pageSize"`
}

// ListDevicesWithAlarm – uses raw SQL joins (no GORM relation issues)
func (r *deviceRepo) ListDevicesWithAlarm(ctx context.Context, req *DeviceListAlarmRequest) (*PaginatedDeviceResult, error) {
	if req.Page <= 0 {
		req.Page = 1
	}
	if req.PageSize <= 0 {
		req.PageSize = 10
	}
	status := 1
	if req.Status != 0 {
		status = req.Status
	}

	// Helper to build the base query with joins and static filters
	buildBaseQuery := func() *gorm.DB {
		query := r.db.Table("sd_iot_device AS d").
			Select(`
                d.device_id, d.mqtt_id, d.setting_id, d.type_id, d.device_name, d.sn, d.hardware_id,
                d.status_warning, d.recovery_warning, d.status_alert, d.recovery_alert,
                d.time_life, d.period, d.work_status, d.layout, d.menu, d.max, d.min, d.oid,
                d.calibration_add, d.calibration_subtract, d.calibration_type,
                d.mqtt_data_value, d.mqtt_data_control, d.model, d.vendor, d.comparevalue,
                d.createddate, d.updateddate, d.status, d.unit, d.action_id, d.status_alert_id,
                d.measurement, d.mqtt_control_on, d.mqtt_control_off, d.org AS device_org,
                d.bucket AS device_bucket, d.mqtt_device_name, d.mqtt_status_over_name,
                d.mqtt_status_data_name, d.mqtt_act_relay_name, d.mqtt_control_relay_name,
				d.icon, d.icon_on, d.icon_off, d.icon_normal, d.icon_warning, d.icon_alert,
                t.type_name, l.location_name, l.configdata,
                mq.mqtt_name, mq.org AS mqtt_org, mq.bucket AS mqtt_bucket,
                mq.envavorment AS mqtt_envavorment, mq.host AS mqtt_host, mq.port AS mqtt_port,
                h.host_name, h.port, h.host_id,
                CASE 
                    WHEN d.hardware_id = 1 THEN 'Sensor'
                    WHEN d.hardware_id = 2 THEN 'IO Sensor'
                    WHEN d.hardware_id = 3 THEN 'IO Control'
                    WHEN d.hardware_id = 4 THEN 'Critical Sensor'
                    ELSE 'Unknown'
                END AS hardware_type_name,
                CASE 
                    WHEN d.layout = 1 THEN 'Right Menu'
                    WHEN d.layout = 2 THEN 'Card'
                    WHEN d.layout = 3 THEN 'Left Menu'
                    WHEN d.layout = 4 THEN 'Footer Menu'
                    ELSE 'Unknown'
                END AS layoutapp,
                CASE 
                    WHEN d.calibration_type = 1 THEN 'Calibration Add'
                    WHEN d.calibration_type = 2 THEN 'Calibration Subtract'
                    WHEN d.calibration_type = 3 THEN 'Non calibration'
                    ELSE 'Non calibration'
                END AS calibrationtype
            `).
			Joins("LEFT JOIN sd_iot_device_type t ON t.type_id = d.type_id").
			Joins("LEFT JOIN sd_iot_mqtt mq ON mq.mqtt_id = d.mqtt_id").
			Joins("LEFT JOIN sd_iot_location l ON l.location_id = d.location_id").
			Joins("LEFT JOIN sd_iot_host h ON h.idhost = mq.mqtt_main_id").
			Where("d.status = ?", status).
			Where("mq.status = ?", status)
		return query
	}

	// Apply dynamic filters to a given query
	applyFilters := func(query *gorm.DB) *gorm.DB {
		if req.Keyword != "" {
			query = query.Where("d.device_name LIKE ?", "%"+req.Keyword+"%")
		}
		if req.DeviceID != "" {
			query = query.Where("d.device_id = ?", req.DeviceID)
		}
		if req.Bucket != "" {
			query = query.Where("d.bucket = ?", req.Bucket)
		}
		if req.MqttID != "" {
			query = query.Where("d.mqtt_id = ?", req.MqttID)
		}
		if req.Org != "" {
			query = query.Where("d.org = ?", req.Org)
		}
		if req.TypeID != 0 {
			query = query.Where("d.type_id = ?", req.TypeID)
		}
		if req.LocationID != 0 {
			query = query.Where("d.location_id = ?", req.LocationID)
		}
		if req.SN != "" {
			query = query.Where("d.sn = ?", req.SN)
		}
		if req.StatusWarning != "" {
			query = query.Where("d.status_warning = ?", req.StatusWarning)
		}
		if req.RecoveryWarning != "" {
			query = query.Where("d.recovery_warning = ?", req.RecoveryWarning)
		}
		if req.StatusAlert != "" {
			query = query.Where("d.status_alert = ?", req.StatusAlert)
		}
		if req.RecoveryAlert != "" {
			query = query.Where("d.recovery_alert = ?", req.RecoveryAlert)
		}
		if req.TimeLife != 0 {
			query = query.Where("d.time_life = ?", req.TimeLife)
		}
		if req.Period != "" {
			query = query.Where("d.period = ?", req.Period)
		}
		if req.Max != "" {
			query = query.Where("d.max = ?", req.Max)
		}
		if req.Min != "" {
			query = query.Where("d.min = ?", req.Min)
		}
		if req.HardwareID != 0 {
			query = query.Where("d.hardware_id = ?", req.HardwareID)
		}
		if req.Model != "" {
			query = query.Where("d.model = ?", req.Model)
		}
		if req.Vendor != "" {
			query = query.Where("d.vendor = ?", req.Vendor)
		}
		if req.CompareValue != "" {
			query = query.Where("d.comparevalue = ?", req.CompareValue)
		}
		if req.Oid != "" {
			query = query.Where("d.oid = ?", req.Oid)
		}
		if req.ActionID != 0 {
			query = query.Where("d.action_id = ?", req.ActionID)
		}
		if req.MqttDataValue != "" {
			query = query.Where("d.mqtt_data_value = ?", req.MqttDataValue)
		}
		if req.MqttDataControl != "" {
			query = query.Where("d.mqtt_data_control = ?", req.MqttDataControl)
		}
		if req.CreatedDate != nil {
			query = query.Where("DATE(d.createddate) = ?", req.CreatedDate.Format("2006-01-02"))
		}
		if req.UpdatedDate != nil {
			query = query.Where("DATE(d.updateddate) = ?", req.UpdatedDate.Format("2006-01-02"))
		}
		return query
	}

	// For count-only request
	if req.IsCount {
		base := buildBaseQuery()
		base = applyFilters(base)
		var total int64
		if err := base.Count(&total).Error; err != nil {
			return nil, err
		}
		return &PaginatedDeviceResult{
			TotalCount: total,
			Page:       req.Page,
			PageSize:   req.PageSize,
		}, nil
	}

	// Normal paginated request
	base := buildBaseQuery()
	base = applyFilters(base)

	allowedSortFields := map[string]bool{
		"device_id":   true,
		"device_name": true,
		"type_id":     true,
		"hardware_id": true,
		"location_id": true,
		"status":      true,
		"createddate": true,
		"updateddate": true,
		"sn":          true,
	}

	// Sorting
	if req.Sort != "" {
		parts := strings.SplitN(req.Sort, ":", 2)
		if len(parts) == 2 {
			field := parts[0]
			order := strings.ToUpper(parts[1])
			if allowedSortFields[field] && (order == "ASC" || order == "DESC") {
				base = base.Order(fmt.Sprintf("d.%s %s", field, order))
			}
		}
	} else {
		base = base.Order("mq.sort ASC").Order("d.device_id ASC")
	}

	// Count total items (use a fresh clone to avoid modifying the pagination query)
	countQuery := buildBaseQuery()
	countQuery = applyFilters(countQuery)
	var total int64
	if err := countQuery.Count(&total).Error; err != nil {
		return nil, err
	}

	// Pagination
	offset := (req.Page - 1) * req.PageSize
	var items []DeviceAlarmListItem
	if err := base.Limit(req.PageSize).Offset(offset).Scan(&items).Error; err != nil {
		return nil, err
	}

	return &PaginatedDeviceResult{
		Items:      items,
		TotalCount: total,
		Page:       req.Page,
		PageSize:   req.PageSize,
	}, nil
}
