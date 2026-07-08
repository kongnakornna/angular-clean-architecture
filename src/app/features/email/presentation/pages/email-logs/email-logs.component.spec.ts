import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { provideTablerIcons } from 'angular-tabler-icons';
import { EmailLogsComponent } from './email-logs.component';

describe('EmailLogsComponent', () => {
  let component: EmailLogsComponent;
  let fixture: ComponentFixture<EmailLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailLogsComponent, RouterTestingModule],
      providers: [
        provideTablerIcons({}),
        { provide: TranslateService, useValue: { currentLang: 'en', getCurrentLang: () => 'en', getBrowserLang: () => 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
