package repository

import (
	"context"
	"icmongolang/internal/modules/iot/models"

	"gorm.io/gorm"
)

type ActivityLogRepository interface {
	Create(ctx context.Context, log *models.ActivityLog) error
}

type activityLogRepo struct {
	db *gorm.DB
}

func NewActivityLogRepository(db *gorm.DB) ActivityLogRepository {
	return &activityLogRepo{db: db}
}

func (r *activityLogRepo) Create(ctx context.Context, log *models.ActivityLog) error {
	return r.db.WithContext(ctx).Create(log).Error
}
