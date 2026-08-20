import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { GetRoleUseCase } from '../../../domain/use-cases/get-role.use-case';
import { DeleteRoleUseCase } from '../../../domain/use-cases/delete-role.use-case';
import { Role } from '../../../domain/entities/role.entity';

@Component({
  selector: 'app-role-detail',
  standalone: true,
  imports: [NgFor, NgClass, RouterLink, TablerIconComponent, TranslatePipe],
  template: `
<div class="page-header d-print-none">
  <div class="container-xl">
    <div class="row g-2 align-items-center">
      <div class="col">
        <h2 class="page-title">Role Detail</h2>
      </div>
    </div>
  </div>
</div>
<div class="page-body">
  <div class="container-xl">
    <div class="card">
      <div class="card-body">
        <div class="mb-3">
          <label class="form-label">Name</label>
          <div class="form-control-plaintext">{{ role?.name }}</div>
        </div>
        <div class="mb-3">
          <label class="form-label">Description</label>
          <div class="form-control-plaintext">{{ role?.description }}</div>
        </div>
        <div class="mb-3">
          <label class="form-label">Permissions</label>
          <div>
            <span *ngFor="let perm of role?.permissions" class="badge bg-secondary me-1 mb-1">{{ perm }}</span>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <a [routerLink]="['/roles', roleId, 'edit']" class="btn btn-primary">Edit</a>
        <button class="btn btn-danger" (click)="deleteRole()">Delete</button>
        <a routerLink="/roles" class="btn btn-link link-secondary">Back to List</a>
      </div>
    </div>
  </div>
</div>
  `,
})
export class RoleDetailComponent implements OnInit {
  private getRoleUseCase = inject(GetRoleUseCase);
  private deleteRoleUseCase = inject(DeleteRoleUseCase);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  roleId: number = 0;
  role: Role | null = null;

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
        this.role = role;
      },
      error: (error) => {
        console.error('Failed to load role:', error);
      },
    });
  }

  deleteRole() {
    if (confirm('Are you sure you want to delete this role?')) {
      this.deleteRoleUseCase.execute(this.roleId).subscribe({
        next: () => {
          this.router.navigate(['/roles']);
        },
        error: (error) => {
          console.error('Failed to delete role:', error);
        },
      });
    }
  }
}
