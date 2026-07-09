import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, TablerIconsModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent {}