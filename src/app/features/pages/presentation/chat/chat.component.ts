import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, TablerIconsModule],
  templateUrl: './chat.component.html',
})
export class ChatComponent {}