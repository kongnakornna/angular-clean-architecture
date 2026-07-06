import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginUseCase } from '../../../domain/use-cases/login.use-case';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="page page-center">
      <div class="container-tight py-4">
        <div class="card card-md">
          <div class="card-body">
            <h2 class="h2 text-center mb-4">เข้าสู่ระบบ</h2>
            <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
              <div class="mb-3">
                <label class="form-label">อีเมล</label>
                <input type="email" class="form-control" [(ngModel)]="email" name="email" required placeholder="your@email.com" autocomplete="email">
              </div>
              <div class="mb-3">
                <label class="form-label">รหัสผ่าน</label>
                <input type="password" class="form-control" [(ngModel)]="password" name="password" required placeholder="รหัสผ่าน" autocomplete="current-password">
              </div>
              <div class="form-footer">
                <button type="submit" class="btn btn-primary w-100" [disabled]="loginForm.invalid || loading">
                  <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
                  เข้าสู่ระบบ
                </button>
              </div>
            </form>
            <div class="text-center text-muted mt-3">
              <a routerLink="/forgot-password">ลืมรหัสผ่าน?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private loginUseCase = inject(LoginUseCase);
  private router = inject(Router);

  email = '';
  password = '';
  loading = false;
  error = '';

  onSubmit(): void {
    this.loading = true;
    this.error = '';
    this.loginUseCase.execute({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.message || 'เข้าสู่ระบบไม่สำเร็จ';
      },
    });
  }
}
