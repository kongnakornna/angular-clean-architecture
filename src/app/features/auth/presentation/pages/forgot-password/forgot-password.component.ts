import { Component, DestroyRef, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppTranslatePipe } from '../../../../../shared/i18n/presentation/pipes/translate.pipe';
import { ForgotPasswordUseCase } from '../../../domain/use-cases/forgot-password.use-case';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink, AppTranslatePipe],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  private forgotPasswordUseCase = inject(ForgotPasswordUseCase);
  private destroyRef = inject(DestroyRef);

  email = '';
  loading = false;
  error = '';
  success = false;

  onSubmit(): void {
    this.loading = true;
    this.error = '';
    this.success = false;
    this.forgotPasswordUseCase.execute(this.email)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loading = false;
          this.success = true;
        },
        error: (err) => {
          this.loading = false;
          this.error = err.message || 'ไม่สามารถส่งอีเมลได้ กรุณาลองอีกครั้ง';
        },
      });
  }
}
