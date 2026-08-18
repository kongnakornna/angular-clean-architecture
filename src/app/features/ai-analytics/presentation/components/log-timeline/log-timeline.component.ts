import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-log-timeline',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './log-timeline.component.html',
  styleUrls: ['./log-timeline.component.scss'],
})
export class LogTimelineComponent {
  @Input() logs: any[] = [];

  getIcon(type: string): string {
    const icons: Record<string, string> = {
      success: 'circle-check',
      error: 'circle-x',
      warning: 'alert-triangle',
      info: 'info-circle',
    };
    return icons[type] || 'circle';
  }

  getIconClass(type: string): string {
    const classes: Record<string, string> = {
      success: 'text-green',
      error: 'text-red',
      warning: 'text-yellow',
      info: 'text-blue',
    };
    return classes[type] || 'text-muted';
  }
}
