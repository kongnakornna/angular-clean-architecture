import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-create',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">เพิ่มลูกค้าใหม่</h2>
      <div class="text-secondary mt-1">กรอกข้อมูลลูกค้าเพื่อสร้างรายการใหม่</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <a routerLink="/customers" class="btn btn-outline-secondary">กลับ</a>
    </div>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <form>
      <div class="mb-3">
        <label class="form-label">ชื่อบริษัท</label>
        <input type="text" class="form-control" name="companyName" [(ngModel)]="companyName" placeholder="ชื่อบริษัท">
      </div>
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label">อีเมล</label>
          <input type="email" class="form-control" name="email" [(ngModel)]="email" placeholder="email@company.com">
        </div>
        <div class="col-md-6">
          <label class="form-label">เบอร์โทร</label>
          <input type="tel" class="form-control" name="phone" [(ngModel)]="phone" placeholder="02-123-4567">
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">ที่อยู่</label>
        <textarea class="form-control" name="address" [(ngModel)]="address" rows="3" placeholder="ที่อยู่"></textarea>
      </div>
      <div class="form-footer">
        <button type="submit" class="btn btn-primary">บันทึก</button>
      </div>
    </form>
  </div>
</div>
  `,
})
export class CustomerCreateComponent {
  companyName = '';
  email = '';
  phone = '';
  address = '';
}
