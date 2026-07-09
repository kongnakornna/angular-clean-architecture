import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent {
  stats = [
    { label: 'รายได้รวม', value: '฿45,230', change: '+12.5%' },
    { label: 'งานทั้งหมด', value: '156', change: '+8.2%' },
    { label: 'ลูกค้าใหม่', value: '23', change: '+5.1%' },
    { label: 'Conversion Rate', value: '3.2%', change: '+0.8%' },
  ];
}