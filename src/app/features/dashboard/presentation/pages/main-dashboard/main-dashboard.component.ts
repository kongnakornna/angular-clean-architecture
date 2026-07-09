import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  totalCustomers: number;
  revenue: number;
  conversionRate: number;
}

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss'],
})
export class MainDashboardComponent implements OnInit {
  private statsSubject = new BehaviorSubject<DashboardStats | null>(null);
  stats$ = this.statsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  chartData = {
    labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'],
    values: [65, 78, 90, 85, 95, 110],
  };

  recentActivities = [
    { user: 'สมชาย', action: 'สร้างงานใหม่', target: 'JC-2026-001', time: '5 นาทีที่แล้ว' },
    { user: 'นางสาวกนก', action: 'อนุมัติ Quotation', target: 'QT-2026-045', time: '1 ชั่วโมงที่แล้ว' },
    { user: 'นายวิชัย', action: 'อัปเดตสถานะงาน', target: 'JC-2026-023', time: '2 ชั่วโมงที่แล้ว' },
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.statsSubject.next({
        totalJobs: 156, activeJobs: 42, totalCustomers: 89,
        revenue: 45230, conversionRate: 3.2,
      });
      this.loadingSubject.next(false);
    }, 1000);
  }
}