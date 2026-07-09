import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TwoStepVerificationComponent } from './two-step-verification.component';
import { TranslateService } from '@ngx-translate/core';

describe('TwoStepVerificationComponent', () => {
  let component: TwoStepVerificationComponent;
  let fixture: ComponentFixture<TwoStepVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoStepVerificationComponent, RouterTestingModule],
      providers: [
        { provide: TranslateService, useValue: { currentLang: 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TwoStepVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default country code +1', () => {
    expect(component.countryCode).toBe('+1');
  });

  it('should set loading on submit', fakeAsync(() => {
    component.onSubmit();
    expect(component.loading).toBeTrue();
    tick(1000);
    expect(component.loading).toBeFalse();
  }));
});