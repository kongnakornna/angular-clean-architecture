import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  template: `
    <div class="page page-center">
      <div class="container-tight py-4">
        <div class="card card-md">
          <div class="card-body">
            <h2 class="h2 text-center mb-4">ลืมรหัสผ่าน</h2>
            <p class="text-muted mb-4">กรุณากรอกอีเมลของคุณ ระบบจะส่งลิงก์รีเซ็ตรหัสผ่านให้คุณ</p>
            <form (ngSubmit)="onSubmit()">
              <div class="mb-3">
                <input type="email" class="form-control" [(ngModel)]="email" name="email" required placeholder="your@email.com">
              </div>
              <div class="form-footer">
                <button type="submit" class="btn btn-primary w-100" [disabled]="submitted">
                  <span *ngIf="submitted" class="spinner-border spinner-border-sm me-2"></span>
                  ส่งลิงก์รีเซ็ตรหัสผ่าน
                </button>
              </div>
            </form>
            <div *ngIf="success" class="alert alert-success mt-3">
              ส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมลของคุณแล้ว
            </div>
            <div class="text-center text-muted mt-3">
              <a routerLink="/login">กลับไปหน้าเข้าสู่ระบบ</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ForgotPasswordComponent {
  email = '';
  submitted = false;
  success = false;

  onSubmit(): void {
    this.submitted = true;
    // TODO: implement forgot password via use case
    setTimeout(() => {
      this.submitted = false;
      this.success = true;
    }, 1000);
  }
}
