# iCmon — Developer Manual

## 06 — Feature Modules Reference

### Adding a New Feature Module

1. Create folder: `src/app/features/<name>/`
2. Create 3 sub-folders: `domain/`, `data/`, `presentation/`
3. Add `InjectionToken` in `core/di/tokens.ts`
4. Add provider mapping in `core/di/providers.ts`
5. Add API endpoints in `core/config/api.config.ts`
6. Add route in `app-routing.module.ts`
7. Register tabler icons in `app.module.ts` (if needed)

### Auth Module (`src/app/features/auth/`)

| File | Path |
|------|------|
| Entities | `domain/entities/user.entity.ts`, `permission.entity.ts` |
| Repo Interface | `domain/repositories/auth.repository.ts` |
| Use Cases | `domain/use-cases/{login,logout,refresh-token,forgot-password,reset-password,sign-up,check-permission}.use-case.ts` |
| API DataSource | `data/datasources/auth.api.datasource.ts` |
| Repo Impl | `data/repositories/auth.repository.impl.ts` |
| Demo Repo | `data/repositories/auth.repository.demo.ts` |
| DTOs | `data/dtos/{login-request,login-response,register-request}.dto.ts` |
| Pages | `presentation/pages/{login,forgot-password,reset-password,sign-up,lock-screen,two-step-verification,two-step-code,user-list,user-create,role-list,theme-settings}/` |
| Layout | `presentation/layouts/auth-layout/` |

**Demo Credentials:** `admin / P@ssw0rd`

### Job Card Module (`src/app/features/job-card/`)

**Module:** `job-card.module.ts` — lazy-loaded via `loadChildren`

**Sub-routes:**
| Path | Component |
|------|-----------|
| `/jobs` | `JobListComponent` (list + filters + pagination) |
| `/jobs/board` | `JobListComponent` (TODO: dedicated Board) |
| `/jobs/create` | `JobListComponent` (TODO: dedicated Create) |
| `/jobs/:id` | `JobListComponent` (TODO: dedicated Detail) |
| `/jobs/edit/:id` | `JobListComponent` (TODO: dedicated Edit) |

**Entities:** `JobCard` (18 fields), `JobStatus` enum (6 states), `JobPriority` enum (4 levels)

**Status Flow:**
```
PENDING → ASSIGNED → IN_PROGRESS → COMPLETED → CLOSED
                    ↘ ON_HOLD ↗
```

**Use Cases:** create, update, get, list, assign, updateStatus (7 use cases)

### Customer Module (`src/app/features/customer/`)

**Entities:** `Customer`, `CustomerContact`

**Use Cases:** create, update, delete, get, list, search

**Pages:** `customer-list`, `customer-detail`, `customer-create`

### Quotation Module (`src/app/features/quotation/`)

**Entities:** `Quotation`, `QuotationItem`, `QuotationStatus` enum

**Status Flow:**
```
DRAFT → SENT → UNDER_REVIEW → APPROVED → CONVERTED_TO_PO
                           ↘ REJECTED
```

**Use Cases:** create, update, get, list, approve, reject

### Purchase Order Module (`src/app/features/purchase-order/`)

**Entities:** `PurchaseOrder`, `POItem`, `POStatus` enum

**Status Flow:**
```
DRAFT → PENDING_APPROVAL → APPROVED → ORDERED → SHIPPED → DELIVERED
                        ↘ REJECTED
```

### Inventory Module (`src/app/features/inventory/`)

**Entities:** `Product`, `Category`, `StockMovement`

**Use Cases:** create, update, get, list, adjustStock, getMovements

**Pages:** `product-list`, `product-detail`, `product-create`, `stock-adjustment`

### Payment Module (`src/app/features/payment/`)

**Entities:** `Payment`, `Invoice`, `PaymentStatus` enum

**Use Cases:** create, get, list, verify, generateInvoice

### Dashboard Module (`src/app/features/dashboard/`)

**Current State:** Uses mock data (`setTimeout` in `ngOnInit`) — not connected to repository.

**Pages:** `main-dashboard`, `reports`, `analytics`

### Other Modules — Quick Reference

| Module | Key Entity | Key Use Cases | Pages |
|--------|-----------|--------------|-------|
| **Document** | `AppDocument`, `DocumentFolder` | upload, list, get, delete, share | list, detail, upload |
| **Email** | `EmailTemplate`, `EmailLog` | send, sendBulk, createTemplate, getLogs | templates, compose, logs |
| **Batch** | `BatchJob`, `BatchJobHistory` | create, list, get, getHistory, trigger | list, create |
| **IoT** | `Device`, `GPSData`, `SensorData` | register, getLocation, getHistory, getSensorData | list, detail, map |
| **WOS** | `WebOrder`, `OrderItem`, `OrderStatus` | create, list, get, updateStatus, cancel | list, detail, create |
| **i18n** | `Translation` | getTranslation, setLanguage, getAvailableLanguages | language-selector |