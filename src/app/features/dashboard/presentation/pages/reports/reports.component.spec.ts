import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ReportsComponent } from './reports.component';
import { GenerateReportUseCase } from '../../../domain/use-cases/generate-report.use-case';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsComponent],
      providers: [
        { provide: TranslateService, useValue: { currentLang: 'en', getCurrentLang: () => 'en', getBrowserLang: () => 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
        { provide: GenerateReportUseCase, useValue: { execute: () => of(new Blob()) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have reports', () => {
    expect(component.reports.length).toBeGreaterThan(0);
  });

  it('should call generateReport on download', () => {
    const spy = spyOn((component as any).generateReport, 'execute').and.returnValue(of(new Blob()));
    component.download('sales_summary');
    expect(spy).toHaveBeenCalledWith({ type: 'sales_summary', startDate: '2026-01-01', endDate: '2026-03-31' });
  });
});
