import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { GetRoleUseCase } from '../../../domain/use-cases/get-role.use-case';
import { UpdateRoleUseCase } from '../../../domain/use-cases/update-role.use-case';
import { Role } from '../../../domain/entities/role.entity';
import { PermissionCheckboxComponent } from '../../../../../shared/components/permission-checkbox/permission-checkbox.component';

@Component({
  selector: 'app-role-edit',
  standalone: true,
  imports: [NgFor, NgClass, FormsModule, TablerIconComponent, TranslatePipe, PermissionCheckboxComponent],
  template: `
<div class="page-header d-print-none">
  <div class="container-xl">
    <div class="row g-2 align-items-center">
      <div class="col">
        <h2 class="page-title">Edit Role</h2>
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
            <button type="submit" class="btn btn-primary" [disabled]="!roleName">Update</button>
            <a routerLink="/roles" class="btn btn-link link-secondary">Cancel</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
  `,
})
export class RoleEditComponent implements OnInit {
  private getRoleUseCase = inject(GetRoleUseCase);
  private updateRoleUseCase = inject(UpdateRoleUseCase);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  roleId: number = 0;
  roleName = '';
  roleDescription = '';
  selectedPermissions: string[] = [];
  modules = ['dashboard', 'customer', 'quotation', 'purchase_order', 'inventory', 'payment', 'document', 'email', 'batch', 'iot', 'wos', 'job_card', 'user', 'role'];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.roleId = +id;
      this.loadRole();
    }
  }

  loadRole() {
    this.getRoleUseCase.execute(this.roleId).subscribe({
      next: (role) => {
        this.roleName = role.name;
        this.roleDescription = role.description;
        this.selectedPermissions = role.permissions;
      },
      error: (error) => {
        console.error('Failed to load role:', error);
      },
    });
  }

  onPermissionsChange(permissions: string[]) {
    this.selectedPermissions = permissions;
  }

  onSubmit() {
    if (!this.roleName) return;

    this.updateRoleUseCase.execute(this.roleId, {
      name: this.roleName,
      description: this.roleDescription,
      permissions: this.selectedPermissions,
    }).subscribe({
      next: () => {
        this.router.navigate(['/roles']);
      },
      error: (error) => {
        console.error('Failed to update role:', error);
      },
    });
  }
}
