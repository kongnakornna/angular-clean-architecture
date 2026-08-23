# 🏗️ ระบบบริหารจัดการธุรกิจแบบครบวงจร
## บน Angular Clean Architecture + Tabler UI Theme

---

# 1. บทนำและภาพรวมระบบ

## 1.1 วัตถุประสงค์
ระบบนี้ถูกออกแบบมาเพื่อรองรับการดำเนินงานของธุรกิจขนาดกลางถึงขนาดใหญ่ ครอบคลุมตั้งแต่การจัดการลูกค้า การเสนอราคา การสั่งซื้อ การจัดการสต็อก ไปจนถึงการติดตามงานและการชำระเงิน โดยนำหลักการ **Clean Architecture** มาใช้เพื่อให้ระบบมีความยืดหยุ่น บำรุงรักษาง่าย และสามารถขยายขีดความสามารถได้ในอนาคต

## 1.2 กลุ่มผู้ใช้งาน
| บทบาท | สิทธิ์ | โมดูลที่เกี่ยวข้อง |
|--------|--------|-------------------|
| **Admin** | สิทธิ์สูงสุด | ทุกโมดูล + จัดการผู้ใช้ + ดูรายงานทั้งหมด |
| **Manager** | สิทธิ์ระดับบริหาร | Job Card, Quotation, Purchase Order, Dashboard, Reports |
| **Staff** | สิทธิ์ปฏิบัติการ | Job Card, Customer Management, Inventory (ดู/แก้ไขบางส่วน) |
| **Technician** | สิทธิ์หน้างาน | Job Card (อัปเดตสถานะ), GPS Tracking, IoT |
| **Customer** | สิทธิ์จำกัด | Web Order System (WOS), ดูสถานะ订单 |

## 1.3 เทคโนโลยีหลัก
| องค์ประกอบ | เทคโนโลยี |
|------------|-----------|
| **Frontend** | Angular 18+ (Standalone Components), Tabler UI Theme, angular-tabler-icons |
| **State Management** | Signals + @ngrx/component-store |
| **Backend API** | Node.js (NestJS) / .NET Core 8 |
| **ฐานข้อมูล** | PostgreSQL (หลัก) + MongoDB (สำหรับ Document Management) |
| **Cache** | Redis |
| **Real-time** | Socket.IO (สำหรับ GPS Tracking) |
| **Queue** | BullMQ (Batch Jobs) |
| **Authentication** | JWT + Refresh Token |

---

# 2. สถาปัตยกรรมระบบ

## 2.1 แผนภาพสถาปัตยกรรมระดับสูง (High-Level Architecture)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PRESENTATION LAYER                                │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐      │
│  │   Pages      │ │   Layouts    │ │   Shared     │ │   Components │      │
│  │ (Routing)    │ │ (Sidebar,    │ │ (Buttons,    │ │ (Reusable)   │      │
│  │              │ │  Header,     │ │  Cards,      │ │              │      │
│  │              │ │  Footer)     │ │  Modals)     │ │              │      │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘      │
│                              ▼                                             │
│                    [Angular Router + Guards]                                │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                             DOMAIN LAYER                                   │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐      │
│  │   Entities   │ │  Use Cases   │ │ Repositories │ │   Services   │      │
│  │ (Business    │ │ (Business    │ │ (Interfaces) │ │ (Domain      │      │
│  │  Objects)    │ │  Logic)      │ │              │ │  Services)   │      │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘      │
│                                                                             │
│  หลักการ: ไม่มีการพึ่งพาภายนอก — บริสุทธิ์ (Pure Business Logic)             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DATA LAYER                                    │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐      │
│  │ Repositories │ │  DataSources │ │    DTOs      │ │   Mappers    │      │
│  │ (Implements  │ │ (API, Local, │ │ (Data        │ │ (Entity ↔    │      │
│  │  Interfaces) │ │  Cache)      │ │  Transfer)   │ │  DTO)        │      │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘      │
│                                                                             │
│  หลักการ: จัดการข้อมูลจากภายนอก — เปลี่ยนรูปแบบให้ Domain เข้าใจได้         │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CORE LAYER                                      │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐      │
│  │   Config     │ │   Utils      │ │  Constants   │ │  Interceptors│      │
│  │ (App Settings│ │ (Helpers,    │ │ (Enums,      │ │ (HTTP,       │      │
│  │  Environment)│ │  Validators) │ │  Status)     │ │  Auth)       │      │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘      │
│                                                                             │
│  หลักการ: กลไกสนับสนุนการทำงานของทุกเลเยอร์                                │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 2.2 แผนภาพโครงสร้างโปรเจกต์ Angular (Folder Structure)

```
src/
├── app/
│   ├── core/                              # ⚙️ Core Layer
│   │   ├── config/
│   │   │   ├── app.config.ts              # ค่ากำหนดหลัก
│   │   │   └── api.config.ts              # API Endpoints
│   │   ├── constants/
│   │   │   ├── app.constants.ts
│   │   │   └── enums.ts                   # Enum ทั่วทั้งระบบ
│   │   ├── utils/
│   │   │   ├── validators.ts
│   │   │   ├── formatters.ts
│   │   │   └── helpers.ts
│   │   └── interceptors/
│   │       ├── auth.interceptor.ts
│   │       └── error.interceptor.ts
│   │
│   ├── shared/                            # 🔄 Shared Components
│   │   ├── components/
│   │   │   ├── buttons/
│   │   │   ├── cards/
│   │   │   ├── modals/
│   │   │   ├── tables/
│   │   │   └── forms/
│   │   ├── directives/
│   │   ├── pipes/
│   │   └── guards/
│   │
│   ├── features/                          # 📦 Feature Modules (Lazy Loading)
│   │   │
│   │   ├── auth/                          # 🔐 โมดูลที่ 1: Authentication
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   ├── user.entity.ts
│   │   │   │   │   └── permission.entity.ts
│   │   │   │   ├── use-cases/
│   │   │   │   │   ├── login.use-case.ts
│   │   │   │   │   ├── logout.use-case.ts
│   │   │   │   │   ├── refresh-token.use-case.ts
│   │   │   │   │   └── check-permission.use-case.ts
│   │   │   │   └── repositories/
│   │   │   │       └── auth.repository.ts
│   │   │   ├── data/
│   │   │   │   ├── repositories/
│   │   │   │   │   └── auth.repository.impl.ts
│   │   │   │   ├── datasources/
│   │   │   │   │   └── auth.api.datasource.ts
│   │   │   │   └── dtos/
│   │   │   │       ├── login-request.dto.ts
│   │   │   │       └── login-response.dto.ts
│   │   │   └── presentation/
│   │   │       ├── pages/
│   │   │       │   ├── login/
│   │   │       │   └── forgot-password/
│   │   │       └── components/
│   │   │           └── permission-guard/
│   │   │
│   │   ├── job-card/                      # 📋 โมดูลที่ 2: Job Card Management
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   ├── job-card.entity.ts
│   │   │   │   │   ├── job-status.enum.ts
│   │   │   │   │   └── job-priority.enum.ts
│   │   │   │   ├── use-cases/
│   │   │   │   │   ├── create-job.use-case.ts
│   │   │   │   │   ├── update-job.use-case.ts
│   │   │   │   │   ├── get-job.use-case.ts
│   │   │   │   │   ├── list-jobs.use-case.ts
│   │   │   │   │   ├── assign-job.use-case.ts
│   │   │   │   │   └── update-job-status.use-case.ts
│   │   │   │   └── repositories/
│   │   │   │       └── job-card.repository.ts
│   │   │   ├── data/
│   │   │   │   ├── repositories/
│   │   │   │   │   └── job-card.repository.impl.ts
│   │   │   │   ├── datasources/
│   │   │   │   │   └── job-card.api.datasource.ts
│   │   │   │   └── dtos/
│   │   │   │       ├── create-job-request.dto.ts
│   │   │   │       └── job-response.dto.ts
│   │   │   └── presentation/
│   │   │       ├── pages/
│   │   │       │   ├── job-list/
│   │   │       │   ├── job-detail/
│   │   │       │   ├── job-create/
│   │   │       │   └── job-board/         # Kanban View
│   │   │       └── components/
│   │   │           ├── job-card/
│   │   │           ├── job-filters/
│   │   │           └── job-timeline/
│   │   │
│   │   ├── customer/                      # 👤 โมดูลที่ 3: Customer Management
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   ├── customer.entity.ts
│   │   │   │   │   └── customer-contact.entity.ts
│   │   │   │   ├── use-cases/
│   │   │   │   │   ├── create-customer.use-case.ts
│   │   │   │   │   ├── update-customer.use-case.ts
│   │   │   │   │   ├── get-customer.use-case.ts
│   │   │   │   │   ├── list-customers.use-case.ts
│   │   │   │   │   └── search-customers.use-case.ts
│   │   │   │   └── repositories/
│   │   │   │       └── customer.repository.ts
│   │   │   ├── data/
│   │   │   │   ├── repositories/
│   │   │   │   │   └── customer.repository.impl.ts
│   │   │   │   ├── datasources/
│   │   │   │   │   └── customer.api.datasource.ts
│   │   │   │   └── dtos/
│   │   │   │       └── customer-response.dto.ts
│   │   │   └── presentation/
│   │   │       ├── pages/
│   │   │       │   ├── customer-list/
│   │   │       │   ├── customer-detail/
│   │   │       │   └── customer-create/
│   │   │       └── components/
│   │   │           └── customer-search/
│   │   │
│   │   ├── quotation/                     # 📄 โมดูลที่ 4: Quotation
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   ├── quotation.entity.ts
│   │   │   │   │   ├── quotation-item.entity.ts
│   │   │   │   │   └── quotation-status.enum.ts
│   │   │   │   ├── use-cases/
│   │   │   │   │   ├── create-quotation.use-case.ts
│   │   │   │   │   ├── update-quotation.use-case.ts
│   │   │   │   │   ├── get-quotation.use-case.ts
│   │   │   │   │   ├── list-quotations.use-case.ts
│   │   │   │   │   ├── approve-quotation.use-case.ts
│   │   │   │   │   └── reject-quotation.use-case.ts
│   │   │   │   └── repositories/
│   │   │   │       └── quotation.repository.ts
│   │   │   ├── data/
│   │   │   │   ├── repositories/
│   │   │   │   │   └── quotation.repository.impl.ts
│   │   │   │   ├── datasources/
│   │   │   │   │   └── quotation.api.datasource.ts
│   │   │   │   └── dtos/
│   │   │   │       ├── create-quotation-request.dto.ts
│   │   │   │       └── quotation-response.dto.ts
│   │   │   └── presentation/
│   │   │       ├── pages/
│   │   │       │   ├── quotation-list/
│   │   │       │   ├── quotation-detail/
│   │   │       │   └── quotation-create/
│   │   │       └── components/
│   │   │           ├── quotation-pdf/
│   │   │           └── quotation-items/
│   │   │
│   │   ├── purchase-order/                # 🛒 โมดูลที่ 5: Purchase Order
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   ├── purchase-order.entity.ts
│   │   │   │   │   ├── po-item.entity.ts
│   │   │   │   │   └── po-status.enum.ts
│   │   │   │   ├── use-cases/
│   │   │   │   │   ├── create-po.use-case.ts
│   │   │   │   │   ├── update-po.use-case.ts
│   │   │   │   │   ├── get-po.use-case.ts
│   │   │   │   │   ├── list-pos.use-case.ts
│   │   │   │   │   └── approve-po.use-case.ts
│   │   │   │   └── repositories/
│   │   │   │       └── purchase-order.repository.ts
│   │   │   ├── data/
│   │   │   │   ├── repositories/
│   │   │   │   │   └── purchase-order.repository.impl.ts
│   │   │   │   ├── datasources/
│   │   │   │   │   └── po.api.datasource.ts
│   │   │   │   └── dtos/
│   │   │   │       └── po-response.dto.ts
│   │   │   └── presentation/
│   │   │       ├── pages/
│   │   │       │   ├── po-list/
│   │   │       │   ├── po-detail/
│   │   │       │   └── po-create/
│   │   │       └── components/
│   │   │           └── po-approval/
│   │   │
│   │   ├── inventory/                     # 📦 โมดูลที่ 6: Inventory Management
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   ├── product.entity.ts
│   │   │   │   │   ├── category.entity.ts
│   │   │   │   │   └── stock-movement.entity.ts
│   │   │   │   ├── use-cases/
│   │   │   │   │   ├── create-product.use-case.ts
│   │   │   │   │   ├── update-product.use-case.ts
│   │   │   │   │   ├── get-product.use-case.ts
│   │   │   │   │   ├── list-products.use-case.ts
│   │   │   │   │   ├── adjust-stock.use-case.ts
│   │   │   │   │   └── get-stock-movements.use-case.ts
│   │   │   │   └── repositories/
│   │   │   │       └── inventory.repository.ts
│   │   │   ├── data/
│   │   │   │   ├── repositories/
│   │   │   │   │   └── inventory.repository.impl.ts
│   │   │   │   ├── datasources/
│   │   │   │   │   └── inventory.api.datasource.ts
│   │   │   │   └── dtos/
│   │   │   │       └── product-response.dto.ts
│   │   │   └── presentation/
│   │   │       ├── pages/
│   │   │       │   ├── product-list/
│   │   │       │   ├── product-detail/
│   │   │       │   ├── product-create/
│   │   │       │   └── stock-adjustment/
│   │   │       └── components/
│   │   │           ├── stock-alert/
│   │   │           └── barcode-scanner/
│   │   │
│   │   ├── payment/                       # 💳 โมดูลที่ 7: Payment Management
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   ├── payment.entity.ts
│   │   │   │   │   ├── invoice.entity.ts
│   │   │   │   │   └── payment-status.enum.ts
│   │   │   │   ├── use-cases/
│   │   │   │   │   ├── create-payment.use-case.ts
│   │   │   │   │   ├── get-payment.use-case.ts
│   │   │   │   │   ├── list-payments.use-case.ts
│   │   │   │   │   ├── verify-payment.use-case.ts
│   │   │   │   │   └── generate-invoice.use-case.ts
│   │   │   │   └── repositories/
│   │   │   │       └── payment.repository.ts
│   │   │   ├── data/
│   │   │   │   ├── repositories/
│   │   │   │   │   └── payment.repository.impl.ts
│   │   │   │   ├── datasources/
│   │   │   │   │   ├── payment.api.datasource.ts
│   │   │   │   │   └── payment-gateway.datasource.ts
│   │   │   │   └── dtos/
│   │   │   │       └── payment-response.dto.ts
│   │   │   └── presentation/
│   │   │       ├── pages/
│   │   │       │   ├── payment-list/
│   │   │       │   ├── payment-detail/
│   │   │       │   ├── payment-create/
│   │   │       │   └── invoice-view/
│   │   │       └── components/
│   │   │           └── payment-gateway/
│   │   │
│   │   ├── dashboard/                     # 📊 โมดูลที่ 8: Dashboard & Reports
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   ├── dashboard-stats.entity.ts
│   │   │   │   │   └── report.entity.ts
│   │   │   │   ├── use-cases/
│   │   │   │   │   ├── get-dashboard-stats.use-case.ts
│   │   │   │   │   ├── get-revenue-chart.use-case.ts
│   │   │   │   │   ├── generate-report.use-case.ts
│   │   │   │   │   └── export-report.use-case.ts
│   │   │   │   └── repositories/
│   │   │   │       └── dashboard.repository.ts
│   │   │   ├── data/
│   │   │   │   ├── repositories/
│   │   │   │   │   └── dashboard.repository.impl.ts
│   │   │   │   └── datasources/
│   │   │   │       └── dashboard.api.datasource.ts
│   │   │   └── presentation/
│   │   │       ├── pages/
│   │   │       │   ├── main-dashboard/
│   │   │       │   ├── reports/
│   │   │       │   └── analytics/
│   │   │       └── components/
│   │   │           ├── stats-cards/
│   │   │           ├── revenue-chart/
│   │   │           ├── recent-activities/
│   │   │           └── quick-actions/
│   │   │
│   │   ├── document/                      # 📁 โมดูลที่ 9: Document Management
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   ├── document.entity.ts
│   │   │   │   │   └── document-folder.entity.ts
│   │   │   │   ├── use-cases/
│   │   │   │   │   ├── upload-document.use-case.ts
│   │   │   │   │   ├── get-document.use-case.ts
│   │   │   │   │   ├── list-documents.use-case.ts
│   │   │   │   │   ├── delete-document.use-case.ts
│   │   │   │   │   └── share-document.use-case.ts
│   │   │   │   └── repositories/
│   │   │   │       └── document.repository.ts
│   │   │   ├── data/
│   │   │   │   ├── repositories/
│   │   │   │   │   └── document.repository.impl.ts
│   │   │   │   ├── datasources/
│   │   │   │   │   ├── document.api.datasource.ts
│   │   │   │   │   └── document-storage.datasource.ts
│   │   │   │   └── dtos/
│   │   │   │       └── document-response.dto.ts
│   │   │   └── presentation/
│   │   │       ├── pages/
│   │   │       │   ├── document-list/
│   │   │       │   ├── document-detail/
│   │   │       │   └── document-upload/
│   │   │       └── components/
│   │   │           └── document-preview/
│   │   │
│   │   ├── email/                         # ✉️ โมดูลที่ 10: Email Service
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   ├── email-template.entity.ts
│   │   │   │   │   └── email-log.entity.ts
│   │   │   │   ├── use-cases/
│   │   │   │   │   ├── send-email.use-case.ts
│   │   │   │   │   ├── send-bulk-email.use-case.ts
│   │   │   │   │   ├── get-email-logs.use-case.ts
│   │   │   │   │   └── create-email-template.use-case.ts
│   │   │   │   └── repositories/
│   │   │   │       └── email.repository.ts
│   │   │   ├── data/
│   │   │   │   ├── repositories/
│   │   │   │   │   └── email.repository.impl.ts
│   │   │   │   ├── datasources/
│   │   │   │   │   └── email.api.datasource.ts
│   │   │   │   └── dtos/
│   │   │   │       └── send-email-request.dto.ts
│   │   │   └── presentation/
│   │   │       ├── pages/
│   │   │       │   ├── email-templates/
│   │   │       │   ├── email-logs/
│   │   │       │   └── email-compose/
│   │   │       └── components/
│   │   │           └── email-editor/
│   │   │
│   │   ├── batch/                         # ⏰ โมดูลที่ 11: Batch Jobs
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   ├── batch-job.entity.ts
│   │   │   │   │   └── job-schedule.entity.ts
│   │   │   │   ├── use-cases/
│   │   │   │   │   ├── create-batch-job.use-case.ts
│   │   │   │   │   ├── get-batch-job.use-case.ts
│   │   │   │   │   ├── list-batch-jobs.use-case.ts
│   │   │   │   │   └── trigger-batch-job.use-case.ts
│   │   │   │   └── repositories/
│   │   │   │       └── batch-job.repository.ts
│   │   │   ├── data/
│   │   │   │   ├── repositories/
│   │   │   │   │   └── batch-job.repository.impl.ts
│   │   │   │   ├── datasources/
│   │   │   │   │   ├── batch.api.datasource.ts
│   │   │   │   │   └── queue.datasource.ts
│   │   │   │   └── dtos/
│   │   │   │       └── batch-job-response.dto.ts
│   │   │   └── presentation/
│   │   │       ├── pages/
│   │   │       │   ├── batch-list/
│   │   │       │   └── batch-create/
│   │   │       └── components/
│   │   │           └── job-scheduler/
│   │   │
│   │   ├── i18n/                          # 🌍 โมดูลที่ 12: Multi-Language
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── translation.entity.ts
│   │   │   │   ├── use-cases/
│   │   │   │   │   ├── get-translation.use-case.ts
│   │   │   │   │   ├── set-language.use-case.ts
│   │   │   │   │   └── get-available-languages.use-case.ts
│   │   │   │   └── repositories/
│   │   │   │       └── translation.repository.ts
│   │   │   ├── data/
│   │   │   │   ├── repositories/
│   │   │   │   │   └── translation.repository.impl.ts
│   │   │   │   └── datasources/
│   │   │   │       ├── translation.api.datasource.ts
│   │   │   │       └── translation-local.datasource.ts
│   │   │   └── presentation/
│   │   │       ├── pages/
│   │   │       │   └── language-selector/
│   │   │       └── pipes/
│   │   │           └── translate.pipe.ts
│   │   │
│   │   ├── iot/                           # 📡 โมดูลที่ 13: IoT & GPS Tracking
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   ├── device.entity.ts
│   │   │   │   │   ├── gps-data.entity.ts
│   │   │   │   │   └── sensor-data.entity.ts
│   │   │   │   ├── use-cases/
│   │   │   │   │   ├── register-device.use-case.ts
│   │   │   │   │   ├── get-device-location.use-case.ts
│   │   │   │   │   ├── get-device-history.use-case.ts
│   │   │   │   │   └── get-sensor-data.use-case.ts
│   │   │   │   └── repositories/
│   │   │   │       └── iot.repository.ts
│   │   │   ├── data/
│   │   │   │   ├── repositories/
│   │   │   │   │   └── iot.repository.impl.ts
│   │   │   │   ├── datasources/
│   │   │   │   │   ├── iot.api.datasource.ts
│   │   │   │   │   └── socket.datasource.ts   # Real-time
│   │   │   │   └── dtos/
│   │   │   │       └── device-response.dto.ts
│   │   │   └── presentation/
│   │   │       ├── pages/
│   │   │       │   ├── device-list/
│   │   │       │   ├── device-map/           # Google Maps Integration
│   │   │       │   └── device-detail/
│   │   │       └── components/
│   │   │           ├── gps-tracker/
│   │   │           └── device-status/
│   │   │
│   │   └── wos/                           # 🛍️ โมดูลที่ 14: Web Order System
│   │       ├── domain/
│   │       │   ├── entities/
│   │       │   │   ├── web-order.entity.ts
│   │       │   │   ├── order-item.entity.ts
│   │       │   │   └── order-status.enum.ts
│   │       │   ├── use-cases/
│   │       │   │   ├── create-web-order.use-case.ts
│   │       │   │   ├── get-web-order.use-case.ts
│   │       │   │   ├── list-web-orders.use-case.ts
│   │       │   │   ├── update-order-status.use-case.ts
│   │       │   │   └── cancel-order.use-case.ts
│   │       │   └── repositories/
│   │       │       └── web-order.repository.ts
│   │       ├── data/
│   │       │   ├── repositories/
│   │       │   │   └── web-order.repository.impl.ts
│   │       │   ├── datasources/
│   │       │   │   └── wos.api.datasource.ts
│   │       │   └── dtos/
│   │       │       └── web-order-response.dto.ts
│   │       └── presentation/
│   │           ├── pages/
│   │           │   ├── order-list/
│   │           │   ├── order-detail/
│   │           │   └── order-create/
│   │           └── components/
│   │               ├── order-summary/
│   │               └── order-tracking/
│   │
│   └── app.routes.ts                      # 🗺️ Main Routing (Lazy Loading)
│
├── assets/
│   ├── images/
│   ├── i18n/                              # ไฟล์แปลภาษา
│   │   ├── en.json
│   │   └── th.json
│   └── tabler/                            # Tabler Static Assets
│
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
│
└── styles.scss                            # Global Styles (Import Tabler)
```

---

## 2.3 แผนภาพ Dependency Flow (Clean Architecture)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                                  │
│              (Pages, Components, Layouts, Guards)                          │
│                                                                             │
│  หน้าที่: แสดงผล UI, จัดการ Event จากผู้ใช้, เรียก Use Cases              │
│  ✅ สามารถพึ่งพา: Domain, Core                                             │
│  ❌ ห้ามพึ่งพา: Data โดยตรง                                                 │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ เรียกใช้
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DOMAIN LAYER                                     │
│              (Entities, Use Cases, Repository Interfaces)                   │
│                                                                             │
│  หน้าที่: กำหนด Business Logic, กฎเกณฑ์ทางธุรกิจ                          │
│  ✅ สามารถพึ่งพา: Core (Utils, Constants)                                  │
│  ❌ ห้ามพึ่งพา: Presentation, Data                                          │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ▲
                                    │ implements
                                    │
┌─────────────────────────────────────────────────────────────────────────────┐
│                            DATA LAYER                                      │
│              (Repository Impl, DataSources, DTOs, Mappers)                  │
│                                                                             │
│  หน้าที่: จัดการข้อมูลจาก API, Database, Cache                             │
│  ✅ สามารถพึ่งพา: Domain, Core                                             │
│  ❌ ห้ามพึ่งพา: Presentation                                                │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ เรียก API / DB
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         EXTERNAL SYSTEMS                                   │
│              (REST API, Database, Redis, File Storage)                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2.4 ตารางเปรียบเทียบ Layer แต่ละโมดูล

| โมดูล | Domain Entities | Use Cases | Repository Interface | Repository Impl | DataSource | Pages |
|-------|-----------------|-----------|---------------------|-----------------|------------|-------|
| **Auth** | User, Permission | login, logout, refresh, checkPermission | AuthRepository | AuthRepositoryImpl | AuthApiDataSource | Login, ForgotPassword |
| **Job Card** | JobCard, JobStatus, JobPriority | create, update, get, list, assign, updateStatus | JobCardRepository | JobCardRepositoryImpl | JobCardApiDataSource | JobList, JobDetail, JobCreate, JobBoard |
| **Customer** | Customer, CustomerContact | create, update, get, list, search | CustomerRepository | CustomerRepositoryImpl | CustomerApiDataSource | CustomerList, CustomerDetail, CustomerCreate |
| **Quotation** | Quotation, QuotationItem, QuotationStatus | create, update, get, list, approve, reject | QuotationRepository | QuotationRepositoryImpl | QuotationApiDataSource | QuotationList, QuotationDetail, QuotationCreate |
| **Purchase Order** | PurchaseOrder, POItem, POStatus | create, update, get, list, approve | PurchaseOrderRepository | PurchaseOrderRepositoryImpl | POApiDataSource | POList, PODetail, POCreate |
| **Inventory** | Product, Category, StockMovement | create, update, get, list, adjustStock, getMovements | InventoryRepository | InventoryRepositoryImpl | InventoryApiDataSource | ProductList, ProductDetail, ProductCreate, StockAdjustment |
| **Payment** | Payment, Invoice, PaymentStatus | create, get, list, verify, generateInvoice | PaymentRepository | PaymentRepositoryImpl | PaymentApiDataSource, PaymentGatewayDataSource | PaymentList, PaymentDetail, PaymentCreate, InvoiceView |
| **Dashboard** | DashboardStats, Report | getStats, getRevenueChart, generateReport, exportReport | DashboardRepository | DashboardRepositoryImpl | DashboardApiDataSource | MainDashboard, Reports, Analytics |
| **Document** | Document, DocumentFolder | upload, get, list, delete, share | DocumentRepository | DocumentRepositoryImpl | DocumentApiDataSource, DocumentStorageDataSource | DocumentList, DocumentDetail, DocumentUpload |
| **Email** | EmailTemplate, EmailLog | send, sendBulk, getLogs, createTemplate | EmailRepository | EmailRepositoryImpl | EmailApiDataSource | EmailTemplates, EmailLogs, EmailCompose |
| **Batch** | BatchJob, JobSchedule | create, get, list, trigger | BatchJobRepository | BatchJobRepositoryImpl | BatchApiDataSource, QueueDataSource | BatchList, BatchCreate |
| **i18n** | Translation | getTranslation, setLanguage, getAvailableLanguages | TranslationRepository | TranslationRepositoryImpl | TranslationApiDataSource, TranslationLocalDataSource | LanguageSelector |
| **IoT** | Device, GPSData, SensorData | register, getLocation, getHistory, getSensorData | IoTRepository | IoTRepositoryImpl | IoTApiDataSource, SocketDataSource | DeviceList, DeviceMap, DeviceDetail |
| **WOS** | WebOrder, OrderItem, OrderStatus | create, get, list, updateStatus, cancel | WebOrderRepository | WebOrderRepositoryImpl | WOSApiDataSource | OrderList, OrderDetail, OrderCreate |

---

# 3. โมดูลที่ 1: Authentication & Permission

## 3.1 ฟังก์ชันการทำงาน
| # | ฟีเจอร์ | คำอธิบาย |
|---|---------|----------|
| 1 | **Login** | ลงชื่อเข้าใช้ด้วย Email/Password + JWT Token |
| 2 | **Logout** | ออกจากระบบ + ล้าง Token |
| 3 | **Refresh Token** | ต่ออายุ Token อัตโนมัติ |
| 4 | **Forgot Password** | ส่งลิงก์รีเซ็ตรหัสผ่านทางอีเมล |
| 5 | **Reset Password** | ตั้งรหัสผ่านใหม่ |
| 6 | **Permission Check** | ตรวจสอบสิทธิ์ก่อนเข้าใช้งานแต่ละโมดูล |
| 7 | **Role Management** | จัดการบทบาท (Admin, Manager, Staff, Technician, Customer) |
| 8 | **User Management** | เพิ่ม/แก้ไข/ลบ ผู้ใช้งาน |

## 3.2 หน้า UI (Tabler Theme)
| หน้า | เส้นทาง | รายละเอียด |
|------|---------|------------|
| Login | `/login` | ฟอร์มเข้าสู่ระบบ + ปุ่ม Forgot Password |
| Forgot Password | `/forgot-password` | ฟอร์มใส่อีเมล |
| Reset Password | `/reset-password/:token` | ฟอร์มตั้งรหัสผ่านใหม่ |
| User List | `/users` | ตารางแสดงรายชื่อผู้ใช้ + ปุ่มเพิ่ม/แก้ไข/ลบ |
| User Create/Edit | `/users/create`, `/users/edit/:id` | ฟอร์มจัดการผู้ใช้ + เลือกบทบาท |
| Role List | `/roles` | จัดการบทบาทและสิทธิ์ |

## 3.3 Entity
```typescript
// auth/domain/entities/user.entity.ts
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  permissions: Permission[];
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  STAFF = 'staff',
  TECHNICIAN = 'technician',
  CUSTOMER = 'customer'
}

// auth/domain/entities/permission.entity.ts
export interface Permission {
  id: string;
  name: string;  // เช่น 'job_card.create', 'quotation.approve'
  description: string;
  module: string;
}
```

## 3.4 Use Cases
```typescript
// auth/domain/use-cases/login.use-case.ts
@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  constructor(private authRepo: IAuthRepository) {}
  
  execute(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.authRepo.login(credentials);
  }
}

// auth/domain/use-cases/check-permission.use-case.ts
@Injectable({ providedIn: 'root' })
export class CheckPermissionUseCase {
  constructor(private authRepo: IAuthRepository) {}
  
  execute(permission: string): Observable<boolean> {
    return this.authRepo.hasPermission(permission);
  }
}
```

---

# 4. โมดูลที่ 2: Job Card Management

## 4.1 ฟังก์ชันการทำงาน
| # | ฟีเจอร์ | คำอธิบาย |
|---|---------|----------|
| 1 | **สร้าง Job Card** | สร้างงานใหม่พร้อมรายละเอียด (ลูกค้า, อุปกรณ์, ปัญหา) |
| 2 | **แก้ไข Job Card** | แก้ไขข้อมูลงาน |
| 3 | **ดู Job Card** | ดูรายละเอียดงานแบบเต็ม |
| 4 | **รายการ Job Cards** | แสดงตารางงานทั้งหมด + ค้นหา/กรอง |
| 5 | **มอบหมายงาน** | กำหนดช่าง/ทีมงานที่รับผิดชอบ |
| 6 | **อัปเดตสถานะ** | เปลี่ยนสถานะงาน (Pending → In Progress → Completed → Closed) |
| 7 | **Kanban Board** | ดูสถานะงานแบบ Card Drag & Drop |
| 8 | **Timeline** | แสดงประวัติการอัปเดตของงาน |
| 9 | **Attachment** | แนบไฟล์รูปภาพ/เอกสารประกอบ |

## 4.2 สถานะงาน (Job Status)
```
PENDING → ASSIGNED → IN_PROGRESS → COMPLETED → CLOSED
                    ↘  ON_HOLD     ↗
```

## 4.3 หน้า UI (Tabler Theme)
| หน้า | เส้นทาง | รายละเอียด |
|------|---------|------------|
| Job List | `/jobs` | ตารางงาน + Search + Filters (สถานะ, วันที่, ลูกค้า) |
| Job Board | `/jobs/board` | Kanban View (Drag & Drop) |
| Job Detail | `/jobs/:id` | รายละเอียดงาน + Timeline + Attachments |
| Job Create | `/jobs/create` | ฟอร์มสร้างงานใหม่ |
| Job Edit | `/jobs/edit/:id` | ฟอร์มแก้ไขงาน |

## 4.4 Entity
```typescript
// job-card/domain/entities/job-card.entity.ts
export interface JobCard {
  id: string;
  jobNumber: string;           // JC-2026-0001
  customerId: string;
  customerName: string;
  deviceType: string;
  deviceModel: string;
  serialNumber?: string;
  problemDescription: string;
  status: JobStatus;
  priority: JobPriority;
  assignedTo?: string;          // Technician ID
  assignedTeam?: string[];
  estimatedHours?: number;
  actualHours?: number;
  partsUsed: PartUsed[];
  notes: JobNote[];
  attachments: Attachment[];
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export enum JobStatus {
  PENDING = 'pending',
  ASSIGNED = 'assigned',
  IN_PROGRESS = 'in_progress',
  ON_HOLD = 'on_hold',
  COMPLETED = 'completed',
  CLOSED = 'closed'
}

export enum JobPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}
```

---

# 5. โมดูลที่ 3: Customer Management

## 5.1 ฟังก์ชันการทำงาน
| # | ฟีเจอร์ | คำอธิบาย |
|---|---------|----------|
| 1 | **เพิ่มลูกค้า** | บันทึกข้อมูลลูกค้าใหม่ |
| 2 | **แก้ไขลูกค้า** | อัปเดตข้อมูลลูกค้า |
| 3 | **รายการลูกค้า** | แสดงตารางลูกค้า + ค้นหา/กรอง |
| 4 | **รายละเอียดลูกค้า** | ดูข้อมูลลูกค้า + ประวัติการสั่งซื้อ/งาน |
| 5 | **ค้นหาลูกค้า** | ค้นหาด้วยชื่อ, เบอร์โทร, อีเมล |
| 6 | **ติดต่อ** | จัดการข้อมูลผู้ติดต่อหลายรายต่อลูกค้า |
| 7 | **ประวัติ** | แสดงประวัติการทำธุรกรรมกับลูกค้า |

## 5.2 หน้า UI (Tabler Theme)
| หน้า | เส้นทาง | รายละเอียด |
|------|---------|------------|
| Customer List | `/customers` | ตารางลูกค้า + Search |
| Customer Detail | `/customers/:id` | ข้อมูลลูกค้า + ประวัติ |
| Customer Create | `/customers/create` | ฟอร์มเพิ่มลูกค้า |
| Customer Edit | `/customers/edit/:id` | ฟอร์มแก้ไขลูกค้า |

---

# 6. โมดูลที่ 4: Quotation

## 6.1 ฟังก์ชันการทำงาน
| # | ฟีเจอร์ | คำอธิบาย |
|---|---------|----------|
| 1 | **สร้าง Quotation** | สร้างเอกสารเสนอราคาให้ลูกค้า |
| 2 | **แก้ไข Quotation** | แก้ไขรายการเสนอราคา |
| 3 | **รายการ Quotation** | แสดงตาราง Quotation ทั้งหมด |
| 4 | **รายละเอียด Quotation** | ดูรายละเอียด + ปริ้น PDF |
| 5 | **อนุมัติ Quotation** | อนุมัติ/ไม่อนุมัติ โดย Manager |
| 6 | **แปลงเป็น PO** | เมื่ออนุมัติแล้ว แปลงเป็น Purchase Order อัตโนมัติ |
| 7 | **ส่งอีเมล** | ส่ง Quotation ไปยังลูกค้าทางอีเมล |

## 6.2 สถานะ Quotation
```
DRAFT → SENT → UNDER_REVIEW → APPROVED → CONVERTED_TO_PO
                           ↘ REJECTED
```

## 6.3 หน้า UI (Tabler Theme)
| หน้า | เส้นทาง | รายละเอียด |
|------|---------|------------|
| Quotation List | `/quotations` | ตาราง Quotation + Filters |
| Quotation Detail | `/quotations/:id` | รายละเอียด + PDF Preview |
| Quotation Create | `/quotations/create` | ฟอร์มสร้าง Quotation |
| Quotation Edit | `/quotations/edit/:id` | ฟอร์มแก้ไข |

---

# 7. โมดูลที่ 5: Purchase Order

## 7.1 ฟังก์ชันการทำงาน
| # | ฟีเจอร์ | คำอธิบาย |
|---|---------|----------|
| 1 | **สร้าง PO** | สร้างใบสั่งซื้อ (จาก Quotation หรือสร้างใหม่) |
| 2 | **แก้ไข PO** | แก้ไขรายการสั่งซื้อ |
| 3 | **รายการ PO** | แสดงตาราง PO ทั้งหมด |
| 4 | **รายละเอียด PO** | ดูรายละเอียด + สถานะ |
| 5 | **อนุมัติ PO** | อนุมัติโดย Manager |
| 6 | **ติดตามสถานะ** | ดูสถานะการจัดส่ง |

## 7.2 สถานะ PO
```
DRAFT → PENDING_APPROVAL → APPROVED → ORDERED → SHIPPED → DELIVERED
                        ↘ REJECTED
```

---

# 8. โมดูลที่ 6: Inventory Management

## 8.1 ฟังก์ชันการทำงาน
| # | ฟีเจอร์ | คำอธิบาย |
|---|---------|----------|
| 1 | **เพิ่มสินค้า** | บันทึกข้อมูลสินค้าใหม่ |
| 2 | **แก้ไขสินค้า** | อัปเดตข้อมูลสินค้า |
| 3 | **รายการสินค้า** | แสดงตารางสินค้า + ค้นหา/กรอง |
| 4 | **ปรับสต็อก** | เพิ่ม/ลด สต็อกสินค้า |
| 5 | **ประวัติการเคลื่อนไหว** | ดูประวัติการปรับสต็อก |
| 6 | **แจ้งเตือนสต็อกต่ำ** | แสดงสินค้าที่สต็อกต่ำกว่าเกณฑ์ |
| 7 | **Barcode Scanner** | สแกน Barcode เพื่อค้นหาสินค้า |
| 8 | **หมวดหมู่** | จัดการหมวดหมู่สินค้า |

## 8.2 หน้า UI (Tabler Theme)
| หน้า | เส้นทาง | รายละเอียด |
|------|---------|------------|
| Product List | `/products` | ตารางสินค้า + Search + Stock Alert |
| Product Detail | `/products/:id` | รายละเอียดสินค้า + Stock Movements |
| Product Create | `/products/create` | ฟอร์มเพิ่มสินค้า |
| Stock Adjustment | `/products/:id/adjust` | ฟอร์มปรับสต็อก |
| Categories | `/categories` | จัดการหมวดหมู่ |

---

# 9. โมดูลที่ 7: Payment Management

## 9.1 ฟังก์ชันการทำงาน
| # | ฟีเจอร์ | คำอธิบาย |
|---|---------|----------|
| 1 | **สร้าง Payment** | บันทึกการชำระเงิน |
| 2 | **รายการ Payment** | แสดงตารางการชำระเงินทั้งหมด |
| 3 | **รายละเอียด Payment** | ดูรายละเอียดการชำระเงิน |
| 4 | **สร้าง Invoice** | สร้างใบแจ้งหนี้จาก Payment |
| 5 | **ดู Invoice** | แสดงใบแจ้งหนี้ + ปริ้น PDF |
| 6 | **เชื่อมต่อ Payment Gateway** | รองรับการชำระออนไลน์ (Stripe, ฯลฯ) |
| 7 | **สถานะ Payment** | Pending → Paid → Failed → Refunded |

## 9.2 หน้า UI (Tabler Theme)
| หน้า | เส้นทาง | รายละเอียด |
|------|---------|------------|
| Payment List | `/payments` | ตาราง Payment + Filters |
| Payment Detail | `/payments/:id` | รายละเอียด Payment |
| Payment Create | `/payments/create` | ฟอร์มสร้าง Payment |
| Invoice View | `/payments/invoice/:id` | ดู Invoice |

---

# 10. โมดูลที่ 8: Dashboard & Reports

## 10.1 ฟังก์ชันการทำงาน
| # | ฟีเจอร์ | คำอธิบาย |
|---|---------|----------|
| 1 | **Dashboard หลัก** | แสดง KPI: งานทั้งหมด, ลูกค้า, รายได้, ฯลฯ |
| 2 | **กราฟรายได้** | แสดงกราฟรายได้รายเดือน/ปี |
| 3 | **กิจกรรมล่าสุด** | แสดงกิจกรรมล่าสุดในระบบ |
| 4 | **งานตามสถานะ** | แสดงจำนวนงานแยกตามสถานะ |
| 5 | **สร้าง Report** | สร้างรายงานตามช่วงเวลา |
| 6 | **Export Report** | ส่งออกรายงานเป็น PDF/Excel |
| 7 | **Analytics** | วิเคราะห์ข้อมูลเชิงลึก |

## 10.2 หน้า UI (Tabler Theme)
| หน้า | เส้นทาง | รายละเอียด |
|------|---------|------------|
| Main Dashboard | `/dashboard` | KPI Cards + Charts + Recent Activities |
| Reports | `/reports` | สร้างและดูรายงาน |
| Analytics | `/analytics` | วิเคราะห์ข้อมูลเชิงลึก |

---

# 11. โมดูลที่ 9: Document Management

## 11.1 ฟังก์ชันการทำงาน
| # | ฟีเจอร์ | คำอธิบาย |
|---|---------|----------|
| 1 | **อัปโหลดเอกสาร** | อัปโหลดไฟล์ (PDF, Image, Word, Excel) |
| 2 | **รายการเอกสาร** | แสดงเอกสารทั้งหมด + ค้นหา |
| 3 | **ดูเอกสาร** | Preview เอกสารออนไลน์ |
| 4 | **ลบเอกสาร** | ลบเอกสาร |
| 5 | **แชร์เอกสาร** | แชร์เอกสารให้ผู้อื่น |
| 6 | **โฟลเดอร์** | จัดระเบียบเอกสารเป็นโฟลเดอร์ |
| 7 | **แท็ก** | เพิ่มแท็กเพื่อค้นหาง่าย |

## 11.2 หน้า UI (Tabler Theme)
| หน้า | เส้นทาง | รายละเอียด |
|------|---------|------------|
| Document List | `/documents` | แสดงเอกสาร + Search + Filters |
| Document Upload | `/documents/upload` | ฟอร์มอัปโหลดเอกสาร |
| Document Detail | `/documents/:id` | ดู/แก้ไขข้อมูลเอกสาร |

---

# 12. โมดูลที่ 10: Email Service

## 12.1 ฟังก์ชันการทำงาน
| # | ฟีเจอร์ | คำอธิบาย |
|---|---------|----------|
| 1 | **ส่งอีเมล** | ส่งอีเมลรายบุคคล |
| 2 | **ส่งอีเมลกลุ่ม** | ส่งอีเมลถึงหลายคนพร้อมกัน |
| 3 | **เทมเพลตอีเมล** | จัดการเทมเพลตอีเมล |
| 4 | **ประวัติการส่ง** | ดูประวัติการส่งอีเมล |
| 5 | **ติดตามสถานะ** | ดูว่าอีเมลถูกเปิดหรือไม่ |

## 12.2 หน้า UI (Tabler Theme)
| หน้า | เส้นทาง | รายละเอียด |
|------|---------|------------|
| Email Templates | `/email/templates` | จัดการเทมเพลตอีเมล |
| Email Compose | `/email/compose` | ฟอร์มเขียนอีเมล |
| Email Logs | `/email/logs` | ประวัติการส่งอีเมล |

---

# 13. โมดูลที่ 11: Batch Jobs

## 13.1 ฟังก์ชันการทำงาน
| # | ฟีเจอร์ | คำอธิบาย |
|---|---------|----------|
| 1 | **สร้าง Batch Job** | กำหนดงานที่ต้องรันตามกำหนดเวลา |
| 2 | **รายการ Batch Jobs** | แสดงงานทั้งหมด |
| 3 | **รันทันที** | รันงานทันที (Manual Trigger) |
| 4 | **ดูประวัติ** | ดูประวัติการรันงาน |
| 5 | **กำหนดตารางเวลา** | ตั้งค่า Cron Job |

## 13.2 ตัวอย่าง Batch Jobs
| Job Name | คำอธิบาย | ความถี่ |
|----------|-----------|---------|
| **Send Daily Report** | ส่งรายงานประจำวันทางอีเมล | ทุกวัน 08:00 |
| **Update Inventory** | อัปเดตสต็อกอัตโนมัติ | ทุกชั่วโมง |
| **Generate Invoices** | สร้าง Invoice อัตโนมัติ | ทุกวัน 23:00 |
| **Backup Database** | สำรองฐานข้อมูล | ทุกวัน 02:00 |
| **Cleanup Logs** | ล้าง Log เก่า | ทุกวันอาทิตย์ 03:00 |

---

# 14. โมดูลที่ 12: Multi-Language (i18n)

## 14.1 ฟังก์ชันการทำงาน
| # | ฟีเจอร์ | คำอธิบาย |
|---|---------|----------|
| 1 | **สลับภาษา** | สลับระหว่างภาษา (ไทย/อังกฤษ) |
| 2 | **แปลข้อความ** | แปลข้อความแบบ Real-time |
| 3 | **จัดการภาษา** | เพิ่ม/แก้ไข ภาษาใหม่ |
| 4 | **แปลอัตโนมัติ** | ใช้ AI ช่วยแปล (Optional) |

## 14.2 ภาษาที่รองรับ
- 🇹🇭 ไทย (Thai)
- 🇬🇧 อังกฤษ (English)

## 14.3 หน้า UI (Tabler Theme)
| หน้า | เส้นทาง | รายละเอียด |
|------|---------|------------|
| Language Selector | Component ใน Header | Dropdown เลือกภาษา |

---

# 15. โมดูลที่ 13: IoT & GPS Tracking

## 15.1 ฟังก์ชันการทำงาน
| # | ฟีเจอร์ | คำอธิบาย |
|---|---------|----------|
| 1 | **ลงทะเบียนอุปกรณ์** | เพิ่มอุปกรณ์ IoT ใหม่ |
| 2 | **รายการอุปกรณ์** | แสดงอุปกรณ์ทั้งหมด + สถานะ |
| 3 | **แผนที่แสดงตำแหน่ง** | แสดงตำแหน่งอุปกรณ์บน Google Maps |
| 4 | **ประวัติตำแหน่ง** | ดูประวัติการเคลื่อนไหว |
| 5 | **ข้อมูลเซ็นเซอร์** | ดูข้อมูลจากเซ็นเซอร์ (อุณหภูมิ, ความชื้น, ฯลฯ) |
| 6 | **Real-time Tracking** | ติดตามตำแหน่งแบบ Real-time (Socket.IO) |

## 15.2 หน้า UI (Tabler Theme)
| หน้า | เส้นทาง | รายละเอียด |
|------|---------|------------|
| Device List | `/iot/devices` | ตารางอุปกรณ์ + Status |
| Device Map | `/iot/map` | แผนที่แสดงตำแหน่งอุปกรณ์ |
| Device Detail | `/iot/devices/:id` | รายละเอียดอุปกรณ์ + ข้อมูลเซ็นเซอร์ |

---

# 16. โมดูลที่ 14: Web Order System (WOS)

## 16.1 ฟังก์ชันการทำงาน
| # | ฟีเจอร์ | คำอธิบาย |
|---|---------|----------|
| 1 | **สร้าง Order** | ลูกค้าสร้างคำสั่งซื้อออนไลน์ |
| 2 | **รายการ Order** | แสดงคำสั่งซื้อทั้งหมด |
| 3 | **รายละเอียด Order** | ดูรายละเอียดคำสั่งซื้อ |
| 4 | **อัปเดตสถานะ** | อัปเดตสถานะการจัดส่ง |
| 5 | **ยกเลิก Order** | ยกเลิกคำสั่งซื้อ |
| 6 | **ติดตาม Order** | ลูกค้าติดตามสถานะคำสั่งซื้อ |

## 16.2 สถานะ Order
```
PENDING → CONFIRMED → PROCESSING → SHIPPED → DELIVERED
                    ↘ CANCELLED
```

## 16.3 หน้า UI (Tabler Theme)
| หน้า | เส้นทาง | รายละเอียด |
|------|---------|------------|
| Order List | `/wos/orders` | ตาราง Order + Filters |
| Order Detail | `/wos/orders/:id` | รายละเอียด Order |
| Order Create | `/wos/orders/create` | ฟอร์มสร้าง Order |
| Order Tracking | `/wos/tracking/:id` | ติดตามสถานะ (สำหรับลูกค้า) |

---

# 17. สรุปฐานข้อมูลทั้งหมด (Consolidated Database)

## 17.1 ตารางฐานข้อมูลหลัก (PostgreSQL)

| # | ตาราง | คำอธิบาย | โมดูล |
|---|-------|----------|-------|
| 1 | `users` | ผู้ใช้งาน | Auth |
| 2 | `roles` | บทบาท | Auth |
| 3 | `permissions` | สิทธิ์ | Auth |
| 4 | `user_roles` | ความสัมพันธ์ User-Role | Auth |
| 5 | `role_permissions` | ความสัมพันธ์ Role-Permission | Auth |
| 6 | `refresh_tokens` | Refresh Token | Auth |
| 7 | `customers` | ลูกค้า | Customer |
| 8 | `customer_contacts` | ผู้ติดต่อของลูกค้า | Customer |
| 9 | `job_cards` | งาน | Job Card |
| 10 | `job_status_history` | ประวัติสถานะงาน | Job Card |
| 11 | `job_notes` | บันทึกในงาน | Job Card |
| 12 | `job_attachments` | ไฟล์แนบในงาน | Job Card |
| 13 | `quotations` | เอกสารเสนอราคา | Quotation |
| 14 | `quotation_items` | รายการใน Quotation | Quotation |
| 15 | `purchase_orders` | ใบสั่งซื้อ | Purchase Order |
| 16 | `po_items` | รายการใน PO | Purchase Order |
| 17 | `products` | สินค้า | Inventory |
| 18 | `categories` | หมวดหมู่สินค้า | Inventory |
| 19 | `stock_movements` | ประวัติการเคลื่อนไหวสต็อก | Inventory |
| 20 | `payments` | การชำระเงิน | Payment |
| 21 | `invoices` | ใบแจ้งหนี้ | Payment |
| 22 | `documents` | เอกสาร | Document |
| 23 | `document_folders` | โฟลเดอร์เอกสาร | Document |
| 24 | `email_templates` | เทมเพลตอีเมล | Email |
| 25 | `email_logs` | ประวัติการส่งอีเมล | Email |
| 26 | `batch_jobs` | งาน Batch | Batch |
| 27 | `batch_job_history` | ประวัติการรัน Batch | Batch |
| 28 | `translations` | ข้อความแปลภาษา | i18n |
| 29 | `devices` | อุปกรณ์ IoT | IoT |
| 30 | `gps_data` | ข้อมูล GPS | IoT |
| 31 | `sensor_data` | ข้อมูลเซ็นเซอร์ | IoT |
| 32 | `web_orders` | คำสั่งซื้อออนไลน์ | WOS |
| 33 | `web_order_items` | รายการในคำสั่งซื้อออนไลน์ | WOS |

## 17.2 ความสัมพันธ์ระหว่างตาราง (ER Diagram)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   users     │────▶│  user_roles │────▶│    roles    │
└─────────────┘     └─────────────┘     └─────────────┘
       │                                       │
       │                                       │
       ▼                                       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  customers  │     │role_permiss.│────▶│ permissions │
└─────────────┘     └─────────────┘     └─────────────┘
       │
       │
       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  job_cards  │────▶│quotations   │────▶│purchase_ord.│
└─────────────┘     └─────────────┘     └─────────────┘
       │                    │                    │
       ▼                    ▼                    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│job_notes    │     │quotation_   │     │  po_items   │
│job_attach.  │     │   items     │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
                                                 │
                                                 ▼
                                          ┌─────────────┐
                                          │  products   │
                                          └─────────────┘
                                                 │
                                                 ▼
                                          ┌─────────────┐
                                          │stock_movem. │
                                          └─────────────┘
```

---

# 18. สรุป API ทั้งหมด (Consolidated API)

## 18.1 REST API Endpoints

| # | Method | Endpoint | คำอธิบาย | โมดูล |
|---|--------|----------|----------|-------|
| **Auth** |||||
| 1 | POST | `/api/auth/login` | เข้าสู่ระบบ | Auth |
| 2 | POST | `/api/auth/logout` | ออกจากระบบ | Auth |
| 3 | POST | `/api/auth/refresh` | ต่ออายุ Token | Auth |
| 4 | POST | `/api/auth/forgot-password` | ขอรหัสผ่านใหม่ | Auth |
| 5 | POST | `/api/auth/reset-password` | ตั้งรหัสผ่านใหม่ | Auth |
| 6 | GET | `/api/auth/me` | ข้อมูลผู้ใช้ปัจจุบัน | Auth |
| 7 | GET | `/api/auth/permissions` | สิทธิ์ของผู้ใช้ | Auth |
| **Users** |||||
| 8 | GET | `/api/users` | รายการผู้ใช้ | Auth |
| 9 | GET | `/api/users/:id` | ข้อมูลผู้ใช้ | Auth |
| 10 | POST | `/api/users` | สร้างผู้ใช้ | Auth |
| 11 | PUT | `/api/users/:id` | แก้ไขผู้ใช้ | Auth |
| 12 | DELETE | `/api/users/:id` | ลบผู้ใช้ | Auth |
| **Customers** |||||
| 13 | GET | `/api/customers` | รายการลูกค้า | Customer |
| 14 | GET | `/api/customers/:id` | ข้อมูลลูกค้า | Customer |
| 15 | POST | `/api/customers` | สร้างลูกค้า | Customer |
| 16 | PUT | `/api/customers/:id` | แก้ไขลูกค้า | Customer |
| 17 | DELETE | `/api/customers/:id` | ลบลูกค้า | Customer |
| 18 | GET | `/api/customers/search` | ค้นหาลูกค้า | Customer |
| **Job Cards** |||||
| 19 | GET | `/api/jobs` | รายการงาน | Job Card |
| 20 | GET | `/api/jobs/:id` | ข้อมูลงาน | Job Card |
| 21 | POST | `/api/jobs` | สร้างงาน | Job Card |
| 22 | PUT | `/api/jobs/:id` | แก้ไขงาน | Job Card |
| 23 | DELETE | `/api/jobs/:id` | ลบงาน | Job Card |
| 24 | PATCH | `/api/jobs/:id/status` | อัปเดตสถานะ | Job Card |
| 25 | PATCH | `/api/jobs/:id/assign` | มอบหมายงาน | Job Card |
| 26 | GET | `/api/jobs/board` | ข้อมูลสำหรับ Kanban | Job Card |
| **Quotations** |||||
| 27 | GET | `/api/quotations` | รายการ Quotation | Quotation |
| 28 | GET | `/api/quotations/:id` | ข้อมูล Quotation | Quotation |
| 29 | POST | `/api/quotations` | สร้าง Quotation | Quotation |
| 30 | PUT | `/api/quotations/:id` | แก้ไข Quotation | Quotation |
| 31 | POST | `/api/quotations/:id/approve` | อนุมัติ | Quotation |
| 32 | POST | `/api/quotations/:id/reject` | ไม่อนุมัติ | Quotation |
| 33 | GET | `/api/quotations/:id/pdf` | ดาวน์โหลด PDF | Quotation |
| **Purchase Orders** |||||
| 34 | GET | `/api/purchase-orders` | รายการ PO | PO |
| 35 | GET | `/api/purchase-orders/:id` | ข้อมูล PO | PO |
| 36 | POST | `/api/purchase-orders` | สร้าง PO | PO |
| 37 | PUT | `/api/purchase-orders/:id` | แก้ไข PO | PO |
| 38 | POST | `/api/purchase-orders/:id/approve` | อนุมัติ PO | PO |
| **Inventory** |||||
| 39 | GET | `/api/products` | รายการสินค้า | Inventory |
| 40 | GET | `/api/products/:id` | ข้อมูลสินค้า | Inventory |
| 41 | POST | `/api/products` | สร้างสินค้า | Inventory |
| 42 | PUT | `/api/products/:id` | แก้ไขสินค้า | Inventory |
| 43 | DELETE | `/api/products/:id` | ลบสินค้า | Inventory |
| 44 | POST | `/api/products/:id/adjust-stock` | ปรับสต็อก | Inventory |
| 45 | GET | `/api/products/:id/movements` | ประวัติสต็อก | Inventory |
| 46 | GET | `/api/products/low-stock` | สินค้าสต็อกต่ำ | Inventory |
| **Payments** |||||
| 47 | GET | `/api/payments` | รายการ Payment | Payment |
| 48 | GET | `/api/payments/:id` | ข้อมูล Payment | Payment |
| 49 | POST | `/api/payments` | สร้าง Payment | Payment |
| 50 | POST | `/api/payments/:id/verify` | ยืนยัน Payment | Payment |
| 51 | GET | `/api/payments/:id/invoice` | ดาวน์โหลด Invoice | Payment |
| **Dashboard** |||||
| 52 | GET | `/api/dashboard/stats` | สถิติ Dashboard | Dashboard |
| 53 | GET | `/api/dashboard/revenue` | ข้อมูลกราฟรายได้ | Dashboard |
| 54 | GET | `/api/dashboard/activities` | กิจกรรมล่าสุด | Dashboard |
| 55 | POST | `/api/reports/generate` | สร้างรายงาน | Dashboard |
| 56 | GET | `/api/reports/export` | ส่งออกรายงาน | Dashboard |
| **Documents** |||||
| 57 | GET | `/api/documents` | รายการเอกสาร | Document |
| 58 | GET | `/api/documents/:id` | ข้อมูลเอกสาร | Document |
| 59 | POST | `/api/documents/upload` | อัปโหลดเอกสาร | Document |
| 60 | DELETE | `/api/documents/:id` | ลบเอกสาร | Document |
| 61 | POST | `/api/documents/:id/share` | แชร์เอกสาร | Document |
| **Email** |||||
| 62 | GET | `/api/email/templates` | รายการเทมเพลต | Email |
| 63 | POST | `/api/email/templates` | สร้างเทมเพลต | Email |
| 64 | POST | `/api/email/send` | ส่งอีเมล | Email |
| 65 | POST | `/api/email/send-bulk` | ส่งอีเมลกลุ่ม | Email |
| 66 | GET | `/api/email/logs` | ประวัติการส่ง | Email |
| **Batch Jobs** |||||
| 67 | GET | `/api/batch/jobs` | รายการ Batch Jobs | Batch |
| 68 | POST | `/api/batch/jobs` | สร้าง Batch Job | Batch |
| 69 | POST | `/api/batch/jobs/:id/trigger` | รันทันที | Batch |
| 70 | GET | `/api/batch/jobs/:id/history` | ประวัติการรัน | Batch |
| **IoT** |||||
| 71 | GET | `/api/iot/devices` | รายการอุปกรณ์ | IoT |
| 72 | POST | `/api/iot/devices` | ลงทะเบียนอุปกรณ์ | IoT |
| 73 | GET | `/api/iot/devices/:id/location` | ตำแหน่งปัจจุบัน | IoT |
| 74 | GET | `/api/iot/devices/:id/history` | ประวัติตำแหน่ง | IoT |
| 75 | GET | `/api/iot/devices/:id/sensors` | ข้อมูลเซ็นเซอร์ | IoT |
| **WOS** |||||
| 76 | GET | `/api/wos/orders` | รายการ Order | WOS |
| 77 | GET | `/api/wos/orders/:id` | ข้อมูล Order | WOS |
| 78 | POST | `/api/wos/orders` | สร้าง Order | WOS |
| 79 | PATCH | `/api/wos/orders/:id/status` | อัปเดตสถานะ | WOS |
| 80 | POST | `/api/wos/orders/:id/cancel` | ยกเลิก Order | WOS |

---

# 19. สรุป Redis Cache Keys

## 19.1 รายการ Cache Keys

| # | Cache Key | รูปแบบ | TTL | คำอธิบาย | โมดูล |
|---|-----------|--------|-----|----------|-------|
| 1 | `user:{id}` | String | 1h | ข้อมูลผู้ใช้ | Auth |
| 2 | `user:permissions:{id}` | Set | 1h | สิทธิ์ของผู้ใช้ | Auth |
| 3 | `session:{token}` | String | 24h | Session Token | Auth |
| 4 | `refresh:{id}` | String | 7d | Refresh Token | Auth |
| 5 | `customer:{id}` | String | 30m | ข้อมูลลูกค้า | Customer |
| 6 | `customers:list` | List | 5m | รายการลูกค้า (Cache) | Customer |
| 7 | `job:{id}` | String | 30m | ข้อมูลงาน | Job Card |
| 8 | `jobs:board` | Hash | 1m | ข้อมูล Kanban Board | Job Card |
| 9 | `quotation:{id}` | String | 30m | ข้อมูล Quotation | Quotation |
| 10 | `po:{id}` | String | 30m | ข้อมูล PO | PO |
| 11 | `product:{id}` | String | 1h | ข้อมูลสินค้า | Inventory |
| 12 | `products:list` | List | 5m | รายการสินค้า | Inventory |
| 13 | `products:low-stock` | List | 1m | สินค้าสต็อกต่ำ | Inventory |
| 14 | `dashboard:stats` | String | 5m | สถิติ Dashboard | Dashboard |
| 15 | `dashboard:revenue` | String | 15m | ข้อมูลกราฟรายได้ | Dashboard |
| 16 | `translation:{lang}` | Hash | 1h | ข้อความแปลภาษา | i18n |
| 17 | `device:{id}` | String | 10s | ข้อมูลอุปกรณ์ IoT | IoT |
| 18 | `device:location:{id}` | String | 5s | ตำแหน่งล่าสุด | IoT |
| 19 | `rate-limit:{ip}` | String | 1m | Rate Limit | Core |
| 20 | `email:template:{id}` | String | 1h | เทมเพลตอีเมล | Email |

---

# 20. สรุป Rate Limit Policy

## 20.1 Rate Limit Rules

| # | Endpoint | Limit | Window | คำอธิบาย |
|---|----------|-------|--------|----------|
| 1 | `/api/auth/login` | 5 requests | 1 minute | ป้องกัน Brute Force |
| 2 | `/api/auth/forgot-password` | 3 requests | 1 hour | ป้องกัน Spam |
| 3 | `/api/auth/reset-password` | 5 requests | 10 minutes | ป้องกัน Brute Force |
| 4 | `/api/auth/refresh` | 10 requests | 1 minute | ป้องกัน Abuse |
| 5 | `/api/email/send` | 20 requests | 1 hour | ป้องกัน Spam |
| 6 | `/api/email/send-bulk` | 5 requests | 1 hour | ป้องกัน Spam |
| 7 | `/api/documents/upload` | 50 requests | 1 hour | ป้องกัน Storage Abuse |
| 8 | `/api/iot/devices` | 100 requests | 1 minute | อุปกรณ์ IoT ส่งข้อมูลบ่อย |
| 9 | `/api/wos/orders` | 30 requests | 1 minute | ป้องกัน Order Spam |
| 10 | API ทั่วไป | 100 requests | 1 minute | Default Rate Limit |

---

# 21. ภาคผนวก: การติดตั้งและการใช้งาน

## 21.1 สร้างโปรเจกต์ Angular

```bash
# สร้างโปรเจกต์ใหม่
ng new tabler-business-system --routing --style=scss
cd tabler-business-system
```

## 21.2 ติดตั้ง Dependencies

```bash
# Tabler UI Core
npm install tabler-ui

# Angular Tabler Icons (เลือกเฉพาะที่ใช้)
npm install angular-tabler-icons

# Angular CDK (สำหรับ Modal, Overlay, Drag & Drop)
npm install @angular/cdk

# State Management
npm install @ngrx/component-store

# HTTP Client
# (มีอยู่ใน Angular อยู่แล้ว)

# Chart Library (สำหรับ Dashboard)
npm install chart.js ng2-charts

# Date Library
npm install date-fns
```

## 21.3 ตั้งค่า Tabler ใน `angular.json`

```json
"styles": [
  "node_modules/tabler-ui/dist/assets/css/tabler.min.css",
  "node_modules/tabler-ui/dist/assets/css/demo.min.css",
  "src/styles.scss"
],
"scripts": [
  "node_modules/tabler-ui/dist/assets/js/tabler.min.js"
]
```

## 21.4 สร้าง Feature Module (ตัวอย่าง: Job Card)

```bash
# สร้างโครงสร้างโฟลเดอร์
mkdir -p src/app/features/job-card/{domain,data,presentation}

# สร้าง Domain Layer
ng generate interface features/job-card/domain/entities/job-card
ng generate interface features/job-card/domain/entities/job-status
ng generate class features/job-card/domain/use-cases/create-job --skip-tests
ng generate interface features/job-card/domain/repositories/job-card-repository

# สร้าง Data Layer
ng generate class features/job-card/data/repositories/job-card-repository-impl --skip-tests
ng generate service features/job-card/data/datasources/job-card-api --skip-tests

# สร้าง Presentation Layer (Pages)
ng generate component features/job-card/presentation/pages/job-list --standalone --skip-tests
ng generate component features/job-card/presentation/pages/job-detail --standalone --skip-tests
ng generate component features/job-card/presentation/pages/job-create --standalone --skip-tests
ng generate component features/job-card/presentation/pages/job-board --standalone --skip-tests

# สร้าง Routing
ng generate module features/job-card --routing --flat
```

## 21.5 ตั้งค่า Lazy Loading ใน `app.routes.ts`

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { PermissionGuard } from './shared/guards/permission.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./features/auth/presentation/pages/login/login.component').then(m => m.LoginComponent) },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./features/dashboard/presentation/pages/main-dashboard/main-dashboard.component').then(m => m.MainDashboardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'jobs',
    loadChildren: () => import('./features/job-card/job-card.module').then(m => m.JobCardModule),
    canActivate: [AuthGuard, PermissionGuard],
    data: { permission: 'job_card.view' }
  },
  // ... โมดูลอื่นๆ
];
```

---

## 📚 สรุป

ระบบนี้ถูกออกแบบด้วย **Angular Clean Architecture** 14 โมดูล ครอบคลุมการทำงานของธุรกิจครบวงจร โดยแยกแต่ละเลเยอร์อย่างชัดเจน:

| Layer | บทบาท |
|-------|-------|
| **Domain** | Business Logic บริสุทธิ์ ไม่พึ่งพาภายนอก |
| **Data** | จัดการข้อมูลจาก API/Database แปลงเป็นรูปแบบที่ Domain เข้าใจ |
| **Presentation** | แสดงผล UI ด้วย Tabler Theme + จัดการ Event |

**ข้อดีของการออกแบบนี้:**
- ✅ แต่ละโมดูลแยกจากกัน (Loose Coupling) — สามารถพัฒนาและทดสอบแยกส่วนได้
- ✅ Lazy Loading — โหลดเฉพาะโมดูลที่ใช้งาน ช่วยเพิ่มประสิทธิภาพ
- ✅ เปลี่ยนฐานข้อมูลหรือ API ได้ง่าย — Data Layer แยกจาก Domain
- ✅ ทดสอบง่าย — แต่ละเลเยอร์สามารถ Mock ได้
- ✅ รองรับการขยายในอนาคต — เพิ่มโมดูลใหม่ได้โดยไม่กระทบระบบเดิม
ต่อไปนี้คือเทมเพลต UI ทั้งหมดที่ครอบคลุมทุกหน้าจอของระบบบริหารจัดการธุรกิจ โดยใช้ **Tabler UI Theme** ร่วมกับ **Angular Clean Architecture** ซึ่งออกแบบมาให้แยกส่วนประกอบหลักเป็น **Header, Sidebar, Footer** และ **Body** อย่างชัดเจน เพื่อรองรับการทำงานหลายหน้าจอและการขยายระบบในอนาคต

---

## 🏗️ โครงสร้างหลักของ Layout (App Layout)

ไฟล์ `app.component.html` จะทำหน้าที่เป็นโครงสร้างหลัก (Shell) ของทั้งระบบ โดยประกอบด้วย 4 ส่วนหลัก:

*   **Sidebar**: เมนูนำทางด้านซ้าย
*   **Header**: แถบด้านบน (通知, โปรไฟล์ผู้ใช้, ภาษา)
*   **Body**: พื้นที่แสดงเนื้อหาของแต่ละหน้า (ใช้ `<router-outlet>`)
*   **Footer**: ส่วนท้ายของหน้า

```html
<!-- app.component.html -->
<div class="app-wrapper">
  <!-- Sidebar -->
  <app-sidebar></app-sidebar>

  <!-- Main Content -->
  <div class="page-wrapper">
    <!-- Header -->
    <app-header></app-header>

    <!-- Page Body -->
    <div class="page-body">
      <div class="container-xl">
        <router-outlet></router-outlet>
      </div>
    </div>

    <!-- Footer -->
    <app-footer></app-footer>
  </div>
</div>
```

```scss
// app.component.scss
.app-wrapper {
  display: flex;
  min-height: 100vh;
}

.page-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100vh;
  margin-left: 240px; /* ความกว้างของ Sidebar */
  background: var(--tblr-body-bg);
  transition: margin-left 0.3s ease;
}

.page-body {
  flex: 1;
  padding: 1.5rem 0;
}

// เมื่อ Sidebar ถูกยุบ
.sidebar-collapsed .page-wrapper {
  margin-left: 60px;
}
```

---

## 🧩 ส่วนประกอบหลัก (Core Components)

### 1. Sidebar Component (`sidebar.component.ts`)

```typescript
// sidebar.component.ts
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TablerIconComponent } from 'angular-tabler-icons';

export interface MenuItem {
  label: string;
  icon: string;
  route: string;
  children?: MenuItem[];
  permission?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TablerIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isCollapsed = signal(false);

  // ✅ เมนูทั้งหมดในระบบ
  menuItems: MenuItem[] = [
    {
      label: 'แดชบอร์ด',
      icon: 'layout-dashboard',
      route: '/dashboard',
    },
    {
      label: 'การจัดการงาน',
      icon: 'clipboard',
      route: '/jobs',
      children: [
        { label: 'รายการงาน', icon: 'list', route: '/jobs' },
        { label: 'บอร์ดงาน', icon: 'layout-kanban', route: '/jobs/board' },
        { label: 'สร้างงาน', icon: 'plus', route: '/jobs/create' },
      ],
    },
    {
      label: 'ลูกค้า',
      icon: 'users',
      route: '/customers',
      children: [
        { label: 'รายการลูกค้า', icon: 'list', route: '/customers' },
        { label: 'เพิ่มลูกค้า', icon: 'plus', route: '/customers/create' },
      ],
    },
    {
      label: 'ใบเสนอราคา',
      icon: 'file-text',
      route: '/quotations',
    },
    {
      label: 'ใบสั่งซื้อ',
      icon: 'shopping-cart',
      route: '/purchase-orders',
    },
    {
      label: 'สินค้าคงคลัง',
      icon: 'package',
      route: '/products',
    },
    {
      label: 'การชำระเงิน',
      icon: 'credit-card',
      route: '/payments',
    },
    {
      label: 'เอกสาร',
      icon: 'folder',
      route: '/documents',
    },
    {
      label: 'อุปกรณ์ IoT',
      icon: 'device-desktop',
      route: '/iot/devices',
    },
    {
      label: 'คำสั่งซื้อออนไลน์',
      icon: 'shopping-bag',
      route: '/wos/orders',
    },
    {
      label: 'ระบบ',
      icon: 'settings',
      route: '/settings',
      children: [
        { label: 'ผู้ใช้งาน', icon: 'user-circle', route: '/users' },
        { label: 'บทบาท', icon: 'shield', route: '/roles' },
        { label: 'ตั้งค่าระบบ', icon: 'settings', route: '/settings' },
      ],
    },
  ];

  toggleSidebar() {
    this.isCollapsed.update((v) => !v);
    document.body.classList.toggle('sidebar-collapsed');
  }
}
```

```html
<!-- sidebar.component.html -->
<nav class="navbar navbar-vertical navbar-expand-lg navbar-dark">
  <div class="container-fluid">
    <!-- Brand / Logo -->
    <div class="navbar-brand-wrapper">
      <a class="navbar-brand" routerLink="/">
        <i-tabler name="layout-dashboard" class="navbar-brand-icon"></i-tabler>
        <span class="navbar-brand-text">iCmon</span>
      </a>
      <button class="navbar-toggler" (click)="toggleSidebar()">
        <i-tabler name="menu-2"></i-tabler>
      </button>
    </div>

    <!-- Search -->
    <div class="navbar-search d-none d-lg-block">
      <input type="text" class="form-control" placeholder="ค้นหา..." />
    </div>

    <!-- Navigation Menu -->
    <div class="collapse navbar-collapse" id="sidebar-menu">
      <ul class="navbar-nav pt-lg-3">
        @for (item of menuItems; track item.route) {
        <li class="nav-item" [class.has-submenu]="item.children?.length">
          @if (!item.children) {
          <a
            class="nav-link"
            [routerLink]="item.route"
            routerLinkActive="active"
          >
            <i-tabler [name]="item.icon" class="nav-link-icon"></i-tabler>
            <span class="nav-link-text">{{ item.label }}</span>
          </a>
          } @else {
          <a
            class="nav-link dropdown-toggle"
            (click)="toggleSubmenu($event)"
            [class.active]="isChildActive(item)"
          >
            <i-tabler [name]="item.icon" class="nav-link-icon"></i-tabler>
            <span class="nav-link-text">{{ item.label }}</span>
          </a>
          <ul class="nav nav-sm flex-column submenu">
            @for (child of item.children; track child.route) {
            <li class="nav-item">
              <a
                class="nav-link"
                [routerLink]="child.route"
                routerLinkActive="active"
              >
                <i-tabler [name]="child.icon" class="nav-link-icon"></i-tabler>
                <span class="nav-link-text">{{ child.label }}</span>
              </a>
            </li>
            }
          </ul>
          }
        </li>
        }
      </ul>
    </div>

    <!-- Bottom Menu -->
    <div class="navbar-bottom">
      <hr class="navbar-divider" />
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" routerLink="/settings">
            <i-tabler name="settings" class="nav-link-icon"></i-tabler>
            <span class="nav-link-text">ตั้งค่า</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" (click)="logout()">
            <i-tabler name="logout" class="nav-link-icon"></i-tabler>
            <span class="nav-link-text">ออกจากระบบ</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

---

### 2. Header Component (`header.component.ts`)

```typescript
// header.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, TablerIconComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // สถานะการแจ้งเตือน
  notifications = [
    { id: 1, title: 'งานใหม่ถูกสร้าง', time: '5 นาทีที่แล้ว', read: false },
    { id: 2, title: 'Quotation ถูกอนุมัติ', time: '1 ชั่วโมงที่แล้ว', read: false },
    { id: 3, title: 'สต็อกสินค้าต่ำ', time: '2 ชั่วโมงที่แล้ว', read: true },
  ];

  unreadCount = this.notifications.filter((n) => !n.read).length;

  // เมนูโปรไฟล์
  profileMenu = [
    { label: 'โปรไฟล์', icon: 'user', route: '/profile' },
    { label: 'ตั้งค่า', icon: 'settings', route: '/settings' },
    { label: 'ออกจากระบบ', icon: 'logout', action: 'logout' },
  ];

  logout() {
    // TODO: Implement logout
  }
}
```

```html
<!-- header.component.html -->
<header class="navbar navbar-expand-md navbar-light d-print-none">
  <div class="container-fluid">
    <!-- Toggle Sidebar (Mobile) -->
    <button class="navbar-toggler" type="button" (click)="toggleSidebar()">
      <i-tabler name="menu-2"></i-tabler>
    </button>

    <!-- Page Title (Dynamic) -->
    <h1 class="navbar-brand navbar-brand-autodark d-none d-md-block">
      <span class="navbar-brand-text">{{ pageTitle() }}</span>
    </h1>

    <!-- Right Side -->
    <div class="navbar-nav flex-row ms-auto">
      <!-- Language Switcher -->
      <div class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
          <i-tabler name="language"></i-tabler>
          <span class="d-none d-md-inline">ไทย</span>
        </a>
        <div class="dropdown-menu dropdown-menu-end">
          <a class="dropdown-item active" (click)="setLanguage('th')">
            <i-tabler name="check" class="dropdown-icon"></i-tabler> ไทย
          </a>
          <a class="dropdown-item" (click)="setLanguage('en')">
            English
          </a>
        </div>
      </div>

      <!-- Notifications -->
      <div class="nav-item dropdown">
        <a class="nav-link" data-bs-toggle="dropdown">
          <i-tabler name="bell"></i-tabler>
          @if (unreadCount > 0) {
          <span class="badge bg-red">{{ unreadCount }}</span>
          }
        </a>
        <div class="dropdown-menu dropdown-menu-end dropdown-menu-card">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">การแจ้งเตือน</h3>
            </div>
            <div class="list-group list-group-flush">
              @for (n of notifications; track n.id) {
              <a class="list-group-item" [class.bg-light]="!n.read">
                <div class="row align-items-center">
                  <div class="col-auto">
                    <span class="status-dot status-dot-animated bg-red"></span>
                  </div>
                  <div class="col text-truncate">
                    <strong>{{ n.title }}</strong>
                    <div class="text-muted text-small">{{ n.time }}</div>
                  </div>
                </div>
              </a>
              }
            </div>
            <div class="card-footer text-center">
              <a routerLink="/notifications" class="link-primary">
                ดูทั้งหมด
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- User Profile -->
      <div class="nav-item dropdown">
        <a class="nav-link" data-bs-toggle="dropdown">
          <span class="avatar avatar-sm rounded-circle">
            <img src="/assets/images/avatar.jpg" alt="Profile" />
          </span>
          <span class="d-none d-md-inline ms-2">Admin</span>
        </a>
        <div class="dropdown-menu dropdown-menu-end">
          @for (item of profileMenu; track item.label) {
          @if (item.route) {
          <a class="dropdown-item" [routerLink]="item.route">
            <i-tabler [name]="item.icon" class="dropdown-icon"></i-tabler>
            {{ item.label }}
          </a>
          } @else {
          <a class="dropdown-item" (click)="logout()">
            <i-tabler [name]="item.icon" class="dropdown-icon"></i-tabler>
            {{ item.label }}
          </a>
          }
          }
        </div>
      </div>
    </div>
  </div>
</header>
```

---

### 3. Footer Component (`footer.component.ts`)

```typescript
// footer.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer footer-transparent d-print-none">
      <div class="container-xl">
        <div class="row text-center align-items-center flex-row-reverse">
          <div class="col-lg-auto ms-lg-auto">
            <ul class="list-inline list-inline-dots mb-0">
              <li class="list-inline-item">
                <a href="#" class="link-secondary">เกี่ยวกับ</a>
              </li>
              <li class="list-inline-item">
                <a href="#" class="link-secondary">ช่วยเหลือ</a>
              </li>
              <li class="list-inline-item">
                <a href="#" class="link-secondary">นโยบาย</a>
              </li>
            </ul>
          </div>
          <div class="col-12 col-lg-auto mt-3 mt-lg-0">
            <ul class="list-inline list-inline-dots mb-0">
              <li class="list-inline-item">
                Copyright &copy; {{ year() }} iCmon System
              </li>
              <li class="list-inline-item">เวอร์ชัน 1.0.0</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer {
        padding: 1rem 0;
        border-top: 1px solid var(--tblr-border-color);
        margin-top: auto;
      }
    `,
  ],
})
export class FooterComponent {
  year = () => new Date().getFullYear();
}
```

---

## 📄 ตัวอย่างหน้าจอ (Pages)

### 1. Dashboard Page (`dashboard.component.ts`)

```typescript
// dashboard.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconComponent } from 'angular-tabler-icons';

interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  totalCustomers: number;
  revenue: number;
  conversionRate: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TablerIconComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  stats = signal<DashboardStats | null>(null);
  loading = signal(true);

  // ข้อมูลกราฟ (ตัวอย่าง)
  chartData = {
    labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'],
    values: [65, 78, 90, 85, 95, 110],
  };

  // กิจกรรมล่าสุด
  recentActivities = [
    { user: 'สมชาย', action: 'สร้างงานใหม่', target: 'JC-2026-001', time: '5 นาทีที่แล้ว' },
    { user: 'นางสาวกนก', action: 'อนุมัติ Quotation', target: 'QT-2026-045', time: '1 ชั่วโมงที่แล้ว' },
    { user: 'นายวิชัย', action: 'อัปเดตสถานะงาน', target: 'JC-2026-023', time: '2 ชั่วโมงที่แล้ว' },
  ];

  ngOnInit() {
    // Simulate API call
    setTimeout(() => {
      this.stats.set({
        totalJobs: 156,
        activeJobs: 42,
        totalCustomers: 89,
        revenue: 45230,
        conversionRate: 3.2,
      });
      this.loading.set(false);
    }, 1000);
  }
}
```

```html
<!-- dashboard.component.html -->
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">📊 แดชบอร์ด</h2>
      <div class="text-muted mt-1">ภาพรวมระบบบริหารจัดการธุรกิจ</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <button class="btn btn-primary">
        <i-tabler name="download"></i> ส่งออกรายงาน
      </button>
    </div>
  </div>
</div>

<!-- Loading State -->
@if (loading()) {
<div class="text-center py-5">
  <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">กำลังโหลด...</span>
  </div>
</div>
} @else { @let s = stats()!

<!-- Stats Cards -->
<div class="row row-deck row-cards">
  <div class="col-sm-6 col-lg-3">
    <div class="card">
      <div class="card-body">
        <div class="d-flex align-items-center">
          <div class="subheader">งานทั้งหมด</div>
          <div class="ms-auto lh-1">
            <i-tabler name="clipboard" class="text-primary"></i-tabler>
          </div>
        </div>
        <div class="h1 mb-3">{{ s.totalJobs }}</div>
        <div class="text-muted">
          <span class="text-green">+12%</span> จากเดือนที่แล้ว
        </div>
      </div>
    </div>
  </div>

  <div class="col-sm-6 col-lg-3">
    <div class="card">
      <div class="card-body">
        <div class="d-flex align-items-center">
          <div class="subheader">งานที่กำลังดำเนินการ</div>
          <div class="ms-auto lh-1">
            <i-tabler name="loader-2" class="text-yellow"></i-tabler>
          </div>
        </div>
        <div class="h1 mb-3">{{ s.activeJobs }}</div>
        <div class="text-muted">
          <span class="text-yellow">●</span> กำลังดำเนินการ
        </div>
      </div>
    </div>
  </div>

  <div class="col-sm-6 col-lg-3">
    <div class="card">
      <div class="card-body">
        <div class="d-flex align-items-center">
          <div class="subheader">ลูกค้าทั้งหมด</div>
          <div class="ms-auto lh-1">
            <i-tabler name="users" class="text-blue"></i-tabler>
          </div>
        </div>
        <div class="h1 mb-3">{{ s.totalCustomers }}</div>
        <div class="text-muted">
          <span class="text-green">+8%</span> จากเดือนที่แล้ว
        </div>
      </div>
    </div>
  </div>

  <div class="col-sm-6 col-lg-3">
    <div class="card">
      <div class="card-body">
        <div class="d-flex align-items-center">
          <div class="subheader">รายได้</div>
          <div class="ms-auto lh-1">
            <i-tabler name="currency-bath" class="text-green"></i-tabler>
          </div>
        </div>
        <div class="h1 mb-3">฿{{ s.revenue | number }}</div>
        <div class="text-muted">
          <span class="text-green">+5.2%</span> จากเดือนที่แล้ว
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Charts & Activities -->
<div class="row mt-4">
  <div class="col-lg-8">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">รายได้รายเดือน</h3>
      </div>
      <div class="card-body">
        <!-- Chart Placeholder -->
        <div class="chart-area" style="height: 250px;">
          <div class="d-flex align-items-end h-100" style="gap: 8px;">
            @for (v of chartData.values; track $index) {
            <div class="flex-fill text-center">
              <div class="bg-primary" style="height: {{ v * 2 }}px; border-radius: 4px; min-height: 10px;"></div>
              <small class="text-muted">{{ chartData.labels[$index] }}</small>
            </div>
            }
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="col-lg-4">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">กิจกรรมล่าสุด</h3>
      </div>
      <div class="list-group list-group-flush">
        @for (activity of recentActivities; track $index) {
        <div class="list-group-item">
          <div class="row align-items-center">
            <div class="col-auto">
              <span class="avatar avatar-sm">{{ activity.user.charAt(0) }}</span>
            </div>
            <div class="col text-truncate">
              <strong>{{ activity.user }}</strong>
              <span class="text-muted">{{ activity.action }}</span>
              <div class="text-muted text-small">{{ activity.time }}</div>
            </div>
            <div class="col-auto">
              <span class="badge bg-primary">{{ activity.target }}</span>
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  </div>
</div>
}
```

---

### 2. หน้าตารางข้อมูล (Table Page) - ตัวอย่าง Job List

```typescript
// job-list.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';

interface Job {
  id: string;
  jobNumber: string;
  customer: string;
  device: string;
  status: 'pending' | 'in_progress' | 'completed' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo: string;
  createdAt: Date;
}

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, RouterLink, TablerIconComponent],
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent {
  jobs = signal<Job[]>([
    {
      id: '1',
      jobNumber: 'JC-2026-001',
      customer: 'บริษัท ABC จำกัด',
      device: 'เครื่องปรับอากาศ',
      status: 'in_progress',
      priority: 'high',
      assignedTo: 'สมชาย',
      createdAt: new Date('2026-01-15'),
    },
    // ... more data
  ]);

  statusColors = {
    pending: 'bg-yellow',
    in_progress: 'bg-blue',
    completed: 'bg-green',
    closed: 'bg-gray',
  };

  priorityColors = {
    low: 'bg-gray',
    medium: 'bg-blue',
    high: 'bg-yellow',
    urgent: 'bg-red',
  };

  // Pagination
  currentPage = signal(1);
  totalPages = signal(10);
  pageSize = signal(10);
}
```

```html
<!-- job-list.component.html -->
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">📋 รายการงาน</h2>
      <div class="text-muted mt-1">จัดการงานทั้งหมดในระบบ</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <a routerLink="/jobs/create" class="btn btn-primary">
        <i-tabler name="plus"></i> สร้างงานใหม่
      </a>
    </div>
  </div>
</div>

<!-- Filters -->
<div class="card mb-3">
  <div class="card-body">
    <div class="row g-3">
      <div class="col-md-3">
        <label class="form-label">ค้นหา</label>
        <input type="text" class="form-control" placeholder="เลขงาน, ลูกค้า..." />
      </div>
      <div class="col-md-2">
        <label class="form-label">สถานะ</label>
        <select class="form-select">
          <option value="">ทั้งหมด</option>
          <option value="pending">รอดำเนินการ</option>
          <option value="in_progress">กำลังดำเนินการ</option>
          <option value="completed">เสร็จสิ้น</option>
          <option value="closed">ปิดงาน</option>
        </select>
      </div>
      <div class="col-md-2">
        <label class="form-label">ความสำคัญ</label>
        <select class="form-select">
          <option value="">ทั้งหมด</option>
          <option value="low">ต่ำ</option>
          <option value="medium">ปานกลาง</option>
          <option value="high">สูง</option>
          <option value="urgent">เร่งด่วน</option>
        </select>
      </div>
      <div class="col-md-2">
        <label class="form-label">วันที่เริ่ม</label>
        <input type="date" class="form-control" />
      </div>
      <div class="col-md-3 d-flex align-items-end">
        <button class="btn btn-primary me-2">
          <i-tabler name="search"></i> ค้นหา
        </button>
        <button class="btn btn-outline-secondary">
          <i-tabler name="refresh"></i> รีเซ็ต
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Table -->
<div class="card">
  <div class="table-responsive">
    <table class="table table-vcenter card-table">
      <thead>
        <tr>
          <th>เลขงาน</th>
          <th>ลูกค้า</th>
          <th>อุปกรณ์</th>
          <th>สถานะ</th>
          <th>ความสำคัญ</th>
          <th>ผู้รับผิดชอบ</th>
          <th>วันที่สร้าง</th>
          <th class="w-1"></th>
        </tr>
      </thead>
      <tbody>
        @for (job of jobs(); track job.id) {
        <tr>
          <td>
            <a [routerLink]="['/jobs', job.id]" class="text-reset">
              {{ job.jobNumber }}
            </a>
          </td>
          <td>{{ job.customer }}</td>
          <td>{{ job.device }}</td>
          <td>
            <span class="badge {{ statusColors[job.status] }}">
              {{ job.status | titlecase }}
            </span>
          </td>
          <td>
            <span class="badge {{ priorityColors[job.priority] }}">
              {{ job.priority | titlecase }}
            </span>
          </td>
          <td>{{ job.assignedTo }}</td>
          <td>{{ job.createdAt | date:'dd/MM/yyyy' }}</td>
          <td>
            <div class="btn-list flex-nowrap">
              <a [routerLink]="['/jobs', job.id]" class="btn btn-sm btn-primary">
                <i-tabler name="eye"></i>
              </a>
              <a [routerLink]="['/jobs/edit', job.id]" class="btn btn-sm btn-outline-primary">
                <i-tabler name="edit"></i>
              </a>
            </div>
          </td>
        </tr>
        }
      </tbody>
    </table>
  </div>

  <!-- Pagination -->
  <div class="card-footer d-flex align-items-center">
    <p class="m-0 text-muted">
      แสดง {{ (currentPage() - 1) * pageSize() + 1 }} ถึง
      {{ currentPage() * pageSize() }} จากทั้งหมด 156 รายการ
    </p>
    <ul class="pagination m-0 ms-auto">
      <li class="page-item" [class.disabled]="currentPage() === 1">
        <a class="page-link" (click)="prevPage()">‹</a>
      </li>
      @for (p of [].constructor(totalPages()); track $index) {
      <li class="page-item" [class.active]="currentPage() === $index + 1">
        <a class="page-link" (click)="goToPage($index + 1)">{{ $index + 1 }}</a>
      </li>
      }
      <li class="page-item" [class.disabled]="currentPage() === totalPages()">
        <a class="page-link" (click)="nextPage()">›</a>
      </li>
    </ul>
  </div>
</div>
```

---

### 3. หน้าฟอร์ม (Form Page) - ตัวอย่างสร้างงาน

```html
<!-- job-create.component.html -->
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">✏️ สร้างงานใหม่</h2>
      <div class="text-muted mt-1">กรอกรายละเอียดงานเพื่อสร้าง Job Card</div>
    </div>
  </div>
</div>

<form (ngSubmit)="onSubmit()" #jobForm="ngForm">
  <div class="row">
    <!-- Customer & Device Info -->
    <div class="col-lg-6">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">ข้อมูลลูกค้าและอุปกรณ์</h3>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <label class="form-label required">ลูกค้า</label>
            <select class="form-select" [(ngModel)]="job.customerId" name="customerId" required>
              <option value="">เลือกลูกค้า...</option>
              <option value="1">บริษัท ABC จำกัด</option>
              <option value="2">ห้างหุ้นส่วน XYZ</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label required">ประเภทอุปกรณ์</label>
            <select class="form-select" [(ngModel)]="job.deviceType" name="deviceType" required>
              <option value="">เลือกประเภท...</option>
              <option value="aircon">เครื่องปรับอากาศ</option>
              <option value="refrigerator">ตู้เย็น</option>
              <option value="washing">เครื่องซักผ้า</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">รุ่นอุปกรณ์</label>
            <input type="text" class="form-control" [(ngModel)]="job.deviceModel" name="deviceModel" />
          </div>
          <div class="mb-3">
            <label class="form-label">หมายเลขซีเรียล</label>
            <input type="text" class="form-control" [(ngModel)]="job.serialNumber" name="serialNumber" />
          </div>
        </div>
      </div>
    </div>

    <!-- Job Details -->
    <div class="col-lg-6">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">รายละเอียดงาน</h3>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <label class="form-label required">หัวข้องาน</label>
            <input type="text" class="form-control" [(ngModel)]="job.title" name="title" required />
          </div>
          <div class="mb-3">
            <label class="form-label required">รายละเอียดปัญหา</label>
            <textarea class="form-control" rows="4" [(ngModel)]="job.problemDescription" name="problemDescription" required></textarea>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label required">ความสำคัญ</label>
                <select class="form-select" [(ngModel)]="job.priority" name="priority" required>
                  <option value="low">ต่ำ</option>
                  <option value="medium">ปานกลาง</option>
                  <option value="high">สูง</option>
                  <option value="urgent">เร่งด่วน</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">ผู้รับผิดชอบ</label>
                <select class="form-select" [(ngModel)]="job.assignedTo" name="assignedTo">
                  <option value="">เลือก...</option>
                  <option value="1">สมชาย</option>
                  <option value="2">วิชัย</option>
                </select>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">วันที่ต้องการเริ่ม</label>
            <input type="date" class="form-control" [(ngModel)]="job.startDate" name="startDate" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Attachments -->
  <div class="card mt-3">
    <div class="card-header">
      <h3 class="card-title">ไฟล์แนบ</h3>
    </div>
    <div class="card-body">
      <div class="dropzone" (dragover)="onDragOver($event)" (drop)="onDrop($event)">
        <div class="dropzone-content">
          <i-tabler name="cloud-upload" class="dropzone-icon"></i-tabler>
          <p>ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์</p>
          <input type="file" class="dropzone-input" multiple (change)="onFileSelected($event)" />
        </div>
      </div>
      @if (uploadedFiles().length > 0) {
      <div class="mt-3">
        <div class="list-group">
          @for (file of uploadedFiles(); track file.name) {
          <div class="list-group-item d-flex align-items-center">
            <i-tabler name="file" class="me-2"></i-tabler>
            <span class="flex-fill">{{ file.name }}</span>
            <span class="text-muted">{{ file.size | fileSize }}</span>
            <button class="btn btn-sm btn-ghost-danger" (click)="removeFile($index)">
              <i-tabler name="x"></i>
            </button>
          </div>
          }
        </div>
      </div>
      }
    </div>
  </div>

  <!-- Actions -->
  <div class="card mt-3">
    <div class="card-body d-flex gap-2">
      <button type="submit" class="btn btn-primary" [disabled]="jobForm.invalid">
        <i-tabler name="check"></i> สร้างงาน
      </button>
      <button type="button" class="btn btn-outline-secondary" routerLink="/jobs">
        <i-tabler name="x"></i> ยกเลิก
      </button>
    </div>
  </div>
</form>
```

---

## 🗺️ การตั้งค่า Routing (app.routes.ts)

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { PermissionGuard } from './shared/guards/permission.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // Public routes
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/presentation/pages/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },

  // Protected routes with layout
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/presentation/pages/main-dashboard/main-dashboard.component').then(
            (m) => m.MainDashboardComponent
          ),
      },
      {
        path: 'jobs',
        loadChildren: () =>
          import('./features/job-card/job-card.routes').then((m) => m.JOB_CARD_ROUTES),
        canActivate: [PermissionGuard],
        data: { permission: 'job_card.view' },
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./features/customer/customer.routes').then((m) => m.CUSTOMER_ROUTES),
      },
      {
        path: 'quotations',
        loadChildren: () =>
          import('./features/quotation/quotation.routes').then((m) => m.QUOTATION_ROUTES),
      },
      // ... โมดูลอื่นๆ
    ],
  },
];
```

---

## 📁 โครงสร้างโฟลเดอร์ที่สมบูรณ์

```
src/app/
├── core/                          # ⚙️ Core Layer
│   ├── config/
│   │   ├── app.config.ts
│   │   └── api.config.ts
│   ├── constants/
│   │   ├── app.constants.ts
│   │   └── enums.ts
│   ├── utils/
│   │   ├── validators.ts
│   │   └── formatters.ts
│   └── interceptors/
│       ├── auth.interceptor.ts
│       └── error.interceptor.ts
│
├── shared/                        # 🔄 Shared Components
│   ├── components/
│   │   ├── buttons/
│   │   ├── cards/
│   │   ├── modals/
│   │   ├── tables/
│   │   └── forms/
│   ├── directives/
│   ├── pipes/
│   └── guards/
│
├── layouts/                       # 🏗️ Layout Components
│   ├── app-layout/
│   │   ├── app-layout.component.ts
│   │   └── app-layout.component.html
│   ├── header/
│   │   ├── header.component.ts
│   │   └── header.component.html
│   ├── sidebar/
│   │   ├── sidebar.component.ts
│   │   └── sidebar.component.html
│   └── footer/
│       ├── footer.component.ts
│       └── footer.component.html
│
├── features/                      # 📦 Feature Modules
│   ├── auth/
│   ├── job-card/
│   ├── customer/
│   ├── quotation/
│   ├── purchase-order/
│   ├── inventory/
│   ├── payment/
│   ├── dashboard/
│   ├── document/
│   ├── email/
│   ├── batch/
│   ├── i18n/
│   ├── iot/
│   └── wos/
│
├── app.component.ts
├── app.component.html
├── app.component.scss
└── app.routes.ts
```

---

## 🎨 ธีมและการปรับแต่ง

### ไฟล์ `styles.scss` หลัก

```scss
// styles.scss
// 1. Import Tabler UI
@import 'tabler-ui/dist/assets/css/tabler.min.css';
@import 'tabler-ui/dist/assets/css/demo.min.css';

// 2. Custom Variables (Override Tabler)
:root {
  --tblr-primary: #206bc4;
  --tblr-primary-rgb: 32, 107, 196;
  --tblr-secondary: #6c7a91;
  --tblr-success: #2fb344;
  --tblr-info: #4299e1;
  --tblr-warning: #f5a623;
  --tblr-danger: #d63939;
  --tblr-font-sans-serif: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

// 3. Dark Theme Support
[data-theme="dark"] {
  --tblr-body-bg: #1a1d20;
  --tblr-body-color: #adb5bd;
  --tblr-bg-surface: #24282c;
  --tblr-border-color: #2c3034;
}

// 4. Custom Global Styles
body {
  font-family: var(--tblr-font-sans-serif);
}

.page-wrapper {
  background: var(--tblr-body-bg);
  transition: margin-left 0.3s ease;
}

// Sidebar Transition
.sidebar-collapsed .page-wrapper {
  margin-left: 60px;
}

// Custom Scrollbar
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: var(--tblr-bg-surface);
}

::-webkit-scrollbar-thumb {
  background: var(--tblr-border-color);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--tblr-secondary);
}
```

---

## 📦 สรุป Package ที่ต้องติดตั้ง

```bash
# Core
npm install tabler-ui
npm install angular-tabler-icons

# Angular CDK (สำหรับ Modal, Overlay, Drag & Drop)
npm install @angular/cdk

# State Management
npm install @ngrx/component-store

# Chart Library
npm install chart.js ng2-charts

# Date Library
npm install date-fns
```

---

## 🚀 วิธีการรันโปรเจกต์

```bash
# 1. สร้างโปรเจกต์
ng new biz-admin-system --routing --style=scss

# 2. ติดตั้ง dependencies
npm install

# 3. รันโปรเจกต์
ng serve

# 4. เปิด ที่ http://localhost:4200
```

---

- npm install --legacy-peer-deps
- npm install angular-tabler-icons --legacy-peer-deps
- npm install ngx-tabler-icons @ngx-translate/core @ngx-translate/http-loader --save --legacy-peer-deps


Ensure CORS response header values are valid

curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"username":"kongnakornna","password":"password"}'


# Development
docker-compose up dev

# Production
docker compose --profile production up production


 The commands you've written have a few issues with syntax and workflow. Here's the corrected version:

## Corrected Commands

```bash
# 1. Stop and remove containers, networks, and volumes
docker-compose down -v

# 2. Build without cache (correct syntax)
docker-compose build --no-cache dev

# 3. Start watch mode (two options)
# Option A: Watch in the background, then start services
docker-compose watch dev
docker-compose up -d dev

# Option B: Combine watch with up (if your compose version supports it)
docker-compose up --watch dev
```

## Explanation of Issues

1. **`docker-compose watch dev`** - This command starts the watch process but doesn't start containers. You need to run `docker-compose up` separately or use `--watch` flag with up.

2. **`docker-compose up watch dev`** - This is incorrect syntax. The `watch` argument isn't valid here. The correct flags are:
   - `--watch` (for watching file changes)
   - `-d` (for detached mode)

## Recommended Workflow

For development with hot-reload/watch mode:

```bash
# Clean up everything
docker-compose down -v

# Rebuild without cache
docker-compose build --no-cache dev

# Start with watch mode in detached mode
docker-compose up --watch -d dev

# Or if you want to see logs
docker-compose up --watch dev
```

## Alternative: Two-Step Approach

If you prefer separate commands for better control:

```bash
# Terminal 1 - Start services
docker-compose up -d dev

# Terminal 2 - Start watch mode
docker-compose watch dev
```

## Check Docker Compose Version

Make sure your Docker Compose version supports `--watch`:

```bash
docker-compose version
```

 https://tabler.io/icons
 
 # Note 
 
 ทำระบบ UI Dashboard config sensor to mqtt use angularjs เหมือน +node-red  มา 1 modules  จำลองข้อมูลมาก่อน
 
 ทำระบบ UI Dashboard config sensor to mqtt use angularjs เหมือน  Module  AI Catboot มา 1 modules  จำลองข้อมูลมาก่อน

C:\github\angular-clean-architecture\src\environments
C:\github\angular-clean-architecture\src\environments\environment.ts
C:\github\angular-clean-architecture\src\environments\environment.prod.ts
C:\github\angular-clean-architecture\proxy.conf.json


 