import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [CommonModule, TablerIconsModule],
  templateUrl: './icons.component.html',
})
export class IconsComponent {}