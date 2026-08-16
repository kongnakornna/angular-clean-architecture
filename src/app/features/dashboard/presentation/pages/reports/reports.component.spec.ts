import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ReportsComponent } from './reports.component';
import { GenerateReportUseCase } from '../../../domain/use-cases/generate-report.use-case';
import { GetReportsUseCase } from '../../../domain/use-cases/get-reports.use-case';
import { Report } from '../../../domain/entities/report.entity';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;
  const mockReports: Report[] = [
    { id: '1', name: 'รายงานสรุปยอดขาย Q1-2026', type: 'Sales', createdAt: '01/04/2026', status: 'ready', reportType: 'sales_summary' },
    { id: '2', name: 'รายงานสถานะงานคงค้าง', type: 'Operations', createdAt: '28/03/2026', status: 'generating', reportType: 'job_status' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsComponent],
      providers: [
        { provide: TranslateService, useValue: { currentLang: 'en', getCurrentLang: () => 'en', getBrowserLang: () => 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
        { provide: GenerateReportUseCase, useValue: { execute: () => of(new Blob()) } },
        { provide: GetReportsUseCase, useValue: { execute: () => of(mockReports) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load reports from API', () => {
    let loaded: Report[] = [];
    component.reports$.subscribe((reports) => (loaded = reports));
    fixture.detectChanges();
    expect(loaded.length).toBeGreaterThan(0);
    expect(loaded[0].status).toBe('ready');
  });

  it('should call generateReport on download', () => {
    const spy = spyOn((component as any).generateReport, 'execute').and.returnValue(of(new Blob()));
    component.download('sales_summary');
    expect(spy).toHaveBeenCalledWith({ type: 'sales_summary', startDate: '2026-01-01', endDate: '2026-03-31' });
  });
});
