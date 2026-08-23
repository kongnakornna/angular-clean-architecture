import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { TablerIconComponent } from 'angular-tabler-icons';

@Component({
  selector: 'app-settings-form-card',
  standalone: true,
  imports: [CommonModule, TranslatePipe, TablerIconComponent],
  template: `
    <div class="card">
      <div class="card-header" *ngIf="title">
        <h3 class="card-title">
          <i-tabler *ngIf="icon" [name]="icon" class="me-2 icon-tabler"></i-tabler>
          {{ title | translate }}
        </h3>
        <div class="card-actions" *ngIf="subtitle">
          <span class="text-secondary">{{ subtitle | translate }}</span>
        </div>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
      <div class="card-footer" *ngIf="showFooter">
        <ng-content select="[footer]"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .icon-tabler { width: 1.25rem; height: 1.25rem; }
    .card-actions { margin-left: auto; }
  `]
})
export class SettingsFormCardComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() icon = '';
  @Input() showFooter = false;
}
