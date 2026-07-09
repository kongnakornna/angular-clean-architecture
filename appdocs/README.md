# iCmon — Developer Manual Index

> โครงการ Angular Clean Architecture + Tabler UI Theme  
> Angular 21.2 — TypeScript 5.9 — Clean Architecture

## 01 — [Project Overview](01-overview.md)
Tech stack, architecture, module list, build/run commands, env config

## 02 — [Project Structure](02-project-structure.md)
Full folder layout, feature module pattern, key files reference

## 03 — [Route Map](03-route-map.md)
Complete route table with guards, layouts, lazy loading strategy

## 04 — [Core Module](04-core-module.md)
AppConfig, API endpoints, DI tokens/providers, interceptors, utilities

## 05 — [Clean Architecture Pattern](05-clean-architecture.md)
Layer rules, wiring flow, DI with InjectionToken, demo mode

## 06 — [Feature Modules Reference](06-feature-modules.md)
14 modules — entities, use cases, pages for each; how to add new module

## 07 — [Layouts & UI](07-layouts-ui.md)
Layout components, sidebar menu, theme customizer, shared components, i18n

## 08 — [Patterns & Conventions](08-patterns-conventions.md)
Use case pattern, DI pattern, lazy loading, guards, signals, naming, new feature checklist, maintenance notes

## 09 — [Testing Guide](09-testing.md)
Test setup, spec file locations, patterns (use case, component, interceptor), coverage status

---

### Quick Links

| File | Path |
|------|------|
| Root module | `src/app/app.module.ts` |
| All routes | `src/app/app-routing.module.ts` |
| DI Tokens | `src/app/core/di/tokens.ts` |
| Providers | `src/app/core/di/providers.ts` |
| API Endpoints | `src/app/core/config/api.config.ts` |
| Auth Interceptor | `src/app/core/interceptors/auth.interceptor.ts` |
| Error Interceptor | `src/app/core/interceptors/error.interceptor.ts` |
| Core Module | `src/app/core/core.module.ts` |
| Shared Module | `src/app/shared/shared.module.ts` |

### Version
| Package | Version |
|---------|---------|
| Angular | 21.2.17 |
| @angular/cli | 21.2.18 |
| TypeScript | 5.9 |
| Bootstrap | 5.3.8 |
| RxJS | 7.8 |
| Chart.js | 4.5.1 |
| zone.js | 0.15.1 |

### Commands
```bash
ng serve               # Dev server → localhost:4200
ng build               # Production → dist/
ng test                # Unit tests (Jasmine + Karma)
ng test --watch=false  # Single run
```