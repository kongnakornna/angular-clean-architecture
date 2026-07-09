import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { TablerIconComponent } from 'angular-tabler-icons';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
}

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [NgFor, TablerIconComponent, TranslatePipe],
  template: `
<div class="page-header d-print-none">
  <div class="container-xl">
    <div class="row g-2 align-items-center">
      <div class="col">
        <h2 class="page-title">{{ 'user.roleTitle' | translate }}</h2>
      </div>
      <div class="col-auto ms-auto d-print-none">
        <a href="javascript:void(0)" class="btn btn-primary">
            <i-tabler name="plus" class="icon"></i-tabler>
          {{ 'user.addRole' | translate }}
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
                <th>{{ 'user.roleName' | translate }}</th>
                <th>{{ 'user.description' | translate }}</th>
                <th>{{ 'user.permissions' | translate }}</th>
                <th>{{ 'user.userCount' | translate }}</th>
                <th class="w-1"></th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let role of roles">
                <td><span class="badge bg-blue-lt">{{ role.name }}</span></td>
                <td class="text-secondary">{{ role.description }}</td>
                <td>
                  <span *ngFor="let perm of role.permissions" class="badge bg-secondary me-1 mb-1">{{ perm }}</span>
                </td>
                <td>{{ role.userCount }}</td>
                <td>
                  <a href="javascript:void(0)" class="btn btn-ghost-secondary btn-icon" [title]="'user.edit' | translate">
                    <i-tabler name="pencil" class="icon"></i-tabler>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  styleUrls: ['./role-list.component.scss'],
})
export class RoleListComponent {
  roles: Role[] = [
    { id: '1', name: 'Admin', description: 'เข้าถึงระบบทั้งหมด', userCount: 1, permissions: ['view', 'create', 'edit', 'delete', 'approve'] },
    { id: '2', name: 'Manager', description: 'จัดการงานและลูกค้า', userCount: 3, permissions: ['view', 'create', 'edit', 'approve'] },
    { id: '3', name: 'Staff', description: 'ปฏิบัติงานทั่วไป', userCount: 5, permissions: ['view', 'create', 'edit'] },
    { id: '4', name: 'Technician', description: 'ปฏิบัติงานภาคสนาม', userCount: 8, permissions: ['view', 'edit'] },
    { id: '5', name: 'Customer', description: 'ดูข้อมูลของตนเอง', userCount: 20, permissions: ['view'] },
  ];
}
