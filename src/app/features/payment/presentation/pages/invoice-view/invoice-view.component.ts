import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-invoice-view',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">ใบแจ้งหนี้</h2>
      <div class="text-secondary mt-1">{{ invoice.number }}</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <a routerLink="/payments" class="btn btn-outline-secondary me-2">กลับ</a>
      <button class="btn btn-primary">พิมพ์</button>
    </div>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <div class="row mb-4">
      <div class="col-6">
        <h3>iCmon</h3>
        <div class="text-secondary">89 ถ.พระราม 9 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพฯ 10310</div>
        <div class="text-secondary">โทร: 02-123-4567</div>
      </div>
      <div class="col-6 text-end">
        <h4>ใบแจ้งหนี้</h4>
        <div class="text-secondary">เลขที่: {{ invoice.number }}</div>
        <div class="text-secondary">วันที่: {{ invoice.date }}</div>
        <div class="text-secondary">ครบกำหนด: {{ invoice.dueDate }}</div>
      </div>
    </div>
    <div class="mb-3">
      <strong>ลูกค้า:</strong>
      <div>{{ invoice.customer }}</div>
    </div>
    <table class="table table-vcenter">
      <thead>
        <tr><th>รายการ</th><th class="text-end">จำนวน</th><th class="text-end">ราคา</th><th class="text-end">รวม</th></tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of invoice.items">
          <td>{{ item.description }}</td>
          <td class="text-end">{{ item.quantity }}</td>
          <td class="text-end">{{ item.unitPrice }}</td>
          <td class="text-end">{{ item.total }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr><td colspan="3" class="text-end fw-bold">รวมทั้งสิ้น</td><td class="text-end fw-bold">{{ invoice.grandTotal }}</td></tr>
      </tfoot>
    </table>
    <div *ngIf="invoice.status === 'pending'" class="mt-3">
      <span class="badge bg-yellow">รอชำระเงิน</span>
    </div>
    <div *ngIf="invoice.status === 'paid'" class="mt-3">
      <span class="badge bg-green">ชำระแล้ว</span>
    </div>
  </div>
</div>
  `,
})
export class InvoiceViewComponent {
  invoice = {
    number: 'INV-2026-001',
    date: '01/04/2026',
    dueDate: '15/04/2026',
    customer: 'บริษัท อิคมอน จำกัด',
    status: 'pending',
    items: [
      { description: 'ค่าบริการซ่อมคอมพิวเตอร์ PC-001', quantity: 1, unitPrice: '฿5,000', total: '฿5,000' },
      { description: 'อะไหล่ - ฮาร์ดดิสก์ 500GB', quantity: 1, unitPrice: '฿2,500', total: '฿2,500' },
      { description: 'ค่าแรง', quantity: 2, unitPrice: '฿500', total: '฿1,000' },
    ],
    grandTotal: '฿8,500',
  };
}
