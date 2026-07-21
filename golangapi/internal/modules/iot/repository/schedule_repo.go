package repository

import (
	"icmongolang/internal/modules/iot/models"

	"gorm.io/gorm"
)

type ScheduleRepository interface {
	GetActiveSchedules() ([]models.Schedule, error)
}

type scheduleRepo struct {
	db *gorm.DB
}

func NewScheduleRepository(db *gorm.DB) ScheduleRepository {
	return &scheduleRepo{db: db}
}

func (r *scheduleRepo) GetActiveSchedules() ([]models.Schedule, error) {
	var schedules []models.Schedule
	err := r.db.Where("status = 1").Preload("ScheduleDevices.Device").Find(&schedules).Error
	return schedules, err
}
