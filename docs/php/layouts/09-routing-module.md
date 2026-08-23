# Routing & Module Registration

## Complete Routes

**app-routing.module.ts** — All layout variants with lazy-loaded features:

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { IotGuard } from './core/guards/iot.guard';

const routes: Routes = [
  // === DEFAULT REDIRECT ===
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // === AUTH LAYOUT (no chrome) ===
  {
    path: '',
    component: AuthLayoutComponent,       // from features/auth
    children: [
      { path: 'login', loadComponent: () => import('./features/auth/presentation/pages/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./features/auth/presentation/pages/register/register.component').then(m => m.RegisterComponent) },
      { path: 'forgot-password', loadComponent: () => import('./features/auth/presentation/pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) },
      { path: 'reset-password', loadComponent: () => import('./features/auth/presentation/pages/reset-password/reset-password.component').then(m => m.ResetPasswordComponent) },
      { path: 'lock-screen', loadComponent: () => import('./features/auth/presentation/pages/lock-screen/lock-screen.component').then(m => m.LockScreenComponent) },
    ],
  },

  // === CLASSIC LAYOUT (horizontal navbar) — PHP template.php ===
  {
    path: '',
    component: ClassicLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/presentation/pages/main-dashboard/main-dashboard.component').then(m => m.MainDashboardComponent) },
      { path: 'reports', loadComponent: () => import('./features/reports/presentation/pages/report-list/report-list.component').then(m => m.ReportListComponent) },
      { path: 'help', loadComponent: () => import('./features/help/presentation/pages/help-center/help-center.component').then(m => m.HelpCenterComponent) },
      { path: 'about/manual', loadComponent: () => import('./features/about/presentation/pages/manual/manual.component').then(m => m.ManualComponent) },
      { path: 'about/license', loadComponent: () => import('./features/about/presentation/pages/license/license.component').then(m => m.LicenseComponent) },
    ],
  },

  // === VERTICAL LAYOUT (sidebar) — PHP templatevertical.php ===
  {
    path: 'app',
    component: VerticalLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/presentation/pages/main-dashboard/main-dashboard.component').then(m => m.MainDashboardComponent) },
      { path: 'users', loadComponent: () => import('./features/users/presentation/pages/user-list/user-list.component').then(m => m.UserListComponent) },
      { path: 'users/create', loadComponent: () => import('./features/users/presentation/pages/user-create/user-create.component').then(m => m.UserCreateComponent) },
      { path: 'settings', loadComponent: () => import('./features/settings/presentation/pages/settings-main/settings-main.component').then(m => m.SettingsMainComponent) },
      { path: 'settings/user', loadComponent: () => import('./features/settings/presentation/pages/settings-user/settings-user.component').then(m => m.SettingsUserComponent) },
      { path: 'settings/admin', loadComponent: () => import('./features/settings/presentation/pages/settings-admin/settings-admin.component').then(m => m.SettingsAdminComponent) },
      { path: 'settings/dev', loadComponent: () => import('./features/settings/presentation/pages/settings-dev/settings-dev.component').then(m => m.SettingsDevComponent) },
      { path: 'settings/enduser', loadComponent: () => import('./features/settings/presentation/pages/settings-enduser/settings-enduser.component').then(m => m.SettingsEndUserComponent) },
      { path: 'settings/vertical', loadComponent: () => import('./features/settings/presentation/pages/settings-vertical/settings-vertical.component').then(m => m.SettingsVerticalComponent) },
      { path: 'reports', loadComponent: () => import('./features/reports/presentation/pages/report-list/report-list.component').then(m => m.ReportListComponent) },
      { path: 'admin/logs', loadComponent: () => import('./features/admin/presentation/pages/log-viewer/log-viewer.component').then(m => m.LogViewerComponent) },
      { path: 'user/profile', loadComponent: () => import('./features/user/presentation/pages/user-profile/user-profile.component').then(m => m.UserProfileComponent) },
      { path: 'log/history', loadComponent: () => import('./features/log/presentation/pages/log-history/log-history.component').then(m => m.LogHistoryComponent) },
    ],
  },

  // === VERTICAL COMPACT LAYOUT — PHP templatevertical2.php ===
  {
    path: 'app-compact',
    component: VerticalCompactLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/presentation/pages/main-dashboard/main-dashboard.component').then(m => m.MainDashboardComponent) },
    ],
  },

  // === VERTICAL MINIMAL LAYOUT (no footer) — PHP templatevertical3.php ===
  {
    path: 'app-minimal',
    component: VerticalMinimalLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'devices', pathMatch: 'full' },
      { path: 'devices', loadComponent: () => import('./features/devices/presentation/pages/device-list/device-list.component').then(m => m.DeviceListComponent) },
      { path: 'monitoring', loadComponent: () => import('./features/monitoring/presentation/pages/monitor-dashboard/monitor-dashboard.component').then(m => m.MonitorDashboardComponent) },
    ],
  },

  // === VERTICAL IOT LAYOUT — PHP templatevertical4.php ===
  {
    path: 'app-iot',
    component: VerticalIotLayoutComponent,
    canActivate: [AuthGuard, IotGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./features/iot/presentation/pages/iot-dashboard/iot-dashboard.component').then(m => m.IotDashboardComponent) },
      { path: 'devices', loadComponent: () => import('./features/iot/presentation/pages/device-list/device-list.component').then(m => m.DeviceListComponent) },
    ],
  },

  // === IOT LAYOUT (horizontal) — PHP templateiot.php ===
  {
    path: 'iot',
    component: IotLayoutComponent,
    canActivate: [AuthGuard, IotGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./features/iot/presentation/pages/iot-dashboard/iot-dashboard.component').then(m => m.IotDashboardComponent) },
      { path: 'devices', loadComponent: () => import('./features/iot/presentation/pages/device-list/device-list.component').then(m => m.DeviceListComponent) },
      { path: 'monitoring/realtime', loadComponent: () => import('./features/iot/presentation/pages/realtime-monitoring/realtime-monitoring.component').then(m => m.RealtimeMonitoringComponent) },
      { path: 'monitoring/history', loadComponent: () => import('./features/iot/presentation/pages/history-monitoring/history-monitoring.component').then(m => m.HistoryMonitoringComponent) },
      { path: 'monitoring/alerts', loadComponent: () => import('./features/iot/presentation/pages/alert-list/alert-list.component').then(m => m.AlertListComponent) },
      { path: 'industry', loadComponent: () => import('./features/iot/presentation/pages/industry/industry-overview/industry-overview.component').then(m => m.IndustryOverviewComponent) },
      { path: 'industry/equipment', loadComponent: () => import('./features/iot/presentation/pages/industry/industry-equipment/industry-equipment.component').then(m => m.IndustryEquipmentComponent) },
      { path: 'industry/production', loadComponent: () => import('./features/iot/presentation/pages/industry/production-monitor/production-monitor.component').then(m => m.ProductionMonitorComponent) },
      { path: 'irrigation', loadComponent: () => import('./features/iot/presentation/pages/irrigation/irrigation-zones/irrigation-zones.component').then(m => m.IrrigationZonesComponent) },
      { path: 'irrigation/schedules', loadComponent: () => import('./features/iot/presentation/pages/irrigation/irrigation-schedules/irrigation-schedules.component').then(m => m.IrrigationSchedulesComponent) },
      { path: 'smartcity', loadComponent: () => import('./features/iot/presentation/pages/smartcity/smartcity-overview/smartcity-overview.component').then(m => m.SmartCityOverviewComponent) },
      { path: 'smartcity/traffic', loadComponent: () => import('./features/iot/presentation/pages/smartcity/traffic-monitor/traffic-monitor.component').then(m => m.TrafficMonitorComponent) },
      { path: 'smartcity/lighting', loadComponent: () => import('./features/iot/presentation/pages/smartcity/smart-lighting/smart-lighting.component').then(m => m.SmartLightingComponent) },
      { path: 'smarthome', loadComponent: () => import('./features/iot/presentation/pages/smarthome/smarthome-dashboard/smarthome-dashboard.component').then(m => m.SmartHomeDashboardComponent) },
      { path: 'smarthome/scenes', loadComponent: () => import('./features/iot/presentation/pages/smarthome/smarthome-scenes/smarthome-scenes.component').then(m => m.SmartHomeScenesComponent) },
      { path: 'smarthome/automation', loadComponent: () => import('./features/iot/presentation/pages/smarthome/smarthome-automation/smarthome-automation.component').then(m => m.SmartHomeAutomationComponent) },
      { path: 'reports', loadComponent: () => import('./features/reports/presentation/pages/report-list/report-list.component').then(m => m.ReportListComponent) },
      { path: 'settings', loadComponent: () => import('./features/iot/presentation/pages/iot-settings/iot-settings.component').then(m => m.IotSettingsComponent) },
    ],
  },

  // === R1 LAYOUT — PHP templater1.php ===
  {
    path: 'r1',
    component: R1LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./features/r1/presentation/pages/r1-dashboard/r1-dashboard.component').then(m => m.R1DashboardComponent) },
      { path: 'jobs', loadComponent: () => import('./features/r1/presentation/pages/r1-jobs/r1-jobs.component').then(m => m.R1JobsComponent) },
      { path: 'reports', loadComponent: () => import('./features/r1/presentation/pages/r1-reports/r1-reports.component').then(m => m.R1ReportsComponent) },
    ],
  },

  // === IFRAME LAYOUT (dark, embedded) — PHP iframe.php ===
  {
    path: 'embed',
    component: IframeLayoutComponent,
    children: [
      { path: 'widget/:id', loadComponent: () => import('./features/widgets/presentation/pages/embed-widget/embed-widget.component').then(m => m.EmbedWidgetComponent) },
      { path: 'dashboard/:id', loadComponent: () => import('./features/widgets/presentation/pages/embed-dashboard/embed-dashboard.component').then(m => m.EmbedDashboardComponent) },
    ],
  },

  // === BLANK LAYOUT (no chrome) — PHP template1.php / template2.php / template3.php ===
  {
    path: 'blank',
    component: BlankLayoutComponent,
    children: [
      { path: 'page', loadComponent: () => import('./features/pages/presentation/blank/blank.component').then(m => m.BlankPageComponent) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

---

## AppModule Registration

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

// Layouts — declared (standalone: false)
import { ClassicLayoutComponent } from './layouts/classic/classic-layout.component';
import { ClassicHeaderComponent } from './layouts/classic/classic-header.component';

// Layouts — imported as standalone
import { VerticalLayoutComponent } from './layouts/vertical/vertical-layout.component';
import { VerticalCompactLayoutComponent } from './layouts/vertical-compact/vertical-compact-layout.component';
import { VerticalMinimalLayoutComponent } from './layouts/vertical-minimal/vertical-minimal-layout.component';
import { VerticalIotLayoutComponent } from './layouts/vertical-iot/vertical-iot-layout.component';
import { IotLayoutComponent } from './layouts/iot/iot-layout.component';
import { R1LayoutComponent } from './layouts/r1/r1-layout.component';
import { IframeLayoutComponent } from './layouts/iframe/iframe-layout.component';
import { BlankLayoutComponent } from './layouts/blank/blank-layout.component';

// Shared components (standalone)
import { SettingsPanelComponent } from './layouts/shared/settings-panel/settings-panel.component';
import { HorizontalMenuComponent } from './layouts/shared/horizontal-menu/horizontal-menu.component';
import { FooterBarComponent } from './layouts/shared/footer/footer-bar.component';
import { FooterCompactComponent } from './layouts/shared/footer/footer-compact.component';
import { FooterMinimalComponent } from './layouts/shared/footer/footer-minimal.component';
import { FooterIotComponent } from './layouts/shared/footer/footer-iot.component';
import { FooterIframeComponent } from './layouts/shared/footer/footer-iframe.component';
import { FooterR1Component } from './layouts/shared/footer/footer-r1.component';
import { VerticalSidebarComponent } from './layouts/shared/sidebar/vertical-sidebar.component';
import { VerticalSidebarV2Component } from './layouts/shared/sidebar/vertical-sidebar-v2.component';
import { VerticalSidebarV3Component } from './layouts/shared/sidebar/vertical-sidebar-v3.component';
import { NotificationDropdownComponent } from './layouts/shared/notifications/notification-dropdown.component';
import { LanguageSelectorComponent } from './layouts/shared/language-selector/language-selector.component';
import { DashboardWrapperComponent } from './layouts/shared/page-wrapper/dashboard-wrapper.component';
import { IotDashboardWrapperComponent } from './layouts/shared/page-wrapper/iot-dashboard-wrapper.component';
import { PageWrapperComponent } from './layouts/shared/page-wrapper/page-wrapper.component';
import { PageWrapperR1Component } from './layouts/shared/page-wrapper/page-wrapper-r1.component';
import { PageWrapperVerticalComponent } from './layouts/shared/page-wrapper/page-wrapper-vertical.component';
import { LogoutDialogComponent } from './layouts/shared/dialogs/logout-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    // Non-standalone layouts
    ClassicLayoutComponent,
    ClassicHeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    TablerIconsModule,

    // Standalone layout shells
    VerticalLayoutComponent,
    VerticalCompactLayoutComponent,
    VerticalMinimalLayoutComponent,
    VerticalIotLayoutComponent,
    IotLayoutComponent,
    R1LayoutComponent,
    IframeLayoutComponent,
    BlankLayoutComponent,

    // Standalone shared components
    SettingsPanelComponent,
    HorizontalMenuComponent,
    FooterBarComponent,
    FooterCompactComponent,
    FooterMinimalComponent,
    FooterIotComponent,
    FooterIframeComponent,
    FooterR1Component,
    VerticalSidebarComponent,
    VerticalSidebarV2Component,
    VerticalSidebarV3Component,
    NotificationDropdownComponent,
    LanguageSelectorComponent,
    DashboardWrapperComponent,
    IotDashboardWrapperComponent,
    PageWrapperComponent,
    PageWrapperR1Component,
    PageWrapperVerticalComponent,
    LogoutDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```
