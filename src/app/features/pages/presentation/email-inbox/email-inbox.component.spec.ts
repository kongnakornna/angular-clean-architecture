import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTablerIcons } from 'angular-tabler-icons';
import { EmailInboxComponent } from './email-inbox.component';

describe('EmailInboxComponent', () => {
  let component: EmailInboxComponent;
  let fixture: ComponentFixture<EmailInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailInboxComponent],
      providers: [provideTablerIcons({})],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});