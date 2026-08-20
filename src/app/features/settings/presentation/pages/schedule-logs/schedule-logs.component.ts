import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { ScheduleApiDataSource } from '../../../data/datasources/schedule.api.datasource';

@Component({
  selector: 'app-schedule-logs',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './schedule-logs.component.html',
})
export class ScheduleLogsComponent implements OnInit {
  items: any[] = [];
  loading = false;
  page = 1;
  pageSize = 10;
  total = 0;
  stats: any = {};
  weekStats: any[] = [];
  eventFilter = '';
  systemFilter = '';
  locationFilter = '';
  typeFilter = '';
  startDate = '';
  endDate = '';

  constructor(private dataSource: ScheduleApiDataSource) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.loading = true;
    const params: any = {
      page: this.page,
      pageSize: this.pageSize,
    };
    if (this.eventFilter) params.event = this.eventFilter;
    if (this.systemFilter) params.system = this.systemFilter;
    if (this.locationFilter) params.location = this.locationFilter;
    if (this.typeFilter) params.type = this.typeFilter;
    if (this.startDate) params.start_date = this.startDate;
    if (this.endDate) params.end_date = this.endDate;

    this.dataSource.getLogsPaginate(params).subscribe({
      next: (res: any) => {
        const payload = res?.payload || res;
        this.items = payload?.data || [];
        this.total = payload?.total || 0;
        this.stats = payload?.stats || {};
        this.weekStats = payload?.weekStats || payload?.week_stats || [];
        this.loading = false;
      },
      error: () => { this.loading = false; },
    });
  }

  search(): void { this.page = 1; this.loadItems(); }
  reset(): void {
    this.eventFilter = '';
    this.systemFilter = '';
    this.locationFilter = '';
    this.typeFilter = '';
    this.startDate = '';
    this.endDate = '';
    this.page = 1;
    this.loadItems();
  }
  prevPage(): void { if (this.page > 1) { this.page--; this.loadItems(); } }
  nextPage(): void { if (this.page < this.totalPages) { this.page++; this.loadItems(); } }
  get totalPages(): number { return Math.ceil(this.total / this.pageSize); }

  getCompletionRate(): string {
    if (!this.stats.totalSchedules || this.stats.totalSchedules === 0) return '0';
    return ((this.stats.active / this.stats.totalSchedules) * 100).toFixed(1);
  }
}
