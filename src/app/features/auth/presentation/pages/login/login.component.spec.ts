import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { LoginUseCase } from '../../../domain/use-cases/login.use-case';
import { provideTablerIcons } from 'angular-tabler-icons';
import { IconEye, IconEyeOff, IconBrandGithub, IconBrandX } from 'angular-tabler-icons/icons';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from '../../../../../shared/i18n/data/i18n.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let executeMock: jasmine.Spy;

  beforeEach(async () => {
    executeMock = jasmine.createSpy('execute').and.returnValue(of({}));
    await TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule],
      providers: [
        { provide: LoginUseCase, useValue: { execute: executeMock } },
        { provide: I18nService, useValue: { translate: (k: string) => k } },
        { provide: TranslateService, useValue: { currentLang: 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
        provideTablerIcons({ IconEye, IconEyeOff, IconBrandGithub, IconBrandX }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show backend msg when login fails with 401', () => {
    executeMock.and.returnValue(throwError(() => ({ status: 401, message: 'invalid credentials' })));
    component.username = 'u';
    component.password = 'p';

    component.onSubmit();

    expect(component.error).toBe('invalid credentials');
    expect(component.loading).toBeFalse();
  });

  it('should fall back to i18n key when 401 has no msg', () => {
    executeMock.and.returnValue(throwError(() => ({ status: 401, message: '' })));
    component.username = 'u';
    component.password = 'p';

    component.onSubmit();

    expect(component.error).toBe('login.invalidCredentials');
  });
});
