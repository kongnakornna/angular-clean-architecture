# 03 — โครงสร้างโปรเจกต์ (Project Structure)

## ภาพรวม `src/`

```
src/
├── app/
│   ├── app.module.ts                  # Root module (imports, providers)
│   ├── app.component.ts               # Root component
│   ├── app-routing.module.ts          # Route ทั้งหมด (lazy-loaded + guards)
│   │
│   ├── core/                          # ⚙️ Cross-cutting concerns
│   ├── shared/                        # 🔄 Reusable components/services
│   ├── layouts/                       # 🏗️ App shell (sidebar, header, ...)
│   └── features/                      # 📦 24 Feature Modules
│
├── assets/
│   ├── i18n/                          # en.json, th.json, ja.json, ... (10 ภาษา)
│   ├── images/
│   └── tabler/                        # Tabler JS/CSS dist
│
├── environments/
│   ├── environment.ts                 # Dev config
│   └── environment.prod.ts            # Prod config
│
├── main.ts                            # Bootstrap AppModule + locale th/en
├── index.html
└── styles.scss                        # Global styles
```

## Core (`src/app/core/`)

| โฟลเดอร์ | ไฟล์สำคัญ | หน้าที่ |
|----------|-----------|---------|
| `adapters/` | — | Adapter ต่อกับระบบภายนอก |
| `config/` | `app.config.ts`, `api.config.ts` | AppConfig token + API endpoint paths |
| `constants/` | `app.constants.ts`, `enums.ts` | Storage keys, cache TTL, UserRole, JobStatus |
| `contracts/` | `usecase.contract.ts`, `mapper.contract.ts` | Interface `Usecase<T,R>` + abstract `Mapper<E,R>` |
| `di/` | `tokens.ts`, `providers.ts` | InjectionTokens (~32 ตัว) + provider mapping |
| `interceptors/` | `auth.interceptor.ts`, `error.interceptor.ts` | JWT attach + error → ข้อความไทย |
| `params/` | `param.payload.ts`, `no-param.paylod.ts` | Param wrapper + NoParam sentinel |
| `services/` | `layout.service.ts`, `page-seo.service.ts`, `theme-switcher.service.ts` | Theme/SEO/Dark mode |
| `types/` | `types.ts` | Result interface |
| `utils/` | `helpers.ts`, `validators.ts`, `formatters.ts` | generateId, debounce, validators, formatters |

## Shared (`src/app/shared/`)

| โฟลเดอร์ | เนื้อหา |
|----------|---------|
| `components/` | PrimaryButton, ConfirmModal, Toast |
| `directives/` | ClickOutsideDirective |
| `guards/` | AuthGuard, PermissionGuard |
| `i18n/` | โมดูลแปลภาษาแบบ Clean Architecture (domain/data/presentation) |
| `models/` | Model ที่ใช้ร่วมกัน |
| `pipes/` | TranslatePipe, StatusLabelPipe, FileSizePipe |
| `services/` | ToastService |

## Layouts (`src/app/layouts/`)

```
layouts/
├── app-layout/        # Layout หลัก (sidebar + header + router-outlet + footer)
├── blank/             # หน้าเปล่า
├── classic/           # Layout แบบ classic
├── header/            # Top bar (theme toggle, notifications, user menu)
├── sidebar/           # Vertical nav (30+ menu items, nested submenus)
├── footer/            # Copyright
├── page-header/       # Section title + breadcrumb
└── layout-settings/   # Offcanvas theme customizer
```

## Features (`src/app/features/`) — 24 โมดูล

| โมดูล | Layers ที่มี | คำอธิบาย |
|-------|-------------|----------|
| `auth` | domain/data/presentation | Login, Users, Roles, Permissions |
| `job-card` | domain/data/presentation | Job tracking, Kanban board |
| `customer` | domain/data/presentation | CRM, contacts |
| `quotation` | domain/data/presentation | ใบเสนอราคา + approval workflow |
| `purchase-order` | domain/data/presentation | ใบสั่งซื้อ |
| `inventory` | domain/data/presentation | สินค้า, stock movements |
| `payment` | domain/data/presentation | ชำระเงิน, invoices |
| `dashboard` | domain/data/presentation | KPI cards, charts |
| `document` | domain/data/presentation | File upload/share |
| `email` | domain/data/presentation | Templates, compose, logs |
| `batch` | domain/data/presentation | Scheduled jobs |
| `iot` | domain/data/presentation | Devices, GPS, sensors |
| `mqtt` | domain/data/presentation | MQTT dashboard + flow editor |
| `wos` | domain/data/presentation | Web Order System (ลูกค้า) |
| `ai-analytics` | domain/data/presentation | AI Analytics dashboard |
| `ai-chatbot` | domain/data/presentation | Chatbot (Ollama) |
| `monitoring` | domain/data/presentation | Monitoring module |
| `report` | domain/data/presentation | Reports |
| `settings` | domain/data/presentation | Schedule, Location, Hardware, Sensor, Node-RED, LINE/SMS, Host, API, Token |
| `alarm` | domain/data | Alarm entities + repo (ยังไม่มี UI) |
| `orders` | domain/data | Order entities + repo (ยังไม่มี UI) |
| `system` | domain/data | System entities + repo (ยังไม่มี UI) |
| `websocket` | domain/data | WebSocket entities + repo (ยังไม่มี UI) |
| `pages` | presentation | Static/demo pages |

## โครงสร้างมาตรฐานของ Feature Module

```
feature-name/
├── domain/                              # 💎 Pure business logic
│   ├── entities/
│   │   ├── feature.entity.ts
│   │   └── feature-status.enum.ts
│   ├── use-cases/
│   │   ├── create-feature.use-case.ts
│   │   ├── list-features.use-case.ts
│   │   └── get-feature.use-case.ts
│   └── repositories/
│       └── feature.repository.ts        # interface เท่านั้น
│
├── data/                                # 🔌 Data access
│   ├── repositories/
│   │   └── feature.repository.impl.ts   # implements interface
│   ├── datasources/
│   │   └── feature.api.datasource.ts    # HttpClient calls
│   └── dtos/
│       ├── create-feature-request.dto.ts
│       └── feature-response.dto.ts
│
└── presentation/                        # 🖥️ UI
    ├── pages/
    │   ├── feature-list/
    │   ├── feature-detail/
    │   └── feature-create/
    └── components/
        └── feature-filters/
```

## ไฟล์สำคัญ (Key Files)

| ไฟล์ | หน้าที่ |
|------|---------|
| `src/app/app.module.ts` | Root module — imports, declarations, providers |
| `src/app/app-routing.module.ts` | Route ทั้งหมด + lazy loading + guards |
| `src/app/core/di/tokens.ts` | InjectionToken ของ repository ทุกตัว |
| `src/app/core/di/providers.ts` | Map token → implementation class |
| `src/app/core/config/api.config.ts` | REST endpoint paths ทั้งหมด |
| `src/main.ts` | Bootstrap + register locale th/en |
| `angular.json` | Build config, budgets, assets |

## ไฟล์อื่นนอก src/

| ไฟล์/โฟลเดอร์ | หน้าที่ |
|---------------|---------|
| `netlify/functions/` | Serverless functions (projects CRUD, posts) |
| `Dockerfile` | Multi-stage: build → nginx prod → node dev |
| `docker-compose.yml` | dev (port 3010→4200) / production (3010→80) |
| `nginx.conf` | Nginx config สำหรับ production image |
| `proxy.conf.json` | Dev proxy ไป backend localhost:5000 |
| `appdocs/` | เอกสาร developer manual ฉบับเดิม (EN) |
| `docs/` | Design docs, plans, guides |
