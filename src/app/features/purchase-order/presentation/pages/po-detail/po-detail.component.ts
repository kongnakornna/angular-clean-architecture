import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-po-detail',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">รายละเอียดใบสั่งซื้อ</h2>
      <div class="text-secondary mt-1">{{ po.number }}</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <a routerLink="/purchase-orders" class="btn btn-outline-secondary me-2">กลับ</a>
      <span class="badge bg-blue ms-2">{{ po.status }}</span>
    </div>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <div class="datagrid">
      <div class="datagrid-item">
        <div class="datagrid-title">เลขที่ใบสั่งซื้อ</div>
        <div class="datagrid-content">{{ po.number }}</div>
      </div>
      <div class="datagrid-item">
        <div class="datagrid-title">ผู้ขาย</div>
        <div class="datagrid-content">{{ po.supplier }}</div>
      </div>
      <div class="datagrid-item">
        <div class="datagrid-title">วันที่สั่งซื้อ</div>
        <div class="datagrid-content">{{ po.orderDate }}</div>
      </div>
      <div class="datagrid-item">
        <div class="datagrid-title">สถานะ</div>
        <div class="datagrid-content">
          <span class="badge" [class.bg-yellow]="po.status === 'รออนุมัติ'" [class.bg-green]="po.status === 'อนุมัติแล้ว'" [class.bg-blue]="po.status === 'ส่งมอบแล้ว'">{{ po.status }}</span>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="card mt-3">
  <div class="card-header"><h3 class="card-title">รายการสินค้า</h3></div>
  <div class="table-responsive">
    <table class="table table-vcenter card-table">
      <thead>
        <tr><th>รายการ</th><th class="text-end">จำนวน</th><th class="text-end">ราคาต่อหน่วย</th><th class="text-end">รวม</th></tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of po.items">
          <td>{{ item.name }}</td>
          <td class="text-end">{{ item.quantity }}</td>
          <td class="text-end">{{ item.unitPrice }}</td>
          <td class="text-end">{{ item.total }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr><td colspan="3" class="text-end fw-bold">รวมทั้งสิ้น</td><td class="text-end fw-bold">{{ po.grandTotal }}</td></tr>
      </tfoot>
    </table>
  </div>
</div>
  `,
})
export class PODetailComponent {
  po = {
    number: 'PO-2026-001',
    supplier: 'บริษัท ซัพพลายเออร์ จำกัด',
    orderDate: '01/04/2026',
    status: 'รออนุมัติ',
    items: [
      { name: 'Laptop HP ProBook 450', quantity: 2, unitPrice: '฿25,000', total: '฿50,000' },
      { name: 'ฮาร์ดดิสก์ 500GB', quantity: 10, unitPrice: '฿2,500', total: '฿25,000' },
    ],
    grandTotal: '฿75,000',
  };
}
