import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { Report, ReportFolder } from '../../../domain/entities/report.entity';
import { GetReportsUseCase } from '../../../domain/use-cases/get-reports.usecase';
import { IAIAnalyticsRepository } from '../../../domain/repositories/ai-analytics.repository';

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

  private foldersSubject = new BehaviorSubject<ReportFolder[]>([]);
  folders$ = this.foldersSubject.asObservable();

  private selectedFolderSubject = new BehaviorSubject<string | undefined>(undefined);
  selectedFolder$ = this.selectedFolderSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  private destroy$ = new Subject<void>();

  constructor(
    private getReports: GetReportsUseCase,
    private repository: IAIAnalyticsRepository,
  ) {}

  ngOnInit(): void {
    this.loadReports();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectFolder(folder: string | undefined): void {
    this.selectedFolderSubject.next(folder);
    this.loadReports(folder);
  }

  private loadReports(folder?: string): void {
    this.loadingSubject.next(true);

    this.getReports.execute(folder)
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

    this.repository.getReportFolders()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (folders) => this.foldersSubject.next(folders),
        error: () => this.foldersSubject.next([]),
      });
  }
}
