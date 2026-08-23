import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { GetDeviceReportUseCase } from '../../../domain/use-cases/get-device-report.use-case';
import { DeviceReport } from '../../../domain/entities/report.entity';

@Component({
  selector: 'app-device-report',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './device-report.component.html',
})
export class DeviceReportComponent implements OnInit, OnDestroy {
  items: DeviceReport[] = [];
  loading = false;
  private destroy$ = new Subject<void>();

  constructor(private getDeviceReportUseCase: GetDeviceReportUseCase) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(): void {
    this.loading = true;
    this.getDeviceReportUseCase.execute()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => { this.items = data; this.loading = false; },
        error: () => { this.loading = false; },
      });
  }
}
