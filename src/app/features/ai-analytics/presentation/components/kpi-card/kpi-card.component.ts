import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './kpi-card.component.html',
  styleUrls: ['./kpi-card.component.scss'],
})
export class KpiCardComponent {
  @Input() label = '';
  @Input() value: string | number = '';
  @Input() delta = 0;
  @Input() deltaDirection: 'up' | 'down' | 'neutral' = 'neutral';
}
