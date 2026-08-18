import { Observable, from } from 'rxjs';
import { switchMap, map, scan, takeWhile, filter } from 'rxjs/operators';
import { ChatMessage } from '../../domain/entities/chat-message.entity';

export class OllamaStreamParser {
  parseStream$(raw$: Observable<string>): Observable<ChatMessage> {
    let buffer = '';

    return raw$.pipe(
      switchMap(raw => {
        buffer += raw;
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
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
