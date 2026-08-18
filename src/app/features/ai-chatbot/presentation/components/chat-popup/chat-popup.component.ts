import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ChatMessage } from '../../../domain/entities/chat-message.entity';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';

@Component({
  selector: 'app-chat-popup',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, ChatMessageComponent, ChatInputComponent],
  template: `
    <div class="chat-window" [class.chat-hidden]="!isOpen">
      <div class="chat-header">
        <div class="chat-header-title">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="18" height="18" viewBox="0 0 24 24"
            stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 5m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path d="M6 20l-1 -4c-1 -2.5 -1 -5 0 -7c1 -2 3 -3 5 -3c4 0 7 2 8 5l1 4" />
          </svg>
          <span>{{ 'aiChat.title' | translate }}</span>
        </div>
        <div class="chat-header-actions">
          <select class="form-select form-select-sm" [(ngModel)]="selectedModel"
                  (change)="modelChange.emit(selectedModel)">
            <option value="" disabled>{{ 'aiChat.modelSelect' | translate }}</option>
            <option *ngFor="let m of models" [value]="m">{{ m }}</option>
          </select>
          <button class="btn btn-sm btn-ghost" (click)="close.emit()">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="18" height="18" viewBox="0 0 24 24"
              stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M18 6l-12 12" /><path d="M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div class="chat-messages" #messagesContainer>
        <div *ngIf="messages.length === 0" class="chat-welcome">
          {{ 'aiChat.welcomeMessage' | translate }}
        </div>
        <app-chat-message
          *ngFor="let msg of messages"
          [message]="msg"
          (onConfirm)="onToolConfirm.emit($event)"
          (onReject)="onToolReject.emit($event)">
        </app-chat-message>
        <div *ngIf="loading" class="chat-typing">
          <span></span><span></span><span></span>
        </div>
      </div>

      <app-chat-input [loading]="loading" (send)="onSend.emit($event)"></app-chat-input>
    </div>
  `,
  styles: [`
    .chat-window {
      position: fixed;
      bottom: 90px;
      right: 24px;
      width: 380px;
      height: 520px;
      background: var(--tblr-bg, #ffffff);
      border: 1px solid var(--tblr-border-color, #dee2e6);
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      z-index: 9998;
      overflow: hidden;
    }
    .chat-hidden { display: none; }
    .chat-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: var(--tblr-primary, #206bc4);
      color: white;
    }
    .chat-header-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
    }
    .chat-header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .chat-header-actions select {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
      font-size: 12px;
    }
    .chat-header-actions .btn-ghost {
      color: white;
      background: transparent;
      border: none;
    }
    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
    }
    .chat-welcome {
      text-align: center;
      color: var(--tblr-text-muted, #6c757d);
      font-size: 14px;
      padding: 20px;
    }
    .chat-typing {
      display: flex;
      gap: 4px;
      padding: 8px 12px;
      background: var(--tblr-bg-surface, #f8fafc);
      border-radius: 12px;
      width: fit-content;
    }
    .chat-typing span {
      width: 6px;
      height: 6px;
      background: var(--tblr-text-muted, #6c757d);
      border-radius: 50%;
      animation: bounce 1.4s infinite both;
    }
    .chat-typing span:nth-child(2) { animation-delay: 0.16s; }
    .chat-typing span:nth-child(3) { animation-delay: 0.32s; }
    @keyframes bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
  `]
})
export class ChatPopupComponent {
  @Input() isOpen = false;
  @Input() messages: ChatMessage[] = [];
  @Input() models: string[] = [];
  @Input() selectedModel = '';
  @Input() loading = false;
  @Output() close = new EventEmitter<void>();
  @Output() onSend = new EventEmitter<string>();
  @Output() modelChange = new EventEmitter<string>();
  @Output() onToolConfirm = new EventEmitter<string>();
  @Output() onToolReject = new EventEmitter<string>();
}
