import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, TranslatePipe],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">{{ 'wos.detail' | translate }}</h2>
      <div class="text-secondary mt-1">{{ order.number }}</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <a routerLink="/wos/orders" class="btn btn-outline-secondary me-2">{{ 'wos.back' | translate }}</a>
      <span class="badge bg-blue ms-2">{{ order.status }}</span>
    </div>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <div class="datagrid">
      <div class="datagrid-item">
        <div class="datagrid-title">{{ 'wos.orderNumber' | translate }}</div>
        <div class="datagrid-content">{{ order.number }}</div>
      </div>
      <div class="datagrid-item">
        <div class="datagrid-title">{{ 'wos.customer' | translate }}</div>
        <div class="datagrid-content">{{ order.customerName }}</div>
      </div>
      <div class="datagrid-item">
        <div class="datagrid-title">{{ 'wos.phone' | translate }}</div>
        <div class="datagrid-content">{{ order.customerPhone }}</div>
      </div>
      <div class="datagrid-item">
        <div class="datagrid-title">{{ 'wos.channel' | translate }}</div>
        <div class="datagrid-content">{{ order.channel }}</div>
      </div>
      <div class="datagrid-item">
        <div class="datagrid-title">{{ 'wos.orderDate' | translate }}</div>
        <div class="datagrid-content">{{ order.orderDate }}</div>
      </div>
      <div class="datagrid-item">
        <div class="datagrid-title">{{ 'wos.status' | translate }}</div>
        <div class="datagrid-content">
          <span class="badge" [class.bg-yellow]="order.status === ('wos.statusPending' | translate)" [class.bg-blue]="order.status === ('wos.statusShipping' | translate)" [class.bg-green]="order.status === ('wos.statusDelivered' | translate)" [class.bg-red]="order.status === ('wos.statusCancelled' | translate)">{{ order.status }}</span>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="card mt-3">
  <div class="card-header"><h3 class="card-title">{{ 'wos.items' | translate }}</h3></div>
  <div class="table-responsive">
    <table class="table table-vcenter card-table">
      <thead>
        <tr><th>{{ 'wos.product' | translate }}</th><th class="text-end">{{ 'wos.quantity' | translate }}</th><th class="text-end">{{ 'wos.price' | translate }}</th><th class="text-end">{{ 'wos.total' | translate }}</th></tr>
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
        <tr><td colspan="3" class="text-end fw-bold">{{ 'wos.grandTotal' | translate }}</td><td class="text-end fw-bold">{{ order.grandTotal }}</td></tr>
      </tfoot>
    </table>
  </div>
</div>
<div class="card mt-3">
  <div class="card-header"><h3 class="card-title">{{ 'wos.deliveryAddress' | translate }}</h3></div>
  <div class="card-body">
    <p>{{ order.shippingAddress }}</p>
  </div>
</div>
  `,
  styleUrls: ['./order-detail.component.scss'],
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
