# iCmon — Developer Manual

## 04 — Core Module

### Overview

The `CoreModule` (`src/app/core/`) provides cross-cutting infrastructure shared by every layer. It is imported once in `AppModule`.

### Folder Layout

```
core/
├── config/           # AppConfig + API endpoints
├── constants/        # Keys, cache TTLs, enums
├── contracts/        # Usecase + Mapper interfaces
├── di/               # InjectionTokens + providers
├── interceptors/     # HTTP interceptors (auth, error)
├── params/           # Generic param wrappers
├── services/         # Layout, SEO, Theme services
├── types/            # Shared type definitions
└── utils/            # Helpers, validators, formatters
```

### AppConfig (`src/app/core/config/app.config.ts`)

Injected via `APP_CONFIG` InjectionToken across the app:

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

Provided in `AppModule` with merged environment values:
```typescript
{ provide: APP_CONFIG, useValue: { ...DEFAULT_APP_CONFIG, apiBaseUrl: environment.apiUrl, ... } }
```

### API Endpoints (`src/app/core/config/api.config.ts`)

Single source of truth for all REST paths:

| Category | Pattern | Example |
|----------|---------|---------|
| Auth | `auth/login`, `auth/refresh`, `auth/forgot-password` | `POST /auth/login` |
| Users | `users`, `users/:id` | `GET /users`, `PUT /users/:id` |
| Jobs | `jobs`, `jobs/:id`, `jobs/:id/status`, `jobs/:id/assign`, `jobs/board` | `GET /jobs?page=1&limit=10` |
| Customers | `customers`, `customers/:id`, `customers/search` | `GET /customers/search?q=xxx` |
| Quotations | `quotations`, `quotations/:id/approve`, `quotations/:id/pdf` | `POST /quotations` |
| Products | `products`, `products/:id/stock` | `PATCH /products/:id/stock` |
| Documents | `documents/upload` | `POST /documents/upload` (FormData) |

### DI Tokens (`src/app/core/di/tokens.ts`)

14 `InjectionToken`s — one per repository interface:

```
AUTH_REPOSITORY, JOB_CARD_REPOSITORY, CUSTOMER_REPOSITORY,
QUOTATION_REPOSITORY, PURCHASE_ORDER_REPOSITORY, INVENTORY_REPOSITORY,
PAYMENT_REPOSITORY, DASHBOARD_REPOSITORY, DOCUMENT_REPOSITORY,
EMAIL_REPOSITORY, BATCH_JOB_REPOSITORY, TRANSLATION_REPOSITORY,
IOT_REPOSITORY, WEB_ORDER_REPOSITORY
```

### DI Providers (`src/app/core/di/providers.ts`)

Maps each token → implementation class. Provided in `AppModule`:
```typescript
providers: [
  ...REPOSITORY_PROVIDERS,
  // Demo override:
  ...(environment.demo ? [{ provide: AUTH_REPOSITORY, useClass: DemoAuthRepositoryImpl }] : []),
]
```

### Interceptors

**AuthInterceptor** (`src/app/core/interceptors/auth.interceptor.ts`)
- Reads `access_token` from localStorage
- Attaches `Authorization: Bearer <token>` header
- On 401: attempts refresh token (TODO — returns stub `'new-token'`)
- On failed refresh: clears localStorage, redirects `/login`
- Uses `BehaviorSubject` to queue concurrent 401s

**ErrorInterceptor** (`src/app/core/interceptors/error.interceptor.ts`)
- Maps HTTP status codes → Thai error messages:
  - 400: "คำขอไม่ถูกต้อง"
  - 401: "ไม่ได้รับอนุญาต"
  - 403: "ไม่มีสิทธิ์เข้าถึง"
  - 404: "ไม่พบข้อมูล"
  - 500: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์"
  - 502/503: "เซิร์ฟเวอร์ไม่พร้อมให้บริการ"
- Logs to console.error
- Rethrows structured `{ status, message }`

### Utils

**Helpers** (`src/app/core/utils/helpers.ts`)
- `generateId()` → UUID v4
- `debounce(fn, delay)` — returns debounced function
- `truncate(text, maxLength)` — truncate with ellipsis
- `getStatusColor(status)` → Bootstrap bg class
- `getStatusLabel(status)` → Thai label
- `getPriorityLabel(priority)` → Thai label

**Validators** (`src/app/core/utils/validators.ts`)
- `AppValidators.email()` — custom email regex
- `AppValidators.phoneNumber()` — Thai phone format
- `AppValidators.passwordStrength()` — min 8, uppercase, lowercase, digit
- `AppValidators.match(field)` — confirm password match

**Formatters** (`src/app/core/utils/formatters.ts`)
- `currency(amount)` — THB locale (฿1,234.50)
- `date(value, format)` — th-TH locale
- `phoneNumber(phone)` — XX-XXX-XXXX
- `fileSize(bytes)` — Bytes/KB/MB/GB
- `jobNumber(seq, year)` — JC-2026-0001