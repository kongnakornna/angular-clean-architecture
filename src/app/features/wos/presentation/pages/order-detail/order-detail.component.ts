import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">รายละเอียดคำสั่งซื้อ</h2>
      <div class="text-secondary mt-1">{{ order.number }}</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <a routerLink="/wos/orders" class="btn btn-outline-secondary me-2">กลับ</a>
      <span class="badge bg-blue ms-2">{{ order.status }}</span>
    </div>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <div class="datagrid">
      <div class="datagrid-item">
        <div class="datagrid-title">เลขที่คำสั่งซื้อ</div>
        <div class="datagrid-content">{{ order.number }}</div>
      </div>
      <div class="datagrid-item">
        <div class="datagrid-title">ลูกค้า</div>
        <div class="datagrid-content">{{ order.customerName }}</div>
      </div>
      <div class="datagrid-item">
        <div class="datagrid-title">เบอร์โทร</div>
        <div class="datagrid-content">{{ order.customerPhone }}</div>
      </div>
      <div class="datagrid-item">
        <div class="datagrid-title">ช่องทาง</div>
        <div class="datagrid-content">{{ order.channel }}</div>
      </div>
      <div class="datagrid-item">
        <div class="datagrid-title">วันที่สั่งซื้อ</div>
        <div class="datagrid-content">{{ order.orderDate }}</div>
      </div>
      <div class="datagrid-item">
        <div class="datagrid-title">สถานะ</div>
        <div class="datagrid-content">
          <span class="badge" [class.bg-yellow]="order.status === 'รอดำเนินการ'" [class.bg-blue]="order.status === 'กำลังจัดส่ง'" [class.bg-green]="order.status === 'จัดส่งแล้ว'" [class.bg-red]="order.status === 'ยกเลิก'">{{ order.status }}</span>
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
        <tr><th>สินค้า</th><th class="text-end">จำนวน</th><th class="text-end">ราคา</th><th class="text-end">รวม</th></tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of order.items">
          <td>{{ item.name }}</td>
          <td class="text-end">{{ item.quantity }}</td>
          <td class="text-end">{{ item.price }}</td>
          <td class="text-end">{{ item.total }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr><td colspan="3" class="text-end fw-bold">รวมทั้งสิ้น</td><td class="text-end fw-bold">{{ order.grandTotal }}</td></tr>
      </tfoot>
    </table>
  </div>
</div>
<div class="card mt-3">
  <div class="card-header"><h3 class="card-title">ที่อยู่จัดส่ง</h3></div>
  <div class="card-body">
    <p>{{ order.shippingAddress }}</p>
  </div>
</div>
  `,
})
export class OrderDetailComponent {
  order = {
    number: 'WO-2026-001',
    customerName: 'สมชาย ใจดี',
    customerPhone: '08X-XXX-XXXX',
    channel: 'LINE',
    orderDate: '01/04/2026',
    status: 'กำลังจัดส่ง',
    shippingAddress: '89 ถ.พระราม 9 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพฯ 10310',
    items: [
      { name: 'สินค้า A', quantity: 2, price: '฿500', total: '฿1,000' },
      { name: 'สินค้า B', quantity: 1, price: '฿300', total: '฿300' },
    ],
    grandTotal: '฿1,300',
  };
}
