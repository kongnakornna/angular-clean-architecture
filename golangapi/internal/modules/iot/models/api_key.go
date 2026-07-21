package models

import (
	"time"

	"gorm.io/datatypes"
)

// ApiKey corresponds to TypeORM entity ApiKey
type ApiKey struct {
	ID          int            `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	Name        string         `gorm:"column:name;type:varchar(200)" json:"name"`
	Description *string        `gorm:"column:description;type:text" json:"description,omitempty"`
	Key         string         `gorm:"column:api_key;type:varchar(64);uniqueIndex" json:"key"`
	Secret      string         `gorm:"column:api_secret;type:varchar(128)" json:"secret"`
	UserID      *string        `gorm:"column:user_id;type:varchar(255);index" json:"userId,omitempty"`
	Permissions datatypes.JSON `gorm:"column:permissions;type:jsonb" json:"permissions,omitempty"`
	ExpiresAt   *time.Time     `gorm:"column:expires_at;index" json:"expiresAt,omitempty"`
	LastUsedAt  *time.Time     `gorm:"column:last_used_at" json:"lastUsedAt,omitempty"`
	UsageCount  int            `gorm:"column:usage_count;default:0" json:"usageCount"`
	IsActive    bool           `gorm:"column:is_active;default:true;index" json:"isActive"`
	IPWhitelist datatypes.JSON `gorm:"column:ip_whitelist;type:jsonb" json:"ipWhitelist,omitempty"`
	CreatedAt   time.Time      `gorm:"column:created_at;autoCreateTime" json:"createdAt"`
	UpdatedAt   time.Time      `gorm:"column:updated_at;autoUpdateTime" json:"updatedAt"`
}

func (ApiKey) TableName() string {
	return "sd_api_key"
}
