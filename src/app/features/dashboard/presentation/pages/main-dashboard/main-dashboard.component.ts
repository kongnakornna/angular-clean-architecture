import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { WelcomeIllustrationComponent } from '../../../../../shared/components/welcome-illustration/welcome-illustration.component';
import { DashboardStats, RevenueData, Activity } from '../../../domain/entities/dashboard-stats.entity';
import { GetDashboardStatsUseCase } from '../../../domain/use-cases/get-dashboard-stats.use-case';
import { GetRevenueChartUseCase } from '../../../domain/use-cases/get-revenue-chart.use-case';
import { GetRecentActivitiesUseCase } from '../../../domain/use-cases/get-recent-activities.use-case';

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

  private activitiesSubject = new BehaviorSubject<Activity[]>([]);
  activities$ = this.activitiesSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  private destroy$ = new Subject<void>();

  constructor(
    private getDashboardStats: GetDashboardStatsUseCase,
    private getRevenueChart: GetRevenueChartUseCase,
    private getRecentActivities: GetRecentActivitiesUseCase,
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  revenueBarHeight(revenue: number, data: RevenueData[]): number {
    const max = Math.max(...data.map((d) => d.revenue), 1);
    return (revenue / max) * 40;
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
          this.loadingSubject.next(false);
        },
      });

    this.getRevenueChart.execute('6m')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => this.revenueSubject.next(data),
      });

    this.getRecentActivities.execute()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (activities) => this.activitiesSubject.next(activities),
      });
  }
}
