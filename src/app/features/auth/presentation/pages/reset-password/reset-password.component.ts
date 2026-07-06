import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ResetPasswordUseCase } from '../../../domain/use-cases/reset-password.use-case';
import { TablerIconComponent } from 'angular-tabler-icons';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink, TablerIconComponent],
  template: `
<div class="page page-center">
  <div class="container container-tight py-4">
    <div class="text-center mb-4">
      <a href="." class="navbar-brand navbar-brand-autodark">
        <i-tabler name="layout-dashboard" class="navbar-brand-image"></i-tabler>
        iCmon
      </a>
    </div>
    <div class="card card-md">
      <div class="card-body">
        <h2 class="h2 text-center mb-4">ตั้งค่ารหัสผ่านใหม่</h2>
        <div *ngIf="error" class="alert alert-danger mb-3">{{ error }}</div>
        <div *ngIf="success" class="alert alert-success mb-3">ตั้งค่ารหัสผ่านสำเร็จแล้ว <a routerLink="/login">เข้าสู่ระบบ</a></div>
        <form (ngSubmit)="onSubmit()" #resetForm="ngForm" autocomplete="off" novalidate>
          <div class="mb-3">
            <label class="form-label">รหัสผ่านใหม่</label>
            <div class="input-group input-group-flat">
              <input [type]="passwordVisible ? 'text' : 'password'" class="form-control" [(ngModel)]="password" name="password" placeholder="รหัสผ่านใหม่" required autocomplete="new-password">
              <span class="input-group-text">
                <a href="javascript:void(0)" class="link-secondary" title="แสดงรหัสผ่าน" (click)="togglePassword()">
                  <i-tabler [name]="passwordVisible ? 'eye-off' : 'eye'" class="icon"></i-tabler>
                </a>
              </span>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">ยืนยันรหัสผ่านใหม่</label>
            <div class="input-group input-group-flat">
              <input [type]="confirmVisible ? 'text' : 'password'" class="form-control" [(ngModel)]="confirmPassword" name="confirmPassword" placeholder="ยืนยันรหัสผ่านใหม่" required autocomplete="new-password">
              <span class="input-group-text">
                <a href="javascript:void(0)" class="link-secondary" title="แสดงรหัสผ่าน" (click)="confirmVisible = !confirmVisible">
                  <i-tabler [name]="confirmVisible ? 'eye-off' : 'eye'" class="icon"></i-tabler>
                </a>
              </span>
            </div>
          </div>
          <div class="form-footer">
            <button type="submit" class="btn btn-primary w-100" [disabled]="resetForm.invalid || loading || password !== confirmPassword">
              <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
              ตั้งค่ารหัสผ่าน
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="text-center text-secondary mt-3">
      <a routerLink="/login">กลับไปหน้าเข้าสู่ระบบ</a>
    </div>
  </div>
</div>
  `,
})
export class ResetPasswordComponent {
  private resetPasswordUseCase = inject(ResetPasswordUseCase);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  password = '';
  confirmPassword = '';
  token = '';
  loading = false;
  error = '';
  success = false;
  passwordVisible = false;
  confirmVisible = false;

  constructor() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
    });
  }

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.error = 'รหัสผ่านไม่ตรงกัน';
      return;
    }
    this.loading = true;
    this.error = '';
    this.resetPasswordUseCase.execute(this.token, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;
      },
      error: (err: any) => {
        this.loading = false;
        this.error = err.message || 'เกิดข้อผิดพลาด กรุณาลองอีกครั้ง';
      },
    });
  }
}
