# Core Module

โมดูลกลางที่ให้บริการข้ามทั้งแอปพลิเคชัน ประกอบด้วย singleton services, HTTP interceptors, DI tokens, การตั้งค่า, และ constants ต่าง ๆ

## โครงสร้างโฟลเดอร์

```
core/
├── config/
│   ├── api.config.ts          # API_ENDPOINTS - จุดสิ้นสุด API ทั้งหมด
│   └── app.config.ts          # AppConfig interface + InjectionToken + ค่าเริ่มต้น
├── constants/
│   ├── app.constants.ts       # APP_CONSTANTS, CACHE_TTL, RATE_LIMIT
│   └── enums.ts               # Enum ต่าง ๆ (UserRole, JobStatus, ฯลฯ)
├── contracts/
│   ├── usecase.contract.ts    # Usecase interface (Input → Output)
│   └── mapper.contract.ts     # Mapper abstract class (Entity ↔ DTO)
├── di/
│   ├── tokens.ts              # InjectionToken สำหรับ repositories ทุกตัว
│   └── providers.ts           # REPOSITORY_PROVIDERS - mapping tokens → implementations
├── interceptors/
│   ├── auth.interceptor.ts    # AuthInterceptor - แนบ JWT Bearer Token, refresh on 401
│   └── error.interceptor.ts   # ErrorInterceptor - จัดการ HTTP errors
├── params/
│   ├── param.payload.ts       # Param<T> - wrapper สำหรับ use case parameters
│   └── no-param.paylod.ts     # NoParam - เมื่อ use case ไม่ต้องการ parameter
├── services/
│   ├── page-seo.service.ts    # PageSeoService - จัดการ meta tags และ title
│   └── theme-switcher.service.ts # ThemeSwitcherService - สลับธีม dark/light
├── types/
│   └── types.ts               # Result interface
├── utils/
│   ├── helpers.ts             # Helper functions (generateId, debounce, status labels)
│   ├── validators.ts          # AppValidators - validators สำหรับ Reactive Forms
│   └── formatters.ts          # Formatters - currency, date, phone, file size
├── core.module.ts
└── README.md
```

## รายละเอียด components

### Config

**`api.config.ts`** - `API_ENDPOINTS` object กำหนด path URL ทั้งหมดสำหรับ backend API แบ่งตาม module:
- `auth` - login, logout, refresh, forgot/reset password, me, permissions
- `users` - CRUD ผู้ใช้งาน
- `customers` - CRUD ลูกค้า พร้อม search
- `jobs` - CRUD งาน พร้อม status, assign, board
- `quotations` - CRUD ใบเสนอราคา พร้อม approve, reject, pdf
- `purchaseOrders` - CRUD ใบสั่งซื้อ พร้อม approve
- `products` - CRUD สินค้า พร้อม adjustStock, movements, lowStock
- `payments` - CRUD การชำระเงิน พร้อม verify, invoice
- `dashboard` - stats, revenue, activities, reports
- `documents` - CRUD เอกสาร พร้อม upload, share
- `email` - templates, send, sendBulk, logs
- `batch` - batch jobs CRUD และ trigger
- `iot` - IoT devices CRUD และ location, sensors
- `wos` - Web Order System orders CRUD

**`app.config.ts`** - กำหนด `AppConfig` interface และ `APP_CONFIG` InjectionToken พร้อมค่าเริ่มต้น (`DEFAULT_APP_CONFIG`) สำหรับ appName, version, apiBaseUrl, defaultLanguage, pageSize

### Constants

**`app.constants.ts`** - ประกอบด้วย:
- `APP_CONSTANTS` - ค่า keys สำหรับ localStorage (TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY, LANGUAGE_KEY, THEME_KEY, SIDEBAR_COLLAPSED_KEY)
- `CACHE_TTL` - ระยะเวลา cache เป็นวินาที สำหรับข้อมูลแต่ละประเภท
- `RATE_LIMIT` - จำกัดอัตราการเรียกใช้ API (limit requests / window ms)

**`enums.ts`** - ประกอบด้วย enum:
- `UserRole` - admin, manager, staff, technician, customer
- `JobStatus` - pending, assigned, in_progress, on_hold, completed, closed
- `JobPriority` - low, medium, high, urgent
- `QuotationStatus` - draft, sent, under_review, approved, rejected, converted_to_po
- `POStatus` - draft, pending_approval, approved, rejected, ordered, shipped, delivered
- `PaymentStatus` - pending, paid, failed, refunded
- `OrderStatus` - pending, confirmed, processing, shipped, delivered, cancelled

### Contracts

- **`usecase.contract.ts`** - กำหนด `Usecase<T, R>` interface สำหรับรูปแบบ Command Pattern รับ `param: T` คืน `R`
- **`mapper.contract.ts`** - กำหนด `Mapper<E, R>` abstract class สำหรับแปลงระหว่าง Entity และ Request DTO

### Dependency Injection

**`tokens.ts`** - ประกาศ `InjectionToken` สำหรับ repository interfaces ทั้งหมด 14 รายการ:
`AUTH_REPOSITORY`, `JOB_CARD_REPOSITORY`, `CUSTOMER_REPOSITORY`, `QUOTATION_REPOSITORY`, `PURCHASE_ORDER_REPOSITORY`, `INVENTORY_REPOSITORY`, `PAYMENT_REPOSITORY`, `DASHBOARD_REPOSITORY`, `DOCUMENT_REPOSITORY`, `EMAIL_REPOSITORY`, `BATCH_JOB_REPOSITORY`, `TRANSLATION_REPOSITORY`, `IOT_REPOSITORY`, `WEB_ORDER_REPOSITORY`

**`providers.ts`** - `REPOSITORY_PROVIDERS` array แมป InjectionToken แต่ละตัวไปยัง implementation class (เช่น `AuthRepositoryImpl`)

### Interceptors

**`AuthInterceptor`** - `HttpInterceptor` ที่:
1. อ่าน JWT token จาก `localStorage` ด้วย `APP_CONSTANTS.TOKEN_KEY`
2. แนบ `Authorization: Bearer <token>` header ไปกับทุก HTTP request
3. เมื่อเจอ 401 response จะพยายาม refresh token โดยอัตโนมัติ
4. ใช้ `BehaviorSubject` เพื่อป้องกัน race condition ตอน refresh token พร้อมกันหลาย request
5. ถ้าไม่มี refresh token หรือ refresh ล้มเหลว จะ logout และ redirect ไป `/login`

**`ErrorInterceptor`** - `HttpInterceptor` ที่:
1. จับ HTTP error ทุกตัวจาก `HttpClient`
2. แปลง error message เป็นภาษาไทยตาม HTTP status code (400, 401, 403, 404, 409, 422, 429, 500, 503)
3. แสดง console error และส่ง error object ต่อไปให้ caller

### Services

**`PageSeoService`** - จัดการ SEO meta tags:
- ใช้ `Meta` และ `Title` จาก Angular platform-browser
- รับ `SeoData` object (pageTitle, pageDescription, pageKeywords, pageUrl, author, pageImageUrl)
- ตั้งค่า title, meta description, meta keywords, meta author

**`ThemeSwitcherService`** - จัดการธีม dark/light:
- ใช้ `BehaviorSubject` เพื่อแจ้งเตือนค่าปัจจุบัน
- อ่าน/เขียนค่าลง `localStorage` ด้วย key `THEME_PREF`
- มี method `updateThemePref(value: 'dark' | 'light')`

### Params

- **`Param<T>`** - Generic wrapper class สำหรับส่ง parameter เข้า use case
- **`NoParam`** - ใช้แทนเมื่อ use case ไม่ต้องการ parameter

### Utils

- **`Helpers`** - generateId, debounce, truncate, getStatusColor, getPriorityLabel, getStatusLabel (ภาษาไทย)
- **`AppValidators`** - email, phoneNumber, passwordStrength, match validators สำหรับ Reactive Forms
- **`Formatters`** - currency (รูปแบบไทย THB), date (รูปแบบไทย), phoneNumber, fileSize, jobNumber

## การ register ใน CoreModule

`CoreModule` import `CommonModule` และ provide:
- `APP_CONFIG` ด้วย `DEFAULT_APP_CONFIG`
- `AuthInterceptor` ใน `HTTP_INTERCEPTORS` (multi: true)
- `ErrorInterceptor` ใน `HTTP_INTERCEPTORS` (multi: true)

**หมายเหตุ:** `REPOSITORY_PROVIDERS` ถูก provide ใน `AppModule` หรือ `FeatureModule` ที่เกี่ยวข้อง
