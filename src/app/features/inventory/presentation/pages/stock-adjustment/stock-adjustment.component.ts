import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stock-adjustment',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">ปรับสต็อกสินค้า</h2>
      <div class="text-secondary mt-1">ปรับปรุงจำนวนสินค้าคงคลัง</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <a routerLink="/products/1" class="btn btn-outline-secondary">กลับ</a>
    </div>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <div class="mb-3">
      <div class="datagrid">
        <div class="datagrid-item">
          <div class="datagrid-title">สินค้า</div>
          <div class="datagrid-content">Laptop HP ProBook 450</div>
        </div>
        <div class="datagrid-item">
          <div class="datagrid-title">SKU</div>
          <div class="datagrid-content">NB-HP-001</div>
        </div>
        <div class="datagrid-item">
          <div class="datagrid-title">สต็อกปัจจุบัน</div>
          <div class="datagrid-content">5</div>
        </div>
      </div>
    </div>
    <form>
      <div class="mb-3">
        <label class="form-label">ประเภทการปรับ</label>
        <select class="form-select" name="adjustType" [(ngModel)]="adjustType">
          <option value="เพิ่ม">เพิ่มสต็อก</option>
          <option value="ลด">ลดสต็อก</option>
          <option value="ตั้งค่า">ตั้งค่าใหม่</option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">จำนวน</label>
        <input type="number" class="form-control" name="quantity" [(ngModel)]="quantity" placeholder="0">
      </div>
      <div class="mb-3">
        <label class="form-label">เหตุผล</label>
        <textarea class="form-control" name="reason" [(ngModel)]="reason" rows="3" placeholder="ระบุเหตุผลในการปรับสต็อก"></textarea>
      </div>
      <div class="form-footer">
        <button type="submit" class="btn btn-primary">บันทึกการปรับสต็อก</button>
      </div>
    </form>
  </div>
</div>
  `,
})
export class StockAdjustmentComponent {
  adjustType = 'เพิ่ม';
  quantity = 0;
  reason = '';
}
