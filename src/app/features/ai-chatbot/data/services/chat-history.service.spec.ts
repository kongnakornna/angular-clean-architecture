import { ChatHistoryService } from './chat-history.service';
import { ChatMessage } from '../../domain/entities/chat-message.entity';

describe('ChatHistoryService', () => {
  let service: ChatHistoryService;

  beforeEach(() => {
    localStorage.clear();
    service = new ChatHistoryService();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return empty messages initially', () => {
    expect(service.getMessages()).toEqual([]);
  });

  it('should append message and persist to localStorage', () => {
    const msg: ChatMessage = {
      id: '1',
      role: 'user',
      content: 'Hello',
      timestamp: new Date()
    };

    service.appendMessage(msg);
    const messages = service.getMessages();

    expect(messages.length).toBe(1);
    expect(messages[0].content).toBe('Hello');

    // Verify localStorage
    const stored = localStorage.getItem('icmon_chat_history');
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed.messages.length).toBe(1);
  });

  it('should append multiple messages', () => {
    const msg1: ChatMessage = { id: '1', role: 'user', content: 'Hello', timestamp: new Date() };
    const msg2: ChatMessage = { id: '2', role: 'assistant', content: 'Hi!', timestamp: new Date() };

    service.appendMessage(msg1);
    service.appendMessage(msg2);

    expect(service.getMessages().length).toBe(2);
  });

  it('should clear history', () => {
    const msg: ChatMessage = { id: '1', role: 'user', content: 'Hello', timestamp: new Date() };
    service.appendMessage(msg);

    service.clearHistory();

    expect(service.getMessages()).toEqual([]);
    expect(localStorage.getItem('icmon_chat_history')).toBeNull();
  });

  it('should load existing history from localStorage', () => {
    const existingSession = {
      id: 'session-1',
      messages: [
        { id: '1', role: 'user', content: 'Previous message', timestamp: new Date().toISOString() }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem('icmon_chat_history', JSON.stringify(existingSession));

    const newService = new ChatHistoryService();
    expect(newService.getMessages().length).toBe(1);
    expect(newService.getMessages()[0].content).toBe('Previous message');
  });

  it('should handle corrupted localStorage gracefully', () => {
    localStorage.setItem('icmon_chat_history', 'invalid-json');

    const newService = new ChatHistoryService();
    expect(newService.getMessages()).toEqual([]);
  });
});
