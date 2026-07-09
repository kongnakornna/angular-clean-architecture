import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, TablerIconsModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {}