import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { provideTablerIcons } from 'angular-tabler-icons';
import { EmailComposeComponent } from './email-compose.component';

describe('EmailComposeComponent', () => {
  let component: EmailComposeComponent;
  let fixture: ComponentFixture<EmailComposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailComposeComponent, RouterTestingModule],
      providers: [
        provideTablerIcons({}),
        { provide: TranslateService, useValue: { currentLang: 'en', getCurrentLang: () => 'en', getBrowserLang: () => 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailComposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
