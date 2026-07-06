import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  email = '';
  submitted = false;
  success = false;

  onSubmit(): void {
    this.submitted = true;
    // TODO: implement forgot password via use case
    setTimeout(() => {
      this.submitted = false;
      this.success = true;
    }, 1000);
  }
}
