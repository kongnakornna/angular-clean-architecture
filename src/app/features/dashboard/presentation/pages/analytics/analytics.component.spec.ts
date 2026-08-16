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
    totalDevices: 120, onlineDevices: 90, todayCommands: 45, activeAlerts: 3,
  };
  const mockRevenue = [
    { period: 'Jan', amount: 6500 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsComponent],
      providers: [
        { provide: TranslateService, useValue: { currentLang: 'en', getCurrentLang: () => 'en', getBrowserLang: () => 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
        { provide: GetDashboardStatsUseCase, useValue: { execute: () => of(mockStats) } },
        { provide: GetRevenueChartUseCase, useValue: { execute: () => of(mockRevenue) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsComponent);
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

  it('should render device stats', () => {
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('120');
    expect(el.textContent).toContain('90');
    expect(el.textContent).toContain('45');
    expect(el.textContent).toContain('3');
  });

  it('should render revenue period label', () => {
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Jan');
  });
});
