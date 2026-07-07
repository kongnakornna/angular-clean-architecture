import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, TranslatePipe],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">{{ 'reports.title' | translate }}</h2>
      <div class="text-secondary mt-1">{{ 'reports.subtitle' | translate }}</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <button class="btn btn-primary">{{ 'reports.create' | translate }}</button>
    </div>
  </div>
</div>
<div class="card">
    <div class="card-header"><h3 class="card-title">{{ 'reports.recent' | translate }}</h3></div>
    <div class="table-responsive">
      <table class="table table-vcenter card-table">
        <thead>
          <tr><th>{{ 'reports.name' | translate }}</th><th>{{ 'reports.type' | translate }}</th><th>{{ 'reports.createdAt' | translate }}</th><th>{{ 'reports.status' | translate }}</th><th></th></tr>
      </thead>
      <tbody>
        <tr *ngFor="let r of reports">
          <td>{{ r.name }}</td>
          <td>{{ r.type }}</td>
          <td>{{ r.createdAt }}</td>
           <td><span class="badge" [class.bg-green]="r.status === 'พร้อม'" [class.bg-yellow]="r.status === 'กำลังสร้าง'">{{ r.status }}</span></td>
           <td><button class="btn btn-sm btn-primary">{{ 'reports.download' | translate }}</button></td>
        </tr>
        <tr *ngIf="reports.length === 0">
          <td colspan="5" class="text-center text-secondary py-4">{{ 'reports.noReports' | translate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
  `,
})
export class ReportsComponent {
  reports = [
    { name: 'รายงานสรุปยอดขาย Q1-2026', type: 'Sales', createdAt: '01/04/2026', status: 'พร้อม' },
    { name: 'รายงานสถานะงานคงค้าง', type: 'Operations', createdAt: '28/03/2026', status: 'กำลังสร้าง' },
    { name: 'รายงานลูกค้าใหม่', type: 'CRM', createdAt: '25/03/2026', status: 'พร้อม' },
  ];
}
