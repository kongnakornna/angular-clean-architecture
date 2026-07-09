# iCmon — Developer Manual

## 02 — Project Structure

```
src/
├── app/
│   ├── app.module.ts                          # Root module
│   ├── app.component.ts                       # Root component
│   ├── app-routing.module.ts                  # All routes (lazy-loaded)
│   │
│   ├── core/                                   # ⚙️ Cross-cutting concerns
│   │   ├── config/
│   │   │   ├── app.config.ts                  # AppConfig interface + InjectionToken
│   │   │   └── api.config.ts                  # All API endpoint paths
│   │   ├── constants/
│   │   │   ├── app.constants.ts               # Storage keys, cache TTL, rate limits
│   │   │   └── enums.ts                       # UserRole, JobStatus, etc.
│   │   ├── contracts/
│   │   │   ├── usecase.contract.ts            # Usecase<T, R> interface
│   │   │   └── mapper.contract.ts             # Mapper<E, R> abstract class
│   │   ├── di/
│   │   │   ├── tokens.ts                      # 14 InjectionToken for repositories
│   │   │   └── providers.ts                   # REPOSITORY_PROVIDERS array
│   │   ├── interceptors/
│   │   │   ├── auth.interceptor.ts            # JWT + refresh token
│   │   │   └── error.interceptor.ts           # Thai error messages
│   │   ├── params/
│   │   │   ├── param.payload.ts               # Param<T> wrapper
│   │   │   └── no-param.paylod.ts             # NoParam sentinel
│   │   ├── services/
│   │   │   ├── layout.service.ts              # Theme, font, color signals
│   │   │   ├── page-seo.service.ts            # Meta tags + title
│   │   │   └── theme-switcher.service.ts      # Dark/light toggle
│   │   ├── types/
│   │   │   └── types.ts                       # Result interface
│   │   ├── utils/
│   │   │   ├── helpers.ts                     # generateId, debounce, status labels
│   │   │   ├── validators.ts                  # email, phone, password validators
│   │   │   └── formatters.ts                  # currency, date, fileSize formatters
│   │   └── core.module.ts
│   │
│   ├── shared/                                 # 🔄 Reusable components
│   │   ├── components/
│   │   │   ├── buttons/primary-button/        # Button with icon + loading
│   │   │   ├── modals/confirm-modal/          # Confirm dialog
│   │   │   └── toast/toast/                   # Notification toast
│   │   ├── services/
│   │   │   └── toast.service.ts               # Toast state management
│   │   ├── guards/
│   │   │   ├── auth.guard.ts                  # Token check → /login
│   │   │   └── permission.guard.ts            # Role-based access
│   │   ├── directives/
│   │   │   └── click-outside.directive.ts     # Click outside handler
│   │   ├── pipes/
│   │   │   ├── translate.pipe.ts              # @ngx-translate wrapper
│   │   │   ├── status-label.pipe.ts           # Thai status labels
│   │   │   └── file-size.pipe.ts              # Human-readable sizes
│   │   ├── i18n/                              # Full Clean Architecture i18n
│   │   │   ├── domain/                        # Entities, use cases, repo interface
│   │   │   ├── data/                          # Local datasource + service + impl
│   │   │   └── presentation/                  # Language selector + pipe
│   │   └── shared.module.ts
│   │
│   ├── layouts/                                # 🏗️ App shell
│   │   ├── app-layout/                        # Main layout (sidebar + header + router-outlet)
│   │   ├── header/                            # Top nav bar (theme, notifications, user menu)
│   │   ├── sidebar/                           # Vertical nav (30+ items, nested)
│   │   ├── footer/                            # Copyright + links
│   │   ├── page-header/                       # Section title + breadcrumb
│   │   └── layout-settings/                   # Offcanvas theme customizer
│   │
│   └── features/                               # 📦 14 Feature Modules
│       ├── auth/                              # 🔐 Authentication
│       │   ├── domain/                        # User, Permission entities + use cases
│       │   ├── data/                          # API datasource + DTOs + demo repo
│       │   └── presentation/                  # 11 pages (login, forgot, users, roles...)
│       │
│       ├── job-card/                          # 📋 Job Card (Module)
│       │   ├── domain/                        # JobCard entity + 7 use cases
│       │   ├── data/                          # API datasource + DTOs + impl
│       │   └── presentation/                  # 4 pages (list, detail, create, board)
│       │
│       ├── customer/                          # 👤 Customer
│       ├── quotation/                         # 📄 Quotation
│       ├── purchase-order/                    # 🛒 Purchase Order
│       ├── inventory/                         # 📦 Inventory
│       ├── payment/                           # 💳 Payment
│       ├── dashboard/                         # 📊 Dashboard
│       ├── document/                          # 📁 Document
│       ├── email/                             # ✉️ Email
│       ├── batch/                            # ⏰ Batch Jobs
│       ├── iot/                              # 📡 IoT
│       ├── wos/                              # 🛍️ Web Order System
│       └── tabler/                           # 🎨 Tabler demo pages (Module)
│
├── assets/
│   ├── images/
│   ├── i18n/                                  # en.json, th.json
│   └── tabler/                                # Tabler JS + CSS dist
│
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
│
├── main.ts                                    # Bootstrap AppModule
├── index.html
├── styles.scss                                # Global styles
│
└── docs/                                      # Planning & documentation
```

### Feature Module Pattern (per module)

```
feature-name/
├── domain/
│   ├── entities/
│   │   ├── feature.entity.ts
│   │   └── feature-status.enum.ts
│   ├── use-cases/
│   │   ├── create-feature.use-case.ts
│   │   ├── list-features.use-case.ts
│   │   └── get-feature.use-case.ts
│   └── repositories/
│       └── feature.repository.ts               # Interface only
├── data/
│   ├── repositories/
│   │   └── feature.repository.impl.ts          # Implements interface
│   ├── datasources/
│   │   └── feature.api.datasource.ts           # HttpClient calls
│   └── dtos/
│       ├── create-feature-request.dto.ts
│       └── feature-response.dto.ts
└── presentation/
    ├── pages/
    │   ├── feature-list/
    │   ├── feature-detail/
    │   └── feature-create/
    └── components/
        └── feature-filters/
```

### Key Files

| File | Purpose |
|------|---------|
| `src/app/app.module.ts` | Root module — imports, declarations, providers |
| `src/app/app-routing.module.ts` | All routes with lazy loading + guards |
| `src/app/core/di/tokens.ts` | 14 `InjectionToken` for repository DI |
| `src/app/core/di/providers.ts` | Maps tokens → implementation classes |
| `src/app/core/interceptors/auth.interceptor.ts` | JWT attachment + 401 refresh |
| `src/app/core/config/api.config.ts` | All REST endpoint paths |
| `src/main.ts` | Bootstrap + locale registration |
| `angular.json` | Build config, budgets, assets |