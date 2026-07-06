import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-po-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-header d-print-none">
      <div class="row align-items-center">
        <div class="col">
          <h2 class="page-title">ใบสั่งซื้อ</h2>
          <div class="text-muted mt-1">จัดการใบสั่งซื้อทั้งหมด</div>
        </div>
        <div class="col-auto ms-auto">
          <a routerLink="/purchase-orders/create" class="btn btn-primary">+ สร้างใบสั่งซื้อ</a>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-body text-center text-muted py-5">
        <p>กำลังพัฒนาระบบ...</p>
      </div>
    </div>
  `,
})
export class POListComponent {}
