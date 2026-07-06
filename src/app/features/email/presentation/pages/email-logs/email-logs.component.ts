import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';

@Component({
  selector: 'app-email-logs',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, TablerIconComponent],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">ประวัติการส่งอีเมล</h2>
      <div class="text-secondary mt-1">ตรวจสอบสถานะการส่งอีเมลทั้งหมด</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <a routerLink="/email/compose" class="btn btn-primary">
        <i-tabler name="plus" class="icon"></i-tabler> เขียนอีเมล
      </a>
    </div>
  </div>
</div>
<div class="card">
  <div class="table-responsive">
    <table class="table table-vcenter card-table">
      <thead>
        <tr><th>ถึง</th><th>หัวข้อ</th><th>วันที่</th><th>สถานะ</th><th class="w-1"></th></tr>
      </thead>
      <tbody>
        <tr *ngFor="let log of logs">
          <td>{{ log.to }}</td>
          <td>{{ log.subject }}</td>
          <td>{{ log.sentAt }}</td>
          <td>
            <span class="badge" [class.bg-green]="log.status === 'sent'" [class.bg-red]="log.status === 'failed'" [class.bg-yellow]="log.status === 'pending'">
              {{ log.status }}
            </span>
          </td>
          <td><button class="btn btn-sm btn-outline-secondary">ดู</button></td>
        </tr>
        <tr *ngIf="logs.length === 0">
          <td colspan="5" class="text-center text-secondary py-4">ไม่มีประวัติการส่งอีเมล</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
  `,
})
export class EmailLogsComponent {
  logs = [
    { to: 'customer1@company.com', subject: 'แจ้งสถานะงาน JC-2026-001', sentAt: '01/04/2026 09:30', status: 'sent' },
    { to: 'supplier@vendor.com', subject: 'ใบสั่งซื้อ PO-2026-001', sentAt: '30/03/2026 14:15', status: 'sent' },
    { to: 'test@example.com', subject: 'ทดสอบระบบ', sentAt: '29/03/2026 11:00', status: 'failed' },
  ];
}
