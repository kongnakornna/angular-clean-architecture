import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-header">
      <div class="row align-items-center">
        <div class="col">
          <h2 class="page-title">คำสั่งซื้อออนไลน์</h2>
          <div class="text-muted mt-1">จัดการคำสั่งซื้อจากลูกค้า</div>
        </div>
        <div class="col-auto ms-auto">
          <a routerLink="/wos/orders/create" class="btn btn-primary">+ สร้าง Order</a>
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
export class OrderListComponent {}
