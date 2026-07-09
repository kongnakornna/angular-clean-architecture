# iCmon — Developer Manual

## 01 — Project Overview

### Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | Angular | 21.2.17 |
| Language | TypeScript | 5.9 |
| CLI | @angular/cli | 21.2.18 |
| State | Signals + @ngrx/component-store | 21.1.1 |
| UI Kit | Tabler (SCSS) + Bootstrap | 5.3.8 |
| CSS | Tailwind CSS | 3.2.4 |
| Charts | Chart.js + ng2-charts | 4.5.1 / 10.0.0 |
| Icons | angular-tabler-icons | 3.26.0 |
| i18n | @ngx-translate/core | 18.0.0 |
| Testing | Jasmine + Karma | 4.5 / 6.4 |
| Build | Angular CLI (browser) | — |
| Deploy | Netlify | — |

### Architecture Pattern

**Clean Architecture** — 4 layers with strict dependency rules:

```
┌──────────────────────────────────────┐
│ PRESENTATION (Pages, Components)     │  → depends on Domain + Core
├──────────────────────────────────────┤
│ DOMAIN (Entities, Use Cases, Repo    │  → pure business logic
│         Interfaces)                   │  → depends on Core only
├──────────────────────────────────────┤
│ DATA (Repo Impl, DataSources, DTOs)  │  → implements Domain interfaces
│                                      │  → depends on Domain + Core
├──────────────────────────────────────┤
│ CORE (Config, Utils, Interceptors,   │  → shared across all layers
│        DI, Params)                   │
└──────────────────────────────────────┘
```

### Module Count

**14 Feature Modules** — each with domain/data/presentation layers:

1. **Auth** — Login, permissions, user/role management
2. **Job Card** — Job tracking, Kanban board, technician assignment
3. **Customer** — CRM, contact management, history
4. **Quotation** — Quotes with approval workflow → PDF
5. **Purchase Order** — PO creation, approval, tracking
6. **Inventory** — Products, categories, stock movements
7. **Payment** — Payments, invoices, gateway integration
8. **Dashboard** — KPI cards, revenue charts, reports
9. **Document** — File upload, preview, share, folders
10. **Email** — Templates, compose, send logs
11. **Batch** — Scheduled jobs, job history
12. **i18n** — Multi-language (TH/EN) with translation service
13. **IoT** — Device management, GPS tracking, sensors
14. **WOS** — Web Order System for customers

### UI Theme

- **Tabler UI** via SCSS import + custom theme
- **Dark/Light mode** toggle with localStorage persistence
- **Theme customizer** — 12 color schemes, 4 fonts, 5 corner radii
- **Sidebar** — 30+ menu items with nested submenus
- **Responsive** — Bootstrap grid + Tabler breakpoints

### Key Architecture Decisions

- Standalone components for all pages (lazy-loaded)
- NgModule only for AppModule + feature modules (routing + declarations)
- Repository pattern with Inversion of Control via `InjectionToken`
- All Use Cases follow Command Pattern (`Usecase<T, R>` interface)
- Mapper pattern — DTO ↔ Entity conversion in data layer
- JWT + Refresh Token auth strategy
- Demo mode with hard-coded credentials (`admin / P@ssw0rd`)

### Build & Run

```bash
npm install        # install all deps
ng serve           # dev server at http://localhost:4200
ng build           # production build → dist/
ng test            # run 40+ unit tests (Jasmine + Karma)
```

### Environment Config

| File | Mode |
|------|------|
| `src/environments/environment.ts` | Development (apiUrl: localhost:1080) |
| `src/environments/environment.prod.ts` | Production (apiUrl: localhost:1080) |

```typescript
export const environment = {
  production: false,
  demo: false,
  apiUrl: 'http://localhost:1080/api/v1',
};
```

Set `demo: true` to use `DemoAuthRepositoryImpl` (bypasses real API).