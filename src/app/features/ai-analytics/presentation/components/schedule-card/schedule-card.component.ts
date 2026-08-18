import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-schedule-card',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.scss'],
})
export class ScheduleCardComponent {
  @Input() job: any;
  @Output() edit = new EventEmitter<void>();
  @Output() togglePause = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
}
