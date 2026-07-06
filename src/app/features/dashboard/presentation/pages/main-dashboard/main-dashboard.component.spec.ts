import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainDashboardComponent } from './main-dashboard.component';

describe('MainDashboardComponent', () => {
  let component: MainDashboardComponent;
  let fixture: ComponentFixture<MainDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainDashboardComponent],
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
