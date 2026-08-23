import { Observable } from 'rxjs';
import { IChatbotRepository } from '../repositories/chatbot.repository';

export class GetModelsUseCase {
  constructor(private repository: IChatbotRepository) {}

  execute(): Observable<string[]> {
    return this.repository.getAvailableModels();
  }
}
