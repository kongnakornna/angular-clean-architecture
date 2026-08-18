import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { KpiCardComponent } from '../../components/kpi-card/kpi-card.component';
import { AlertBadgeComponent } from '../../components/alert-badge/alert-badge.component';
import { DashboardState } from '../../../domain/entities/dashboard.entity';
import { GetDashboardStatsUseCase } from '../../../domain/use-cases/get-dashboard-stats.usecase';

@Component({
  selector: 'app-ai-dashboard',
  standalone: true,
  imports: [CommonModule, TranslatePipe, KpiCardComponent, AlertBadgeComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private dashboardStateSubject = new BehaviorSubject<DashboardState | null>(null);
  dashboardState$ = this.dashboardStateSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  private destroy$ = new Subject<void>();

  constructor(private getDashboardStats: GetDashboardStatsUseCase) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  healthPercent(item: { online?: number; total?: number }): number {
    if (!item.total) return 0;
    return Math.round(((item.online ?? 0) / item.total) * 100);
  }

  private loadDashboard(): void {
    this.loadingSubject.next(true);

    this.getDashboardStats.execute()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (state) => {
          this.dashboardStateSubject.next(state);
          this.loadingSubject.next(false);
        },
        error: () => {
          this.dashboardStateSubject.next(null);
          this.loadingSubject.next(false);
        },
      });
  }
}
