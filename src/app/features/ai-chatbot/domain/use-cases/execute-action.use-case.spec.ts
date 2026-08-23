import { of } from 'rxjs';
import { ExecuteActionUseCase } from './execute-action.use-case';
import { IChatbotRepository } from '../repositories/chatbot.repository';
import { ToolResult } from '../entities/chat-message.entity';

describe('ExecuteActionUseCase', () => {
  let useCase: ExecuteActionUseCase;
  let mockRepository: jasmine.SpyObj<IChatbotRepository>;

  const mockResult: ToolResult = {
    toolCallId: '1',
    content: JSON.stringify({ id: 1, title: 'Test Job' }),
    success: true
  };

  beforeEach(() => {
    mockRepository = jasmine.createSpyObj('IChatbotRepository', [
      'sendMessageStream', 'sendMessage', 'getAvailableModels', 'executeAction'
    ]);
    mockRepository.executeAction.and.returnValue(of(mockResult));

    useCase = new ExecuteActionUseCase(mockRepository);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should call repository.executeAction with correct params', (done) => {
    const params = { title: 'Test Job', customerId: '123' };
    useCase.execute('create_job', params).subscribe((result) => {
      expect(result).toEqual(mockResult);
      expect(mockRepository.executeAction).toHaveBeenCalledWith('create_job', params);
      done();
    });
  });
});
