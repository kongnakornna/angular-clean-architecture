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
