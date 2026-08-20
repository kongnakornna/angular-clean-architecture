import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { GetScheduleLogsUseCase } from '../../../domain/use-cases/get-schedule-logs.use-case';
import { ScheduleLog } from '../../../domain/entities/report.entity';

@Component({
  selector: 'app-schedule-report',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './schedule-report.component.html',
})
export class ScheduleReportComponent implements OnInit, OnDestroy {
  items: ScheduleLog[] = [];
  loading = false;
  private destroy$ = new Subject<void>();

  constructor(private getScheduleLogsUseCase: GetScheduleLogsUseCase) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(): void {
    this.loading = true;
    this.getScheduleLogsUseCase.execute()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => { this.items = data; this.loading = false; },
        error: () => { this.loading = false; },
      });
  }
}
