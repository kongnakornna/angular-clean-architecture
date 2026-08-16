import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { WelcomeIllustrationComponent } from '../../../../../shared/components/welcome-illustration/welcome-illustration.component';
import { DashboardStats, RevenueData, JobStatusSummary, TopPartData } from '../../../domain/entities/dashboard-stats.entity';
import { GetDashboardStatsUseCase } from '../../../domain/use-cases/get-dashboard-stats.use-case';
import { GetRevenueChartUseCase } from '../../../domain/use-cases/get-revenue-chart.use-case';
import { GetJobStatusUseCase } from '../../../domain/use-cases/get-job-status.use-case';
import { GetTopPartsUseCase } from '../../../domain/use-cases/get-top-parts.use-case';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe, WelcomeIllustrationComponent],
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss'],
})
export class MainDashboardComponent implements OnInit, OnDestroy {
  private statsSubject = new BehaviorSubject<DashboardStats | null>(null);
  stats$ = this.statsSubject.asObservable();

  private revenueSubject = new BehaviorSubject<RevenueData[]>([]);
  revenue$ = this.revenueSubject.asObservable();

  private jobStatusSubject = new BehaviorSubject<JobStatusSummary[]>([]);
  jobStatus$ = this.jobStatusSubject.asObservable();

  private topPartsSubject = new BehaviorSubject<TopPartData[]>([]);
  topParts$ = this.topPartsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  private destroy$ = new Subject<void>();

  constructor(
    private getDashboardStats: GetDashboardStatsUseCase,
    private getRevenueChart: GetRevenueChartUseCase,
    private getJobStatus: GetJobStatusUseCase,
    private getTopParts: GetTopPartsUseCase,
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onlineRate(stats: DashboardStats): number {
    if (!stats.totalDevices) return 0;
    return Math.round((stats.onlineDevices / stats.totalDevices) * 100);
  }

  revenueBarHeight(amount: number, data: RevenueData[] | null): number {
    const list = data ?? [];
    const max = Math.max(...list.map((d) => d.amount), 1);
    return (amount / max) * 100;
  }

  totalRevenue(data: RevenueData[] | null): number {
    return (data ?? []).reduce((sum, d) => sum + d.amount, 0);
  }

  statusLabel(status: string): string {
    if (status === 'pending') return 'jobCard.pending';
    if (status === 'running' || status === 'in_progress') return 'jobCard.inProgress';
    if (status === 'completed') return 'jobCard.completed';
    if (status === 'failed') return 'dashboard.failed';
    return status;
  }

  statusBadge(status: string): string {
    if (status === 'pending') return 'bg-yellow';
    if (status === 'running' || status === 'in_progress') return 'bg-blue';
    if (status === 'completed') return 'bg-green';
    if (status === 'failed') return 'bg-red';
    return 'bg-secondary';
  }

  statusPercent(count: number, data: JobStatusSummary[] | null): number {
    const total = (data ?? []).reduce((sum, d) => sum + d.count, 0);
    if (!total) return 0;
    return Math.round((count / total) * 100);
  }

  partPercent(count: number, data: TopPartData[] | null): number {
    const max = Math.max(...(data ?? []).map((d) => d.count), 1);
    return Math.round((count / max) * 100);
  }

  private loadDashboard(): void {
    this.loadingSubject.next(true);

    this.getDashboardStats.execute()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (stats) => {
          this.statsSubject.next(stats);
          this.loadingSubject.next(false);
        },
        error: () => {
          this.statsSubject.next(null);
          this.loadingSubject.next(false);
        },
      });

    this.getRevenueChart.execute('monthly')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => this.revenueSubject.next(data),
        error: () => this.revenueSubject.next([]),
      });

    this.getJobStatus.execute()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (statuses) => this.jobStatusSubject.next(statuses),
        error: () => this.jobStatusSubject.next([]),
      });

    this.getTopParts.execute(5)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (parts) => this.topPartsSubject.next(parts),
        error: () => this.topPartsSubject.next([]),
      });
  }
}
