import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-payment-create',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink, TranslatePipe],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">{{ 'payment.createTitle' | translate }}</h2>
      <div class="text-secondary mt-1">{{ 'payment.createSubtitle' | translate }}</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <a routerLink="/payments" class="btn btn-outline-secondary">{{ 'payment.back' | translate }}</a>
    </div>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <form>
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label">{{ 'payment.customer' | translate }}</label>
          <select class="form-select" name="customerId" [(ngModel)]="customerId">
            <option value="1">บริษัท อิคมอน จำกัด</option>
            <option value="2">บริษัท A จำกัด</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label">{{ 'payment.amount' | translate }}</label>
          <input type="number" class="form-control" name="amount" [(ngModel)]="amount" placeholder="0.00">
        </div>
      </div>
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label">{{ 'payment.paymentDate' | translate }}</label>
          <input type="date" class="form-control" name="paymentDate" [(ngModel)]="paymentDate">
        </div>
        <div class="col-md-6">
          <label class="form-label">{{ 'payment.channel' | translate }}</label>
          <select class="form-select" name="channel" [(ngModel)]="channel">
            <option value="transfer">โอนเงิน</option>
            <option value="cash">เงินสด</option>
            <option value="credit">บัตรเครดิต</option>
            <option value="cheque">เช็ค</option>
          </select>
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">{{ 'payment.note' | translate }}</label>
        <textarea class="form-control" name="note" [(ngModel)]="note" rows="3"></textarea>
      </div>
      <div class="form-footer">
        <button type="submit" class="btn btn-primary">{{ 'payment.save' | translate }}</button>
      </div>
    </form>
  </div>
</div>
  `,
})
export class PaymentCreateComponent {
  customerId = '';
  amount = 0;
  paymentDate = '';
  channel = 'transfer';
  note = '';
}
