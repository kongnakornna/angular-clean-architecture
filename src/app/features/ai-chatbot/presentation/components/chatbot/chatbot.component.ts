import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { CHATBOT_REPOSITORY } from '../../../../../core/di/tokens';
import { IChatbotRepository } from '../../../domain/repositories/chatbot.repository';
import { ChatMessage } from '../../../domain/entities/chat-message.entity';
import { BUILT_IN_TOOLS } from '../../../domain/entities/tool-definition.entity';
import { ContextProviderService } from '../../../data/services/context-provider.service';
import { ChatHistoryService } from '../../../data/services/chat-history.service';
import { ChatIconComponent } from '../chat-icon/chat-icon.component';
import { ChatPopupComponent } from '../chat-popup/chat-popup.component';

@Component({
  selector: 'app-ai-chatbot',
  standalone: true,
  imports: [CommonModule, ChatIconComponent, ChatPopupComponent],
  template: `
    <app-chat-icon [isOpen]="isOpen" (toggle)="toggleChat()"></app-chat-icon>
    <app-chat-popup
      [isOpen]="isOpen"
      [messages]="messages"
      [models]="models"
      [selectedModel]="selectedModel"
      [loading]="loading"
      (close)="toggleChat()"
      (onSend)="sendMessage($event)"
      (modelChange)="onModelChange($event)"
      (onToolConfirm)="confirmTool($event)"
      (onToolReject)="rejectTool($event)">
    </app-chat-popup>
  `
})
export class ChatbotComponent implements OnInit, OnDestroy {
  isOpen = false;
  loading = false;
  selectedModel = '';
  messages: ChatMessage[] = [];
  models: string[] = [];
  private destroy$ = new Subject<void>();
  private pendingToolCallId = '';

  constructor(
    @Inject(CHATBOT_REPOSITORY) private chatbotRepo: IChatbotRepository,
    private contextProvider: ContextProviderService,
    private chatHistory: ChatHistoryService
  ) {}

  ngOnInit() {
    this.messages = this.chatHistory.getMessages();
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.models.length === 0) {
      this.chatbotRepo.getAvailableModels()
        .pipe(takeUntil(this.destroy$))
        .subscribe(models => {
          this.models = models;
          if (models.length > 0 && !this.selectedModel) {
            this.selectedModel = models[0];
          }
        });
    }
  }

  sendMessage(text: string) {
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };
    this.messages = [...this.messages, userMsg];
    this.loading = true;

    const contextTypes = this.contextProvider.detectContextTypes(text);
    let messagesToSend = [...this.messages];

    if (contextTypes.length > 0) {
      this.contextProvider.getContext(contextTypes)
        .pipe(takeUntil(this.destroy$))
        .subscribe(context => {
          const systemMsg: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'system',
            content: `System context:\n${context}`,
            timestamp: new Date()
          };
          messagesToSend = [systemMsg, ...messagesToSend];
          this.streamResponse(messagesToSend);
        });
    } else {
      this.streamResponse(messagesToSend);
    }
  }

  private streamResponse(messages: ChatMessage[]) {
    this.chatbotRepo.sendMessageStream(messages, BUILT_IN_TOOLS)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (msg) => {
          this.messages = [...this.messages, msg];
          if (msg.toolCall) {
            this.loading = false;
            this.pendingToolCallId = msg.toolCall.id;
          }
        },
        complete: () => {
          if (!this.pendingToolCallId) this.loading = false;
        },
        error: () => this.loading = false
      });
  }

  confirmTool(toolCallId: string) {
    const toolMsg = this.messages.find(m => m.toolCall?.id === toolCallId);
    if (!toolMsg?.toolCall) return;

    this.loading = true;
    this.chatbotRepo.executeAction(toolMsg.toolCall.name, toolMsg.toolCall.arguments)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        toolMsg.toolResult = result;
        this.messages = [...this.messages];
        this.loading = false;
        this.pendingToolCallId = '';
      });
  }

  rejectTool(toolCallId: string) {
    const rejectMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: 'ยกเลิกแล้วค่ะ',
      timestamp: new Date()
    };
    this.messages = [...this.messages, rejectMsg];
    this.pendingToolCallId = '';
  }

  onModelChange(model: string) {
    this.selectedModel = model;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
