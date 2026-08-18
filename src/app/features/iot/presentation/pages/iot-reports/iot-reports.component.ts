import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { IOT_REPOSITORY } from '../../../../../core/di/tokens';
import { IIoTRepository } from '../../../domain/repositories/iot.repository';

interface IoTReport {
  id: string;
  name: string;
  type: string;
  deviceId?: string;
  createdAt: string;
  status: 'ready' | 'generating' | 'failed';
}

@Component({
  selector: 'app-iot-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './iot-reports.component.html',
  styleUrls: ['./iot-reports.component.scss'],
})
export class IoTReportsComponent implements OnInit, OnDestroy {
  private iotRepo = inject<IIoTRepository>(IOT_REPOSITORY);
  private destroy$ = new Subject<void>();

  private reportsSubject = new BehaviorSubject<IoTReport[]>([]);
  reports$ = this.reportsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  private generatingSubject = new BehaviorSubject<boolean>(false);
  generating$ = this.generatingSubject.asObservable();

  private messageSubject = new BehaviorSubject<{ type: 'success' | 'error'; text: string } | null>(null);
  message$ = this.messageSubject.asObservable();

  reportTypes = [
    { value: 'device-usage', label: 'Device Usage Report' },
    { value: 'sensor-data', label: 'Sensor Data Report' },
    { value: 'alarm-history', label: 'Alarm History Report' },
    { value: 'data-export', label: 'Raw Data Export' },
  ];

  selectedType = 'device-usage';
  startDate = '';
  endDate = '';
  selectedDeviceId = '';

  ngOnInit(): void {
    this.loadReports();
    this.setDefaultDates();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setDefaultDates(): void {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    this.startDate = firstDay.toISOString().split('T')[0];
    this.endDate = now.toISOString().split('T')[0];
  }

  private loadReports(): void {
    this.loadingSubject.next(true);
    this.iotRepo.getAlarmDeviceStatus({ page: 1, pageSize: 50 })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          const items = (res?.data || []).map((d: any, i: number) => ({
            id: `rpt-${i}`,
            name: `${d.deviceName || d.typeName || 'Device'} - ${d.alarmTitle || 'Report'}`,
            type: d.typeName || 'General',
            deviceId: String(d.deviceId),
            createdAt: new Date().toISOString().split('T')[0],
            status: 'ready' as const,
          }));
          this.reportsSubject.next(items);
          this.loadingSubject.next(false);
        },
        error: () => {
          this.reportsSubject.next([]);
          this.loadingSubject.next(false);
        },
      });
  }

  generate(): void {
    this.generatingSubject.next(true);
    this.messageSubject.next(null);

    const params: any = {
      page: 1,
      pageSize: 100,
    };
    if (this.selectedDeviceId) params.deviceId = this.selectedDeviceId;

    this.iotRepo.getAlarmDeviceStatus(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          const report: IoTReport = {
            id: `rpt-${Date.now()}`,
            name: `${this.reportTypes.find(r => r.value === this.selectedType)?.label || 'Report'} - ${this.startDate} to ${this.endDate}`,
            type: this.selectedType,
            createdAt: new Date().toISOString().split('T')[0],
            status: 'ready',
          };
          this.reportsSubject.next([report, ...this.reportsSubject.value]);
          this.generatingSubject.next(false);
          this.messageSubject.next({ type: 'success', text: 'Report generated successfully' });
        },
        error: () => {
          this.generatingSubject.next(false);
          this.messageSubject.next({ type: 'error', text: 'Failed to generate report' });
        },
      });
  }

  exportData(): void {
    if (!this.selectedDeviceId) {
      this.messageSubject.next({ type: 'error', text: 'Please select a device first' });
      return;
    }

    this.generatingSubject.next(true);
    this.iotRepo.exportDeviceData(this.selectedDeviceId, this.startDate, this.endDate, 'csv')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `iot_data_${this.selectedDeviceId}_${this.startDate}_${this.endDate}.csv`;
          a.click();
          window.URL.revokeObjectURL(url);
          this.generatingSubject.next(false);
          this.messageSubject.next({ type: 'success', text: 'Data exported successfully' });
        },
        error: () => {
          this.generatingSubject.next(false);
          this.messageSubject.next({ type: 'error', text: 'Export failed' });
        },
      });
  }

  cleanup(): void {
    const days = parseInt(prompt('Delete data older than how many days?', '90') || '90', 10);
    if (isNaN(days) || days <= 0) return;

    this.generatingSubject.next(true);
    this.iotRepo.cleanupDeviceData(days)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.generatingSubject.next(false);
          this.messageSubject.next({ type: 'success', text: `Data older than ${days} days cleaned up` });
        },
        error: () => {
          this.generatingSubject.next(false);
          this.messageSubject.next({ type: 'error', text: 'Cleanup failed' });
        },
      });
  }
}
