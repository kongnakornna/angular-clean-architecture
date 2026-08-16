import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DashboardRepositoryImpl } from './dashboard.repository.impl';
import { DashboardApiDataSource } from '../datasources/dashboard.api.datasource';

describe('DashboardRepositoryImpl', () => {
  let repository: DashboardRepositoryImpl;
  let ds: jasmine.SpyObj<DashboardApiDataSource>;

  beforeEach(() => {
    ds = jasmine.createSpyObj('DashboardApiDataSource', ['getStats', 'getRevenueChart', 'getRecentActivities', 'getReports', 'generateReport']);
    TestBed.configureTestingModule({
      providers: [
        DashboardRepositoryImpl,
        { provide: DashboardApiDataSource, useValue: ds },
      ],
    });
    repository = TestBed.inject(DashboardRepositoryImpl);
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should normalize report status to canonical codes', () => {
    ds.getReports.and.returnValue(of([
      { id: '1', name: 'A', type: 'Sales', createdAt: '01/04/2026', status: 'พร้อม', reportType: 'sales_summary' },
      { id: '2', name: 'B', type: 'Operations', createdAt: '28/03/2026', status: 'generating', reportType: 'job_status' },
      { id: '3', name: 'C', type: 'CRM', createdAt: '25/03/2026', status: 'draft', reportType: 'new_customers' },
    ]));

    let result: any[] = [];
    repository.getReports().subscribe((reports) => (result = reports));

    expect(result[0].status).toBe('ready');
    expect(result[1].status).toBe('generating');
    expect(result[2].status).toBe('draft');
  });
});
