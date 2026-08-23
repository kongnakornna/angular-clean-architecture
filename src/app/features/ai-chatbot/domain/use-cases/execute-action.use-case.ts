import { Observable } from 'rxjs';
import { ToolResult } from '../entities/chat-message.entity';
import { IChatbotRepository } from '../repositories/chatbot.repository';

export class ExecuteActionUseCase {
  constructor(private repository: IChatbotRepository) {}

  execute(action: string, params: Record<string, any>): Observable<ToolResult> {
    return this.repository.executeAction(action, params);
  }
}
