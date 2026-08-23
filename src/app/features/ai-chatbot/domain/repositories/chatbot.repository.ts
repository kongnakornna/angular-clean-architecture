import { Observable } from 'rxjs';
import { ChatMessage } from '../entities/chat-message.entity';
import { ToolDefinition } from '../entities/tool-definition.entity';
import { ToolResult } from '../entities/chat-message.entity';

export interface IChatbotRepository {
  sendMessage(messages: ChatMessage[], tools: ToolDefinition[]): Observable<ChatMessage>;
  sendMessageStream(messages: ChatMessage[], tools: ToolDefinition[]): Observable<ChatMessage>;
  getAvailableModels(): Observable<string[]>;
  executeAction(action: string, params: Record<string, any>): Observable<ToolResult>;
}
