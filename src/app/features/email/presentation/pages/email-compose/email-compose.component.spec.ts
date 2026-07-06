import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EmailComposeComponent } from './email-compose.component';

describe('EmailComposeComponent', () => {
  let component: EmailComposeComponent;
  let fixture: ComponentFixture<EmailComposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailComposeComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailComposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
