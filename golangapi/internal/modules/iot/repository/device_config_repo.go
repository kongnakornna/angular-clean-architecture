package repository

import (
	"context"
	"icmongolang/internal/modules/iot/models"

	"gorm.io/gorm"
)

type DeviceConfigRepository interface {
	GetByDeviceID(ctx context.Context, deviceID string) (*models.DeviceConfig, error)
	Upsert(ctx context.Context, config *models.DeviceConfig) error
}

type deviceConfigRepo struct {
	db *gorm.DB
}

func NewDeviceConfigRepository(db *gorm.DB) DeviceConfigRepository {
	return &deviceConfigRepo{db: db}
}

func (r *deviceConfigRepo) GetByDeviceID(ctx context.Context, deviceID string) (*models.DeviceConfig, error) {
	var config models.DeviceConfig
	err := r.db.WithContext(ctx).Where("device_id = ?", deviceID).First(&config).Error
	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}
	return &config, err
}

func (r *deviceConfigRepo) Upsert(ctx context.Context, config *models.DeviceConfig) error {
	return r.db.WithContext(ctx).Save(config).Error
}
