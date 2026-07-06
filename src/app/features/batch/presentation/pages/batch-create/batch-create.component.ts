import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-batch-create',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">สร้าง Batch ใหม่</h2>
      <div class="text-secondary mt-1">กำหนดตาราง Batch Processing</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <a routerLink="/batches" class="btn btn-outline-secondary">กลับ</a>
    </div>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <form>
      <div class="mb-3">
        <label class="form-label">ชื่อ Batch</label>
        <input type="text" class="form-control" name="name" [(ngModel)]="name" placeholder="ระบุชื่อ Batch">
      </div>
      <div class="mb-3">
        <label class="form-label">ตารางเวลา (Cron)</label>
        <input type="text" class="form-control" name="schedule" [(ngModel)]="schedule" placeholder="*/5 * * * *">
      </div>
      <div class="mb-3">
        <label class="form-label">ประเภท</label>
        <select class="form-select" name="type" [(ngModel)]="type">
          <option value="sync">Sync</option>
          <option value="report">Report</option>
          <option value="backup">Backup</option>
          <option value="cleanup">Cleanup</option>
        </select>
      </div>
      <div class="form-footer">
        <button type="submit" class="btn btn-primary">สร้าง Batch</button>
      </div>
    </form>
  </div>
</div>
  `,
})
export class BatchCreateComponent {
  name = '';
  schedule = '';
  type = 'sync';
}
