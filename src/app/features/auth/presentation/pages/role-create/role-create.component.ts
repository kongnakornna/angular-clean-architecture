import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { CreateRoleUseCase } from '../../../domain/use-cases/create-role.use-case';
import { PermissionCheckboxComponent } from '../../../../../shared/components/permission-checkbox/permission-checkbox.component';

@Component({
  selector: 'app-role-create',
  standalone: true,
  imports: [NgFor, NgClass, FormsModule, TablerIconComponent, TranslatePipe, PermissionCheckboxComponent],
  template: `
<div class="page-header d-print-none">
  <div class="container-xl">
    <div class="row g-2 align-items-center">
      <div class="col">
        <h2 class="page-title">Create Role</h2>
      </div>
    </div>
  </div>
</div>
<div class="page-body">
  <div class="container-xl">
    <div class="card">
      <div class="card-body">
        <form (ngSubmit)="onSubmit()">
          <div class="mb-3">
            <label class="form-label">Name</label>
            <input type="text" class="form-control" [(ngModel)]="roleName" name="name" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea class="form-control" [(ngModel)]="roleDescription" name="description" rows="3"></textarea>
          </div>
          <div class="mb-3">
            <label class="form-label">Permissions</label>
            <div class="row">
              <div class="col-md-4" *ngFor="let module of modules">
                <app-permission-checkbox
                  [module]="module"
                  [selectedPermissions]="selectedPermissions"
                  (permissionsChange)="onPermissionsChange($event)">
                </app-permission-checkbox>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <button type="submit" class="btn btn-primary" [disabled]="!roleName">Create</button>
            <a routerLink="/roles" class="btn btn-link link-secondary">Cancel</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
  `,
})
export class RoleCreateComponent implements OnInit {
  private createRoleUseCase = inject(CreateRoleUseCase);
  private router = inject(Router);

  roleName = '';
  roleDescription = '';
  selectedPermissions: string[] = [];
  modules = ['dashboard', 'customer', 'quotation', 'purchase_order', 'inventory', 'payment', 'document', 'email', 'batch', 'iot', 'wos', 'job_card', 'user', 'role'];

  ngOnInit() {}

  onPermissionsChange(permissions: string[]) {
    this.selectedPermissions = permissions;
  }

  onSubmit() {
    if (!this.roleName) return;

    this.createRoleUseCase.execute({
      name: this.roleName,
      description: this.roleDescription,
      permissions: this.selectedPermissions,
    }).subscribe({
      next: () => {
        this.router.navigate(['/roles']);
      },
      error: (error) => {
        console.error('Failed to create role:', error);
      },
    });
  }
}
