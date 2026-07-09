import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule, TablerIconsModule],
  templateUrl: './logs.component.html',
})
export class LogsComponent {}