package repository

import (
	"context"
	"icmongolang/internal/modules/iot/models"

	"gorm.io/gorm"
)

type IotDataRepository interface {
	Create(ctx context.Context, data *models.IotData) error
	GetLatest(ctx context.Context, deviceID string) (*models.IotData, error)
	GetByDateRange(ctx context.Context, deviceID string, start, end interface{}) ([]models.IotData, error)
	GetByDeviceID(ctx context.Context, deviceID string, limit, offset int) ([]models.IotData, error)
	CountByDeviceID(ctx context.Context, deviceID string) (int64, error)
	DeleteOlderThan(ctx context.Context, cutoff interface{}) (int64, error)
}

type iotDataRepo struct {
	db *gorm.DB
}

type CommandLogRepository interface {
	Create(ctx context.Context, log *models.CommandLog) error
	// สามารถเพิ่ม method อื่นๆ ตามต้องการ
}

type commandLogRepo struct {
	db *gorm.DB
}

func NewIotDataRepository(db *gorm.DB) IotDataRepository {
	return &iotDataRepo{db: db}
}

func (r *iotDataRepo) Create(ctx context.Context, data *models.IotData) error {
	return r.db.WithContext(ctx).Create(data).Error
}

func (r *iotDataRepo) GetLatest(ctx context.Context, deviceID string) (*models.IotData, error) {
	var data models.IotData
	err := r.db.WithContext(ctx).
		Where("device_id = ?", deviceID).
		Order("timestamp DESC").
		First(&data).Error
	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}
	return &data, err
}

func (r *iotDataRepo) GetByDateRange(ctx context.Context, deviceID string, start, end interface{}) ([]models.IotData, error) {
	var list []models.IotData
	err := r.db.WithContext(ctx).
		Where("device_id = ? AND timestamp BETWEEN ? AND ?", deviceID, start, end).
		Order("timestamp ASC").
		Find(&list).Error
	return list, err
}

func (r *iotDataRepo) GetByDeviceID(ctx context.Context, deviceID string, limit, offset int) ([]models.IotData, error) {
	var data []models.IotData
	err := r.db.WithContext(ctx).
		Where("device_id = ?", deviceID).
		Order("timestamp DESC").
		Limit(limit).
		Offset(offset).
		Find(&data).Error
	return data, err
}

func (r *iotDataRepo) CountByDeviceID(ctx context.Context, deviceID string) (int64, error) {
	var count int64
	err := r.db.WithContext(ctx).
		Model(&models.IotData{}).
		Where("device_id = ?", deviceID).
		Count(&count).Error
	return count, err
}

func (r *iotDataRepo) DeleteOlderThan(ctx context.Context, cutoff interface{}) (int64, error) {
	res := r.db.WithContext(ctx).
		Where("timestamp < ?", cutoff).
		Delete(&models.IotData{})
	return res.RowsAffected, res.Error
}

func NewCommandLogRepository(db *gorm.DB) CommandLogRepository {
	return &commandLogRepo{db: db}
}

func (r *commandLogRepo) Create(ctx context.Context, log *models.CommandLog) error {
	return r.db.WithContext(ctx).Create(log).Error
}
