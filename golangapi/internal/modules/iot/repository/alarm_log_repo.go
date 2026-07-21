// internal/modules/iot/repository/alarm_log_repo.go
package repository

import (
	"gorm.io/gorm"
)

type AlarmLogRepository interface {
	Create(log interface{}) error
	CountByDevice(deviceID int, alarmStatus int) (int64, error)
}

type alarmLogRepo struct {
	db *gorm.DB
}

func NewAlarmLogRepository(db *gorm.DB) AlarmLogRepository {
	return &alarmLogRepo{db: db}
}

func (r *alarmLogRepo) Create(log interface{}) error {
	return r.db.Table("alarm_logs").Create(log).Error
}

func (r *alarmLogRepo) CountByDevice(deviceID int, alarmStatus int) (int64, error) {
	var count int64
	err := r.db.Table("alarm_logs").Where("device_id = ? AND alarm_status = ?", deviceID, alarmStatus).Count(&count).Error
	return count, err
}
