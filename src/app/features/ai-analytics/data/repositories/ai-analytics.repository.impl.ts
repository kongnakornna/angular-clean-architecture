import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAIAnalyticsRepository } from '../../domain/repositories/ai-analytics.repository';
import { CommandCenterState } from '../../domain/entities/command-center.entity';
import { DashboardState } from '../../domain/entities/dashboard.entity';
import { Report, ReportFolder } from '../../domain/entities/report.entity';
import { LogEntry, LogFilter } from '../../domain/entities/log.entity';
import { Workflow } from '../../domain/entities/workflow.entity';
import { ScheduledJob, UpcomingRun } from '../../domain/entities/schedule.entity';
import { Alert, AlertRule } from '../../domain/entities/alert.entity';
import { AnalystKPI, DataInsight, ChartData } from '../../domain/entities/data-analyst.entity';
import { AIAnalyticsMockDataSource } from '../datasources/ai-analytics-mock.datasource';

@Injectable({ providedIn: 'root' })
export class AIAnalyticsRepositoryImpl implements IAIAnalyticsRepository {
  constructor(private ds: AIAnalyticsMockDataSource) {}

  getCommandCenterState(): Observable<CommandCenterState> {
    return this.ds.getCommandCenterState();
  }

  runTask(taskId: string): Observable<void> {
    return this.ds.runTask(taskId);
  }

  pauseTask(taskId: string): Observable<void> {
    return this.ds.pauseTask(taskId);
  }

  stopTask(taskId: string): Observable<void> {
    return this.ds.stopTask(taskId);
  }

  getDashboardState(): Observable<DashboardState> {
    return this.ds.getDashboardState();
  }

  getReports(folder?: string): Observable<Report[]> {
    return this.ds.getReports(folder);
  }

  getReportFolders(): Observable<ReportFolder[]> {
    return this.ds.getReportFolders();
  }

  getLogs(filter?: LogFilter): Observable<LogEntry[]> {
    return this.ds.getLogs(filter);
  }

  getWorkflows(): Observable<Workflow[]> {
    return this.ds.getWorkflows();
  }

  getWorkflow(id: string): Observable<Workflow> {
    return this.ds.getWorkflow(id);
  }

  saveWorkflow(workflow: Workflow): Observable<Workflow> {
    return this.ds.saveWorkflow(workflow);
  }

  getSchedules(): Observable<ScheduledJob[]> {
    return this.ds.getSchedules();
  }

  getUpcomingRuns(): Observable<UpcomingRun[]> {
    return this.ds.getUpcomingRuns();
  }

  getAlerts(): Observable<Alert[]> {
    return this.ds.getAlerts();
  }

  getAlertRules(): Observable<AlertRule[]> {
    return this.ds.getAlertRules();
  }

  acknowledgeAlert(alertId: string): Observable<void> {
    return this.ds.acknowledgeAlert(alertId);
  }

  getAnalystKPI(): Observable<AnalystKPI> {
    return this.ds.getAnalystKPI();
  }

  getInsights(): Observable<DataInsight[]> {
    return this.ds.getInsights();
  }

  getChartData(period: string): Observable<ChartData> {
    return this.ds.getChartData(period);
  }
}
