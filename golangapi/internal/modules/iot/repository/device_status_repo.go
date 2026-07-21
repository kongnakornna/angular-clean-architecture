package repository

import (
	"context"
	"icmongolang/internal/modules/iot/models"

	"gorm.io/gorm"
)

type DeviceStatusRepository interface {
	GetByDeviceID(ctx context.Context, deviceID string) (*models.DeviceStatus, error)
	Upsert(ctx context.Context, status *models.DeviceStatus) error
	UpdateLastSeen(ctx context.Context, deviceID string) error
}

type deviceStatusRepo struct {
	db *gorm.DB
}

func NewDeviceStatusRepository(db *gorm.DB) DeviceStatusRepository {
	return &deviceStatusRepo{db: db}
}

func (r *deviceStatusRepo) GetByDeviceID(ctx context.Context, deviceID string) (*models.DeviceStatus, error) {
	var status models.DeviceStatus
	err := r.db.WithContext(ctx).Where("device_id = ?", deviceID).First(&status).Error
	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}
	return &status, err
}

func (r *deviceStatusRepo) Upsert(ctx context.Context, status *models.DeviceStatus) error {
	return r.db.WithContext(ctx).Save(status).Error
}

func (r *deviceStatusRepo) UpdateLastSeen(ctx context.Context, deviceID string) error {
	return r.db.WithContext(ctx).Model(&models.DeviceStatus{}).
		Where("device_id = ?", deviceID).
		Update("last_seen", gorm.Expr("NOW()")).Error
}
