package models

import (
	"time"
)

type UserRolePermission struct {
	RoleTypeID int        `gorm:"column:role_type_id;primaryKey"`
	Name       string     `gorm:"column:name;not null"`
	Detail     *string    `gorm:"column:detail;type:text"`
	Created    time.Time  `gorm:"column:created;not null"`
	Updated    *time.Time `gorm:"column:updated"`
	Insert     *int       `gorm:"column:insert"`
	Update     *int       `gorm:"column:update"`
	Delete     *int       `gorm:"column:delete"`
	Select     *int       `gorm:"column:select"`
	Log        *int       `gorm:"column:log"`
	Config     *int       `gorm:"column:config"`
	Truncate   *int       `gorm:"column:truncate"`
}

func (UserRolePermission) TableName() string {
	return "sd_user_roles_permision"
}
