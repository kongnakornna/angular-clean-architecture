import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JobBoardComponent } from './job-board.component';

describe('JobBoardComponent', () => {
  let component: JobBoardComponent;
  let fixture: ComponentFixture<JobBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobBoardComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(JobBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
