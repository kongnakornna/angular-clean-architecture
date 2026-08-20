import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { ScheduleApiDataSource } from '../../../data/datasources/schedule.api.datasource';

@Component({
  selector: 'app-schedule-device',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './schedule-device.component.html',
})
export class ScheduleDeviceComponent implements OnInit {
  scheduleId = '';
  items: any[] = [];
  loading = false;
  page = 1;
  pageSize = 10;
  total = 0;
  keyword = '';
  locations: any[] = [];
  types: any[] = [];
  schedules: any[] = [];
  selectedLocation = '';
  selectedTypeId = '';
  selectedScheduleId = '';

  constructor(
    private route: ActivatedRoute,
    private dataSource: ScheduleApiDataSource,
  ) {}

  ngOnInit(): void {
    this.scheduleId = this.route.snapshot.paramMap.get('id') || '';
    this.selectedScheduleId = this.scheduleId;
    this.loadFilterOptions();
    this.loadItems();
  }

  loadFilterOptions(): void {
    this.dataSource.getAllSchedules().subscribe({
      next: (res: any) => {
        this.schedules = (res?.payload || res || []).filter((s: any) => s.status === 1 || s.status === '1');
      },
    });
  }

  loadItems(): void {
    this.loading = true;
    const sid = this.selectedScheduleId || this.scheduleId;
    this.dataSource.getDeviceList({
      page: this.page,
      pageSize: this.pageSize,
      schedule_id: sid,
      keyword: this.keyword,
      bucket: this.selectedLocation,
      type_id: this.selectedTypeId,
    }).subscribe({
      next: (res: any) => {
        this.items = res?.payload?.data || res?.data || [];
        this.total = res?.payload?.total || res?.total || 0;
        this.loading = false;
      },
      error: () => { this.loading = false; },
    });
  }

  toggleDeviceAssignment(item: any): void {
    const isChecked = item.schedule_status === 1 || item.schedule_status === '1';
    const obs = isChecked
      ? this.dataSource.deleteScheduleDevice(this.selectedScheduleId || this.scheduleId, item.device_id)
      : this.dataSource.createScheduleDevice(this.selectedScheduleId || this.scheduleId, item.device_id);
    obs.subscribe({
      next: () => { this.loadItems(); },
      error: () => { this.loadItems(); },
    });
  }

  isAssigned(item: any): boolean {
    return item.schedule_status === 1 || item.schedule_status === '1';
  }

  search(): void { this.page = 1; this.loadItems(); }
  reset(): void { this.keyword = ''; this.selectedLocation = ''; this.selectedTypeId = ''; this.page = 1; this.loadItems(); }
  prevPage(): void { if (this.page > 1) { this.page--; this.loadItems(); } }
  nextPage(): void { if (this.page < this.totalPages) { this.page++; this.loadItems(); } }
  get totalPages(): number { return Math.ceil(this.total / this.pageSize); }
}
