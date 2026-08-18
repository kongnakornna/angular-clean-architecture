import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IChatbotRepository } from '../../domain/repositories/chatbot.repository';
import { ChatMessage } from '../../domain/entities/chat-message.entity';
import { ToolDefinition } from '../../domain/entities/tool-definition.entity';
import { ToolResult } from '../../domain/entities/chat-message.entity';
import { OllamaApiDataSource } from '../datasources/ollama-api.datasource';
import { ActionExecutorService } from './action-executor.service';
import { ContextProviderService } from './context-provider.service';
import { ChatHistoryService } from './chat-history.service';

@Injectable()
export class ChatbotRepositoryImpl implements IChatbotRepository {
  constructor(
    private ollamaApi: OllamaApiDataSource,
    private actionExecutor: ActionExecutorService,
    private contextProvider: ContextProviderService,
    private chatHistory: ChatHistoryService
  ) {}

  sendMessage(messages: ChatMessage[], tools: ToolDefinition[]): Observable<ChatMessage> {
    return this.ollamaApi.sendMessage(messages, tools);
  }

  sendMessageStream(messages: ChatMessage[], tools: ToolDefinition[]): Observable<ChatMessage> {
    return this.ollamaApi.sendMessageStream(messages, tools).pipe(
      tap(msg => this.chatHistory.appendMessage(msg)),
      catchError(err => {
        console.error('Chatbot error:', err);
        return of({
          id: crypto.randomUUID(),
          role: 'assistant' as const,
          content: 'เกิดข้อผิดพลาดในการเชื่อมต่อ Ollama กรุณาตรวจสอบว่า Ollama กำลังทำงานอยู่',
          timestamp: new Date()
        });
      })
    );
  }

  getAvailableModels(): Observable<string[]> {
    return this.ollamaApi.getAvailableModels();
  }

  executeAction(action: string, params: Record<string, any>): Observable<ToolResult> {
    return this.actionExecutor.execute(action, params);
  }
}
