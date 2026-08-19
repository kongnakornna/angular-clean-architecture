# Settings Module - แผนผังสถาปัตยกรรม (Architecture Plan)

> โมดูล Settings สำหรับ iCmon IoT Platform  
> ย้ายจาก PHP CodeIgniter → Angular 21 Clean Architecture  
> *Last updated: 2026-08-19 | Version: 1.0.0*

---

## สารบัญ

1. [ภาพรวม (Overview)](#1-ภาพรวม-overview)
2. [โครงสร้างโฟลเดอร์ (Folder Structure)](#2-โครงสร้างโฟลเดอร์-folder-structure)
3. [แผนภาพสถาปัตยกรรม (Architecture Diagram)](#3-แผนภาพสถาปัตยกรรม-architecture-diagram)
4. [Route Map](#4-route-map)
5. [API Endpoints](#5-api-endpoints)
6. [Entity Definitions](#6-entity-definitions)
7. [Menu Structure](#7-menu-structure)
8. [DI Tokens](#8-di-tokens)
9. [i18n Keys](#9-i18n-keys)

---

## 1. ภาพรวม (Overview)

### วัตถุประสงค์

โมดูล Settings เป็นศูนย์กลางการกำหนดค่า (Configuration Center) ของระบบ iCmon IoT Platform ทำหน้าที่จัดการค่าตั้งต่างๆ ที่เกี่ยวข้องกับการติดตามอุปกรณ์ IoT, การเชื่อมต่อ, การแจ้งเตือน และการสื่อสาร ซึ่ง Port มาจาก PHP CodeIgniter `settings_menu.php` ที่มี 15 เมนู Tabs

### ขอบเขต (Scope)

| กลุ่ม | Tabs | รายละเอียด |
|-------|------|------------|
| **Timers & Automation** | Schedule | ตั้งเวลาเปิด/ปิดอุปกรณ์, Cron jobs |
| **Alerting** | Alarm | กฎการแจ้งเตือน, Thresholds |
| **Data Storage** | InfluxDB | การเชื่อมต่อ InfluxDB, Retention policies |
| **Device Management** | Device, Location, Hardware, Sensor | จัดการอุปกรณ์, สถานที่, ฮาร์ดแวร์, เซ็นเซอร์ |
| **Connectivity** | Node-RED, MQTT | การเชื่อมต่อ Node-RED และ MQTT Broker |
| **Notifications** | Email, LINE, SMS | การตั้งค่าช่องทางการแจ้งเตือน |
| **System** | Host, API, Token | การตั้งค่า Server, Endpoints, Access Tokens |

### Relationship กับ Features ที่มีอยู่

```
┌─────────────────────────────────────────────────────────────────┐
│                    Features ที่มีอยู่แล้ว                        │
│                                                                 │
│  features/iot/          → Device List, Map, Reports             │
│  features/mqtt/         → MQTT Flow Editor (Node-RED)           │
│  features/email/        → Email Templates, Compose, Logs        │
│  features/alarm/        → Alarm Validation Logic                │
│  features/system/       → Health Check, Ping                    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                    Settings Module (New)                        │
│                                                                 │
│  ทำหน้าที่เป็น "Configuration Panel" สำหรับทุก Feature           │
│  ไม่ใช่ "Feature" แต่เป็น "Unified Settings UI"                  │
│  มี layout sidebar + tabs 15 รายการ                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. โครงสร้างโฟลเดอร์ (Folder Structure)

```
src/app/features/settings/
├── domain/
│   ├── entities/
│   │   ├── schedule.entity.ts
│   │   ├── alarm-config.entity.ts
│   │   ├── influx-config.entity.ts
│   │   ├── device-config.entity.ts
│   │   ├── location.entity.ts
│   │   ├── hardware.entity.ts
│   │   ├── sensor-config.entity.ts
│   │   ├── nodered-config.entity.ts
│   │   ├── mqtt-config.entity.ts
│   │   ├── email-config.entity.ts
│   │   ├── line-config.entity.ts
│   │   ├── sms-config.entity.ts
│   │   ├── host-config.entity.ts
│   │   ├── api-config.entity.ts
│   │   └── token.entity.ts
│   │
│   ├── repositories/
│   │   ├── settings.repository.ts          # Interface (ISettingsRepository)
│   │   └── README.md
│   │
│   ├── use-cases/
│   │   ├── get-schedule-config.use-case.ts
│   │   ├── update-schedule-config.use-case.ts
│   │   ├── get-alarm-config.use-case.ts
│   │   ├── update-alarm-config.use-case.ts
│   │   ├── get-influx-config.use-case.ts
│   │   ├── update-influx-config.use-case.ts
│   │   ├── get-device-config-settings.use-case.ts
│   │   ├── update-device-config-settings.use-case.ts
│   │   ├── get-locations.use-case.ts
│   │   ├── create-location.use-case.ts
│   │   ├── update-location.use-case.ts
│   │   ├── delete-location.use-case.ts
│   │   ├── get-hardware-list.use-case.ts
│   │   ├── create-hardware.use-case.ts
│   │   ├── update-hardware.use-case.ts
│   │   ├── delete-hardware.use-case.ts
│   │   ├── get-sensor-config.use-case.ts
│   │   ├── update-sensor-config.use-case.ts
│   │   ├── get-nodered-config.use-case.ts
│   │   ├── update-nodered-config.use-case.ts
│   │   ├── get-mqtt-config.use-case.ts
│   │   ├── update-mqtt-config.use-case.ts
│   │   ├── test-mqtt-connection.use-case.ts
│   │   ├── get-email-config.use-case.ts
│   │   ├── update-email-config.use-case.ts
│   │   ├── test-email-send.use-case.ts
│   │   ├── get-line-config.use-case.ts
│   │   ├── update-line-config.use-case.ts
│   │   ├── get-sms-config.use-case.ts
│   │   ├── update-sms-config.use-case.ts
│   │   ├── get-host-config.use-case.ts
│   │   ├── update-host-config.use-case.ts
│   │   ├── get-api-config.use-case.ts
│   │   ├── update-api-config.use-case.ts
│   │   ├── get-tokens.use-case.ts
│   │   ├── create-token.use-case.ts
│   │   ├── revoke-token.use-case.ts
│   │   └── README.md
│   └── README.md
│
├── data/
│   ├── datasources/
│   │   └── settings.api.datasource.ts
│   ├── dtos/
│   │   ├── schedule-config-response.dto.ts
│   │   ├── alarm-config-response.dto.ts
│   │   ├── influx-config-response.dto.ts
│   │   ├── device-config-settings-response.dto.ts
│   │   ├── location-response.dto.ts
│   │   ├── hardware-response.dto.ts
│   │   ├── sensor-config-response.dto.ts
│   │   ├── nodered-config-response.dto.ts
│   │   ├── mqtt-config-response.dto.ts
│   │   ├── email-config-response.dto.ts
│   │   ├── line-config-response.dto.ts
│   │   ├── sms-config-response.dto.ts
│   │   ├── host-config-response.dto.ts
│   │   ├── api-config-response.dto.ts
│   │   └── token-response.dto.ts
│   ├── mappers/
│   │   └── settings.mapper.ts
│   ├── repositories/
│   │   └── settings.repository.impl.ts
│   └── README.md
│
├── presentation/
│   ├── pages/
│   │   ├── settings-layout/
│   │   │   ├── settings-layout.component.ts
│   │   │   ├── settings-layout.component.html
│   │   │   ├── settings-layout.component.scss
│   │   │   └── settings-layout.component.spec.ts
│   │   ├── schedule-settings/
│   │   │   ├── schedule-settings.component.ts
│   │   │   ├── schedule-settings.component.html
│   │   │   ├── schedule-settings.component.scss
│   │   │   └── schedule-settings.component.spec.ts
│   │   ├── alarm-settings/
│   │   ├── influx-settings/
│   │   ├── device-settings/
│   │   ├── location-settings/
│   │   ├── hardware-settings/
│   │   ├── sensor-settings/
│   │   ├── nodered-settings/
│   │   ├── mqtt-settings/
│   │   ├── email-settings/
│   │   ├── line-settings/
│   │   ├── sms-settings/
│   │   ├── host-settings/
│   │   ├── api-settings/
│   │   └── token-settings/
│   │
│   ├── components/
│   │   ├── settings-sidebar/
│   │   │   ├── settings-sidebar.component.ts
│   │   │   ├── settings-sidebar.component.html
│   │   │   └── settings-sidebar.component.scss
│   │   ├── settings-form-card/
│   │   ├── connection-test-button/
│   │   └── token-table/
│   │
│   └── README.md
│
├── settings.routes.ts
└── README.md
```

---

## 3. แผนภาพสถาปัตยกรรม (Architecture Diagram)

### Dependency Flow

```
┌──────────────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                              │
│                                                                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────────┐  │
│  │ SettingsLayout   │  │ SettingsSidebar │  │ Tab Pages (x15)      │  │
│  │ (Router Outlet) │  │ (Menu 15 items) │  │ schedule, alarm, ... │  │
│  └────────┬────────┘  └─────────────────┘  └──────────┬───────────┘  │
│           │                                            │              │
│           │         ┌──────────────────────────────────┘              │
│           │         │  inject(SETTINGS_REPOSITORY)                   │
│           │         ▼                                                 │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │              Use Cases (Injectable + @Inject Token)             │  │
│  │  GetScheduleConfigUseCase    UpdateScheduleConfigUseCase        │  │
│  │  GetAlarmConfigUseCase       UpdateAlarmConfigUseCase           │  │
│  │  GetInfluxConfigUseCase      UpdateInfluxConfigUseCase          │  │
│  │  ... (x30+ use cases)                                           │  │
│  └─────────────────────────────┬───────────────────────────────────┘  │
│                                │                                      │
└────────────────────────────────┼──────────────────────────────────────┘
                                 │
                                 ▼
┌──────────────────────────────────────────────────────────────────────┐
│                       DOMAIN LAYER                                   │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │  Entities (Pure interfaces, no Angular deps)                   │  │
│  │  ScheduleConfig, AlarmConfig, InfluxConfig, Location, ...      │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │  ISettingsRepository (Interface / Contract)                    │  │
│  │  - getScheduleConfig(): Observable<ScheduleConfig>             │  │
│  │  - updateScheduleConfig(data): Observable<ScheduleConfig>      │  │
│  │  - getAlarmConfig(): Observable<AlarmConfig>                   │  │
│  │  - ...                                                          │  │
│  └─────────────────────────────┬───────────────────────────────────┘  │
│                                │                                      │
└────────────────────────────────┼──────────────────────────────────────┘
                                 │
                                 ▼
┌──────────────────────────────────────────────────────────────────────┐
│                     DATA / INFRASTRUCTURE LAYER                      │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │  SettingsRepositoryImpl implements ISettingsRepository          │  │
│  └─────────────────────────────┬───────────────────────────────────┘  │
│                                │                                      │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │  SettingsApiDataSource                                          │  │
│  │  - HTTP calls to Node.js Backend (localhost:3003/v1/settings)   │  │
│  │  - Uses APP_CONFIG.apiBaseUrl + API_ENDPOINTS.settings.*        │  │
│  └─────────────────────────────┬───────────────────────────────────┘  │
│                                │                                      │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │  SettingsMapper (DTO ↔ Entity)                                  │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
              ┌──────────────────────────────────────┐
              │   Backend API (Node.js:3003/v1/)      │
              │   MySQL Database                       │
              └──────────────────────────────────────┘
```

### Lazy Loading Strategy

```
app-routing.module.ts
└── /settings (Lazy Loaded)
    └── settings.routes.ts
        ├── ''         → SettingsLayoutComponent (Sidebar + RouterOutlet)
        ├── 'schedule' → ScheduleSettingsComponent
        ├── 'alarm'    → AlarmSettingsComponent
        ├── 'influx'   → InfluxSettingsComponent
        ├── 'device'   → DeviceSettingsComponent
        ├── 'location' → LocationSettingsComponent
        ├── 'hardware' → HardwareSettingsComponent
        ├── 'sensor'   → SensorSettingsComponent
        ├── 'nodered'  → NoderedSettingsComponent
        ├── 'mqtt'     → MqttSettingsComponent
        ├── 'email'    → EmailSettingsComponent
        ├── 'line'     → LineSettingsComponent
        ├── 'sms'      → SmsSettingsComponent
        ├── 'host'     → HostSettingsComponent
        ├── 'api'      → ApiSettingsComponent
        └── 'token'    → TokenSettingsComponent
```

---

## 4. Route Map

| Route | Component | Description | Lazy Loaded |
|-------|-----------|-------------|-------------|
| `/settings` | `SettingsLayoutComponent` | Layout หลักมี Sidebar + `<router-outlet>` | Yes |
| `/settings/schedule` | `ScheduleSettingsComponent` | ตั้งเวลาเปิด/ปิดอุปกรณ์ | Yes |
| `/settings/alarm` | `AlarmSettingsComponent` | ตั้งค่าการแจ้งเตือน | Yes |
| `/settings/influx` | `InfluxSettingsComponent` | ตั้งค่า InfluxDB | Yes |
| `/settings/device` | `DeviceSettingsComponent` | ตั้งค่า Device Defaults | Yes |
| `/settings/location` | `LocationSettingsComponent` | จัดการสถานที่ (CRUD) | Yes |
| `/settings/hardware` | `HardwareSettingsComponent` | จัดการฮาร์ดแวร์ (CRUD) | Yes |
| `/settings/sensor` | `SensorSettingsComponent` | ตั้งค่าเซ็นเซอร์ | Yes |
| `/settings/nodered` | `NoderedSettingsComponent` | ตั้งค่า Node-RED | Yes |
| `/settings/mqtt` | `MqttSettingsComponent` | ตั้งค่า MQTT Broker | Yes |
| `/settings/email` | `EmailSettingsComponent` | ตั้งค่า Email (SMTP) | Yes |
| `/settings/line` | `LineSettingsComponent` | ตั้งค่า LINE Notify | Yes |
| `/settings/sms` | `SmsSettingsComponent` | ตั้งค่า SMS Gateway | Yes |
| `/settings/host` | `HostSettingsComponent` | ตั้งค่า Server Host | Yes |
| `/settings/api` | `ApiSettingsComponent` | ตั้งค่า API Endpoints | Yes |
| `/settings/token` | `TokenSettingsComponent` | จัดการ Access Tokens | Yes |

### Route Definition (TypeScript)

```typescript
// features/settings/settings.routes.ts
import { Routes } from '@angular/router';

export const SETTINGS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/settings-layout/settings-layout.component').then(
        m => m.SettingsLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'schedule', pathMatch: 'full' },
      {
        path: 'schedule',
        loadComponent: () =>
          import('./presentation/pages/schedule-settings/schedule-settings.component').then(
            m => m.ScheduleSettingsComponent
          ),
      },
      {
        path: 'alarm',
        loadComponent: () =>
          import('./presentation/pages/alarm-settings/alarm-settings.component').then(
            m => m.AlarmSettingsComponent
          ),
      },
      {
        path: 'influx',
        loadComponent: () =>
          import('./presentation/pages/influx-settings/influx-settings.component').then(
            m => m.InfluxSettingsComponent
          ),
      },
      {
        path: 'device',
        loadComponent: () =>
          import('./presentation/pages/device-settings/device-settings.component').then(
            m => m.DeviceSettingsComponent
          ),
      },
      {
        path: 'location',
        loadComponent: () =>
          import('./presentation/pages/location-settings/location-settings.component').then(
            m => m.LocationSettingsComponent
          ),
      },
      {
        path: 'hardware',
        loadComponent: () =>
          import('./presentation/pages/hardware-settings/hardware-settings.component').then(
            m => m.HardwareSettingsComponent
          ),
      },
      {
        path: 'sensor',
        loadComponent: () =>
          import('./presentation/pages/sensor-settings/sensor-settings.component').then(
            m => m.SensorSettingsComponent
          ),
      },
      {
        path: 'nodered',
        loadComponent: () =>
          import('./presentation/pages/nodered-settings/nodered-settings.component').then(
            m => m.NoderedSettingsComponent
          ),
      },
      {
        path: 'mqtt',
        loadComponent: () =>
          import('./presentation/pages/mqtt-settings/mqtt-settings.component').then(
            m => m.MqttSettingsComponent
          ),
      },
      {
        path: 'email',
        loadComponent: () =>
          import('./presentation/pages/email-settings/email-settings.component').then(
            m => m.EmailSettingsComponent
          ),
      },
      {
        path: 'line',
        loadComponent: () =>
          import('./presentation/pages/line-settings/line-settings.component').then(
            m => m.LineSettingsComponent
          ),
      },
      {
        path: 'sms',
        loadComponent: () =>
          import('./presentation/pages/sms-settings/sms-settings.component').then(
            m => m.SmsSettingsComponent
          ),
      },
      {
        path: 'host',
        loadComponent: () =>
          import('./presentation/pages/host-settings/host-settings.component').then(
            m => m.HostSettingsComponent
          ),
      },
      {
        path: 'api',
        loadComponent: () =>
          import('./presentation/pages/api-settings/api-settings.component').then(
            m => m.ApiSettingsComponent
          ),
      },
      {
        path: 'token',
        loadComponent: () =>
          import('./presentation/pages/token-settings/token-settings.component').then(
            m => m.TokenSettingsComponent
          ),
      },
    ],
  },
];
```

### ต้องเพิ่มใน app-routing.module.ts

```typescript
{
  path: 'settings',
  loadChildren: () =>
    import('./features/settings/settings.routes').then(m => m.SETTINGS_ROUTES),
  canActivate: [AuthGuard],
},
```

---

## 5. API Endpoints

Backend: **Node.js** at `localhost:3003/v1/`

### API Endpoint Constants

```typescript
// core/config/api.config.ts - เพิ่มใน API_ENDPOINTS
settings: {
  // Schedule
  schedule: {
    list:   '/settings/schedule',
    detail: (id: string) => `/settings/schedule/${id}`,
    create: '/settings/schedule',
    update: (id: string) => `/settings/schedule/${id}`,
    delete: (id: string) => `/settings/schedule/${id}`,
  },
  // Alarm
  alarm: {
    config:         '/settings/alarm/config',
    updateConfig:   '/settings/alarm/config',
    rules:          '/settings/alarm/rules',
    createRule:     '/settings/alarm/rules',
    updateRule:     (id: string) => `/settings/alarm/rules/${id}`,
    deleteRule:     (id: string) => `/settings/alarm/rules/${id}`,
  },
  // InfluxDB
  influx: {
    config:       '/settings/influx/config',
    updateConfig: '/settings/influx/config',
    test:         '/settings/influx/test',
    buckets:      '/settings/influx/buckets',
  },
  // Device Settings
  device: {
    config:       '/settings/device/config',
    updateConfig: '/settings/device/config',
    types:        '/settings/device/types',
    createType:   '/settings/device/types',
    updateType:   (id: string) => `/settings/device/types/${id}`,
    deleteType:   (id: string) => `/settings/device/types/${id}`,
  },
  // Location
  location: {
    list:   '/settings/location',
    create: '/settings/location',
    update: (id: string) => `/settings/location/${id}`,
    delete: (id: string) => `/settings/location/${id}`,
  },
  // Hardware
  hardware: {
    list:   '/settings/hardware',
    create: '/settings/hardware',
    update: (id: string) => `/settings/hardware/${id}`,
    delete: (id: string) => `/settings/hardware/${id}`,
  },
  // Sensor
  sensor: {
    config:       '/settings/sensor/config',
    updateConfig: '/settings/sensor/config',
    types:        '/settings/sensor/types',
    createType:   '/settings/sensor/types',
    updateType:   (id: string) => `/settings/sensor/types/${id}`,
    deleteType:   (id: string) => `/settings/sensor/types/${id}`,
  },
  // Node-RED
  nodered: {
    config:       '/settings/nodered/config',
    updateConfig: '/settings/nodered/config',
    test:         '/settings/nodered/test',
    flows:        '/settings/nodered/flows',
  },
  // MQTT
  mqtt: {
    config:       '/settings/mqtt/config',
    updateConfig: '/settings/mqtt/config',
    test:         '/settings/mqtt/test',
    brokers:      '/settings/mqtt/brokers',
    createBroker: '/settings/mqtt/brokers',
    updateBroker: (id: string) => `/settings/mqtt/brokers/${id}`,
    deleteBroker: (id: string) => `/settings/mqtt/brokers/${id}`,
  },
  // Email
  email: {
    config:       '/settings/email/config',
    updateConfig: '/settings/email/config',
    test:         '/settings/email/test',
    providers:    '/settings/email/providers',
  },
  // LINE
  line: {
    config:       '/settings/line/config',
    updateConfig: '/settings/line/config',
    test:         '/settings/line/test',
  },
  // SMS
  sms: {
    config:       '/settings/sms/config',
    updateConfig: '/settings/sms/config',
    test:         '/settings/sms/test',
    providers:    '/settings/sms/providers',
  },
  // Host
  host: {
    config:       '/settings/host/config',
    updateConfig: '/settings/host/config',
    info:         '/settings/host/info',
  },
  // API
  api: {
    config:       '/settings/api/config',
    updateConfig: '/settings/api/config',
    endpoints:    '/settings/api/endpoints',
    test:         '/settings/api/test',
  },
  // Token
  token: {
    list:   '/settings/token',
    create: '/settings/token',
    revoke: (id: string) => `/settings/token/${id}`,
    refresh: (id: string) => `/settings/token/${id}/refresh`,
  },
},
```

### API Endpoints Table

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| **Schedule** |||
| GET | `/v1/settings/schedule` | ดูรายการ Schedule ทั้งหมด | - |
| GET | `/v1/settings/schedule/:id` | ดู Schedule ตาม ID | - |
| POST | `/v1/settings/schedule` | สร้าง Schedule ใหม่ | `CreateScheduleDto` |
| PUT | `/v1/settings/schedule/:id` | อัปเดต Schedule | `UpdateScheduleDto` |
| DELETE | `/v1/settings/schedule/:id` | ลบ Schedule | - |
| **Alarm** |||
| GET | `/v1/settings/alarm/config` | ดูการตั้งค่า Alarm | - |
| PUT | `/v1/settings/alarm/config` | อัปเดตการตั้งค่า Alarm | `AlarmConfigDto` |
| GET | `/v1/settings/alarm/rules` | ดูรายการ Rules | - |
| POST | `/v1/settings/alarm/rules` | สร้าง Rule ใหม่ | `AlarmRuleDto` |
| PUT | `/v1/settings/alarm/rules/:id` | อัปเดต Rule | `AlarmRuleDto` |
| DELETE | `/v1/settings/alarm/rules/:id` | ลบ Rule | - |
| **InfluxDB** |||
| GET | `/v1/settings/influx/config` | ดูการตั้งค่า InfluxDB | - |
| PUT | `/v1/settings/influx/config` | อัปเดตการตั้งค่า InfluxDB | `InfluxConfigDto` |
| POST | `/v1/settings/influx/test` | ทดสอบการเชื่อมต่อ InfluxDB | `{ url, token, org, bucket }` |
| GET | `/v1/settings/influx/buckets` | ดูรายการ Buckets | - |
| **Device Settings** |||
| GET | `/v1/settings/device/config` | ดู Device Config Defaults | - |
| PUT | `/v1/settings/device/config` | อัปเดต Device Config Defaults | `DeviceConfigDto` |
| GET | `/v1/settings/device/types` | ดู Device Types | - |
| POST | `/v1/settings/device/types` | สร้าง Device Type | `DeviceTypeDto` |
| PUT | `/v1/settings/device/types/:id` | อัปเดต Device Type | `DeviceTypeDto` |
| DELETE | `/v1/settings/device/types/:id` | ลบ Device Type | - |
| **Location** |||
| GET | `/v1/settings/location` | ดูรายการ Locations | - |
| POST | `/v1/settings/location` | สร้าง Location | `LocationDto` |
| PUT | `/v1/settings/location/:id` | อัปเดต Location | `LocationDto` |
| DELETE | `/v1/settings/location/:id` | ลบ Location | - |
| **Hardware** |||
| GET | `/v1/settings/hardware` | ดูรายการ Hardware | - |
| POST | `/v1/settings/hardware` | สร้าง Hardware | `HardwareDto` |
| PUT | `/v1/settings/hardware/:id` | อัปเดต Hardware | `HardwareDto` |
| DELETE | `/v1/settings/hardware/:id` | ลบ Hardware | - |
| **Sensor** |||
| GET | `/v1/settings/sensor/config` | ดู Sensor Config | - |
| PUT | `/v1/settings/sensor/config` | อัปเดต Sensor Config | `SensorConfigDto` |
| GET | `/v1/settings/sensor/types` | ดู Sensor Types | - |
| POST | `/v1/settings/sensor/types` | สร้าง Sensor Type | `SensorTypeDto` |
| PUT | `/v1/settings/sensor/types/:id` | อัปเดต Sensor Type | `SensorTypeDto` |
| DELETE | `/v1/settings/sensor/types/:id` | ลบ Sensor Type | - |
| **Node-RED** |||
| GET | `/v1/settings/nodered/config` | ดูการตั้งค่า Node-RED | - |
| PUT | `/v1/settings/nodered/config` | อัปเดตการตั้งค่า Node-RED | `NoderedConfigDto` |
| POST | `/v1/settings/nodered/test` | ทดสอบการเชื่อมต่อ Node-RED | `{ url, credentials }` |
| **MQTT** |||
| GET | `/v1/settings/mqtt/config` | ดูการตั้งค่า MQTT | - |
| PUT | `/v1/settings/mqtt/config` | อัปเดตการตั้งค่า MQTT | `MqttConfigDto` |
| POST | `/v1/settings/mqtt/test` | ทดสอบการเชื่อมต่อ MQTT | `{ broker, port, username, password }` |
| GET | `/v1/settings/mqtt/brokers` | ดูรายการ Brokers | - |
| POST | `/v1/settings/mqtt/brokers` | สร้าง Broker | `MqttBrokerDto` |
| PUT | `/v1/settings/mqtt/brokers/:id` | อัปเดต Broker | `MqttBrokerDto` |
| DELETE | `/v1/settings/mqtt/brokers/:id` | ลบ Broker | - |
| **Email** |||
| GET | `/v1/settings/email/config` | ดูการตั้งค่า Email | - |
| PUT | `/v1/settings/email/config` | อัปเดตการตั้งค่า Email | `EmailConfigDto` |
| POST | `/v1/settings/email/test` | ทดสอบการส่ง Email | `{ to, subject, body }` |
| **LINE** |||
| GET | `/v1/settings/line/config` | ดูการตั้งค่า LINE | - |
| PUT | `/v1/settings/line/config` | อัปเดตการตั้งค่า LINE | `LineConfigDto` |
| POST | `/v1/settings/line/test` | ทดสอบ LINE Notify | `{ token, message }` |
| **SMS** |||
| GET | `/v1/settings/sms/config` | ดูการตั้งค่า SMS | - |
| PUT | `/v1/settings/sms/config` | อัปเดตการตั้งค่า SMS | `SmsConfigDto` |
| POST | `/v1/settings/sms/test` | ทดสอบ SMS Gateway | `{ to, message }` |
| **Host** |||
| GET | `/v1/settings/host/config` | ดูการตั้งค่า Host | - |
| PUT | `/v1/settings/host/config` | อัปเดตการตั้งค่า Host | `HostConfigDto` |
| GET | `/v1/settings/host/info` | ดูข้อมูล Server | - |
| **API** |||
| GET | `/v1/settings/api/config` | ดูการตั้งค่า API | - |
| PUT | `/v1/settings/api/config` | อัปเดตการตั้งค่า API | `ApiConfigDto` |
| GET | `/v1/settings/api/endpoints` | ดูรายการ Endpoints | - |
| POST | `/v1/settings/api/test` | ทดสอบ API Connection | `{ baseUrl, timeout }` |
| **Token** |||
| GET | `/v1/settings/token` | ดูรายการ Tokens | - |
| POST | `/v1/settings/token` | สร้าง Token ใหม่ | `{ name, permissions, expiresAt }` |
| DELETE | `/v1/settings/token/:id` | Revoked Token | - |
| POST | `/v1/settings/token/:id/refresh` | Refresh Token | - |

---

## 6. Entity Definitions

### ScheduleConfig

```typescript
export interface ScheduleConfig {
  id: string;
  name: string;
  deviceId: string;
  deviceName: string;
  cronExpression: string;
  action: 'on' | 'off' | 'toggle' | 'custom';
  actionPayload?: string;
  enabled: boolean;
  startDate?: Date;
  endDate?: Date;
  daysOfWeek?: number[];
  createdAt: Date;
  updatedAt: Date;
}
```

### AlarmConfig

```typescript
export interface AlarmConfig {
  id: string;
  enabled: boolean;
  defaultThreshold: AlarmThreshold;
  notificationChannels: NotificationChannel[];
  cooldownMinutes: number;
  escalateAfterMinutes: number;
  maxAlertsPerHour: number;
}

export interface AlarmThreshold {
  warningMin: number;
  warningMax: number;
  alertMin: number;
  alertMax: number;
  unit: string;
}

export interface AlarmRule {
  id: string;
  name: string;
  deviceId: string;
  sensorType: string;
  condition: '>' | '<' | '>=' | '<=' | '==' | '!=';
  threshold: number;
  severity: 'warning' | 'alert' | 'critical';
  enabled: boolean;
  notifyChannels: string[];
}

export type NotificationChannel = 'email' | 'line' | 'sms' | 'webhook';
```

### InfluxConfig

```typescript
export interface InfluxConfig {
  id: string;
  url: string;
  token: string;
  org: string;
  defaultBucket: string;
  retentionDays: number;
  enabled: boolean;
}
```

### DeviceConfigSettings

```typescript
export interface DeviceConfigSettings {
  defaultRefreshInterval: number;
  defaultPageSize: number;
  enableAutoRegister: boolean;
  dataRetentionDays: number;
  enableGeolocation: boolean;
  gpsAccuracyThreshold: number;
  heartbeatInterval: number;
  offlineTimeout: number;
  defaultTimezone: string;
}

export interface DeviceType {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  defaultFields: DeviceField[];
  enabled: boolean;
}

export interface DeviceField {
  name: string;
  type: 'number' | 'string' | 'boolean' | 'json';
  unit?: string;
  required: boolean;
  defaultValue?: any;
}
```

### Location

```typescript
export interface Location {
  id: string;
  name: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  parentId?: string;
  description?: string;
  deviceCount?: number;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Hardware

```typescript
export interface Hardware {
  id: string;
  name: string;
  model: string;
  manufacturer?: string;
  serialNumber?: string;
  firmwareVersion?: string;
  ipAddress?: string;
  macAddress?: string;
  locationId?: string;
  locationName?: string;
  status: 'active' | 'inactive' | 'maintenance';
  lastSeen?: Date;
  specs?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
```

### SensorConfig

```typescript
export interface SensorConfig {
  id: string;
  name: string;
  unit: string;
  minValue?: number;
  maxValue?: number;
  decimals: number;
  calibrationOffset: number;
  pollingInterval: number;
  enabled: boolean;
}

export interface SensorType {
  id: string;
  name: string;
  category: 'temperature' | 'humidity' | 'pressure' | 'voltage' | 'current' | 'custom';
  unit: string;
  icon: string;
  defaultValueRange: { min: number; max: number };
}
```

### NoderedConfig

```typescript
export interface NoderedConfig {
  id: string;
  url: string;
  adminPath: string;
  username?: string;
  password?: string;
  enabled: boolean;
  autoRestart: boolean;
  logLevel: 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';
  flowFile?: string;
  nodesDir?: string;
}
```

### MqttConfig

```typescript
export interface MqttConfig {
  id: string;
  defaultBrokerId: string;
  reconnectPeriod: number;
  connectTimeout: number;
  keepalive: number;
  clean: boolean;
  qos: 0 | 1 | 2;
  retain: boolean;
  clientId?: string;
}

export interface MqttBroker {
  id: string;
  name: string;
  host: string;
  port: number;
  protocol: 'mqtt' | 'mqtts' | 'ws' | 'wss';
  username?: string;
  password?: string;
  clientId?: string;
  enabled: boolean;
  isDefault: boolean;
}
```

### EmailConfig

```typescript
export interface EmailConfig {
  id: string;
  provider: 'smtp' | 'sendgrid' | 'ses' | 'mailgun';
  host: string;
  port: number;
  username: string;
  password: string;
  fromAddress: string;
  fromName: string;
  encryption: 'none' | 'ssl' | 'tls';
  enabled: boolean;
}
```

### LineConfig

```typescript
export interface LineConfig {
  id: string;
  accessToken: string;
  enabled: boolean;
  defaultTarget?: string;
  notifyOnAlarm: boolean;
  notifyOnRecovery: boolean;
  messageTemplate?: string;
}
```

### SmsConfig

```typescript
export interface SmsConfig {
  id: string;
  provider: 'twilio' | 'aws-sns' | 'nexmo' | 'custom';
  apiKey: string;
  apiSecret: string;
  fromNumber: string;
  enabled: boolean;
  maxPerHour: number;
}
```

### HostConfig

```typescript
export interface HostConfig {
  id: string;
  hostname: string;
  port: number;
  baseUrl: string;
  timezone: string;
  language: string;
  maintenanceMode: boolean;
  maintenanceMessage?: string;
  maxUploadSize: number;
  sessionTimeout: number;
}
```

### ApiConfig

```typescript
export interface ApiConfig {
  id: string;
  baseUrl: string;
  version: string;
  timeout: number;
  rateLimit: number;
  corsOrigins: string[];
  swaggerEnabled: boolean;
  debugMode: boolean;
  requestLogEnabled: boolean;
}
```

### Token

```typescript
export interface Token {
  id: string;
  name: string;
  token: string;
  permissions: string[];
  expiresAt: Date;
  lastUsedAt?: Date;
  createdAt: Date;
  revoked: boolean;
}

export interface CreateTokenRequest {
  name: string;
  permissions: string[];
  expiresInDays: number;
}
```

---

## 7. Menu Structure

### Settings Sidebar Menu (15 Tabs)

```typescript
// features/settings/presentation/components/settings-sidebar/settings-sidebar.config.ts
import { SettingsMenuItem } from './settings-sidebar.model';

export const SETTINGS_MENU: SettingsMenuItem[] = [
  // ── Timers & Automation ──
  {
    key: 'schedule',
    label: 'settings.menu.schedule',
    route: '/settings/schedule',
    icon: 'calendar',
    group: 'automation',
  },
  // ── Alerting ──
  {
    key: 'alarm',
    label: 'settings.menu.alarm',
    route: '/settings/alarm',
    icon: 'bell',
    group: 'alerting',
  },
  // ── Data Storage ──
  {
    key: 'influx',
    label: 'settings.menu.influx',
    route: '/settings/influx',
    icon: 'database',
    group: 'storage',
  },
  // ── Device Management ──
  {
    key: 'device',
    label: 'settings.menu.device',
    route: '/settings/device',
    icon: 'device-desktop',
    group: 'device',
  },
  {
    key: 'location',
    label: 'settings.menu.location',
    route: '/settings/location',
    icon: 'map-pin',
    group: 'device',
  },
  {
    key: 'hardware',
    label: 'settings.menu.hardware',
    route: '/settings/hardware',
    icon: 'server',
    group: 'device',
  },
  {
    key: 'sensor',
    label: 'settings.menu.sensor',
    route: '/settings/sensor',
    icon: 'gauge',
    group: 'device',
  },
  // ── Connectivity ──
  {
    key: 'nodered',
    label: 'settings.menu.nodered',
    route: '/settings/nodered',
    icon: 'flow-connector',
    group: 'connectivity',
  },
  {
    key: 'mqtt',
    label: 'settings.menu.mqtt',
    route: '/settings/mqtt',
    icon: 'radio',
    group: 'connectivity',
  },
  // ── Notifications ──
  {
    key: 'email',
    label: 'settings.menu.email',
    route: '/settings/email',
    icon: 'mail',
    group: 'notification',
  },
  {
    key: 'line',
    label: 'settings.menu.line',
    route: '/settings/line',
    icon: 'message-circle',
    group: 'notification',
  },
  {
    key: 'sms',
    label: 'settings.menu.sms',
    route: '/settings/sms',
    icon: 'device-mobile',
    group: 'notification',
  },
  // ── System ──
  {
    key: 'host',
    label: 'settings.menu.host',
    route: '/settings/host',
    icon: 'world',
    group: 'system',
  },
  {
    key: 'api',
    label: 'settings.menu.api',
    route: '/settings/api',
    icon: 'api',
    group: 'system',
  },
  {
    key: 'token',
    label: 'settings.menu.token',
    route: '/settings/token',
    icon: 'key',
    group: 'system',
  },
];

export interface SettingsMenuItem {
  key: string;
  label: string;
  route: string;
  icon: string;
  group: 'automation' | 'alerting' | 'storage' | 'device' | 'connectivity' | 'notification' | 'system';
}
```

### Sidebar UI Layout (Text Diagram)

```
┌─────────────────────────────────────┐
│  ⚙ Settings                        │
├─────────────────────────────────────┤
│                                     │
│  ── Automation ──                   │
│  📅 Schedule                       │
│                                     │
│  ── Alerting ──                     │
│  🔔 Alarm                          │
│                                     │
│  ── Storage ──                      │
│  🗄 InfluxDB                       │
│                                     │
│  ── Device ──                       │
│  💻 Device                         │
│  📍 Location                       │
│  🖥 Hardware                       │
│  📊 Sensor                         │
│                                     │
│  ── Connectivity ──                 │
│  ⚡ Node-RED                       │
│  📻 MQTT                           │
│                                     │
│  ── Notification ──                 │
│  ✉ Email                           │
│  💬 LINE                           │
│  📱 SMS                            │
│                                     │
│  ── System ──                       │
│  🌐 Host                           │
│  🔌 API                            │
│  🔑 Token                          │
│                                     │
└─────────────────────────────────────┘
```

---

## 8. DI Tokens

### Injection Tokens

```typescript
// core/di/tokens.ts - เพิ่ม
import { ISettingsRepository } from '../../features/settings/domain/repositories/settings.repository';

export const SETTINGS_REPOSITORY = new InjectionToken<ISettingsRepository>('settings.repository');
```

```typescript
// core/di/providers.ts - เพิ่ม
import { SETTINGS_REPOSITORY } from './tokens';
import { SettingsRepositoryImpl } from '../../features/settings/data/repositories/settings.repository.impl';

export const REPOSITORY_PROVIDERS: Provider[] = [
  // ... providers อื่นๆ ที่มีอยู่
  { provide: SETTINGS_REPOSITORY, useClass: SettingsRepositoryImpl },
];
```

### Token Summary Table

| Token Name | Interface | Implementation | Location |
|------------|-----------|----------------|----------|
| `SETTINGS_REPOSITORY` | `ISettingsRepository` | `SettingsRepositoryImpl` | `features/settings/` |

> **หมายเหตุ:** Settings Module ใช้ Repository เดียว (`ISettingsRepository`) ครอบคลุมทุก Tab เพราะทั้ง 15 Tabs เป็น "Configuration" ของ Feature เดียวกัน ไม่จำเป็นต้องแยก Repository หลายตัว

---

## 9. i18n Keys

### โครงสร้าง Translation Keys

```json
{
  "settings": {
    "menu": {
      "title": "Settings",
      "automation": "Automation",
      "alerting": "Alerting",
      "storage": "Data Storage",
      "device": "Device Management",
      "connectivity": "Connectivity",
      "notification": "Notifications",
      "system": "System",
      "schedule": "Schedule",
      "alarm": "Alarm",
      "influx": "InfluxDB",
      "deviceTab": "Device",
      "location": "Location",
      "hardware": "Hardware",
      "sensor": "Sensor",
      "nodered": "Node-RED",
      "mqtt": "MQTT",
      "email": "Email",
      "line": "LINE Notify",
      "sms": "SMS",
      "host": "Host",
      "api": "API",
      "token": "Token"
    },
    "common": {
      "saveSuccess": "Settings saved successfully",
      "saveError": "Failed to save settings",
      "testSuccess": "Connection test successful",
      "testFailed": "Connection test failed",
      "testing": "Testing connection...",
      "saving": "Saving...",
      "unsavedChanges": "You have unsaved changes",
      "confirmDiscard": "Are you sure you want to discard changes?",
      "required": "This field is required",
      "enabled": "Enabled",
      "disabled": "Disabled"
    },
    "schedule": {
      "title": "Schedule Settings",
      "subtitle": "Configure device schedules and cron jobs",
      "addSchedule": "Add Schedule",
      "editSchedule": "Edit Schedule",
      "scheduleName": "Schedule Name",
      "device": "Device",
      "cronExpression": "Cron Expression",
      "action": "Action",
      "actionOn": "Turn On",
      "actionOff": "Turn Off",
      "actionToggle": "Toggle",
      "actionCustom": "Custom",
      "enabled": "Enabled",
      "startDate": "Start Date",
      "endDate": "End Date",
      "daysOfWeek": "Days of Week"
    },
    "alarm": {
      "title": "Alarm Settings",
      "subtitle": "Configure alarm rules and notification channels",
      "enableAlarm": "Enable Alarm System",
      "defaultThreshold": "Default Threshold",
      "warningMin": "Warning Min",
      "warningMax": "Warning Max",
      "alertMin": "Alert Min",
      "alertMax": "Alert Max",
      "cooldownMinutes": "Cooldown (minutes)",
      "escalateAfterMinutes": "Escalate After (minutes)",
      "maxAlertsPerHour": "Max Alerts per Hour",
      "rules": "Alarm Rules",
      "addRule": "Add Rule",
      "condition": "Condition",
      "severity": "Severity",
      "notifyChannels": "Notification Channels"
    },
    "influx": {
      "title": "InfluxDB Settings",
      "subtitle": "Configure InfluxDB connection and retention",
      "url": "InfluxDB URL",
      "token": "API Token",
      "organization": "Organization",
      "defaultBucket": "Default Bucket",
      "retentionDays": "Retention Days",
      "testConnection": "Test Connection"
    },
    "device": {
      "title": "Device Settings",
      "subtitle": "Configure default device settings and types",
      "defaultRefreshInterval": "Default Refresh Interval (ms)",
      "defaultPageSize": "Default Page Size",
      "enableAutoRegister": "Enable Auto Register",
      "dataRetentionDays": "Data Retention Days",
      "heartbeatInterval": "Heartbeat Interval (s)",
      "offlineTimeout": "Offline Timeout (s)",
      "deviceTypes": "Device Types",
      "addType": "Add Device Type"
    },
    "location": {
      "title": "Location Settings",
      "subtitle": "Manage device locations",
      "addLocation": "Add Location",
      "editLocation": "Edit Location",
      "locationName": "Location Name",
      "address": "Address",
      "latitude": "Latitude",
      "longitude": "Longitude",
      "radius": "Radius (m)",
      "parentLocation": "Parent Location",
      "deviceCount": "Device Count"
    },
    "hardware": {
      "title": "Hardware Settings",
      "subtitle": "Manage hardware devices",
      "addHardware": "Add Hardware",
      "editHardware": "Edit Hardware",
      "model": "Model",
      "manufacturer": "Manufacturer",
      "serialNumber": "Serial Number",
      "firmwareVersion": "Firmware Version",
      "ipAddress": "IP Address",
      "macAddress": "MAC Address",
      "location": "Location",
      "status": "Status"
    },
    "sensor": {
      "title": "Sensor Settings",
      "subtitle": "Configure sensor types and defaults",
      "sensorTypes": "Sensor Types",
      "addSensorType": "Add Sensor Type",
      "category": "Category",
      "unit": "Unit",
      "minValue": "Min Value",
      "maxValue": "Max Value",
      "decimals": "Decimal Places",
      "calibrationOffset": "Calibration Offset",
      "pollingInterval": "Polling Interval (ms)"
    },
    "nodered": {
      "title": "Node-RED Settings",
      "subtitle": "Configure Node-RED connection",
      "url": "Node-RED URL",
      "adminPath": "Admin Path",
      "username": "Username",
      "password": "Password",
      "autoRestart": "Auto Restart",
      "logLevel": "Log Level",
      "testConnection": "Test Connection"
    },
    "mqtt": {
      "title": "MQTT Settings",
      "subtitle": "Configure MQTT broker connection",
      "defaultBroker": "Default Broker",
      "reconnectPeriod": "Reconnect Period (ms)",
      "connectTimeout": "Connect Timeout (ms)",
      "keepalive": "Keepalive (s)",
      "qos": "QoS Level",
      "retain": "Retain Messages",
      "brokers": "MQTT Brokers",
      "addBroker": "Add Broker",
      "brokerName": "Broker Name",
      "host": "Host",
      "port": "Port",
      "protocol": "Protocol",
      "testConnection": "Test Connection"
    },
    "email": {
      "title": "Email Settings",
      "subtitle": "Configure email (SMTP) settings",
      "provider": "Provider",
      "smtpHost": "SMTP Host",
      "smtpPort": "SMTP Port",
      "username": "Username",
      "password": "Password",
      "fromAddress": "From Address",
      "fromName": "From Name",
      "encryption": "Encryption",
      "testSend": "Send Test Email",
      "testEmailTo": "Test Email To"
    },
    "line": {
      "title": "LINE Settings",
      "subtitle": "Configure LINE Notify integration",
      "accessToken": "Access Token",
      "defaultTarget": "Default Target (Group/User)",
      "notifyOnAlarm": "Notify on Alarm",
      "notifyOnRecovery": "Notify on Recovery",
      "messageTemplate": "Message Template",
      "testNotify": "Send Test Notification"
    },
    "sms": {
      "title": "SMS Settings",
      "subtitle": "Configure SMS gateway",
      "provider": "Provider",
      "apiKey": "API Key",
      "apiSecret": "API Secret",
      "fromNumber": "From Number",
      "maxPerHour": "Max per Hour",
      "testSend": "Send Test SMS",
      "testPhoneTo": "Test Phone Number"
    },
    "host": {
      "title": "Host Settings",
      "subtitle": "Configure server host settings",
      "hostname": "Hostname",
      "port": "Port",
      "baseUrl": "Base URL",
      "timezone": "Timezone",
      "language": "Language",
      "maintenanceMode": "Maintenance Mode",
      "maintenanceMessage": "Maintenance Message",
      "maxUploadSize": "Max Upload Size (MB)",
      "sessionTimeout": "Session Timeout (s)",
      "serverInfo": "Server Information"
    },
    "api": {
      "title": "API Settings",
      "subtitle": "Configure API endpoints and security",
      "apiBaseUrl": "API Base URL",
      "version": "API Version",
      "timeout": "Request Timeout (ms)",
      "rateLimit": "Rate Limit (req/min)",
      "corsOrigins": "CORS Origins",
      "swaggerEnabled": "Enable Swagger",
      "debugMode": "Debug Mode",
      "requestLog": "Request Logging",
      "testConnection": "Test API Connection"
    },
    "token": {
      "title": "Token Management",
      "subtitle": "Manage API access tokens",
      "createToken": "Create Token",
      "tokenName": "Token Name",
      "permissions": "Permissions",
      "expiresAt": "Expires At",
      "lastUsedAt": "Last Used",
      "createdAt": "Created At",
      "revoke": "Revoke",
      "refresh": "Refresh",
      "confirmRevoke": "Are you sure you want to revoke this token?",
      "copyToken": "Copy Token",
      "tokenCopied": "Token copied to clipboard"
    }
  }
}
```

### i18n File Locations

```
src/assets/i18n/
├── en.json    # เพิ่ม "settings": { ... } key
├── th.json    # เพิ่ม "settings": { ... } key (ภาษาไทย)
├── ja.json
├── ko.json
├── zh.json
├── vi.json
├── ms.json
├── lo.json
├── km.json
├── my.json
└── ...
```

---

## 附録: แผนภาพรวม-flow การทำงานของ Settings Module

```
User clicks "Settings" in main sidebar
                    │
                    ▼
    ┌──────────────────────────────────┐
    │  /settings (Lazy Load)           │
    │  SettingsLayoutComponent         │
    │  ┌─────────────────────────────┐ │
    │  │  SettingsSidebar (15 items) │ │
    │  └──────────────┬──────────────┘ │
    │                 │                │
    │     RouterOutlet                 │
    └─────────────────┼────────────────┘
                      │
    User selects a tab (e.g. "MQTT")
                      │
                      ▼
    ┌──────────────────────────────────┐
    │  /settings/mqtt                  │
    │  MqttSettingsComponent           │
    │                                  │
    │  constructor(                    │
    │    @Inject(SETTINGS_REPOSITORY)  │
    │    repo: ISettingsRepository     │
    │  )                               │
    │                                  │
    │  1. GetMqttConfigUseCase         │
    │     → repo.getMqttConfig()       │
    │     → SettingsApiDataSource      │
    │     → GET /v1/settings/mqtt/config│
    │     → Response DTO               │
    │     → Mapper → Entity            │
    │     → Display in Form            │
    │                                  │
    │  2. User edits form              │
    │     → Form validation            │
    │                                  │
    │  3. User clicks "Save"           │
    │     → UpdateMqttConfigUseCase    │
    │       → repo.updateMqttConfig()  │
    │       → PUT /v1/settings/mqtt/config│
    │       → Success → Toast message  │
    │                                  │
    │  4. User clicks "Test Connection"│
    │     → TestMqttConnectionUseCase  │
    │       → repo.testMqttConnection()│
    │       → POST /v1/settings/mqtt/test│
    │       → Show result badge        │
    │                                  │
    └──────────────────────────────────┘
```

---

*Document version: 1.0.0 | Created: 2026-08-19*
