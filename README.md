# iCmon — ระบบบริหารจัดการธุรกิจแบบครบวงจร

**Angular Clean Architecture + Tabler UI Theme**

---

# 1. ภาพรวมระบบ

## 1.1 วัตถุประสงค์
พัฒนาบน Angular Clean Architecture สำหรับธุรกิจขนาดกลางถึงขนาดใหญ่ ครอบคลุมการจัดการลูกค้า การเสนอราคา การสั่งซื้อ สต็อก การติดตามงาน และการชำระเงิน

## 1.2 เทคโนโลยีหลัก
| องค์ประกอบ | เทคโนโลยี |
|------------|-----------|
| **Frontend** | Angular 18, TypeScript, Tabler UI (SCSS), angular-tabler-icons |
| **State** | RxJS Signals, @ngrx/component-store |
| **Architecture** | Clean Architecture (Domain → Data → Presentation) |
| **Auth** | JWT + Refresh Token |
| **Backend** | Node.js (NestJS) / .NET Core 8 |

## 1.3 กลุ่มผู้ใช้งาน
| บทบาท | สิทธิ์ |
|--------|--------|
| **Admin** | ทุกโมดูล + จัดการผู้ใช้ |
| **Manager** | Job Card, Quotation, PO, Dashboard, Reports |
| **Staff** | Job Card, Customer, Inventory |
| **Technician** | Job Card (สถานะ), GPS/IoT |
| **Customer** | Web Order System |

---

# 2. การติดตั้ง

```bash
npm install
ng serve    # http://localhost:4200
ng build    # production ที่ dist/
```

## Dependencies
```bash
npm install angular-tabler-icons
npm install @angular/cdk @ngrx/component-store chart.js ng2-charts date-fns
```

---

# 3. สถาปัตยกรรม

```
┌─────────────────────────────────────────────────┐
│ PRESENTATION — Pages, Layouts, Components, Guards│
│  เรียกใช้ Use Cases → พึ่งพา Domain + Core       │
└──────────────────────┬──────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────┐
│ DOMAIN — Entities, Use Cases, Repository Intf.  │
│  Business Logic บริสุทธิ์ ไม่พึ่งพาภายนอก       │
└──────────────────────┬──────────────────────────┘
                       ▲ implements
┌──────────────────────┴──────────────────────────┐
│ DATA — Repository Impl, DataSources, DTOs       │
│  แปลงข้อมูล API → Domain format                 │
└──────────────────────┬──────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────┐
│ EXTERNAL — REST API, Database, Redis, Storage   │
└─────────────────────────────────────────────────┘
```

---

# 4. โครงสร้างโปรเจกต์

```
src/
├── app/
│   ├── core/                    # Config, Utils, Interceptors, Services
│   │   ├── services/            # LayoutService, ThemeSwitcherService
│   │   └── di/                  # DI tokens + providers
│   ├── shared/                  # Guards, Components, Directives, Pipes
│   ├── layouts/                 # AppLayout, Sidebar, Header, Footer, LayoutSettings
│   └── features/                # 14 Feature Modules (Clean Architecture)
│       ├── auth/                #   Login, Forgot/Reset, SignUp, Lock, 2FA
│       ├── job-card/            #   Job List/Detail/Create/Board (Kanban)
│       ├── customer/            #   Customer CRUD
│       ├── quotation/           #   Quotation → PDF
│       ├── purchase-order/      #   PO → Approval
│       ├── inventory/           #   Product, Stock, Categories
│       ├── payment/             #   Payment + Invoice
│       ├── dashboard/           #   KPI Cards, Charts, Activities
│       ├── document/            #   Upload/Preview/Share
│       ├── email/               #   Templates, Compose, Logs
│       ├── batch/               #   Scheduled Jobs
│       ├── iot/                 #   Device, GPS, Sensors
│       └── wos/                 #   Web Order System
├── scss/                        # Tabler SCSS (config, bootstrap, ui, custom)
│   ├── tabler/
│   └── custom/
├── assets/
└── docs/
```

---

# 5. โมดูลทั้ง 14

| โมดูล | Entities | Use Cases | Pages |
|-------|----------|-----------|-------|
| **Auth** | User, Permission | login, logout, refresh, checkPermission | Login, SignUp, Lock, 2FA |
| **Job Card** | JobCard, JobStatus, JobPriority | create, update, assign, list | List, Detail, Create, Board |
| **Customer** | Customer, CustomerContact | create, update, search, list | List, Detail, Create |
| **Quotation** | Quotation, QuotationItem | create, approve, reject, pdf | List, Detail, Create |
| **Purchase Order** | PurchaseOrder, POItem | create, approve, list | List, Detail, Create |
| **Inventory** | Product, Category, StockMovement | create, adjustStock, list | Product List, Stock Adjust |
| **Payment** | Payment, Invoice | create, verify, generateInvoice | Payment List, Invoice View |
| **Dashboard** | DashboardStats, Report | getStats, getRevenueChart | Dashboard, Reports, Analytics |
| **Document** | Document, DocumentFolder | upload, list, delete, share | List, Upload, Preview |
| **Email** | EmailTemplate, EmailLog | send, sendBulk, createTemplate | Templates, Compose, Logs |
| **Batch** | BatchJob, JobSchedule | create, list, trigger | List, Create |
| **i18n** | Translation | getTranslation, setLanguage | Language Selector |
| **IoT** | Device, GPSData, SensorData | register, getLocation, getHistory | Device List, Map, Detail |
| **WOS** | WebOrder, OrderItem | create, updateStatus, cancel | Order List, Detail, Create |

---

# 6. เส้นทางทั้งหมด

| หมวด | เส้นทาง | หน้า |
|------|---------|------|
| **Auth** | `/login`, `/sign-up`, `/forgot-password`, `/lock-screen`, `/two-step-verification`, `/two-step-code`, `/reset-password` | หน้าล็อกอิน/สมัคร/ล็อก/ยืนยันตัวตน |
| **หลัก** | `/dashboard`, `/reports`, `/analytics` | แดชบอร์ด KPI + Charts + รายงาน |
| **งาน** | `/jobs`, `/jobs/board`, `/jobs/create` | Job List, Kanban, Create |
| **ลูกค้า** | `/customers`, `/customers/create` | Customer List/Create |
| **ขาย** | `/quotations`, `/purchase-orders` | Quotation/PO |
| **สินค้า** | `/products` | Product/Stock |
| **เงิน** | `/payments`, `/invoices` | Payment List, Invoice View |
| **เอกสาร** | `/documents` | Document List |
| **อีเมล** | `/email/templates`, `/email/compose`, `/email/logs` | Email Templates, Compose, Logs |
| **Batch** | `/batch/jobs` | Batch Jobs |
| **IoT** | `/iot/devices`, `/wos/orders` | IoT Devices, WOS Orders |
| **ระบบ** | `/users`, `/roles`, `/settings/language` | ผู้ใช้, บทบาท, ภาษา |

---

# 7. การพัฒนาต่อยอด

```bash
# สร้าง feature module ใหม่
mkdir -p src/app/features/{name}/{domain,data,presentation}
# domain → entities, use-cases, repositories (interfaces)
# data  → repositories impl, datasources, dtos
# presentation → pages, components

# เพิ่ม lazy-loaded route ใน app-routing.module.ts
```

---

# 8. Build & Deploy

```bash
ng build --configuration production    # dist/
```
ไฟล์ทั้งหมดอยู่ภายใต้ `dist/` พร้อม deploy ต่อ

---

*ระบบนี้ใช้ Tabler SCSS ผ่านการ import ใน `src/scss/tabler/` ตรงจาก GitHub dev branch*


npm install --legacy-peer-deps
npm audit fix

C:\github\angular-clean-architecture\src\assets\tabler\includes\layout