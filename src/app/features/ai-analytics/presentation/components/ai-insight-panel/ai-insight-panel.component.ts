import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-ai-insight-panel',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './ai-insight-panel.component.html',
  styleUrls: ['./ai-insight-panel.component.scss'],
})
export class AiInsightPanelComponent {
  @Input() insights: any[] = [];

  onExplore(insight: any): void {
    // emits parent-level event with insight context
  }

  onGenerateReport(insight: any): void {
    // emits parent-level event with insight context
  }

  onPin(insight: any): void {
    // emits parent-level event with insight context
  }
}
