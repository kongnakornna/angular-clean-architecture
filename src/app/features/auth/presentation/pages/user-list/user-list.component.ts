import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';

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
  imports: [NgFor, NgIf, RouterLink, TablerIconComponent],
  template: `
<div class="page-header d-print-none">
  <div class="container-xl">
    <div class="row g-2 align-items-center">
      <div class="col">
        <h2 class="page-title">จัดการผู้ใช้</h2>
      </div>
      <div class="col-auto ms-auto d-print-none">
        <a routerLink="/users/create" class="btn btn-primary">
          <i-tabler name="plus" class="icon"></i-tabler>
          เพิ่มผู้ใช้
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
                <th>ชื่อผู้ใช้</th>
                <th>อีเมล</th>
                <th>บทบาท</th>
                <th>สถานะ</th>
                <th>เข้าใช้ล่าสุด</th>
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
                  <a routerLink="/users/{{user.id}}/edit" class="btn btn-ghost-secondary btn-icon" title="แก้ไข">
                    <i-tabler name="pencil" class="icon"></i-tabler>
                  </a>
                  <a href="javascript:void(0)" class="btn btn-ghost-danger btn-icon" title="ลบ" (click)="deleteUser(user.id)">
                    <i-tabler name="trash" class="icon"></i-tabler>
                  </a>
                </td>
              </tr>
              <tr *ngIf="users.length === 0">
                <td colspan="6" class="text-center text-secondary py-4">ไม่มีข้อมูลผู้ใช้</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
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
