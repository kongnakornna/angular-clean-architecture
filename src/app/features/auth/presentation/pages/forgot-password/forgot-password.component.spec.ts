import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotPasswordUseCase } from '../../../domain/use-cases/forgot-password.use-case';
import { TranslateService } from '@ngx-translate/core';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordComponent, RouterTestingModule],
      providers: [
        { provide: ForgotPasswordUseCase, useValue: { execute: () => of(void 0) } },
        { provide: TranslateService, useValue: { currentLang: 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
