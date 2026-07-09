import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { LockScreenComponent } from './lock-screen.component';
import { TranslateService } from '@ngx-translate/core';
import { provideTablerIcons } from 'angular-tabler-icons';
import { IconEye, IconEyeOff } from 'angular-tabler-icons/icons';

describe('LockScreenComponent', () => {
  let component: LockScreenComponent;
  let fixture: ComponentFixture<LockScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LockScreenComponent, RouterTestingModule],
      providers: [
        { provide: TranslateService, useValue: { currentLang: 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
        provideTablerIcons({ IconEye, IconEyeOff }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LockScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle password visibility', () => {
    expect(component.passwordVisible).toBeFalse();
    component.togglePassword();
    expect(component.passwordVisible).toBeTrue();
    component.togglePassword();
    expect(component.passwordVisible).toBeFalse();
  });

  it('should set loading on submit', () => {
    component.onSubmit();
    expect(component.loading).toBeTrue();
  });
});