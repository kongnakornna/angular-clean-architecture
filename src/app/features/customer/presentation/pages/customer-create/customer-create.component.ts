import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-customer-create',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink, TranslatePipe],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">{{ 'customer.createTitle' | translate }}</h2>
      <div class="text-secondary mt-1">{{ 'customer.createSubtitle' | translate }}</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <a routerLink="/customers" class="btn btn-outline-secondary">{{ 'customer.back' | translate }}</a>
    </div>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <form>
      <div class="mb-3">
        <label class="form-label">{{ 'customer.companyName' | translate }}</label>
        <input type="text" class="form-control" name="companyName" [(ngModel)]="companyName" [placeholder]="'customer.companyNamePlaceholder' | translate">
      </div>
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label">{{ 'customer.email' | translate }}</label>
          <input type="email" class="form-control" name="email" [(ngModel)]="email" placeholder="email@company.com">
        </div>
        <div class="col-md-6">
          <label class="form-label">{{ 'customer.phone' | translate }}</label>
          <input type="tel" class="form-control" name="phone" [(ngModel)]="phone" placeholder="02-123-4567">
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">{{ 'customer.address' | translate }}</label>
        <textarea class="form-control" name="address" [(ngModel)]="address" rows="3" [placeholder]="'customer.addressPlaceholder' | translate"></textarea>
      </div>
      <div class="form-footer">
        <button type="submit" class="btn btn-primary">{{ 'customer.save' | translate }}</button>
      </div>
    </form>
  </div>
</div>
  `,
})
export class CustomerCreateComponent {
  companyName = '';
  email = '';
  phone = '';
  address = '';
}
