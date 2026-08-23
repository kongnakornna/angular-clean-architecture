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
