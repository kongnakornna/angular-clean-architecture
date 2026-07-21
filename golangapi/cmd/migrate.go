package cmd

import (
	"fmt"
	"icmongolang/config"
	iotmodels "icmongolang/internal/modules/iot/models"
	kafkamodels "icmongolang/internal/modules/kafka/models"
	"icmongolang/internal/models"
	"icmongolang/pkg/db/postgres"
	"icmongolang/pkg/logger"

	"github.com/spf13/cobra"
	"gorm.io/gorm"
)

var migrateCmd = &cobra.Command{
	Use:   "migrate",
	Short: "Migrate data",
	Long:  "Migrate data",
	Run: func(cmd *cobra.Command, args []string) {
		cfg := config.GetCfg()
		appLogger := logger.NewApiLogger(cfg)
		appLogger.InitLogger()
		appLogger.Infof("AppVersion: %s, LogLevel: %s, Mode: %s", cfg.Server.AppVersion, cfg.Logger.Level, cfg.Server.Mode)

		appLogger.Infof("--migrate Run--")
		psqlDB, err := postgres.NewPsqlDB(cfg)
		if err != nil {
			appLogger.Fatalf("เชื่อมต่อไม่สำเร็จ - Postgresql init: %s", err)
		}
		appLogger.Infof("Postgres connected successfully")

		if err := createExtensions(psqlDB); err != nil {
			appLogger.Warnf("Failed to create extensions: %v", err)
		}

		// Run migration with skip list for problematic models
		if err := Migrate(psqlDB, appLogger); err != nil {
			appLogger.Fatal("Migrate ข้อมูลไม่สำเร็จ: ", err)
		}
		appLogger.Info("Migrate ข้อมูลสำเร็จ")
	},
}

func createExtensions(db *gorm.DB) error {
	extensions := []string{
		"CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"",
		"CREATE EXTENSION IF NOT EXISTS \"pgcrypto\"",
	}
	for _, ext := range extensions {
		if err := db.Exec(ext).Error; err != nil {
			return err
		}
	}
	return nil
}

// Migrate runs AutoMigrate with skip list for models that have known issues.
// Add any model that fails to this list to skip it.
// Migrate runs AutoMigrate with skip list for models that have known issues.
func Migrate(db *gorm.DB, log logger.Logger) error {
	// ⚠️  Add any model that fails to this map to skip it.
	skipModels := map[string]bool{
		// Skip models with Device relation (because Device has Mqtt/Location issues)
		"*models.Device":                   true,
		"*models.DeviceNotificationConfig": true,
		"*models.DeviceSchedule":           true,
		"*models.DeviceStatusHistory":      true,
		"*models.SdActivityLog":            true, // has ActivityType relation
		"*models.DeviceGroupMember":        true, // may also have Device relation
		"*models.NotificationCondition":    true,
		"*models.NotificationLog":          true,
		"*models.ReportData":               true,
		"*models.SensorData":               true,
		"*models.DeviceGroup":              true, // might have nested issues
		"*models.DeviceCategory":           true,
		"*models.DeviceStatus":             true, // if it has Device relation
		"*models.DeviceConfig":             true,
		"*models.CommandLog":               true,
		"*models.DeviceAlert":              true,
		"*models.IotData":                  true,
		"*models.ActivityLog":              true,
		// Add any other models that cause "invalid field" errors here
	}

	allModels := []interface{}{
		&models.ActivityLog{},
		&models.CommandLog{},
		&models.DeviceAlert{},
		&models.DeviceConfig{},
		&models.DeviceStatus{},
		&models.IotData{},
		&models.NotiNotificationLog{},
		&models.NotiNotificationRule{},
		&models.NotiNotificationType{},
		&models.NotiNotification{},
		&models.NotificationDevice{},
		&models.NotificationGroup{},
		&models.NotificationGroupsDevicesNotificationDevice{},
		&models.NotificationLog{},
		&models.NotificationType{},
		&models.SdActivityLog{},
		&models.SdActivityTypeLog{},
		&models.SdAdminAccessMenu{},
		&models.SdAirControl{},
		&models.SdAirControlDeviceMap{},
		&models.SdAirControlLog{},
		&models.SdAirMod{},
		&models.SdAirModDeviceMap{},
		&models.SdAirPeriod{},
		&models.SdAirPeriodDeviceMap{},
		&models.SdAirSettingWarning{},
		&models.SdAirSettingWarningDeviceMap{},
		&models.SdAirWarning{},
		&models.SdAirWarningDeviceMap{},
		&models.SdAlarmProcessLog{},
		&models.SdAlarmProcessLogEmail{},
		&models.SdAlarmProcessLogLine{},
		&models.SdAlarmProcessLogMqtt{},
		&models.SdAlarmProcessLogSms{},
		&models.SdAlarmProcessLogTelegram{},
		&models.SdAlarmProcessLogTemp{},
		&models.SdApiKey{},
		&models.SdAuditLog{},
		&models.SdChannelTemplate{},
		&models.SdDashboardConfig{},
		&models.SdDeviceCategory{},
		&models.SdDeviceGroup{},
		&models.SdDeviceLog{},
		&models.SdDeviceMember{},
		&models.SdDeviceNotificationConfig{},
		&models.SdDeviceSchedule{},
		&models.SdDeviceStatusHistory{},
		&models.SdGroupNotificationConfig{},
		&models.SdIotAlarmDevice{},
		&models.SdIotAlarmDeviceEvent{},
		&models.SdIotApi{},
		&models.SdIotDevice{},
		&models.SdIotDeviceAction{},
		&models.SdIotDeviceActionLog{},
		&models.SdIotDeviceActionUser{},
		&models.SdIotDeviceAlarmAction{},
		&models.SdIotDeviceType{},
		&models.SdIotEmail{},
		&models.SdIotGroup{},
		&models.SdIotHost{},
		&models.SdIotInfluxdb{},
		&models.SdIotLine{},
		&models.SdIotLocation{},
		&models.SdIotMqtt{},
		&models.SdIotNodered{},
		&models.SdIotSchedule{},
		&models.SdIotScheduleDevice{},
		&models.SdIotSensor{},
		&models.SdIotSetting{},
		&models.SdIotSms{},
		&models.SdIotTelegram{},
		&models.SdIotToken{},
		&models.SdIotType{},
		&models.SdModuleLog{},
		&models.SdMqttHost{},
		&models.SdMqttLog{},
		&models.SdNotificationChannel{},
		&models.SdNotificationCondition{},
		&models.SdNotificationLog{},
		&models.SdNotificationType{},
		&models.SdReportData{},
		&models.SdScheduleProcessLog{},
		&models.SdSensorData{},
		&models.SdSystemSetting{},
		&models.SdUser{},
		&models.SdUserAccessMenu{},
		&models.SdUserFile{},
		&models.SdUserLog{},
		&models.SdUserLogType{},
		&models.SdUserRole{},
		&models.SdUserRolesAccess{},
		&models.UserRolePermission{},
		&models.SdUserRolesPermision{},
		&models.Tnb{},
		&models.Item{},
		&models.WsMessage{},
		&models.WsSession{},
		&models.User{},
		&kafkamodels.Order{},
		&iotmodels.IotData{},
		&iotmodels.ActivityLog{},
		&iotmodels.AirControlDeviceMap{},
		&iotmodels.AirControl{},
		&iotmodels.AirControlLog{},
		&iotmodels.AirMod{},
		&iotmodels.AirModDeviceMap{},
		&iotmodels.AirPeriod{},
		&iotmodels.AirPeriodDeviceMap{},
		&iotmodels.AirSettingWarning{},
		&iotmodels.AirSettingWarningDeviceMap{},
		&iotmodels.AirWarning{},
		&iotmodels.AirWarningDeviceMap{},
		&iotmodels.Device{},
		&iotmodels.DeviceCategory{},
		&iotmodels.DeviceGroup{},
		&iotmodels.DeviceNotificationConfig{},
		&iotmodels.DeviceSchedule{},
		&iotmodels.DeviceStatusHistory{},
		&iotmodels.GroupNotificationConfig{},
	}

	// Filter out skipped models
	var toMigrate []interface{}
	for _, m := range allModels {
		typeName := fmt.Sprintf("%T", m)
		if skipModels[typeName] {
			log.Warnf("Skipping model %s due to known issue", typeName)
			continue
		}
		toMigrate = append(toMigrate, m)
	}

	log.Infof("Migrating %d models (skipped %d)", len(toMigrate), len(allModels)-len(toMigrate))

	// Run AutoMigrate on the filtered list
	if err := db.AutoMigrate(toMigrate...); err != nil {
		return fmt.Errorf("auto migrate error: %w", err)
	}

	log.Info("Migration completed successfully")
	return nil
}
