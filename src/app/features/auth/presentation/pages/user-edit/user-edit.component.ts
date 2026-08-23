import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TablerIconComponent } from 'angular-tabler-icons';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { GetUserUseCase } from '../../../domain/use-cases/get-user.use-case';
import { UpdateUserUseCase } from '../../../domain/use-cases/update-user.use-case';
import { UpdateUserRoleUseCase } from '../../../domain/use-cases/update-user-role.use-case';
import { UpdateUserPasswordUseCase } from '../../../domain/use-cases/update-user-password.use-case';
import { ForceLogoutUserUseCase } from '../../../domain/use-cases/force-logout-user.use-case';
import { User } from '../../../domain/entities/user.entity';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink, TablerIconComponent, TranslatePipe],
  template: `
<div class="page-header d-print-none">
  <div class="container-xl">
    <div class="row g-2 align-items-center">
      <div class="col">
        <div class="page-pretitle">{{ 'user.title' | translate }}</div>
        <h2 class="page-title">{{ 'user.editTitle' | translate }}</h2>
      </div>
      <div class="col-auto ms-auto d-print-none">
        <a routerLink="/users" class="btn btn-ghost">{{ 'user.back' | translate }}</a>
      </div>
    </div>
  </div>
</div>
<div class="page-body">
  <div class="container-xl">
    <div *ngIf="loading" class="card"><div class="card-body text-center text-secondary py-4">{{ 'common.loading' | translate }}</div></div>
    <div *ngIf="!loading && error" class="card"><div class="card-body alert alert-danger mb-0">{{ error }}</div></div>

    <ng-container *ngIf="!loading && user">
      <div class="card mb-3">
        <div class="card-header">
          <h3 class="card-title">{{ 'user.profile' | translate }}</h3>
        </div>
        <div class="card-body">
          <div class="d-flex align-items-center mb-3">
            <span class="avatar me-3">{{ avatarText() }}</span>
            <div>
              <div class="fw-bold">{{ user.fullName || user.username }}</div>
              <div class="text-secondary">{{ user.email }}</div>
            </div>
          </div>
          <div class="mb-2">
            <span class="badge bg-purple-lt me-2">{{ roleName(user.roleId) }}</span>
            <span [innerHTML]="getStatusBadge(user.status)"></span>
            <span *ngIf="user.isSuperuser" class="badge bg-red-lt">Superuser</span>
            <span *ngIf="user.verified" class="badge bg-green-lt">Verified</span>
          </div>
        </div>
      </div>

      <form (ngSubmit)="onSaveProfile()" #profileForm="ngForm" autocomplete="off" novalidate>
        <div class="card mb-3">
          <div class="card-header">
            <h3 class="card-title">{{ 'user.editTitle' | translate }}</h3>
          </div>
          <div class="card-body">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">{{ 'user.firstName' | translate }}</label>
                <input type="text" class="form-control" [(ngModel)]="profile.firstName" name="firstName">
              </div>
              <div class="col-md-6">
                <label class="form-label">{{ 'user.lastName' | translate }}</label>
                <input type="text" class="form-control" [(ngModel)]="profile.lastName" name="lastName">
              </div>
              <div class="col-md-12">
                <label class="form-label">{{ 'user.fullName' | translate }}</label>
                <input type="text" class="form-control" [(ngModel)]="profile.fullName" name="fullName">
              </div>
              <div class="col-md-6">
                <label class="form-label">{{ 'user.mobileNumber' | translate }}</label>
                <input type="text" class="form-control" [(ngModel)]="profile.mobileNumber" name="mobileNumber">
              </div>
              <div class="col-md-6">
                <label class="form-label">{{ 'user.phoneNumber' | translate }}</label>
                <input type="text" class="form-control" [(ngModel)]="profile.phoneNumber" name="phoneNumber">
              </div>
              <div class="col-md-6">
                <label class="form-label">{{ 'user.lineId' | translate }}</label>
                <input type="text" class="form-control" [(ngModel)]="profile.lineId" name="lineId">
              </div>
              <div class="col-md-6">
                <label class="form-label">{{ 'user.locationId' | translate }}</label>
                <input type="text" class="form-control" [(ngModel)]="profile.locationId" name="locationId">
              </div>
            </div>
            <div *ngIf="profileError" class="alert alert-danger mt-3 mb-0 py-2">{{ profileError }}</div>
          </div>
          <div class="card-footer text-end">
            <button type="submit" class="btn btn-primary" [disabled]="savingProfile">
              <span *ngIf="savingProfile" class="spinner-border spinner-border-sm me-2"></span>
              {{ 'user.save' | translate }}
            </button>
          </div>
        </div>
      </form>

      <div class="card mb-3">
        <div class="card-header">
          <h3 class="card-title">{{ 'user.role' | translate }}</h3>
        </div>
        <div class="card-body">
          <div class="row g-2 align-items-center">
            <div class="col-md-4">
              <select class="form-select" [(ngModel)]="roleId" [ngModelOptions]="{standalone: true}">
                <option [value]="1">Admin</option>
                <option [value]="2">Manager</option>
                <option [value]="3">Staff</option>
                <option [value]="4">Technician</option>
                <option [value]="5">Customer</option>
              </select>
            </div>
            <div class="col-auto">
              <button type="button" class="btn btn-outline-secondary" (click)="onChangeRole()" [disabled]="savingRole">
                <span *ngIf="savingRole" class="spinner-border spinner-border-sm me-2"></span>
                {{ 'user.updateRole' | translate }}
              </button>
            </div>
            <div class="col-auto ms-auto">
              <button type="button" class="btn btn-ghost-danger" (click)="onForceLogout()">
                <i-tabler name="logout" class="icon"></i-tabler>
                {{ 'user.forceLogout' | translate }}
              </button>
            </div>
          </div>
          <div *ngIf="roleError" class="alert alert-danger mt-3 mb-0 py-2">{{ roleError }}</div>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card-header">
          <h3 class="card-title">{{ 'user.resetPassword' | translate }}</h3>
        </div>
        <div class="card-body">
          <form (ngSubmit)="onResetPassword()" #passwordForm="ngForm" autocomplete="off" novalidate>
            <div class="row g-3">
              <div class="col-md-4">
                <label class="form-label required">{{ 'user.oldPassword' | translate }}</label>
                <input type="password" class="form-control" [(ngModel)]="passwords.oldPassword" name="oldPassword" required minlength="8">
              </div>
              <div class="col-md-4">
                <label class="form-label required">{{ 'user.newPassword' | translate }}</label>
                <input type="password" class="form-control" [(ngModel)]="passwords.newPassword" name="newPassword" required minlength="8">
              </div>
              <div class="col-md-4">
                <label class="form-label required">{{ 'user.confirmPassword' | translate }}</label>
                <input type="password" class="form-control" [(ngModel)]="passwords.confirmPassword" name="confirmPassword" required minlength="8">
              </div>
            </div>
            <div *ngIf="passwordError" class="alert alert-danger mt-3 mb-0 py-2">{{ passwordError }}</div>
            <div *ngIf="passwordSuccess" class="alert alert-success mt-3 mb-0 py-2">{{ passwordSuccess }}</div>
            <div class="mt-3">
              <button type="submit" class="btn btn-primary" [disabled]="passwordForm.invalid || savingPassword">
                <span *ngIf="savingPassword" class="spinner-border spinner-border-sm me-2"></span>
                {{ 'user.resetPassword' | translate }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ng-container>
  </div>
</div>
  `,
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private getUseCase = inject(GetUserUseCase);
  private updateUseCase = inject(UpdateUserUseCase);
  private updateRoleUseCase = inject(UpdateUserRoleUseCase);
  private updatePasswordUseCase = inject(UpdateUserPasswordUseCase);
  private forceLogoutUseCase = inject(ForceLogoutUserUseCase);
  private destroyRef = inject(DestroyRef);

  userId = '';
  user: User | null = null;
  loading = false;
  error = '';

  profile = {
    firstName: '',
    lastName: '',
    fullName: '',
    mobileNumber: '',
    phoneNumber: '',
    lineId: '',
    locationId: '',
  };
  savingProfile = false;
  profileError = '';

  roleId = 0;
  savingRole = false;
  roleError = '';

  passwords = { oldPassword: '', newPassword: '', confirmPassword: '' };
  savingPassword = false;
  passwordError = '';
  passwordSuccess = '';

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    if (!this.userId) {
      this.error = 'User ID is missing';
      return;
    }
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    this.getUseCase.execute(this.userId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (user) => {
        this.user = user;
        this.roleId = user.roleId ?? 0;
        this.profile = {
          firstName: user.firstName ?? '',
          lastName: user.lastName ?? '',
          fullName: user.fullName ?? '',
          mobileNumber: user.mobileNumber ?? '',
          phoneNumber: user.phoneNumber ?? '',
          lineId: user.lineId ?? '',
          locationId: user.locationId ?? '',
        };
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message || 'Failed to load user';
        this.loading = false;
      },
    });
  }

  onSaveProfile(): void {
    this.savingProfile = true;
    this.profileError = '';
    this.updateUseCase
      .execute(this.userId, {
        firstName: this.profile.firstName,
        lastName: this.profile.lastName,
        fullName: this.profile.fullName,
        mobileNumber: this.profile.mobileNumber,
        phoneNumber: this.profile.phoneNumber,
        lineId: this.profile.lineId,
        locationId: this.profile.locationId,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.savingProfile = false;
          this.load();
        },
        error: (err) => {
          this.savingProfile = false;
          this.profileError = err?.message || 'Failed to update profile';
        },
      });
  }

  onChangeRole(): void {
    this.savingRole = true;
    this.roleError = '';
    this.updateRoleUseCase.execute(this.userId, this.roleId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.savingRole = false;
        this.load();
      },
      error: (err) => {
        this.savingRole = false;
        this.roleError = err?.message || 'Failed to update role';
      },
    });
  }

  onResetPassword(): void {
    if (this.passwords.newPassword !== this.passwords.confirmPassword) {
      this.passwordError = 'Password and confirm password do not match';
      return;
    }
    this.savingPassword = true;
    this.passwordError = '';
    this.passwordSuccess = '';
    this.updatePasswordUseCase
      .execute(this.userId, this.passwords.oldPassword, this.passwords.newPassword, this.passwords.confirmPassword)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.savingPassword = false;
          this.passwords = { oldPassword: '', newPassword: '', confirmPassword: '' };
          this.passwordSuccess = 'Password updated successfully';
        },
        error: (err) => {
          this.savingPassword = false;
          this.passwordError = err?.message || 'Failed to update password';
        },
      });
  }

  onForceLogout(): void {
    if (!confirm('Force logout all sessions of this user?')) return;
    this.forceLogoutUseCase.execute(this.userId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.roleError = '';
      },
      error: (err) => {
        this.roleError = err?.message || 'Failed to force logout';
      },
    });
  }

  avatarText(): string {
    const name = this.user?.fullName || this.user?.username || this.user?.email || '';
    return name ? name.trim().charAt(0).toUpperCase() : '?';
  }

  roleName(roleId?: number): string {
    switch (roleId) {
      case 1: return 'Admin';
      case 2: return 'Manager';
      case 3: return 'Staff';
      case 4: return 'Technician';
      case 5: return 'Customer';
      default: return roleId?.toString() ?? '—';
    }
  }

  getStatusBadge(status: string | number): string {
    if (String(status) === '1') {
      return '<span class="badge bg-success me-1"></span> Active';
    }
    return '<span class="badge bg-secondary me-1"></span> Inactive';
  }
}
