import { Component, DestroyRef, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TablerIconComponent } from 'angular-tabler-icons';
import { AppTranslatePipe } from '../../../../../shared/i18n/presentation/pipes/translate.pipe';
import { SignUpUseCase } from '../../../domain/use-cases/sign-up.use-case';
import { RegisterCredentials } from '../../../domain/repositories/auth.repository';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink, TablerIconComponent, AppTranslatePipe],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  private signUpUseCase = inject(SignUpUseCase);
  private destroyRef = inject(DestroyRef);

  username = '';
  firstName = '';
  lastName = '';
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  phoneNumber = '';
  mobileNumber = '';
  lineId = '';
  locationId = '';
  roleId = 2;
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
    const credentials: RegisterCredentials = {
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      fullName: this.fullName || `${this.firstName} ${this.lastName}`,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      phoneNumber: this.phoneNumber,
      mobileNumber: this.mobileNumber || this.phoneNumber,
      lineId: this.lineId,
      locationId: this.locationId,
      roleId: this.roleId,
    };
    this.signUpUseCase.execute(credentials)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.error = err.message || 'An error occurred, please try again';
        },
      });
  }
}