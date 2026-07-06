import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EmailLogsComponent } from './email-logs.component';

describe('EmailLogsComponent', () => {
  let component: EmailLogsComponent;
  let fixture: ComponentFixture<EmailLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailLogsComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
