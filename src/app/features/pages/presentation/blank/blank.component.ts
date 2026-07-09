import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-blank',
  standalone: true,
  imports: [CommonModule, TablerIconsModule],
  templateUrl: './blank.component.html',
})
export class BlankComponent {}