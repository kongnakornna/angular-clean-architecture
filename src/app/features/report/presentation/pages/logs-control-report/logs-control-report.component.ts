import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { GetLogsControlUseCase } from '../../../domain/use-cases/get-logs-control.use-case';
import { LogsControl } from '../../../domain/entities/report.entity';

@Component({
  selector: 'app-logs-control-report',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './logs-control-report.component.html',
})
export class LogsControlReportComponent implements OnInit, OnDestroy {
  items: LogsControl[] = [];
  loading = false;
  private destroy$ = new Subject<void>();

  constructor(private getLogsControlUseCase: GetLogsControlUseCase) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(): void {
    this.loading = true;
    this.getLogsControlUseCase.execute()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => { this.items = data; this.loading = false; },
        error: () => { this.loading = false; },
      });
  }
}
