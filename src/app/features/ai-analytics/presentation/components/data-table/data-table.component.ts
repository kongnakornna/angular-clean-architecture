import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent {
  @Input() columns: { key: string; label: string }[] = [];
  @Input() data: any[] = [];
}
