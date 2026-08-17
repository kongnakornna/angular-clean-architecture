import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { ListRolesUseCase } from '../../../domain/use-cases/list-roles.use-case';
import { DeleteRoleUseCase } from '../../../domain/use-cases/delete-role.use-case';
import { Role } from '../../../domain/entities/role.entity';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [NgFor, NgClass, RouterLink, TablerIconComponent, TranslatePipe],
  template: `
<div class="page-header d-print-none">
  <div class="container-xl">
    <div class="row g-2 align-items-center">
      <div class="col">
        <h2 class="page-title">{{ 'user.roleTitle' | translate }}</h2>
      </div>
      <div class="col-auto ms-auto d-print-none">
        <a routerLink="/roles/create" class="btn btn-primary">
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
                <td>
                  <a [routerLink]="['/roles', role.id, 'edit']" class="btn btn-ghost-secondary btn-icon" [title]="'user.edit' | translate">
                    <i-tabler name="pencil" class="icon"></i-tabler>
                  </a>
                  <button class="btn btn-ghost-danger btn-icon" [title]="'user.delete' | translate" (click)="deleteRole(role.id)">
                    <i-tabler name="trash" class="icon"></i-tabler>
                  </button>
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
export class RoleListComponent implements OnInit {
  private listRolesUseCase = inject(ListRolesUseCase);
  private deleteRoleUseCase = inject(DeleteRoleUseCase);

  roles: Role[] = [];

  ngOnInit() {
    this.loadRoles();
  }

  loadRoles() {
    this.listRolesUseCase.execute().subscribe({
      next: (roles) => {
        this.roles = roles;
      },
      error: (error) => {
        console.error('Failed to load roles:', error);
      },
    });
  }

  deleteRole(id: number) {
    if (confirm('Are you sure you want to delete this role?')) {
      this.deleteRoleUseCase.execute(id).subscribe({
        next: () => {
          this.loadRoles();
        },
        error: (error) => {
          console.error('Failed to delete role:', error);
        },
      });
    }
  }
}
