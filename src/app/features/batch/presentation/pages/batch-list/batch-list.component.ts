import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-batch-list',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './batch-list.component.html',
})
export class BatchListComponent {}
