import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule, TablerIconsModule],
  templateUrl: './activity.component.html',
})
export class ActivityComponent {}