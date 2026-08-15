import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TablerIconComponent } from 'angular-tabler-icons';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { ListUsersUseCase } from '../../../domain/use-cases/list-users.use-case';
import { DeleteUserUseCase } from '../../../domain/use-cases/delete-user.use-case';
import { User } from '../../../domain/entities/user.entity';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, RouterLink, TablerIconComponent, TranslatePipe],
  template: `
<div class="page-header d-print-none">
  <div class="container-xl">
    <div class="row g-2 align-items-center">
      <div class="col">
        <h2 class="page-title">{{ 'user.title' | translate }}</h2>
      </div>
      <div class="col-auto ms-auto d-print-none">
        <a routerLink="/users/create" class="btn btn-primary">
            <i-tabler name="plus" class="icon"></i-tabler>
          {{ 'user.create' | translate }}
        </a>
      </div>
    </div>
  </div>
</div>
<div class="page-body">
  <div class="container-xl">
    <div class="card">
      <div class="card-body">
        <div class="row g-2 align-items-center mb-3">
          <div class="col">
            <div class="input-icon">
              <input type="text" class="form-control" placeholder="{{ 'common.search' | translate }}"
                     [(ngModel)]="keyword" (keyup.enter)="onSearch()" [ngModelOptions]="{standalone: true}">
              <span class="input-icon-addon"><i-tabler name="search" class="icon"></i-tabler></span>
            </div>
          </div>
          <div class="col-auto">
            <button type="button" class="btn btn-outline-secondary" (click)="onSearch()">{{ 'common.search' | translate }}</button>
          </div>
        </div>
        <div *ngIf="loading" class="text-center text-secondary py-4">{{ 'common.loading' | translate }}</div>
        <div *ngIf="!loading && error" class="alert alert-danger py-2">{{ error }}</div>
        <div *ngIf="!loading" class="table-responsive">
          <table class="table table-vcenter card-table">
            <thead>
              <tr>
                <th>{{ 'user.username' | translate }}</th>
                <th>{{ 'user.email' | translate }}</th>
                <th>{{ 'user.role' | translate }}</th>
                <th>{{ 'user.status' | translate }}</th>
                <th>{{ 'user.lastLogin' | translate }}</th>
                <th class="w-1"></th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let user of users">
                <td>
                  <div class="d-flex align-items-center">
                    <span class="avatar avatar-xs me-2">{{ avatarText(user) }}</span>
                    <div>
                      <div>{{ user.fullName || user.username }}</div>
                      <div class="text-secondary text-sm">{{ user.username }}</div>
                    </div>
                  </div>
                </td>
                <td class="text-secondary">{{ user.email }}</td>
                <td><span class="badge bg-purple-lt">{{ roleName(user.roleId) }}</span></td>
                <td><span [innerHTML]="getStatusBadge(user.status)"></span></td>
                <td class="text-secondary">{{ user.lastSignIn || '—' }}</td>
                <td>
                  <div class="btn-list">
                    <a routerLink="/users/{{user.id}}/edit" class="btn btn-ghost-secondary btn-icon" [title]="'user.edit' | translate">
                      <i-tabler name="pencil" class="icon"></i-tabler>
                    </a>
                    <a href="javascript:void(0)" class="btn btn-ghost-danger btn-icon" [title]="'user.delete' | translate" (click)="deleteUser(user.id)">
                      <i-tabler name="trash" class="icon"></i-tabler>
                    </a>
                  </div>
                </td>
              </tr>
              <tr *ngIf="users.length === 0">
                <td colspan="6" class="text-center text-secondary py-4">{{ 'user.noData' | translate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div *ngIf="!loading" class="d-flex align-items-center justify-content-between mt-3">
          <div class="text-secondary text-sm">
            {{ page * limit + 1 }}–{{ Math.min((page + 1) * limit, total) }} / {{ total }}
          </div>
          <div class="btn-group">
            <button type="button" class="btn btn-outline-secondary" (click)="prevPage()" [disabled]="page === 0">
              <i-tabler name="chevron-left" class="icon"></i-tabler>
            </button>
            <button type="button" class="btn btn-outline-secondary" (click)="nextPage()" [disabled]="(page + 1) * limit >= total">
              <i-tabler name="chevron-right" class="icon"></i-tabler>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  private listUsersUC = inject(ListUsersUseCase);
  private deleteUserUC = inject(DeleteUserUseCase);
  private destroyRef = inject(DestroyRef);

  readonly Math = Math;

  users: User[] = [];
  total = 0;
  limit = 20;
  page = 0;
  loading = false;
  error = '';
  keyword = '';

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    const keyword = this.keyword.trim();
    this.listUsersUC
      .execute({
        limit: this.limit,
        offset: this.page * this.limit,
        ...(keyword ? { username: keyword } : {}),
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.users = res.data;
          this.total = res.total;
          this.loading = false;
        },
        error: (err) => {
          this.error = err?.message || 'Failed to load users';
          this.loading = false;
        },
      });
  }

  onSearch(): void {
    this.page = 0;
    this.load();
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.load();
    }
  }

  nextPage(): void {
    if ((this.page + 1) * this.limit < this.total) {
      this.page++;
      this.load();
    }
  }

  deleteUser(id: string): void {
    if (!confirm(this.deleteConfirmMessage)) return;
    this.deleteUserUC.execute(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => this.load(),
      error: (err) => {
        this.error = err?.message || 'Failed to delete user';
      },
    });
  }

  avatarText(user: User): string {
    const name = user.fullName || user.username || user.email;
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

  private get deleteConfirmMessage(): string {
    return 'Delete this user?';
  }
}
