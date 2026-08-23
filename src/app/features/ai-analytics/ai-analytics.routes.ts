import { Routes } from '@angular/router';
import { CommandCenterComponent } from './presentation/pages/command-center/command-center.component';
import { DashboardComponent } from './presentation/pages/dashboard/dashboard.component';
import { ReportsComponent } from './presentation/pages/reports/reports.component';
import { ActivityLogComponent } from './presentation/pages/activity-log/activity-log.component';
import { WorkflowAIComponent } from './presentation/pages/workflow-ai/workflow-ai.component';
import { SchedulerComponent } from './presentation/pages/scheduler/scheduler.component';
import { AlertManagementComponent } from './presentation/pages/alert-management/alert-management.component';
import { DataAnalystComponent } from './presentation/pages/data-analyst/data-analyst.component';

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
