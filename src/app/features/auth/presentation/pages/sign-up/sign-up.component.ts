import { Component, DestroyRef, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TablerIconComponent } from 'angular-tabler-icons';
import { AppTranslatePipe } from '../../../../../shared/i18n/presentation/pipes/translate.pipe';
import { SignUpUseCase } from '../../../domain/use-cases/sign-up.use-case';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink, TablerIconComponent, AppTranslatePipe],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  private signUpUseCase = inject(SignUpUseCase);
  private destroyRef = inject(DestroyRef);

  username = '';
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  phoneNumber = '';
  agreeTerms = false;
  loading = false;
  error = '';
  passwordVisible = false;

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';
    this.signUpUseCase.execute({
      username: this.username,
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      phoneNumber: this.phoneNumber,
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.error = err.message || 'เกิดข้อผิดพลาด กรุณาลองอีกครั้ง';
        },
      });
  }
}
