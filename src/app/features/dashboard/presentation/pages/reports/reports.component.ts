import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { GenerateReportUseCase } from '../../../domain/use-cases/generate-report.use-case';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnDestroy {
  reports = [
    { name: 'รายงานสรุปยอดขาย Q1-2026', type: 'Sales', createdAt: '01/04/2026', status: 'พร้อม', reportType: 'sales_summary' },
    { name: 'รายงานสถานะงานคงค้าง', type: 'Operations', createdAt: '28/03/2026', status: 'กำลังสร้าง', reportType: 'job_status' },
    { name: 'รายงานลูกค้าใหม่', type: 'CRM', createdAt: '25/03/2026', status: 'พร้อม', reportType: 'new_customers' },
  ];

  downloading = false;

  private destroy$ = new Subject<void>();

  constructor(private generateReport: GenerateReportUseCase) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  download(reportType: string): void {
    this.downloading = true;

    this.generateReport.execute({
      type: reportType,
      startDate: '2026-01-01',
      endDate: '2026-03-31',
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${reportType}_report.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.downloading = false;
      },
      error: () => {
        this.downloading = false;
      },
    });
  }
}
