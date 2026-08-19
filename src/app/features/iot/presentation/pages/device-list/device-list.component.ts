import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { BehaviorSubject, Subject, takeUntil, map } from 'rxjs';

import { DeviceGroup } from '../../../domain/entities/device.entity';
import { GetAlarmDeviceStatusUseCase } from '../../../domain/use-cases/get-alarm-device-status.use-case';
import { ListDevicesPaginatedUseCase } from '../../../domain/use-cases/list-devices-paginated.use-case';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TranslatePipe],
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

  currentPage = 1;
  pageSize = 10;
  searchTerm = '';
  hardwareIdFilter = '';
  typeIdFilter = '';

  private destroy$ = new Subject<void>();

  constructor(
    private listDevicesUseCase: ListDevicesPaginatedUseCase,
    private getAlarmStatusUseCase: GetAlarmDeviceStatusUseCase,
  ) {}

  ngOnInit(): void {
    this.loadDevices();
    this.loadAlarms();
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

  loadDevices(): void {
    this.loadingSubject.next(true);
    const params: any = { page: this.currentPage, pageSize: this.pageSize };
    if (this.searchTerm) params.keyword = this.searchTerm;
    if (this.hardwareIdFilter) params.hardwareId = this.hardwareIdFilter;
    if (this.typeIdFilter) params.typeId = this.typeIdFilter;

    this.listDevicesUseCase.execute(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.devicesSubject.next(res.data);
          this.totalSubject.next(res.total);
          this.loadingSubject.next(false);
        },
        error: () => {
          this.devicesSubject.next([]);
          this.totalSubject.next(0);
          this.loadingSubject.next(false);
        },
      });
  }

  private loadAlarms(): void {
    this.getAlarmStatusUseCase.execute({ page: 1, pageSize: 100 })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.alarmsSubject.next(Array.isArray(res) ? res : res?.data ?? []);
        },
        error: () => {
          this.alarmsSubject.next([]);
        },
      });
  }

  search(): void {
    this.currentPage = 1;
    this.loadDevices();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.hardwareIdFilter = '';
    this.typeIdFilter = '';
    this.currentPage = 1;
    this.loadDevices();
  }

  prevPage(): void {
    if (this.currentPage > 1) { this.currentPage--; this.loadDevices(); }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) { this.currentPage++; this.loadDevices(); }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadDevices();
  }

  totalPages(): number {
    return Math.ceil(this.totalSubject.getValue() / this.pageSize) || 1;
  }

  pageNumbers(): (number | string)[] {
    const total = this.totalPages();
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    const current = this.currentPage;
    const pages: (number | string)[] = [1];
    const rangeStart = Math.max(2, current - 1);
    const rangeEnd = Math.min(total - 1, current + 1);
    if (rangeStart > 2) pages.push('...');
    for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i);
    if (rangeEnd < total - 1) pages.push('...');
    pages.push(total);
    return pages;
  }
}
