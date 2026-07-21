package models

import (
	"time"
)

type SdUserRolesAccess struct {
	Create     time.Time `gorm:"column:create;not null"`
	Update     time.Time `gorm:"column:update;not null"`
	RoleID     int       `gorm:"column:role_id;primaryKey"`
	RoleTypeID int       `gorm:"column:role_type_id;not null"`
}

func (SdUserRolesAccess) TableName() string {
	return "sd_user_roles_access"
}
