import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [CommonModule, TablerIconsModule],
  templateUrl: './maps.component.html',
})
export class MapsComponent {}