import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-payment-detail',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, TablerIconComponent, TranslatePipe],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">{{ 'payment.detail' | translate }}</h2>
      <div class="text-secondary mt-1">{{ payment.reference }}</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <a routerLink="/payments" class="btn btn-outline-secondary me-2">{{ 'payment.back' | translate }}</a>
      <a [routerLink]="['/invoices', payment.invoiceId]" class="btn btn-primary">
        <i-tabler name="file-text" class="icon"></i-tabler> {{ 'payment.viewInvoice' | translate }}
      </a>
    </div>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <div class="datagrid">
      <div class="datagrid-item">
        <div class="datagrid-title">{{ 'payment.reference' | translate }}</div>
        <div class="datagrid-content">{{ payment.reference }}</div>
      </div>
      <div class="datagrid-item">
        <div class="datagrid-title">{{ 'payment.customer' | translate }}</div>
        <div class="datagrid-content">{{ payment.customer }}</div>
      </div>
      <div class="datagrid-item">
        <div class="datagrid-title">{{ 'payment.amount' | translate }}</div>
        <div class="datagrid-content h2 mb-0">{{ payment.amount }}</div>
      </div>
      <div class="datagrid-item">
        <div class="datagrid-title">{{ 'payment.paymentDate' | translate }}</div>
        <div class="datagrid-content">{{ payment.date }}</div>
      </div>
      <div class="datagrid-item">
        <div class="datagrid-title">{{ 'payment.channel' | translate }}</div>
        <div class="datagrid-content">{{ payment.channel }}</div>
      </div>
      <div class="datagrid-item">
        <div class="datagrid-title">{{ 'payment.status' | translate }}</div>
        <div class="datagrid-content">
          <span class="badge bg-green">{{ payment.status }}</span>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  styleUrls: ['./payment-detail.component.scss'],
})
export class PaymentDetailComponent {
  payment = { reference: 'PAY-2026-001', customer: 'บริษัท อิคมอน จำกัด', amount: '฿15,000', date: '01/04/2026', channel: 'โอนเงิน', status: 'ชำระแล้ว', invoiceId: 1 };
}
