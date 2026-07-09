import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TwoStepCodeComponent } from './two-step-code.component';
import { TranslateService } from '@ngx-translate/core';

describe('TwoStepCodeComponent', () => {
  let component: TwoStepCodeComponent;
  let fixture: ComponentFixture<TwoStepCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoStepCodeComponent, RouterTestingModule],
      providers: [
        { provide: TranslateService, useValue: { currentLang: 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TwoStepCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 code inputs', () => {
    expect(component.codes.length).toBe(6);
  });

  it('should set loading on submit', fakeAsync(() => {
    component.onSubmit();
    expect(component.loading).toBeTrue();
    tick(1000);
    expect(component.loading).toBeFalse();
  }));
});