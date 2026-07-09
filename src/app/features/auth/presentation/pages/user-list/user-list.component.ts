import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

interface UserListItem {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, TablerIconComponent, TranslatePipe],
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
        <div class="table-responsive">
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
                <td>{{ user.name }}</td>
                <td class="text-secondary">{{ user.email }}</td>
                <td><span class="badge bg-purple-lt">{{ user.role }}</span></td>
                <td><span [innerHTML]="getStatusBadge(user.status)"></span></td>
                <td class="text-secondary">{{ user.lastLogin }}</td>
                <td>
                    <a routerLink="/users/{{user.id}}/edit" class="btn btn-ghost-secondary btn-icon" [title]="'user.edit' | translate">
                    <i-tabler name="pencil" class="icon"></i-tabler>
                  </a>
                    <a href="javascript:void(0)" class="btn btn-ghost-danger btn-icon" [title]="'user.delete' | translate" (click)="deleteUser(user.id)">
                    <i-tabler name="trash" class="icon"></i-tabler>
                  </a>
                </td>
              </tr>
              <tr *ngIf="users.length === 0">
                <td colspan="6" class="text-center text-secondary py-4">{{ 'user.noData' | translate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  users: UserListItem[] = [
    { id: '1', name: 'Admin User', email: 'admin@demo.com', role: 'Admin', status: 'active', lastLogin: '2026-07-06 14:30' },
    { id: '2', name: 'Manager01', email: 'manager@demo.com', role: 'Manager', status: 'active', lastLogin: '2026-07-05 09:15' },
    { id: '3', name: 'Staff01', email: 'staff@demo.com', role: 'Staff', status: 'active', lastLogin: '2026-07-04 16:45' },
    { id: '4', name: 'Tech01', email: 'tech@demo.com', role: 'Technician', status: 'inactive', lastLogin: '2026-06-20 11:00' },
    { id: '5', name: 'Customer01', email: 'customer@demo.com', role: 'Customer', status: 'active', lastLogin: '2026-07-06 08:00' },
  ];

  deleteUser(id: string): void {
    this.users = this.users.filter(u => u.id !== id);
  }

  getStatusBadge(status: string): string {
    if (status === 'active') {
      return '<span class="badge bg-success me-1"></span> Active';
    }
    return '<span class="badge bg-secondary me-1"></span> Inactive';
  }
}
