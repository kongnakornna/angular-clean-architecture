import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginUseCase } from '../../../domain/use-cases/login.use-case';
import { TablerIconComponent } from 'angular-tabler-icons';
import { AppTranslatePipe } from '../../../../../shared/i18n/presentation/pipes/translate.pipe';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink, TablerIconComponent, AppTranslatePipe],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private loginUseCase = inject(LoginUseCase);
  private router = inject(Router);

  username = '';
  password = '';
  loading = false;
  error = '';
  passwordVisible = false;
  rememberMe = false;

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';
    this.loginUseCase.execute({ username: this.username, password: this.password }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.message || 'Invalid username or password';
      },
    });
  }
}