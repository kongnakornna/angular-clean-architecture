import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { MainDashboardComponent } from './main-dashboard.component';
import { GetDashboardStatsUseCase } from '../../../domain/use-cases/get-dashboard-stats.use-case';
import { GetRevenueChartUseCase } from '../../../domain/use-cases/get-revenue-chart.use-case';
import { GetRecentActivitiesUseCase } from '../../../domain/use-cases/get-recent-activities.use-case';

describe('MainDashboardComponent', () => {
  let component: MainDashboardComponent;
  let fixture: ComponentFixture<MainDashboardComponent>;

  const mockStats = {
    totalJobs: 156, activeJobs: 42, totalCustomers: 89,
    totalRevenue: 45230, monthlyRevenue: 7500,
    conversionRate: 3.2, pendingApprovals: 5, lowStockItems: 12,
  };
  const mockRevenue = [
    { month: 'ม.ค.', revenue: 6500, expenses: 4000, profit: 2500 },
  ];
  const mockActivities = [
    { id: '1', user: 'สมชาย', action: 'สร้างงานใหม่', target: 'JC-2026-001', time: new Date(), type: 'create' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainDashboardComponent],
      providers: [
        { provide: TranslateService, useValue: { currentLang: 'en', getCurrentLang: () => 'en', getBrowserLang: () => 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
        { provide: GetDashboardStatsUseCase, useValue: { execute: () => of(mockStats) } },
        { provide: GetRevenueChartUseCase, useValue: { execute: () => of(mockRevenue) } },
        { provide: GetRecentActivitiesUseCase, useValue: { execute: () => of(mockActivities) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should finish loading after use cases resolve', (done) => {
    component.loading$.subscribe((loading) => {
      if (!loading) {
        expect(loading).toBeFalse();
        done();
      }
    });
  });

  it('should load stats from use case', (done) => {
    component.stats$.subscribe((stats) => {
      if (stats) {
        expect(stats.totalJobs).toBe(156);
        expect(stats.totalRevenue).toBe(45230);
        done();
      }
    });
  });

  it('should load revenue data from use case', (done) => {
    component.revenue$.subscribe((data) => {
      if (data.length > 0) {
        expect(data[0].month).toBe('ม.ค.');
        expect(data[0].revenue).toBe(6500);
        done();
      }
    });
  });

  it('should load activities from use case', (done) => {
    component.activities$.subscribe((activities) => {
      if (activities.length > 0) {
        expect(activities[0].user).toBe('สมชาย');
        done();
      }
    });
  });
});
