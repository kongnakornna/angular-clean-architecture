import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-device-detail',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, TranslatePipe],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">{{ 'iot.detail' | translate }}</h2>
      <div class="text-secondary mt-1">{{ device.name }}</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <a routerLink="/iot/devices" class="btn btn-outline-secondary me-2">{{ 'iot.back' | translate }}</a>
      <a routerLink="/iot/devices/1/edit" class="btn btn-primary">{{ 'iot.edit' | translate }}</a>
    </div>
  </div>
</div>
<div class="row g-3">
  <div class="col-md-4">
    <div class="card">
      <div class="card-header"><h3 class="card-title">{{ 'iot.deviceInfo' | translate }}</h3></div>
      <div class="card-body">
        <div class="datagrid">
          <div class="datagrid-item">
            <div class="datagrid-title">{{ 'iot.deviceName' | translate }}</div>
            <div class="datagrid-content">{{ device.name }}</div>
          </div>
          <div class="datagrid-item">
            <div class="datagrid-title">{{ 'iot.deviceCode' | translate }}</div>
            <div class="datagrid-content">{{ device.code }}</div>
          </div>
          <div class="datagrid-item">
            <div class="datagrid-title">{{ 'iot.type' | translate }}</div>
            <div class="datagrid-content">{{ device.type }}</div>
          </div>
          <div class="datagrid-item">
            <div class="datagrid-title">{{ 'iot.status' | translate }}</div>
            <div class="datagrid-content">
              <span class="badge" [class.bg-green]="device.status === 'online'" [class.bg-red]="device.status === 'offline'" [class.bg-yellow]="device.status === 'warning'">{{ device.status }}</span>
            </div>
          </div>
          <div class="datagrid-item">
            <div class="datagrid-title">{{ 'iot.location' | translate }}</div>
            <div class="datagrid-content">{{ device.location }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header"><h3 class="card-title">{{ 'iot.position' | translate }}</h3></div>
      <div class="card-body p-0">
        <div style="height:200px;background:var(--tblr-bg-surface-secondary);display:flex;align-items:center;justify-content:center">
          <span class="text-secondary">{{ 'iot.map' | translate }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-8">
    <div class="card">
      <div class="card-header"><h3 class="card-title">{{ 'iot.sensorData' | translate }}</h3></div>
      <div class="table-responsive">
        <table class="table table-vcenter card-table">
          <thead>
            <tr><th>{{ 'iot.sensor' | translate }}</th><th>{{ 'iot.value' | translate }}</th><th>{{ 'iot.unit' | translate }}</th><th>{{ 'iot.lastUpdated' | translate }}</th><th>{{ 'iot.status' | translate }}</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let s of sensors">
              <td>{{ s.name }}</td>
              <td>{{ s.value }}</td>
              <td>{{ s.unit }}</td>
              <td>{{ s.lastUpdate }}</td>
              <td>
                <span class="badge" [class.bg-green]="s.status === 'normal'" [class.bg-yellow]="s.status === 'warning'" [class.bg-red]="s.status === 'error'">{{ s.status }}</span>
              </td>
            </tr>
            <tr *ngIf="sensors.length === 0">
              <td colspan="5" class="text-center text-secondary py-4">{{ 'iot.noSensorData' | translate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  `,
})
export class DeviceDetailComponent {
  device = { name: 'Temperature Sensor A1', code: 'TS-A1-001', type: 'Temperature Sensor', status: 'online', location: 'อาคาร A ชั้น 2' };
  sensors = [
    { name: 'อุณหภูมิ', value: '32.5', unit: '°C', lastUpdate: '12:30:05', status: 'normal' },
    { name: 'ความชื้น', value: '68', unit: '%', lastUpdate: '12:30:05', status: 'normal' },
    { name: 'แรงดันไฟฟ้า', value: '220.1', unit: 'V', lastUpdate: '12:29:55', status: 'warning' },
  ];
}
