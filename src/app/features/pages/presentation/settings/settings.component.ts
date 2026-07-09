import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, TablerIconsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {}