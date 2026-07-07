import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SignUpComponent } from './sign-up.component';
import { SignUpUseCase } from '../../../domain/use-cases/sign-up.use-case';
import { provideTablerIcons } from 'angular-tabler-icons';
import { IconEye, IconEyeOff } from 'angular-tabler-icons/icons';
import { TranslateService } from '@ngx-translate/core';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpComponent, RouterTestingModule],
      providers: [
        { provide: SignUpUseCase, useValue: { execute: () => of(void 0) } },
        { provide: TranslateService, useValue: { currentLang: 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
        provideTablerIcons({ IconEye, IconEyeOff }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
