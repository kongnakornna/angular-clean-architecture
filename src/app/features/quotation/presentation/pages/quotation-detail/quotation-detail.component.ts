import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quotation-detail',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">รายละเอียดใบเสนอราคา</h2>
      <div class="text-secondary mt-1">{{ quotation.number }}</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <a routerLink="/quotations" class="btn btn-outline-secondary me-2">กลับ</a>
      <button class="btn btn-success me-2">อนุมัติ</button>
      <button class="btn btn-outline-danger">ปฏิเสธ</button>
    </div>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <div class="datagrid">
      <div class="datagrid-item">
        <div class="datagrid-title">เลขที่</div>
        <div class="datagrid-content">{{ quotation.number }}</div>
      </div>
      <div class="datagrid-item">
        <div class="datagrid-title">ลูกค้า</div>
        <div class="datagrid-content">{{ quotation.customer }}</div>
      </div>
      <div class="datagrid-item">
        <div class="datagrid-title">วันที่</div>
        <div class="datagrid-content">{{ quotation.date }}</div>
      </div>
      <div class="datagrid-item">
        <div class="datagrid-title">สถานะ</div>
        <div class="datagrid-content">
          <span class="badge" [class.bg-yellow]="quotation.status === 'pending'" [class.bg-green]="quotation.status === 'approved'" [class.bg-red]="quotation.status === 'rejected'">{{ quotation.statusLabel }}</span>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="card mt-3">
  <div class="card-header"><h3 class="card-title">รายการสินค้า/บริการ</h3></div>
  <div class="table-responsive">
    <table class="table table-vcenter card-table">
      <thead>
        <tr><th>รายการ</th><th class="text-end">จำนวน</th><th class="text-end">ราคาต่อหน่วย</th><th class="text-end">รวม</th></tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of quotation.items">
          <td>{{ item.name }}</td>
          <td class="text-end">{{ item.quantity }}</td>
          <td class="text-end">{{ item.unitPrice }}</td>
          <td class="text-end">{{ item.total }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr><td colspan="3" class="text-end fw-bold">รวมทั้งสิ้น</td><td class="text-end fw-bold">{{ quotation.grandTotal }}</td></tr>
      </tfoot>
    </table>
  </div>
</div>
<div class="card mt-3">
  <div class="card-body d-flex gap-2">
    <button class="btn btn-success"><i-tabler name="check" class="icon"></i> อนุมัติ</button>
    <button class="btn btn-outline-danger"><i-tabler name="x" class="icon"></i> ปฏิเสธ</button>
  </div>
</div>
  `,
})
export class QuotationDetailComponent {
  quotation = {
    number: 'QT-2026-001',
    customer: 'บริษัท อิคมอน จำกัด',
    date: '01/04/2026',
    status: 'pending',
    statusLabel: 'รออนุมัติ',
    items: [
      { name: 'ค่าบริการซ่อมคอมพิวเตอร์', quantity: 1, unitPrice: '฿5,000', total: '฿5,000' },
      { name: 'อะไหล่ - ฮาร์ดดิสก์ 500GB', quantity: 1, unitPrice: '฿2,500', total: '฿2,500' },
      { name: 'ค่าแรงช่างเทคนิค (2 ชม.)', quantity: 2, unitPrice: '฿500', total: '฿1,000' },
    ],
    grandTotal: '฿8,500',
  };
}
