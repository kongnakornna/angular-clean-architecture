import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, TablerIconsModule],
  templateUrl: './cards.component.html',
})
export class CardsComponent {}