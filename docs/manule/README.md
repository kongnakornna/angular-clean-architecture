# iCmon Web App — คู่มือนักพัฒนา (Developer Manual)

> ระบบบริหารจัดการธุรกิจแบบครบวงจร พัฒนาด้วย **Angular 21 + Clean Architecture + Tabler UI**
> โฟลเดอร์นี้ (`docs/manule`) คือคู่มือหลักสำหรับนักพัฒนา

---

## สารบัญ

| # | ไฟล์ | เนื้อหา |
|---|------|---------|
| 01 | [01-overview.md](01-overview.md) | ภาพรวมโปรเจกต์, Tech Stack, การติดตั้งและรัน |
| 02 | [02-clean-architecture.md](02-clean-architecture.md) | หลักการ Clean Architecture 4 เลเยอร์ + Dependency Rules |
| 03 | [03-project-structure.md](03-project-structure.md) | โครงสร้างโฟลเดอร์ทั้งหมดของ `src/` |
| 04 | [04-core-module.md](04-core-module.md) | Core Module — Config, DI Tokens, Interceptors, Utils |
| 05 | [05-feature-modules.md](05-feature-modules.md) | Feature Modules ทั้ง 24 โมดูล |
| 06 | [06-routing-guards.md](06-routing-guards.md) | Route Map, Lazy Loading, Guards, Permissions |
| 07 | [07-layouts-ui-theme.md](07-layouts-ui-theme.md) | Layouts, Sidebar, Theme Customizer, Shared Components |
| 08 | [08-patterns-conventions.md](08-patterns-conventions.md) | Pattern ที่ใช้ + Checklist เพิ่ม Feature ใหม่ |
| 09 | [09-testing.md](09-testing.md) | การเขียนและรัน Unit Test (Jasmine + Karma) |
| 10 | [10-build-deploy.md](10-build-deploy.md) | Build, Docker, Netlify Functions, Environment |

---

## เริ่มต้นอย่างรวดเร็ว (Quick Start)

```bash
npm install          # ติดตั้ง dependencies
npm start            # dev server → http://localhost:4200
npm test             # รัน unit tests
npm run build        # production build → dist/
```

### Docker

```bash
docker compose up dev         # dev server ที่ http://localhost:3010
docker compose up production  # nginx production ที่ http://localhost:3010
```

### Demo Mode

ตั้งค่า `demo: true` ใน `src/environments/environment.ts` เพื่อใช้ `DemoAuthRepositoryImpl`
(ไม่ต้องต่อ API จริง)

```
Username: admin
Password: P@ssw0rd
```

---

## สถาปัตยกรรมโดยสรุป

```
┌──────────────────────────────────────┐
│ PRESENTATION (Pages, Components)     │  → inject Use Cases
├──────────────────────────────────────┤
│ DOMAIN (Entities, Use Cases,         │  → pure business logic
│         Repository Interfaces)       │  → ไม่มี HttpClient / Angular decorator
├──────────────────────────────────────┤
│ DATA (Repo Impl, DataSources, DTOs)  │  → implements Domain interfaces
├──────────────────────────────────────┤
│ CORE (Config, DI, Interceptors,      │  → shared ทุกเลเยอร์
│       Utils, Params)                 │
└──────────────────────────────────────┘
```

**กฎเหล็ก:** Presentation ห้าม import Data layer โดยตรง — ต้องผ่าน Use Case เสมอ
