import { Component, DestroyRef, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoginUseCase } from '../../../domain/use-cases/login.use-case';
import { AppTranslatePipe } from '../../../../../shared/i18n/presentation/pipes/translate.pipe';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink, AppTranslatePipe],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private loginUseCase = inject(LoginUseCase);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  username = '';
  password = '';
  loading = false;
  error = '';
  passwordVisible = false;

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';
    this.loginUseCase.execute({ username: this.username, password: this.password })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.loading = false;
          if (err.status === 401) {
            this.error = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
          } else {
            this.error = err.message || 'Invalid username or password';
          }
        },
      });
  }
}
