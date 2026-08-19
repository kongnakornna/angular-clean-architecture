import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { PermissionGuard } from './shared/guards/permission.guard';
import { AuthLayoutComponent } from './features/auth/presentation/layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/presentation/pages/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./features/auth/presentation/pages/forgot-password/forgot-password.component').then(
            (m) => m.ForgotPasswordComponent
          ),
      },
      {
        path: 'sign-up',
        loadComponent: () =>
          import('./features/auth/presentation/pages/sign-up/sign-up.component').then(
            (m) => m.SignUpComponent
          ),
      },
      {
        path: 'lock-screen',
        loadComponent: () =>
          import('./features/auth/presentation/pages/lock-screen/lock-screen.component').then(
            (m) => m.LockScreenComponent
          ),
      },
      {
        path: 'two-step-verification',
        loadComponent: () =>
          import(
            './features/auth/presentation/pages/two-step-verification/two-step-verification.component'
          ).then((m) => m.TwoStepVerificationComponent),
      },
      {
        path: 'two-step-code',
        loadComponent: () =>
          import('./features/auth/presentation/pages/two-step-code/two-step-code.component').then(
            (m) => m.TwoStepCodeComponent
          ),
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./features/auth/presentation/pages/reset-password/reset-password.component').then(
            (m) => m.ResetPasswordComponent
          ),
      },
    ],
  },

  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import(
            './features/dashboard/presentation/pages/main-dashboard/main-dashboard.component'
          ).then((m) => m.MainDashboardComponent),
      },
      {
        path: 'jobs',
        loadChildren: () =>
          import('./features/job-card/job-card.module').then((m) => m.JobCardModule),
        canActivate: [PermissionGuard],
        data: { permission: 'job_card.view' },
      },
      {
        path: 'customers',
        loadComponent: () =>
          import(
            './features/customer/presentation/pages/customer-list/customer-list.component'
          ).then((m) => m.CustomerListComponent),
        canActivate: [PermissionGuard],
        data: { permission: 'customer.view' },
      },
      {
        path: 'customers/create',
        loadComponent: () =>
          import(
            './features/customer/presentation/pages/customer-create/customer-create.component'
          ).then((m) => m.CustomerCreateComponent),
        canActivate: [PermissionGuard],
        data: { permission: 'customer.create' },
      },
      {
        path: 'quotations',
        loadComponent: () =>
          import(
            './features/quotation/presentation/pages/quotation-list/quotation-list.component'
          ).then((m) => m.QuotationListComponent),
        canActivate: [PermissionGuard],
        data: { permission: 'quotation.view' },
      },
      {
        path: 'purchase-orders',
        loadComponent: () =>
          import(
            './features/purchase-order/presentation/pages/po-list/po-list.component'
          ).then((m) => m.POListComponent),
        canActivate: [PermissionGuard],
        data: { permission: 'purchase_order.view' },
      },
      {
        path: 'products',
        loadComponent: () =>
          import(
            './features/inventory/presentation/pages/product-list/product-list.component'
          ).then((m) => m.ProductListComponent),
        canActivate: [PermissionGuard],
        data: { permission: 'inventory.view' },
      },
      {
        path: 'payments',
        loadComponent: () =>
          import(
            './features/payment/presentation/pages/payment-list/payment-list.component'
          ).then((m) => m.PaymentListComponent),
        canActivate: [PermissionGuard],
        data: { permission: 'payment.view' },
      },
      {
        path: 'documents',
        loadComponent: () =>
          import(
            './features/document/presentation/pages/document-list/document-list.component'
          ).then((m) => m.DocumentListComponent),
        canActivate: [PermissionGuard],
        data: { permission: 'document.view' },
      },
      {
        path: 'email/templates',
        loadComponent: () =>
          import(
            './features/email/presentation/pages/email-templates/email-templates.component'
          ).then((m) => m.EmailTemplatesComponent),
        canActivate: [PermissionGuard],
        data: { permission: 'email.view' },
      },
      {
        path: 'batch/jobs',
        loadComponent: () =>
          import('./features/batch/presentation/pages/batch-list/batch-list.component').then(
            (m) => m.BatchListComponent
          ),
        canActivate: [PermissionGuard],
        data: { permission: 'batch.view' },
      },
      {
        path: 'iot/devices',
        loadComponent: () =>
          import('./features/iot/presentation/pages/device-list/device-list.component').then(
            (m) => m.DeviceListComponent
          ),
        canActivate: [PermissionGuard],
        data: { permission: 'iot.view' },
      },
      {
        path: 'iot/settings',
        loadComponent: () =>
          import('./features/iot/presentation/pages/iot-settings/iot-settings.component').then(
            (m) => m.IoTSettingsComponent
          ),
        canActivate: [PermissionGuard],
        data: { permission: 'iot.view' },
      },
      {
        path: 'iot/reports',
        loadComponent: () =>
          import('./features/iot/presentation/pages/iot-reports/iot-reports.component').then(
            (m) => m.IoTReportsComponent
          ),
        canActivate: [PermissionGuard],
        data: { permission: 'iot.view' },
      },
      {
        path: 'mqtt/flows',
        loadComponent: () =>
          import('./features/mqtt/presentation/pages/mqtt-flow-editor/mqtt-flow-editor.component').then(
            (m) => m.MqttFlowEditorComponent
          ),
        canActivate: [PermissionGuard],
        data: { permission: 'iot.view' },
      },
      {
        path: 'wos/orders',
        loadComponent: () =>
          import('./features/wos/presentation/pages/order-list/order-list.component').then(
            (m) => m.OrderListComponent
          ),
        canActivate: [PermissionGuard],
        data: { permission: 'wos.view' },
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import('./features/dashboard/presentation/pages/analytics/analytics.component').then(
            (m) => m.AnalyticsComponent
          ),
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./features/dashboard/presentation/pages/reports/reports.component').then(
            (m) => m.ReportsComponent
          ),
      },
      {
        path: 'email/compose',
        loadComponent: () =>
          import('./features/email/presentation/pages/email-compose/email-compose.component').then(
            (m) => m.EmailComposeComponent
          ),
        canActivate: [PermissionGuard],
        data: { permission: 'email.create' },
      },
      {
        path: 'email/logs',
        loadComponent: () =>
          import('./features/email/presentation/pages/email-logs/email-logs.component').then(
            (m) => m.EmailLogsComponent
          ),
      },
      {
        path: 'i18n/languages',
        loadComponent: () =>
          import('./shared/i18n/presentation/pages/language-selector/language-selector.component').then(
            (m) => m.LanguageSelectorComponent
          ),
      },
      {
        path: 'invoices',
        loadComponent: () =>
          import('./features/payment/presentation/pages/invoice-view/invoice-view.component').then(
            (m) => m.InvoiceViewComponent
          ),
      },
      {
        path: 'settings/theme',
        loadComponent: () =>
          import('./features/auth/presentation/pages/theme-settings/theme-settings.component').then(
            (m) => m.ThemeSettingsComponent
          ),
      },
      {
        path: 'settings/language',
        loadComponent: () =>
          import('./shared/i18n/presentation/pages/language-selector/language-selector.component').then(
            (m) => m.LanguageSelectorComponent
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/auth/presentation/pages/user-list/user-list.component').then(
            (m) => m.UserListComponent
          ),
        canActivate: [PermissionGuard],
        data: { permission: 'user.view' },
      },
      {
        path: 'users/create',
        loadComponent: () =>
          import('./features/auth/presentation/pages/user-create/user-create.component').then(
            (m) => m.UserCreateComponent
          ),
        canActivate: [PermissionGuard],
        data: { permission: 'user.create' },
      },
      {
        path: 'users/:id/edit',
        loadComponent: () =>
          import('./features/auth/presentation/pages/user-edit/user-edit.component').then(
            (m) => m.UserEditComponent
          ),
      },
      {
        path: 'roles',
        loadComponent: () =>
          import('./features/auth/presentation/pages/role-list/role-list.component').then(
            (m) => m.RoleListComponent
          ),
        canActivate: [PermissionGuard],
        data: { permission: 'role.view' },
      },
      {
        path: 'ai-analytics',
        loadChildren: () =>
          import('./features/ai-analytics/ai-analytics.routes').then((m) => m.AI_ANALYTICS_ROUTES),
        canActivate: [PermissionGuard],
        data: { permission: 'ai_analytics.view' },
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/presentation/layouts/settings-layout/settings-layout.component').then(
            (m) => m.SettingsLayoutComponent
          ),
        canActivate: [PermissionGuard],
        data: { permission: 'settings.view' },
        children: [
          { path: '', redirectTo: 'schedule', pathMatch: 'full' },
          {
            path: 'schedule',
            loadComponent: () =>
              import('./features/settings/presentation/pages/schedule-list/schedule-list.component').then(
                (m) => m.ScheduleListComponent
              ),
          },
          {
            path: 'schedule/create',
            loadComponent: () =>
              import('./features/settings/presentation/pages/schedule-create/schedule-create.component').then(
                (m) => m.ScheduleCreateComponent
              ),
          },
          {
            path: 'schedule/:id/edit',
            loadComponent: () =>
              import('./features/settings/presentation/pages/schedule-edit/schedule-edit.component').then(
                (m) => m.ScheduleEditComponent
              ),
          },
          {
            path: 'alarm',
            loadComponent: () =>
              import('./features/settings/presentation/pages/alarm-settings/alarm-settings.component').then(
                (m) => m.AlarmSettingsComponent
              ),
          },
          {
            path: 'influxdb',
            loadComponent: () =>
              import('./features/settings/presentation/pages/influxdb-settings/influxdb-settings.component').then(
                (m) => m.InfluxDbSettingsComponent
              ),
          },
          {
            path: 'devices',
            loadComponent: () =>
              import('./features/settings/presentation/pages/device-settings/device-settings.component').then(
                (m) => m.DeviceSettingsComponent
              ),
          },
          {
            path: 'locations',
            loadComponent: () =>
              import('./features/settings/presentation/pages/location-list/location-list.component').then(
                (m) => m.LocationListComponent
              ),
          },
          {
            path: 'locations/create',
            loadComponent: () =>
              import('./features/settings/presentation/pages/location-create/location-create.component').then(
                (m) => m.LocationCreateComponent
              ),
          },
          {
            path: 'locations/:id/edit',
            loadComponent: () =>
              import('./features/settings/presentation/pages/location-edit/location-edit.component').then(
                (m) => m.LocationEditComponent
              ),
          },
          {
            path: 'hardware',
            loadComponent: () =>
              import('./features/settings/presentation/pages/hardware-list/hardware-list.component').then(
                (m) => m.HardwareListComponent
              ),
          },
          {
            path: 'hardware/create',
            loadComponent: () =>
              import('./features/settings/presentation/pages/hardware-create/hardware-create.component').then(
                (m) => m.HardwareCreateComponent
              ),
          },
          {
            path: 'hardware/:id/edit',
            loadComponent: () =>
              import('./features/settings/presentation/pages/hardware-edit/hardware-edit.component').then(
                (m) => m.HardwareEditComponent
              ),
          },
          {
            path: 'sensors',
            loadComponent: () =>
              import('./features/settings/presentation/pages/sensor-list/sensor-list.component').then(
                (m) => m.SensorListComponent
              ),
          },
          {
            path: 'sensors/create',
            loadComponent: () =>
              import('./features/settings/presentation/pages/sensor-create/sensor-create.component').then(
                (m) => m.SensorCreateComponent
              ),
          },
          {
            path: 'sensors/:id/edit',
            loadComponent: () =>
              import('./features/settings/presentation/pages/sensor-edit/sensor-edit.component').then(
                (m) => m.SensorEditComponent
              ),
          },
          {
            path: 'nodered',
            loadComponent: () =>
              import('./features/settings/presentation/pages/nodered-settings/nodered-settings.component').then(
                (m) => m.NodeRedSettingsComponent
              ),
          },
          {
            path: 'mqtt',
            loadComponent: () =>
              import('./features/settings/presentation/pages/mqtt-settings/mqtt-settings.component').then(
                (m) => m.MqttSettingsComponent
              ),
          },
          {
            path: 'email',
            loadComponent: () =>
              import('./features/settings/presentation/pages/email-settings/email-settings.component').then(
                (m) => m.EmailSettingsComponent
              ),
          },
          {
            path: 'line',
            loadComponent: () =>
              import('./features/settings/presentation/pages/line-list/line-list.component').then(
                (m) => m.LineListComponent
              ),
          },
          {
            path: 'line/create',
            loadComponent: () =>
              import('./features/settings/presentation/pages/line-create/line-create.component').then(
                (m) => m.LineCreateComponent
              ),
          },
          {
            path: 'sms',
            loadComponent: () =>
              import('./features/settings/presentation/pages/sms-list/sms-list.component').then(
                (m) => m.SmsListComponent
              ),
          },
          {
            path: 'sms/create',
            loadComponent: () =>
              import('./features/settings/presentation/pages/sms-create/sms-create.component').then(
                (m) => m.SmsCreateComponent
              ),
          },
          {
            path: 'hosts',
            loadComponent: () =>
              import('./features/settings/presentation/pages/host-list/host-list.component').then(
                (m) => m.HostListComponent
              ),
          },
          {
            path: 'hosts/create',
            loadComponent: () =>
              import('./features/settings/presentation/pages/host-create/host-create.component').then(
                (m) => m.HostCreateComponent
              ),
          },
          {
            path: 'api',
            loadComponent: () =>
              import('./features/settings/presentation/pages/api-settings/api-settings.component').then(
                (m) => m.ApiSettingsComponent
              ),
          },
          {
            path: 'tokens',
            loadComponent: () =>
              import('./features/settings/presentation/pages/token-list/token-list.component').then(
                (m) => m.TokenListComponent
              ),
          },
          {
            path: 'tokens/create',
            loadComponent: () =>
              import('./features/settings/presentation/pages/token-create/token-create.component').then(
                (m) => m.TokenCreateComponent
              ),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
