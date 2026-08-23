import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IChatbotRepository } from '../../domain/repositories/chatbot.repository';
import { ChatMessage } from '../../domain/entities/chat-message.entity';
import { ToolDefinition } from '../../domain/entities/tool-definition.entity';
import { OllamaStreamParser } from './ollama-stream.parser';
import { APP_CONFIG, AppConfig } from '../../../../core/config/app.config';

@Injectable()
export class OllamaApiDataSource implements IChatbotRepository {
  private streamParser = new OllamaStreamParser();

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  sendMessage(messages: ChatMessage[], tools: ToolDefinition[]): Observable<ChatMessage> {
    const body = this.buildRequestBody(messages, tools, false);
    return this.http.post<any>(`${this.config.ollamaUrl}/api/chat`, body).pipe(
      map(response => this.parseResponse(response))
    );
  }

  sendMessageStream(messages: ChatMessage[], tools: ToolDefinition[]): Observable<ChatMessage> {
    const body = this.buildRequestBody(messages, tools, true);
    return this.http.post(`${this.config.ollamaUrl}/api/chat`, body, {
      responseType: 'text',
      observe: 'body'
    }).pipe(
      switchMap(raw => this.streamParser.parseStream$(raw as unknown as Observable<string>))
    );
  }

  getAvailableModels(): Observable<string[]> {
    return this.http.get<{ models: { name: string }[] }>(
      `${this.config.ollamaUrl}/api/tags`
    ).pipe(
      map(res => res.models?.map(m => m.name) || [])
    );
  }

  executeAction(action: string, params: Record<string, any>): Observable<any> {
    throw new Error('Use ActionExecutorService instead');
  }

  private buildRequestBody(messages: ChatMessage[], tools: ToolDefinition[], stream: boolean) {
    return {
      model: this.config.ollamaModel || 'llama3',
      messages: messages.map(m => ({
        role: m.role,
        content: m.content,
        tool_calls: m.toolCall ? [{ type: 'function', function: m.toolCall }] : undefined
      })),
      tools: tools.length > 0 ? tools.map(t => ({
        type: 'function',
        function: { name: t.name, description: t.description, parameters: t.parameters }
      })) : undefined,
      stream
    };
  }

  private parseResponse(response: any): ChatMessage {
    const msg = response.message;
    return {
      id: crypto.randomUUID(),
      role: msg.role || 'assistant',
      content: msg.content || '',
      timestamp: new Date(),
      toolCall: msg.tool_calls?.[0] ? {
        id: crypto.randomUUID(),
        name: msg.tool_calls[0].function.name,
        arguments: msg.tool_calls[0].function.arguments
      } : undefined
    };
  }
}
