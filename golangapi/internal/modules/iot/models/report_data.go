package models

import (
	"time"

	"gorm.io/datatypes"
)

// ReportData corresponds to TypeORM entity ReportData
type ReportData struct {
	ID          int            `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	DeviceID    int            `gorm:"column:device_id;index" json:"DeviceId"`
	Device      *Device        `gorm:"foreignKey:DeviceID;references:DeviceID" json:"Device,omitempty"`
	TemplateID  *int           `gorm:"column:template_id" json:"templateId,omitempty"`
	ReportType  string         `gorm:"column:report_type;type:varchar(50);index" json:"reportType"`
	Data        datatypes.JSON `gorm:"column:data;type:jsonb" json:"data"`
	PeriodStart time.Time      `gorm:"column:period_start;index" json:"periodStart"`
	PeriodEnd   time.Time      `gorm:"column:period_end;index" json:"periodEnd"`
	GeneratedAt time.Time      `gorm:"column:generated_at;default:CURRENT_TIMESTAMP;index" json:"generatedAt"`
	FilePath    *string        `gorm:"column:file_path;type:varchar(500)" json:"filePath,omitempty"`
	FileFormat  *string        `gorm:"column:file_format;type:varchar(20)" json:"fileFormat,omitempty"`
	IsExported  bool           `gorm:"column:is_exported;default:false" json:"isExported"`
	ExportedAt  *time.Time     `gorm:"column:exported_at" json:"exportedAt,omitempty"`
	CreatedAt   time.Time      `gorm:"column:created_at;autoCreateTime" json:"createdAt"`
}

func (ReportData) TableName() string {
	return "sd_report_data"
}
