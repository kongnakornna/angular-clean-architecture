import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { AlertBadgeComponent } from '../../components/alert-badge/alert-badge.component';
import { Alert, AlertRule } from '../../../domain/entities/alert.entity';
import { GetAlertsUseCase } from '../../../domain/use-cases/get-alerts.usecase';
import { IAIAnalyticsRepository } from '../../../domain/repositories/ai-analytics.repository';

@Component({
  selector: 'app-alert-management',
  standalone: true,
  imports: [CommonModule, TranslatePipe, AlertBadgeComponent],
  templateUrl: './alert-management.component.html',
  styleUrls: ['./alert-management.component.scss'],
})
export class AlertManagementComponent implements OnInit, OnDestroy {
  private alertsSubject = new BehaviorSubject<Alert[]>([]);
  alerts$ = this.alertsSubject.asObservable();

  private alertRulesSubject = new BehaviorSubject<AlertRule[]>([]);
  alertRules$ = this.alertRulesSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  private destroy$ = new Subject<void>();

  constructor(
    private getAlerts: GetAlertsUseCase,
    private repository: IAIAnalyticsRepository,
  ) {}

  ngOnInit(): void {
    this.loadAlerts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  severityColor(severity: string): string {
    switch (severity) {
      case 'critical': return 'text-red';
      case 'warning': return 'text-yellow';
      case 'info': return 'text-blue';
      default: return 'text-secondary';
    }
  }

  statusBadge(status: string): string {
    switch (status) {
      case 'active': return 'bg-red';
      case 'acknowledged': return 'bg-yellow';
      case 'muted': return 'bg-secondary';
      default: return 'bg-secondary';
    }
  }

  private loadAlerts(): void {
    this.loadingSubject.next(true);

    this.getAlerts.execute()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (alerts) => {
          this.alertsSubject.next(alerts);
          this.loadingSubject.next(false);
        },
        error: () => {
          this.alertsSubject.next([]);
          this.loadingSubject.next(false);
        },
      });

    this.repository.getAlertRules()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (rules) => this.alertRulesSubject.next(rules),
        error: () => this.alertRulesSubject.next([]),
      });
  }
}
