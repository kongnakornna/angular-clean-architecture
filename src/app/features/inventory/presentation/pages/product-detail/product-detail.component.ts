import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">รายละเอียดสินค้า</h2>
      <div class="text-secondary mt-1">{{ product.name }}</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <a routerLink="/products" class="btn btn-outline-secondary me-2">กลับ</a>
      <a routerLink="/products/1/edit" class="btn btn-primary">แก้ไข</a>
    </div>
  </div>
</div>
<div class="row g-3">
  <div class="col-md-4">
    <div class="card">
      <div class="card-body">
        <div class="datagrid">
          <div class="datagrid-item">
            <div class="datagrid-title">ชื่อสินค้า</div>
            <div class="datagrid-content">{{ product.name }}</div>
          </div>
          <div class="datagrid-item">
            <div class="datagrid-title">SKU</div>
            <div class="datagrid-content">{{ product.sku }}</div>
          </div>
          <div class="datagrid-item">
            <div class="datagrid-title">ราคา</div>
            <div class="datagrid-content">{{ product.price }}</div>
          </div>
          <div class="datagrid-item">
            <div class="datagrid-title">จำนวนคงเหลือ</div>
            <div class="datagrid-content">
              <span class="badge" [class.bg-green]="product.stock > 10" [class.bg-yellow]="product.stock <= 10 && product.stock > 0" [class.bg-red]="product.stock === 0">{{ product.stock }}</span>
            </div>
          </div>
          <div class="datagrid-item">
            <div class="datagrid-title">หมวดหมู่</div>
            <div class="datagrid-content">{{ product.category }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header"><h3 class="card-title">การปรับสต็อก</h3></div>
      <div class="card-body">
        <a routerLink="/products/1/stock-adjust" class="btn btn-outline-primary w-100">ปรับสต็อก</a>
      </div>
    </div>
  </div>
  <div class="col-md-8">
    <div class="card">
      <div class="card-header"><h3 class="card-title">ประวัติการเคลื่อนไหว</h3></div>
      <div class="table-responsive">
        <table class="table table-vcenter card-table">
          <thead>
            <tr><th>วันที่</th><th>ประเภท</th><th>จำนวน</th><th>คงเหลือ</th><th>หมายเหตุ</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let m of movements">
              <td>{{ m.date }}</td>
              <td><span class="badge" [class.bg-green]="m.type === 'รับเข้า'" [class.bg-red]="m.type === 'เบิกออก'" [class.bg-yellow]="m.type === 'ปรับปรุง'">{{ m.type }}</span></td>
              <td>{{ m.quantity }}</td>
              <td>{{ m.balance }}</td>
              <td>{{ m.note }}</td>
            </tr>
            <tr *ngIf="movements.length === 0">
              <td colspan="5" class="text-center text-secondary py-4">ไม่พบประวัติการเคลื่อนไหว</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  `,
})
export class ProductDetailComponent {
  product = { name: 'Laptop HP ProBook 450', sku: 'NB-HP-001', price: '฿25,000', stock: 5, category: 'อิเล็กทรอนิกส์' };
  movements = [
    { date: '01/04/2026', type: 'รับเข้า', quantity: '+10', balance: 15, note: 'จัดซื้อจาก HP' },
    { date: '28/03/2026', type: 'เบิกออก', quantity: '-3', balance: 5, note: 'เบิกใช้งานแผนกซ่อม' },
    { date: '25/03/2026', type: 'ปรับปรุง', quantity: '-2', balance: 8, note: 'นับสต็อกพบขาด' },
  ];
}
