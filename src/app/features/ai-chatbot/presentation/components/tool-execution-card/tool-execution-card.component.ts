import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ToolCall, ToolResult } from '../../../domain/entities/chat-message.entity';

@Component({
  selector: 'app-tool-execution-card',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="tool-card" [class.tool-card-success]="result?.success"
         [class.tool-card-pending]="!result">
      <div class="tool-card-header">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="16" height="16" viewBox="0 0 24 24"
          stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 5m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
          <path d="M6 20l-1 -4c-1 -2.5 -1 -5 0 -7c1 -2 3 -3 5 -3c4 0 7 2 8 5l1 4" />
        </svg>
        <span class="tool-name">{{ getToolLabel(toolCall.name) }}</span>
      </div>
      <div class="tool-card-body">
        <pre class="tool-args">{{ toolCall.arguments | json }}</pre>
      </div>
      <div class="tool-card-actions" *ngIf="!result">
        <button class="btn btn-success btn-sm" (click)="confirm.emit(toolCall.id)">
          {{ 'aiChat.confirmAction' | translate }}
        </button>
        <button class="btn btn-outline-danger btn-sm" (click)="reject.emit(toolCall.id)">
          {{ 'aiChat.rejectAction' | translate }}
        </button>
      </div>
      <div class="tool-card-result" *ngIf="result">
        <span *ngIf="result.success" class="text-success">
          {{ 'aiChat.actionSuccess' | translate }}
        </span>
        <span *ngIf="!result.success" class="text-danger">
          {{ result.content }}
        </span>
      </div>
    </div>
  `,
  styles: [`
    .tool-card {
      background: var(--tblr-bg-surface, #f8fafc);
      border: 1px solid var(--tblr-border-color, #dee2e6);
      border-radius: 8px;
      padding: 12px;
      max-width: 85%;
    }
    .tool-card-header {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 8px;
      color: var(--tblr-primary, #206bc4);
      font-weight: 600;
      font-size: 13px;
    }
    .tool-args {
      font-size: 12px;
      color: var(--tblr-text-muted, #6c757d);
      background: var(--tblr-bg, #ffffff);
      padding: 8px;
      border-radius: 4px;
      margin: 0;
      white-space: pre-wrap;
    }
    .tool-card-actions {
      display: flex;
      gap: 8px;
      margin-top: 8px;
    }
    .tool-card-success { border-color: var(--tblr-success, #2fb344); }
    .tool-card-result { margin-top: 8px; font-size: 13px; }
  `]
})
export class ToolExecutionCardComponent {
  @Input() toolCall!: ToolCall;
  @Input() result: ToolResult | null = null;
  @Output() confirm = new EventEmitter<string>();
  @Output() reject = new EventEmitter<string>();

  getToolLabel(name: string): string {
    const labels: Record<string, string> = {
      create_job: 'aiChat.toolCreateJob',
      send_email: 'aiChat.toolSendEmail',
      generate_report: 'aiChat.toolGenerateReport',
      create_quotation: 'aiChat.toolCreateQuotation',
      create_purchase_order: 'aiChat.toolCreatePO',
      search_records: 'aiChat.toolSearchRecords',
      get_dashboard_data: 'aiChat.getDashboardData'
    };
    return labels[name] || name;
  }
}
