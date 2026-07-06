import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ListCustomersUseCase } from '../../../domain/use-cases/list-customers.use-case';
import { Customer } from '../../../domain/entities/customer.entity';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="page-header d-print-none">
      <div class="row align-items-center">
        <div class="col">
          <h2 class="page-title">รายการลูกค้า</h2>
          <div class="text-muted mt-1">จัดการข้อมูลลูกค้าทั้งหมด</div>
        </div>
        <div class="col-auto ms-auto d-print-none">
          <a routerLink="/customers/create" class="btn btn-primary">+ เพิ่มลูกค้า</a>
        </div>
      </div>
    </div>
    <div class="card mb-3">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-4">
            <input type="text" class="form-control" [(ngModel)]="searchTerm" placeholder="ค้นหาชื่อ, เบอร์โทร, อีเมล...">
          </div>
          <div class="col-md-2">
            <button class="btn btn-primary me-2" (click)="search()">ค้นหา</button>
            <button class="btn btn-outline-secondary" (click)="searchTerm = ''; search()">รีเซ็ต</button>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div *ngIf="loading$ | async" class="text-center py-5"><div class="spinner-border text-primary"></div></div>
      <div *ngIf="!(loading$ | async)" class="table-responsive">
        <table class="table table-vcenter card-table">
          <thead>
            <tr><th>รหัส</th><th>ชื่อบริษัท</th><th>เบอร์โทร</th><th>อีเมล</th><th>จังหวัด</th><th class="w-1"></th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let c of (customers$ | async)">
              <td>{{ c.code }}</td>
              <td><a [routerLink]="['/customers', c.id]" class="text-reset">{{ c.companyName }}</a></td>
              <td>{{ c.phone }}</td>
              <td>{{ c.email }}</td>
              <td>{{ c.province }}</td>
              <td><a [routerLink]="['/customers', c.id]" class="btn btn-sm btn-primary">ดู</a></td>
            </tr>
            <tr *ngIf="(customers$ | async)?.length === 0"><td colspan="6" class="text-center text-muted py-4">ไม่พบข้อมูลลูกค้า</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class CustomerListComponent implements OnInit {

  private customersSubject = new BehaviorSubject<Customer[]>([]);
  customers$ = this.customersSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  searchTerm = '';

  constructor(private listCustomersUseCase: ListCustomersUseCase) {}

  ngOnInit(): void { this.loadCustomers(); }

  loadCustomers(): void {
    this.loadingSubject.next(true);
    const params: any = {};
    if (this.searchTerm) params.search = this.searchTerm;
    this.listCustomersUseCase.execute(params).subscribe({
      next: (res) => { this.customersSubject.next(res.data); this.loadingSubject.next(false); },
      error: () => this.loadingSubject.next(false),
    });
  }

  search(): void { this.loadCustomers(); }
}
