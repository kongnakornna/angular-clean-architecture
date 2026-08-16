import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MainDashboardComponent } from './main-dashboard.component';
import { GetDashboardStatsUseCase } from '../../../domain/use-cases/get-dashboard-stats.use-case';
import { GetRevenueChartUseCase } from '../../../domain/use-cases/get-revenue-chart.use-case';
import { GetJobStatusUseCase } from '../../../domain/use-cases/get-job-status.use-case';
import { GetTopPartsUseCase } from '../../../domain/use-cases/get-top-parts.use-case';

describe('MainDashboardComponent', () => {
  let component: MainDashboardComponent;
  let fixture: ComponentFixture<MainDashboardComponent>;

  const mockStats = {
    totalDevices: 120, onlineDevices: 90, todayCommands: 45, activeAlerts: 3,
  };
  const mockRevenue = [
    { period: 'Jan', amount: 6500 },
  ];
  const mockJobStatus = [
    { status: 'pending', count: 5 },
    { status: 'completed', count: 20 },
  ];
  const mockTopParts = [
    { partName: 'Sensor A', count: 30 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainDashboardComponent, RouterTestingModule],
      providers: [
        { provide: TranslateService, useValue: { currentLang: 'en', getCurrentLang: () => 'en', getBrowserLang: () => 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
        { provide: GetDashboardStatsUseCase, useValue: { execute: () => of(mockStats) } },
        { provide: GetRevenueChartUseCase, useValue: { execute: () => of(mockRevenue) } },
        { provide: GetJobStatusUseCase, useValue: { execute: () => of(mockJobStatus) } },
        { provide: GetTopPartsUseCase, useValue: { execute: () => of(mockTopParts) } },
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
        expect(stats.totalDevices).toBe(120);
        expect(stats.onlineDevices).toBe(90);
        done();
      }
    });
  });

  it('should load revenue data from use case', (done) => {
    component.revenue$.subscribe((data) => {
      if (data.length > 0) {
        expect(data[0].period).toBe('Jan');
        expect(data[0].amount).toBe(6500);
        done();
      }
    });
  });

  it('should load job status from use case', (done) => {
    component.jobStatus$.subscribe((statuses) => {
      if (statuses.length > 0) {
        expect(statuses[0].status).toBe('pending');
        done();
      }
    });
  });

  it('should load top parts from use case', (done) => {
    component.topParts$.subscribe((parts) => {
      if (parts.length > 0) {
        expect(parts[0].partName).toBe('Sensor A');
        done();
      }
    });
  });
});
