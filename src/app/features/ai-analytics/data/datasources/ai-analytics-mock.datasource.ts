import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { CommandCenterState } from '../../domain/entities/command-center.entity';
import { DashboardState } from '../../domain/entities/dashboard.entity';
import { Report, ReportFolder } from '../../domain/entities/report.entity';
import { LogEntry, LogFilter } from '../../domain/entities/log.entity';
import { Workflow } from '../../domain/entities/workflow.entity';
import { ScheduledJob, UpcomingRun } from '../../domain/entities/schedule.entity';
import { Alert, AlertRule } from '../../domain/entities/alert.entity';
import { AnalystKPI, DataInsight, ChartData } from '../../domain/entities/data-analyst.entity';

const MOCK_COMMAND_CENTER: CommandCenterState = {
  tasks: [
    { id: 't1', name: 'Daily Sales ETL', type: 'etl', status: 'running', progress: 64, startedAt: '2026-08-18T08:00:00Z', duration: '12m 30s' },
    { id: 't2', name: 'Customer Segmentation', type: 'ai_analysis', status: 'running', progress: 31, startedAt: '2026-08-18T09:15:00Z', duration: '5m 10s' },
    { id: 't3', name: 'Inventory Sync', type: 'sync', status: 'running', progress: 88, startedAt: '2026-08-18T09:45:00Z', duration: '1m 45s' },
    { id: 't4', name: 'Revenue Report', type: 'report', status: 'completed', progress: 100, startedAt: '2026-08-18T07:00:00Z', completedAt: '2026-08-18T07:12:00Z', duration: '12m 00s' },
    { id: 't5', name: 'Anomaly Detection', type: 'ai_analysis', status: 'queued', progress: 0 },
  ],
  quickActions: [
    { id: 'qa1', label: 'Run All ETL', icon: 'play', action: 'run_all_etl' },
    { id: 'qa2', label: 'Generate Report', icon: 'file-text', action: 'generate_report' },
    { id: 'qa3', label: 'Sync Data', icon: 'refresh-cw', action: 'sync_data' },
    { id: 'qa4', label: 'View Logs', icon: 'list', action: 'view_logs' },
  ],
  summary: { completed: 142, pending: 8, failed: 3, successRate: 96.6 },
};

const MOCK_DASHBOARD: DashboardState = {
  kpis: [
    { label: 'Total Revenue', value: '$1.24M', delta: 12.5, deltaDirection: 'up' },
    { label: 'Active Users', value: '8,429', delta: 3.2, deltaDirection: 'up' },
    { label: 'Conversion Rate', value: '3.6%', delta: -0.4, deltaDirection: 'down' },
    { label: 'Avg. Order Value', value: '$147', delta: 0, deltaDirection: 'neutral' },
  ],
  systemHealth: [
    { name: 'API Server', online: 4, total: 4 },
    { name: 'Database', online: 2, total: 2 },
    { name: 'Cache (Redis)', used: 2.4, unit: 'GB' },
    { name: 'CPU Usage', value: 42, unit: '%' },
  ],
  alerts: [
    { severity: 'critical', message: 'Database connection pool exhausted on replica-2', timestamp: '2026-08-18T09:58:00Z' },
    { severity: 'warning', message: 'Disk usage on worker-3 exceeds 85%', timestamp: '2026-08-18T09:30:00Z' },
    { severity: 'info', message: 'Scheduled maintenance window starts in 2 hours', timestamp: '2026-08-18T08:00:00Z' },
  ],
};

const MOCK_REPORTS: Report[] = [
  { id: 'r1', title: 'Monthly Revenue Analysis', type: 'ai_generated', createdAt: '2026-08-17T14:00:00Z', format: ['pdf', 'xlsx'], folder: 'finance' },
  { id: 'r2', title: 'Customer Retention Summary', type: 'auto_generated', createdAt: '2026-08-16T10:00:00Z', format: ['pdf'], folder: 'marketing' },
  { id: 'r3', title: 'Inventory Health Check', type: 'human_review', createdAt: '2026-08-15T16:30:00Z', format: ['pdf', 'csv'], folder: 'operations' },
];

const MOCK_REPORT_FOLDERS: ReportFolder[] = [
  { name: 'finance', count: 12 },
  { name: 'marketing', count: 8 },
  { name: 'operations', count: 15 },
  { name: 'hr', count: 5 },
  { name: 'all', count: 40 },
];

const MOCK_LOGS: LogEntry[] = [
  { time: '2026-08-18T09:58:12Z', type: 'success', action: 'ETL Completed', detail: 'Daily sales ETL finished successfully', user: 'system', duration: '12m 00s' },
  { time: '2026-08-18T09:55:00Z', type: 'ai_query', action: 'AI Analysis', detail: 'Customer segmentation analysis started', user: 'admin', tokens: 1240 },
  { time: '2026-08-18T09:42:30Z', type: 'warning', action: 'Slow Query', detail: 'Query execution exceeded 5s threshold on analytics_db', user: 'system', duration: '8.3s' },
  { time: '2026-08-18T09:30:00Z', type: 'error', action: 'Sync Failed', detail: 'ERP sync failed: timeout after 30s', user: 'system', retry: '3/3' },
  { time: '2026-08-18T09:15:00Z', type: 'report', action: 'Report Generated', detail: 'Monthly revenue analysis exported to PDF', user: 'admin', format: 'pdf' },
];

const MOCK_WORKFLOWS: Workflow[] = [
  {
    id: 'wf1',
    name: 'Sales Data Pipeline',
    status: 'running',
    createdAt: '2026-08-10T10:00:00Z',
    updatedAt: '2026-08-18T08:00:00Z',
    nodes: [
      { id: 'n1', type: 'data_source', label: 'Sales DB', position: { x: 80, y: 120 }, status: 'success' },
      { id: 'n2', type: 'transform', label: 'Clean & Normalize', position: { x: 340, y: 120 }, status: 'success' },
      { id: 'n3', type: 'ai_analyze', label: 'Trend Analysis', position: { x: 600, y: 80 }, status: 'running' },
      { id: 'n4', type: 'visualize', label: 'Dashboard Update', position: { x: 860, y: 80 }, status: 'idle' },
      { id: 'n5', type: 'send_email', label: 'Notify Stakeholders', position: { x: 860, y: 200 }, status: 'idle' },
    ],
    edges: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n3', to: 'n5' },
    ],
  },
];

const MOCK_SCHEDULES: ScheduledJob[] = [
  { id: 'sj1', name: 'Daily Sales ETL', cron: '0 6 * * *', workflow: 'Sales Data Pipeline', status: 'active', nextRun: '2026-08-19T06:00:00Z', lastRun: '2026-08-18T06:00:00Z', description: 'Extract, transform and load daily sales data' },
  { id: 'sj2', name: 'Weekly Report', cron: '0 9 * * 1', workflow: 'Report Generator', status: 'active', nextRun: '2026-08-24T09:00:00Z', lastRun: '2026-08-17T09:00:00Z', description: 'Generate and distribute weekly analytics report' },
  { id: 'sj3', name: 'Hourly Health Check', cron: '0 * * * *', workflow: 'System Monitor', status: 'paused', nextRun: '2026-08-19T00:00:00Z', description: 'Check system health and send alerts' },
];

const MOCK_UPCOMING_RUNS: UpcomingRun[] = [
  { time: '2026-08-18T10:00:00Z', jobName: 'Hourly Health Check', status: 'pending' },
  { time: '2026-08-18T12:00:00Z', jobName: 'Hourly Health Check', status: 'pending' },
  { time: '2026-08-18T14:00:00Z', jobName: 'Hourly Health Check', status: 'pending' },
];

const MOCK_ALERTS: Alert[] = [
  { id: 'a1', severity: 'critical', message: 'Database connection pool exhausted on replica-2', triggeredAt: '2026-08-18T09:58:00Z', source: 'Database Monitor', status: 'active' },
  { id: 'a2', severity: 'warning', message: 'Disk usage on worker-3 exceeds 85%', triggeredAt: '2026-08-18T09:30:00Z', source: 'Infrastructure', status: 'active' },
  { id: 'a3', severity: 'info', message: 'Scheduled maintenance window starts in 2 hours', triggeredAt: '2026-08-18T08:00:00Z', source: 'Scheduler', status: 'active' },
];

const MOCK_ALERT_RULES: AlertRule[] = [
  { id: 'ar1', condition: 'db.connection_pool > 90%', actions: ['notify_ops', 'page_oncall'], enabled: true },
  { id: 'ar2', condition: 'disk.usage > 80%', actions: ['notify_ops'], enabled: true },
  { id: 'ar3', condition: 'cpu.usage > 95% for 5m', actions: ['notify_ops', 'scale_up'], enabled: false },
];

const MOCK_ANALYST_KPI: AnalystKPI = {
  revenue: '$1.24M',
  revenueDelta: 12.5,
  users: '8,429',
  usersDelta: 3.2,
  orders: 4280,
  ordersDelta: 5.8,
  avgRating: 4.7,
  ratingDelta: 0.2,
};

const MOCK_INSIGHTS: DataInsight[] = [
  { id: 'ins1', text: 'Revenue increased 12.5% compared to last month, driven primarily by enterprise tier upgrades.', type: 'positive', source: 'Revenue Analysis', createdAt: '2026-08-18T09:00:00Z' },
  { id: 'ins2', text: 'Customer churn rate rose to 4.2% in the SMB segment, mainly from the APAC region.', type: 'negative', source: 'Retention Analysis', createdAt: '2026-08-18T09:00:00Z' },
];

const MOCK_CHART_DATA: ChartData = {
  labels: ['Aug 12', 'Aug 13', 'Aug 14', 'Aug 15', 'Aug 16', 'Aug 17', 'Aug 18'],
  datasets: [
    { label: 'Revenue', data: [142000, 158000, 147000, 161000, 153000, 170000, 182000] },
    { label: 'Orders', data: [580, 620, 590, 640, 610, 670, 710] },
  ],
};

@Injectable({ providedIn: 'root' })
export class AIAnalyticsMockDataSource {
  getCommandCenterState(): Observable<CommandCenterState> {
    return of(MOCK_COMMAND_CENTER).pipe(delay(300));
  }

  runTask(_taskId: string): Observable<void> {
    return of(undefined).pipe(delay(200));
  }

  pauseTask(_taskId: string): Observable<void> {
    return of(undefined).pipe(delay(200));
  }

  stopTask(_taskId: string): Observable<void> {
    return of(undefined).pipe(delay(200));
  }

  getDashboardState(): Observable<DashboardState> {
    return of(MOCK_DASHBOARD).pipe(delay(300));
  }

  getReports(_folder?: string): Observable<Report[]> {
    return of(MOCK_REPORTS).pipe(delay(300));
  }

  getReportFolders(): Observable<ReportFolder[]> {
    return of(MOCK_REPORT_FOLDERS).pipe(delay(200));
  }

  getLogs(_filter?: LogFilter): Observable<LogEntry[]> {
    return of(MOCK_LOGS).pipe(delay(300));
  }

  getWorkflows(): Observable<Workflow[]> {
    return of(MOCK_WORKFLOWS).pipe(delay(300));
  }

  getWorkflow(id: string): Observable<Workflow> {
    const wf = MOCK_WORKFLOWS.find(w => w.id === id) ?? MOCK_WORKFLOWS[0];
    return of(wf).pipe(delay(200));
  }

  saveWorkflow(workflow: Workflow): Observable<Workflow> {
    return of({ ...workflow, updatedAt: new Date().toISOString() }).pipe(delay(400));
  }

  getSchedules(): Observable<ScheduledJob[]> {
    return of(MOCK_SCHEDULES).pipe(delay(300));
  }

  getUpcomingRuns(): Observable<UpcomingRun[]> {
    return of(MOCK_UPCOMING_RUNS).pipe(delay(200));
  }

  getAlerts(): Observable<Alert[]> {
    return of(MOCK_ALERTS).pipe(delay(300));
  }

  getAlertRules(): Observable<AlertRule[]> {
    return of(MOCK_ALERT_RULES).pipe(delay(200));
  }

  acknowledgeAlert(_alertId: string): Observable<void> {
    return of(undefined).pipe(delay(200));
  }

  getAnalystKPI(): Observable<AnalystKPI> {
    return of(MOCK_ANALYST_KPI).pipe(delay(300));
  }

  getInsights(): Observable<DataInsight[]> {
    return of(MOCK_INSIGHTS).pipe(delay(300));
  }

  getChartData(_period: string): Observable<ChartData> {
    return of(MOCK_CHART_DATA).pipe(delay(300));
  }
}
