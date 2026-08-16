import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { CreateUserUseCase } from '../../../domain/use-cases/create-user.use-case';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink, TranslatePipe],
  template: `
<div class="page-header d-print-none">
  <div class="container-xl">
    <div class="row g-2 align-items-center">
      <div class="col">
        <div class="page-pretitle">{{ 'user.title' | translate }}</div>
        <h2 class="page-title">{{ 'user.createTitle' | translate }}</h2>
      </div>
    </div>
  </div>
</div>
<div class="page-body">
  <div class="container-xl">
    <div class="card">
      <div class="card-body">
        <form (ngSubmit)="onSubmit()" #userForm="ngForm" autocomplete="off" novalidate>
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label required">{{ 'user.username' | translate }}</label>
              <input type="text" class="form-control" [(ngModel)]="model.username" name="username" required minlength="3">
            </div>
            <div class="col-md-6">
              <label class="form-label required">{{ 'user.email' | translate }}</label>
              <input type="email" class="form-control" [(ngModel)]="model.email" name="email" required email>
            </div>
            <div class="col-md-6">
              <label class="form-label required">{{ 'user.role' | translate }}</label>
              <select class="form-select" [(ngModel)]="model.roleId" name="roleId" required>
                <option value="">{{ 'user.selectRole' | translate }}</option>
                <option [value]="1">Admin</option>
                <option [value]="2">Manager</option>
                <option [value]="3">Staff</option>
                <option [value]="4">Technician</option>
                <option [value]="5">Customer</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">{{ 'user.fullName' | translate }}</label>
              <input type="text" class="form-control" [(ngModel)]="model.fullName" name="fullName">
            </div>
            <div class="col-md-6">
              <label class="form-label">{{ 'user.firstName' | translate }}</label>
              <input type="text" class="form-control" [(ngModel)]="model.firstName" name="firstName">
            </div>
            <div class="col-md-6">
              <label class="form-label">{{ 'user.lastName' | translate }}</label>
              <input type="text" class="form-control" [(ngModel)]="model.lastName" name="lastName">
            </div>
            <div class="col-md-6">
              <label class="form-label">{{ 'user.mobileNumber' | translate }}</label>
              <input type="text" class="form-control" [(ngModel)]="model.mobileNumber" name="mobileNumber">
            </div>
            <div class="col-md-6">
              <label class="form-label">{{ 'user.phoneNumber' | translate }}</label>
              <input type="text" class="form-control" [(ngModel)]="model.phoneNumber" name="phoneNumber">
            </div>
            <div class="col-md-6">
              <label class="form-label">{{ 'user.lineId' | translate }}</label>
              <input type="text" class="form-control" [(ngModel)]="model.lineId" name="lineId">
            </div>
            <div class="col-md-6">
              <label class="form-label">{{ 'user.locationId' | translate }}</label>
              <input type="text" class="form-control" [(ngModel)]="model.locationId" name="locationId">
            </div>
            <div class="col-md-6">
              <label class="form-label required">{{ 'user.password' | translate }}</label>
              <input type="password" class="form-control" [(ngModel)]="model.password" name="password" required minlength="8">
            </div>
            <div class="col-md-6">
              <label class="form-label required">{{ 'user.confirmPassword' | translate }}</label>
              <input type="password" class="form-control" [(ngModel)]="model.confirmPassword" name="confirmPassword" required minlength="8">
            </div>
          </div>
          <div *ngIf="error" class="alert alert-danger mt-3 mb-0 py-2">{{ error }}</div>
          <div class="form-footer">
            <a routerLink="/users" class="btn btn-ghost me-2">{{ 'user.cancel' | translate }}</a>
            <button type="submit" class="btn btn-primary" [disabled]="userForm.invalid || loading">
              <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
              {{ 'user.save' | translate }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
  `,
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent {
  private createUserUC = inject(CreateUserUseCase);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  loading = false;
  error = '';

  model = {
    username: '',
    email: '',
    roleId: 0,
    fullName: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
    phoneNumber: '',
    lineId: '',
    locationId: '',
    password: '',
    confirmPassword: '',
  };

  onSubmit(): void {
    if (this.model.password !== this.model.confirmPassword) {
      this.error = 'Password and confirm password do not match';
      return;
    }
    this.loading = true;
    this.error = '';
    this.createUserUC
      .execute({
        username: this.model.username,
        email: this.model.email,
        password: this.model.password,
        confirmPassword: this.model.confirmPassword,
        roleId: Number(this.model.roleId),
        fullName: this.model.fullName,
        firstName: this.model.firstName,
        lastName: this.model.lastName,
        mobileNumber: this.model.mobileNumber,
        phoneNumber: this.model.phoneNumber,
        lineId: this.model.lineId,
        locationId: this.model.locationId,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/users']);
        },
        error: (err) => {
          this.loading = false;
          this.error = err?.message || 'Failed to create user';
        },
      });
  }
}
