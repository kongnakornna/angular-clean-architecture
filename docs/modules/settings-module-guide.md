# Settings Module - คู่มือพัฒนา (Developer Guide)

> คู่มือสำหรับนักพัฒนาที่ต้องการเพิ่ม/แก้ไข Tabs ใน Settings Module  
> *Last updated: 2026-08-19 | Version: 1.0.0*

---

## สารบัญ

1. [วิธีเพิ่ม Tab ใหม่](#1-วิธีเพิ่ม-tab-ใหม่)
2. [โครงสร้าง Clean Architecture](#2-โครงสร้าง-clean-architecture)
3. [ตัวอย่าง Entity](#3-ตัวอย่าง-entity)
4. [ตัวอย่าง Repository](#4-ตัวอย่าง-repository)
5. [ตัวอย่าง Use Case](#5-ตัวอย่าง-use-case)
6. [ตัวอย่าง DataSource](#6-ตัวอย่าง-datasource)
7. [ตัวอย่าง Component](#7-ตัวอย่าง-component)
8. [การเพิ่ม Translations](#8-การเพิ่ม-translations)
9. [การเชื่อมต่อ Backend API](#9-การเชื่อมต่อ-backend-api)
10. [การทดสอบ](#10-การทดสอบ)

---

## 1. วิธีเพิ่ม Tab ใหม่

### ตัวอย่าง: เพิ่ม Tab "WebSocket Config"

ทำตาม 8 ขั้นตอนนี้:

### ขั้นตอนที่ 1: สร้าง Entity

```typescript
// features/settings/domain/entities/websocket-config.entity.ts
export interface WebSocketConfig {
  id: string;
  url: string;
  port: number;
  path: string;
  enableAuth: boolean;
  heartbeatInterval: number;
  maxRetries: number;
  enabled: boolean;
}
```

### ขั้นตอนที่ 2: เพิ่ม Methods ใน Repository Interface

```typescript
// features/settings/domain/repositories/settings.repository.ts
import { WebSocketConfig } from '../entities/websocket-config.entity';

export interface ISettingsRepository {
  // ... methods อื่นๆ ที่มีอยู่

  // WebSocket Config
  getWebSocketConfig(): Observable<WebSocketConfig>;
  updateWebSocketConfig(config: Partial<WebSocketConfig>): Observable<WebSocketConfig>;
}
```

### ขั้นตอนที่ 3: เพิ่ม API Endpoint

```typescript
// core/config/api.config.ts
settings: {
  // ... endpoints อื่นๆ ที่มีอยู่

  websocket: {
    config:       '/settings/websocket/config',
    updateConfig: '/settings/websocket/config',
    test:         '/settings/websocket/test',
  },
},
```

### ขั้นตอนที่ 4: เพิ่ม DTO

```typescript
// features/settings/data/dtos/websocket-config-response.dto.ts
export interface WebSocketConfigResponseDto {
  id: string;
  url: string;
  port: number;
  path: string;
  enable_auth: boolean;        // snake_case จาก backend
  heartbeat_interval: number;
  max_retries: number;
  enabled: boolean;
}
```

### ขั้นตอนที่ 5: เพิ่ม Mapping ใน SettingsMapper

```typescript
// features/settings/data/mappers/settings.mapper.ts
import { WebSocketConfig } from '../domain/entities/websocket-config.entity';
import { WebSocketConfigResponseDto } from '../dtos/websocket-config-response.dto';

export class SettingsMapper {
  // ... methods อื่นๆ

  static toWebSocketConfig(dto: WebSocketConfigResponseDto): WebSocketConfig {
    return {
      id: dto.id,
      url: dto.url,
      port: dto.port,
      path: dto.path,
      enableAuth: dto.enable_auth,
      heartbeatInterval: dto.heartbeat_interval,
      maxRetries: dto.max_retries,
      enabled: dto.enabled,
    };
  }
}
```

### ขั้นตอนที่ 6: เพิ่ม Methods ใน DataSource และ Repository Impl

```typescript
// features/settings/data/datasources/settings.api.datasource.ts
getWebSocketConfig(): Observable<any> {
  return this.http.get(this.endpoint(API_ENDPOINTS.settings.websocket.config));
}

updateWebSocketConfig(data: any): Observable<any> {
  return this.http.put(this.endpoint(API_ENDPOINTS.settings.websocket.updateConfig), data);
}
```

```typescript
// features/settings/data/repositories/settings.repository.impl.ts
getWebSocketConfig(): Observable<WebSocketConfig> {
  return this.dataSource.getWebSocketConfig().pipe(
    map(dto => SettingsMapper.toWebSocketConfig(dto))
  );
}

updateWebSocketConfig(config: Partial<WebSocketConfig>): Observable<WebSocketConfig> {
  return this.dataSource.updateWebSocketConfig(config).pipe(
    map(dto => SettingsMapper.toWebSocketConfig(dto))
  );
}
```

### ขั้นตอนที่ 7: เพิ่ม Routes

```typescript
// features/settings/settings.routes.ts
{
  path: 'websocket',
  loadComponent: () =>
    import('./presentation/pages/websocket-settings/websocket-settings.component').then(
      m => m.WebsocketSettingsComponent
    ),
},
```

### ขั้นตอนที่ 8: สร้าง Component และ Menu

```typescript
// features/settings/presentation/pages/websocket-settings/websocket-settings.component.ts
@Component({
  selector: 'app-websocket-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './websocket-settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebsocketSettingsComponent implements OnInit {
  private repo = inject(SETTINGS_REPOSITORY);
  private fb = inject(FormBuilder);
  private toast = inject(ToastService);

  form = this.fb.group({
    url: ['', Validators.required],
    port: [8080, Validators.required],
    path: ['/ws'],
    enableAuth: [false],
    heartbeatInterval: [30],
    maxRetries: [5],
    enabled: [true],
  });

  ngOnInit(): void {
    this.loadConfig();
  }

  private loadConfig(): void {
    this.repo.getWebSocketConfig().subscribe({
      next: (config) => this.form.patchValue(config),
      error: (err) => this.toast.error('Failed to load config'),
    });
  }

  save(): void {
    if (this.form.invalid) return;
    this.repo.updateWebSocketConfig(this.form.value).subscribe({
      next: () => this.toast.success('settings.common.saveSuccess'),
      error: () => this.toast.error('settings.common.saveError'),
    });
  }
}
```

เพิ่ม Menu Item:

```typescript
// features/settings/presentation/components/settings-sidebar/settings-sidebar.config.ts
{
  key: 'websocket',
  label: 'settings.menu.websocket',
  route: '/settings/websocket',
  icon: 'antenna',
  group: 'connectivity',
},
```

เพิ่ม Translation Keys:

```json
{
  "settings": {
    "menu": {
      "websocket": "WebSocket"
    },
    "websocket": {
      "title": "WebSocket Settings",
      "subtitle": "Configure WebSocket server connection",
      "url": "WebSocket URL",
      "port": "Port",
      "path": "Path",
      "enableAuth": "Enable Authentication",
      "heartbeatInterval": "Heartbeat Interval (s)",
      "maxRetries": "Max Retries"
    }
  }
}
```

### Checklist ก่อน Submit

- [ ] Entity interface สร้างแล้ว
- [ ] Repository interface มี method ครบ
- [ ] API endpoint เพิ่มใน `api.config.ts`
- [ ] DTO สร้างแล้ว (snake_case ตรงกับ backend)
- [ ] Mapper ทำ mapping ครบ
- [ ] DataSource มี HTTP method ครบ
- [ ] Repository Impl implements ครบ
- [ Component สร้างแล้ว (Standalone, OnPush)
- [ ] Route เพิ่มใน `settings.routes.ts`
- [ ] Menu Item เพิ่มใน sidebar config
- [ ] Translation Keys เพิ่มครบ (en.json + th.json + ...)
- [ ] Unit Test เขียนแล้ว
- [ ] ทดสอบหน้า UI ได้ปกติ

---

## 2. โครงสร้าง Clean Architecture

### แต่ละชั้นมีหน้าที่อะไร

```
┌─────────────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                              │
│                                                                     │
│  หน้าที่: แสดงผล UI, รับ Input จาก User, แสดง Validation Errors    │
│  ไม่มี: Business Logic, HTTP calls, Database access                │
│                                                                     │
│  ประกอบด้วย:                                                       │
│  ├── Pages (Smart Components)                                       │
│  │   └── เชื่อมกับ Use Cases หรือ Repository ผ่าน DI              │
│  ├── Components (Dumb/Presentational)                               │
│  │   └── รับ @Input, ส่ง @Output เท่านั้น                          │
│  ├── settings.routes.ts                                             │
│  └── settings-sidebar.config.ts                                     │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                      DOMAIN LAYER                                   │
│                                                                     │
│  หน้าที่: นิยาม Business Rules, Interfaces, Entities               │
│  ไม่มี: Angular, HTTP, Database (Pure TypeScript)                   │
│                                                                     │
│  ประกอบด้วย:                                                       │
│  ├── Entities (interfaces)                                          │
│  │   └── นิยามโครงสร้างข้อมูลทางธุรกิจ                               │
│  ├── Repositories (interfaces)                                      │
│  │   └── สัญญาณว่าต้องมี method อะไรบ้าง                            │
│  └── Use Cases                                                      │
│      └── Business logic ที่ใช้ทำ operations                         │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                       DATA LAYER                                    │
│                                                                     │
│  หน้าที่: Implement Repository interfaces, เชื่อมต่อ API          │
│  มี: HTTP calls, DTO mapping, Data transformation                  │
│                                                                     │
│  ประกอบด้วย:                                                       │
│  ├── DataSources (HTTP calls)                                       │
│  │   └── เรียก API ผ่าน HttpClient                                  │
│  ├── DTOs                                                           │
│  │   └── Data Transfer Objects (snake_case ↔ camelCase)             │
│  ├── Mappers                                                        │
│  │   └── แปลง DTO ↔ Entity                                         │
│  └── Repository Implementations                                     │
│      └── Implement interfaces จาก Domain Layer                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Dependency Rule

```
Presentation → Domain ← Data
     │            ▲         │
     │            │         │
     └── depends ─┘── depends┘

- Presentation ขึ้นอยู่กับ Domain (ใช้ Entity, Repository Interface)
- Data ขึ้นอยู่กับ Domain (Implement Repository Interface)
- Domain ไม่ขึ้นอยู่กับชั้นใดเลย (Pure TypeScript)
```

### Flow การทำงาน

```
User action (click Save)
       │
       ▼
Presentation Component
  └── calls UseCase.execute(input)
              │
              ▼
Domain Use Case
  └── calls repository.updateConfig(data)
              │
              ▼
Data Repository Impl
  └── calls dataSource.updateConfig(dto)
              │
              ▼
Data DataSource
  └── http.put(url, body)
              │
              ▼
Backend API (Node.js)
```

---

## 3. ตัวอย่าง Entity

### Pattern

```typescript
// features/settings/domain/entities/schedule.entity.ts

// 1. Interface: นิยามโครงสร้างข้อมูล
export interface ScheduleConfig {
  id: string;
  name: string;
  deviceId: string;
  cronExpression: string;
  action: ScheduleAction;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Type: สำหรับ union types
export type ScheduleAction = 'on' | 'off' | 'toggle' | 'custom';

// 3. (Optional) Class: ถ้าต้องมี behavior
export class ScheduleEntity {
  constructor(private readonly data: ScheduleConfig) {}

  get isActive(): boolean {
    return this.data.enabled && !this.isExpired;
  }

  get isExpired(): boolean {
    if (!this.data.endDate) return false;
    return new Date() > new Date(this.data.endDate);
  }
}
```

### Naming Convention

| Type | Suffix | ตัวอย่าง |
|------|--------|----------|
| Interface | `.entity.ts` | `schedule.entity.ts` |
| Type alias | ใน file เดียวกัน | `type ScheduleAction = ...` |
| Class | ใน file เดียวกัน | `class ScheduleEntity` |

### สิ่งที่ Entity ควรทำ

- ✅ นิยามโครงสร้างข้อมูล (fields, types)
- ✅ ใช้ TypeScript types/enums
- ✅ Optional fields ใช้ `?`
- ✅ Date fields ใช้ `Date` type
- ❌ ไม่ควรมี Angular decorators (`@Injectable`, `@Component`)
- ❌ ไม่ควรมี HTTP calls
- ❌ ไม่ควรมี side effects

---

## 4. ตัวอย่าง Repository

### Repository Interface (Domain Layer)

```typescript
// features/settings/domain/repositories/settings.repository.ts
import { Observable } from 'rxjs';
import { ScheduleConfig } from '../entities/schedule.entity';
import { AlarmConfig, AlarmRule } from '../entities/alarm-config.entity';
import { InfluxConfig } from '../entities/influx-config.entity';
import { MqttBroker, MqttConfig } from '../entities/mqtt-config.entity';
// ... imports อื่นๆ

export interface ISettingsRepository {
  // Schedule
  getScheduleConfigs(): Observable<ScheduleConfig[]>;
  getScheduleConfig(id: string): Observable<ScheduleConfig>;
  createScheduleConfig(config: Partial<ScheduleConfig>): Observable<ScheduleConfig>;
  updateScheduleConfig(id: string, config: Partial<ScheduleConfig>): Observable<ScheduleConfig>;
  deleteScheduleConfig(id: string): Observable<void>;

  // Alarm
  getAlarmConfig(): Observable<AlarmConfig>;
  updateAlarmConfig(config: Partial<AlarmConfig>): Observable<AlarmConfig>;
  getAlarmRules(): Observable<AlarmRule[]>;
  createAlarmRule(rule: Partial<AlarmRule>): Observable<AlarmRule>;
  updateAlarmRule(id: string, rule: Partial<AlarmRule>): Observable<AlarmRule>;
  deleteAlarmRule(id: string): Observable<void>;

  // InfluxDB
  getInfluxConfig(): Observable<InfluxConfig>;
  updateInfluxConfig(config: Partial<InfluxConfig>): Observable<InfluxConfig>;
  testInfluxConnection(config: InfluxConfig): Observable<{ success: boolean; message: string }>;
  getInfluxBuckets(): Observable<string[]>;

  // MQTT
  getMqttConfig(): Observable<MqttConfig>;
  updateMqttConfig(config: Partial<MqttConfig>): Observable<MqttConfig>;
  testMqttConnection(broker: Partial<MqttBroker>): Observable<{ success: boolean; message: string }>;
  getMqttBrokers(): Observable<MqttBroker[]>;
  createMqttBroker(broker: Partial<MqttBroker>): Observable<MqttBroker>;
  updateMqttBroker(id: string, broker: Partial<MqttBroker>): Observable<MqttBroker>;
  deleteMqttBroker(id: string): Observable<void>;

  // ... methods สำหรับทุก Tab
}
```

### Repository Implementation (Data Layer)

```typescript
// features/settings/data/repositories/settings.repository.impl.ts
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ISettingsRepository } from '../../domain/repositories/settings.repository';
import { SettingsApiDataSource } from '../datasources/settings.api.datasource';
import { SettingsMapper } from '../mappers/settings.mapper';
import { ScheduleConfig } from '../../domain/entities/schedule.entity';
import { MqttConfig, MqttBroker } from '../../domain/entities/mqtt-config.entity';

@Injectable({ providedIn: 'root' })
export class SettingsRepositoryImpl implements ISettingsRepository {
  private dataSource = inject(SettingsApiDataSource);

  // Schedule
  getScheduleConfigs(): Observable<ScheduleConfig[]> {
    return this.dataSource.getScheduleConfigs().pipe(
      map(dtos => dtos.map(dto => SettingsMapper.toScheduleConfig(dto)))
    );
  }

  getScheduleConfig(id: string): Observable<ScheduleConfig> {
    return this.dataSource.getScheduleConfig(id).pipe(
      map(dto => SettingsMapper.toScheduleConfig(dto))
    );
  }

  createScheduleConfig(config: Partial<ScheduleConfig>): Observable<ScheduleConfig> {
    return this.dataSource.createScheduleConfig(config).pipe(
      map(dto => SettingsMapper.toScheduleConfig(dto))
    );
  }

  updateScheduleConfig(id: string, config: Partial<ScheduleConfig>): Observable<ScheduleConfig> {
    return this.dataSource.updateScheduleConfig(id, config).pipe(
      map(dto => SettingsMapper.toScheduleConfig(dto))
    );
  }

  deleteScheduleConfig(id: string): Observable<void> {
    return this.dataSource.deleteScheduleConfig(id);
  }

  // MQTT
  getMqttConfig(): Observable<MqttConfig> {
    return this.dataSource.getMqttConfig().pipe(
      map(dto => SettingsMapper.toMqttConfig(dto))
    );
  }

  updateMqttConfig(config: Partial<MqttConfig>): Observable<MqttConfig> {
    return this.dataSource.updateMqttConfig(config).pipe(
      map(dto => SettingsMapper.toMqttConfig(dto))
    );
  }

  testMqttConnection(broker: Partial<MqttBroker>): Observable<{ success: boolean; message: string }> {
    return this.dataSource.testMqttConnection(broker);
  }

  // ... methods อื่นๆ
}
```

### Key Pattern

- **Interface** อยู่ใน `domain/repositories/` (ไม่มี Angular deps)
- **Implementation** อยู่ใน `data/repositories/` (มี `@Injectable`)
- ใช้ `inject()` สำหรับ DI ภายใน Implementation
- ใช้ `map()` จาก rxjs สำหรับ DTO ↔ Entity mapping

---

## 5. ตัวอย่าง Use Case

### Use Case Pattern

```typescript
// features/settings/domain/use-cases/get-mqtt-config.use-case.ts
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISettingsRepository } from '../repositories/settings.repository';
import { SETTINGS_REPOSITORY } from '../../../../core/di/tokens';
import { MqttConfig } from '../entities/mqtt-config.entity';

@Injectable({ providedIn: 'root' })
export class GetMqttConfigUseCase {
  constructor(@Inject(SETTINGS_REPOSITORY) private repo: ISettingsRepository) {}

  execute(): Observable<MqttConfig> {
    return this.repo.getMqttConfig();
  }
}
```

### Use Case with Input Parameter

```typescript
// features/settings/domain/use-cases/update-alarm-config.use-case.ts
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISettingsRepository } from '../repositories/settings.repository';
import { SETTINGS_REPOSITORY } from '../../../../core/di/tokens';
import { AlarmConfig } from '../entities/alarm-config.entity';

export interface UpdateAlarmConfigInput {
  config: Partial<AlarmConfig>;
}

@Injectable({ providedIn: 'root' })
export class UpdateAlarmConfigUseCase {
  constructor(@Inject(SETTINGS_REPOSITORY) private repo: ISettingsRepository) {}

  execute(input: UpdateAlarmConfigInput): Observable<AlarmConfig> {
    // Business validation (ถ้ามี)
    if (input.config.cooldownMinutes !== undefined && input.config.cooldownMinutes < 0) {
      throw new Error('Cooldown cannot be negative');
    }

    return this.repo.updateAlarmConfig(input.config);
  }
}
```

### Use Case with Multiple Dependencies

```typescript
// features/settings/domain/use-cases/test-email-send.use-case.ts
import { Inject, Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ISettingsRepository } from '../repositories/settings.repository';
import { SETTINGS_REPOSITORY } from '../../../../core/di/tokens';
import { EmailConfig } from '../entities/email-config.entity';

export interface TestEmailInput {
  to: string;
  subject: string;
  body: string;
}

@Injectable({ providedIn: 'root' })
export class TestEmailSendUseCase {
  constructor(@Inject(SETTINGS_REPOSITORY) private repo: ISettingsRepository) {}

  execute(input: TestEmailInput): Observable<{ success: boolean; message: string }> {
    // 1. ดึง config ปัจจุบัน
    return this.repo.getEmailConfig().pipe(
      // 2. ใช้ config ปัจจุบันในการส่ง email ทดสอบ
      switchMap((config: EmailConfig) => {
        return this.repo.testEmailSend({
          config,
          to: input.to,
          subject: input.subject,
          body: input.body,
        });
      })
    );
  }
}
```

### Use Case Naming Convention

| Pattern | ตัวอย่าง | ใช้เมื่อ |
|---------|----------|----------|
| `Get*UseCase` | `GetMqttConfigUseCase` | ดึงข้อมูล |
| `List*UseCase` | `ListSchedulesUseCase` | ดึงรายการ |
| `Create*UseCase` | `CreateScheduleUseCase` | สร้างใหม่ |
| `Update*UseCase` | `UpdateAlarmConfigUseCase` | อัปเดต |
| `Delete*UseCase` | `DeleteScheduleUseCase` | ลบ |
| `Test*UseCase` | `TestMqttConnectionUseCase` | ทดสอบ |

---

## 6. ตัวอย่าง DataSource

### API DataSource

```typescript
// features/settings/data/datasources/settings.api.datasource.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { APP_CONFIG } from '../../../../core/config/app.config';

@Injectable({ providedIn: 'root' })
export class SettingsApiDataSource {
  private http = inject(HttpClient);
  private cfg = inject(APP_CONFIG);

  private endpoint(path: string): string {
    return `${this.cfg.apiBaseUrl}${path}`;
  }

  // ── Schedule ──
  getScheduleConfigs(): Observable<any[]> {
    return this.http.get<any[]>(this.endpoint(API_ENDPOINTS.settings.schedule.list));
  }

  getScheduleConfig(id: string): Observable<any> {
    return this.http.get(this.endpoint(API_ENDPOINTS.settings.schedule.detail(id)));
  }

  createScheduleConfig(data: any): Observable<any> {
    return this.http.post(this.endpoint(API_ENDPOINTS.settings.schedule.create), data);
  }

  updateScheduleConfig(id: string, data: any): Observable<any> {
    return this.http.put(this.endpoint(API_ENDPOINTS.settings.schedule.update(id)), data);
  }

  deleteScheduleConfig(id: string): Observable<void> {
    return this.http.delete<void>(this.endpoint(API_ENDPOINTS.settings.schedule.delete(id)));
  }

  // ── MQTT ──
  getMqttConfig(): Observable<any> {
    return this.http.get(this.endpoint(API_ENDPOINTS.settings.mqtt.config));
  }

  updateMqttConfig(data: any): Observable<any> {
    return this.http.put(this.endpoint(API_ENDPOINTS.settings.mqtt.updateConfig), data);
  }

  testMqttConnection(data: any): Observable<any> {
    return this.http.post(this.endpoint(API_ENDPOINTS.settings.mqtt.test), data);
  }

  getMqttBrokers(): Observable<any[]> {
    return this.http.get<any[]>(this.endpoint(API_ENDPOINTS.settings.mqtt.brokers));
  }

  createMqttBroker(data: any): Observable<any> {
    return this.http.post(this.endpoint(API_ENDPOINTS.settings.mqtt.createBroker), data);
  }

  updateMqttBroker(id: string, data: any): Observable<any> {
    return this.http.put(this.endpoint(API_ENDPOINTS.settings.mqtt.updateBroker(id)), data);
  }

  deleteMqttBroker(id: string): Observable<void> {
    return this.http.delete<void>(this.endpoint(API_ENDPOINTS.settings.mqtt.deleteBroker(id)));
  }

  // ── Email ──
  getEmailConfig(): Observable<any> {
    return this.http.get(this.endpoint(API_ENDPOINTS.settings.email.config));
  }

  updateEmailConfig(data: any): Observable<any> {
    return this.http.put(this.endpoint(API_ENDPOINTS.settings.email.updateConfig), data);
  }

  testEmailSend(data: any): Observable<any> {
    return this.http.post(this.endpoint(API_ENDPOINTS.settings.email.test), data);
  }

  // ── InfluxDB ──
  getInfluxConfig(): Observable<any> {
    return this.http.get(this.endpoint(API_ENDPOINTS.settings.influx.config));
  }

  updateInfluxConfig(data: any): Observable<any> {
    return this.http.put(this.endpoint(API_ENDPOINTS.settings.influx.updateConfig), data);
  }

  testInfluxConnection(data: any): Observable<any> {
    return this.http.post(this.endpoint(API_ENDPOINTS.settings.influx.test), data);
  }

  getInfluxBuckets(): Observable<any> {
    return this.http.get(this.endpoint(API_ENDPOINTS.settings.influx.buckets));
  }

  // ── Token ──
  getTokens(): Observable<any[]> {
    return this.http.get<any[]>(this.endpoint(API_ENDPOINTS.settings.token.list));
  }

  createToken(data: any): Observable<any> {
    return this.http.post(this.endpoint(API_ENDPOINTS.settings.token.create), data);
  }

  revokeToken(id: string): Observable<void> {
    return this.http.delete<void>(this.endpoint(API_ENDPOINTS.settings.token.revoke(id)));
  }

  refreshToken(id: string): Observable<any> {
    return this.http.post(this.endpoint(API_ENDPOINTS.settings.token.refresh(id)), {});
  }
}
```

### Pattern Notes

- ใช้ `inject()` แทน constructor injection
- ใช้ `APP_CONFIG` เพื่อสร้าง base URL
- ใช้ `API_ENDPOINTS` constants จาก `core/config/api.config.ts`
- คืนค่า `Observable<any>` (ไม่ map ที่ DataSource level)
- การ map ทำที่ Repository Impl level

---

## 7. ตัวอย่าง Component

### Smart Component (Page)

```typescript
// features/settings/presentation/pages/mqtt-settings/mqtt-settings.component.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { ToastService } from '../../../../shared/services/toast.service';
import { SETTINGS_REPOSITORY } from '../../../../core/di/tokens';
import { ISettingsRepository } from '../../../domain/repositories/settings.repository';
import { MqttBroker } from '../../../domain/entities/mqtt-config.entity';

@Component({
  selector: 'app-mqtt-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './mqtt-settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MqttSettingsComponent implements OnInit {
  private repo = inject(SETTINGS_REPOSITORY);
  private fb = inject(FormBuilder);
  private toast = inject(ToastService);

  brokers = signal<MqttBroker[]>([]);
  loading = signal(true);
  saving = signal(false);
  testing = signal(false);

  form = this.fb.group({
    defaultBrokerId: ['', Validators.required],
    reconnectPeriod: [1000, [Validators.required, Validators.min(100)]],
    connectTimeout: [10000, [Validators.required, Validators.min(1000)]],
    keepalive: [60, [Validators.required, Validators.min(10)]],
    qos: [1, [Validators.required, Validators.min(0), Validators.max(2)]],
    retain: [false],
  });

  brokerForm = this.fb.group({
    name: ['', Validators.required],
    host: ['', Validators.required],
    port: [1883, [Validators.required, Validators.min(1), Validators.max(65535)]],
    protocol: ['mqtt', Validators.required],
    username: [''],
    password: [''],
    enabled: [true],
    isDefault: [false],
  });

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loading.set(true);

    // Load config
    this.repo.getMqttConfig().subscribe({
      next: (config) => {
        this.form.patchValue(config);
        this.loading.set(false);
      },
      error: () => {
        this.toast.error('settings.common.saveError');
        this.loading.set(false);
      },
    });

    // Load brokers
    this.repo.getMqttBrokers().subscribe({
      next: (brokers) => this.brokers.set(brokers),
    });
  }

  saveConfig(): void {
    if (this.form.invalid) return;

    this.saving.set(true);
    this.repo.updateMqttConfig(this.form.value).subscribe({
      next: () => {
        this.toast.success('settings.common.saveSuccess');
        this.saving.set(false);
      },
      error: () => {
        this.toast.error('settings.common.saveError');
        this.saving.set(false);
      },
    });
  }

  testConnection(): void {
    const broker = this.brokerForm.value;
    if (!broker.host) return;

    this.testing.set(true);
    this.repo.testMqttConnection(broker).subscribe({
      next: (result) => {
        if (result.success) {
          this.toast.success('settings.common.testSuccess');
        } else {
          this.toast.error(result.message);
        }
        this.testing.set(false);
      },
      error: () => {
        this.toast.error('settings.common.testFailed');
        this.testing.set(false);
      },
    });
  }

  addBroker(): void {
    if (this.brokerForm.invalid) return;

    this.repo.createMqttBroker(this.brokerForm.value).subscribe({
      next: (broker) => {
        this.brokers.update(list => [...list, broker]);
        this.brokerForm.reset({ port: 1883, protocol: 'mqtt', enabled: true });
        this.toast.success('settings.common.saveSuccess');
      },
      error: () => this.toast.error('settings.common.saveError'),
    });
  }

  deleteBroker(id: string): void {
    this.repo.deleteMqttBroker(id).subscribe({
      next: () => {
        this.brokers.update(list => list.filter(b => b.id !== id));
        this.toast.success('settings.common.saveSuccess');
      },
      error: () => this.toast.error('settings.common.saveError'),
    });
  }

  trackById = (index: number, item: MqttBroker) => item.id;
}
```

### Template Pattern

```html
<!-- features/settings/presentation/pages/mqtt-settings/mqtt-settings.component.html -->
<div class="page-body">
  <div class="container-xl">
    <!-- Page Header -->
    <div class="page-pretitle">{{ 'settings.menu.connectivity' | translate }}</div>
    <h2 class="page-title">{{ 'settings.mqtt.title' | translate }}</h2>
    <p class="text-secondary">{{ 'settings.mqtt.subtitle' | translate }}</p>

    <!-- Loading State -->
    @if (loading()) {
      <div class="d-flex justify-content-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">{{ 'common.loading' | translate }}</span>
        </div>
      </div>
    } @else {
      <div class="row">
        <!-- Main Config Card -->
        <div class="col-lg-8">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">{{ 'settings.mqtt.title' | translate }}</h3>
            </div>
            <div class="card-body">
              <form [formGroup]="form" (ngSubmit)="saveConfig()">
                <div class="mb-3">
                  <label class="form-label">{{ 'settings.mqtt.reconnectPeriod' | translate }}</label>
                  <input type="number" class="form-control" formControlName="reconnectPeriod" />
                </div>
                <div class="mb-3">
                  <label class="form-label">{{ 'settings.mqtt.keepalive' | translate }}</label>
                  <input type="number" class="form-control" formControlName="keepalive" />
                </div>
                <div class="mb-3">
                  <label class="form-label">{{ 'settings.mqtt.qos' | translate }}</label>
                  <select class="form-select" formControlName="qos">
                    <option [value]="0">0 - At most once</option>
                    <option [value]="1">1 - At least once</option>
                    <option [value]="2">2 - Exactly once</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-check">
                    <input type="checkbox" class="form-check-input" formControlName="retain" />
                    <span class="form-check-label">{{ 'settings.mqtt.retain' | translate }}</span>
                  </label>
                </div>
                <div class="card-footer">
                  <button type="submit" class="btn btn-primary" [disabled]="saving()">
                    @if (saving()) {
                      <span class="spinner-border spinner-border-sm me-2"></span>
                    }
                    {{ 'common.save' | translate }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Brokers Sidebar -->
        <div class="col-lg-4">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">{{ 'settings.mqtt.brokers' | translate }}</h3>
            </div>
            <ul class="list-group list-group-flush">
              @for (broker of brokers(); track trackById($index, broker)) {
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{{ broker.name }}</strong>
                    <small class="text-secondary d-block">{{ broker.host }}:{{ broker.port }}</small>
                  </div>
                  <button class="btn btn-sm btn-outline-danger" (click)="deleteBroker(broker.id)">
                    {{ 'common.delete' | translate }}
                  </button>
                </li>
              } @empty {
                <li class="list-group-item text-center text-secondary">
                  {{ 'common.noData' | translate }}
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    }
  </div>
</div>
```

### Component Checklist

- [ ] ใช้ `standalone: true`
- [ ] ใช้ `ChangeDetectionStrategy.OnPush`
- [ ] ใช้ `inject()` แทน constructor
- [ ] ใช้ `signal()` สำหรับ local state
- [ ] ไม่ hardcoded strings → ใช้ `translate` pipe
- [ ] มี `trackBy` สำหรับ `@for`
- [ ] ใช้ `@if` / `@for` (Angular 17+ control flow)
- [ ] Loading state แสดงspinner
- [ ] Error handling → toast message

---

## 8. การเพิ่ม Translations

### ขั้นตอน

1. เพิ่ม keys ใน `src/assets/i18n/en.json`
2. เพิ่ม keys ใน `src/assets/i18n/th.json`
3. เพิ่ม keys ในภาษาอื่นๆ ที่ project รองรับ

### ตัวอย่าง: เพิ่ม Tab "WebSocket"

```json
// src/assets/i18n/en.json - เพิ่มใน "settings" object
{
  "settings": {
    "menu": {
      "websocket": "WebSocket"
    },
    "websocket": {
      "title": "WebSocket Settings",
      "subtitle": "Configure WebSocket server connection",
      "url": "WebSocket URL",
      "port": "Port",
      "path": "Path",
      "enableAuth": "Enable Authentication",
      "heartbeatInterval": "Heartbeat Interval (seconds)",
      "maxRetries": "Max Reconnection Retries"
    }
  }
}
```

```json
// src/assets/i18n/th.json - เพิ่มใน "settings" object
{
  "settings": {
    "menu": {
      "websocket": "WebSocket"
    },
    "websocket": {
      "title": "ตั้งค่า WebSocket",
      "subtitle": "กำหนดค่าการเชื่อมต่อ WebSocket Server",
      "url": "URL ของ WebSocket",
      "port": "พอร์ต",
      "path": "Path",
      "enableAuth": "เปิดใช้งานการยืนยันตัวตน",
      "heartbeatInterval": "ช่วง Heartbeat (วินาที)",
      "maxRetries": "จำนวนครั้งสูงสุดในการเชื่อมต่อใหม่"
    }
  }
}
```

### Translation Key Convention

```
settings.menu.{tabKey}          → ชื่อเมนูใน sidebar
settings.{tabKey}.title         → หัวข้อหน้า
settings.{tabKey}.subtitle      → คำอธิบายใต้หัวข้อ
settings.{tabKey}.{fieldName}   → ชื่อ field ใน form
settings.common.*               → ข้อความทั่วไป (saveSuccess, testFailed, ...)
```

### การใช้ใน Component

```typescript
// ใน Template
<h2>{{ 'settings.websocket.title' | translate }}</h2>
<label>{{ 'settings.websocket.url' | translate }}</label>

// ใน TypeScript (ถ้าต้องใช้ใน code)
// ใช้ TranslateService จาก ngx-translate
// this.translate.instant('settings.common.saveSuccess')
```

---

## 9. การเชื่อมต่อ Backend API

### Architecture

```
Angular Frontend (localhost:4200)
    │
    │  HTTP Request
    │  GET /api/settings/mqtt/config
    │  Headers: Authorization: Bearer <token>
    │
    ▼
┌─────────────────────────────────────┐
│  Backend Proxy (angular.json)       │
│  /api → http://localhost:3003       │
└─────────────────────────────────────┘
    │
    ▼
Node.js Backend (localhost:3003)
    │
    │  Route: /v1/settings/mqtt/config
    │  Controller: SettingsController
    │  Service: SettingsService
    │  Model: SettingsModel
    │
    ▼
MySQL Database
```

### API Response Format

```json
// Success
{
  "status": "success",
  "data": {
    "id": "mqtt-config-1",
    "defaultBrokerId": "broker-1",
    "reconnectPeriod": 1000,
    "keepalive": 60,
    "qos": 1,
    "retain": false
  }
}

// Error
{
  "status": "error",
  "message": "Failed to load MQTT configuration",
  "code": "SETTINGS_LOAD_ERROR"
}
```

### Auth Interceptor

```typescript
// core/interceptors/auth.interceptor.ts
// Request ทุก request จะถูกแนบ token โดยอัตโนมัติ
// ไม่ต้องเพิ่ม Authorization header เอง

// ถ้า backend คืน 401 → error interceptor จะ redirect ไปหน้า login
```

### Error Handling

```typescript
// ใน Component
this.repo.getMqttConfig().subscribe({
  next: (config) => {
    // Success
    this.form.patchValue(config);
  },
  error: (err) => {
    // Error interceptor จัดการ 401/403/500 แล้ว
    // เหลือเฉพาะ business error ที่ต้อง handle เอง
    this.toast.error('settings.common.saveError');
  },
});

// หรือใช้ finalize สำหรับ cleanup
this.repo.getMqttConfig().pipe(
  finalize(() => this.loading.set(false))
).subscribe({
  next: (config) => this.form.patchValue(config),
  error: () => this.toast.error('Failed to load config'),
});
```

---

## 10. การทดสอบ

### Unit Test Structure

```
features/settings/
├── domain/
│   └── use-cases/
│       ├── get-mqtt-config.use-case.spec.ts
│       └── update-mqtt-config.use-case.spec.ts
├── data/
│   ├── repositories/
│   │   └── settings.repository.impl.spec.ts
│   ├── datasources/
│   │   └── settings.api.datasource.spec.ts
│   └── mappers/
│       └── settings.mapper.spec.ts
└── presentation/
    └── pages/
        └── mqtt-settings/
            └── mqtt-settings.component.spec.ts
```

### Use Case Test

```typescript
// features/settings/domain/use-cases/get-mqtt-config.use-case.spec.ts
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GetMqttConfigUseCase } from './get-mqtt-config.use-case';
import { ISettingsRepository } from '../repositories/settings.repository';
import { SETTINGS_REPOSITORY } from '../../../../core/di/tokens';
import { MqttConfig } from '../entities/mqtt-config.entity';

describe('GetMqttConfigUseCase', () => {
  let useCase: GetMqttConfigUseCase;
  let mockRepo: jasmine.SpyObj<ISettingsRepository>;

  const mockConfig: MqttConfig = {
    id: '1',
    defaultBrokerId: 'broker-1',
    reconnectPeriod: 1000,
    connectTimeout: 10000,
    keepalive: 60,
    qos: 1,
    retain: false,
  };

  beforeEach(() => {
    mockRepo = jasmine.createSpyObj('ISettingsRepository', ['getMqttConfig']);
    mockRepo.getMqttConfig.and.returnValue(of(mockConfig));

    TestBed.configureTestingModule({
      providers: [
        GetMqttConfigUseCase,
        { provide: SETTINGS_REPOSITORY, useValue: mockRepo },
      ],
    });

    useCase = TestBed.inject(GetMqttConfigUseCase);
  });

  it('should return MQTT config from repository', (done) => {
    useCase.execute().subscribe((config) => {
      expect(config).toEqual(mockConfig);
      expect(mockRepo.getMqttConfig).toHaveBeenCalledOnceWith();
      done();
    });
  });
});
```

### Repository Impl Test

```typescript
// features/settings/data/repositories/settings.repository.impl.spec.ts
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SettingsRepositoryImpl } from './settings.repository.impl';
import { SettingsApiDataSource } from '../datasources/settings.api.datasource';
import { SettingsMapper } from '../mappers/settings.mapper';

describe('SettingsRepositoryImpl', () => {
  let repo: SettingsRepositoryImpl;
  let mockDataSource: jasmine.SpyObj<SettingsApiDataSource>;

  beforeEach(() => {
    mockDataSource = jasmine.createSpyObj('SettingsApiDataSource', [
      'getMqttConfig',
      'updateMqttConfig',
      'getScheduleConfigs',
    ]);

    TestBed.configureTestingModule({
      providers: [
        SettingsRepositoryImpl,
        { provide: SettingsApiDataSource, useValue: mockDataSource },
      ],
    });

    repo = TestBed.inject(SettingsRepositoryImpl);
  });

  describe('getMqttConfig', () => {
    it('should return mapped MQTT config', (done) => {
      const mockDto = {
        id: '1',
        default_broker_id: 'broker-1',
        reconnect_period: 1000,
        connect_timeout: 10000,
        keepalive: 60,
        qos: 1,
        retain: false,
      };

      mockDataSource.getMqttConfig.and.returnValue(of(mockDto));

      repo.getMqttConfig().subscribe((config) => {
        expect(config.id).toBe('1');
        expect(config.defaultBrokerId).toBe('broker-1'); // snake_case → camelCase
        expect(config.reconnectPeriod).toBe(1000);
        expect(mockDataSource.getMqttConfig).toHaveBeenCalledOnceWith();
        done();
      });
    });
  });
});
```

### Component Test

```typescript
// features/settings/presentation/pages/mqtt-settings/mqtt-settings.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { MqttSettingsComponent } from './mqtt-settings.component';
import { ISettingsRepository } from '../../../domain/repositories/settings.repository';
import { SETTINGS_REPOSITORY } from '../../../../core/di/tokens';
import { ToastService } from '../../../../shared/services/toast.service';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

describe('MqttSettingsComponent', () => {
  let component: MqttSettingsComponent;
  let fixture: ComponentFixture<MqttSettingsComponent>;
  let mockRepo: jasmine.SpyObj<ISettingsRepository>;
  let mockToast: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    mockRepo = jasmine.createSpyObj('ISettingsRepository', [
      'getMqttConfig', 'updateMqttConfig', 'getMqttBrokers',
    ]);
    mockToast = jasmine.createSpyObj('ToastService', ['success', 'error']);
    mockRepo.getMqttConfig.and.returnValue(of({
      id: '1', defaultBrokerId: '', reconnectPeriod: 1000,
      connectTimeout: 10000, keepalive: 60, qos: 1, retain: false,
    }));
    mockRepo.getMqttBrokers.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MqttSettingsComponent],
      providers: [
        { provide: SETTINGS_REPOSITORY, useValue: mockRepo },
        { provide: ToastService, useValue: mockToast },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MqttSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load config on init', () => {
    expect(mockRepo.getMqttConfig).toHaveBeenCalled();
    expect(component.form.get('keepalive')?.value).toBe(60);
  });

  it('should load brokers on init', () => {
    expect(mockRepo.getMqttBrokers).toHaveBeenCalled();
  });

  it('should save config when form is valid', () => {
    mockRepo.updateMqttConfig.and.returnValue(of({} as any));
    component.saveConfig();
    expect(mockRepo.updateMqttConfig).toHaveBeenCalled();
    expect(mockToast.success).toHaveBeenCalledWith('settings.common.saveSuccess');
  });

  it('should show error when save fails', () => {
    mockRepo.updateMqttConfig.and.returnValue(of({}).pipe(
      // simulate error
    ));
    // Test error case...
  });
});
```

### Running Tests

```bash
# Test ทั้งหมด
ng test --watch=false --browsers=ChromeHeadless

# Test เฉพาะ Settings Module
ng test --include="**/settings/**" --watch=false

# Test เฉพาะ Use Case
ng test --include="**/settings/**/*.use-case.spec.ts" --watch=false

# Test พร้อม Coverage
ng test --code-coverage --watch=false --browsers=ChromeHeadless

# Type Check
npx tsc --noEmit
```

---

## Command Quick Reference

```bash
# สร้างโครงสร้างโฟลเดอร์ทั้งหมด
mkdir -p src/app/features/settings/{domain/{entities,repositories,use-cases},data/{datasources,dtos,mappers,repositories},presentation/{pages/{schedule-settings,alarm-settings,influx-settings,device-settings,location-settings,hardware-settings,sensor-settings,nodered-settings,mqtt-settings,email-settings,line-settings,sms-settings,host-settings,api-settings,token-settings},components/{settings-sidebar,settings-form-card,connection-test-button,token-table}}}

# Type check
npx tsc --noEmit

# Lint
ng lint

# Test
ng test --watch=false --browsers=ChromeHeadless

# Build
ng build --configuration production
```

---

*Document version: 1.0.0 | Created: 2026-08-19*
