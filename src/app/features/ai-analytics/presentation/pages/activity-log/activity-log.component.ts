import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { LogTimelineComponent } from '../../components/log-timeline/log-timeline.component';
import { LogEntry, LogFilter } from '../../../domain/entities/log.entity';
import { GetLogsUseCase } from '../../../domain/use-cases/get-logs.usecase';

@Component({
  selector: 'app-activity-log',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, LogTimelineComponent],
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.scss'],
})
export class ActivityLogComponent implements OnInit, OnDestroy {
  private logsSubject = new BehaviorSubject<LogEntry[]>([]);
  logs$ = this.logsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  private destroy$ = new Subject<void>();

  filterSearch = '';
  filterType = '';

  constructor(private getLogs: GetLogsUseCase) {}

  ngOnInit(): void {
    this.loadLogs();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  applyFilter(): void {
    const filter: LogFilter = {};
    if (this.filterSearch) filter.search = this.filterSearch;
    if (this.filterType) filter.type = this.filterType as any;
    this.loadLogs(filter);
  }

  private loadLogs(filter?: LogFilter): void {
    this.loadingSubject.next(true);

    this.getLogs.execute(filter)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (logs) => {
          this.logsSubject.next(logs);
          this.loadingSubject.next(false);
        },
        error: () => {
          this.logsSubject.next([]);
          this.loadingSubject.next(false);
        },
      });
  }
}
