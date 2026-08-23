export { CommandCenterState, Task, QuickAction } from '../../domain/entities/command-center.entity';
export { DashboardState, KPI, SystemHealthItem, DashboardAlert } from '../../domain/entities/dashboard.entity';
export { Report, ReportFolder, ReportType } from '../../domain/entities/report.entity';
export { LogEntry, LogFilter, LogType } from '../../domain/entities/log.entity';
export { Workflow, WorkflowNode, WorkflowEdge, NodeType } from '../../domain/entities/workflow.entity';
export { ScheduledJob, UpcomingRun, ScheduleStatus } from '../../domain/entities/schedule.entity';
export { Alert, AlertRule, AlertSeverity, AlertStatus } from '../../domain/entities/alert.entity';
export { AnalystKPI, DataInsight, ChartData } from '../../domain/entities/data-analyst.entity';

export interface AIAnalyticsResponse<T> {
  data: T;
  success: boolean;
  timestamp: string;
}
