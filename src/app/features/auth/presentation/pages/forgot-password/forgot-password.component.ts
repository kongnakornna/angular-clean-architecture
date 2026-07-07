import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';
import { ForgotPasswordUseCase } from '../../../domain/use-cases/forgot-password.use-case';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink, TablerIconComponent],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  private forgotPasswordUseCase = inject(ForgotPasswordUseCase);

  email = '';
  loading = false;
  error = '';
  success = false;

  onSubmit(): void {
    this.loading = true;
    this.error = '';
    this.success = false;
    this.forgotPasswordUseCase.execute(this.email).subscribe({
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
