import { Component, HostBinding } from '@angular/core';
import { ChatbotComponent } from '../../features/ai-chatbot/presentation/components/chatbot/chatbot.component';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  imports: [ChatbotComponent],
})
export class AppLayoutComponent {
  @HostBinding('class.page') pageClass = true;
}
