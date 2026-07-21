package models

import (
	"time"
)

// DeviceGroupMember corresponds to TypeORM entity DeviceGroupMember
type DeviceGroupMember struct {
	ID        int          `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	DeviceID  int          `gorm:"column:Device_id;index;uniqueIndex:unique_Device_group,priority:1" json:"DeviceId"`
	Device    *Device      `gorm:"foreignKey:DeviceID;references:DeviceID" json:"Device,omitempty"`
	GroupID   int          `gorm:"column:group_id;index;uniqueIndex:unique_Device_group,priority:2" json:"groupId"`
	Group     *DeviceGroup `gorm:"foreignKey:GroupID;references:ID" json:"group,omitempty"`
	Role      string       `gorm:"column:role;type:varchar(50);default:'member'" json:"role"`
	Priority  int          `gorm:"column:priority;default:1" json:"priority"`
	IsActive  bool         `gorm:"column:is_active;default:true;index" json:"isActive"`
	CreatedAt time.Time    `gorm:"column:created_at;autoCreateTime" json:"createdAt"`
}

func (DeviceGroupMember) TableName() string {
	return "sd_device_member"
}
