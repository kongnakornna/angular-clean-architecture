import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink, TablerIconComponent],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
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
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
