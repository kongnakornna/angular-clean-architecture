import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [CommonModule, TablerIconsModule],
  templateUrl: './tables.component.html',
})
export class TablesComponent {}