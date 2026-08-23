# รายงานผลการทดสอบ API — iCmon

- **วันที่**: 2026-08-15
- **Backend**: `C:\github\icmongolang` (รันใน Docker container `icmongolang-api-1`)
- **ฐานข้อมูล**: PostgreSQL 15 (pgvector) บน port `5435` ใน Docker `icmongolang-db-1`
- **Config**: อ่านจาก `C:\github\icmongolang\.env`
  - `SERVER_PORT=5000`, `SERVER_MODE=Development`, `SERVER_APP_VERSION=v0.0.1`
  - `FIRST_SUPER_USER_EMAIL=admin@icmongolang.local`, `FIRST_SUPER_USER_PASSWORD=admin1234`
  - JWT RSA keypair จาก `.env` ยืนยันตรงกับ token ที่ login ได้ (access_token ยาว 634 chars)

## 1. ขั้นตอนที่ทำ

1. Login ผ่านจริงด้วย superuser (`POST /api/auth/signin`) ใช้ค่า email/password จาก `.env` → ได้ access_token
2. เรียก API ครอบคลุมทุกโมดูลหลัก (public + protected) ด้วย token
3. พบจุดล้มเหลว 2 จุด → แก้ที่ backend → วิ่ง test ซ้ำจนครบ

## 2. ผลการทดสอบรอบแรก (ก่อนแก้)

| # | Endpoint | ผล | สาเหตุ |
|---|----------|----|--------|
| 1 | GET /api/ping, /health, /api/auth/publickey | ✅ 200 | - |
| 2 | POST /api/auth/signin | ✅ 200 | - |
| 3 | /api/user/me, /api/user/, /api/item/, /api/customer/, /api/job/, /api/quotation/, /api/car/ | ✅ 200 | - |
| 4 | /api/dashboard/stats, /revenue | ✅ 200 | - |
| 5 | /api/documents, /api/batch/jobs, /api/i18n/translations, /api/wos/orders | ✅ 200 | - |
| 6 | GET /reports/customer-list/pdf | ✅ 200 (74KB) | - |
| 7 | **GET /api/purchase-orders/** | ❌ **400** | ตาราง `t_purchase_order_header` ไม่มีใน DB |
| 8 | **GET /api/payments/** | ❌ **405** | backend ไม่มี route `GET /payments/` |

**สรุปรอบแรก**: ผ่าน 18 / ล้มเหลว 2

## 3. ปัญหาที่พบและวิธีแก้ (backend)

### 3.1 purchase-orders → 400 (ตารางไม่ถูกสร้าง)

**สาเหตุ**: `cmd/migrate.go` ไม่ได้รวม models ของโมดูล purchaseorder (`internal/modules/purchaseorder/models`),
ทำให้ GORM AutoMigrate ไม่สร้างตาราง `t_purchase_order_header`, `t_purchase_order_detail`,
`t_purchase_order_status_history`

**ไฟล์ที่แก้** (`C:\github\icmongolang\cmd\migrate.go`):
- เพิ่ม import `pomodels "icmongolang/internal/modules/purchaseorder/models"`
- เพิ่ม `&pomodels.PurchaseOrderHeader{}`, `&pomodels.PurchaseOrderDetail{}`, `&pomodels.PurchaseOrderStatusHistory{}` ใน `allModels`

**ผล**: รัน `go run main.go migrate` → สร้างตารางครบ 3 ตาราง → endpoint กลับมา 200

### 3.2 payments → 405 (ไม่มี GET list)

**สาเหตุ**: โมดูล payment มี route `POST /payments/`, `POST /payments/search` แต่ไม่มี `GET /payments/`

**ไฟล์ที่แก้** (`C:\github\icmongolang\internal\modules\payment\`):
- `handler.go`: เพิ่ม `List()` ใน interface `Handlers`
- `delivery/http/handlers.go`: เพิ่ม handler `List()` (pagination: `page`, `per_page`) เรียก `GetMulti` + `Count`
- `delivery/http/routes.go`: เพิ่ม `r.Get("/", h.List())`

**เจอต่อ**: หลังเพิ่ม route กลายเป็น 400 — ตาราง `t_payment` เป็น schema เก่า ไม่มีคอลัมน์ `deleted`
และ `m_payment_method` ยังไม่ถูกสร้าง เพราะ `models.Payment`, `models.Receipt`, `models.PaymentMethod`,
`models.PaymentHistory`, `models.OutstandingBalance` ไม่เคยอยู่ใน migrate list

**แก้เพิ่ม** (`cmd/migrate.go`): เพิ่ม models payment ทั้ง 5 ตัวใน `allModels` แล้วรัน migrate อีกครั้ง
→ AutoMigrate เพิ่มคอลัมน์ที่ขาด (`deleted`, `payment_method_id`, ...) และสร้าง `m_payment_method` → endpoint กลับมา 200

## 4. ผลการทดสอบรอบสุดท้าย

| # | Endpoint | ผล |
|---|----------|----|
| 1 | GET /api/ping | ✅ 200 |
| 2 | GET /health | ✅ 200 |
| 3 | GET /api/auth/publickey | ✅ 200 |
| 4 | POST /api/auth/signin | ✅ 200 |
| 5 | GET /api/user/me | ✅ 200 |
| 6 | GET /api/user/ (list) | ✅ 200 |
| 7 | GET /api/item/ (list) | ✅ 200 |
| 8 | GET /api/customer/ (list) | ✅ 200 |
| 9 | GET /api/job/ (list) | ✅ 200 |
| 10 | GET /api/quotation/ (list) | ✅ 200 |
| 11 | GET /api/purchase-orders/ | ✅ 200 |
| 12 | GET /api/payments/ | ✅ 200 |
| 13 | GET /api/dashboard/stats | ✅ 200 |
| 14 | GET /api/dashboard/revenue | ✅ 200 |
| 15 | GET /api/documents | ✅ 200 |
| 16 | GET /api/batch/jobs | ✅ 200 |
| 17 | GET /api/i18n/translations | ✅ 200 |
| 18 | GET /api/wos/orders | ✅ 200 |
| 19 | GET /api/car/ (list) | ✅ 200 |
| 20 | GET /reports/customer-list/pdf | ✅ 200 |

**ผ่านทั้งหมด: 20 / 20** ✅

## 5. ไฟล์ที่แก้ไข (backend)

| ไฟล์ | การแก้ไข |
|------|---------|
| `cmd/migrate.go` | เพิ่ม purchaseorder + payment models ใน migrate list |
| `internal/modules/payment/handler.go` | เพิ่ม `List()` ใน interface |
| `internal/modules/payment/delivery/http/handlers.go` | เพิ่ม handler `List()` |
| `internal/modules/payment/delivery/http/routes.go` | เพิ่ม `GET /payments/` |

> หมายเหตุ: แก้ที่ repo `C:\github\icmongolang` (ตัว backend ที่รันจริงใน Docker) ไม่ใช่ `golangapi/`
> ที่เป็น copy อยู่ใน angular-clean-architecture

## 6. หมายเหตุ

- การ migrate ใน container ใช้ env `POSTGRES_HOST=db` (docker network) โดยรัน
  `docker exec icmongolang-api-1 sh -c "cd /app && go run main.go migrate"`
- หลังแก้ code ต้อง restart container `icmongolang-api-1` เพราะ `air` บน Windows mount
  ไม่ตรวจจับการเปลี่ยนแปลงไฟล์ได้เสมอไป
- Script ตรวจสอบ: `C:\Users\kongn\AppData\Local\Temp\opencode\icmon-verify-api.ps1`
