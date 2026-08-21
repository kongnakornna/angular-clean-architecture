# 05 — Feature Modules Reference

ทุกโมดูลใน `src/app/features/` ใช้โครงสร้าง domain / data / presentation เหมือนกัน
(ดูรายละเอียดโครงสร้าง → [03-project-structure.md](03-project-structure.md))

---

## Auth (`features/auth/`)

ระบบยืนยันตัวตน + จัดการผู้ใช้และสิทธิ์

| ส่วน | Path |
|------|------|
| Entities | `domain/entities/user.entity.ts`, `permission.entity.ts` |
| Repo Interface | `domain/repositories/auth.repository.ts` |
| Use Cases | login, logout, refresh-token, forgot-password, reset-password, sign-up, check-permission + role CRUD (list/get/create/update/delete/assign-permissions) |
| API DataSource | `data/datasources/auth.api.datasource.ts` |
| Repo Impl | `data/repositories/auth.repository.impl.ts` |
| Demo Repo | `data/repositories/auth.repository.demo.ts` |
| Pages | login, forgot-password, reset-password, sign-up, lock-screen, two-step-verification, two-step-code, user-list, user-create, user-edit, role-list, theme-settings |
| Layout | `presentation/layouts/auth-layout/` |

**Demo credentials:** `admin / P@ssw0rd`

## Job Card (`features/job-card/`)

งานซ่อม/ติดตั้ง — มี Module แยก lazy-loaded ผ่าน `loadChildren`

**Sub-routes:** `/jobs`, `/jobs/board`, `/jobs/create`, `/jobs/:id`, `/jobs/edit/:id`

- **Entity:** `JobCard` (18 fields)
- **Enums:** `JobStatus` (6 states), `JobPriority` (4 levels)

```
PENDING → ASSIGNED → IN_PROGRESS → COMPLETED → CLOSED
                    ↘ ON_HOLD ↗
```

**Use Cases:** create, update, get, list, assign, updateStatus

## Customer (`features/customer/`)

- **Entities:** `Customer`, `CustomerContact`
- **Use Cases:** create, update, delete, get, list, search
- **Pages:** customer-list, customer-detail, customer-create

## Quotation (`features/quotation/`)

- **Entities:** `Quotation`, `QuotationItem`, enum `QuotationStatus`

```
DRAFT → SENT → UNDER_REVIEW → APPROVED → CONVERTED_TO_PO
                            ↘ REJECTED
```

- **Use Cases:** create, update, get, list, approve, reject

## Purchase Order (`features/purchase-order/`)

- **Entities:** `PurchaseOrder`, `POItem`, enum `POStatus`

```
DRAFT → PENDING_APPROVAL → APPROVED → ORDERED → SHIPPED → DELIVERED
                        ↘ REJECTED
```

## Inventory (`features/inventory/`)

- **Entities:** `Product`, `Category`, `StockMovement`
- **Use Cases:** create, update, get, list, adjustStock, getMovements
- **Pages:** product-list, product-detail, product-create, stock-adjustment

## Payment (`features/payment/`)

- **Entities:** `Payment`, `Invoice`, enum `PaymentStatus`
- **Use Cases:** create, get, list, verify, generateInvoice
- **Pages:** payment-list, invoice-view

## Dashboard (`features/dashboard/`)

- **Pages:** main-dashboard, reports, analytics
- ⚠️ ปัจจุบันใช้ mock data (`setTimeout`) — ยังไม่ได้ต่อ repository จริง

## Document (`features/document/`)

- **Entities:** `AppDocument`, `DocumentFolder`
- **Use Cases:** upload, list, get, delete, share

## Email (`features/email/`)

- **Entities:** `EmailTemplate`, `EmailLog`
- **Use Cases:** send, sendBulk, createTemplate, getLogs
- **Pages:** email-templates, email-compose, email-logs

## Batch (`features/batch/`)

- **Entities:** `BatchJob`, `BatchJobHistory`
- **Use Cases:** create, list, get, getHistory, trigger

## IoT (`features/iot/`)

- **Entities:** `Device`, `GPSData`, `SensorData`
- **Pages:** device-list, iot-settings, iot-reports

## MQTT (`features/mqtt/`)

- **Pages:** mqtt-dashboard, mqtt-flow-editor (Node-RED style flow)

## WOS — Web Order System (`features/wos/`)

ระบบสั่งซื้อฝั่งลูกค้า

- **Entities:** `WebOrder`, `OrderItem`, enum `OrderStatus`
- **Use Cases:** create, list, get, updateStatus, cancel

## AI Analytics (`features/ai-analytics/`)

Dashboard วิเคราะห์ด้วย AI — routes แยกไฟล์ `ai-analytics.routes.ts`

## AI Chatbot (`features/ai-chatbot/`)

Chatbot ต่อ Ollama (`ollamaUrl` + `ollamaModel` ใน environment)

## Monitoring (`features/monitoring/`)

โมดูล monitoring — routes แยกไฟล์ `monitoring.routes.ts`

## Report (`features/report/`)

โมดูลรายงาน — routes แยกไฟล์ `report.routes.ts`

## Settings (`features/settings/`)

การตั้งค่าระบบ — มี repository แยกหลายตัว:

Schedule, Location, Hardware, Sensor, Node-RED,
LINE Notification, SMS Notification, Host, API Setting, Token

Routes แยกไฟล์ `settings.routes.ts`

## โมดูลที่ยังไม่มี Presentation (domain/data เท่านั้น)

| โมดูล | สถานะ |
|-------|-------|
| `alarm` | มี entities + repo interface/impl — ยังไม่มี UI |
| `orders` | มี entities + repo — ยังไม่มี UI |
| `system` | มี entities + repo — ยังไม่มี UI |
| `websocket` | มี entities + repo — ยังไม่มี UI |

## Shared i18n (`shared/i18n/`)

โมดูลแปลภาษาแบบ Clean Architecture เต็มรูปแบบ:

- `domain/` — Translation entity + use cases + repo interface
- `data/` — Local datasource (hard-coded TH/EN) + repo impl
- `presentation/` — LanguageSelector page + pipe

ไฟล์แปลหลัก: `src/assets/i18n/{en,th,zh,vi,my,ms,lo,ko,km,ja}.json`
