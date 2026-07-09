import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule, TablerIconsModule],
  templateUrl: './alerts.component.html',
})
export class AlertsComponent {}