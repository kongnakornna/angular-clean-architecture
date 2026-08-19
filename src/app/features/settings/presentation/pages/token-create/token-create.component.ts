import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CreateTokenUseCase } from '../../../domain/use-cases/create-token.use-case';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-token-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './token-create.component.html',
})
export class TokenCreateComponent {
  name = '';
  permissions: string[] = [];
  expiresAt = '';
  availablePermissions = ['read', 'write', 'delete', 'admin', 'settings'];

  constructor(
    private createUseCase: CreateTokenUseCase,
    private router: Router,
  ) {}

  togglePermission(perm: string): void {
    const idx = this.permissions.indexOf(perm);
    if (idx >= 0) {
      this.permissions.splice(idx, 1);
    } else {
      this.permissions.push(perm);
    }
  }

  isPermissionSelected(perm: string): boolean {
    return this.permissions.includes(perm);
  }

  onSubmit(): void {
    this.createUseCase.execute({
      name: this.name,
      permissions: this.permissions,
      expiresAt: new Date(this.expiresAt),
    }).subscribe({
      next: () => this.router.navigate(['/settings/token']),
    });
  }
}
