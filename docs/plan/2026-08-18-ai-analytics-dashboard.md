# Implementation Plan: AI Data Analytics Platform Module

**วันที่:** 2026-08-18
**Scope:** สร้าง feature module `ai-analytics` ใหม่ 8 หน้าจอ พร้อม Mock Data และ Unit Tests
**Framework:** Angular 21 + Clean Architecture (遵循 project เดิม)

---

## ภาพรวมการแก้ไข

| # | Layer | ไฟล์/โฟลเดอร์ | สิ่งที่แก้ |
|---|-------|--------------|-----------|
| 1 | entity | `features/ai-analytics/domain/entities/*.entity.ts` | สร้าง entity 8 ไฟล์ (command-center, dashboard, report, log, workflow, schedule, alert, data-analyst) |
| 2 | repository interface | `features/ai-analytics/domain/repositories/ai-analytics.repository.ts` | สร้าง interface `IAIAnalyticsRepository` พร้อม methods สำหรับทุก entity |
| 3 | use-case | `features/ai-analytics/domain/use-cases/*.usecase.ts` | สร้าง use case 8 ตัว (get-tasks, get-dashboard-stats, get-reports, get-logs, get-workflows, get-schedules, get-alerts, get-insights) |
| 4 | mock datasource | `features/ai-analytics/data/datasources/ai-analytics-mock.datasource.ts` | สร้าง mock data ทั้ง 8 หน้า + simulated real-time updates |
| 5 | dto | `features/ai-analytics/data/dtos/ai-analytics.dto.ts` | สร้าง DTO mapping interfaces |
| 6 | repository impl | `features/ai-analytics/data/repositories/ai-analytics.repository.impl.ts` | Implement repository ใช้ mock datasource |
| 7 | DI tokens | `core/di/tokens.ts` | เพิ่ม `AI_ANALYTICS_REPOSITORY` token |
| 8 | DI providers | `core/di/providers.ts` | เพิ่ม provider mapping |
| 9 | shared components | `features/ai-analytics/presentation/components/*` | สร้าง 9 shared components |
| 10 | page: command-center | `features/ai-analytics/presentation/pages/command-center/` | หน้า Command Center |
| 11 | page: dashboard | `features/ai-analytics/presentation/pages/dashboard/` | หน้า Dashboard |
| 12 | page: reports | `features/ai-analytics/presentation/pages/reports/` | หน้า Reports |
| 13 | page: activity-log | `features/ai-analytics/presentation/pages/activity-log/` | หน้า Activity Log |
| 14 | page: workflow-ai | `features/ai-analytics/presentation/pages/workflow-ai/` | หน้า Workflow AI |
| 15 | page: scheduler | `features/ai-analytics/presentation/pages/scheduler/` | หน้า Scheduler |
| 16 | page: alert-management | `features/ai-analytics/presentation/pages/alert-management/` | หน้า Alert Management |
| 17 | page: data-analyst | `features/ai-analytics/presentation/pages/data-analyst/` | หน้า Data Analyst Dashboard |
| 18 | routing | `features/ai-analytics/ai-analytics.routes.ts` | กำหนด lazy-loaded routes 8 หน้า |
| 19 | module | `features/ai-analytics/ai-analytics.module.ts` | สร้าง NgModule |
| 20 | app routing | `app/app-routing.module.ts` | เพิ่ม lazy route สำหรับ ai-analytics |
| 21 | sidebar menu | `core/config/menu.config.ts` | เพิ่ม menu item AI Analytics |
| 22 | i18n | `src/assets/i18n/en.json`, `src/assets/i18n/th.json` | เพิ่ม translations |
| 23 | unit tests | `*.spec.ts` | เขียน unit test สำหรับ use cases, mock datasource, components |

---

## 1. Domain Entities

### 1.1 `features/ai-analytics/domain/entities/command-center.entity.ts`

สร้าง interfaces สำหรับ Command Center:

```typescript
export type TaskStatus = 'running' | 'completed' | 'failed' | 'queued' | 'paused';
export type TaskType = 'etl' | 'ai_analysis' | 'report' | 'email' | 'sync' | 'workflow';

export interface Task {
  id: string;
  name: string;
  type: TaskType;
  status: TaskStatus;
  progress: number; // 0-100
  startedAt?: string;
  completedAt?: string;
  duration?: string;
  error?: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  action: string;
}

export interface CommandCenterState {
  tasks: Task[];
  quickActions: QuickAction[];
  summary: {
    completed: number;
    pending: number;
    failed: number;
    successRate: number;
  };
}
```

### 1.2 `features/ai-analytics/domain/entities/dashboard.entity.ts`

```typescript
export interface KPI {
  label: string;
  value: string | number;
  delta: number; // percentage change
  deltaDirection: 'up' | 'down' | 'neutral';
}

export interface SystemHealthItem {
  name: string;
  online?: number;
  total?: number;
  used?: number;
  unit?: string;
  value?: number;
}

export interface DashboardState {
  kpis: KPI[];
  systemHealth: SystemHealthItem[];
  alerts: DashboardAlert[];
}

export interface DashboardAlert {
  severity: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
}
```

### 1.3 `features/ai-analytics/domain/entities/report.entity.ts`

```typescript
export type ReportType = 'ai_generated' | 'human_review' | 'auto_generated';

export interface Report {
  id: string;
  title: string;
  type: ReportType;
  createdAt: string;
  format: string[];
  folder?: string;
}

export interface ReportFolder {
  name: string;
  count: number;
}
```

### 1.4 `features/ai-analytics/domain/entities/log.entity.ts`

```typescript
export type LogType = 'success' | 'ai_query' | 'warning' | 'error' | 'report' | 'workflow';

export interface LogEntry {
  time: string;
  type: LogType;
  action: string;
  detail: string;
  user: string;
  duration?: string;
  tokens?: number;
  retry?: string;
  format?: string;
}

export interface LogFilter {
  search?: string;
  date?: string;
  type?: LogType;
  user?: string;
}
```

### 1.5 `features/ai-analytics/domain/entities/workflow.entity.ts`

```typescript
export type NodeType = 'data_source' | 'transform' | 'ai_analyze' | 'visualize' | 'send_email' | 'schedule' | 'alert' | 'filter' | 'junction';

export interface WorkflowNode {
  id: string;
  type: NodeType;
  label: string;
  position: { x: number; y: number };
  config?: Record<string, any>;
  status?: 'idle' | 'running' | 'success' | 'failed';
}

export interface WorkflowEdge {
  from: string;
  to: string;
}

export interface Workflow {
  id: string;
  name: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  status: 'draft' | 'running' | 'stopped';
  createdAt: string;
  updatedAt: string;
}

export const NODE_TEMPLATES: { type: NodeType; label: string; icon: string }[] = [
  { type: 'data_source', label: 'Data Source', icon: 'download' },
  { type: 'transform', label: 'Transform', icon: 'refresh' },
  { type: 'ai_analyze', label: 'AI Analyze', icon: 'robot' },
  { type: 'visualize', label: 'Visualize', icon: 'chart-bar' },
  { type: 'send_email', label: 'Send Email', icon: 'mail' },
  { type: 'schedule', label: 'Schedule', icon: 'clock' },
  { type: 'alert', label: 'Alert', icon: 'bell' },
];
```

### 1.6 `features/ai-analytics/domain/entities/schedule.entity.ts`

```typescript
export type ScheduleStatus = 'active' | 'paused' | 'failed';

export interface ScheduledJob {
  id: string;
  name: string;
  cron: string;
  workflow: string;
  status: ScheduleStatus;
  nextRun: string;
  lastRun?: string;
  description?: string;
}

export interface UpcomingRun {
  time: string;
  jobName: string;
  status: 'pending' | 'running';
}
```

### 1.7 `features/ai-analytics/domain/entities/alert.entity.ts`

```typescript
export type AlertSeverity = 'critical' | 'warning' | 'info';
export type AlertStatus = 'active' | 'acknowledged' | 'muted';

export interface Alert {
  id: string;
  severity: AlertSeverity;
  message: string;
  triggeredAt: string;
  source: string;
  status: AlertStatus;
}

export interface AlertRule {
  id: string;
  condition: string;
  actions: string[];
  enabled: boolean;
}
```

### 1.8 `features/ai-analytics/domain/entities/data-analyst.entity.ts`

```typescript
export interface AnalystKPI {
  revenue: string;
  revenueDelta: number;
  users: string;
  usersDelta: number;
  orders: number;
  ordersDelta: number;
  avgRating: number;
  ratingDelta: number;
}

export interface DataInsight {
  id: string;
  text: string;
  type: 'positive' | 'negative' | 'neutral';
  source: string;
  createdAt: string;
}

export interface ChartData {
  labels: string[];
  datasets: { label: string; data: number[] }[];
}
```

---

## 2. Repository Interface

### `features/ai-analytics/domain/repositories/ai-analytics.repository.ts`

```typescript
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommandCenterState } from '../entities/command-center.entity';
import { DashboardState } from '../entities/dashboard.entity';
import { Report, ReportFolder } from '../entities/report.entity';
import { LogEntry, LogFilter } from '../entities/log.entity';
import { Workflow } from '../entities/workflow.entity';
import { ScheduledJob, UpcomingRun } from '../entities/schedule.entity';
import { Alert, AlertRule } from '../entities/alert.entity';
import { AnalystKPI, DataInsight, ChartData } from '../entities/data-analyst.entity';

export abstract class IAIAnalyticsRepository {
  // Command Center
  abstract getCommandCenterState(): Observable<CommandCenterState>;
  abstract runTask(taskId: string): Observable<void>;
  abstract pauseTask(taskId: string): Observable<void>;
  abstract stopTask(taskId: string): Observable<void>;

  // Dashboard
  abstract getDashboardState(): Observable<DashboardState>;

  // Reports
  abstract getReports(folder?: string): Observable<Report[]>;
  abstract getReportFolders(): Observable<ReportFolder[]>;

  // Logs
  abstract getLogs(filter?: LogFilter): Observable<LogEntry[]>;

  // Workflow
  abstract getWorkflows(): Observable<Workflow[]>;
  abstract getWorkflow(id: string): Observable<Workflow>;
  abstract saveWorkflow(workflow: Workflow): Observable<Workflow>;

  // Schedule
  abstract getSchedules(): Observable<ScheduledJob[]>;
  abstract getUpcomingRuns(): Observable<UpcomingRun[]>;

  // Alerts
  abstract getAlerts(): Observable<Alert[]>;
  abstract getAlertRules(): Observable<AlertRule[]>;
  abstract acknowledgeAlert(alertId: string): Observable<void>;

  // Data Analyst
  abstract getAnalystKPI(): Observable<AnalystKPI>;
  abstract getInsights(): Observable<DataInsight[]>;
  abstract getChartData(period: string): Observable<ChartData>;
}
```

---

## 3. Use Cases

สร้าง use case 8 ตัว แต่ละตัว implement `Usecase<T, R>` interface จาก `core/contracts/usecase.contract.ts`:

### 3.1 `get-tasks.usecase.ts`
- Input: `void`
- Output: `Observable<CommandCenterState>`
- เรียก `repository.getCommandCenterState()`

### 3.2 `get-dashboard-stats.usecase.ts`
- Input: `void`
- Output: `Observable<DashboardState>`
- เรียก `repository.getDashboardState()`

### 3.3 `get-reports.usecase.ts`
- Input: `{ folder?: string }`
- Output: `Observable<Report[]>`
- เรียก `repository.getReports(folder)`

### 3.4 `get-logs.usecase.ts`
- Input: `LogFilter`
- Output: `Observable<LogEntry[]>`
- เรียก `repository.getLogs(filter)`

### 3.5 `get-workflows.usecase.ts`
- Input: `void`
- Output: `Observable<Workflow[]>`
- เรียก `repository.getWorkflows()`

### 3.6 `get-schedules.usecase.ts`
- Input: `void`
- Output: `Observable<ScheduledJob[]>`
- เรียก `repository.getSchedules()`

### 3.7 `get-alerts.usecase.ts`
- Input: `void`
- Output: `Observable<Alert[]>`
- เรียก `repository.getAlerts()`

### 3.8 `get-insights.usecase.ts`
- Input: `{ period: string }`
- Output: `Observable<{ kpi: AnalystKPI; insights: DataInsight[]; chart: ChartData }>`
- เรียก repository 3 methods แล้ว combine

---

## 4. Mock Data + DataSource

### `features/ai-analytics/data/datasources/ai-analytics-mock.datasource.ts`

สร้าง class `AIAnalyticsMockDataSource` ที่ return Observable จาก mock data arrays:

- **Command Center**: 5 tasks (3 running, 1 completed, 1 queued) + 4 quick actions + summary
- **Dashboard**: 4 KPI cards + 4 system health items + 3 alerts
- **Reports**: 3 reports + 5 folders
- **Logs**: 5 log entries หลาย type
- **Workflow**: 1 workflow พร้อม 5 nodes + 4 edges
- **Schedule**: 3 scheduled jobs + 3 upcoming runs
- **Alerts**: 3 active alerts + 3 alert rules
- **Data Analyst**: 4 KPI + 2 insights + chart data (7 days)

Simulated real-time updates:
- Task progress update ทุก 3 วินาที ( setInterval + BehaviorSubject )
- Alert สุ่ม every 30 วินาที

---

## 5. DTO + Repository Implementation

### 5.1 `features/ai-analytics/data/dtos/ai-analytics.dto.ts`

映射 interfaces สำหรับ API response shapes (ตอนนี้ map จาก mock data)

### 5.2 `features/ai-analytics/data/repositories/ai-analytics.repository.impl.ts`

`@Injectable()` class implements `IAIAnalyticsRepository`:
- Constructor inject `AIAnalyticsMockDataSource`
- ทุก method เรียก mock datasource แล้ว return Observable

---

## 6. DI Registration

### 6.1 `core/di/tokens.ts` — เพิ่ม:
```typescript
export const AI_ANALYTICS_REPOSITORY = new InjectionToken<IAIAnalyticsRepository>('AIAnalyticsRepository');
```

### 6.2 `core/di/providers.ts` — เพิ่ม:
```typescript
{ provide: AI_ANALYTICS_REPOSITORY, useClass: AIAnalyticsRepositoryImpl }
```

---

## 7. Shared UI Components (9 components)

### 7.1 `kpi-card/`
- Input: `label`, `value`, `delta`, `deltaDirection`
- Template: card พร้อม icon, value, delta badge (↑ green / ↓ red)

### 7.2 `progress-bar/`
- Input: `progress` (0-100), `status`
- Template: progress bar พร้อม percentage text

### 7.3 `alert-badge/`
- Input: `severity` ('critical' | 'warning' | 'info')
- Template: colored badge

### 7.4 `data-table/`
- Input: `columns[]`, `data[]`, `sortable`, `filterable`
- Template: HTML table พร้อม sort headers + search input

### 7.5 `chart-widget/`
- Input: `type` ('line' | 'bar' | 'pie'), `data`, `options`
- Template: wrap ng2-charts BaseChartDirective

### 7.6 `node-canvas/`
- Input: `nodes[]`, `edges[]`
- Output: `nodeSelect`, `nodeMove`
- Template: SVG canvas พร้อม drag-and-drop nodes + connection lines

### 7.7 `log-timeline/`
- Input: `logs[]`
- Template: timeline พร้อม icons ตาม log type

### 7.8 `schedule-card/`
- Input: `job: ScheduledJob`
- Output: `edit`, `togglePause`, `delete`
- Template: card พร้อม status + controls

### 7.9 `ai-insight-panel/`
- Input: `insights[]`
- Template: card พร้อม insight text + action buttons

---

## 8. Page Components (8 pages)

### 8.1 Command Center (`command-center/`)

**Component**: `CommandCenterComponent`
**Template layout**:
- Quick Actions row (4 buttons)
- System Status card + Active Tasks card (side by side)
- Summary cards row (Completed, Pending, Failed, Success Rate)

** inject**: `AI_ANALYTICS_REPOSITORY` → use case → `commandCenterState$`

### 8.2 Dashboard (`dashboard/`)

**Component**: `DashboardComponent`
**Template layout**:
- Filter bar (Date range, Source filter, Auto-refresh toggle)
- KPI Cards row (4 cards)
- Charts row (AI Usage Trends line chart + Top Active Agents list)
- System Health Alerts section

** inject**: repository → `dashboardState$`

### 8.3 Reports (`reports/`)

**Component**: `ReportsComponent`
**Template layout**:
- Toolbar (New Report button, Folder tabs, Search)
- Report list (cards with title, type badge, date, action buttons)
- Folder categories bar

** inject**: repository → `reports$` + `folders$`

### 8.4 Activity Log (`activity-log/`)

**Component**: `ActivityLogComponent`
**Template layout**:
- Filter bar (Search, Date picker, Type filter dropdown)
- Log timeline (using `log-timeline` component)
- Pagination + Export button

** inject**: repository → `logs$`

### 8.5 Workflow AI (`workflow-ai/`)

**Component**: `WorkflowAIComponent`
**Template layout**:
- Toolbar (Save, Run, Stop, Export, Share)
- Sidebar toolbox (node templates)
- Canvas area (using `node-canvas` component)
- Node config panel (bottom)

** inject**: repository → `workflows$`

### 8.6 Scheduler (`scheduler/`)

**Component**: `SchedulerComponent`
**Template layout**:
- Toolbar (New Schedule, Calendar View toggle, Search)
- Schedule list (using `schedule-card` component)
- Upcoming Runs section

** inject**: repository → `schedules$` + `upcomingRuns$`

### 8.7 Alert Management (`alert-management/`)

**Component**: `AlertManagementComponent`
**Template layout**:
- Toolbar (New Alert, Search, Status filter)
- Active Alerts section (severity-colored cards with Acknowledge/Mute buttons)
- Alert Rules section (table with toggle switches)
- Alert History link

** inject**: repository → `alerts$` + `alertRules$`

### 8.8 Data Analyst Dashboard (`data-analyst/`)

**Component**: `DataAnalystComponent`
**Template layout**:
- Filter bar (Date, Segment)
- KPI Cards row (4 cards: Revenue, Users, Orders, Rating)
- Charts row (Revenue by Region bar + Sales by Channel pie)
- Top Products table
- AI Insight Panel

** inject**: repository → `analystKPI$` + `insights$` + `chartData$`

---

## 9. Routing

### `features/ai-analytics/ai-analytics.routes.ts`

```typescript
export const AI_ANALYTICS_ROUTES: Routes = [
  { path: 'command-center', component: CommandCenterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'logs', component: ActivityLogComponent },
  { path: 'workflow', component: WorkflowAIComponent },
  { path: 'schedule', component: SchedulerComponent },
  { path: 'alerts', component: AlertManagementComponent },
  { path: 'analyst', component: DataAnalystComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
```

### `app/app-routing.module.ts` — เพิ่ม children:

```typescript
{
  path: 'ai-analytics',
  loadChildren: () => import('./features/ai-analytics/ai-analytics.routes')
    .then(m => m.AI_ANALYTICS_ROUTES),
  canActivate: [AuthGuard],
}
```

---

## 10. Sidebar Menu

### `core/config/menu.config.ts` — เพิ่ม menu group:

```typescript
{
  label: 'AI Analytics',
  icon: 'robot',
  permission: 'ai_analytics.view',
  children: [
    { label: 'Command Center', route: '/ai-analytics/command-center', icon: 'terminal' },
    { label: 'Dashboard', route: '/ai-analytics/dashboard', icon: 'chart-bar' },
    { label: 'Reports', route: '/ai-analytics/reports', icon: 'file-text' },
    { label: 'Activity Log', route: '/ai-analytics/logs', icon: 'list' },
    { label: 'Workflow AI', route: '/ai-analytics/workflow', icon: 'arrows-join' },
    { label: 'Scheduler', route: '/ai-analytics/schedule', icon: 'calendar' },
    { label: 'Alert Management', route: '/ai-analytics/alerts', icon: 'bell' },
    { label: 'Data Analyst', route: '/ai-analytics/analyst', icon: 'chart-dots' },
  ]
}
```

---

## 11. i18n

เพิ่ม translations ใน `src/assets/i18n/en.json` และ `src/assets/i18n/th.json`:

```json
// en.json
"ai_analytics": {
  "command_center": "Command Center",
  "dashboard": "Dashboard",
  "reports": "Reports",
  "activity_log": "Activity Log",
  "workflow_ai": "Workflow AI",
  "scheduler": "Scheduler",
  "alert_management": "Alert Management",
  "data_analyst": "Data Analyst Dashboard",
  "quick_actions": "Quick Actions",
  "active_tasks": "Active Tasks",
  "completed": "Completed",
  "pending": "Pending",
  "failed": "Failed",
  "success_rate": "Success Rate",
  // ... เพิ่มตาม UI spec
}

// th.json
"ai_analytics": {
  "command_center": "ศูนย์สั่งงาน",
  "dashboard": "แดชบอร์ด",
  "reports": "รายงาน",
  "activity_log": "บันทึกกิจกรรม",
  "workflow_ai": "เวิร์กโฟลว์ AI",
  "scheduler": "ตั้งเวลา",
  "alert_management": "จัดการการแจ้งเตือน",
  "data_analyst": "แดชบอร์ดวิเคราะห์ข้อมูล",
  // ...
}
```

---

## Unit Tests

**เขียน** — ครอบคลุม:

### Use Cases (8 ไฟล์)
- `get-tasks.usecase.spec.ts` — ทดสอบ return Observable ของ CommandCenterState
- `get-dashboard-stats.usecase.spec.ts` — ทดสอบ return DashboardState
- `get-reports.usecase.spec.ts` — ทดสอบ filter by folder
- `get-logs.usecase.spec.ts` — ทดสอบ filter by type, search
- `get-workflows.usecase.spec.ts` — ทดสอบ return workflows list
- `get-schedules.usecase.spec.ts` — ทดสอบ return schedules
- `get-alerts.usecase.spec.ts` — ทดสอบ return alerts
- `get-insights.usecase.spec.ts` — ทดสอบ combine 3 observables

### Mock DataSource (1 ไฟล์)
- `ai-analytics-mock.datasource.spec.ts` — ทดสอบ Observable return ข้อมูลถูกต้อง

### Components (3 ไฟล์ key components)
- `kpi-card.component.spec.ts` — ทดสอบ render value + delta
- `command-center.component.spec.ts` — ทดสอบ render tasks
- `dashboard.component.spec.ts` — ทดสอบ render KPIs

---

## Execution Order

ทำตามลำดับ workflow:

1. **Entities** (8 files) — สร้าง interfaces ทั้งหมด
2. **Repository Interface** (1 file) — กำหนด abstract class
3. **Mock DataSource** (1 file) — สร้าง mock data + BehaviorSubject
4. **DTO** (1 file) — mapping interfaces
5. **Repository Implementation** (1 file) — wire mock datasource
6. **Use Cases** (8 files) — แต่ละ use case inject repository
7. **DI Tokens + Providers** (2 files edit) — register repository
8. **Shared Components** (9 components) — UI building blocks
9. **Page Components** (8 pages) — แต่ละหน้า wire use case + template
10. **Routing** (2 files) — lazy-loaded routes
11. **Module** (1 file) — NgModule declaration
12. **Menu Config** (1 file edit) — sidebar menu
13. **i18n** (2 files edit) — translations
14. **App Routing** (1 file edit) — add lazy route
15. **Unit Tests** (12+ files) — test coverage
16. **Verify** — รัน `ng build` + `ng test`
