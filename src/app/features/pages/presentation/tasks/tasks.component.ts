import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TablerIconsModule],
  templateUrl: './tasks.component.html',
})
export class TasksComponent {}