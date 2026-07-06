import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  standalone: false,
  template: `
    <button
      class="btn btn-primary"
      [class.btn-loading]="loading"
      [disabled]="disabled || loading"
      (click)="onClick.emit($event)"
    >
      <i-tabler *ngIf="icon" [name]="icon" class="me-1"></i-tabler>
      <ng-content></ng-content>
    </button>
  `,
})
export class PrimaryButtonComponent {
  @Input() icon?: string;
  @Input() loading = false;
  @Input() disabled = false;
  @Output() onClick = new EventEmitter<Event>();
}
