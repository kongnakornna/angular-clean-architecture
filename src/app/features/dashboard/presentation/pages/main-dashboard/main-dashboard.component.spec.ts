import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { MainDashboardComponent } from './main-dashboard.component';

describe('MainDashboardComponent', () => {
  let component: MainDashboardComponent;
  let fixture: ComponentFixture<MainDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainDashboardComponent],
      providers: [
        { provide: TranslateService, useValue: { currentLang: 'en', getCurrentLang: () => 'en', getBrowserLang: () => 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with loading state', (done) => {
    component.loading$.subscribe((loading) => {
      if (loading) {
        expect(loading).toBeTrue();
        done();
      }
    });
  });

  it('should load stats after init', (done) => {
    component.ngOnInit();
    setTimeout(() => {
      component.stats$.subscribe((stats) => {
        if (stats) {
          expect(stats.totalJobs).toBe(156);
          done();
        }
      });
    }, 1100);
  });
});
