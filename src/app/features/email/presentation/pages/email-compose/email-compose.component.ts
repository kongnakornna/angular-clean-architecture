import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';

@Component({
  selector: 'app-email-compose',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink, TablerIconComponent],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">เขียนอีเมล</h2>
      <div class="text-secondary mt-1">ส่งอีเมลถึงลูกค้าหรือทีมงาน</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <a routerLink="/email/logs" class="btn btn-outline-secondary">ดูประวัติ</a>
    </div>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <form>
      <div class="mb-3">
        <label class="form-label">ถึง</label>
        <input type="email" class="form-control" name="to" [(ngModel)]="to" placeholder="email@example.com">
      </div>
      <div class="mb-3">
        <label class="form-label">หัวข้อ</label>
        <input type="text" class="form-control" name="subject" [(ngModel)]="subject" placeholder="หัวข้ออีเมล">
      </div>
      <div class="mb-3">
        <label class="form-label">เนื้อหา</label>
        <textarea class="form-control" name="body" [(ngModel)]="body" rows="10" placeholder="เนื้อหาอีเมล"></textarea>
      </div>
      <div class="form-footer">
        <button type="submit" class="btn btn-primary">
          <i-tabler name="send" class="icon"></i-tabler> ส่งอีเมล
        </button>
      </div>
    </form>
  </div>
</div>
  `,
})
export class EmailComposeComponent {
  to = '';
  subject = '';
  body = '';
}
