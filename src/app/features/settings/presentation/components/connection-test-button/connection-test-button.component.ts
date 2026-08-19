import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { TablerIconComponent } from 'angular-tabler-icons';

@Component({
  selector: 'app-connection-test-button',
  standalone: true,
  imports: [CommonModule, TranslatePipe, TablerIconComponent],
  template: `
    <button type="button" class="btn" [ngClass]="resultClass" [disabled]="testing" (click)="onTest()">
      <span *ngIf="testing" class="spinner-border spinner-border-sm me-1"></span>
      <i-tabler *ngIf="!testing && !result" [name]="icon" class="me-1"></i-tabler>
      <i-tabler *ngIf="!testing && result === 'success'" name="check" class="me-1"></i-tabler>
      <i-tabler *ngIf="!testing && result === 'error'" name="x" class="me-1"></i-tabler>
      {{ labelKey | translate }}
    </button>
  `,
})
export class ConnectionTestButtonComponent {
  @Input() labelKey = 'settings.common.testConnection';
  @Input() icon = 'plug-connected';
  @Input() testing = false;
  @Input() result: 'success' | 'error' | null = null;
  @Output() test = new EventEmitter<void>();

  get resultClass(): string {
    if (this.result === 'success') return 'btn-success';
    if (this.result === 'error') return 'btn-danger';
    return 'btn-outline-primary';
  }

  onTest(): void {
    this.test.emit();
  }
}
