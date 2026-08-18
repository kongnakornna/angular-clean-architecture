import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent {
  @Input() progress = 0;
  @Input() status = '';
}
