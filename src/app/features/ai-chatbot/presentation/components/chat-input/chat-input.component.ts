import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  template: `
    <div class="chat-input-area">
      <textarea
        class="form-control"
        [(ngModel)]="input"
        (keydown.enter)="onEnter($event)"
        [placeholder]="'aiChat.placeholder' | translate"
        rows="1"
        [disabled]="loading">
      </textarea>
      <button
        class="btn btn-primary btn-sm"
        (click)="onSend()"
        [disabled]="!input.trim() || loading">
        <svg *ngIf="!loading" xmlns="http://www.w3.org/2000/svg" class="icon" width="18" height="18" viewBox="0 0 24 24"
          stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M10 14l11 -11l-2.5 -2.5l-10 10" />
          <path d="M14 10l-10 10l2.5 2.5l10 -10" />
        </svg>
        <svg *ngIf="loading" xmlns="http://www.w3.org/2000/svg" class="icon spin" width="18" height="18" viewBox="0 0 24 24"
          stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a9 9 0 1 0 9 9" />
        </svg>
      </button>
    </div>
  `,
  styles: [`
    .chat-input-area {
      display: flex;
      gap: 8px;
      padding: 12px;
      border-top: 1px solid var(--tblr-border-color, #dee2e6);
    }
    textarea {
      flex: 1;
      resize: none;
      min-height: 38px;
      max-height: 100px;
      font-size: 14px;
    }
    .spin { animation: spin 1s linear infinite; }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  `]
})
export class ChatInputComponent {
  @Input() loading = false;
  @Output() send = new EventEmitter<string>();

  input = '';

  onSend() {
    if (this.input.trim()) {
      this.send.emit(this.input.trim());
      this.input = '';
    }
  }

  onEnter(event: Event) {
    const e = event as KeyboardEvent;
    if (!e.shiftKey) {
      e.preventDefault();
      this.onSend();
    }
  }
}
