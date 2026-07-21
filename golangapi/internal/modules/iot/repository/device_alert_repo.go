package repository

import (
	"context"
	"icmongolang/internal/modules/iot/models"

	"gorm.io/gorm"
)

type DeviceAlertRepository interface {
	Create(ctx context.Context, alert *models.DeviceAlert) error
	// สามารถเพิ่ม method อื่นๆ ตามต้องการ
}

type deviceAlertRepo struct {
	db *gorm.DB
}

func NewDeviceAlertRepository(db *gorm.DB) DeviceAlertRepository {
	return &deviceAlertRepo{db: db}
}

func (r *deviceAlertRepo) Create(ctx context.Context, alert *models.DeviceAlert) error {
	return r.db.WithContext(ctx).Create(alert).Error
}
