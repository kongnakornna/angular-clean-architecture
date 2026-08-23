import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { GetAlarmLogsUseCase } from '../../../domain/use-cases/get-alarm-logs.use-case';
import { AlarmLog } from '../../../domain/entities/report.entity';

@Component({
  selector: 'app-alarm-report',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './alarm-report.component.html',
})
export class AlarmReportComponent implements OnInit, OnDestroy {
  items: AlarmLog[] = [];
  loading = false;
  private destroy$ = new Subject<void>();

  constructor(private getAlarmLogsUseCase: GetAlarmLogsUseCase) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(): void {
    this.loading = true;
    this.getAlarmLogsUseCase.execute()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => { this.items = data; this.loading = false; },
        error: () => { this.loading = false; },
      });
  }
}
