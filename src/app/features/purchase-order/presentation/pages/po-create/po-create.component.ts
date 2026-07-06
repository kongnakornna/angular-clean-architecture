import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-po-create',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, RouterLink],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">สร้างใบสั่งซื้อ</h2>
      <div class="text-secondary mt-1">สร้างใบสั่งซื้อใหม่สำหรับจัดซื้อสินค้า</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <a routerLink="/purchase-orders" class="btn btn-outline-secondary">กลับ</a>
    </div>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <form>
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label">ผู้ขาย (Supplier)</label>
          <select class="form-select" name="supplierId" [(ngModel)]="supplierId">
            <option value="1">บริษัท ซัพพลายเออร์ จำกัด</option>
            <option value="2">ห้างหุ้นส่วนจำกัด โกลบอลเทรด</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label">วันที่สั่งซื้อ</label>
          <input type="date" class="form-control" name="orderDate" [(ngModel)]="orderDate">
        </div>
      </div>
      <h4 class="card-title mb-3">รายการสินค้า</h4>
      <div class="table-responsive">
        <table class="table table-vcenter">
          <thead>
            <tr><th>สินค้า</th><th class="text-end">จำนวน</th><th class="text-end">ราคาต่อหน่วย</th><th class="text-end">รวม</th><th></th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of items; let i = index">
              <td><input type="text" class="form-control" [(ngModel)]="item.name" [name]="'itemName' + i" placeholder="ชื่อสินค้า"></td>
              <td class="text-end"><input type="number" class="form-control text-end" [(ngModel)]="item.quantity" [name]="'itemQty' + i" style="width:100px"></td>
              <td class="text-end"><input type="number" class="form-control text-end" [(ngModel)]="item.unitPrice" [name]="'itemPrice' + i" style="width:120px"></td>
              <td class="text-end">{{ item.quantity * item.unitPrice | number }}</td>
              <td><button type="button" class="btn btn-sm btn-ghost-danger" (click)="removeItem(i)">ลบ</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <button type="button" class="btn btn-outline-secondary mb-3" (click)="addItem()">+ เพิ่มรายการ</button>
      <div class="form-footer">
        <button type="submit" class="btn btn-primary">สร้างใบสั่งซื้อ</button>
      </div>
    </form>
  </div>
</div>
  `,
})
export class POCreateComponent {
  supplierId = '';
  orderDate = '';
  items = [{ name: '', quantity: 1, unitPrice: 0 }];

  addItem(): void {
    this.items.push({ name: '', quantity: 1, unitPrice: 0 });
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
  }
}
