import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { ScheduleCardComponent } from '../../components/schedule-card/schedule-card.component';
import { ScheduledJob, UpcomingRun } from '../../../domain/entities/schedule.entity';
import { GetSchedulesUseCase } from '../../../domain/use-cases/get-schedules.usecase';
import { IAIAnalyticsRepository } from '../../../domain/repositories/ai-analytics.repository';
import { AI_ANALYTICS_REPOSITORY } from '../../../../../core/di/tokens';

@Component({
  selector: 'app-scheduler',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ScheduleCardComponent],
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
})
export class SchedulerComponent implements OnInit, OnDestroy {
  private schedulesSubject = new BehaviorSubject<ScheduledJob[]>([]);
  schedules$ = this.schedulesSubject.asObservable();

  private upcomingRunsSubject = new BehaviorSubject<UpcomingRun[]>([]);
  upcomingRuns$ = this.upcomingRunsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  private destroy$ = new Subject<void>();

  constructor(
    private getSchedules: GetSchedulesUseCase,
    @Inject(AI_ANALYTICS_REPOSITORY) private repository: IAIAnalyticsRepository,
  ) {}

  ngOnInit(): void {
    this.loadSchedules();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onEditJob(job: ScheduledJob): void {
  }

  onTogglePause(job: ScheduledJob): void {
  }

  onDeleteJob(job: ScheduledJob): void {
  }

  private loadSchedules(): void {
    this.loadingSubject.next(true);

    this.getSchedules.execute()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (schedules) => {
          this.schedulesSubject.next(schedules);
          this.loadingSubject.next(false);
        },
        error: () => {
          this.schedulesSubject.next([]);
          this.loadingSubject.next(false);
        },
      });

    this.repository.getUpcomingRuns()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (runs) => this.upcomingRunsSubject.next(runs),
        error: () => this.upcomingRunsSubject.next([]),
      });
  }
}
