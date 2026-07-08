import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { JobListComponent } from './job-list.component';
import { ListJobsUseCase } from '../../../domain/use-cases/list-jobs.use-case';

describe('JobListComponent', () => {
  let component: JobListComponent;
  let fixture: ComponentFixture<JobListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobListComponent, RouterTestingModule],
      providers: [
        { provide: ListJobsUseCase, useValue: { execute: () => of({ data: [], total: 0 }) } },
        { provide: TranslateService, useValue: { currentLang: 'en', getCurrentLang: () => 'en', getBrowserLang: () => 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default page size of 10', () => {
    expect(component.pageSize).toBe(10);
  });

  it('should reset filters', () => {
    component.searchTerm = 'test';
    component.statusFilter = 'pending';
    component.resetFilters();
    expect(component.searchTerm).toBe('');
    expect(component.statusFilter).toBe('');
  });
});
