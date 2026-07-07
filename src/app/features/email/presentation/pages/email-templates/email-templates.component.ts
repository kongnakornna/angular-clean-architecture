import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-email-templates',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './email-templates.component.html',
})
export class EmailTemplatesComponent {}
