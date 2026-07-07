import { Component, DestroyRef, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ResetPasswordUseCase } from '../../../domain/use-cases/reset-password.use-case';
import { TablerIconComponent } from 'angular-tabler-icons';
import { AppTranslatePipe } from '../../../../../shared/i18n/presentation/pipes/translate.pipe';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink, TablerIconComponent, AppTranslatePipe],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  private resetPasswordUseCase = inject(ResetPasswordUseCase);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  password = '';
  confirmPassword = '';
  token = '';
  loading = false;
  error = '';
  success = false;
  passwordVisible = false;
  confirmVisible = false;

  constructor() {
    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      this.token = params['token'] || '';
    });
  }

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirm(): void {
    this.confirmVisible = !this.confirmVisible;
  }

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.error = 'รหัสผ่านไม่ตรงกัน';
      return;
    }
    this.loading = true;
    this.error = '';
    this.resetPasswordUseCase.execute(this.token, this.password)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
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
