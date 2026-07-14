import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AnalyticsComponent } from './analytics.component';
import { GetDashboardStatsUseCase } from '../../../domain/use-cases/get-dashboard-stats.use-case';
import { GetRevenueChartUseCase } from '../../../domain/use-cases/get-revenue-chart.use-case';

describe('AnalyticsComponent', () => {
  let component: AnalyticsComponent;
  let fixture: ComponentFixture<AnalyticsComponent>;

  const mockStats = {
    totalJobs: 156, activeJobs: 42, totalCustomers: 89,
    totalRevenue: 45230, monthlyRevenue: 7500,
    conversionRate: 3.2, pendingApprovals: 5, lowStockItems: 12,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsComponent],
      providers: [
        { provide: TranslateService, useValue: { currentLang: 'en', getCurrentLang: () => 'en', getBrowserLang: () => 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
        { provide: GetDashboardStatsUseCase, useValue: { execute: () => of(mockStats) } },
        { provide: GetRevenueChartUseCase, useValue: { execute: () => of([]) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
});
