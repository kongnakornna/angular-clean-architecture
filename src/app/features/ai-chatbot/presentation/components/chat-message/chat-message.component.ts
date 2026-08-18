import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessage, ToolCall } from '../../../domain/entities/chat-message.entity';
import { ToolExecutionCardComponent } from '../tool-execution-card/tool-execution-card.component';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [CommonModule, ToolExecutionCardComponent],
  template: `
    <div *ngIf="message.role === 'user'" class="chat-msg chat-msg-user">
      <div class="chat-bubble chat-bubble-user">{{ message.content }}</div>
    </div>

    <div *ngIf="message.role === 'assistant'" class="chat-msg chat-msg-assistant">
      <div class="chat-avatar">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="20" height="20" viewBox="0 0 24 24"
          stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 5m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
          <path d="M6 20l-1 -4c-1 -2.5 -1 -5 0 -7c1 -2 3 -3 5 -3c4 0 7 2 8 5l1 4" />
        </svg>
      </div>
      <div class="chat-bubble chat-bubble-assistant">{{ message.content }}</div>
    </div>

    <div *ngIf="message.role === 'tool'" class="chat-msg chat-msg-tool">
      <app-tool-execution-card
        [toolCall]="message.toolCall!"
        [result]="message.toolResult ?? null"
        (confirm)="onConfirm.emit($event)"
        (reject)="onReject.emit($event)">
      </app-tool-execution-card>
    </div>
  `,
  styles: [`
    .chat-msg { display: flex; margin-bottom: 12px; }
    .chat-msg-user { justify-content: flex-end; }
    .chat-msg-assistant { justify-content: flex-start; }
    .chat-msg-tool { justify-content: center; }
    .chat-bubble {
      max-width: 80%;
      padding: 8px 12px;
      border-radius: 12px;
      font-size: 14px;
      line-height: 1.4;
    }
    .chat-bubble-user {
      background: var(--tblr-primary, #206bc4);
      color: white;
      border-bottom-right-radius: 4px;
    }
    .chat-bubble-assistant {
      background: var(--tblr-bg-surface, #f8fafc);
      color: var(--tblr-text, #1e293b);
      border-bottom-left-radius: 4px;
    }
    .chat-avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--tblr-primary, #206bc4);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
      flex-shrink: 0;
    }
  `]
})
export class ChatMessageComponent {
  @Input() message!: ChatMessage;
  @Output() onConfirm = new EventEmitter<string>();
  @Output() onReject = new EventEmitter<string>();
}
