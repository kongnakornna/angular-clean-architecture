import { Routes } from '@angular/router';

export const SETTINGS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/layouts/settings-layout/settings-layout.component').then(
        (m) => m.SettingsLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'schedule', pathMatch: 'full' },
      {
        path: 'schedule',
        loadComponent: () =>
          import('./presentation/pages/schedule-list/schedule-list.component').then(
            (m) => m.ScheduleListComponent
          ),
      },
      {
        path: 'schedule/create',
        loadComponent: () =>
          import('./presentation/pages/schedule-create/schedule-create.component').then(
            (m) => m.ScheduleCreateComponent
          ),
      },
      {
        path: 'schedule/:id/edit',
        loadComponent: () =>
          import('./presentation/pages/schedule-edit/schedule-edit.component').then(
            (m) => m.ScheduleEditComponent
          ),
      },
      {
        path: 'schedule/:id/data',
        loadComponent: () =>
          import('./presentation/pages/schedule-data/schedule-data.component').then(
            (m) => m.ScheduleDataComponent
          ),
      },
      {
        path: 'schedule/:id/device',
        loadComponent: () =>
          import('./presentation/pages/schedule-device/schedule-device.component').then(
            (m) => m.ScheduleDeviceComponent
          ),
      },
      {
        path: 'schedule/logs',
        loadComponent: () =>
          import('./presentation/pages/schedule-logs/schedule-logs.component').then(
            (m) => m.ScheduleLogsComponent
          ),
      },
      {
        path: 'alarm',
        loadComponent: () =>
          import('./presentation/pages/alarm-settings/alarm-settings.component').then(
            (m) => m.AlarmSettingsComponent
          ),
      },
      {
        path: 'influx',
        loadComponent: () =>
          import('./presentation/pages/influxdb-settings/influxdb-settings.component').then(
            (m) => m.InfluxDbSettingsComponent
          ),
      },
      {
        path: 'device',
        loadComponent: () =>
          import('./presentation/pages/device-settings/device-settings.component').then(
            (m) => m.DeviceSettingsComponent
          ),
      },
      {
        path: 'location',
        loadComponent: () =>
          import('./presentation/pages/location-list/location-list.component').then(
            (m) => m.LocationListComponent
          ),
      },
      {
        path: 'location/create',
        loadComponent: () =>
          import('./presentation/pages/location-create/location-create.component').then(
            (m) => m.LocationCreateComponent
          ),
      },
      {
        path: 'location/:id/edit',
        loadComponent: () =>
          import('./presentation/pages/location-edit/location-edit.component').then(
            (m) => m.LocationEditComponent
          ),
      },
      {
        path: 'hardware',
        loadComponent: () =>
          import('./presentation/pages/hardware-list/hardware-list.component').then(
            (m) => m.HardwareListComponent
          ),
      },
      {
        path: 'hardware/create',
        loadComponent: () =>
          import('./presentation/pages/hardware-create/hardware-create.component').then(
            (m) => m.HardwareCreateComponent
          ),
      },
      {
        path: 'hardware/:id/edit',
        loadComponent: () =>
          import('./presentation/pages/hardware-edit/hardware-edit.component').then(
            (m) => m.HardwareEditComponent
          ),
      },
      {
        path: 'sensor',
        loadComponent: () =>
          import('./presentation/pages/sensor-list/sensor-list.component').then(
            (m) => m.SensorListComponent
          ),
      },
      {
        path: 'sensor/create',
        loadComponent: () =>
          import('./presentation/pages/sensor-create/sensor-create.component').then(
            (m) => m.SensorCreateComponent
          ),
      },
      {
        path: 'sensor/:id/edit',
        loadComponent: () =>
          import('./presentation/pages/sensor-edit/sensor-edit.component').then(
            (m) => m.SensorEditComponent
          ),
      },
      {
        path: 'nodered',
        loadComponent: () =>
          import('./presentation/pages/nodered-settings/nodered-settings.component').then(
            (m) => m.NodeRedSettingsComponent
          ),
      },
      {
        path: 'mqtt',
        loadComponent: () =>
          import('./presentation/pages/mqtt-settings/mqtt-settings.component').then(
            (m) => m.MqttSettingsComponent
          ),
      },
      {
        path: 'email',
        loadComponent: () =>
          import('./presentation/pages/email-settings/email-settings.component').then(
            (m) => m.EmailSettingsComponent
          ),
      },
      {
        path: 'line',
        loadComponent: () =>
          import('./presentation/pages/line-list/line-list.component').then(
            (m) => m.LineListComponent
          ),
      },
      {
        path: 'line/create',
        loadComponent: () =>
          import('./presentation/pages/line-create/line-create.component').then(
            (m) => m.LineCreateComponent
          ),
      },
      {
        path: 'sms',
        loadComponent: () =>
          import('./presentation/pages/sms-list/sms-list.component').then(
            (m) => m.SmsListComponent
          ),
      },
      {
        path: 'sms/create',
        loadComponent: () =>
          import('./presentation/pages/sms-create/sms-create.component').then(
            (m) => m.SmsCreateComponent
          ),
      },
      {
        path: 'host',
        loadComponent: () =>
          import('./presentation/pages/host-list/host-list.component').then(
            (m) => m.HostListComponent
          ),
      },
      {
        path: 'host/create',
        loadComponent: () =>
          import('./presentation/pages/host-create/host-create.component').then(
            (m) => m.HostCreateComponent
          ),
      },
      {
        path: 'api',
        loadComponent: () =>
          import('./presentation/pages/api-settings/api-settings.component').then(
            (m) => m.ApiSettingsComponent
          ),
      },
      {
        path: 'api-health',
        loadComponent: () =>
          import('./presentation/components/api-health/api-health.component').then(
            (m) => m.ApiHealthComponent
          ),
      },
      {
        path: 'token',
        loadComponent: () =>
          import('./presentation/pages/token-list/token-list.component').then(
            (m) => m.TokenListComponent
          ),
      },
      {
        path: 'token/create',
        loadComponent: () =>
          import('./presentation/pages/token-create/token-create.component').then(
            (m) => m.TokenCreateComponent
          ),
      },
    ],
  },
];
