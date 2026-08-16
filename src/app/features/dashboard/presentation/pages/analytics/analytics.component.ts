import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { DashboardStats, RevenueData } from '../../../domain/entities/dashboard-stats.entity';
import { GetDashboardStatsUseCase } from '../../../domain/use-cases/get-dashboard-stats.use-case';
import { GetRevenueChartUseCase } from '../../../domain/use-cases/get-revenue-chart.use-case';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent implements OnInit, OnDestroy {
  private statsSubject = new BehaviorSubject<DashboardStats | null>(null);
  stats$ = this.statsSubject.asObservable();

  private revenueSubject = new BehaviorSubject<RevenueData[]>([]);
  revenue$ = this.revenueSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  private destroy$ = new Subject<void>();

  constructor(
    private getDashboardStats: GetDashboardStatsUseCase,
    private getRevenueChart: GetRevenueChartUseCase,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  revenueBarHeight(amount: number, data: RevenueData[] | null): number {
    const max = Math.max(...(data ?? []).map((d) => d.amount), 1);
    return (amount / max) * 100;
  }

  totalRevenue(data: RevenueData[] | null): number {
    return (data ?? []).reduce((sum, d) => sum + d.amount, 0);
  }

  private loadData(): void {
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
  }
}
