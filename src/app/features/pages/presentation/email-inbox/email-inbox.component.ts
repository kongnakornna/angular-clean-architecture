import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-email-inbox',
  standalone: true,
  imports: [CommonModule, TablerIconsModule],
  templateUrl: './email-inbox.component.html',
  styleUrls: ['./email-inbox.component.scss'],
})
export class EmailInboxComponent {}