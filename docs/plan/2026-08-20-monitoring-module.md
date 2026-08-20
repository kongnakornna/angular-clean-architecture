# Plan: สร้าง Monitoring Module

## ภาพรวมการแก้ไข

| # | Layer | ไฟล์ | สิ่งที่แก้ |
|---|-------|------|-----------|
| 1 | config | `menu.config.ts` | เพิ่ม Monitoring menu item พร้อม 5 sub-modules |
| 2 | routing | `app-routing.module.ts` | เพิ่ม `/monitoring` route → lazy-load MONITORING_ROUTES |
| 3 | feature | `features/monitoring/` | สร้าง directory structure ทั้งหมด (domain/data/presentation) |
| 4 | layout | `monitoring-layout.component.*` | Layout พร้อม sidebar เลือก module + router-outlet |
| 5 | routes | `monitoring.routes.ts` | Route config สำหรับ 5 modules + sub-pages |
| 6 | pages | `features/monitoring/presentation/pages/` | Placeholder pages สำหรับแต่ละ module |
| 7 | i18n | `en.json` / `th.json` | เพิ่ม translation keys สำหรับ monitoring |
| 8 | build | — | `ng build` verify |

---

## 1. เพิ่ม Monitoring ใน Menu Config

**ไฟล์:** `src/app/core/config/menu.config.ts`

**จาก → เป็น:** เพิ่ม menu item "Monitoring" ระหว่าง IoT กับ Work Orders

```typescript
{
  label: 'Monitoring',
  route: '/monitoring',
  icon: 'eye',
  permission: 'monitoring.view',
  children: [
    { label: 'SmartHome', route: '/monitoring/smarthome', icon: 'home', permission: 'monitoring.view' },
    { label: 'SmartCity', route: '/monitoring/smartcity', icon: 'building-community', permission: 'monitoring.view' },
    { label: 'SmartMonitor', route: '/monitoring/smartmonitor', icon: 'chart-monitor', permission: 'monitoring.view' },
    { label: 'Industry', route: '/monitoring/industry', icon: 'factory', permission: 'monitoring.view' },
    { label: 'SmartSolarFarm', route: '/monitoring/smartsolarfarm', icon: 'sun', permission: 'monitoring.view' },
  ],
},
```

---

## 2. เพิ่ม Route ใน App Routing

**ไฟล์:** `src/app/app-routing.module.ts`

**จาก → เป็น:** เพิ่ม lazy-loaded route สำหรับ monitoring

```typescript
{
  path: 'monitoring',
  loadChildren: () =>
    import('./features/monitoring/monitoring.routes').then((m) => m.MONITORING_ROUTES),
  canActivate: [PermissionGuard],
  data: { permission: 'monitoring.view' },
},
```

---

## 3. สร้าง Monitoring Feature Directory Structure

```
features/monitoring/
├── monitoring.routes.ts
├── domain/
│   ├── entities/
│   │   └── monitoring-device.entity.ts
│   ├── repositories/
│   │   └── monitoring-device.repository.ts
│   └── use-cases/
│       └── list-monitoring-devices.use-case.ts
├── data/
│   ├── datasources/
│   │   └── monitoring.api.datasource.ts
│   ├── dtos/
│   │   └── monitoring-device-response.dto.ts
│   └── repositories/
│       └── monitoring-device.repository.impl.ts
└── presentation/
    ├── layouts/
    │   └── monitoring-layout/
    │       ├── monitoring-layout.component.ts
    │       ├── monitoring-layout.component.html
    │       └── monitoring-layout.component.scss
    └── pages/
        ├── monitoring-home/
        │   └── monitoring-home.component.ts
        ├── smarthome-dashboard/
        │   └── smarthome-dashboard.component.ts
        ├── smartcity-dashboard/
        │   └── smartcity-dashboard.component.ts
        ├── smartmonitor-dashboard/
        │   └── smartmonitor-dashboard.component.ts
        ├── industry-dashboard/
        │   └── industry-dashboard.component.ts
        └── smartsolarfarm-dashboard/
            └── smartsolarfarm-dashboard.component.ts
```

---

## 4. Monitoring Layout Component

**ไฟล์:** `features/monitoring/presentation/layouts/monitoring-layout/`

Layout pattern เหมือน `settings-layout` — มี sidebar ซ้ายเลือก module + `<router-outlet>` ขวา

**Sidebar menu items (5 modules):**

| Key | Label Key | Route | Icon |
|-----|-----------|-------|------|
| smarthome | `monitoring.modules.smarthome` | `/monitoring/smarthome` | `home` |
| smartcity | `monitoring.modules.smartcity` | `/monitoring/smartcity` | `building-community` |
| smartmonitor | `monitoring.modules.smartmonitor` | `/monitoring/smartmonitor` | `chart-monitor` |
| industry | `monitoring.modules.industry` | `/monitoring/industry` | `factory` |
| smartsolarfarm | `monitoring.modules.smartsolarfarm` | `/monitoring/smartsolarfarm` | `sun` |

**Group:** ทั้ง 5 อยู่ใน group `modules` เดียว (ไม่ต้องแบ่ง sub-group)

**Features:**
- Collapsible sidebar (เหมือน settings-layout)
- Toggle button `menu-2` / `panel-left-close`
- Auto-select active module based on current route
- Smooth transition 250px ↔ 48px

---

## 5. Route Config

**ไฟล์:** `features/monitoring/monitoring.routes.ts`

```typescript
export const MONITORING_ROUTES: Routes = [
  {
    path: '',
    component: MonitoringLayoutComponent,
    children: [
      { path: '', redirectTo: 'smarthome', pathMatch: 'full' },
      { path: 'smarthome', component: SmarthomeDashboardComponent },
      { path: 'smartcity', component: SmartcityDashboardComponent },
      { path: 'smartmonitor', component: SmartmonitorDashboardComponent },
      { path: 'industry', component: IndustryDashboardComponent },
      { path: 'smartsolarfarm', component: SmartsolarfarmDashboardComponent },
    ],
  },
];
```

---

## 6. Placeholder Pages

แต่ละ dashboard component เป็น standalone component ง่ายๆ แสดงชื่อ module + ข้อความ placeholder

**ตัวอย่าง (SmarthomeDashboardComponent):**
```typescript
@Component({
  selector: 'app-smarthome-dashboard',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="page-header d-print-none mb-3">
      <div class="row align-items-center">
        <div class="col-auto">
          <h2 class="page-title">{{ 'monitoring.modules.smarthome' | translate }}</h2>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-body text-center py-5">
        <h3>SmartHome Dashboard</h3>
        <p class="text-secondary">Coming soon...</p>
      </div>
    </div>
  `,
})
export class SmarthomeDashboardComponent {}
```

ทำเหมือนกัน 5 files: `smarthome-dashboard`, `smartcity-dashboard`, `smartmonitor-dashboard`, `industry-dashboard`, `smartsolarfarm-dashboard`

---

## 7. Domain/Data Layer (Minimal)

**Entity:** `monitoring-device.entity.ts`
```typescript
export interface MonitoringDevice {
  id: string;
  name: string;
  module: string;
  status: boolean;
  location: string;
}
```

**Repository Interface:** `monitoring-device.repository.ts`
```typescript
export interface IMonitoringDeviceRepository {
  listByModule(module: string): Observable<{ data: MonitoringDevice[]; total: number }>;
}
```

**API DataSource:** `monitoring.api.datasource.ts`
- `listByModule(module: string)` → GET `/monitoring/{module}/devices`

**Use Case:** `list-monitoring-devices.use-case.ts`
- `execute(module: string)` → calls `repo.listByModule(module)`

**DTO:** `monitoring-device-response.dto.ts`
```typescript
export interface MonitoringDeviceResponseDto {
  id: string;
  name: string;
  module: string;
  status: boolean;
  location: string;
}
```

**Repository Impl:** `monitoring-device.repository.impl.ts`
- Maps DTO → Entity

---

## 8. Translations

**ไฟล์:** `src/assets/i18n/en.json` + `th.json`

เพิ่ม section `monitoring`:

```json
"monitoring": {
  "title": "Monitoring",
  "modules": {
    "smarthome": "SmartHome",
    "smartcity": "SmartCity",
    "smartmonitor": "SmartMonitor",
    "industry": "Industry",
    "smartsolarfarm": "SmartSolarFarm"
  },
  "menuGroup": {
    "modules": "Modules"
  }
}
```

Thai:
```json
"monitoring": {
  "title": "มอนิเตอริ่ง",
  "modules": {
    "smarthome": "SmartHome",
    "smartcity": "SmartCity",
    "smartmonitor": "SmartMonitor",
    "industry": "Industry",
    "smartsolarfarm": "SmartSolarFarm"
  },
  "menuGroup": {
    "modules": "โมดูล"
  }
}
```

---

## Unit Tests

**ไม่เขียน** — ตอนนี้เป็น scaffolding + placeholder pages ยังไม่มี business logic ให้ test

---

## สรุปไฟล์ที่สร้าง/แก้ไขทั้งหมด

**แก้ไข (3 ไฟล์):**
- `src/app/core/config/menu.config.ts` — เพิ่ม Monitoring menu
- `src/app/app-routing.module.ts` — เพิ่ม monitoring route
- `src/assets/i18n/en.json` + `th.json` — เพิ่ม translations

**สร้างใหม่ (~20 ไฟล์):**
- `features/monitoring/monitoring.routes.ts`
- `features/monitoring/domain/entities/monitoring-device.entity.ts`
- `features/monitoring/domain/repositories/monitoring-device.repository.ts`
- `features/monitoring/domain/use-cases/list-monitoring-devices.use-case.ts`
- `features/monitoring/data/datasources/monitoring.api.datasource.ts`
- `features/monitoring/data/dtos/monitoring-device-response.dto.ts`
- `features/monitoring/data/repositories/monitoring-device.repository.impl.ts`
- `features/monitoring/presentation/layouts/monitoring-layout/` (3 files)
- `features/monitoring/presentation/pages/monitoring-home/` (1 file)
- `features/monitoring/presentation/pages/smarthome-dashboard/` (1 file)
- `features/monitoring/presentation/pages/smartcity-dashboard/` (1 file)
- `features/monitoring/presentation/pages/smartmonitor-dashboard/` (1 file)
- `features/monitoring/presentation/pages/industry-dashboard/` (1 file)
- `features/monitoring/presentation/pages/smartsolarfarm-dashboard/` (1 file)
