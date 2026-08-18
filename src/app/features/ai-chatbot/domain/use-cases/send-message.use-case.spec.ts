import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SendMessageUseCase } from './send-message.use-case';
import { IChatbotRepository } from '../repositories/chatbot.repository';
import { ChatMessage } from '../entities/chat-message.entity';
import { BUILT_IN_TOOLS } from '../entities/tool-definition.entity';

describe('SendMessageUseCase', () => {
  let useCase: SendMessageUseCase;
  let mockRepository: jasmine.SpyObj<IChatbotRepository>;

  const mockMessages: ChatMessage[] = [
    { id: '1', role: 'user', content: 'Hello', timestamp: new Date() }
  ];

  const mockResponse: ChatMessage = {
    id: '2',
    role: 'assistant',
    content: 'Hi there!',
    timestamp: new Date()
  };

  beforeEach(() => {
    mockRepository = jasmine.createSpyObj('IChatbotRepository', [
      'sendMessageStream', 'sendMessage', 'getAvailableModels', 'executeAction'
    ]);
    mockRepository.sendMessageStream.and.returnValue(of(mockResponse));
    mockRepository.sendMessage.and.returnValue(of(mockResponse));

    TestBed.configureTestingModule({
      providers: [
        SendMessageUseCase,
        { provide: 'IChatbotRepository', useValue: mockRepository },
      ],
    });

    useCase = new SendMessageUseCase(mockRepository);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should call sendMessageStream when stream is true', (done) => {
    useCase.execute(mockMessages, true).subscribe((msg) => {
      expect(msg).toEqual(mockResponse);
      expect(mockRepository.sendMessageStream).toHaveBeenCalledWith(mockMessages, BUILT_IN_TOOLS);
      done();
    });
  });

  it('should call sendMessage when stream is false', (done) => {
    useCase.execute(mockMessages, false).subscribe((msg) => {
      expect(msg).toEqual(mockResponse);
      expect(mockRepository.sendMessage).toHaveBeenCalledWith(mockMessages, BUILT_IN_TOOLS);
      done();
    });
  });
});
