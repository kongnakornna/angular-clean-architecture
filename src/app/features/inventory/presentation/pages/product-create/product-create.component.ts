import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">เพิ่มสินค้าใหม่</h2>
      <div class="text-secondary mt-1">เพิ่มสินค้าเข้าสู่ระบบคลังสินค้า</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <a routerLink="/products" class="btn btn-outline-secondary">กลับ</a>
    </div>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <form>
      <div class="mb-3">
        <label class="form-label">ชื่อสินค้า</label>
        <input type="text" class="form-control" name="name" [(ngModel)]="name" placeholder="ชื่อสินค้า">
      </div>
      <div class="row g-3 mb-3">
        <div class="col-md-4">
          <label class="form-label">รหัสสินค้า (SKU)</label>
          <input type="text" class="form-control" name="sku" [(ngModel)]="sku" placeholder="SKU-001">
        </div>
        <div class="col-md-4">
          <label class="form-label">ราคา</label>
          <input type="number" class="form-control" name="price" [(ngModel)]="price" placeholder="0.00">
        </div>
        <div class="col-md-4">
          <label class="form-label">จำนวนคงเหลือ</label>
          <input type="number" class="form-control" name="stock" [(ngModel)]="stock" placeholder="0">
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">หมวดหมู่</label>
        <select class="form-select" name="category" [(ngModel)]="category">
          <option value="electronics">อิเล็กทรอนิกส์</option>
          <option value="sparepart">อะไหล่</option>
          <option value="consumable">วัสดุสิ้นเปลือง</option>
          <option value="other">อื่นๆ</option>
        </select>
      </div>
      <div class="form-footer">
        <button type="submit" class="btn btn-primary">บันทึก</button>
      </div>
    </form>
  </div>
</div>
  `,
})
export class ProductCreateComponent {
  name = '';
  sku = '';
  price = 0;
  stock = 0;
  category = 'electronics';
}
