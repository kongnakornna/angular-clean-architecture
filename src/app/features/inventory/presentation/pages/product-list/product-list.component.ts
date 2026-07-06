import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-header d-print-none">
      <div class="row align-items-center">
        <div class="col">
          <h2 class="page-title">สินค้าคงคลัง</h2>
          <div class="text-muted mt-1">จัดการสินค้าทั้งหมด</div>
        </div>
        <div class="col-auto ms-auto">
          <a routerLink="/products/create" class="btn btn-primary">+ เพิ่มสินค้า</a>
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
export class ProductListComponent {}
