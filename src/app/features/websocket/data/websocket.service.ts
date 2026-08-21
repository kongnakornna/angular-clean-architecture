import { Injectable, inject, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { APP_CONFIG } from '../../../core/config/app.config';
import { WsServerMessage, WsSubscribeMessage, WsUnsubscribeMessage, WsChatMessage } from '../domain/entities/websocket.entity';

@Injectable({ providedIn: 'root' })
export class WebSocketService implements OnDestroy {
  private cfg = inject(APP_CONFIG);
  private messagesSubject = new Subject<WsServerMessage>();
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectDelay = 30000;
  private baseDelay = 1000;
  private shouldReconnect = true;

  readonly messages$: Observable<WsServerMessage> = this.messagesSubject.asObservable();

  private get token(): string {
    return localStorage.getItem('token') || '';
  }

  connect(): void {
    const wsBase = this.cfg.useProxy
      ? `${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}`
      : this.cfg.apiTargetUrl.replace('http', 'ws');
    const url = `${wsBase}/ws?token=${this.token}`;
    this.shouldReconnect = true;
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = (event) => {
      try {
        const msg: WsServerMessage = JSON.parse(event.data);
        this.messagesSubject.next(msg);
      } catch {
        // ignore parse errors
      }
    };

    this.ws.onclose = () => {
      if (this.shouldReconnect) {
        this.scheduleReconnect();
      }
    };

    this.ws.onerror = () => {
      this.ws?.close();
    };
  }

  private scheduleReconnect(): void {
    const delay = Math.min(this.baseDelay * Math.pow(2, this.reconnectAttempts), this.maxReconnectDelay);
    this.reconnectAttempts++;
    setTimeout(() => this.connect(), delay);
  }

  subscribe(topic: string): void {
    const msg: WsSubscribeMessage = { type: 'subscribe', topic };
    this.send(msg);
  }

  unsubscribe(topic: string): void {
    const msg: WsUnsubscribeMessage = { type: 'unsubscribe', topic };
    this.send(msg);
  }

  sendMessage(text: string, room: string): void {
    const msg: WsChatMessage = { type: 'message', payload: { text }, room };
    this.send(msg);
  }

  private send(msg: any): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(msg));
    }
  }

  disconnect(): void {
    this.shouldReconnect = false;
    this.ws?.close();
    this.ws = null;
  }

  ngOnDestroy(): void {
    this.disconnect();
    this.messagesSubject.complete();
  }
}
