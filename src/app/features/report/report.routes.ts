import { Routes } from '@angular/router';

export const REPORT_ROUTES: Routes = [
  { path: '', redirectTo: 'schedule', pathMatch: 'full' },
  {
    path: 'schedule',
    loadComponent: () =>
      import('./presentation/pages/schedule-report/schedule-report.component').then(
        (m) => m.ScheduleReportComponent
      ),
  },
  {
    path: 'alarm',
    loadComponent: () =>
      import('./presentation/pages/alarm-report/alarm-report.component').then(
        (m) => m.AlarmReportComponent
      ),
  },
  {
    path: 'logs-control',
    loadComponent: () =>
      import('./presentation/pages/logs-control-report/logs-control-report.component').then(
        (m) => m.LogsControlReportComponent
      ),
  },
  {
    path: 'device',
    loadComponent: () =>
      import('./presentation/pages/device-report/device-report.component').then(
        (m) => m.DeviceReportComponent
      ),
  },
];
