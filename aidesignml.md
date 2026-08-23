# AI-Assisted Data Analytics Platform — Design Document

**วันที่:** 2026-08-18
**Framework:** Angular 21 + Clean Architecture
**Module:** `ai-analytics` (feature module ภายใต้ `src/app/features/ai-analytics/`)

---

## 1. หน้าสั่งงาน (Command Center)

วัตถุประสงค์: ศูนย์กลางควบคุมการทำงานของ AI และระบบอัตโนมัติทั้งหมด

### องค์ประกอบ

```
┌─────────────────────────────────────────────────────────────────┐
│  AI Data Platform                          [User: Admin ▼]    │
├─────────────────────────────────────────────────────────────────┤
│  Command Center                              [🔔] [⚙️] [👤]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐             │
│  │ Run All  │ │ Pause   │ │ Stop    │ │ Refresh │             │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘             │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Quick Actions                                          │   │
│  │  [🔍 Analyze Sales]  [📈 Generate Report]              │   │
│  │  [🤖 Run AI Agent]   [📊 Refresh Dashboard]            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Active Tasks (5 running)                               │   │
│  │  ├─ ETL Pipeline - Sales Data     ████████░░ 80%       │   │
│  │  ├─ AI Analysis - Customer Churn  ██████░░░░ 60%       │   │
│  │  ├─ Report Gen - Q3 Performance   ████░░░░░░ 40%       │   │
│  │  ├─ Auto Email - Weekly Summary   ✅ Complete           │   │
│  │  └─ Sync - Data Warehouse         ⏳ Queued             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐          │
│  │ ✅ Completed │ │ ⏳ Pending   │ │ ❌ Failed    │          │
│  │   128 tasks  │ │   23 tasks   │ │   5 tasks    │          │
│  └──────────────┘ └──────────────┘ └──────────────┘          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Entities

```typescript
export type TaskStatus = 'running' | 'completed' | 'failed' | 'queued' | 'paused';
export type TaskType = 'etl' | 'ai_analysis' | 'report' | 'email' | 'sync' | 'workflow';

export interface Task {
  id: string;
  name: string;
  type: TaskType;
  status: TaskStatus;
  progress: number;
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

### Mock Data

```typescript
MOCK_TASKS: Task[] = [
  { id: 't1', name: 'ETL Pipeline - Sales Data', type: 'etl', status: 'running', progress: 80, startedAt: '2026-08-18T08:00:00' },
  { id: 't2', name: 'AI Analysis - Customer Churn', type: 'ai_analysis', status: 'running', progress: 60 },
  { id: 't3', name: 'Report Gen - Q3 Performance', type: 'report', status: 'running', progress: 40 },
  { id: 't4', name: 'Auto Email - Weekly Summary', type: 'email', status: 'completed', progress: 100 },
  { id: 't5', name: 'Sync - Data Warehouse', type: 'sync', status: 'queued', progress: 0 },
]

MOCK_QUICK_ACTIONS: QuickAction[] = [
  { id: 'qa1', label: 'Analyze Sales Data', icon: 'search', action: 'analyze_sales' },
  { id: 'qa2', label: 'Generate Report', icon: 'chart-bar', action: 'generate_report' },
  { id: 'qa3', label: 'Run AI Agent', icon: 'robot', action: 'run_ai' },
  { id: 'qa4', label: 'Refresh Dashboard', icon: 'refresh', action: 'refresh_dashboard' },
]

MOCK_SUMMARY = { completed: 128, pending: 23, failed: 5, successRate: 96.2 }
```

---

## 2. Dashboard (ภาพรวมระบบ)

วัตถุประสงค์: แสดงภาพรวม Performance, Health, และ Key Metrics ของระบบ

### องค์ประกอบ

```
┌─────────────────────────────────────────────────────────────────┐
│  AI Data Platform                          [User: Admin ▼]    │
├─────────────────────────────────────────────────────────────────┤
│  Overview Dashboard                         [🔔] [⚙️] [👤]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │ Total    │ │ AI       │ │ Avg      │ │ Data     │        │
│  │ Queries  │ │ Accuracy │ │ Response │ │ Volume   │        │
│  │ 12,847   │ │ 94.3%   │ │ 2.4s    │ │ 4.2 TB  │        │
│  │ ↑ 12%    │ │ ↑ 2.1%  │ │ ↓ 0.3s  │ │ ↑ 8%    │        │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
│                                                                 │
│  ┌─────────────────────────┐ ┌─────────────────────────┐      │
│  │ AI Usage Trends          │ │ Top 5 Active Agents     │      │
│  │                          │ │ 1. Sales Analyzer       │      │
│  │    ╭╮   ╭╮              │ │ 2. Churn Predictor     │      │
│  │   ╭╯╰╮ ╭╯╰╮             │ │ 3. Report Generator    │      │
│  │  ╭╯  ╰╮╭╯  ╰╮           │ │ 4. Data Validator      │      │
│  │  │  M  ││  T  │  W  T  F│ │ 5. Anomaly Detector    │      │
│  └─────────────────────────┘ └─────────────────────────┘      │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  System Health Alerts (3 active)                        │   │
│  │  ⚠️ Data Source - Salesforce disconnected               │   │
│  │  ⚠️ AI Model - Churn v3 needs retraining               │   │
│  │  ℹ️ Storage usage at 78%                               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Entities

```typescript
export interface KPI {
  label: string;
  value: string | number;
  delta: number;
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

### Mock Data

```typescript
MOCK_SYSTEM_STATS: DashboardState = {
  kpis: [
    { label: 'Total Queries', value: 12847, delta: 12, deltaDirection: 'up' },
    { label: 'AI Accuracy', value: '94.3%', delta: 2.1, deltaDirection: 'up' },
    { label: 'Avg Response', value: '2.4s', delta: -0.3, deltaDirection: 'down' },
    { label: 'Data Volume', value: '4.2 TB', delta: 8, deltaDirection: 'up' },
  ],
  systemHealth: [
    { name: 'AI Models', online: 4, total: 4 },
    { name: 'Data Sources', online: 6, total: 7 },
    { name: 'Storage', used: 78, unit: '%' },
    { name: 'API Calls', value: 12400 },
  ],
  alerts: [
    { severity: 'warning', message: 'Data Source - Salesforce disconnected', timestamp: '10:32' },
    { severity: 'warning', message: 'AI Model - Churn v3 needs retraining', timestamp: '10:15' },
    { severity: 'info', message: 'Storage usage at 78%', timestamp: '09:50' },
  ],
}
```

---

## 3. Report (รายงาน)

วัตถุประสงค์: ดู, สร้าง, แก้ไข, และดาวน์โหลดรายงานที่ AI สร้างขึ้น

### องค์ประกอบ

```
┌─────────────────────────────────────────────────────────────────┐
│  AI Data Platform                          [User: Admin ▼]    │
├─────────────────────────────────────────────────────────────────┤
│  Reports                                       [🔔] [⚙️] [👤]│
├─────────────────────────────────────────────────────────────────┤
│  [+ New Report]  [📂 Folder]  [🔍 Search reports...]         │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Recent Reports                                         │   │
│  │  ┌───────────────────────────────────────────────────┐   │   │
│  │  │ 📊 Q3 Sales Performance Report                    │   │   │
│  │  │    Created: 2 hrs ago  |  AI-Generated            │   │   │
│  │  │    [👁 View]  [📥 Download]  [✏️ Edit]  [🗑 Delete]│   │   │
│  │  ├───────────────────────────────────────────────────┤   │   │
│  │  │ 📈 Customer Churn Analysis - Sep 2026            │   │   │
│  │  │    Created: Yesterday  |  AI + Human Review      │   │   │
│  │  │    [👁 View]  [📥 Download]  [✏️ Edit]  [🗑 Delete]│   │   │
│  │  ├───────────────────────────────────────────────────┤   │   │
│  │  │ 📉 Anomaly Detection - Inventory                 │   │   │
│  │  │    Created: 3 days ago  |  Auto-Generated        │   │   │
│  │  │    [👁 View]  [📥 Download]  [✏️ Edit]  [🗑 Delete]│   │   │
│  │  └───────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Folders / Categories                                   │   │
│  │  [Sales] [Finance] [Marketing] [Operations] [Custom]   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Entities

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

### Mock Data

```typescript
MOCK_REPORTS: Report[] = [
  { id: 'r1', title: 'Q3 Sales Performance Report', type: 'ai_generated', createdAt: '2h ago', format: ['pdf', 'xlsx'] },
  { id: 'r2', title: 'Customer Churn Analysis - Sep 2026', type: 'human_review', createdAt: 'Yesterday', format: ['pdf'] },
  { id: 'r3', title: 'Anomaly Detection - Inventory', type: 'auto_generated', createdAt: '3 days ago', format: ['pdf', 'pptx'] },
]

MOCK_FOLDERS: ReportFolder[] = [
  { name: 'Sales', count: 12 },
  { name: 'Finance', count: 8 },
  { name: 'Marketing', count: 15 },
  { name: 'Operations', count: 6 },
  { name: 'Custom', count: 3 },
]
```

---

## 4. Log (ระบบบันทึกประวัติ)

วัตถุประสงค์: ดูประวัติการทำงาน, การเรียกใช้ AI, และการเปลี่ยนแปลงระบบทั้งหมด

### องค์ประกอบ

```
┌─────────────────────────────────────────────────────────────────┐
│  AI Data Platform                          [User: Admin ▼]    │
├─────────────────────────────────────────────────────────────────┤
│  Activity Log                                [🔔] [⚙️] [👤]  │
├─────────────────────────────────────────────────────────────────┤
│  [🔍 Search logs...]  [📅 Date: 18/08/26]  [Filter ▼]       │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  10:32  ✅ Task Completed    │ ETL-Sales Data          │   │
│  │         User: Admin          │ Duration: 4m 23s        │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │  10:28  🤖 AI Query Executed │ "Sales Q3 by region"   │   │
│  │         User: Marketing_Team │ Tokens: 1,245           │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │  10:15  ⚠️ Warning           │ Data source timeout     │   │
│  │         System: Salesforce   │ Retry: 2/5              │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │  09:45  📄 Report Generated  │ Churn Analysis          │   │
│  │         User: Analytics_Bot  │ Format: PDF             │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │  09:20  🔄 Workflow Triggered│ Weekly_Report_v2        │   │
│  │         Schedule: Every Mon  │ Status: Running         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  [< Prev]  [1] [2] [3] ... [10]  [Next >]  [Export Log]      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Entities

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

### Mock Data

```typescript
MOCK_LOGS: LogEntry[] = [
  { time: '10:32', type: 'success', action: 'Task Completed', detail: 'ETL-Sales Data', user: 'Admin', duration: '4m 23s' },
  { time: '10:28', type: 'ai_query', action: 'AI Query Executed', detail: 'Sales Q3 by region', user: 'Marketing_Team', tokens: 1245 },
  { time: '10:15', type: 'warning', action: 'Warning', detail: 'Data source timeout', user: 'System', retry: '2/5' },
  { time: '09:45', type: 'report', action: 'Report Generated', detail: 'Churn Analysis', user: 'Analytics_Bot', format: 'PDF' },
  { time: '09:20', type: 'workflow', action: 'Workflow Triggered', detail: 'Weekly_Report_v2', user: 'Scheduler' },
]
```

---

## 5. Workflow AI (ออกแบบและจัดการ Workflow อัตโนมัติ)

วัตถุประสงค์: สร้าง, แก้ไข, และจัดการ AI Workflow แบบ Drag-and-Drop

### องค์ประกอบ

```
┌─────────────────────────────────────────────────────────────────┐
│  AI Data Platform                          [User: Admin ▼]    │
├─────────────────────────────────────────────────────────────────┤
│  AI Workflow Studio                           [🔔] [⚙️] [👤] │
├─────────────────────────────────────────────────────────────────┤
│  [💾 Save]  [▶️ Run]  [⏹ Stop]  [📋 Export]  [🔗 Share]     │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Toolbox          │   Workflow Canvas                   │   │
│  │  ─────────────    │                                     │   │
│  │  📥 Data Source   │   ┌──────┐  ┌──────┐              │   │
│  │  🔄 Transform     │   │📥 Data│→│🔄 Clean│              │   │
│  │  🤖 AI Analyze    │   │Source │  │ Data  │              │   │
│  │  📊 Visualize     │   └──────┘  └──┬───┘              │   │
│  │  📧 Send Email    │                ↓                   │   │
│  │  📄 Generate Rpt  │          ┌──────────┐             │   │
│  │  ⏰ Schedule      │          │🤖 AI     │             │   │
│  │  🔔 Alert         │          │Analyze   │             │   │
│  │                   │          └────┬─────┘             │   │
│  │  [➕ Add Node]   │                ↓                   │   │
│  │                   │          ┌──────────┐             │   │
│  │                   │          │📊 Viz    │             │   │
│  │                   │          └────┬─────┘             │   │
│  │                   │                ↓                   │   │
│  │                   │          ┌──────────┐             │   │
│  │                   │          │📧 Send   │             │   │
│  │                   │          └──────────┘             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ⚙️ Node Config: [AI Analyze]  Model: GPT-4  Prompt: ...     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Entities

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

### Mock Data

```typescript
MOCK_WORKFLOWS: Workflow[] = [
  {
    id: 'wf1',
    name: 'Sales Analysis Pipeline',
    status: 'draft',
    createdAt: '2026-08-15',
    updatedAt: '2026-08-18',
    nodes: [
      { id: 'n1', type: 'data_source', label: 'Data Source', position: { x: 100, y: 200 } },
      { id: 'n2', type: 'transform', label: 'Clean Data', position: { x: 300, y: 200 } },
      { id: 'n3', type: 'ai_analyze', label: 'AI Analyze', position: { x: 500, y: 200 } },
      { id: 'n4', type: 'visualize', label: 'Visualize', position: { x: 700, y: 200 } },
      { id: 'n5', type: 'send_email', label: 'Send Report', position: { x: 900, y: 200 } },
    ],
    edges: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n4', to: 'n5' },
    ],
  },
]
```

---

## 6. Schedule (ตารางการทำงานอัตโนมัติ)

วัตถุประสงค์: กำหนดเวลาและจัดการงานที่ต้องทำงานอัตโนมัติ

### องค์ประกอบ

```
┌─────────────────────────────────────────────────────────────────┐
│  AI Data Platform                          [User: Admin ▼]    │
├─────────────────────────────────────────────────────────────────┤
│  Scheduler                                    [🔔] [⚙️] [👤]  │
├─────────────────────────────────────────────────────────────────┤
│  [+ New Schedule]  [📅 Calendar View]  [🔍 Search...]        │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Scheduled Jobs (12 active)                             │   │
│  │  ┌───────────────────────────────────────────────────┐   │   │
│  │  │ 🔄 Weekly Sales Report    │ Every Mon 08:00      │   │   │
│  │  │    Workflow: Sales_Analysis │ Next Run: 23 Aug   │   │   │
│  │  │    Status: ✅ Active       │ [✏️] [⏸] [🗑]      │   │   │
│  │  ├───────────────────────────────────────────────────┤   │   │
│  │  │ 🔄 Data Sync - CRM        │ Every Day 02:00     │   │   │
│  │  │    Workflow: ETL_CRM       │ Next Run: Tomorrow │   │   │
│  │  │    Status: ✅ Active       │ [✏️] [⏸] [🗑]      │   │   │
│  │  ├───────────────────────────────────────────────────┤   │   │
│  │  │ 🔄 Churn Prediction       │ Every Fri 18:00     │   │   │
│  │  │    Workflow: Churn_Model   │ Next Run: 20 Aug   │   │   │
│  │  │    Status: ⏸ Paused       │ [✏️] [▶️] [🗑]      │   │   │
│  │  └───────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Upcoming Runs                                          │   │
│  │  - 12:30  ⏳ Inventory Report                          │   │
│  │  - 14:00  ⏳ Data Sync - Google Ads                    │   │
│  │  - 18:00  ⏳ Daily Summary Email                       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Entities

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

### Mock Data

```typescript
MOCK_SCHEDULES: ScheduledJob[] = [
  { id: 's1', name: 'Weekly Sales Report', cron: '0 8 * * 1', workflow: 'Sales_Analysis', status: 'active', nextRun: '2026-08-23' },
  { id: 's2', name: 'Data Sync - CRM', cron: '0 2 * * *', workflow: 'ETL_CRM', status: 'active', nextRun: '2026-08-19' },
  { id: 's3', name: 'Churn Prediction', cron: '0 18 * * 5', workflow: 'Churn_Model', status: 'paused', nextRun: '2026-08-20' },
]

MOCK_UPCOMING_RUNS: UpcomingRun[] = [
  { time: '12:30', jobName: 'Inventory Report', status: 'pending' },
  { time: '14:00', jobName: 'Data Sync - Google Ads', status: 'pending' },
  { time: '18:00', jobName: 'Daily Summary Email', status: 'pending' },
]
```

---

## 7. Alert Management System (ระบบจัดการการแจ้งเตือน)

วัตถุประสงค์: ตั้งค่า, ดู, และจัดการ Alert ที่เกิดจาก AI และระบบ

### องค์ประกอบ

```
┌─────────────────────────────────────────────────────────────────┐
│  AI Data Platform                          [User: Admin ▼]    │
├─────────────────────────────────────────────────────────────────┤
│  Alert Management                             [🔔] [⚙️] [👤]  │
├─────────────────────────────────────────────────────────────────┤
│  [+ New Alert]  [🔍 Search...]  [Status ▼]  [📅 Filter]     │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Active Alerts (3)                                      │   │
│  │  ┌───────────────────────────────────────────────────┐   │   │
│  │  │ 🔴 Critical │ Sales dropped >10% in SEA region  │   │   │
│  │  │            │ Triggered: 10:32  |  AI Detected   │   │   │
│  │  │            │ [👁 View] [✅ Acknowledge] [🔇 Mute]│   │   │
│  │  ├───────────────────────────────────────────────────┤   │   │
│  │  │ 🟡 Warning  │ Data source latency >5s            │   │   │
│  │  │            │ Triggered: 10:15  |  System        │   │   │
│  │  │            │ [👁 View] [✅ Acknowledge] [🔇 Mute]│   │   │
│  │  ├───────────────────────────────────────────────────┤   │   │
│  │  │ 🔵 Info     │ New anomaly detected in Inventory │   │   │
│  │  │            │ Triggered: 09:50  |  AI Model      │   │   │
│  │  │            │ [👁 View] [✅ Acknowledge] [🔇 Mute]│   │   │
│  │  └───────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Alert Rules (8 configured)                             │   │
│  │  ├─ Sales drop > 5%        → Email + Slack            │   │
│  │  ├─ Churn rate > 10%       → Email + SMS              │   │
│  │  ├─ Data quality issue     → Slack + Dashboard        │   │
│  │  ├─ Performance threshold  → Email + Ticket           │   │
│  │  └─ [+ Add Rule]                                       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  [📊 Alert History]  [📈 Alert Analytics]                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Entities

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

### Mock Data

```typescript
MOCK_ALERTS: Alert[] = [
  { id: 'a1', severity: 'critical', message: 'Sales dropped >10% in SEA region', triggeredAt: '10:32', source: 'AI Detected', status: 'active' },
  { id: 'a2', severity: 'warning', message: 'Data source latency >5s', triggeredAt: '10:15', source: 'System', status: 'active' },
  { id: 'a3', severity: 'info', message: 'New anomaly detected in Inventory', triggeredAt: '09:50', source: 'AI Model', status: 'active' },
]

MOCK_ALERT_RULES: AlertRule[] = [
  { id: 'ar1', condition: 'Sales drop > 5%', actions: ['Email', 'Slack'], enabled: true },
  { id: 'ar2', condition: 'Churn rate > 10%', actions: ['Email', 'SMS'], enabled: true },
  { id: 'ar3', condition: 'Data quality issue', actions: ['Slack', 'Dashboard'], enabled: true },
  { id: 'ar4', condition: 'Performance threshold', actions: ['Email', 'Ticket'], enabled: false },
]
```

---

## 8. Data Analyst Dashboard (Dashboard สำหรับนักวิเคราะห์ข้อมูล)

วัตถุประสงค์: Dashboard ที่ออกแบบมาเฉพาะสำหรับ Data Analyst ใช้วิเคราะห์เชิงลึก

### องค์ประกอบ

```
┌─────────────────────────────────────────────────────────────────┐
│  AI Data Platform                          [User: Analyst]    │
├─────────────────────────────────────────────────────────────────┤
│  Data Analyst Dashboard                      [🔔] [⚙️] [👤]  │
├─────────────────────────────────────────────────────────────────┤
│  [📅 Date: Aug 2026]  [🏷️ Segment: All]  [🔍 Filter...]    │
│                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │ Revenue  │ │ Users    │ │ Orders   │ │ Avg      │        │
│  │ $2.4M   │ │ 18.2K   │ │ 4,521   │ │ Rating   │        │
│  │ ↑ 15.3%  │ │ ↑ 8.7%  │ │ ↑ 12.1% │ │ 4.2 ↓0.1│        │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
│                                                                 │
│  ┌─────────────────────────┐ ┌─────────────────────────┐      │
│  │ Revenue by Region        │ │ Sales by Channel        │      │
│  │                          │ │    Online   48%         │      │
│  │    ╭╮    ╭╮              │ │    Retail   32%         │      │
│  │   ╭╯╰╮  ╭╯╰╮             │ │    Partner 20%         │      │
│  │  ╭╯  ╰╮╭╯  ╰╮           │ │                         │      │
│  │  │ SEA ││ EU │ US  JP   │ │                         │      │
│  └─────────────────────────┘ └─────────────────────────┘      │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Top 10 Products by Revenue                             │   │
│  │  1. Pro Plan           $420K  ↑ 5.2%                  │   │
│  │  2. Enterprise Suite    $380K  ↑ 8.1%                 │   │
│  │  3. Mobile App          $210K  ↓ 1.3%                 │   │
│  │  4. Analytics Add-on    $180K  ↑ 12%                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  AI Insight                                             │   │
│  │  💡 "Revenue in SEA region grew 22% this month,        │   │
│  │     driven by new Partner channel.                      │   │
│  │     Consider increasing marketing budget there."        │   │
│  │     [🔍 Explore]  [📄 Generate Report]  [📌 Pin]      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  [📥 Export]  [🔄 Refresh]  [📊 Full Screen]                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Entities

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

### Mock Data

```typescript
MOCK_ANALYST_KPI: AnalystKPI = {
  revenue: '$2.4M', revenueDelta: 15.3,
  users: '18.2K', usersDelta: 8.7,
  orders: 4521, ordersDelta: 12.1,
  avgRating: 4.2, ratingDelta: -0.1,
}

MOCK_INSIGHTS: DataInsight[] = [
  { id: 'i1', text: 'Revenue in SEA region grew 22% this month, driven by new Partner channel. Consider increasing marketing budget there.', type: 'positive', source: 'AI Analysis', createdAt: '2026-08-18' },
  { id: 'i2', text: 'Customer churn rate increased 3% — investigate onboarding flow.', type: 'negative', source: 'AI Analysis', createdAt: '2026-08-18' },
]

MOCK_CHART_DATA: ChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    { label: 'Revenue', data: [12000, 19000, 15000, 22000, 18000, 24000, 21000] },
    { label: 'Orders', data: [320, 480, 390, 560, 450, 620, 530] },
  ],
}
```

---

## ความเชื่อมโยงของทั้ง 8 หน้าจอ

| หน้าจอ | บทบาทหลัก | เชื่อมโยงกับ AI |
|--------|----------|-----------------|
| 1. Command Center | สั่งงานและควบคุมระบบ | ทุกแนวทาง (ศูนย์กลาง) |
| 2. Dashboard | ดูภาพรวมระบบ | แนวทาง 5 (Enterprise) |
| 3. Report | จัดการรายงาน | แนวทาง 1, 2, 4, 5 |
| 4. Log | ตรวจสอบประวัติ | ทุกแนวทาง (Governance) |
| 5. Workflow AI | ออกแบบ Workflow | แนวทาง 3 (Automation) |
| 6. Schedule | ตั้งเวลาทำงาน | แนวทาง 3, 5 |
| 7. Alert Management | แจ้งเตือนเหตุการณ์ | แนวทาง 3, 5 |
| 8. Data Analyst Dashboard | วิเคราะห์ข้อมูลเชิงลึก | แนวทาง 2, 4, 5 |

---

## AI Integration Approaches

1. **Direct (Upload) to AI** — ส่งข้อมูลให้ AI วิเคราะห์โดยตรง
2. **AI Coding Assistant** — ให้ AI ช่วยเขียนโค้ด แต่คนยังควบคุม
3. **AI Automation Agent** — ให้ AI ทำงานอัตโนมัติแทนบางส่วน
4. **Tool-Level AI Copilot** — AI อยู่ในเครื่องมือที่ใช้อยู่แล้ว
5. **Enterprise Data Copilot** — AI ที่เข้าใจข้อมูลทั้งองค์กร
