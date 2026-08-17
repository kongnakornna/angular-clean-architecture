import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-permission-checkbox',
  standalone: true,
  imports: [NgFor, FormsModule],
  template: `
    <div class="permission-group">
      <h4>{{ module }}</h4>
      <div *ngFor="let action of actions" class="form-check">
        <input class="form-check-input" type="checkbox"
               [id]="module + '-' + action"
               [checked]="isSelected(module + '.' + action)"
               (change)="toggle(module + '.' + action)">
        <label class="form-check-label" [for]="module + '-' + action">{{ action }}</label>
      </div>
    </div>
  `,
  styles: [`
    .permission-group {
      margin-bottom: 1rem;
      padding: 0.5rem;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
    }
    .permission-group h4 {
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      font-weight: 600;
      text-transform: capitalize;
    }
    .form-check {
      margin-bottom: 0.25rem;
    }
  `],
})
export class PermissionCheckboxComponent {
  @Input() module: string = '';
  @Input() actions: string[] = ['view', 'create', 'edit', 'delete', 'approve'];
  @Input() selectedPermissions: string[] = [];
  @Output() permissionsChange = new EventEmitter<string[]>();

  isSelected(permission: string): boolean {
    return this.selectedPermissions.includes(permission);
  }

  toggle(permission: string) {
    if (this.isSelected(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter((p) => p !== permission);
    } else {
      this.selectedPermissions = [...this.selectedPermissions, permission];
    }
    this.permissionsChange.emit(this.selectedPermissions);
  }
}
