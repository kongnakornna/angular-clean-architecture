import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [FormsModule, RouterLink, TranslatePipe],
  template: `
<div class="page-header d-print-none">
  <div class="container-xl">
    <div class="row g-2 align-items-center">
      <div class="col">
        <div class="page-pretitle">{{ 'user.title' | translate }}</div>
        <h2 class="page-title">{{ 'user.createTitle' | translate }}</h2>
      </div>
    </div>
  </div>
</div>
<div class="page-body">
  <div class="container-xl">
    <div class="card">
      <div class="card-body">
        <form (ngSubmit)="onSubmit()" #userForm="ngForm" autocomplete="off" novalidate>
          <div class="mb-3">
            <label class="form-label required">{{ 'user.username' | translate }}</label>
            <input type="text" class="form-control" [(ngModel)]="model.name" name="name" placeholder="{{ 'user.usernamePlaceholder' | translate }}" required>
          </div>
          <div class="mb-3">
            <label class="form-label required">{{ 'user.email' | translate }}</label>
            <input type="email" class="form-control" [(ngModel)]="model.email" name="email" placeholder="{{ 'user.emailPlaceholder' | translate }}" required email>
          </div>
          <div class="mb-3">
            <label class="form-label required">{{ 'user.role' | translate }}</label>
            <select class="form-select" [(ngModel)]="model.role" name="role" required>
              <option value="">{{ 'user.selectRole' | translate }}</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="staff">Staff</option>
              <option value="technician">Technician</option>
              <option value="customer">Customer</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label required">{{ 'user.password' | translate }}</label>
            <input type="password" class="form-control" [(ngModel)]="model.password" name="password" placeholder="{{ 'user.password' | translate }}" required>
          </div>
          <div class="mb-3">
            <label class="form-label required">{{ 'user.confirmPassword' | translate }}</label>
            <input type="password" class="form-control" [(ngModel)]="model.confirmPassword" name="confirmPassword" placeholder="{{ 'user.confirmPassword' | translate }}" required>
          </div>
          <div class="form-footer">
            <a routerLink="/users" class="btn btn-ghost me-2">{{ 'user.cancel' | translate }}</a>
            <button type="submit" class="btn btn-primary" [disabled]="userForm.invalid">{{ 'user.save' | translate }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
  `,
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent {
  private router = inject(Router);

  model = {
    name: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
  };

  onSubmit(): void {
    this.router.navigate(['/users']);
  }
}
