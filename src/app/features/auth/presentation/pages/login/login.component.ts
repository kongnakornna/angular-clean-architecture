import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginUseCase } from '../../../domain/use-cases/login.use-case';
import { TablerIconComponent } from 'angular-tabler-icons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink, TablerIconComponent],
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
        this.error = err.message || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
      },
    });
  }
}
