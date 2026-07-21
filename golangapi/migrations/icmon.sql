/*
 Navicat Premium Dump SQL

 Source Server         : 192.168.1.42
 Source Server Type    : PostgreSQL
 Source Server Version : 150017 (150017)
 Source Host           : 192.168.1.42:5432
 Source Catalog        : nest_cmon
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 150017 (150017)
 File Encoding         : 65001

 Date: 02/04/2026 19:10:07
*/


-- ----------------------------
-- Type structure for seg
-- ----------------------------
DROP TYPE IF EXISTS "public"."seg";
CREATE TYPE "public"."seg";
ALTER TYPE "public"."seg" OWNER TO "postgres";

-- ----------------------------
-- Type structure for user_role_enum
-- ----------------------------
DROP TYPE IF EXISTS "public"."user_role_enum";
CREATE TYPE "public"."user_role_enum" AS ENUM (
  'SUPERADMIN',
  'ADMIN',
  'EDITOR',
  'MONITOR',
  'USER'
);
ALTER TYPE "public"."user_role_enum" OWNER TO "postgres";

-- ----------------------------
-- Type structure for user_usertype_enum
-- ----------------------------
DROP TYPE IF EXISTS "public"."user_usertype_enum";
CREATE TYPE "public"."user_usertype_enum" AS ENUM (
  'therapist',
  'supervisor',
  'superadmin',
  'system',
  'admin',
  'support',
  'enduser'
);
ALTER TYPE "public"."user_usertype_enum" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for activity_log_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."activity_log_id_seq";
CREATE SEQUENCE "public"."activity_log_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for command_log_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."command_log_id_seq";
CREATE SEQUENCE "public"."command_log_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for device_alert_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."device_alert_id_seq";
CREATE SEQUENCE "public"."device_alert_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for device_config_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."device_config_id_seq";
CREATE SEQUENCE "public"."device_config_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for device_status_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."device_status_id_seq";
CREATE SEQUENCE "public"."device_status_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for iot_data_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."iot_data_id_seq";
CREATE SEQUENCE "public"."iot_data_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for migrations_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."migrations_id_seq";
CREATE SEQUENCE "public"."migrations_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for noti_notification_logs_log_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."noti_notification_logs_log_id_seq";
CREATE SEQUENCE "public"."noti_notification_logs_log_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for noti_notification_rules_rule_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."noti_notification_rules_rule_id_seq";
CREATE SEQUENCE "public"."noti_notification_rules_rule_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for noti_notification_types_type_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."noti_notification_types_type_id_seq";
CREATE SEQUENCE "public"."noti_notification_types_type_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for notification_devices_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."notification_devices_id_seq";
CREATE SEQUENCE "public"."notification_devices_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for notification_groups_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."notification_groups_id_seq";
CREATE SEQUENCE "public"."notification_groups_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for notification_logs_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."notification_logs_id_seq";
CREATE SEQUENCE "public"."notification_logs_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for notification_types_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."notification_types_id_seq";
CREATE SEQUENCE "public"."notification_types_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_activity_log_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_activity_log_id_seq";
CREATE SEQUENCE "public"."sd_activity_log_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_activity_type_log_typeId_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_activity_type_log_typeId_seq";
CREATE SEQUENCE "public"."sd_activity_type_log_typeId_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_admin_access_menu_admin_access_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_admin_access_menu_admin_access_id_seq";
CREATE SEQUENCE "public"."sd_admin_access_menu_admin_access_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_admin_access_menu_admin_access_id_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_admin_access_menu_admin_access_id_seq1";
CREATE SEQUENCE "public"."sd_admin_access_menu_admin_access_id_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_admin_access_menu_admin_access_id_seq2
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_admin_access_menu_admin_access_id_seq2";
CREATE SEQUENCE "public"."sd_admin_access_menu_admin_access_id_seq2" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_air_control_air_control_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_air_control_air_control_id_seq";
CREATE SEQUENCE "public"."sd_air_control_air_control_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_air_mod_air_mod_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_air_mod_air_mod_id_seq";
CREATE SEQUENCE "public"."sd_air_mod_air_mod_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_air_period_air_period_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_air_period_air_period_id_seq";
CREATE SEQUENCE "public"."sd_air_period_air_period_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_air_setting_warning_air_setting_warning_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_air_setting_warning_air_setting_warning_id_seq";
CREATE SEQUENCE "public"."sd_air_setting_warning_air_setting_warning_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_air_warning_air_warning_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_air_warning_air_warning_id_seq";
CREATE SEQUENCE "public"."sd_air_warning_air_warning_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_api_key_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_api_key_id_seq";
CREATE SEQUENCE "public"."sd_api_key_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_audit_log_audit_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_audit_log_audit_id_seq";
CREATE SEQUENCE "public"."sd_audit_log_audit_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_channel_template_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_channel_template_id_seq";
CREATE SEQUENCE "public"."sd_channel_template_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_dashboard_config_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_dashboard_config_id_seq";
CREATE SEQUENCE "public"."sd_dashboard_config_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_device_category_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_device_category_id_seq";
CREATE SEQUENCE "public"."sd_device_category_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_device_group_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_device_group_id_seq";
CREATE SEQUENCE "public"."sd_device_group_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_device_log_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_device_log_id_seq";
CREATE SEQUENCE "public"."sd_device_log_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_device_log_id_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_device_log_id_seq1";
CREATE SEQUENCE "public"."sd_device_log_id_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_device_member_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_device_member_id_seq";
CREATE SEQUENCE "public"."sd_device_member_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_device_notification_config_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_device_notification_config_id_seq";
CREATE SEQUENCE "public"."sd_device_notification_config_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_device_schedule_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_device_schedule_id_seq";
CREATE SEQUENCE "public"."sd_device_schedule_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_device_status_history_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_device_status_history_id_seq";
CREATE SEQUENCE "public"."sd_device_status_history_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_group_notification_config_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_group_notification_config_id_seq";
CREATE SEQUENCE "public"."sd_group_notification_config_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_api_api_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_api_api_id_seq";
CREATE SEQUENCE "public"."sd_iot_api_api_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_device_action_device_action_user_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_device_action_device_action_user_id_seq";
CREATE SEQUENCE "public"."sd_iot_device_action_device_action_user_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_device_action_log_log_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_device_action_log_log_id_seq";
CREATE SEQUENCE "public"."sd_iot_device_action_log_log_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_device_action_user_device_action_user_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_device_action_user_device_action_user_id_seq";
CREATE SEQUENCE "public"."sd_iot_device_action_user_device_action_user_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_device_alarm_action_alarm_action_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_device_alarm_action_alarm_action_id_seq";
CREATE SEQUENCE "public"."sd_iot_device_alarm_action_alarm_action_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_device_device_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_device_device_id_seq";
CREATE SEQUENCE "public"."sd_iot_device_device_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_device_device_id_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_device_device_id_seq1";
CREATE SEQUENCE "public"."sd_iot_device_device_id_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_device_device_id_seq2
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_device_device_id_seq2";
CREATE SEQUENCE "public"."sd_iot_device_device_id_seq2" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_device_type_type_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_device_type_type_id_seq";
CREATE SEQUENCE "public"."sd_iot_device_type_type_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_email_email_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_email_email_id_seq";
CREATE SEQUENCE "public"."sd_iot_email_email_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_email_email_id_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_email_email_id_seq1";
CREATE SEQUENCE "public"."sd_iot_email_email_id_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_email_host_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_email_host_id_seq";
CREATE SEQUENCE "public"."sd_iot_email_host_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_email_host_id_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_email_host_id_seq1";
CREATE SEQUENCE "public"."sd_iot_email_host_id_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_group_group_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_group_group_id_seq";
CREATE SEQUENCE "public"."sd_iot_group_group_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_group_group_id_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_group_group_id_seq1";
CREATE SEQUENCE "public"."sd_iot_group_group_id_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_influxdb_influxdb_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_influxdb_influxdb_id_seq";
CREATE SEQUENCE "public"."sd_iot_influxdb_influxdb_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_line_line_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_line_line_id_seq";
CREATE SEQUENCE "public"."sd_iot_line_line_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_location_location_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_location_location_id_seq";
CREATE SEQUENCE "public"."sd_iot_location_location_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_location_location_id_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_location_location_id_seq1";
CREATE SEQUENCE "public"."sd_iot_location_location_id_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_mqtt_mqtt_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_mqtt_mqtt_id_seq";
CREATE SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_mqtt_mqtt_id_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_mqtt_mqtt_id_seq1";
CREATE SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_mqtt_mqtt_id_seq10
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_mqtt_mqtt_id_seq10";
CREATE SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq10" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_mqtt_mqtt_id_seq11
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_mqtt_mqtt_id_seq11";
CREATE SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq11" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_mqtt_mqtt_id_seq2
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_mqtt_mqtt_id_seq2";
CREATE SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq2" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_mqtt_mqtt_id_seq3
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_mqtt_mqtt_id_seq3";
CREATE SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq3" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_mqtt_mqtt_id_seq4
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_mqtt_mqtt_id_seq4";
CREATE SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq4" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_mqtt_mqtt_id_seq5
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_mqtt_mqtt_id_seq5";
CREATE SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq5" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_mqtt_mqtt_id_seq6
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_mqtt_mqtt_id_seq6";
CREATE SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq6" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_mqtt_mqtt_id_seq7
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_mqtt_mqtt_id_seq7";
CREATE SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq7" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_mqtt_mqtt_id_seq8
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_mqtt_mqtt_id_seq8";
CREATE SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq8" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_mqtt_mqtt_id_seq9
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_mqtt_mqtt_id_seq9";
CREATE SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq9" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_nodered_nodered_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_nodered_nodered_id_seq";
CREATE SEQUENCE "public"."sd_iot_nodered_nodered_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_schedule_schedule_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_schedule_schedule_id_seq";
CREATE SEQUENCE "public"."sd_iot_schedule_schedule_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_sensor_sensor_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_sensor_sensor_id_seq";
CREATE SEQUENCE "public"."sd_iot_sensor_sensor_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_sensor_sensor_id_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_sensor_sensor_id_seq1";
CREATE SEQUENCE "public"."sd_iot_sensor_sensor_id_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_setting_setting_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_setting_setting_id_seq";
CREATE SEQUENCE "public"."sd_iot_setting_setting_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_setting_setting_id_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_setting_setting_id_seq1";
CREATE SEQUENCE "public"."sd_iot_setting_setting_id_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_sms_sms_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_sms_sms_id_seq";
CREATE SEQUENCE "public"."sd_iot_sms_sms_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_telegram_telegram_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_telegram_telegram_id_seq";
CREATE SEQUENCE "public"."sd_iot_telegram_telegram_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_token_token_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_token_token_id_seq";
CREATE SEQUENCE "public"."sd_iot_token_token_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_type_type_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_type_type_id_seq";
CREATE SEQUENCE "public"."sd_iot_type_type_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_iot_type_type_id_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_iot_type_type_id_seq1";
CREATE SEQUENCE "public"."sd_iot_type_type_id_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_module_log_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_module_log_id_seq";
CREATE SEQUENCE "public"."sd_module_log_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_notification_channel_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_notification_channel_id_seq";
CREATE SEQUENCE "public"."sd_notification_channel_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_notification_condition_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_notification_condition_id_seq";
CREATE SEQUENCE "public"."sd_notification_condition_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_notification_log_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_notification_log_id_seq";
CREATE SEQUENCE "public"."sd_notification_log_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_notification_type_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_notification_type_id_seq";
CREATE SEQUENCE "public"."sd_notification_type_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_report_data_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_report_data_id_seq";
CREATE SEQUENCE "public"."sd_report_data_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_sensor_data_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_sensor_data_id_seq";
CREATE SEQUENCE "public"."sd_sensor_data_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_system_setting_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_system_setting_id_seq";
CREATE SEQUENCE "public"."sd_system_setting_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_user_access_menu_user_access_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_user_access_menu_user_access_id_seq";
CREATE SEQUENCE "public"."sd_user_access_menu_user_access_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_user_file_file_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_user_file_file_id_seq";
CREATE SEQUENCE "public"."sd_user_file_file_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_user_file_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_user_file_id_seq";
CREATE SEQUENCE "public"."sd_user_file_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_user_file_id_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_user_file_id_seq1";
CREATE SEQUENCE "public"."sd_user_file_id_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_user_log_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_user_log_id_seq";
CREATE SEQUENCE "public"."sd_user_log_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_user_log_type_log_type_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_user_log_type_log_type_id_seq";
CREATE SEQUENCE "public"."sd_user_log_type_log_type_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for sd_user_role_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sd_user_role_id_seq";
CREATE SEQUENCE "public"."sd_user_role_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Table structure for activity_log
-- ----------------------------
DROP TABLE IF EXISTS "public"."activity_log";
CREATE TABLE "public"."activity_log" (
  "id" int4 NOT NULL DEFAULT nextval('activity_log_id_seq'::regclass),
  "type" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "deviceId" varchar(50) COLLATE "pg_catalog"."default",
  "userId" varchar(100) COLLATE "pg_catalog"."default",
  "details" varchar(500) COLLATE "pg_catalog"."default" NOT NULL,
  "data" jsonb,
  "severity" varchar(20) COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'info'::character varying,
  "ipAddress" varchar(45) COLLATE "pg_catalog"."default",
  "userAgent" varchar(500) COLLATE "pg_catalog"."default",
  "sessionId" varchar(100) COLLATE "pg_catalog"."default",
  "correlationId" varchar(100) COLLATE "pg_catalog"."default",
  "timestamp" timestamptz(6) NOT NULL,
  "createdAt" timestamp(6) NOT NULL DEFAULT now(),
  "stackTrace" text COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Table structure for command_log
-- ----------------------------
DROP TABLE IF EXISTS "public"."command_log";
CREATE TABLE "public"."command_log" (
  "id" int4 NOT NULL DEFAULT nextval('command_log_id_seq'::regclass),
  "deviceId" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "action" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "parameters" jsonb,
  "metadata" jsonb,
  "status" varchar(50) COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'pending'::character varying,
  "issuedBy" varchar(100) COLLATE "pg_catalog"."default",
  "clientIp" varchar(45) COLLATE "pg_catalog"."default",
  "response" jsonb,
  "error" varchar(500) COLLATE "pg_catalog"."default",
  "issuedAt" timestamptz(6) NOT NULL,
  "sentAt" timestamptz(6),
  "executedAt" timestamptz(6),
  "failedAt" timestamptz(6),
  "createdAt" timestamp(6) NOT NULL DEFAULT now(),
  "updatedAt" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for device_alert
-- ----------------------------
DROP TABLE IF EXISTS "public"."device_alert";
CREATE TABLE "public"."device_alert" (
  "id" int4 NOT NULL DEFAULT nextval('device_alert_id_seq'::regclass),
  "deviceId" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "type" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "metric" varchar(100) COLLATE "pg_catalog"."default",
  "value" float8,
  "threshold" jsonb,
  "severity" varchar(20) COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'low'::character varying,
  "message" varchar(500) COLLATE "pg_catalog"."default" NOT NULL,
  "details" jsonb,
  "resolved" bool NOT NULL DEFAULT false,
  "resolutionNotes" text COLLATE "pg_catalog"."default",
  "resolvedBy" varchar(100) COLLATE "pg_catalog"."default",
  "resolvedAt" timestamptz(6),
  "acknowledged" bool NOT NULL DEFAULT false,
  "acknowledgedBy" varchar(100) COLLATE "pg_catalog"."default",
  "acknowledgedAt" timestamptz(6),
  "escalation" jsonb,
  "dataId" int4,
  "createdAt" timestamp(6) NOT NULL DEFAULT now(),
  "updatedAt" timestamp(6) NOT NULL DEFAULT now(),
  "expiresAt" timestamptz(6),
  "notificationCount" int4 NOT NULL DEFAULT 0
)
;

-- ----------------------------
-- Table structure for device_config
-- ----------------------------
DROP TABLE IF EXISTS "public"."device_config";
CREATE TABLE "public"."device_config" (
  "id" int4 NOT NULL DEFAULT nextval('device_config_id_seq'::regclass),
  "deviceId" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "config" jsonb,
  "status" varchar(20) COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'active'::character varying,
  "notes" text COLLATE "pg_catalog"."default",
  "updatedBy" varchar(100) COLLATE "pg_catalog"."default",
  "createdAt" timestamp(6) NOT NULL DEFAULT now(),
  "updatedAt" timestamp(6) NOT NULL DEFAULT now(),
  "lastAppliedAt" timestamptz(6)
)
;

-- ----------------------------
-- Table structure for device_status
-- ----------------------------
DROP TABLE IF EXISTS "public"."device_status";
CREATE TABLE "public"."device_status" (
  "id" int4 NOT NULL DEFAULT nextval('device_status_id_seq'::regclass),
  "deviceId" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "isOnline" bool NOT NULL DEFAULT true,
  "isActive" bool NOT NULL DEFAULT true,
  "lastSeen" timestamptz(6) NOT NULL,
  "lastData" jsonb,
  "batteryLevel" int4,
  "signalStrength" int4,
  "temperature" float8,
  "humidity" float8,
  "firmwareVersion" varchar(20) COLLATE "pg_catalog"."default",
  "uptime" int4,
  "location" jsonb,
  "networkInfo" jsonb,
  "hardwareInfo" jsonb,
  "metrics" jsonb,
  "statusMessage" text COLLATE "pg_catalog"."default",
  "customFields" jsonb,
  "createdAt" timestamp(6) NOT NULL DEFAULT now(),
  "updatedAt" timestamp(6) NOT NULL DEFAULT now(),
  "firstSeen" timestamptz(6),
  "lastMaintenance" timestamptz(6),
  "connectionCount" int4 NOT NULL DEFAULT 0
)
;

-- ----------------------------
-- Table structure for iot_data
-- ----------------------------
DROP TABLE IF EXISTS "public"."iot_data";
CREATE TABLE "public"."iot_data" (
  "id" int4 NOT NULL DEFAULT nextval('iot_data_id_seq'::regclass),
  "data" jsonb NOT NULL,
  "createdAt" timestamp(6) NOT NULL DEFAULT now(),
  "location" jsonb,
  "metadata" jsonb,
  "dataType" varchar(20) COLLATE "pg_catalog"."default",
  "dataQuality" float8,
  "deviceId" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "timestamp" timestamptz(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS "public"."migrations";
CREATE TABLE "public"."migrations" (
  "id" int4 NOT NULL DEFAULT nextval('migrations_id_seq'::regclass),
  "timestamp" int8 NOT NULL,
  "name" varchar COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Table structure for noti_notification_logs
-- ----------------------------
DROP TABLE IF EXISTS "public"."noti_notification_logs";
CREATE TABLE "public"."noti_notification_logs" (
  "log_id" int4 NOT NULL DEFAULT nextval('noti_notification_logs_log_id_seq'::regclass),
  "notification_id" uuid NOT NULL,
  "channel" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "payload" jsonb NOT NULL,
  "response" jsonb,
  "status" varchar(50) COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'pending'::character varying,
  "retry_count" int4 DEFAULT 0,
  "error_message" text COLLATE "pg_catalog"."default",
  "created_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "sent_at" timestamp(6),
  "delivered_at" timestamp(6)
)
;

-- ----------------------------
-- Table structure for noti_notification_rules
-- ----------------------------
DROP TABLE IF EXISTS "public"."noti_notification_rules";
CREATE TABLE "public"."noti_notification_rules" (
  "rule_id" int4 NOT NULL DEFAULT nextval('noti_notification_rules_rule_id_seq'::regclass),
  "name" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "description" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "event_trigger" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "conditions" jsonb NOT NULL,
  "actions" jsonb NOT NULL,
  "is_active" bool NOT NULL DEFAULT true,
  "priority" int4 NOT NULL DEFAULT 1,
  "created_at" timestamp(6) NOT NULL DEFAULT now(),
  "updated_at" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for noti_notification_types
-- ----------------------------
DROP TABLE IF EXISTS "public"."noti_notification_types";
CREATE TABLE "public"."noti_notification_types" (
  "type_id" int4 NOT NULL DEFAULT nextval('noti_notification_types_type_id_seq'::regclass),
  "name" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "description" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "default_template" jsonb,
  "allowed_channels" jsonb,
  "status" int4 NOT NULL DEFAULT 1,
  "created_at" timestamp(6) NOT NULL DEFAULT now(),
  "updated_at" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for noti_notifications
-- ----------------------------
DROP TABLE IF EXISTS "public"."noti_notifications";
CREATE TABLE "public"."noti_notifications" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "title" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "message" text COLLATE "pg_catalog"."default" NOT NULL,
  "type" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "priority" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "category" varchar(255) COLLATE "pg_catalog"."default",
  "user_id" int4,
  "user_uuid" uuid,
  "metadata" jsonb,
  "is_read" bool NOT NULL DEFAULT false,
  "read_at" timestamp(6),
  "is_sent" bool NOT NULL DEFAULT false,
  "channels_sent" jsonb,
  "scheduled_at" timestamp(6),
  "expires_at" timestamp(6),
  "status" int4 NOT NULL DEFAULT 1,
  "created_at" timestamp(6) NOT NULL DEFAULT now(),
  "updated_at" timestamp(6) NOT NULL DEFAULT now(),
  "deleted_at" timestamp(6)
)
;

-- ----------------------------
-- Table structure for notification_devices
-- ----------------------------
DROP TABLE IF EXISTS "public"."notification_devices";
CREATE TABLE "public"."notification_devices" (
  "id" int4 NOT NULL DEFAULT nextval('notification_devices_id_seq'::regclass),
  "device_id" int4 NOT NULL,
  "device_name" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "device_type" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "mqtt_topic" varchar COLLATE "pg_catalog"."default",
  "mqtt_on" varchar COLLATE "pg_catalog"."default",
  "mqtt_off" varchar COLLATE "pg_catalog"."default",
  "location" varchar COLLATE "pg_catalog"."default",
  "unit" varchar COLLATE "pg_catalog"."default",
  "last_value" varchar COLLATE "pg_catalog"."default",
  "last_status" int4,
  "last_updated" timestamp(6),
  "is_online" bool NOT NULL DEFAULT false,
  "is_active" bool NOT NULL DEFAULT true,
  "created_at" timestamp(6) NOT NULL DEFAULT now(),
  "updated_at" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for notification_groups
-- ----------------------------
DROP TABLE IF EXISTS "public"."notification_groups";
CREATE TABLE "public"."notification_groups" (
  "id" int4 NOT NULL DEFAULT nextval('notification_groups_id_seq'::regclass),
  "name" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "device_ids" json,
  "isActive" bool NOT NULL DEFAULT true,
  "createdAt" timestamp(6) NOT NULL DEFAULT now(),
  "updatedAt" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for notification_groups_devices_notification_devices
-- ----------------------------
DROP TABLE IF EXISTS "public"."notification_groups_devices_notification_devices";
CREATE TABLE "public"."notification_groups_devices_notification_devices" (
  "notificationGroupsId" int4 NOT NULL,
  "notificationDevicesId" int4 NOT NULL
)
;

-- ----------------------------
-- Table structure for notification_logs
-- ----------------------------
DROP TABLE IF EXISTS "public"."notification_logs";
CREATE TABLE "public"."notification_logs" (
  "id" int4 NOT NULL DEFAULT nextval('notification_logs_id_seq'::regclass),
  "device_id" int4 NOT NULL,
  "device_name" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "device_type" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "value_data" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "numeric_value" float8,
  "notification_type_id" int4 NOT NULL,
  "status" int4 NOT NULL,
  "title" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "message" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "channels_sent" jsonb NOT NULL,
  "control_action" jsonb,
  "redis_key" varchar COLLATE "pg_catalog"."default",
  "created_at" timestamp(6) NOT NULL DEFAULT now(),
  "updated_at" timestamp(6) NOT NULL DEFAULT now(),
  "config_id" int4
)
;

-- ----------------------------
-- Table structure for notification_types
-- ----------------------------
DROP TABLE IF EXISTS "public"."notification_types";
CREATE TABLE "public"."notification_types" (
  "id" int4 NOT NULL DEFAULT nextval('notification_types_id_seq'::regclass),
  "name" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "code" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "description" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "icon" varchar COLLATE "pg_catalog"."default",
  "color" varchar COLLATE "pg_catalog"."default",
  "repeat_cooldown" int4 NOT NULL DEFAULT 10,
  "should_notify" bool NOT NULL DEFAULT true
)
;

-- ----------------------------
-- Table structure for sd_activity_log
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_activity_log";
CREATE TABLE "public"."sd_activity_log" (
  "id" int4 NOT NULL DEFAULT nextval('sd_activity_log_id_seq'::regclass),
  "user_id" varchar(255) COLLATE "pg_catalog"."default",
  "type_id" int4,
  "modules_id" int4,
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "event" text COLLATE "pg_catalog"."default",
  "detail" text COLLATE "pg_catalog"."default",
  "location" text COLLATE "pg_catalog"."default",
  "date" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_activity_type_log
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_activity_type_log";
CREATE TABLE "public"."sd_activity_type_log" (
  "typeId" int4 NOT NULL DEFAULT nextval('"sd_activity_type_log_typeId_seq"'::regclass),
  "type_name" varchar(50) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Table structure for sd_admin_access_menu
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_admin_access_menu";
CREATE TABLE "public"."sd_admin_access_menu" (
  "admin_access_id" int4 NOT NULL DEFAULT nextval('sd_admin_access_menu_admin_access_id_seq'::regclass),
  "admin_type_id" int4,
  "admin_menu_id" int4
)
;

-- ----------------------------
-- Table structure for sd_air_control
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_air_control";
CREATE TABLE "public"."sd_air_control" (
  "air_control_id" int4 NOT NULL DEFAULT nextval('sd_air_control_air_control_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "data" varchar(255) COLLATE "pg_catalog"."default",
  "status" varchar(150) COLLATE "pg_catalog"."default",
  "active" int4,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_air_control_device_map
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_air_control_device_map";
CREATE TABLE "public"."sd_air_control_device_map" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "air_control_id" int4,
  "device_id" int4
)
;

-- ----------------------------
-- Table structure for sd_air_control_log
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_air_control_log";
CREATE TABLE "public"."sd_air_control_log" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "alarm_action_id" int4,
  "air_control_id" int4,
  "device_id" int4,
  "type_id" int4,
  "temperature" varchar(255) COLLATE "pg_catalog"."default",
  "warning" varchar(255) COLLATE "pg_catalog"."default",
  "recovery" varchar(150) COLLATE "pg_catalog"."default",
  "period" varchar(150) COLLATE "pg_catalog"."default",
  "percent" varchar(150) COLLATE "pg_catalog"."default",
  "firealarm" varchar(150) COLLATE "pg_catalog"."default",
  "humidityalarm" varchar(150) COLLATE "pg_catalog"."default",
  "air2_alarm" varchar(150) COLLATE "pg_catalog"."default",
  "air1_alarm" varchar(150) COLLATE "pg_catalog"."default",
  "temperaturealarm" varchar(150) COLLATE "pg_catalog"."default",
  "mode" varchar(150) COLLATE "pg_catalog"."default",
  "state_air1" varchar(150) COLLATE "pg_catalog"."default",
  "state_air2" varchar(150) COLLATE "pg_catalog"."default",
  "temperaturealarmoff" varchar(150) COLLATE "pg_catalog"."default",
  "ups_alarm" varchar(150) COLLATE "pg_catalog"."default",
  "ups2_alarm" varchar(150) COLLATE "pg_catalog"."default",
  "hssdalarm" varchar(150) COLLATE "pg_catalog"."default",
  "waterleakalarm" varchar(150) COLLATE "pg_catalog"."default",
  "date" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "time" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "data" varchar(255) COLLATE "pg_catalog"."default",
  "status" varchar(150) COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_air_mod
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_air_mod";
CREATE TABLE "public"."sd_air_mod" (
  "air_mod_id" int4 NOT NULL DEFAULT nextval('sd_air_mod_air_mod_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "data" varchar(255) COLLATE "pg_catalog"."default",
  "status" varchar(150) COLLATE "pg_catalog"."default",
  "active" int4,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_air_mod_device_map
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_air_mod_device_map";
CREATE TABLE "public"."sd_air_mod_device_map" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "air_mod_id" int4,
  "air_control_id" int4,
  "device_id" int4
)
;

-- ----------------------------
-- Table structure for sd_air_period
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_air_period";
CREATE TABLE "public"."sd_air_period" (
  "air_period_id" int4 NOT NULL DEFAULT nextval('sd_air_period_air_period_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "data" varchar(255) COLLATE "pg_catalog"."default",
  "status" varchar(150) COLLATE "pg_catalog"."default",
  "active" int4,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_air_period_device_map
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_air_period_device_map";
CREATE TABLE "public"."sd_air_period_device_map" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "air_period_id" int4,
  "air_control_id" int4,
  "device_id" int4
)
;

-- ----------------------------
-- Table structure for sd_air_setting_warning
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_air_setting_warning";
CREATE TABLE "public"."sd_air_setting_warning" (
  "air_setting_warning_id" int4 NOT NULL DEFAULT nextval('sd_air_setting_warning_air_setting_warning_id_seq'::regclass),
  "type_id" int4,
  "device_id" int4,
  "period_id" int4,
  "event_name" varchar(255) COLLATE "pg_catalog"."default",
  "date" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "time" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "data" varchar(255) COLLATE "pg_catalog"."default",
  "status" varchar(150) COLLATE "pg_catalog"."default",
  "active" int4,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_air_setting_warning_device_map
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_air_setting_warning_device_map";
CREATE TABLE "public"."sd_air_setting_warning_device_map" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "air_setting_warning_id" int4,
  "air_control_id" int4,
  "device_id" int4
)
;

-- ----------------------------
-- Table structure for sd_air_warning
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_air_warning";
CREATE TABLE "public"."sd_air_warning" (
  "air_warning_id" int4 NOT NULL DEFAULT nextval('sd_air_warning_air_warning_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "data" varchar(255) COLLATE "pg_catalog"."default",
  "status" varchar(150) COLLATE "pg_catalog"."default",
  "active" int4,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_air_warning_device_map
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_air_warning_device_map";
CREATE TABLE "public"."sd_air_warning_device_map" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "air_warning_id" int4,
  "air_control_id" int4,
  "device_id" int4
)
;

-- ----------------------------
-- Table structure for sd_alarm_process_log
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_alarm_process_log";
CREATE TABLE "public"."sd_alarm_process_log" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "alarm_action_id" int4,
  "device_id" int4,
  "type_id" int4,
  "event" varchar(255) COLLATE "pg_catalog"."default",
  "alarm_type" varchar(255) COLLATE "pg_catalog"."default",
  "status_warning" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_warning" varchar(150) COLLATE "pg_catalog"."default",
  "status_alert" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_alert" varchar(150) COLLATE "pg_catalog"."default",
  "email_alarm" int4,
  "line_alarm" int4,
  "telegram_alarm" int4,
  "sms_alarm" int4,
  "nonc_alarm" int4,
  "status" varchar(150) COLLATE "pg_catalog"."default",
  "date" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "time" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "data" varchar(255) COLLATE "pg_catalog"."default",
  "data_alarm" varchar(255) COLLATE "pg_catalog"."default",
  "alarm_status" varchar(255) COLLATE "pg_catalog"."default",
  "subject" varchar(255) COLLATE "pg_catalog"."default",
  "content" varchar(255) COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_alarm_process_log_email
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_alarm_process_log_email";
CREATE TABLE "public"."sd_alarm_process_log_email" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "alarm_action_id" int4,
  "device_id" int4,
  "type_id" int4,
  "event" varchar(255) COLLATE "pg_catalog"."default",
  "alarm_type" varchar(255) COLLATE "pg_catalog"."default",
  "status_warning" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_warning" varchar(150) COLLATE "pg_catalog"."default",
  "status_alert" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_alert" varchar(150) COLLATE "pg_catalog"."default",
  "email_alarm" int4,
  "line_alarm" int4,
  "telegram_alarm" int4,
  "sms_alarm" int4,
  "nonc_alarm" int4,
  "status" varchar(150) COLLATE "pg_catalog"."default",
  "date" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "time" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "data" varchar(255) COLLATE "pg_catalog"."default",
  "data_alarm" varchar(255) COLLATE "pg_catalog"."default",
  "alarm_status" varchar(255) COLLATE "pg_catalog"."default",
  "subject" varchar(255) COLLATE "pg_catalog"."default",
  "content" varchar(255) COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_alarm_process_log_line
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_alarm_process_log_line";
CREATE TABLE "public"."sd_alarm_process_log_line" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "alarm_action_id" int4,
  "device_id" int4,
  "type_id" int4,
  "event" varchar(255) COLLATE "pg_catalog"."default",
  "alarm_type" varchar(255) COLLATE "pg_catalog"."default",
  "status_warning" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_warning" varchar(150) COLLATE "pg_catalog"."default",
  "status_alert" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_alert" varchar(150) COLLATE "pg_catalog"."default",
  "email_alarm" int4,
  "line_alarm" int4,
  "telegram_alarm" int4,
  "sms_alarm" int4,
  "nonc_alarm" int4,
  "status" varchar(150) COLLATE "pg_catalog"."default",
  "date" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "time" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "data" varchar(255) COLLATE "pg_catalog"."default",
  "data_alarm" varchar(255) COLLATE "pg_catalog"."default",
  "alarm_status" varchar(255) COLLATE "pg_catalog"."default",
  "subject" varchar(255) COLLATE "pg_catalog"."default",
  "content" varchar(255) COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_alarm_process_log_mqtt
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_alarm_process_log_mqtt";
CREATE TABLE "public"."sd_alarm_process_log_mqtt" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "alarm_action_id" int4,
  "device_id" int4,
  "type_id" int4,
  "event" varchar(255) COLLATE "pg_catalog"."default",
  "alarm_type" varchar(255) COLLATE "pg_catalog"."default",
  "status_warning" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_warning" varchar(150) COLLATE "pg_catalog"."default",
  "status_alert" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_alert" varchar(150) COLLATE "pg_catalog"."default",
  "email_alarm" int4,
  "line_alarm" int4,
  "telegram_alarm" int4,
  "sms_alarm" int4,
  "nonc_alarm" int4,
  "status" varchar(150) COLLATE "pg_catalog"."default",
  "date" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "time" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "data" varchar(255) COLLATE "pg_catalog"."default",
  "data_alarm" varchar(255) COLLATE "pg_catalog"."default",
  "alarm_status" varchar(255) COLLATE "pg_catalog"."default",
  "subject" varchar(255) COLLATE "pg_catalog"."default",
  "content" varchar(255) COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_alarm_process_log_sms
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_alarm_process_log_sms";
CREATE TABLE "public"."sd_alarm_process_log_sms" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "alarm_action_id" int4,
  "device_id" int4,
  "type_id" int4,
  "event" varchar(255) COLLATE "pg_catalog"."default",
  "alarm_type" varchar(255) COLLATE "pg_catalog"."default",
  "status_warning" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_warning" varchar(150) COLLATE "pg_catalog"."default",
  "status_alert" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_alert" varchar(150) COLLATE "pg_catalog"."default",
  "email_alarm" int4,
  "line_alarm" int4,
  "telegram_alarm" int4,
  "sms_alarm" int4,
  "nonc_alarm" int4,
  "status" varchar(150) COLLATE "pg_catalog"."default",
  "date" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "time" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "data" varchar(255) COLLATE "pg_catalog"."default",
  "data_alarm" varchar(255) COLLATE "pg_catalog"."default",
  "alarm_status" varchar(255) COLLATE "pg_catalog"."default",
  "subject" varchar(255) COLLATE "pg_catalog"."default",
  "content" varchar(255) COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_alarm_process_log_telegram
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_alarm_process_log_telegram";
CREATE TABLE "public"."sd_alarm_process_log_telegram" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "alarm_action_id" int4,
  "device_id" int4,
  "type_id" int4,
  "event" varchar(255) COLLATE "pg_catalog"."default",
  "alarm_type" varchar(255) COLLATE "pg_catalog"."default",
  "status_warning" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_warning" varchar(150) COLLATE "pg_catalog"."default",
  "status_alert" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_alert" varchar(150) COLLATE "pg_catalog"."default",
  "email_alarm" int4,
  "line_alarm" int4,
  "telegram_alarm" int4,
  "sms_alarm" int4,
  "nonc_alarm" int4,
  "status" varchar(150) COLLATE "pg_catalog"."default",
  "date" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "time" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "data" varchar(255) COLLATE "pg_catalog"."default",
  "data_alarm" varchar(255) COLLATE "pg_catalog"."default",
  "alarm_status" varchar(255) COLLATE "pg_catalog"."default",
  "subject" varchar(255) COLLATE "pg_catalog"."default",
  "content" varchar(255) COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_alarm_process_log_temp
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_alarm_process_log_temp";
CREATE TABLE "public"."sd_alarm_process_log_temp" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "alarm_action_id" int4,
  "device_id" int4,
  "type_id" int4,
  "event" varchar(255) COLLATE "pg_catalog"."default",
  "alarm_type" varchar(255) COLLATE "pg_catalog"."default",
  "status_warning" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_warning" varchar(150) COLLATE "pg_catalog"."default",
  "status_alert" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_alert" varchar(150) COLLATE "pg_catalog"."default",
  "email_alarm" int4,
  "line_alarm" int4,
  "telegram_alarm" int4,
  "sms_alarm" int4,
  "nonc_alarm" int4,
  "status" varchar(150) COLLATE "pg_catalog"."default",
  "date" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "time" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "data" varchar(255) COLLATE "pg_catalog"."default",
  "data_alarm" varchar(255) COLLATE "pg_catalog"."default",
  "alarm_status" varchar(255) COLLATE "pg_catalog"."default",
  "subject" varchar(255) COLLATE "pg_catalog"."default",
  "content" varchar(255) COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_api_key
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_api_key";
CREATE TABLE "public"."sd_api_key" (
  "id" int4 NOT NULL DEFAULT nextval('sd_api_key_id_seq'::regclass),
  "name" varchar(200) COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "api_key" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "api_secret" varchar(128) COLLATE "pg_catalog"."default" NOT NULL,
  "user_id" varchar COLLATE "pg_catalog"."default",
  "permissions" jsonb,
  "expires_at" timestamp(6),
  "last_used_at" timestamp(6),
  "usage_count" int4 NOT NULL DEFAULT 0,
  "is_active" bool NOT NULL DEFAULT true,
  "ip_whitelist" jsonb,
  "created_at" timestamp(6) NOT NULL DEFAULT now(),
  "updated_at" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_audit_log
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_audit_log";
CREATE TABLE "public"."sd_audit_log" (
  "audit_id" int4 NOT NULL DEFAULT nextval('sd_audit_log_audit_id_seq'::regclass),
  "user_id" varchar COLLATE "pg_catalog"."default",
  "user_name" varchar(200) COLLATE "pg_catalog"."default",
  "action" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "entity_type" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "entity_id" int4 NOT NULL,
  "before" jsonb,
  "after" jsonb,
  "changes" jsonb,
  "ip_address" varchar(45) COLLATE "pg_catalog"."default",
  "user_agent" text COLLATE "pg_catalog"."default",
  "action_time" timestamp(6) NOT NULL DEFAULT now(),
  "description" text COLLATE "pg_catalog"."default",
  "created_at" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_channel_template
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_channel_template";
CREATE TABLE "public"."sd_channel_template" (
  "id" int4 NOT NULL DEFAULT nextval('sd_channel_template_id_seq'::regclass),
  "name" varchar(200) COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "channel_id" int4 NOT NULL,
  "notification_type_id" int4 NOT NULL,
  "template" text COLLATE "pg_catalog"."default" NOT NULL,
  "variables" jsonb,
  "is_active" bool NOT NULL DEFAULT true,
  "is_default" bool NOT NULL DEFAULT false,
  "created_at" timestamp(6) NOT NULL DEFAULT now(),
  "updated_at" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_dashboard_config
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_dashboard_config";
CREATE TABLE "public"."sd_dashboard_config" (
  "id" int4 NOT NULL DEFAULT nextval('sd_dashboard_config_id_seq'::regclass),
  "location_id" int4 NOT NULL,
  "name" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "config_data" json NOT NULL,
  "status" int4 NOT NULL DEFAULT 1,
  "created_date" timestamp(6) NOT NULL DEFAULT now(),
  "updated_date" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_device_category
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_device_category";
CREATE TABLE "public"."sd_device_category" (
  "id" int4 NOT NULL DEFAULT nextval('sd_device_category_id_seq'::regclass),
  "name" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "icon" varchar(100) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_device_group
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_device_group";
CREATE TABLE "public"."sd_device_group" (
  "id" int4 NOT NULL DEFAULT nextval('sd_device_group_id_seq'::regclass),
  "name" varchar(200) COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "group_type" varchar(50) COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'custom'::character varying,
  "is_active" bool NOT NULL DEFAULT true,
  "config" jsonb,
  "created_at" timestamp(6) NOT NULL DEFAULT now(),
  "updated_at" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_device_log
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_device_log";
CREATE TABLE "public"."sd_device_log" (
  "id" int4 NOT NULL DEFAULT nextval('sd_device_log_id_seq'::regclass),
  "type_id" int4 NOT NULL,
  "sensor_id" int4 NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "data" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "status" int4,
  "lang" varchar(50) COLLATE "pg_catalog"."default",
  "create" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_device_member
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_device_member";
CREATE TABLE "public"."sd_device_member" (
  "id" int4 NOT NULL DEFAULT nextval('sd_device_member_id_seq'::regclass),
  "Device_id" int4 NOT NULL,
  "group_id" int4 NOT NULL,
  "role" varchar(50) COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'member'::character varying,
  "priority" int4 NOT NULL DEFAULT 1,
  "is_active" bool NOT NULL DEFAULT true,
  "created_at" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_device_notification_config
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_device_notification_config";
CREATE TABLE "public"."sd_device_notification_config" (
  "id" int4 NOT NULL DEFAULT nextval('sd_device_notification_config_id_seq'::regclass),
  "device_id" int4 NOT NULL,
  "notification_channel_id" int4 NOT NULL,
  "notification_type_id" int4 NOT NULL,
  "config" jsonb,
  "is_active" bool NOT NULL DEFAULT true,
  "retry_count" int4 NOT NULL DEFAULT 3,
  "retry_delay_minutes" int4 NOT NULL DEFAULT 5,
  "created_at" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_device_schedule
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_device_schedule";
CREATE TABLE "public"."sd_device_schedule" (
  "id" int4 NOT NULL DEFAULT nextval('sd_device_schedule_id_seq'::regclass),
  "device_id" int4 NOT NULL,
  "name" varchar(200) COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "schedule_type" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "schedule_config" jsonb NOT NULL,
  "action" jsonb NOT NULL,
  "is_active" bool NOT NULL DEFAULT true,
  "last_run_at" timestamp(6),
  "next_run_at" timestamp(6),
  "run_count" int4 NOT NULL DEFAULT 0,
  "created_at" timestamp(6) NOT NULL DEFAULT now(),
  "updated_at" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_device_status_history
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_device_status_history";
CREATE TABLE "public"."sd_device_status_history" (
  "id" int4 NOT NULL DEFAULT nextval('sd_device_status_history_id_seq'::regclass),
  "device_id" int4 NOT NULL,
  "status" varchar(50) COLLATE "pg_catalog"."default",
  "value" numeric(10,2),
  "notification_type_id" int4,
  "duration_minutes" int4,
  "previous_status" varchar(50) COLLATE "pg_catalog"."default",
  "previous_value" numeric(10,2),
  "change_reason" text COLLATE "pg_catalog"."default",
  "created_at" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_group_notification_config
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_group_notification_config";
CREATE TABLE "public"."sd_group_notification_config" (
  "id" int4 NOT NULL DEFAULT nextval('sd_group_notification_config_id_seq'::regclass),
  "group_id" int4 NOT NULL,
  "notification_channel_id" int4 NOT NULL,
  "notification_type_id" int4 NOT NULL,
  "config" jsonb,
  "is_active" bool NOT NULL DEFAULT true,
  "escalation_level" int4 NOT NULL DEFAULT 1,
  "escalation_delay_minutes" int4 NOT NULL DEFAULT 30,
  "created_at" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_iot_alarm_device
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_alarm_device";
CREATE TABLE "public"."sd_iot_alarm_device" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "alarm_action_id" int4,
  "device_id" int4
)
;

-- ----------------------------
-- Table structure for sd_iot_alarm_device_event
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_alarm_device_event";
CREATE TABLE "public"."sd_iot_alarm_device_event" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "alarm_action_id" int4,
  "device_id" int4
)
;

-- ----------------------------
-- Table structure for sd_iot_api
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_api";
CREATE TABLE "public"."sd_iot_api" (
  "api_id" int4 NOT NULL DEFAULT nextval('sd_iot_api_api_id_seq'::regclass),
  "api_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "host" int4,
  "port" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "token_value" text COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Table structure for sd_iot_device
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_device";
CREATE TABLE "public"."sd_iot_device" (
  "device_id" int4 NOT NULL DEFAULT nextval('sd_iot_device_device_id_seq'::regclass),
  "setting_id" int4,
  "type_id" int4,
  "location_id" int4,
  "device_name" varchar(255) COLLATE "pg_catalog"."default",
  "sn" varchar(255) COLLATE "pg_catalog"."default",
  "hardware_id" int4,
  "status_warning" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_warning" varchar(150) COLLATE "pg_catalog"."default",
  "status_alert" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_alert" varchar(150) COLLATE "pg_catalog"."default",
  "time_life" int4 DEFAULT 1,
  "period" varchar(150) COLLATE "pg_catalog"."default",
  "work_status" int4 DEFAULT 1,
  "model" varchar(255) COLLATE "pg_catalog"."default",
  "vendor" varchar(255) COLLATE "pg_catalog"."default",
  "comparevalue" varchar(255) COLLATE "pg_catalog"."default",
  "unit" varchar(255) COLLATE "pg_catalog"."default",
  "mqtt_id" int4,
  "oid" varchar(255) COLLATE "pg_catalog"."default",
  "action_id" int4,
  "status_alert_id" int4,
  "mqtt_data_value" varchar(255) COLLATE "pg_catalog"."default",
  "mqtt_data_control" varchar(255) COLLATE "pg_catalog"."default",
  "measurement" varchar(255) COLLATE "pg_catalog"."default",
  "mqtt_control_on" varchar(255) COLLATE "pg_catalog"."default" DEFAULT '1'::character varying,
  "mqtt_control_off" varchar(255) COLLATE "pg_catalog"."default" DEFAULT '0'::character varying,
  "org" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "bucket" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "status" int4,
  "mqtt_device_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "mqtt_status_over_name" text COLLATE "pg_catalog"."default",
  "mqtt_status_data_name" text COLLATE "pg_catalog"."default",
  "mqtt_act_relay_name" text COLLATE "pg_catalog"."default",
  "mqtt_control_relay_name" text COLLATE "pg_catalog"."default",
  "mqtt_config" text COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "max" varchar(255) COLLATE "pg_catalog"."default",
  "min" varchar(255) COLLATE "pg_catalog"."default",
  "layout" int4 DEFAULT 1,
  "alert_set" int4 DEFAULT 1,
  "icon_normal" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-bell-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14.235 19c.865 0 1.322 1.024 .745 1.668a3.992 3.992 0 0 1 -2.98 1.332a3.992 3.992 0 0 1 -2.98 -1.332c-.552 -.616 -.158 -1.579 .634 -1.661l.11 -.006h4.471z" /><path d="M12 2c1.358 0 2.506 .903 2.875 2.141l.046 .171l.008 .043a8.013 8.013 0 0 1 4.024 6.069l.028 .287l.019 .289v2.931l.021 .136a3 3 0 0 0 1.143 1.847l.167 .117l.162 .099c.86 .487 .56 1.766 -.377 1.864l-.116 .006h-16c-1.028 0 -1.387 -1.364 -.493 -1.87a3 3 0 0 0 1.472 -2.063l.021 -.143l.001 -2.97a8 8 0 0 1 3.821 -6.454l.248 -.146l.01 -.043a3.003 3.003 0 0 1 2.562 -2.29l.182 -.017l.176 -.004zm0 6a1 1 0 0 0 -1 1v1h-1l-.117 .007a1 1 0 0 0 .117 1.993h1v1l.007 .117a1 1 0 0 0 1.993 -.117v-1h1l.117 -.007a1 1 0 0 0 -.117 -1.993h-1v-1l-.007 -.117a1 1 0 0 0 -.993 -.883z" /></svg>'::text,
  "icon_warning" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-bell-exclamation"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 17h-11a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6a2 2 0 1 1 4 0a7 7 0 0 1 4 6v1.5" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /><path d="M19 16v3" /><path d="M19 22v.01" /></svg>'::text,
  "icon_alert" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-bell-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 17h-9a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6a2 2 0 1 1 4 0a7 7 0 0 1 4 6v2" /><path d="M9 17v1a3 3 0 0 0 4.194 2.753" /><path d="M22 22l-5 -5" /><path d="M17 22l5 -5" /></svg>'::text,
  "icon" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-temperature"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5" /><path d="M10 9l4 0" /></svg>'::text,
  "color_normal" varchar COLLATE "pg_catalog"."default" NOT NULL DEFAULT '#22C55E'::character varying,
  "color_warning" varchar COLLATE "pg_catalog"."default" NOT NULL DEFAULT '#F59E0B'::character varying,
  "color_alarm" varchar COLLATE "pg_catalog"."default" NOT NULL DEFAULT '#EF4444'::character varying,
  "code" varchar COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'normal'::character varying,
  "menu" int4 DEFAULT 1,
  "icon_on" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT '<svg id="stateair1_8_windmill_icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-sun-high"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path class="windmill-spin" style="margin-left:6px; fill: color-mix(in srgb, transparent, var(--tblr-primary) 100%);" d="M12 19a1 1 0 0 1 1 1v2a1 1 0 0 1 -2 0v-2a1 1 0 0 1 1 -1m-4.95 -2.05a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1 -1.414 -1.414l1.414 -1.414a1 1 0 0 1 1.414 0m11.314 0l1.414 1.414a1 1 0 0 1 -1.414 1.414l-1.414 -1.414a1 1 0 0 1 1.414 -1.414m-5.049 -9.836a5 5 0 1 1 -2.532 9.674a5 5 0 0 1 2.532 -9.674m-9.315 3.886a1 1 0 0 1 0 2h-2a1 1 0 0 1 0 -2zm18 0a1 1 0 0 1 0 2h-2a1 1 0 0 1 0 -2zm-16.364 -6.778l1.414 1.414a1 1 0 0 1 -1.414 1.414l-1.414 -1.414a1 1 0 0 1 1.414 -1.414m14.142 0a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 0 1 -1.414 -1.414l1.414 -1.414a1 1 0 0 1 1.414 0m-7.778 -3.222a1 1 0 0 1 1 1v2a1 1 0 0 1 -2 0v-2a1 1 0 0 1 1 -1"></path></svg>'::text,
  "icon_off" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT '<svg id="stateair1_8_windmill_icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-sun-high"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656z"></path><path d="M6.343 17.657l-1.414 1.414"></path><path d="M6.343 6.343l-1.414 -1.414"></path><path d="M17.657 6.343l1.414 -1.414"></path><path d="M17.657 17.657l1.414 1.414"></path><path d="M4 12h-2"></path><path d="M12 4v-2"></path><path d="M20 12h2"></path><path d="M12 20v2"></path></svg>'::text,
  "calibration_add" varchar(250) COLLATE "pg_catalog"."default" DEFAULT '0'::character varying,
  "calibration_subtract" varchar(250) COLLATE "pg_catalog"."default" DEFAULT '0'::character varying,
  "calibration_type" int4 DEFAULT 3
)
;

-- ----------------------------
-- Table structure for sd_iot_device_action
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_device_action";
CREATE TABLE "public"."sd_iot_device_action" (
  "device_action_user_id" int4 NOT NULL DEFAULT nextval('sd_iot_device_action_device_action_user_id_seq'::regclass),
  "alarm_action_id" int4,
  "device_id" int4
)
;

-- ----------------------------
-- Table structure for sd_iot_device_action_log
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_device_action_log";
CREATE TABLE "public"."sd_iot_device_action_log" (
  "log_id" int4 NOT NULL DEFAULT nextval('sd_iot_device_action_log_log_id_seq'::regclass),
  "alarm_action_id" int4,
  "device_id" int4,
  "uid" varchar(255) COLLATE "pg_catalog"."default",
  "status" int4,
  "createddate" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_iot_device_action_user
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_device_action_user";
CREATE TABLE "public"."sd_iot_device_action_user" (
  "device_action_user_id" int4 NOT NULL DEFAULT nextval('sd_iot_device_action_user_device_action_user_id_seq'::regclass),
  "alarm_action_id" int4,
  "uid" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Table structure for sd_iot_device_alarm_action
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_device_alarm_action";
CREATE TABLE "public"."sd_iot_device_alarm_action" (
  "alarm_action_id" int4 NOT NULL DEFAULT nextval('sd_iot_device_alarm_action_alarm_action_id_seq'::regclass),
  "action_name" varchar(255) COLLATE "pg_catalog"."default",
  "status_warning" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_warning" varchar(150) COLLATE "pg_catalog"."default",
  "status_alert" varchar(150) COLLATE "pg_catalog"."default",
  "recovery_alert" varchar(150) COLLATE "pg_catalog"."default",
  "email_alarm" int4,
  "line_alarm" int4,
  "telegram_alarm" int4,
  "sms_alarm" int4,
  "nonc_alarm" int4,
  "time_life" int4,
  "event" int4,
  "status" int4
)
;

-- ----------------------------
-- Table structure for sd_iot_device_type
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_device_type";
CREATE TABLE "public"."sd_iot_device_type" (
  "type_id" int4 NOT NULL DEFAULT nextval('sd_iot_device_type_type_id_seq'::regclass),
  "type_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Table structure for sd_iot_email
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_email";
CREATE TABLE "public"."sd_iot_email" (
  "email_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "email_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "host" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "port" int4,
  "username" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Table structure for sd_iot_group
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_group";
CREATE TABLE "public"."sd_iot_group" (
  "group_id" int4 NOT NULL DEFAULT nextval('sd_iot_group_group_id_seq'::regclass),
  "group_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Table structure for sd_iot_host
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_host";
CREATE TABLE "public"."sd_iot_host" (
  "host_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "host_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "port" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "username" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4,
  "idhost" int4
)
;

-- ----------------------------
-- Table structure for sd_iot_influxdb
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_influxdb";
CREATE TABLE "public"."sd_iot_influxdb" (
  "influxdb_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "influxdb_name" text COLLATE "pg_catalog"."default",
  "host" text COLLATE "pg_catalog"."default",
  "port" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "username" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "token_value" text COLLATE "pg_catalog"."default",
  "buckets" text COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Table structure for sd_iot_line
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_line";
CREATE TABLE "public"."sd_iot_line" (
  "line_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "line_name" text COLLATE "pg_catalog"."default",
  "client_id" text COLLATE "pg_catalog"."default",
  "client_secret" text COLLATE "pg_catalog"."default",
  "secret_key" text COLLATE "pg_catalog"."default",
  "redirect_uri" text COLLATE "pg_catalog"."default",
  "grant_type" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "code" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "accesstoken" text COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Table structure for sd_iot_location
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_location";
CREATE TABLE "public"."sd_iot_location" (
  "location_id" int4 NOT NULL DEFAULT nextval('sd_iot_location_location_id_seq'::regclass),
  "location_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "ipaddress" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "location_detail" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4,
  "configdata" text COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Table structure for sd_iot_mqtt
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_mqtt";
CREATE TABLE "public"."sd_iot_mqtt" (
  "mqtt_id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "mqtt_type_id" int4,
  "sort" int4 NOT NULL DEFAULT 1,
  "mqtt_name" varchar COLLATE "pg_catalog"."default",
  "host" varchar COLLATE "pg_catalog"."default",
  "port" int4,
  "username" varchar COLLATE "pg_catalog"."default",
  "password" varchar COLLATE "pg_catalog"."default",
  "secret" varchar COLLATE "pg_catalog"."default",
  "expire_in" varchar COLLATE "pg_catalog"."default",
  "token_value" varchar COLLATE "pg_catalog"."default",
  "org" varchar COLLATE "pg_catalog"."default",
  "bucket" varchar COLLATE "pg_catalog"."default",
  "envavorment" varchar COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4 NOT NULL DEFAULT 1,
  "location_id" int4 DEFAULT 1,
  "latitude" varchar(255) COLLATE "pg_catalog"."default",
  "longitude" varchar(255) COLLATE "pg_catalog"."default",
  "mqtt_main_id" int4 NOT NULL DEFAULT 1,
  "configuration" text COLLATE "pg_catalog"."default" DEFAULT '{"0":"temperature1","1":"humidity1"}'::text,
  "zoom" int4 NOT NULL DEFAULT 6
)
;

-- ----------------------------
-- Table structure for sd_iot_nodered
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_nodered";
CREATE TABLE "public"."sd_iot_nodered" (
  "nodered_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "nodered_name" text COLLATE "pg_catalog"."default",
  "host" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "port" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "routing" text COLLATE "pg_catalog"."default",
  "client_id" text COLLATE "pg_catalog"."default",
  "grant_type" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "scope" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "username" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Table structure for sd_iot_schedule
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_schedule";
CREATE TABLE "public"."sd_iot_schedule" (
  "schedule_id" int4 NOT NULL DEFAULT nextval('sd_iot_schedule_schedule_id_seq'::regclass),
  "schedule_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "device_id" int4,
  "start" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "event" int4,
  "sunday" int4,
  "monday" int4,
  "tuesday" int4,
  "wednesday" int4,
  "thursday" int4,
  "friday" int4,
  "saturday" int4,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Table structure for sd_iot_schedule_device
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_schedule_device";
CREATE TABLE "public"."sd_iot_schedule_device" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "schedule_id" int4,
  "device_id" int4
)
;

-- ----------------------------
-- Table structure for sd_iot_sensor
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_sensor";
CREATE TABLE "public"."sd_iot_sensor" (
  "sensor_id" int4 NOT NULL DEFAULT nextval('sd_iot_sensor_sensor_id_seq'::regclass),
  "setting_id" int4,
  "setting_type_id" int4,
  "sensor_name" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "sn" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "max" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "min" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "hardware_id" int4,
  "status_high" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "status_warning" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "status_alert" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "model" varchar(250) COLLATE "pg_catalog"."default" NOT NULL,
  "vendor" varchar(250) COLLATE "pg_catalog"."default" NOT NULL,
  "comparevalue" varchar(250) COLLATE "pg_catalog"."default" NOT NULL,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4,
  "unit" varchar(250) COLLATE "pg_catalog"."default" NOT NULL,
  "mqtt_id" int4,
  "oid" varchar(250) COLLATE "pg_catalog"."default" NOT NULL,
  "action_id" int4,
  "status_alert_id" int4,
  "mqtt_data_value" varchar(250) COLLATE "pg_catalog"."default" NOT NULL,
  "mqtt_data_control" varchar(250) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Table structure for sd_iot_setting
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_setting";
CREATE TABLE "public"."sd_iot_setting" (
  "setting_id" int4 NOT NULL DEFAULT nextval('sd_iot_setting_setting_id_seq'::regclass),
  "location_id" int4,
  "setting_type_id" int4,
  "setting_name" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "sn" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Table structure for sd_iot_sms
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_sms";
CREATE TABLE "public"."sd_iot_sms" (
  "sms_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "sms_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "host" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "port" int4,
  "username" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "apikey" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "originator" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Table structure for sd_iot_telegram
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_telegram";
CREATE TABLE "public"."sd_iot_telegram" (
  "telegram_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "telegram_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "port" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "username" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Table structure for sd_iot_token
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_token";
CREATE TABLE "public"."sd_iot_token" (
  "token_id" int4 NOT NULL DEFAULT nextval('sd_iot_token_token_id_seq'::regclass),
  "token_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "host" int4,
  "port" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "token_value" text COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Table structure for sd_iot_type
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_iot_type";
CREATE TABLE "public"."sd_iot_type" (
  "type_id" int4 NOT NULL DEFAULT nextval('sd_iot_type_type_id_seq'::regclass),
  "type_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "group_id" int4,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4
)
;

-- ----------------------------
-- Table structure for sd_module_log
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_module_log";
CREATE TABLE "public"."sd_module_log" (
  "id" int4 NOT NULL DEFAULT nextval('sd_module_log_id_seq'::regclass),
  "module_name" varchar(50) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Table structure for sd_mqtt_host
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_mqtt_host";
CREATE TABLE "public"."sd_mqtt_host" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "hostname" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "host" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "port" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "username" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int4,
  "idhost" int4
)
;

-- ----------------------------
-- Table structure for sd_mqtt_log
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_mqtt_log";
CREATE TABLE "public"."sd_mqtt_log" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "statusmqtt" varchar(255) COLLATE "pg_catalog"."default",
  "msg" varchar(255) COLLATE "pg_catalog"."default",
  "type_id" int4,
  "date" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "time" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "data" varchar(255) COLLATE "pg_catalog"."default",
  "status" varchar(150) COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "Device_id" int4,
  "Device_name" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Table structure for sd_notification_channel
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_notification_channel";
CREATE TABLE "public"."sd_notification_channel" (
  "id" int4 NOT NULL DEFAULT nextval('sd_notification_channel_id_seq'::regclass),
  "name" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "icon" varchar(100) COLLATE "pg_catalog"."default",
  "handler_class" varchar(200) COLLATE "pg_catalog"."default",
  "is_active" bool NOT NULL DEFAULT true,
  "created_at" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_notification_condition
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_notification_condition";
CREATE TABLE "public"."sd_notification_condition" (
  "id" int4 NOT NULL DEFAULT nextval('sd_notification_condition_id_seq'::regclass),
  "device_id" int4 NOT NULL,
  "notification_type_id" int4 NOT NULL,
  "condition_operator" varchar(10) COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'between'::character varying,
  "priority" int4 NOT NULL DEFAULT 1,
  "is_active" bool NOT NULL DEFAULT true,
  "created_at" timestamp(6) NOT NULL DEFAULT now(),
  "minValue" numeric(10,2),
  "maxValue" numeric(10,2)
)
;

-- ----------------------------
-- Table structure for sd_notification_log
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_notification_log";
CREATE TABLE "public"."sd_notification_log" (
  "device_id" int4,
  "notification_type_id" int4,
  "notification_channel_id" int4,
  "message" text COLLATE "pg_catalog"."default" NOT NULL,
  "response_data" jsonb,
  "sent_at" timestamp(6),
  "created_at" timestamp(6) NOT NULL DEFAULT now(),
  "template_id" int4,
  "delivered_at" timestamp(6),
  "read_at" timestamp(6),
  "retry_count" int4 NOT NULL DEFAULT 0,
  "error_message" text COLLATE "pg_catalog"."default",
  "message_id" varchar(100) COLLATE "pg_catalog"."default",
  "recipient" varchar(255) COLLATE "pg_catalog"."default",
  "id" int4 NOT NULL DEFAULT nextval('sd_notification_log_id_seq'::regclass),
  "status" varchar(20) COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'pending'::character varying
)
;

-- ----------------------------
-- Table structure for sd_notification_type
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_notification_type";
CREATE TABLE "public"."sd_notification_type" (
  "id" int4 NOT NULL DEFAULT nextval('sd_notification_type_id_seq'::regclass),
  "name" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "cooldown_minutes" int4 NOT NULL DEFAULT 10,
  "is_active" bool NOT NULL DEFAULT true,
  "icon" varchar(100) COLLATE "pg_catalog"."default",
  "color" varchar(20) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6) NOT NULL DEFAULT now(),
  "updated_at" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_report_data
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_report_data";
CREATE TABLE "public"."sd_report_data" (
  "id" int4 NOT NULL DEFAULT nextval('sd_report_data_id_seq'::regclass),
  "device_id" int4 NOT NULL,
  "report_type" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "data" jsonb NOT NULL,
  "period_start" timestamp(6) NOT NULL,
  "period_end" timestamp(6) NOT NULL,
  "created_at" timestamp(6) NOT NULL DEFAULT now(),
  "template_id" int4,
  "generated_at" timestamp(6) NOT NULL DEFAULT now(),
  "file_path" varchar(500) COLLATE "pg_catalog"."default",
  "file_format" varchar(20) COLLATE "pg_catalog"."default",
  "is_exported" bool NOT NULL DEFAULT false,
  "exported_at" timestamp(6)
)
;

-- ----------------------------
-- Table structure for sd_schedule_process_log
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_schedule_process_log";
CREATE TABLE "public"."sd_schedule_process_log" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "schedule_id" int4,
  "device_id" int4,
  "schedule_event_start" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "day" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "doday" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "dotime" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "schedule_event" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "device_status" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "status" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "date" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "time" varchar(20) COLLATE "pg_catalog"."default" NOT NULL,
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_sensor_data
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_sensor_data";
CREATE TABLE "public"."sd_sensor_data" (
  "id" int4 NOT NULL DEFAULT nextval('sd_sensor_data_id_seq'::regclass),
  "device_id" int4 NOT NULL,
  "value" numeric(10,2) NOT NULL,
  "raw_data" jsonb,
  "notification_type_id" int4,
  "timestamp" timestamp(6) NOT NULL DEFAULT now(),
  "created_at" timestamp(6) NOT NULL DEFAULT now(),
  "battery_level" numeric(5,2),
  "signal_strength" int4
)
;

-- ----------------------------
-- Table structure for sd_system_setting
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_system_setting";
CREATE TABLE "public"."sd_system_setting" (
  "id" int4 NOT NULL DEFAULT nextval('sd_system_setting_id_seq'::regclass),
  "key" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "value" jsonb NOT NULL,
  "category" varchar(50) COLLATE "pg_catalog"."default",
  "description" text COLLATE "pg_catalog"."default",
  "is_public" bool NOT NULL DEFAULT false,
  "created_at" timestamp(6) NOT NULL DEFAULT now(),
  "updated_at" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_user
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_user";
CREATE TABLE "public"."sd_user" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "createddate" timestamp(6) NOT NULL DEFAULT now(),
  "updateddate" timestamp(6) NOT NULL DEFAULT now(),
  "deletedate" date,
  "role_id" int4 NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "username" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password_temp" varchar(255) COLLATE "pg_catalog"."default",
  "firstname" varchar(255) COLLATE "pg_catalog"."default",
  "lastname" varchar(255) COLLATE "pg_catalog"."default",
  "fullname" varchar(255) COLLATE "pg_catalog"."default",
  "nickname" varchar(255) COLLATE "pg_catalog"."default",
  "idcard" varchar(255) COLLATE "pg_catalog"."default",
  "lastsignindate" timestamp(6) NOT NULL DEFAULT now(),
  "status" int2 NOT NULL,
  "active_status" int2,
  "network_id" int4 DEFAULT 1,
  "remark" varchar(255) COLLATE "pg_catalog"."default",
  "infomation_agree_status" int2 DEFAULT '0'::smallint,
  "gender" varchar(255) COLLATE "pg_catalog"."default",
  "birthday" date,
  "online_status" varchar(255) COLLATE "pg_catalog"."default" DEFAULT '0'::character varying,
  "message" varchar(255) COLLATE "pg_catalog"."default",
  "network_type_id" int4 DEFAULT 0,
  "public_status" int2 DEFAULT '0'::smallint,
  "type_id" int4 DEFAULT 0,
  "avatarpath" varchar(255) COLLATE "pg_catalog"."default",
  "avatar" varchar(255) COLLATE "pg_catalog"."default",
  "refresh_token" text COLLATE "pg_catalog"."default",
  "loginfailed" int2,
  "public_notification" int2 DEFAULT '0'::smallint,
  "sms_notification" int2 DEFAULT '0'::smallint,
  "email_notification" int2 DEFAULT '0'::smallint,
  "line_notification" int2 DEFAULT '0'::smallint,
  "mobile_number" varchar(255) COLLATE "pg_catalog"."default" DEFAULT '0'::character varying,
  "phone_number" varchar(255) COLLATE "pg_catalog"."default" DEFAULT '0'::character varying,
  "lineid" varchar(255) COLLATE "pg_catalog"."default" DEFAULT '0'::character varying,
  "system_id" varchar(255) COLLATE "pg_catalog"."default" DEFAULT '1'::character varying,
  "location_id" varchar(255) COLLATE "pg_catalog"."default" DEFAULT '1'::character varying
)
;

-- ----------------------------
-- Table structure for sd_user_access_menu
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_user_access_menu";
CREATE TABLE "public"."sd_user_access_menu" (
  "user_access_id" int4 NOT NULL DEFAULT nextval('sd_user_access_menu_user_access_id_seq'::regclass),
  "user_type_id" int4,
  "menu_id" int4,
  "parent_id" int4
)
;

-- ----------------------------
-- Table structure for sd_user_file
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_user_file";
CREATE TABLE "public"."sd_user_file" (
  "id" int4 NOT NULL DEFAULT nextval('sd_user_file_id_seq'::regclass),
  "file_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "file_type" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "file_path" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "file_type_id" int4 NOT NULL,
  "uid" varchar(255) COLLATE "pg_catalog"."default",
  "file_date" timestamp(6) NOT NULL DEFAULT now(),
  "status" int2 NOT NULL
)
;

-- ----------------------------
-- Table structure for sd_user_log
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_user_log";
CREATE TABLE "public"."sd_user_log" (
  "id" int4 NOT NULL DEFAULT nextval('sd_user_log_id_seq'::regclass),
  "log_type_id" int4 NOT NULL,
  "uid" uuid NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "detail" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "select_status" int4,
  "insert_status" int4,
  "update_status" int4,
  "delete_status" int4,
  "status" int4,
  "create" timestamp(6) NOT NULL DEFAULT now(),
  "update" timestamp(6) NOT NULL DEFAULT now(),
  "lang" varchar(50) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Table structure for sd_user_log_type
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_user_log_type";
CREATE TABLE "public"."sd_user_log_type" (
  "log_type_id" int4 NOT NULL DEFAULT nextval('sd_user_log_type_log_type_id_seq'::regclass),
  "type_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "type_detail" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "status" int4,
  "create" timestamp(6) NOT NULL DEFAULT now(),
  "update" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Table structure for sd_user_role
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_user_role";
CREATE TABLE "public"."sd_user_role" (
  "id" int4 NOT NULL DEFAULT nextval('sd_user_role_id_seq'::regclass),
  "role_id" int4 NOT NULL,
  "title" varchar(50) COLLATE "pg_catalog"."default",
  "createddate" timestamp(6) DEFAULT now(),
  "updateddate" timestamp(6) DEFAULT now(),
  "create_by" int4 NOT NULL,
  "lastupdate_by" int4 NOT NULL,
  "status" int2 NOT NULL,
  "type_id" int4 NOT NULL,
  "lang" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Table structure for sd_user_roles_access
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_user_roles_access";
CREATE TABLE "public"."sd_user_roles_access" (
  "create" timestamp(6) NOT NULL DEFAULT now(),
  "update" timestamp(6) NOT NULL DEFAULT now(),
  "role_id" int4 NOT NULL,
  "role_type_id" int4 NOT NULL
)
;

-- ----------------------------
-- Table structure for sd_user_roles_permision
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_user_roles_permision";
CREATE TABLE "public"."sd_user_roles_permision" (
  "role_type_id" int4 NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "detail" text COLLATE "pg_catalog"."default",
  "created" timestamp(6) NOT NULL,
  "updated" timestamp(6),
  "insert" int4,
  "update" int4,
  "delete" int4,
  "select" int4,
  "log" int4,
  "config" int4,
  "truncate" int4
)
;

-- ----------------------------
-- Table structure for tnb
-- ----------------------------
DROP TABLE IF EXISTS "public"."tnb";
CREATE TABLE "public"."tnb" (
  "id" int4 NOT NULL DEFAULT nextval('sd_dashboard_config_id_seq'::regclass),
  "location_id" int4 NOT NULL,
  "name" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "config_data" json NOT NULL,
  "status" int4 NOT NULL DEFAULT 1,
  "created_date" timestamp(6) NOT NULL DEFAULT now(),
  "updated_date" timestamp(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Function structure for gseg_penalty
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."gseg_penalty"(internal, internal, internal);
CREATE FUNCTION "public"."gseg_penalty"(internal, internal, internal)
  RETURNS "pg_catalog"."internal" AS '$libdir/seg', 'gseg_penalty'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for gseg_picksplit
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."gseg_picksplit"(internal, internal);
CREATE FUNCTION "public"."gseg_picksplit"(internal, internal)
  RETURNS "pg_catalog"."internal" AS '$libdir/seg', 'gseg_picksplit'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for gseg_union
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."gseg_union"(internal, internal);
CREATE FUNCTION "public"."gseg_union"(internal, internal)
  RETURNS "public"."seg" AS '$libdir/seg', 'gseg_union'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for monitor_deadlocks
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."monitor_deadlocks"();
CREATE FUNCTION "public"."monitor_deadlocks"()
  RETURNS TABLE("deadlock_time" timestamptz, "database_name" text, "process_id" int4, "query_text" text, "deadlock_info" jsonb) AS $BODY$
BEGIN
    RETURN QUERY
    SELECT 
        now() as deadlock_time,
        datname,
        pid,
        query,
        pg_logical_emit_message('deadlock', 'info') as deadlock_info
    FROM pg_stat_activity 
    WHERE wait_event_type = 'Lock' 
    AND wait_event = 'deadlock';
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;

-- ----------------------------
-- Function structure for seg_center
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."seg_center"("public"."seg");
CREATE FUNCTION "public"."seg_center"("public"."seg")
  RETURNS "pg_catalog"."float4" AS '$libdir/seg', 'seg_center'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for seg_cmp
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."seg_cmp"("public"."seg", "public"."seg");
CREATE FUNCTION "public"."seg_cmp"("public"."seg", "public"."seg")
  RETURNS "pg_catalog"."int4" AS '$libdir/seg', 'seg_cmp'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
COMMENT ON FUNCTION "public"."seg_cmp"("public"."seg", "public"."seg") IS 'btree comparison function';

-- ----------------------------
-- Function structure for seg_contained
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."seg_contained"("public"."seg", "public"."seg");
CREATE FUNCTION "public"."seg_contained"("public"."seg", "public"."seg")
  RETURNS "pg_catalog"."bool" AS '$libdir/seg', 'seg_contained'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
COMMENT ON FUNCTION "public"."seg_contained"("public"."seg", "public"."seg") IS 'contained in';

-- ----------------------------
-- Function structure for seg_contains
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."seg_contains"("public"."seg", "public"."seg");
CREATE FUNCTION "public"."seg_contains"("public"."seg", "public"."seg")
  RETURNS "pg_catalog"."bool" AS '$libdir/seg', 'seg_contains'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
COMMENT ON FUNCTION "public"."seg_contains"("public"."seg", "public"."seg") IS 'contains';

-- ----------------------------
-- Function structure for seg_different
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."seg_different"("public"."seg", "public"."seg");
CREATE FUNCTION "public"."seg_different"("public"."seg", "public"."seg")
  RETURNS "pg_catalog"."bool" AS '$libdir/seg', 'seg_different'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
COMMENT ON FUNCTION "public"."seg_different"("public"."seg", "public"."seg") IS 'different';

-- ----------------------------
-- Function structure for seg_ge
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."seg_ge"("public"."seg", "public"."seg");
CREATE FUNCTION "public"."seg_ge"("public"."seg", "public"."seg")
  RETURNS "pg_catalog"."bool" AS '$libdir/seg', 'seg_ge'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
COMMENT ON FUNCTION "public"."seg_ge"("public"."seg", "public"."seg") IS 'greater than or equal';

-- ----------------------------
-- Function structure for seg_gt
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."seg_gt"("public"."seg", "public"."seg");
CREATE FUNCTION "public"."seg_gt"("public"."seg", "public"."seg")
  RETURNS "pg_catalog"."bool" AS '$libdir/seg', 'seg_gt'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
COMMENT ON FUNCTION "public"."seg_gt"("public"."seg", "public"."seg") IS 'greater than';

-- ----------------------------
-- Function structure for seg_in
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."seg_in"(cstring);
CREATE FUNCTION "public"."seg_in"(cstring)
  RETURNS "public"."seg" AS '$libdir/seg', 'seg_in'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for seg_inter
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."seg_inter"("public"."seg", "public"."seg");
CREATE FUNCTION "public"."seg_inter"("public"."seg", "public"."seg")
  RETURNS "public"."seg" AS '$libdir/seg', 'seg_inter'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for seg_le
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."seg_le"("public"."seg", "public"."seg");
CREATE FUNCTION "public"."seg_le"("public"."seg", "public"."seg")
  RETURNS "pg_catalog"."bool" AS '$libdir/seg', 'seg_le'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
COMMENT ON FUNCTION "public"."seg_le"("public"."seg", "public"."seg") IS 'less than or equal';

-- ----------------------------
-- Function structure for seg_left
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."seg_left"("public"."seg", "public"."seg");
CREATE FUNCTION "public"."seg_left"("public"."seg", "public"."seg")
  RETURNS "pg_catalog"."bool" AS '$libdir/seg', 'seg_left'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
COMMENT ON FUNCTION "public"."seg_left"("public"."seg", "public"."seg") IS 'is left of';

-- ----------------------------
-- Function structure for seg_lower
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."seg_lower"("public"."seg");
CREATE FUNCTION "public"."seg_lower"("public"."seg")
  RETURNS "pg_catalog"."float4" AS '$libdir/seg', 'seg_lower'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for seg_lt
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."seg_lt"("public"."seg", "public"."seg");
CREATE FUNCTION "public"."seg_lt"("public"."seg", "public"."seg")
  RETURNS "pg_catalog"."bool" AS '$libdir/seg', 'seg_lt'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
COMMENT ON FUNCTION "public"."seg_lt"("public"."seg", "public"."seg") IS 'less than';

-- ----------------------------
-- Function structure for seg_out
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."seg_out"("public"."seg");
CREATE FUNCTION "public"."seg_out"("public"."seg")
  RETURNS "pg_catalog"."cstring" AS '$libdir/seg', 'seg_out'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for seg_over_left
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."seg_over_left"("public"."seg", "public"."seg");
CREATE FUNCTION "public"."seg_over_left"("public"."seg", "public"."seg")
  RETURNS "pg_catalog"."bool" AS '$libdir/seg', 'seg_over_left'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
COMMENT ON FUNCTION "public"."seg_over_left"("public"."seg", "public"."seg") IS 'overlaps or is left of';

-- ----------------------------
-- Function structure for seg_over_right
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."seg_over_right"("public"."seg", "public"."seg");
CREATE FUNCTION "public"."seg_over_right"("public"."seg", "public"."seg")
  RETURNS "pg_catalog"."bool" AS '$libdir/seg', 'seg_over_right'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
COMMENT ON FUNCTION "public"."seg_over_right"("public"."seg", "public"."seg") IS 'overlaps or is right of';

-- ----------------------------
-- Function structure for seg_overlap
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."seg_overlap"("public"."seg", "public"."seg");
CREATE FUNCTION "public"."seg_overlap"("public"."seg", "public"."seg")
  RETURNS "pg_catalog"."bool" AS '$libdir/seg', 'seg_overlap'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
COMMENT ON FUNCTION "public"."seg_overlap"("public"."seg", "public"."seg") IS 'overlaps';

-- ----------------------------
-- Function structure for seg_right
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."seg_right"("public"."seg", "public"."seg");
CREATE FUNCTION "public"."seg_right"("public"."seg", "public"."seg")
  RETURNS "pg_catalog"."bool" AS '$libdir/seg', 'seg_right'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
COMMENT ON FUNCTION "public"."seg_right"("public"."seg", "public"."seg") IS 'is right of';

-- ----------------------------
-- Function structure for seg_same
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."seg_same"("public"."seg", "public"."seg");
CREATE FUNCTION "public"."seg_same"("public"."seg", "public"."seg")
  RETURNS "pg_catalog"."bool" AS '$libdir/seg', 'seg_same'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;
COMMENT ON FUNCTION "public"."seg_same"("public"."seg", "public"."seg") IS 'same as';

-- ----------------------------
-- Function structure for seg_size
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."seg_size"("public"."seg");
CREATE FUNCTION "public"."seg_size"("public"."seg")
  RETURNS "pg_catalog"."float4" AS '$libdir/seg', 'seg_size'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for seg_union
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."seg_union"("public"."seg", "public"."seg");
CREATE FUNCTION "public"."seg_union"("public"."seg", "public"."seg")
  RETURNS "public"."seg" AS '$libdir/seg', 'seg_union'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for seg_upper
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."seg_upper"("public"."seg");
CREATE FUNCTION "public"."seg_upper"("public"."seg")
  RETURNS "pg_catalog"."float4" AS '$libdir/seg', 'seg_upper'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_generate_v1
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v1"();
CREATE FUNCTION "public"."uuid_generate_v1"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v1'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_generate_v1mc
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v1mc"();
CREATE FUNCTION "public"."uuid_generate_v1mc"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v1mc'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_generate_v3
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v3"("namespace" uuid, "name" text);
CREATE FUNCTION "public"."uuid_generate_v3"("namespace" uuid, "name" text)
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v3'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_generate_v4
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v4"();
CREATE FUNCTION "public"."uuid_generate_v4"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v4'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_generate_v5
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v5"("namespace" uuid, "name" text);
CREATE FUNCTION "public"."uuid_generate_v5"("namespace" uuid, "name" text)
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v5'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_nil
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_nil"();
CREATE FUNCTION "public"."uuid_nil"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_nil'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_ns_dns
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_ns_dns"();
CREATE FUNCTION "public"."uuid_ns_dns"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_dns'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_ns_oid
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_ns_oid"();
CREATE FUNCTION "public"."uuid_ns_oid"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_oid'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_ns_url
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_ns_url"();
CREATE FUNCTION "public"."uuid_ns_url"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_url'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_ns_x500
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_ns_x500"();
CREATE FUNCTION "public"."uuid_ns_x500"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_x500'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."activity_log_id_seq"
OWNED BY "public"."activity_log"."id";
SELECT setval('"public"."activity_log_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."command_log_id_seq"
OWNED BY "public"."command_log"."id";
SELECT setval('"public"."command_log_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."device_alert_id_seq"
OWNED BY "public"."device_alert"."id";
SELECT setval('"public"."device_alert_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."device_config_id_seq"
OWNED BY "public"."device_config"."id";
SELECT setval('"public"."device_config_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."device_status_id_seq"
OWNED BY "public"."device_status"."id";
SELECT setval('"public"."device_status_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."iot_data_id_seq"
OWNED BY "public"."iot_data"."id";
SELECT setval('"public"."iot_data_id_seq"', 199, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."migrations_id_seq"
OWNED BY "public"."migrations"."id";
SELECT setval('"public"."migrations_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."noti_notification_logs_log_id_seq"
OWNED BY "public"."noti_notification_logs"."log_id";
SELECT setval('"public"."noti_notification_logs_log_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."noti_notification_rules_rule_id_seq"
OWNED BY "public"."noti_notification_rules"."rule_id";
SELECT setval('"public"."noti_notification_rules_rule_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."noti_notification_types_type_id_seq"
OWNED BY "public"."noti_notification_types"."type_id";
SELECT setval('"public"."noti_notification_types_type_id_seq"', 5, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."notification_devices_id_seq"
OWNED BY "public"."notification_devices"."id";
SELECT setval('"public"."notification_devices_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."notification_groups_id_seq"
OWNED BY "public"."notification_groups"."id";
SELECT setval('"public"."notification_groups_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."notification_logs_id_seq"
OWNED BY "public"."notification_logs"."id";
SELECT setval('"public"."notification_logs_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."notification_types_id_seq"
OWNED BY "public"."notification_types"."id";
SELECT setval('"public"."notification_types_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_activity_log_id_seq"
OWNED BY "public"."sd_activity_log"."id";
SELECT setval('"public"."sd_activity_log_id_seq"', 1559, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_activity_type_log_typeId_seq"
OWNED BY "public"."sd_activity_type_log"."typeId";
SELECT setval('"public"."sd_activity_type_log_typeId_seq"', 10, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_admin_access_menu_admin_access_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_admin_access_menu_admin_access_id_seq1"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_admin_access_menu_admin_access_id_seq2"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_air_control_air_control_id_seq"
OWNED BY "public"."sd_air_control"."air_control_id";
SELECT setval('"public"."sd_air_control_air_control_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_air_mod_air_mod_id_seq"
OWNED BY "public"."sd_air_mod"."air_mod_id";
SELECT setval('"public"."sd_air_mod_air_mod_id_seq"', 5, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_air_period_air_period_id_seq"
OWNED BY "public"."sd_air_period"."air_period_id";
SELECT setval('"public"."sd_air_period_air_period_id_seq"', 6, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_air_setting_warning_air_setting_warning_id_seq"
OWNED BY "public"."sd_air_setting_warning"."air_setting_warning_id";
SELECT setval('"public"."sd_air_setting_warning_air_setting_warning_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_air_warning_air_warning_id_seq"
OWNED BY "public"."sd_air_warning"."air_warning_id";
SELECT setval('"public"."sd_air_warning_air_warning_id_seq"', 5, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_api_key_id_seq"
OWNED BY "public"."sd_api_key"."id";
SELECT setval('"public"."sd_api_key_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_audit_log_audit_id_seq"
OWNED BY "public"."sd_audit_log"."audit_id";
SELECT setval('"public"."sd_audit_log_audit_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_channel_template_id_seq"
OWNED BY "public"."sd_channel_template"."id";
SELECT setval('"public"."sd_channel_template_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_dashboard_config_id_seq"
OWNED BY "public"."tnb"."id";
SELECT setval('"public"."sd_dashboard_config_id_seq"', 41, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_device_category_id_seq"
OWNED BY "public"."sd_device_category"."id";
SELECT setval('"public"."sd_device_category_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_device_group_id_seq"
OWNED BY "public"."sd_device_group"."id";
SELECT setval('"public"."sd_device_group_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_device_log_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_device_log_id_seq1"
OWNED BY "public"."sd_device_log"."id";
SELECT setval('"public"."sd_device_log_id_seq1"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_device_member_id_seq"
OWNED BY "public"."sd_device_member"."id";
SELECT setval('"public"."sd_device_member_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_device_notification_config_id_seq"
OWNED BY "public"."sd_device_notification_config"."id";
SELECT setval('"public"."sd_device_notification_config_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_device_schedule_id_seq"
OWNED BY "public"."sd_device_schedule"."id";
SELECT setval('"public"."sd_device_schedule_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_device_status_history_id_seq"
OWNED BY "public"."sd_device_status_history"."id";
SELECT setval('"public"."sd_device_status_history_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_group_notification_config_id_seq"
OWNED BY "public"."sd_group_notification_config"."id";
SELECT setval('"public"."sd_group_notification_config_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_api_api_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_device_action_device_action_user_id_seq"', 33, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_device_action_log_log_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_device_action_user_device_action_user_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_device_alarm_action_alarm_action_id_seq"', 80, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_device_device_id_seq"', 172, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_device_device_id_seq1"', 13, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_device_device_id_seq2"
OWNED BY "public"."sd_iot_device"."device_id";
SELECT setval('"public"."sd_iot_device_device_id_seq2"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_device_type_type_id_seq"', 5, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_email_email_id_seq"', 1, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_email_email_id_seq1"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_email_host_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_email_host_id_seq1"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_group_group_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_group_group_id_seq1"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_influxdb_influxdb_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_line_line_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_location_location_id_seq"', 6, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_location_location_id_seq1"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_mqtt_mqtt_id_seq"', 61, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_mqtt_mqtt_id_seq1"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq10"
OWNED BY "public"."sd_iot_mqtt"."mqtt_id";
SELECT setval('"public"."sd_iot_mqtt_mqtt_id_seq10"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq11"
OWNED BY "public"."sd_iot_mqtt"."mqtt_id";
SELECT setval('"public"."sd_iot_mqtt_mqtt_id_seq11"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_mqtt_mqtt_id_seq2"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq3"
OWNED BY "public"."sd_iot_mqtt"."mqtt_id";
SELECT setval('"public"."sd_iot_mqtt_mqtt_id_seq3"', 60, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq4"
OWNED BY "public"."sd_iot_mqtt"."mqtt_id";
SELECT setval('"public"."sd_iot_mqtt_mqtt_id_seq4"', 88, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq5"
OWNED BY "public"."sd_iot_mqtt"."mqtt_id";
SELECT setval('"public"."sd_iot_mqtt_mqtt_id_seq5"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq6"
OWNED BY "public"."sd_iot_mqtt"."mqtt_id";
SELECT setval('"public"."sd_iot_mqtt_mqtt_id_seq6"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq7"
OWNED BY "public"."sd_iot_mqtt"."mqtt_id";
SELECT setval('"public"."sd_iot_mqtt_mqtt_id_seq7"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq8"
OWNED BY "public"."sd_iot_mqtt"."mqtt_id";
SELECT setval('"public"."sd_iot_mqtt_mqtt_id_seq8"', 60, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_iot_mqtt_mqtt_id_seq9"
OWNED BY "public"."sd_iot_mqtt"."mqtt_id";
SELECT setval('"public"."sd_iot_mqtt_mqtt_id_seq9"', 66, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_nodered_nodered_id_seq"', 1, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_schedule_schedule_id_seq"', 32, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_sensor_sensor_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_sensor_sensor_id_seq1"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_setting_setting_id_seq"', 2, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_setting_setting_id_seq1"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_sms_sms_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_telegram_telegram_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_token_token_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_type_type_id_seq"', 1, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_iot_type_type_id_seq1"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_module_log_id_seq"
OWNED BY "public"."sd_module_log"."id";
SELECT setval('"public"."sd_module_log_id_seq"', 3, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_notification_channel_id_seq"
OWNED BY "public"."sd_notification_channel"."id";
SELECT setval('"public"."sd_notification_channel_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_notification_condition_id_seq"
OWNED BY "public"."sd_notification_condition"."id";
SELECT setval('"public"."sd_notification_condition_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_notification_log_id_seq"
OWNED BY "public"."sd_notification_log"."id";
SELECT setval('"public"."sd_notification_log_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_notification_type_id_seq"
OWNED BY "public"."sd_notification_type"."id";
SELECT setval('"public"."sd_notification_type_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_report_data_id_seq"
OWNED BY "public"."sd_report_data"."id";
SELECT setval('"public"."sd_report_data_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_sensor_data_id_seq"
OWNED BY "public"."sd_sensor_data"."id";
SELECT setval('"public"."sd_sensor_data_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sd_system_setting_id_seq"
OWNED BY "public"."sd_system_setting"."id";
SELECT setval('"public"."sd_system_setting_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_user_access_menu_user_access_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_user_file_file_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_user_file_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_user_file_id_seq1"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_user_log_id_seq"', 1122, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_user_log_type_log_type_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."sd_user_role_id_seq"', 1, false);

-- ----------------------------
-- Indexes structure for table activity_log
-- ----------------------------
CREATE INDEX "IDX_13f3cf247b11fa7fa38be36f01" ON "public"."activity_log" USING btree (
  "timestamp" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_8875d63c11f98bb45d158a3116" ON "public"."activity_log" USING btree (
  "type" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "timestamp" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_df6dcc35f8fc10ec9bc797e00e" ON "public"."activity_log" USING btree (
  "deviceId" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "timestamp" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_fc47cfd7808aac4bda9b4b9b15" ON "public"."activity_log" USING btree (
  "userId" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "timestamp" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table activity_log
-- ----------------------------
ALTER TABLE "public"."activity_log" ADD CONSTRAINT "PK_067d761e2956b77b14e534fd6f1" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table command_log
-- ----------------------------
CREATE INDEX "IDX_6ec650b4e5d5e4c1a54c5c3f19" ON "public"."command_log" USING btree (
  "status" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_72be6eb0542685a1b0228076e7" ON "public"."command_log" USING btree (
  "issuedAt" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_a65ee0d3ea51d1f9b85dded772" ON "public"."command_log" USING btree (
  "deviceId" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "issuedAt" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table command_log
-- ----------------------------
ALTER TABLE "public"."command_log" ADD CONSTRAINT "PK_e07eedeed5ba0e97d28e04bd6ac" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table device_alert
-- ----------------------------
CREATE INDEX "IDX_0daf4994516c3655ad231eddda" ON "public"."device_alert" USING btree (
  "metric" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "createdAt" "pg_catalog"."timestamp_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_73adf374f630bf776514e7e72a" ON "public"."device_alert" USING btree (
  "type" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "severity" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_b9fa522dfdda031e88cf4c931f" ON "public"."device_alert" USING btree (
  "resolved" "pg_catalog"."bool_ops" ASC NULLS LAST,
  "createdAt" "pg_catalog"."timestamp_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_c60df3e14932cad0a1a13725ad" ON "public"."device_alert" USING btree (
  "deviceId" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "createdAt" "pg_catalog"."timestamp_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table device_alert
-- ----------------------------
ALTER TABLE "public"."device_alert" ADD CONSTRAINT "PK_36a6879087d43439ba79ff736af" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table device_config
-- ----------------------------
CREATE UNIQUE INDEX "IDX_728d47484a55ec830d34641d58" ON "public"."device_config" USING btree (
  "deviceId" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Uniques structure for table device_config
-- ----------------------------
ALTER TABLE "public"."device_config" ADD CONSTRAINT "UQ_728d47484a55ec830d34641d589" UNIQUE ("deviceId");

-- ----------------------------
-- Primary Key structure for table device_config
-- ----------------------------
ALTER TABLE "public"."device_config" ADD CONSTRAINT "PK_57cb6d1b1e0f26d33e2300cb7fd" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table device_status
-- ----------------------------
CREATE INDEX "IDX_1537bb18c59911980aba3826e6" ON "public"."device_status" USING btree (
  "lastSeen" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "IDX_55fcb62dbc5432c6c793b9a796" ON "public"."device_status" USING btree (
  "deviceId" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_ea358458e569303222607a8e63" ON "public"."device_status" USING btree (
  "isOnline" "pg_catalog"."bool_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_f45f0dcc4b1c0cdc49ff6e8d25" ON "public"."device_status" USING btree (
  "isActive" "pg_catalog"."bool_ops" ASC NULLS LAST
);

-- ----------------------------
-- Uniques structure for table device_status
-- ----------------------------
ALTER TABLE "public"."device_status" ADD CONSTRAINT "UQ_55fcb62dbc5432c6c793b9a7967" UNIQUE ("deviceId");

-- ----------------------------
-- Primary Key structure for table device_status
-- ----------------------------
ALTER TABLE "public"."device_status" ADD CONSTRAINT "PK_3924a3d59d98b717232f8f94935" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table iot_data
-- ----------------------------
CREATE INDEX "IDX_456a81db6d3c5b9c6d3d527e51" ON "public"."iot_data" USING btree (
  "deviceId" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "createdAt" "pg_catalog"."timestamp_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_9e0f5fe78daae7b8b9a7e844ce" ON "public"."iot_data" USING btree (
  "timestamp" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_f53156e53d01d570cda5115755" ON "public"."iot_data" USING btree (
  "deviceId" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "timestamp" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table iot_data
-- ----------------------------
ALTER TABLE "public"."iot_data" ADD CONSTRAINT "PK_7f96308951e1b8b75ec7d0b11ce" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table migrations
-- ----------------------------
ALTER TABLE "public"."migrations" ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table noti_notification_logs
-- ----------------------------
CREATE INDEX "idx_notification_logs_channel" ON "public"."noti_notification_logs" USING btree (
  "channel" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_notification_logs_notification_id" ON "public"."noti_notification_logs" USING btree (
  "notification_id" "pg_catalog"."uuid_ops" ASC NULLS LAST
);
CREATE INDEX "idx_notification_logs_status" ON "public"."noti_notification_logs" USING btree (
  "status" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table noti_notification_logs
-- ----------------------------
ALTER TABLE "public"."noti_notification_logs" ADD CONSTRAINT "noti_notification_logs_pkey" PRIMARY KEY ("log_id");

-- ----------------------------
-- Primary Key structure for table noti_notification_rules
-- ----------------------------
ALTER TABLE "public"."noti_notification_rules" ADD CONSTRAINT "noti_notification_rules_pkey" PRIMARY KEY ("rule_id");

-- ----------------------------
-- Primary Key structure for table noti_notification_types
-- ----------------------------
ALTER TABLE "public"."noti_notification_types" ADD CONSTRAINT "noti_notification_types_pkey" PRIMARY KEY ("type_id");

-- ----------------------------
-- Primary Key structure for table noti_notifications
-- ----------------------------
ALTER TABLE "public"."noti_notifications" ADD CONSTRAINT "noti_notifications_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table notification_devices
-- ----------------------------
ALTER TABLE "public"."notification_devices" ADD CONSTRAINT "UQ_6dec1c23c4bf7ad0bafee3aec04" UNIQUE ("device_id");

-- ----------------------------
-- Primary Key structure for table notification_devices
-- ----------------------------
ALTER TABLE "public"."notification_devices" ADD CONSTRAINT "PK_e10c4c1abd87d91ceddbb60a2ab" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table notification_groups
-- ----------------------------
ALTER TABLE "public"."notification_groups" ADD CONSTRAINT "PK_7705fddb5be87ede3a1da250ac7" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table notification_groups_devices_notification_devices
-- ----------------------------
CREATE INDEX "IDX_58bcbe19caaf998885dc34b309" ON "public"."notification_groups_devices_notification_devices" USING btree (
  "notificationDevicesId" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_7a461c4b72474543392a58d985" ON "public"."notification_groups_devices_notification_devices" USING btree (
  "notificationGroupsId" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table notification_groups_devices_notification_devices
-- ----------------------------
ALTER TABLE "public"."notification_groups_devices_notification_devices" ADD CONSTRAINT "PK_bc5ddc2ee89bdc23bd778773837" PRIMARY KEY ("notificationGroupsId", "notificationDevicesId");

-- ----------------------------
-- Primary Key structure for table notification_logs
-- ----------------------------
ALTER TABLE "public"."notification_logs" ADD CONSTRAINT "PK_19c524e644cdeaebfcffc284871" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table notification_types
-- ----------------------------
ALTER TABLE "public"."notification_types" ADD CONSTRAINT "UQ_1d7eaa0dcf0fbfd0a8e6bdbc9c9" UNIQUE ("name");
ALTER TABLE "public"."notification_types" ADD CONSTRAINT "UQ_6ecc5d3cab22a8557fcc2aa3150" UNIQUE ("code");

-- ----------------------------
-- Primary Key structure for table notification_types
-- ----------------------------
ALTER TABLE "public"."notification_types" ADD CONSTRAINT "PK_aa965e094494e2c4c5942cfb42d" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table sd_activity_log
-- ----------------------------
CREATE INDEX "IDX_0b4b09453c990fa49519e70d3b" ON "public"."sd_activity_log" USING btree (
  "user_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_19200ac90b7026b089ab62fed7" ON "public"."sd_activity_log" USING btree (
  "date" "pg_catalog"."timestamp_ops" ASC NULLS LAST,
  "type_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_65aba133a9ab96d165cac61707" ON "public"."sd_activity_log" USING btree (
  "modules_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_99c226870807561efb504a5499" ON "public"."sd_activity_log" USING btree (
  "type_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table sd_activity_log
-- ----------------------------
ALTER TABLE "public"."sd_activity_log" ADD CONSTRAINT "PK_d27a95117a626b7a5bdac9d24d0" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_activity_type_log
-- ----------------------------
ALTER TABLE "public"."sd_activity_type_log" ADD CONSTRAINT "PK_eef5af266b3c19d86577ed9cc1b" PRIMARY KEY ("typeId");

-- ----------------------------
-- Primary Key structure for table sd_admin_access_menu
-- ----------------------------
ALTER TABLE "public"."sd_admin_access_menu" ADD CONSTRAINT "PK_de95e99df0393960300a40f29ce" PRIMARY KEY ("admin_access_id");

-- ----------------------------
-- Primary Key structure for table sd_air_control
-- ----------------------------
ALTER TABLE "public"."sd_air_control" ADD CONSTRAINT "PK_c9291e5e847d6fe0543562bb08a" PRIMARY KEY ("air_control_id");

-- ----------------------------
-- Primary Key structure for table sd_air_control_device_map
-- ----------------------------
ALTER TABLE "public"."sd_air_control_device_map" ADD CONSTRAINT "PK_bbb89344350e7264cf403a5018c" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_air_control_log
-- ----------------------------
ALTER TABLE "public"."sd_air_control_log" ADD CONSTRAINT "PK_ecca1fea6a00b59353e00e88bc7" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_air_mod
-- ----------------------------
ALTER TABLE "public"."sd_air_mod" ADD CONSTRAINT "PK_7cf2d95e19e6118f3e20d0e89c0" PRIMARY KEY ("air_mod_id");

-- ----------------------------
-- Primary Key structure for table sd_air_mod_device_map
-- ----------------------------
ALTER TABLE "public"."sd_air_mod_device_map" ADD CONSTRAINT "PK_25d3e581191fd2d90bddb89531d" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_air_period
-- ----------------------------
ALTER TABLE "public"."sd_air_period" ADD CONSTRAINT "PK_fe31e0aa6dbd86a3a5a701ef8c0" PRIMARY KEY ("air_period_id");

-- ----------------------------
-- Primary Key structure for table sd_air_period_device_map
-- ----------------------------
ALTER TABLE "public"."sd_air_period_device_map" ADD CONSTRAINT "PK_88631376dbd162e33624fea879f" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_air_setting_warning
-- ----------------------------
ALTER TABLE "public"."sd_air_setting_warning" ADD CONSTRAINT "PK_6af6ba880bf3202fd83a996e102" PRIMARY KEY ("air_setting_warning_id");

-- ----------------------------
-- Primary Key structure for table sd_air_setting_warning_device_map
-- ----------------------------
ALTER TABLE "public"."sd_air_setting_warning_device_map" ADD CONSTRAINT "PK_abeef72f0bb4660d106f593d129" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_air_warning
-- ----------------------------
ALTER TABLE "public"."sd_air_warning" ADD CONSTRAINT "PK_2ee4199036c3eed320cc6b8340b" PRIMARY KEY ("air_warning_id");

-- ----------------------------
-- Primary Key structure for table sd_air_warning_device_map
-- ----------------------------
ALTER TABLE "public"."sd_air_warning_device_map" ADD CONSTRAINT "PK_a834caaeba184f707ab98783ba7" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table sd_alarm_process_log
-- ----------------------------
ALTER TABLE "public"."sd_alarm_process_log" ADD CONSTRAINT "UQ_7e1f2a42bb03e3042139717d283" UNIQUE ("alarm_action_id", "device_id", "type_id", "date", "time", "alarm_status");

-- ----------------------------
-- Primary Key structure for table sd_alarm_process_log
-- ----------------------------
ALTER TABLE "public"."sd_alarm_process_log" ADD CONSTRAINT "PK_bf05866d307414aca1cb0fa22bb" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_alarm_process_log_email
-- ----------------------------
ALTER TABLE "public"."sd_alarm_process_log_email" ADD CONSTRAINT "PK_3dd863b3d0b87eb1065f899d41e" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_alarm_process_log_line
-- ----------------------------
ALTER TABLE "public"."sd_alarm_process_log_line" ADD CONSTRAINT "PK_99daf9a12a11f25f7320bbbbb3a" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_alarm_process_log_mqtt
-- ----------------------------
ALTER TABLE "public"."sd_alarm_process_log_mqtt" ADD CONSTRAINT "PK_7608b7ffa813a82ac4cad41b97f" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_alarm_process_log_sms
-- ----------------------------
ALTER TABLE "public"."sd_alarm_process_log_sms" ADD CONSTRAINT "PK_dc2d76655ef76ef973dbc496e12" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_alarm_process_log_telegram
-- ----------------------------
ALTER TABLE "public"."sd_alarm_process_log_telegram" ADD CONSTRAINT "PK_f708fcbb8c72eaae09f83713033" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_alarm_process_log_temp
-- ----------------------------
ALTER TABLE "public"."sd_alarm_process_log_temp" ADD CONSTRAINT "PK_432d1e132ee5b3c7279ffd75c84" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table sd_api_key
-- ----------------------------
CREATE INDEX "IDX_2bfd53a47cc724d5411d966ca6" ON "public"."sd_api_key" USING btree (
  "is_active" "pg_catalog"."bool_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_9f0a1ac09eb7fa36520221e92c" ON "public"."sd_api_key" USING btree (
  "expires_at" "pg_catalog"."timestamp_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_c900cebece3f54e9b678a3cce0" ON "public"."sd_api_key" USING btree (
  "user_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "IDX_d3374478cea9996b71cf1b104f" ON "public"."sd_api_key" USING btree (
  "api_key" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table sd_api_key
-- ----------------------------
ALTER TABLE "public"."sd_api_key" ADD CONSTRAINT "PK_f09c2bdc171c22a04525d759a97" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table sd_audit_log
-- ----------------------------
CREATE INDEX "IDX_01794a12abd42fa88a3f948239" ON "public"."sd_audit_log" USING btree (
  "action" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_1166fe47b20cc3e414ea6eea19" ON "public"."sd_audit_log" USING btree (
  "entity_type" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_65f8b412cec4848c36033bac39" ON "public"."sd_audit_log" USING btree (
  "action_time" "pg_catalog"."timestamp_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_bb0ef5e90f9be501568ce36cff" ON "public"."sd_audit_log" USING btree (
  "entity_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_be16a68199e409e5de4f265358" ON "public"."sd_audit_log" USING btree (
  "user_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table sd_audit_log
-- ----------------------------
ALTER TABLE "public"."sd_audit_log" ADD CONSTRAINT "PK_218eeb5dfb915432acb201c87eb" PRIMARY KEY ("audit_id");

-- ----------------------------
-- Indexes structure for table sd_channel_template
-- ----------------------------
CREATE INDEX "IDX_ce5d8406020743536c305992df" ON "public"."sd_channel_template" USING btree (
  "channel_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_db9ff54f319a5479d710c3328f" ON "public"."sd_channel_template" USING btree (
  "is_active" "pg_catalog"."bool_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_e3d019a62043b9878ed99e3a2e" ON "public"."sd_channel_template" USING btree (
  "notification_type_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table sd_channel_template
-- ----------------------------
ALTER TABLE "public"."sd_channel_template" ADD CONSTRAINT "PK_2be8fca9c9fe4ed026d6ee9b696" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_dashboard_config
-- ----------------------------
ALTER TABLE "public"."sd_dashboard_config" ADD CONSTRAINT "PK_0e58258313bd1a7ee9131d9ca89" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_device_category
-- ----------------------------
ALTER TABLE "public"."sd_device_category" ADD CONSTRAINT "PK_a06dec22491466317b05ca09e3c" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table sd_device_group
-- ----------------------------
CREATE INDEX "IDX_822c57ed532532c0b9a0274e83" ON "public"."sd_device_group" USING btree (
  "group_type" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_bde2e0f305c0f4fd619f090db7" ON "public"."sd_device_group" USING btree (
  "is_active" "pg_catalog"."bool_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table sd_device_group
-- ----------------------------
ALTER TABLE "public"."sd_device_group" ADD CONSTRAINT "PK_1693d52741b2fa70941dcad467a" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_device_log
-- ----------------------------
ALTER TABLE "public"."sd_device_log" ADD CONSTRAINT "PK_da44052006daebc229cb1a64d27" PRIMARY KEY ("id", "type_id", "sensor_id");

-- ----------------------------
-- Indexes structure for table sd_device_member
-- ----------------------------
CREATE INDEX "IDX_4850040489393def6982925f44" ON "public"."sd_device_member" USING btree (
  "group_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_8a0d296dd566e591fc5e5ace19" ON "public"."sd_device_member" USING btree (
  "is_active" "pg_catalog"."bool_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_da57e66f9fad59706cc0207ddb" ON "public"."sd_device_member" USING btree (
  "Device_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Uniques structure for table sd_device_member
-- ----------------------------
ALTER TABLE "public"."sd_device_member" ADD CONSTRAINT "unique_Device_group" UNIQUE ("Device_id", "group_id");

-- ----------------------------
-- Primary Key structure for table sd_device_member
-- ----------------------------
ALTER TABLE "public"."sd_device_member" ADD CONSTRAINT "PK_1b0d3c3c0d30ae8acde4e448160" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table sd_device_notification_config
-- ----------------------------
CREATE INDEX "IDX_166cd6c32e68127baa36e91e3b" ON "public"."sd_device_notification_config" USING btree (
  "notification_channel_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_52dc2a7b6111b9aa908f35ce78" ON "public"."sd_device_notification_config" USING btree (
  "device_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_9a8fc05ce2d690cfa06bf54d93" ON "public"."sd_device_notification_config" USING btree (
  "is_active" "pg_catalog"."bool_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_d891f5458655126ed4eaad545a" ON "public"."sd_device_notification_config" USING btree (
  "notification_type_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Uniques structure for table sd_device_notification_config
-- ----------------------------
ALTER TABLE "public"."sd_device_notification_config" ADD CONSTRAINT "unique_Device_channel_type" UNIQUE ("device_id", "notification_channel_id", "notification_type_id");

-- ----------------------------
-- Primary Key structure for table sd_device_notification_config
-- ----------------------------
ALTER TABLE "public"."sd_device_notification_config" ADD CONSTRAINT "PK_61591c79bf5915031b94cb16c7d" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table sd_device_schedule
-- ----------------------------
CREATE INDEX "IDX_00f5698ac85f14995796dd6e4f" ON "public"."sd_device_schedule" USING btree (
  "device_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_214403f5dd137578b17b64e557" ON "public"."sd_device_schedule" USING btree (
  "is_active" "pg_catalog"."bool_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_a15e97a8a277525ac0f3c3f58a" ON "public"."sd_device_schedule" USING btree (
  "next_run_at" "pg_catalog"."timestamp_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_a901ab3adfba5a05db0b80b25d" ON "public"."sd_device_schedule" USING btree (
  "schedule_type" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table sd_device_schedule
-- ----------------------------
ALTER TABLE "public"."sd_device_schedule" ADD CONSTRAINT "PK_f9e770f54d50bbc68e6688e3064" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table sd_device_status_history
-- ----------------------------
CREATE INDEX "IDX_740d73681f6ea90eb7f0edea3b" ON "public"."sd_device_status_history" USING btree (
  "created_at" "pg_catalog"."timestamp_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_e9ecb689be9cfe27f3840f53f9" ON "public"."sd_device_status_history" USING btree (
  "notification_type_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_f435db981adb022aaf7eb5224c" ON "public"."sd_device_status_history" USING btree (
  "device_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table sd_device_status_history
-- ----------------------------
ALTER TABLE "public"."sd_device_status_history" ADD CONSTRAINT "PK_8bbe09daf4998eddf20edfb6c05" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table sd_group_notification_config
-- ----------------------------
CREATE INDEX "IDX_1828f55281ae223026c06627f7" ON "public"."sd_group_notification_config" USING btree (
  "notification_channel_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_a9dcb499890b3a82cbb7dd6af6" ON "public"."sd_group_notification_config" USING btree (
  "group_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_f94187512c0480edd556f0dd9a" ON "public"."sd_group_notification_config" USING btree (
  "notification_type_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Uniques structure for table sd_group_notification_config
-- ----------------------------
ALTER TABLE "public"."sd_group_notification_config" ADD CONSTRAINT "unique_group_channel_type" UNIQUE ("group_id", "notification_channel_id", "notification_type_id");

-- ----------------------------
-- Primary Key structure for table sd_group_notification_config
-- ----------------------------
ALTER TABLE "public"."sd_group_notification_config" ADD CONSTRAINT "PK_144aaed2e65cf660376c258e85b" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_iot_alarm_device
-- ----------------------------
ALTER TABLE "public"."sd_iot_alarm_device" ADD CONSTRAINT "PK_f25b128c3c65fcb6c16627e3c15" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_iot_alarm_device_event
-- ----------------------------
ALTER TABLE "public"."sd_iot_alarm_device_event" ADD CONSTRAINT "PK_25f5163f34e3ba4824c5b5a2a20" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_iot_api
-- ----------------------------
ALTER TABLE "public"."sd_iot_api" ADD CONSTRAINT "PK_f5a38da6c7393c8189d8aecba78" PRIMARY KEY ("api_id");

-- ----------------------------
-- Indexes structure for table sd_iot_device
-- ----------------------------
CREATE INDEX "idx_device_created_date" ON "public"."sd_iot_device" USING btree (
  "createddate" "pg_catalog"."timestamp_ops" ASC NULLS LAST
);
CREATE INDEX "idx_device_org_bucket" ON "public"."sd_iot_device" USING btree (
  "org" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "bucket" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_device_sn" ON "public"."sd_iot_device" USING btree (
  "sn" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "idx_device_work_status" ON "public"."sd_iot_device" USING btree (
  "work_status" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Uniques structure for table sd_iot_device
-- ----------------------------
ALTER TABLE "public"."sd_iot_device" ADD CONSTRAINT "UQ_6807f66b2427be1e081c2a09836" UNIQUE ("sn");

-- ----------------------------
-- Primary Key structure for table sd_iot_device
-- ----------------------------
ALTER TABLE "public"."sd_iot_device" ADD CONSTRAINT "PK_841e36ab4b8edbaa5363d65f18d" PRIMARY KEY ("device_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_device_action
-- ----------------------------
ALTER TABLE "public"."sd_iot_device_action" ADD CONSTRAINT "PK_a146554159a27494fd0c4cb0414" PRIMARY KEY ("device_action_user_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_device_action_log
-- ----------------------------
ALTER TABLE "public"."sd_iot_device_action_log" ADD CONSTRAINT "PK_18e2a97db2a742f43c79aba5e2c" PRIMARY KEY ("log_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_device_action_user
-- ----------------------------
ALTER TABLE "public"."sd_iot_device_action_user" ADD CONSTRAINT "PK_46ce2368b97b8d88ad749ff3f7a" PRIMARY KEY ("device_action_user_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_device_alarm_action
-- ----------------------------
ALTER TABLE "public"."sd_iot_device_alarm_action" ADD CONSTRAINT "PK_263a057ba286325ecfadbf7d659" PRIMARY KEY ("alarm_action_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_device_type
-- ----------------------------
ALTER TABLE "public"."sd_iot_device_type" ADD CONSTRAINT "PK_f89dccdad875b086b9167167bb9" PRIMARY KEY ("type_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_email
-- ----------------------------
ALTER TABLE "public"."sd_iot_email" ADD CONSTRAINT "PK_63215aa6e2f4e97a7fe631e9fd5" PRIMARY KEY ("email_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_group
-- ----------------------------
ALTER TABLE "public"."sd_iot_group" ADD CONSTRAINT "PK_b0ae5d1b99f0d240d56dc942b7a" PRIMARY KEY ("group_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_host
-- ----------------------------
ALTER TABLE "public"."sd_iot_host" ADD CONSTRAINT "PK_83184ad44ec9393718f3cda4081" PRIMARY KEY ("host_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_influxdb
-- ----------------------------
ALTER TABLE "public"."sd_iot_influxdb" ADD CONSTRAINT "PK_d6f4a4dc78c43ddaab90a832f2f" PRIMARY KEY ("influxdb_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_line
-- ----------------------------
ALTER TABLE "public"."sd_iot_line" ADD CONSTRAINT "PK_7a6a9f138ca9a811e345e59d146" PRIMARY KEY ("line_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_location
-- ----------------------------
ALTER TABLE "public"."sd_iot_location" ADD CONSTRAINT "PK_c56a6e8e084b1bc520fc82d8ade" PRIMARY KEY ("location_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_mqtt
-- ----------------------------
ALTER TABLE "public"."sd_iot_mqtt" ADD CONSTRAINT "PK_7e9215a0c1ac3510c3f8c6ea292" PRIMARY KEY ("mqtt_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_nodered
-- ----------------------------
ALTER TABLE "public"."sd_iot_nodered" ADD CONSTRAINT "PK_5955209b50a4dac0a439790f161" PRIMARY KEY ("nodered_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_schedule
-- ----------------------------
ALTER TABLE "public"."sd_iot_schedule" ADD CONSTRAINT "PK_380784b437a7a4f03489497dbef" PRIMARY KEY ("schedule_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_schedule_device
-- ----------------------------
ALTER TABLE "public"."sd_iot_schedule_device" ADD CONSTRAINT "PK_bcb83b896d2e0b92b2a019b09de" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_iot_sensor
-- ----------------------------
ALTER TABLE "public"."sd_iot_sensor" ADD CONSTRAINT "PK_6fc823992a8c07c5f40113f3e12" PRIMARY KEY ("sensor_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_setting
-- ----------------------------
ALTER TABLE "public"."sd_iot_setting" ADD CONSTRAINT "PK_fdf8830bacecfa04143cbf0ce89" PRIMARY KEY ("setting_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_sms
-- ----------------------------
ALTER TABLE "public"."sd_iot_sms" ADD CONSTRAINT "PK_f4546266bbae472c27c3476edb0" PRIMARY KEY ("sms_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_telegram
-- ----------------------------
ALTER TABLE "public"."sd_iot_telegram" ADD CONSTRAINT "PK_08af27f615221874350bf2bf792" PRIMARY KEY ("telegram_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_token
-- ----------------------------
ALTER TABLE "public"."sd_iot_token" ADD CONSTRAINT "PK_c3868ec03fed99f843e31ad977c" PRIMARY KEY ("token_id");

-- ----------------------------
-- Primary Key structure for table sd_iot_type
-- ----------------------------
ALTER TABLE "public"."sd_iot_type" ADD CONSTRAINT "PK_1047517b57c47c748f0b71a4105" PRIMARY KEY ("type_id");

-- ----------------------------
-- Primary Key structure for table sd_module_log
-- ----------------------------
ALTER TABLE "public"."sd_module_log" ADD CONSTRAINT "PK_c1a8b4c821557a69dfc69a8a5c8" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_mqtt_host
-- ----------------------------
ALTER TABLE "public"."sd_mqtt_host" ADD CONSTRAINT "sd_mqtt_host_copy1_copy1_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_mqtt_log
-- ----------------------------
ALTER TABLE "public"."sd_mqtt_log" ADD CONSTRAINT "PK_b33f3a088e46bb23797c2d33edd" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_notification_channel
-- ----------------------------
ALTER TABLE "public"."sd_notification_channel" ADD CONSTRAINT "PK_2b1c899f366f13410236d4e9fa1" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table sd_notification_condition
-- ----------------------------
CREATE INDEX "IDX_25494d634f9621ad079daec13c" ON "public"."sd_notification_condition" USING btree (
  "notification_type_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_49b905d65431649bc212f20a6d" ON "public"."sd_notification_condition" USING btree (
  "device_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_d26fd1ce5db5c3dd92a1dc1b1a" ON "public"."sd_notification_condition" USING btree (
  "is_active" "pg_catalog"."bool_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table sd_notification_condition
-- ----------------------------
ALTER TABLE "public"."sd_notification_condition" ADD CONSTRAINT "sd_notification_condition_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table sd_notification_log
-- ----------------------------
CREATE INDEX "IDX_3d150ec64375173c4f27efb6f9" ON "public"."sd_notification_log" USING btree (
  "device_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_88bac5a8ae856939e870c4a13f" ON "public"."sd_notification_log" USING btree (
  "created_at" "pg_catalog"."timestamp_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_90cc105722e1b46d6a10b5444f" ON "public"."sd_notification_log" USING btree (
  "notification_channel_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_cd5cc0f1d5d812465add3e569d" ON "public"."sd_notification_log" USING btree (
  "status" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_ee087e6cacad4d3d098bab8027" ON "public"."sd_notification_log" USING btree (
  "notification_type_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table sd_notification_log
-- ----------------------------
ALTER TABLE "public"."sd_notification_log" ADD CONSTRAINT "PK_633c2f71be7fcc58beca1fad40d" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_notification_type
-- ----------------------------
ALTER TABLE "public"."sd_notification_type" ADD CONSTRAINT "PK_6d74a641637a2ee94790bc6b979" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table sd_report_data
-- ----------------------------
CREATE INDEX "IDX_2148a915b609d38340c5812227" ON "public"."sd_report_data" USING btree (
  "report_type" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_4df625097b3331dad4be63a8d8" ON "public"."sd_report_data" USING btree (
  "period_end" "pg_catalog"."timestamp_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_4ff14a6cd1fa03ca4448b11327" ON "public"."sd_report_data" USING btree (
  "generated_at" "pg_catalog"."timestamp_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_99e2c5e5eed97cf19c51bd3ea2" ON "public"."sd_report_data" USING btree (
  "device_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_c7f39b3aa53d47f64259906042" ON "public"."sd_report_data" USING btree (
  "period_start" "pg_catalog"."timestamp_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table sd_report_data
-- ----------------------------
ALTER TABLE "public"."sd_report_data" ADD CONSTRAINT "sd_report_data_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_schedule_process_log
-- ----------------------------
ALTER TABLE "public"."sd_schedule_process_log" ADD CONSTRAINT "PK_43d2cfd6e887bfb6dd522e78465" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table sd_sensor_data
-- ----------------------------
CREATE INDEX "IDX_0f59f691016851da7f1097a92c" ON "public"."sd_sensor_data" USING btree (
  "device_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_5559f4cfeaa50599566e7384f7" ON "public"."sd_sensor_data" USING btree (
  "notification_type_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IDX_cd47c9bab2d578b9007e5472a4" ON "public"."sd_sensor_data" USING btree (
  "timestamp" "pg_catalog"."timestamp_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table sd_sensor_data
-- ----------------------------
ALTER TABLE "public"."sd_sensor_data" ADD CONSTRAINT "sd_sensor_data_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table sd_system_setting
-- ----------------------------
CREATE INDEX "IDX_6bac4ab93a5095fa86f726ffb3" ON "public"."sd_system_setting" USING btree (
  "category" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "IDX_bc547caaa8b5259f4a444d0aad" ON "public"."sd_system_setting" USING btree (
  "key" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table sd_system_setting
-- ----------------------------
ALTER TABLE "public"."sd_system_setting" ADD CONSTRAINT "PK_f742ee421ba099b556672818c0f" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_user
-- ----------------------------
ALTER TABLE "public"."sd_user" ADD CONSTRAINT "PK_c804add3ec6e26d0bb85dd4b5b6" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_user_access_menu
-- ----------------------------
ALTER TABLE "public"."sd_user_access_menu" ADD CONSTRAINT "PK_b08610dd9113be8c7df7774dbc8" PRIMARY KEY ("user_access_id");

-- ----------------------------
-- Primary Key structure for table sd_user_file
-- ----------------------------
ALTER TABLE "public"."sd_user_file" ADD CONSTRAINT "PK_bee867c384da15706056a6d4d79" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_user_log
-- ----------------------------
ALTER TABLE "public"."sd_user_log" ADD CONSTRAINT "PK_87948a0ccfe3a88ef1e79914b00" PRIMARY KEY ("id", "log_type_id");

-- ----------------------------
-- Primary Key structure for table sd_user_log_type
-- ----------------------------
ALTER TABLE "public"."sd_user_log_type" ADD CONSTRAINT "PK_3f8b97a85e0528d6c18c4fd20b3" PRIMARY KEY ("log_type_id");

-- ----------------------------
-- Primary Key structure for table sd_user_role
-- ----------------------------
ALTER TABLE "public"."sd_user_role" ADD CONSTRAINT "PK_ce286bbce9874c345c85ba7c6e4" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sd_user_roles_access
-- ----------------------------
ALTER TABLE "public"."sd_user_roles_access" ADD CONSTRAINT "PK_ea1374b87e00872215780b096f7" PRIMARY KEY ("role_id", "role_type_id");

-- ----------------------------
-- Primary Key structure for table sd_user_roles_permision
-- ----------------------------
ALTER TABLE "public"."sd_user_roles_permision" ADD CONSTRAINT "PK_4df7386cc58a6712f2bef59c507" PRIMARY KEY ("role_type_id");

-- ----------------------------
-- Foreign Keys structure for table noti_notification_logs
-- ----------------------------
ALTER TABLE "public"."noti_notification_logs" ADD CONSTRAINT "noti_notification_logs_notification_id_fkey" FOREIGN KEY ("notification_id") REFERENCES "public"."noti_notifications" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table notification_groups_devices_notification_devices
-- ----------------------------
ALTER TABLE "public"."notification_groups_devices_notification_devices" ADD CONSTRAINT "FK_58bcbe19caaf998885dc34b3092" FOREIGN KEY ("notificationDevicesId") REFERENCES "public"."notification_devices" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."notification_groups_devices_notification_devices" ADD CONSTRAINT "FK_7a461c4b72474543392a58d9853" FOREIGN KEY ("notificationGroupsId") REFERENCES "public"."notification_groups" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table sd_activity_log
-- ----------------------------
ALTER TABLE "public"."sd_activity_log" ADD CONSTRAINT "FK_65aba133a9ab96d165cac617072" FOREIGN KEY ("modules_id") REFERENCES "public"."sd_module_log" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."sd_activity_log" ADD CONSTRAINT "FK_99c226870807561efb504a5499b" FOREIGN KEY ("type_id") REFERENCES "public"."sd_activity_type_log" ("typeId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table sd_channel_template
-- ----------------------------
ALTER TABLE "public"."sd_channel_template" ADD CONSTRAINT "FK_ce5d8406020743536c305992dfe" FOREIGN KEY ("channel_id") REFERENCES "public"."sd_notification_channel" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."sd_channel_template" ADD CONSTRAINT "FK_e3d019a62043b9878ed99e3a2ea" FOREIGN KEY ("notification_type_id") REFERENCES "public"."sd_notification_type" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table sd_device_member
-- ----------------------------
ALTER TABLE "public"."sd_device_member" ADD CONSTRAINT "FK_4850040489393def6982925f44d" FOREIGN KEY ("group_id") REFERENCES "public"."sd_device_group" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."sd_device_member" ADD CONSTRAINT "FK_da57e66f9fad59706cc0207ddb4" FOREIGN KEY ("Device_id") REFERENCES "public"."sd_iot_device" ("device_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table sd_device_notification_config
-- ----------------------------
ALTER TABLE "public"."sd_device_notification_config" ADD CONSTRAINT "FK_166cd6c32e68127baa36e91e3b8" FOREIGN KEY ("notification_channel_id") REFERENCES "public"."sd_notification_channel" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."sd_device_notification_config" ADD CONSTRAINT "FK_52dc2a7b6111b9aa908f35ce78d" FOREIGN KEY ("device_id") REFERENCES "public"."sd_iot_device" ("device_id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."sd_device_notification_config" ADD CONSTRAINT "FK_d891f5458655126ed4eaad545a6" FOREIGN KEY ("notification_type_id") REFERENCES "public"."sd_notification_type" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table sd_device_schedule
-- ----------------------------
ALTER TABLE "public"."sd_device_schedule" ADD CONSTRAINT "FK_00f5698ac85f14995796dd6e4f1" FOREIGN KEY ("device_id") REFERENCES "public"."sd_iot_device" ("device_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table sd_device_status_history
-- ----------------------------
ALTER TABLE "public"."sd_device_status_history" ADD CONSTRAINT "FK_e9ecb689be9cfe27f3840f53f98" FOREIGN KEY ("notification_type_id") REFERENCES "public"."sd_notification_type" ("id") ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE "public"."sd_device_status_history" ADD CONSTRAINT "FK_f435db981adb022aaf7eb5224cb" FOREIGN KEY ("device_id") REFERENCES "public"."sd_iot_device" ("device_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table sd_group_notification_config
-- ----------------------------
ALTER TABLE "public"."sd_group_notification_config" ADD CONSTRAINT "FK_1828f55281ae223026c06627f7e" FOREIGN KEY ("notification_channel_id") REFERENCES "public"."sd_notification_channel" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."sd_group_notification_config" ADD CONSTRAINT "FK_a9dcb499890b3a82cbb7dd6af6f" FOREIGN KEY ("group_id") REFERENCES "public"."sd_device_group" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."sd_group_notification_config" ADD CONSTRAINT "FK_f94187512c0480edd556f0dd9ad" FOREIGN KEY ("notification_type_id") REFERENCES "public"."sd_notification_type" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table sd_notification_condition
-- ----------------------------
ALTER TABLE "public"."sd_notification_condition" ADD CONSTRAINT "FK_25494d634f9621ad079daec13c2" FOREIGN KEY ("notification_type_id") REFERENCES "public"."sd_notification_type" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."sd_notification_condition" ADD CONSTRAINT "FK_49b905d65431649bc212f20a6dc" FOREIGN KEY ("device_id") REFERENCES "public"."sd_iot_device" ("device_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table sd_notification_log
-- ----------------------------
ALTER TABLE "public"."sd_notification_log" ADD CONSTRAINT "FK_3d150ec64375173c4f27efb6f92" FOREIGN KEY ("device_id") REFERENCES "public"."sd_iot_device" ("device_id") ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE "public"."sd_notification_log" ADD CONSTRAINT "FK_90cc105722e1b46d6a10b5444f6" FOREIGN KEY ("notification_channel_id") REFERENCES "public"."sd_notification_channel" ("id") ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE "public"."sd_notification_log" ADD CONSTRAINT "FK_ee087e6cacad4d3d098bab8027d" FOREIGN KEY ("notification_type_id") REFERENCES "public"."sd_notification_type" ("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table sd_report_data
-- ----------------------------
ALTER TABLE "public"."sd_report_data" ADD CONSTRAINT "FK_99e2c5e5eed97cf19c51bd3ea2b" FOREIGN KEY ("device_id") REFERENCES "public"."sd_iot_device" ("device_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table sd_sensor_data
-- ----------------------------
ALTER TABLE "public"."sd_sensor_data" ADD CONSTRAINT "FK_0f59f691016851da7f1097a92c6" FOREIGN KEY ("device_id") REFERENCES "public"."sd_iot_device" ("device_id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."sd_sensor_data" ADD CONSTRAINT "FK_5559f4cfeaa50599566e7384f70" FOREIGN KEY ("notification_type_id") REFERENCES "public"."sd_notification_type" ("id") ON DELETE SET NULL ON UPDATE NO ACTION;
