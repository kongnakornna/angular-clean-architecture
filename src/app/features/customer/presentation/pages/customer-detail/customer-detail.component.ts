import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, TablerIconComponent, TranslatePipe],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">{{ 'customer.detail' | translate }}</h2>
      <div class="text-secondary mt-1">JC-2026-001</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <a routerLink="/customers" class="btn btn-outline-secondary me-2">{{ 'customer.back' | translate }}</a>
      <a routerLink="/customers/1/edit" class="btn btn-primary">{{ 'customer.edit' | translate }}</a>
    </div>
  </div>
</div>
<div class="row g-3">
  <div class="col-md-4">
    <div class="card">
      <div class="card-body text-center">
        <div class="avatar avatar-xl mb-3 bg-primary-lt">
          <i-tabler name="user" class="icon"></i-tabler>
        </div>
        <h3 class="card-title mb-1">{{ customer.name }}</h3>
        <div class="text-secondary mb-2">{{ customer.email }}</div>
        <div class="text-secondary">{{ customer.phone }}</div>
      </div>
    </div>
  </div>
  <div class="col-md-8">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">{{ 'customer.contactInfo' | translate }}</h3>
      </div>
      <div class="card-body">
        <div class="datagrid">
          <div class="datagrid-item">
            <div class="datagrid-title">{{ 'customer.fullName' | translate }}</div>
            <div class="datagrid-content">{{ customer.name }}</div>
          </div>
          <div class="datagrid-item">
            <div class="datagrid-title">{{ 'customer.email' | translate }}</div>
            <div class="datagrid-content">{{ customer.email }}</div>
          </div>
          <div class="datagrid-item">
            <div class="datagrid-title">{{ 'customer.phone' | translate }}</div>
            <div class="datagrid-content">{{ customer.phone }}</div>
          </div>
          <div class="datagrid-item">
            <div class="datagrid-title">{{ 'customer.address' | translate }}</div>
            <div class="datagrid-content">{{ customer.address }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        <h3 class="card-title">{{ 'customer.jobHistory' | translate }}</h3>
      </div>
      <div class="table-responsive">
        <table class="table table-vcenter card-table">
          <thead>
            <tr><th>{{ 'customer.jobNumber' | translate }}</th><th>{{ 'customer.date' | translate }}</th><th>{{ 'customer.status' | translate }}</th><th></th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let job of jobHistory">
              <td><a [routerLink]="['/jobs', job.id]" class="text-reset">{{ job.jobNumber }}</a></td>
              <td>{{ job.date }}</td>
              <td><span class="badge bg-green">{{ job.status }}</span></td>
              <td><a [routerLink]="['/jobs', job.id]" class="btn btn-sm btn-primary">{{ 'customer.view' | translate }}</a></td>
            </tr>
            <tr *ngIf="jobHistory.length === 0">
              <td colspan="4" class="text-center text-secondary py-4">{{ 'customer.noHistory' | translate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  `,
})
export class CustomerDetailComponent {
  customer = { name: 'บริษัท อิคมอน จำกัด', email: 'info@icmon.co.th', phone: '02-123-4567', address: '89 ถ.พระราม 9 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพฯ 10310' };
  jobHistory = [
    { id: 1, jobNumber: 'JC-2026-001', date: '01/01/2026', status: 'completed' },
    { id: 2, jobNumber: 'JC-2026-015', date: '15/02/2026', status: 'in_progress' },
  ];
}
