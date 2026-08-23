import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { ScheduleApiDataSource } from '../../../data/datasources/schedule.api.datasource';

@Component({
  selector: 'app-schedule-data',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './schedule-data.component.html',
})
export class ScheduleDataComponent implements OnInit {
  scheduleId = '';
  items: any[] = [];
  loading = false;
  page = 1;
  pageSize = 10;
  total = 0;
  keyword = '';
  buckets: any[] = [];
  types: any[] = [];
  selectedBucket = '';
  selectedTypeId = '';

  constructor(
    private route: ActivatedRoute,
    private dataSource: ScheduleApiDataSource,
  ) {}

  ngOnInit(): void {
    this.scheduleId = this.route.snapshot.paramMap.get('id') || '';
    this.loadBuckets();
    this.loadTypes();
    this.loadItems();
  }

  loadBuckets(): void {
    this.dataSource.getDevicePage({ schedule_id: this.scheduleId, page: 1, pageSize: 1 }).subscribe({
      next: () => {},
    });
  }

  loadTypes(): void {}

  loadItems(): void {
    this.loading = true;
    this.dataSource.getDevicePage({
      page: this.page,
      pageSize: this.pageSize,
      schedule_id: this.scheduleId,
      keyword: this.keyword,
      bucket: this.selectedBucket,
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

  search(): void { this.page = 1; this.loadItems(); }
  reset(): void { this.keyword = ''; this.selectedBucket = ''; this.selectedTypeId = ''; this.page = 1; this.loadItems(); }
  prevPage(): void { if (this.page > 1) { this.page--; this.loadItems(); } }
  nextPage(): void { if (this.page < this.totalPages) { this.page++; this.loadItems(); } }
  get totalPages(): number { return Math.ceil(this.total / this.pageSize); }
}
