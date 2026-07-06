import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
<div class="page-header d-print-none">
  <div class="container-xl">
    <div class="row g-2 align-items-center">
      <div class="col">
        <div class="page-pretitle">จัดการผู้ใช้</div>
        <h2 class="page-title">เพิ่มผู้ใช้ใหม่</h2>
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
            <label class="form-label required">ชื่อผู้ใช้</label>
            <input type="text" class="form-control" [(ngModel)]="model.name" name="name" placeholder="ชื่อผู้ใช้" required>
          </div>
          <div class="mb-3">
            <label class="form-label required">อีเมล</label>
            <input type="email" class="form-control" [(ngModel)]="model.email" name="email" placeholder="อีเมล" required email>
          </div>
          <div class="mb-3">
            <label class="form-label required">บทบาท</label>
            <select class="form-select" [(ngModel)]="model.role" name="role" required>
              <option value="">เลือกบทบาท</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="staff">Staff</option>
              <option value="technician">Technician</option>
              <option value="customer">Customer</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label required">รหัสผ่าน</label>
            <input type="password" class="form-control" [(ngModel)]="model.password" name="password" placeholder="รหัสผ่าน" required>
          </div>
          <div class="mb-3">
            <label class="form-label required">ยืนยันรหัสผ่าน</label>
            <input type="password" class="form-control" [(ngModel)]="model.confirmPassword" name="confirmPassword" placeholder="ยืนยันรหัสผ่าน" required>
          </div>
          <div class="form-footer">
            <a routerLink="/users" class="btn btn-ghost me-2">ยกเลิก</a>
            <button type="submit" class="btn btn-primary" [disabled]="userForm.invalid">บันทึก</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
  `,
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
