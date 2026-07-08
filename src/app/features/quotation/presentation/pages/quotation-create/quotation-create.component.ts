import { Component } from '@angular/core';
import { NgIf, NgFor, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quotation-create',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, RouterLink, DecimalPipe],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">สร้างใบเสนอราคา</h2>
      <div class="text-secondary mt-1">สร้างใบเสนอราคาใหม่สำหรับลูกค้า</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <a routerLink="/quotations" class="btn btn-outline-secondary">กลับ</a>
    </div>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <form>
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label">ลูกค้า</label>
          <select class="form-select" name="customerId" [(ngModel)]="customerId">
            <option value="1">บริษัท อิคมอน จำกัด</option>
            <option value="2">บริษัท A จำกัด</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label">วันที่</label>
          <input type="date" class="form-control" name="date" [(ngModel)]="date">
        </div>
      </div>
      <h4 class="card-title mb-3">รายการ</h4>
      <div class="table-responsive">
        <table class="table table-vcenter">
          <thead>
            <tr><th>รายการ</th><th class="text-end">จำนวน</th><th class="text-end">ราคาต่อหน่วย</th><th class="text-end">รวม</th><th></th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of items; let i = index">
              <td><input type="text" class="form-control" [(ngModel)]="item.name" [name]="'itemName' + i" placeholder="รายละเอียด"></td>
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
        <button type="submit" class="btn btn-primary">สร้างใบเสนอราคา</button>
      </div>
    </form>
  </div>
</div>
  `,
})
export class QuotationCreateComponent {
  customerId = '';
  date = '';
  items = [{ name: '', quantity: 1, unitPrice: 0 }];

  addItem(): void {
    this.items.push({ name: '', quantity: 1, unitPrice: 0 });
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
  }
}
