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

 Date: 31/03/2026 19:43:09
*/


-- ----------------------------
-- Table structure for item
-- ----------------------------
DROP TABLE IF EXISTS "public"."item";
CREATE TABLE "public"."item" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "created_at" timestamptz(6),
  "updated_at" timestamptz(6),
  "deleted_at" timestamptz(6),
  "title" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "description" varchar(200) COLLATE "pg_catalog"."default" NOT NULL,
  "owner_id" uuid
)
;

-- ----------------------------
-- Records of item
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS "public"."user";
CREATE TABLE "public"."user" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "created_at" timestamptz(6) NOT NULL DEFAULT now(),
  "updated_at" timestamptz(6) NOT NULL DEFAULT now(),
  "deleted_at" timestamptz(6),
  "name" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "is_active" bool NOT NULL DEFAULT true,
  "is_super_user" bool NOT NULL DEFAULT false,
  "verified" bool NOT NULL DEFAULT false,
  "verification_code" varchar(32) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "password_reset_token" varchar(32) COLLATE "pg_catalog"."default" DEFAULT NULL::character varying,
  "password_reset_at" timestamptz(6)
)
;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO "public"."user" VALUES ('6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', '2026-03-31 19:07:14.339724+07', '2026-03-31 19:07:14.339724+07', NULL, 'root', 'root@gmail.com', '$2a$10$g33en5/JjLFJxNdlILZE0uZ/fJe.FVH8J4qxhihJSRmh0oH/ZxYyu', 't', 't', 't', NULL, NULL, NULL);

-- ----------------------------
-- Indexes structure for table item
-- ----------------------------
CREATE INDEX "idx_item_deleted_at" ON "public"."item" USING btree (
  "deleted_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table item
-- ----------------------------
ALTER TABLE "public"."item" ADD CONSTRAINT "item_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table user
-- ----------------------------
CREATE INDEX "idx_user_deleted_at" ON "public"."user" USING btree (
  "deleted_at" "pg_catalog"."timestamptz_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "idx_user_email" ON "public"."user" USING btree (
  "email" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table user
-- ----------------------------
ALTER TABLE "public"."user" ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table item
-- ----------------------------
ALTER TABLE "public"."item" ADD CONSTRAINT "fk_user_items" FOREIGN KEY ("owner_id") REFERENCES "public"."user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
