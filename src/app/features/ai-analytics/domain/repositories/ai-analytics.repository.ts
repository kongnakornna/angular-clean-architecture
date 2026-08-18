import { Observable } from 'rxjs';
import { CommandCenterState } from '../entities/command-center.entity';
import { DashboardState } from '../entities/dashboard.entity';
import { Report, ReportFolder } from '../entities/report.entity';
import { LogEntry, LogFilter } from '../entities/log.entity';
import { Workflow } from '../entities/workflow.entity';
import { ScheduledJob, UpcomingRun } from '../entities/schedule.entity';
import { Alert, AlertRule } from '../entities/alert.entity';
import { AnalystKPI, DataInsight, ChartData } from '../entities/data-analyst.entity';

export interface IAIAnalyticsRepository {
  getCommandCenterState(): Observable<CommandCenterState>;
  runTask(taskId: string): Observable<void>;
  pauseTask(taskId: string): Observable<void>;
  stopTask(taskId: string): Observable<void>;

  getDashboardState(): Observable<DashboardState>;

  getReports(folder?: string): Observable<Report[]>;
  getReportFolders(): Observable<ReportFolder[]>;

  getLogs(filter?: LogFilter): Observable<LogEntry[]>;

  getWorkflows(): Observable<Workflow[]>;
  getWorkflow(id: string): Observable<Workflow>;
  saveWorkflow(workflow: Workflow): Observable<Workflow>;

  getSchedules(): Observable<ScheduledJob[]>;
  getUpcomingRuns(): Observable<UpcomingRun[]>;

  getAlerts(): Observable<Alert[]>;
  getAlertRules(): Observable<AlertRule[]>;
  acknowledgeAlert(alertId: string): Observable<void>;

  getAnalystKPI(): Observable<AnalystKPI>;
  getInsights(): Observable<DataInsight[]>;
  getChartData(period: string): Observable<ChartData>;
}
