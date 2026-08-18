import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-alert-badge',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './alert-badge.component.html',
  styleUrls: ['./alert-badge.component.scss'],
})
export class AlertBadgeComponent {
  @Input() severity: 'critical' | 'warning' | 'info' = 'info';
}
