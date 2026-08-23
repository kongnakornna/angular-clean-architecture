# Implementation Plan: AI Chatbot Feature

## ภาพรวมการแก้ไข

| # | Layer | ไฟล์ | สิ่งที่แก้ |
|---|-------|------|-----------|
| 1 | model | `src/app/features/ai-chatbot/domain/entities/chat-message.entity.ts` | เพิ่ม entities: ChatMessage, ChatSession, ToolCall, ToolResult |
| 2 | model | `src/app/features/ai-chatbot/domain/entities/tool-definition.entity.ts` | เพิ่ม ToolDefinition + built-in tools definitions |
| 3 | model | `src/app/features/ai-chatbot/domain/repositories/chatbot.repository.ts` | เพิ่ม IChatbotRepository interface |
| 4 | model | `src/app/features/ai-chatbot/domain/use-cases/` | เพิ่ม use cases: SendMessage, GetContext, ExecuteAction, GetModels |
| 5 | DI | `src/app/core/di/tokens.ts` | เพิ่ม CHATBOT_REPOSITORY injection token |
| 6 | DI | `src/app/core/di/providers.ts` | เพิ่ม chatbot providers array |
| 7 | data | `src/app/features/ai-chatbot/data/datasources/ollama-api.datasource.ts` | เพิ่ม OllamaApiDataSource — HTTP client สำหรับ Ollama API |
| 8 | data | `src/app/features/ai-chatbot/data/datasources/ollama-stream.parser.ts` | เพิ่ม OllamaStreamParser — parse NDJSON streaming response |
| 9 | data | `src/app/features/ai-chatbot/data/services/context-provider.service.ts` | เพิ่ม ContextProviderService — inject context จาก dashboard/job/customer/IoT/analytics |
| 10 | data | `src/app/features/ai-chatbot/data/services/action-executor.service.ts` | เพิ่ม ActionExecutorService — map action → HTTP call |
| 11 | data | `src/app/features/ai-chatbot/data/repositories/chatbot.repository.impl.ts` | เพิ่ม ChatbotRepositoryImpl — implement IChatbotRepository |
| 12 | data | `src/app/features/ai-chatbot/data/services/chat-history.service.ts` | เพิ่ม ChatHistoryService — localStorage persistence |
| 13 | config | `src/environments/environment.ts` | เพิ่ม ollamaUrl, ollamaModel, chatbotEnabled |
| 14 | config | `src/environments/environment.prod.ts` | เพิ่ม ollamaUrl, ollamaModel, chatbotEnabled |
| 15 | config | `src/app/core/config/app.config.ts` | เพิ่ม ollamaUrl, ollamaModel, chatbotEnabled ใน AppConfig |
| 16 | i18n | `src/assets/i18n/en.json` | เพิ่ม section aiChat |
| 17 | i18n | `src/assets/i18n/th.json` | เพิ่ม section aiChat (ภาษาไทย) |
| 18 | presentation | `src/app/features/ai-chatbot/presentation/components/chat-icon/chat-icon.component.ts` | เพิ่ม ChatIconComponent — floating FAB button |
| 19 | presentation | `src/app/features/ai-chatbot/presentation/components/chat-popup/chat-popup.component.ts` | เพิ่ม ChatPopupComponent — popup window |
| 20 | presentation | `src/app/features/ai-chatbot/presentation/components/chat-message/chat-message.component.ts` | เพิ่ม ChatMessageComponent — message bubble |
| 21 | presentation | `src/app/features/ai-chatbot/presentation/components/chat-input/chat-input.component.ts` | เพิ่ม ChatInputComponent — textarea + send |
| 22 | presentation | `src/app/features/ai-chatbot/presentation/components/tool-execution-card/tool-execution-card.component.ts` | เพิ่ม ToolExecutionCardComponent — confirm/reject action |
| 23 | presentation | `src/app/features/ai-chatbot/presentation/components/chatbot/chatbot.component.ts` | เพิ่ม ChatbotComponent — container main |
| 24 | layout | `src/app/layouts/app-layout/app-layout.component.html` | เพิ่ม `<app-ai-chatbot>` |
| 25 | layout | `src/app/layouts/app-layout/app-layout.component.ts` | เพิ่ม chatbotEnabled property |

---

## Section 1: Domain Entities

### ไฟล์: `src/app/features/ai-chatbot/domain/entities/chat-message.entity.ts` (ไฟล์ใหม่)

**จาก:** ไม่มี → **เป็น:** เพิ่ม entities ทั้งหมด

```typescript
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  timestamp: Date;
  toolCall?: ToolCall;
  toolResult?: ToolResult;
}

export interface ToolCall {
  id: string;
  name: string;
  arguments: Record<string, any>;
}

export interface ToolResult {
  toolCallId: string;
  content: string;
  success: boolean;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}
```

---

## Section 2: Tool Definitions

### ไฟล์: `src/app/features/ai-chatbot/domain/entities/tool-definition.entity.ts` (ไฟล์ใหม่)

**จาก:** ไม่มี → **เป็น:** เพิ่ม ToolDefinition + built-in tools

```typescript
export interface ToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, {
    type: string;
    description: string;
    required?: boolean;
  }>;
}

export const BUILT_IN_TOOLS: ToolDefinition[] = [
  {
    name: 'search_records',
    description: 'Search for jobs, customers, products, or other records in the system',
    parameters: {
      type: { type: 'string', description: 'Record type: job, customer, product', required: true },
      query: { type: 'string', description: 'Search query', required: true },
      limit: { type: 'number', description: 'Max results (default 10)' }
    }
  },
  {
    name: 'create_job',
    description: 'Create a new job in the system',
    parameters: {
      title: { type: 'string', description: 'Job title', required: true },
      customerId: { type: 'string', description: 'Customer ID' },
      description: { type: 'string', description: 'Job description' },
      priority: { type: 'string', description: 'Priority: low, medium, high, urgent' }
    }
  },
  {
    name: 'send_email',
    description: 'Send an email to a customer or team member',
    parameters: {
      to: { type: 'string', description: 'Recipient email', required: true },
      subject: { type: 'string', description: 'Email subject', required: true },
      body: { type: 'string', description: 'Email body', required: true }
    }
  },
  {
    name: 'generate_report',
    description: 'Generate a report (sales, jobs, performance, etc.)',
    parameters: {
      type: { type: 'string', description: 'Report type: sales, jobs, performance', required: true },
      dateFrom: { type: 'string', description: 'Start date (YYYY-MM-DD)' },
      dateTo: { type: 'string', description: 'End date (YYYY-MM-DD)' }
    }
  },
  {
    name: 'create_quotation',
    description: 'Create a new quotation for a customer',
    parameters: {
      customerId: { type: 'string', description: 'Customer ID', required: true },
      items: { type: 'array', description: 'Quotation items', required: true },
      notes: { type: 'string', description: 'Additional notes' }
    }
  },
  {
    name: 'create_purchase_order',
    description: 'Create a purchase order',
    parameters: {
      supplierId: { type: 'string', description: 'Supplier ID', required: true },
      items: { type: 'array', description: 'PO items', required: true },
      notes: { type: 'string', description: 'Additional notes' }
    }
  },
  {
    name: 'get_dashboard_data',
    description: 'Get current dashboard summary data (KPIs, revenue, orders)',
    parameters: {}
  }
];
```

---

## Section 3: Repository Interface

### ไฟล์: `src/app/features/ai-chatbot/domain/repositories/chatbot.repository.ts` (ไฟล์ใหม่)

**จาก:** ไม่มี → **เป็น:** เพิ่ม IChatbotRepository interface

```typescript
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
```

---

## Section 4: Use Cases

### ไฟล์: `src/app/features/ai-chatbot/domain/use-cases/send-message.use-case.ts` (ไฟล์ใหม่)

**จาก:** ไม่มี → **เป็น:** เพิ่ม use case สำหรับส่งข้อความ

```typescript
import { Observable } from 'rxjs';
import { ChatMessage } from '../entities/chat-message.entity';
import { IChatbotRepository } from '../repositories/chatbot.repository';
import { BUILT_IN_TOOLS } from '../entities/tool-definition.entity';

export class SendMessageUseCase {
  constructor(private repository: IChatbotRepository) {}

  execute(messages: ChatMessage[], stream = true): Observable<ChatMessage> {
    return stream
      ? this.repository.sendMessageStream(messages, BUILT_IN_TOOLS)
      : this.repository.sendMessage(messages, BUILT_IN_TOOLS);
  }
}
```

### ไฟล์: `src/app/features/ai-chatbot/domain/use-cases/get-context.use-case.ts` (ไฟล์ใหม่)

```typescript
import { Observable } from 'rxjs';
import { ContextProviderService } from '../../data/services/context-provider.service';

export class GetContextUseCase {
  constructor(private contextProvider: ContextProviderService) {}

  execute(contextTypes: string[]): Observable<string> {
    return this.contextProvider.getContext(contextTypes);
  }
}
```

### ไฟล์: `src/app/features/ai-chatbot/domain/use-cases/execute-action.use-case.ts` (ไฟล์ใหม่)

```typescript
import { Observable } from 'rxjs';
import { ToolResult } from '../entities/chat-message.entity';
import { IChatbotRepository } from '../repositories/chatbot.repository';

export class ExecuteActionUseCase {
  constructor(private repository: IChatbotRepository) {}

  execute(action: string, params: Record<string, any>): Observable<ToolResult> {
    return this.repository.executeAction(action, params);
  }
}
```

### ไฟล์: `src/app/features/ai-chatbot/domain/use-cases/get-models.use-case.ts` (ไฟล์ใหม่)

```typescript
import { Observable } from 'rxjs';
import { IChatbotRepository } from '../repositories/chatbot.repository';

export class GetModelsUseCase {
  constructor(private repository: IChatbotRepository) {}

  execute(): Observable<string[]> {
    return this.repository.getAvailableModels();
  }
}
```

---

## Section 5: DI Tokens

### ไฟล์: `src/app/core/di/tokens.ts` (แก้ไข)

**จาก:** มี tokens อยู่แล้ว → **เป็น:** เพิ่ม CHATBOT_REPOSITORY

```typescript
// เพิ่มบรรทัดนี้ (ต่อจาก tokens ที่มีอยู่)
export const CHATBOT_REPOSITORY = new InjectionToken<IChatbotRepository>('ChatbotRepository');
```

### ไฟล์: `src/app/core/di/providers.ts` (แก้ไข)

**จาก:** มี providers อยู่แล้ว → **เป็น:** เพิ่ม chatbot providers

```typescript
import { ChatbotRepositoryImpl } from '../../features/ai-chatbot/data/repositories/chatbot.repository.impl';
import { CHATBOT_REPOSITORY } from './tokens';

// เพิ่มใน providers array
{ provide: CHATBOT_REPOSITORY, useClass: ChatbotRepositoryImpl },
```

---

## Section 6: Ollama API Datasource

### ไฟล์: `src/app/features/ai-chatbot/data/datasources/ollama-api.datasource.ts` (ไฟล์ใหม่)

**จาก:** ไม่มี → **เป็น:** เพิ่ม HTTP client สำหรับ Ollama API

```typescript
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map, switchMap, scan, takeWhile } from 'rxjs/operators';
import { APP_CONFIG, AppConfig } from '../../../core/config/app.config';
import { ChatMessage, ToolCall } from '../entities/chat-message.entity';
import { ToolDefinition } from '../entities/tool-definition.entity';
import { OllamaStreamParser } from './ollama-stream.parser';
import { IChatbotRepository } from '../repositories/chatbot.repository';

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
    // Handled by ActionExecutorService, not here
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
```

---

## Section 7: Stream Parser

### ไฟล์: `src/app/features/ai-chatbot/data/datasources/ollama-stream.parser.ts` (ไฟล์ใหม่)

**จาก:** ไม่มี → **เป็น:** เพิ่ม NDJSON stream parser

```typescript
import { Observable, from } from 'rxjs';
import { switchMap, map, scan, takeWhile, filter } from 'rxjs/operators';
import { ChatMessage } from '../entities/chat-message.entity';

export class OllamaStreamParser {
  parseStream$(raw$: Observable<string>): Observable<ChatMessage> {
    let buffer = '';

    return raw$.pipe(
      switchMap(raw => {
        buffer += raw;
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // keep incomplete line in buffer
        return from(lines.filter(l => l.trim()));
      }),
      map(line => {
        try { return JSON.parse(line); }
        catch { return null; }
      }),
      filter(chunk => chunk && chunk.message),
      map(chunk => ({
        id: crypto.randomUUID(),
        role: (chunk.message.role || 'assistant') as ChatMessage['role'],
        content: chunk.message.content || '',
        timestamp: new Date(),
        done: chunk.done,
        toolCall: chunk.message.tool_calls?.[0] ? {
          id: crypto.randomUUID(),
          name: chunk.message.tool_calls[0].function.name,
          arguments: chunk.message.tool_calls[0].function.arguments
        } : undefined
      })),
      scan((acc, chunk) => ({
        ...acc,
        content: acc.content + chunk.content,
        toolCall: chunk.toolCall || acc.toolCall,
        done: chunk.done
      }), { id: '', role: 'assistant' as const, content: '', timestamp: new Date(), done: false } as any),
      takeWhile((chunk: any) => !chunk.done, true),
      map((chunk: any) => ({
        id: chunk.id || crypto.randomUUID(),
        role: chunk.role,
        content: chunk.content,
        timestamp: chunk.timestamp,
        toolCall: chunk.toolCall
      }))
    );
  }
}
```

---

## Section 8: Context Provider Service

### ไฟล์: `src/app/features/ai-chatbot/data/services/context-provider.service.ts` (ไฟล์ใหม่)

**จาก:** ไม่มี → **เป็น:** เพิ่ม service สำหรับ inject context จาก API ที่มีอยู่

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ContextProviderService {
  private baseUrl = environment.apiUrl || '/api';

  constructor(private http: HttpClient) {}

  getContext(contextTypes: string[]): Observable<string> {
    if (contextTypes.length === 0) return of('');

    const requests = contextTypes.map(type => this.fetchContext(type));

    return forkJoin(requests).pipe(
      map(results => results.filter(r => r).join('\n\n'))
    );
  }

  private fetchContext(type: string): Observable<string> {
    const endpoints: Record<string, string> = {
      dashboard: `${this.baseUrl}/dashboard/summary`,
      jobs: `${this.baseUrl}/jobs?limit=5&sort=created_at&order=desc`,
      customers: `${this.baseUrl}/customers?limit=5&sort=name`,
      iot: `${this.baseUrl}/iot/devices?limit=5`,
      analytics: `${this.baseUrl}/analytics/summary`
    };

    const endpoint = endpoints[type];
    if (!endpoint) return of('');

    return this.http.get<any>(endpoint).pipe(
      map(data => `[${type.toUpperCase()} CONTEXT]\n${JSON.stringify(data, null, 2)}`),
      catchError(() => of(''))
    );
  }

  detectContextTypes(message: string): string[] {
    const lower = message.toLowerCase();
    const types: string[] = [];

    if (/dashboard|kpi|revenue|summary|status/i.test(lower)) types.push('dashboard');
    if (/job|order|task|work/i.test(lower)) types.push('jobs');
    if (/customer|client|company/i.test(lower)) types.push('customers');
    if (/iot|device|sensor|alert/i.test(lower)) types.push('iot');
    if (/analytics|report|chart|graph/i.test(lower)) types.push('analytics');

    return types;
  }
}
```

---

## Section 9: Action Executor Service

### ไฟล์: `src/app/features/ai-chatbot/data/services/action-executor.service.ts` (ไฟล์ใหม่)

**จาก:** ไม่มี → **เป็น:** เพิ่ม service สำหรับ execute actions

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { ToolResult } from '../entities/chat-message.entity';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ActionExecutorService {
  private baseUrl = environment.apiUrl || '/api';

  constructor(private http: HttpClient) {}

  execute(action: string, params: Record<string, any>): Observable<ToolResult> {
    const handler = this.actionMap[action];
    if (!handler) {
      return of({ toolCallId: '', content: `Unknown action: ${action}`, success: false });
    }

    return handler(params).pipe(
      map(response => ({
        toolCallId: '',
        content: JSON.stringify(response),
        success: true
      })),
      catchError(err => of({
        toolCallId: '',
        content: `Action failed: ${err.message || err.statusText}`,
        success: false
      }))
    );
  }

  private actionMap: Record<string, (params: any) => Observable<any>> = {
    create_job: (p) => this.http.post(`${this.baseUrl}/jobs`, {
      title: p.title,
      customer_id: p.customerId,
      description: p.description,
      priority: p.priority || 'medium'
    }),

    send_email: (p) => this.http.post(`${this.baseUrl}/email/send`, {
      to: p.to,
      subject: p.subject,
      body: p.body
    }),

    generate_report: (p) => this.http.post(`${this.baseUrl}/reports/generate`, {
      type: p.type,
      date_from: p.dateFrom,
      date_to: p.dateTo
    }),

    create_quotation: (p) => this.http.post(`${this.baseUrl}/quotations`, {
      customer_id: p.customerId,
      items: p.items,
      notes: p.notes
    }),

    create_purchase_order: (p) => this.http.post(`${this.baseUrl}/purchase-orders`, {
      supplier_id: p.supplierId,
      items: p.items,
      notes: p.notes
    }),

    search_records: (p) => this.http.get(`${this.baseUrl}/${p.type}`, {
      params: { q: p.query, limit: (p.limit || 10).toString() }
    }),

    get_dashboard_data: () => this.http.get(`${this.baseUrl}/dashboard/summary`)
  };
}
```

---

## Section 10: Repository Implementation

### ไฟล์: `src/app/features/ai-chatbot/data/repositories/chatbot.repository.impl.ts` (ไฟล์ใหม่)

**จาก:** ไม่มี → **เป็น:** เพิ่ม ChatbotRepositoryImpl

```typescript
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IChatbotRepository } from '../../domain/repositories/chatbot.repository';
import { ChatMessage } from '../../domain/entities/chat-message.entity';
import { ToolDefinition } from '../../domain/entities/tool-definition.entity';
import { ToolResult } from '../../domain/entities/chat-message.entity';
import { OllamaApiDataSource } from '../datasources/ollama-api.datasource';
import { ActionExecutorService } from '../services/action-executor.service';
import { ContextProviderService } from '../services/context-provider.service';
import { ChatHistoryService } from '../services/chat-history.service';
import { BUILT_IN_TOOLS } from '../../domain/entities/tool-definition.entity';

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
    // Inject context from system data if relevant keywords detected
    const lastUserMsg = messages.filter(m => m.role === 'user').pop();
    if (lastUserMsg) {
      const contextTypes = this.contextProvider.detectContextTypes(lastUserMsg.content);
      if (contextTypes.length > 0) {
        // Context will be injected via system message by the caller
      }
    }

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
```

---

## Section 11: Chat History Service

### ไฟล์: `src/app/features/ai-chatbot/data/services/chat-history.service.ts` (ไฟล์ใหม่)

**จาก:** ไม่มี → **เป็น:** เพิ่ม localStorage persistence

```typescript
import { Injectable } from '@angular/core';
import { ChatMessage, ChatSession } from '../../domain/entities/chat-message.entity';

@Injectable()
export class ChatHistoryService {
  private readonly STORAGE_KEY = 'icmon_chat_history';
  private session: ChatSession | null = null;

  constructor() {
    this.session = this.load();
  }

  getMessages(): ChatMessage[] {
    return this.session?.messages || [];
  }

  appendMessage(message: ChatMessage): void {
    if (!this.session) {
      this.session = {
        id: crypto.randomUUID(),
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
    this.session.messages.push(message);
    this.session.updatedAt = new Date();
    this.save();
  }

  clearHistory(): void {
    this.session = null;
    localStorage.removeItem(this.STORAGE_KEY);
  }

  private save(): void {
    if (this.session) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.session));
    }
  }

  private load(): ChatSession | null {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
```

---

## Section 12: Config Updates

### ไฟล์: `src/app/core/config/app.config.ts` (แก้ไข)

**จาก:** AppConfig interface ที่มีอยู่ → **เป็น:** เพิ่ม ollama fields

```typescript
// เพิ่มใน AppConfig interface
ollamaUrl: string;
ollamaModel: string;
chatbotEnabled: boolean;
```

### ไฟล์: `src/environments/environment.ts` (แก้ไข)

**จาก:** environment object ที่มีอยู่ → **เป็น:** เพิ่ม ollama config

```typescript
// เพิ่มใน environment object
ollamaUrl: 'http://localhost:11434',
ollamaModel: 'llama3',
chatbotEnabled: true
```

### ไฟล์: `src/environments/environment.prod.ts` (แก้ไข)

```typescript
// เพิ่มใน environment object
ollamaUrl: 'http://localhost:11434',
ollamaModel: 'llama3',
chatbotEnabled: true
```

---

## Section 13: i18n Keys

### ไฟล์: `src/assets/i18n/en.json` (แก้ไข)

**จาก:** ไม่มี aiChat section → **เป็น:** เพิ่ม aiChat section

```json
"aiChat": {
  "title": "AI Assistant",
  "placeholder": "Ask me anything...",
  "send": "Send",
  "loading": "Thinking...",
  "modelSelect": "Model",
  "noModels": "No models available",
  "confirmAction": "Confirm",
  "rejectAction": "Cancel",
  "actionSuccess": "Action completed successfully",
  "actionFailed": "Action failed",
  "errorConnection": "Cannot connect to Ollama. Please check if Ollama is running.",
  "welcomeMessage": "Hi! I'm your AI assistant. I can help you with jobs, customers, reports, and more.",
  "toolCreateJob": "Create Job",
  "toolSendEmail": "Send Email",
  "toolGenerateReport": "Generate Report",
  "toolCreateQuotation": "Create Quotation",
  "toolCreatePO": "Create Purchase Order",
  "toolSearchRecords": "Search Records",
  "getDashboardData": "Get Dashboard Data",
  "clearHistory": "Clear History"
}
```

### ไฟล์: `src/assets/i18n/th.json` (แก้ไข)

```json
"aiChat": {
  "title": "AI ผู้ช่วย",
  "placeholder": "พิมพ์คำถามได้เลย...",
  "send": "ส่ง",
  "loading": "กำลังคิด...",
  "modelSelect": "โมเดล",
  "noModels": "ไม่มีโมเดลที่ใช้ได้",
  "confirmAction": "ยืนยัน",
  "rejectAction": "ยกเลิก",
  "actionSuccess": "ทำรายการสำเร็จ",
  "actionFailed": "ทำรายการไม่สำเร็จ",
  "errorConnection": "เชื่อมต่อ Ollama ไม่ได้ กรุณาตรวจสอบว่า Ollama กำลังทำงานอยู่",
  "welcomeMessage": "สวัสดีค่ะ! ฉันเป็น AI ผู้ช่วยของคุณ สามารถช่วยเรื่องงาน ลูกค้า รายงาน และอื่นๆ ได้ค่ะ",
  "toolCreateJob": "สร้างงาน",
  "toolSendEmail": "ส่งอีเมล",
  "toolGenerateReport": "สร้างรายงาน",
  "toolCreateQuotation": "สร้างใบเสนอราคา",
  "toolCreatePO": "สร้างใบสั่งซื้อ",
  "toolSearchRecords": "ค้นหาข้อมูล",
  "getDashboardData": "ดึงข้อมูลแดชบอร์ด",
  "clearHistory": "ล้างประวัติ"
}
```

---

## Section 14: Presentation Components

### ไฟล์: `src/app/features/ai-chatbot/presentation/components/chat-icon/chat-icon.component.ts` (ไฟล์ใหม่)

**จาก:** ไม่มี → **เป็น:** เพิ่ม floating FAB button

```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="chat-fab"
      [class.chat-fab-active]="isOpen"
      (click)="toggle.emit()"
      [attr.aria-label]="'AI Chat'">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
        stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 5m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        <path d="M6 20l-1 -4c-1 -2.5 -1 -5 0 -7c1 -2 3 -3 5 -3c4 0 7 2 8 5l1 4" />
      </svg>
    </button>
  `,
  styles: [`
    .chat-fab {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--tblr-primary, #206bc4);
      color: white;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 9999;
      transition: transform 0.2s, background 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .chat-fab:hover {
      transform: scale(1.1);
    }
    .chat-fab-active {
      background: var(--tblr-danger, #d63940);
    }
  `]
})
export class ChatIconComponent {
  @Input() isOpen = false;
  @Output() toggle = new EventEmitter<void>();
}
```

---

### ไฟล์: `src/app/features/ai-chatbot/presentation/components/chat-message/chat-message.component.ts` (ไฟล์ใหม่)

```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ChatMessage, ToolCall } from '../../../domain/entities/chat-message.entity';
import { ToolExecutionCardComponent } from '../tool-execution-card/tool-execution-card.component';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [CommonModule, TranslateModule, ToolExecutionCardComponent],
  template: `
    <!-- User message -->
    <div *ngIf="message.role === 'user'" class="chat-msg chat-msg-user">
      <div class="chat-bubble chat-bubble-user">{{ message.content }}</div>
    </div>

    <!-- Assistant message -->
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

    <!-- Tool execution -->
    <div *ngIf="message.role === 'tool'" class="chat-msg chat-msg-tool">
      <app-tool-execution-card
        [toolCall]="message.toolCall!"
        [result]="message.toolResult"
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
```

---

### ไฟล์: `src/app/features/ai-chatbot/presentation/components/chat-input/chat-input.component.ts` (ไฟล์ใหม่)

```typescript
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  template: `
    <div class="chat-input-area">
      <textarea
        class="form-control"
        [(ngModel)]="input"
        (keydown.enter)="onEnter($event)"
        [placeholder]="'aiChat.placeholder' | translate"
        rows="1"
        [disabled]="loading">
      </textarea>
      <button
        class="btn btn-primary btn-sm"
        (click)="onSend()"
        [disabled]="!input.trim() || loading">
        <svg *ngIf="!loading" xmlns="http://www.w3.org/2000/svg" class="icon" width="18" height="18" viewBox="0 0 24 24"
          stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M10 14l11 -11l-2.5 -2.5l-10 10" />
          <path d="M14 10l-10 10l2.5 2.5l10 -10" />
        </svg>
        <svg *ngIf="loading" xmlns="http://www.w3.org/2000/svg" class="icon spin" width="18" height="18" viewBox="0 0 24 24"
          stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a9 9 0 1 0 9 9" />
        </svg>
      </button>
    </div>
  `,
  styles: [`
    .chat-input-area {
      display: flex;
      gap: 8px;
      padding: 12px;
      border-top: 1px solid var(--tblr-border-color, #dee2e6);
    }
    textarea {
      flex: 1;
      resize: none;
      min-height: 38px;
      max-height: 100px;
      font-size: 14px;
    }
    .spin { animation: spin 1s linear infinite; }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  `]
})
export class ChatInputComponent {
  @Input() loading = false;
  @Output() send = new EventEmitter<string>();

  input = '';

  onSend() {
    if (this.input.trim()) {
      this.send.emit(this.input.trim());
      this.input = '';
    }
  }

  onEnter(event: Event) {
    const e = event as KeyboardEvent;
    if (!e.shiftKey) {
      e.preventDefault();
      this.onSend();
    }
  }
}
```

---

### ไฟล์: `src/app/features/ai-chatbot/presentation/components/tool-execution-card/tool-execution-card.component.ts` (ไฟล์ใหม่)

```typescript
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
```

---

### ไฟล์: `src/app/features/ai-chatbot/presentation/components/chat-popup/chat-popup.component.ts` (ไฟล์ใหม่)

```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ChatMessage } from '../../../domain/entities/chat-message.entity';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';

@Component({
  selector: 'app-chat-popup',
  standalone: true,
  imports: [CommonModule, TranslateModule, ChatMessageComponent, ChatInputComponent],
  template: `
    <div class="chat-window" [class.chat-hidden]="!isOpen">
      <!-- Header -->
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

      <!-- Messages -->
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

      <!-- Input -->
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
```

---

### ไฟล์: `src/app/features/ai-chatbot/presentation/components/chatbot/chatbot.component.ts` (ไฟล์ใหม่)

**จาก:** ไม่มี → **เป็น:** เพิ่ม main container component

```typescript
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, BehaviorSubject, takeUntil } from 'rxjs';
import { CHATBOT_REPOSITORY } from '../../../core/di/tokens';
import { IChatbotRepository } from '../domain/repositories/chatbot.repository';
import { ChatMessage } from '../domain/entities/chat-message.entity';
import { ContextProviderService } from '../data/services/context-provider.service';
import { ChatHistoryService } from '../data/services/chat-history.service';
import { BUILT_IN_TOOLS } from '../domain/entities/tool-definition.entity';
import { ChatIconComponent } from './chat-icon/chat-icon.component';
import { ChatPopupComponent } from './chat-popup/chat-popup.component';

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
    // Load history
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

    // Inject context if relevant
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
```

---

## Section 15: AppLayout Integration

### ไฟล์: `src/app/layouts/app-layout/app-layout.component.html` (แก้ไข)

**จาก:** ไม่มี chatbot → **เป็น:** เพิ่ม `<app-ai-chatbot>`

```html
<!-- เพิ่มบรรทัดสุดท้ายก่อน </div> ปิด page-wrapper หรือหลัง <app-footer> -->
<app-ai-chatbot></app-ai-chatbot>
```

### ไฟล์: `src/app/layouts/app-layout/app-layout.component.ts` (แก้ไข)

**จาก:** ไม่มี chatbot import → **เป็น:** เพิ่ม import ChatbotComponent

```typescript
// เพิ่มใน imports array
import { ChatbotComponent } from '../../features/ai-chatbot/presentation/components/chatbot/chatbot.component';

// ใน @Component decorator imports
imports: [CommonModule, RouterOutlet, ..., ChatbotComponent]
```

---

## Unit Tests

**เขียน** — ทุกชั้น (~18 test files)

### Domain Tests
1. `send-message.use-case.spec.ts` — ทดสอบ SendMessageUseCase เรียก repository ถูก method
2. `get-context.use-case.spec.ts` — ทดสอบ GetContextUseCase ส่ง contextTypes ถูกต้อง
3. `execute-action.use-case.spec.ts` — ทดสอบ ExecuteActionUseCase ส่ง action/params ถูกต้อง

### Data Tests
4. `ollama-api.datasource.spec.ts` — ทดสอบ HTTP calls ไป Ollama API ถูก endpoint
5. `ollama-stream.parser.spec.ts` — ทดสอบ parse NDJSON chunks ได้ถูกต้อง
6. `context-provider.service.spec.ts` — ทดสอบ detectContextTypes keyword matching
7. `action-executor.service.spec.ts` — ทดสอบ execute แต่ละ action เรียก HTTP ถูก endpoint
8. `chatbot.repository.impl.spec.ts` — ทดสอบ integration ระหว่าง datasource + services
9. `chat-history.service.spec.ts` — ทดสอบ localStorage save/load/clear

### Presentation Tests
10. `chat-icon.component.spec.ts` — ทดสอบ toggle event emit
11. `chat-message.component.spec.ts` — ทดสอบ render user/assistant/tool messages
12. `chat-input.component.spec.ts` — ทดสอบ send event + enter key
13. `tool-execution-card.component.spec.ts` — ทดสอบ confirm/reject buttons
14. `chat-popup.component.spec.ts` — ทดสอบ render popup + close
15. `chatbot.component.spec.ts` — ทดสอบ toggleChat + sendMessage + confirmTool

### Integration Tests
16. `app-layout chatbot integration.spec.ts` — ทดสอบ chatbot แสดงใน authenticated layout
17. `context injection integration.spec.ts` — ทดสอบ context inject flow
18. `tool calling flow integration.spec.ts` — ทดสอบ full tool calling flow
