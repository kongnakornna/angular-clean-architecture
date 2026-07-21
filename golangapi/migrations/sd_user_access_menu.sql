/*
 Navicat Premium Dump SQL

 Source Server         : 127.0.0.1
 Source Server Type    : PostgreSQL
 Source Server Version : 170006 (170006)
 Source Host           : 127.0.0.1:5432
 Source Catalog        : db
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 170006 (170006)
 File Encoding         : 65001

 Date: 06/04/2026 00:18:27
*/


-- ----------------------------
-- Table structure for sd_user_access_menu
-- ----------------------------
DROP TABLE IF EXISTS "public"."sd_user_access_menu";
CREATE TABLE "public"."sd_user_access_menu" (
  "user_access_id" int8 NOT NULL DEFAULT nextval('sd_user_access_menu_user_access_id_seq'::regclass),
  "user_type_id" int8,
  "menu_id" int8,
  "parent_id" int8
)
;

-- ----------------------------
-- Records of sd_user_access_menu
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table sd_user_access_menu
-- ----------------------------
ALTER TABLE "public"."sd_user_access_menu" ADD CONSTRAINT "sd_user_access_menu_pkey" PRIMARY KEY ("user_access_id");
