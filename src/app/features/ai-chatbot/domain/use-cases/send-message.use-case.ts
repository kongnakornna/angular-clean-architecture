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
