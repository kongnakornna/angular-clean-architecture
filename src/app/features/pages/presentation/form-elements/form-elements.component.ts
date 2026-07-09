import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-form-elements',
  standalone: true,
  imports: [CommonModule, TablerIconsModule],
  templateUrl: './form-elements.component.html',
  styleUrls: ['./form-elements.component.scss'],
})
export class FormElementsComponent {}