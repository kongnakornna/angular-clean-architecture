import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-device-map',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">แผนที่อุปกรณ์</h2>
      <div class="text-secondary mt-1">แสดงตำแหน่งอุปกรณ์ IoT ทั้งหมด</div>
    </div>
  </div>
</div>
<div class="row g-3">
  <div class="col-md-8">
    <div class="card">
      <div class="card-body p-0">
        <div style="height:450px;background:var(--tblr-bg-surface-secondary);display:flex;align-items:center;justify-content:center;flex-direction:column">
          <span class="text-secondary mb-2">แผนที่แสดงตำแหน่งอุปกรณ์</span>
          <span class="text-secondary">(ใช้ Google Maps หรือ OpenStreetMap API)</span>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card">
      <div class="card-header"><h3 class="card-title">รายการอุปกรณ์ ({{ devices.length }})</h3></div>
      <div class="list-group list-group-flush">
        <div class="list-group-item d-flex align-items-center" *ngFor="let d of devices">
          <div class="me-3">
            <span class="avatar" [class.bg-green]="d.status === 'online'" [class.bg-red]="d.status === 'offline'">{{ d.name[0] }}</span>
          </div>
          <div class="flex-fill">
            <div class="fw-bold">{{ d.name }}</div>
            <div class="text-secondary">{{ d.location }}</div>
          </div>
          <div>
            <span class="badge" [class.bg-green]="d.status === 'online'" [class.bg-red]="d.status === 'offline'">{{ d.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
})
export class DeviceMapComponent {
  devices = [
    { name: 'Temperature Sensor A1', location: 'อาคาร A ชั้น 2', status: 'online' },
    { name: 'Humidity Sensor B2', location: 'อาคาร B ชั้น 1', status: 'online' },
    { name: 'Power Meter C1', location: 'อาคาร C', status: 'offline' },
    { name: 'Air Quality D3', location: 'อาคาร A ชั้น 3', status: 'online' },
  ];
}
