import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { TablerIconComponent } from 'angular-tabler-icons';

interface TokenItem {
  id: string;
  name: string;
  token: string;
  permissions: string[];
  expiresAt: Date;
  isActive: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-token-table',
  standalone: true,
  imports: [CommonModule, TranslatePipe, TablerIconComponent],
  template: `
    <div class="table-responsive">
      <table class="table table-vcenter card-table">
        <thead>
          <tr>
            <th>{{ 'settings.token.tokenName' | translate }}</th>
            <th>{{ 'settings.token.tokenValue' | translate }}</th>
            <th>{{ 'settings.token.permissions' | translate }}</th>
            <th>{{ 'settings.token.expiresAt' | translate }}</th>
            <th>{{ 'settings.token.status' | translate }}</th>
            <th class="w-1"></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of tokens">
            <td>{{ item.name }}</td>
            <td>
              <code class="token-value">{{ showToken[item.id] ? item.token : '••••••••••••••••' }}</code>
              <button class="btn btn-sm btn-link" (click)="toggleTokenVisibility(item.id)">
                <i-tabler [name]="showToken[item.id] ? 'eye-off' : 'eye'" class="icon-tabler"></i-tabler>
              </button>
            </td>
            <td>
              <span *ngFor="let p of item.permissions" class="badge bg-blue me-1">{{ p }}</span>
            </td>
            <td>{{ item.expiresAt | date:'medium' }}</td>
            <td>
              <span class="badge" [ngClass]="item.isActive ? 'bg-green' : 'bg-secondary'">
                {{ item.isActive ? ('settings.common.enabled' | translate) : ('settings.common.disabled' | translate) }}
              </span>
            </td>
            <td>
              <button class="btn btn-sm btn-outline-danger" (click)="revoke.emit(item.id)">
                <i-tabler name="trash" class="icon-tabler"></i-tabler>
              </button>
            </td>
          </tr>
          <tr *ngIf="tokens.length === 0">
            <td colspan="6" class="text-center text-secondary py-4">{{ 'settings.token.noData' | translate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .icon-tabler { width: 1rem; height: 1rem; }
    .token-value { font-size: 0.85em; }
  `]
})
export class TokenTableComponent {
  @Input() tokens: TokenItem[] = [];
  @Output() revoke = new EventEmitter<string>();

  showToken: Record<string, boolean> = {};

  toggleTokenVisibility(id: string): void {
    this.showToken[id] = !this.showToken[id];
  }
}
