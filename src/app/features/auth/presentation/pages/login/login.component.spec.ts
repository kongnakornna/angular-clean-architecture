import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';
import { LoginUseCase } from '../../../domain/use-cases/login.use-case';
import { provideTablerIcons } from 'angular-tabler-icons';
import { IconEye, IconEyeOff, IconBrandGithub, IconBrandX } from 'angular-tabler-icons/icons';
import { TranslateService } from '@ngx-translate/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule],
      providers: [
        { provide: LoginUseCase, useValue: { execute: () => of({}) } },
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
});
