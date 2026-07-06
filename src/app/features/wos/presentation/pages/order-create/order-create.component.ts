import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-create',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, RouterLink],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">สร้างคำสั่งซื้อออนไลน์</h2>
      <div class="text-secondary mt-1">บันทึกคำสั่งซื้อจากช่องทางออนไลน์</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <a routerLink="/wos/orders" class="btn btn-outline-secondary">กลับ</a>
    </div>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <form>
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label">ชื่อลูกค้า</label>
          <input type="text" class="form-control" name="customerName" [(ngModel)]="customerName" placeholder="ชื่อ-นามสกุล">
        </div>
        <div class="col-md-6">
          <label class="form-label">เบอร์โทร</label>
          <input type="tel" class="form-control" name="customerPhone" [(ngModel)]="customerPhone" placeholder="เบอร์โทร">
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">ช่องทาง</label>
        <select class="form-select" name="channel" [(ngModel)]="channel">
          <option value="facebook">Facebook</option>
          <option value="line">LINE</option>
          <option value="shopee">Shopee</option>
          <option value="lazada">Lazada</option>
          <option value="website">เว็บไซต์</option>
        </select>
      </div>
      <h4 class="card-title mb-3">รายการสินค้า</h4>
      <div class="table-responsive">
        <table class="table table-vcenter">
          <thead>
            <tr><th>สินค้า</th><th class="text-end">จำนวน</th><th class="text-end">ราคา</th><th></th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of items; let i = index">
              <td><input type="text" class="form-control" [(ngModel)]="item.name" [name]="'itemName' + i" placeholder="ชื่อสินค้า"></td>
              <td class="text-end"><input type="number" class="form-control text-end" [(ngModel)]="item.quantity" [name]="'itemQty' + i" style="width:80px"></td>
              <td class="text-end"><input type="number" class="form-control text-end" [(ngModel)]="item.price" [name]="'itemPrice' + i" style="width:120px"></td>
              <td><button type="button" class="btn btn-sm btn-ghost-danger" (click)="removeItem(i)">ลบ</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <button type="button" class="btn btn-outline-secondary mb-3" (click)="addItem()">+ เพิ่มรายการ</button>
      <div class="mb-3">
        <label class="form-label">ที่อยู่จัดส่ง</label>
        <textarea class="form-control" name="shippingAddress" [(ngModel)]="shippingAddress" rows="3" placeholder="ที่อยู่จัดส่ง"></textarea>
      </div>
      <div class="form-footer">
        <button type="submit" class="btn btn-primary">สร้างคำสั่งซื้อ</button>
      </div>
    </form>
  </div>
</div>
  `,
})
export class OrderCreateComponent {
  customerName = '';
  customerPhone = '';
  channel = 'line';
  shippingAddress = '';
  items = [{ name: '', quantity: 1, price: 0 }];

  addItem(): void {
    this.items.push({ name: '', quantity: 1, price: 0 });
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
  }
}
