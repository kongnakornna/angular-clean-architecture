# 04 — Core Module

`CoreModule` (`src/app/core/`) คือ infrastructure กลางที่ทุกเลเยอร์ใช้ร่วมกัน
import ครั้งเดียวใน `AppModule`

## AppConfig

`src/app/core/config/app.config.ts`

```typescript
export interface AppConfig {
  appName: string;
  version: string;
  apiBaseUrl: string;
  production: boolean;
  defaultLanguage: string;
  pageSize: number;
}
```

Inject ผ่าน token `APP_CONFIG`:

```typescript
// AppModule providers — merge ค่าจาก environment
{ provide: APP_CONFIG, useValue: { ...DEFAULT_APP_CONFIG, apiBaseUrl: environment.apiUrl } }
```

## API Endpoints

`src/app/core/config/api.config.ts` — **single source of truth** ของ REST paths

```typescript
export const API_ENDPOINTS = {
  customers: {
    list: '/customers',
    create: '/customers',
    update: (id: string) => `/customers/${id}`,
    search: '/customers/search',
  },
  // auth, users, jobs, quotations, products, documents, ...
} as const;
```

| Category | Pattern ตัวอย่าง |
|----------|-----------------|
| Auth | `auth/login`, `auth/refresh`, `auth/forgot-password` |
| Users | `users`, `users/:id` |
| Jobs | `jobs`, `jobs/:id/status`, `jobs/:id/assign`, `jobs/board` |
| Customers | `customers/search?q=xxx` |
| Quotations | `quotations/:id/approve`, `quotations/:id/pdf` |
| Products | `products/:id/stock` (PATCH) |
| Documents | `documents/upload` (FormData) |

## DI Tokens (`core/di/tokens.ts`)

ปัจจุบันมี **30+ InjectionTokens** — repository หลัก:

```
AUTH_REPOSITORY, JOB_CARD_REPOSITORY, CUSTOMER_REPOSITORY,
QUOTATION_REPOSITORY, PURCHASE_ORDER_REPOSITORY, INVENTORY_REPOSITORY,
PAYMENT_REPOSITORY, DASHBOARD_REPOSITORY, DOCUMENT_REPOSITORY,
EMAIL_REPOSITORY, BATCH_JOB_REPOSITORY, TRANSLATION_REPOSITORY,
IOT_REPOSITORY, ALARM_REPOSITORY, WEB_ORDER_REPOSITORY, ORDER_REPOSITORY,
SYSTEM_REPOSITORY, MQTT_REPOSITORY, AI_ANALYTICS_REPOSITORY, CHATBOT_REPOSITORY,
REPORT_REPOSITORY
```

Settings repositories:

```
SCHEDULE_REPOSITORY, LOCATION_REPOSITORY, HARDWARE_REPOSITORY,
SENSOR_REPOSITORY, NODERED_REPOSITORY, LINE_NOTIFICATION_REPOSITORY,
SMS_NOTIFICATION_REPOSITORY, HOST_REPOSITORY, API_SETTING_REPOSITORY,
TOKEN_REPOSITORY
```

Role Use Case tokens:

```
LIST_ROLES_USE_CASE, GET_ROLE_USE_CASE, CREATE_ROLE_USE_CASE,
UPDATE_ROLE_USE_CASE, DELETE_ROLE_USE_CASE, ASSIGN_ROLE_PERMISSIONS_USE_CASE
```

## DI Providers (`core/di/providers.ts`)

Map ทุก token → implementation class แล้ว spread เข้า AppModule:

```typescript
providers: [
  ...REPOSITORY_PROVIDERS,
  // Demo override:
  ...(environment.demo ? [{ provide: AUTH_REPOSITORY, useClass: DemoAuthRepositoryImpl }] : []),
]
```

## Interceptors

### AuthInterceptor (`core/interceptors/auth.interceptor.ts`)

- อ่าน `access_token` จาก localStorage → attach header `Authorization: Bearer <token>`
- ถ้าโดน 401 → พยายาม refresh token (ปัจจุบันยังเป็น stub)
- refresh ไม่สำเร็จ → clear localStorage + redirect `/login`
- ใช้ `BehaviorSubject` จัดคิว concurrent 401 requests

### ErrorInterceptor (`core/interceptors/error.interceptor.ts`)

แปลง HTTP status → ข้อความไทย:

| Status | Message |
|--------|---------|
| 400 | คำขอไม่ถูกต้อง |
| 401 | ไม่ได้รับอนุญาต |
| 403 | ไม่มีสิทธิ์เข้าถึง |
| 404 | ไม่พบข้อมูล |
| 500 | เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์ |
| 502/503 | เซิร์ฟเวอร์ไม่พร้อมให้บริการ |

แล้ว rethrow เป็น `{ status, message }`

## Contracts

```typescript
// core/contracts/usecase.contract.ts
export interface Usecase<T, R> {
  execute(params: T): Observable<R>;
}

// core/contracts/mapper.contract.ts
export abstract class Mapper<E, R> {
  abstract mapFrom(param: R): E;   // DTO → Entity
  abstract mapTo(param: E): R;     // Entity → DTO
}
```

## Params

```typescript
Param<T>      // wrapper สำหรับส่ง params เข้า use case
NoParam       // sentinel สำหรับ use case ที่ไม่ต้องมี params
```

## Utils

### Helpers (`helpers.ts`)
- `generateId()` → UUID v4
- `debounce(fn, delay)`
- `truncate(text, maxLength)`
- `getStatusColor(status)` → Bootstrap bg class
- `getStatusLabel(status)` → label ภาษาไทย
- `getPriorityLabel(priority)` → label ภาษาไทย

### Validators (`validators.ts`)
- `AppValidators.email()` — email regex
- `AppValidators.phoneNumber()` — เบอร์ไทย
- `AppValidators.passwordStrength()` — min 8 + uppercase + lowercase + digit
- `AppValidators.match(field)` — confirm password

### Formatters (`formatters.ts`)
- `currency(amount)` → `฿1,234.50`
- `date(value, format)` → locale th-TH
- `phoneNumber(phone)` → `XX-XXX-XXXX`
- `fileSize(bytes)` → KB/MB/GB
- `jobNumber(seq, year)` → `JC-2026-0001`

## Services

| Service | หน้าที่ |
|---------|---------|
| `LayoutService` | Theme/font/color/radius เป็น Signals + persist localStorage |
| `ThemeSwitcherService` | Dark/light toggle (`data-bs-theme` attribute) |
| `PageSeoService` | Set meta tags + page title |
