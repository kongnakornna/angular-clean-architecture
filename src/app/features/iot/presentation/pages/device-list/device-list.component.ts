import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil, map } from 'rxjs';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { DeviceGroup } from '../../../domain/entities/device.entity';
import { ListDevicesPaginatedUseCase } from '../../../domain/use-cases/list-devices-paginated.use-case';
import { GetAlarmDeviceStatusUseCase } from '../../../domain/use-cases/get-alarm-device-status.use-case';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss'],
})
export class DeviceListComponent implements OnInit, OnDestroy {
  private devicesSubject = new BehaviorSubject<DeviceGroup[]>([]);
  devices$ = this.devicesSubject.asObservable();

  private alarmsSubject = new BehaviorSubject<any[]>([]);
  alarms$ = this.alarmsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  private totalSubject = new BehaviorSubject<number>(0);
  total$ = this.totalSubject.asObservable();

  onlineCount$ = this.devices$.pipe(
    map((devices) => devices.filter((d) => d.status === 1).length)
  );
  offlineCount$ = this.devices$.pipe(
    map((devices) => devices.filter((d) => d.status === 0).length)
  );
  alarmCount$ = this.alarms$.pipe(map((alarms) => alarms.length));

  private destroy$ = new Subject<void>();

  constructor(
    private listDevicesUseCase: ListDevicesPaginatedUseCase,
    private getAlarmStatusUseCase: GetAlarmDeviceStatusUseCase,
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  statusBadge(device: DeviceGroup): string {
    if (device.status === 1) return 'bg-green';
    if (device.status === 0) return 'bg-red';
    return 'bg-secondary';
  }

  statusText(device: DeviceGroup): string {
    if (device.status === 1) return 'iot.onlineStatus';
    if (device.status === 0) return 'iot.offlineStatus';
    return 'iot.maintenance';
  }

  private loadDashboard(): void {
    this.loadingSubject.next(true);

    this.listDevicesUseCase.execute({ page: 1, pageSize: 100 })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.devicesSubject.next(res.data);
          this.totalSubject.next(res.total);
        },
        error: () => {
          this.devicesSubject.next([]);
          this.totalSubject.next(0);
        },
      });

    this.getAlarmStatusUseCase.execute({ page: 1, pageSize: 100 })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.alarmsSubject.next(Array.isArray(res) ? res : res?.data ?? []);
          this.loadingSubject.next(false);
        },
        error: () => {
          this.alarmsSubject.next([]);
          this.loadingSubject.next(false);
        },
      });
  }
}
