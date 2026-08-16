import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { GenerateReportUseCase } from '../../../domain/use-cases/generate-report.use-case';
import { GetReportsUseCase } from '../../../domain/use-cases/get-reports.use-case';
import { Report } from '../../../domain/entities/report.entity';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit, OnDestroy {
  private reportsSubject = new BehaviorSubject<Report[]>([]);
  reports$ = this.reportsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  downloading = false;

  private destroy$ = new Subject<void>();

  constructor(
    private getReports: GetReportsUseCase,
    private generateReport: GenerateReportUseCase,
  ) {}

  ngOnInit(): void {
    this.loadReports();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  statusLabel(status: string): string {
    if (status === 'ready' || status === 'พร้อม') return 'reports.ready';
    if (status === 'generating' || status === 'กำลังสร้าง') return 'reports.generating';
    return status;
  }

  statusClass(status: string): string {
    if (status === 'ready' || status === 'พร้อม') return 'bg-green';
    if (status === 'generating' || status === 'กำลังสร้าง') return 'bg-yellow';
    return 'bg-secondary';
  }

  canDownload(status: string): boolean {
    return status === 'ready' || status === 'พร้อม';
  }

  private loadReports(): void {
    this.loadingSubject.next(true);

    this.getReports.execute()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (reports) => {
          this.reportsSubject.next(reports);
          this.loadingSubject.next(false);
        },
        error: () => {
          this.reportsSubject.next([]);
          this.loadingSubject.next(false);
        },
      });
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
