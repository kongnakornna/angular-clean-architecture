import { Routes } from '@angular/router';

import { MonitoringLayoutComponent } from './presentation/layouts/monitoring-layout/monitoring-layout.component';
import { SmarthomeDashboardComponent } from './presentation/pages/smarthome-dashboard/smarthome-dashboard.component';
import { SmartcityDashboardComponent } from './presentation/pages/smartcity-dashboard/smartcity-dashboard.component';
import { SmartmonitorDashboardComponent } from './presentation/pages/smartmonitor-dashboard/smartmonitor-dashboard.component';
import { IndustryDashboardComponent } from './presentation/pages/industry-dashboard/industry-dashboard.component';
import { SmartsolarfarmDashboardComponent } from './presentation/pages/smartsolarfarm-dashboard/smartsolarfarm-dashboard.component';

export const MONITORING_ROUTES: Routes = [
  {
    path: '',
    component: MonitoringLayoutComponent,
    children: [
      { path: '', redirectTo: 'smarthome', pathMatch: 'full' },
      { path: 'smarthome', component: SmarthomeDashboardComponent },
      { path: 'smartcity', component: SmartcityDashboardComponent },
      { path: 'smartmonitor', component: SmartmonitorDashboardComponent },
      { path: 'industry', component: IndustryDashboardComponent },
      { path: 'smartsolarfarm', component: SmartsolarfarmDashboardComponent },
    ],
  },
];
