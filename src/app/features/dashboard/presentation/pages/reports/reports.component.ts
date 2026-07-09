import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent {
  reports = [
    { name: 'รายงานสรุปยอดขาย Q1-2026', type: 'Sales', createdAt: '01/04/2026', status: 'พร้อม' },
    { name: 'รายงานสถานะงานคงค้าง', type: 'Operations', createdAt: '28/03/2026', status: 'กำลังสร้าง' },
    { name: 'รายงานลูกค้าใหม่', type: 'CRM', createdAt: '25/03/2026', status: 'พร้อม' },
  ];
}