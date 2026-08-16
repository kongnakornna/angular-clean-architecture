import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { FooterComponent } from './footer.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { I18nService } from '../../shared/i18n/data/i18n.service';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslatePipe],
      declarations: [FooterComponent],
      providers: [
        { provide: TranslateService, useValue: { currentLang: 'en', getCurrentLang: () => 'en', getBrowserLang: () => 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have current year', () => {
    expect(component.currentYear).toBe(new Date().getFullYear());
  });

  it('should show Buddhist year when language is th', () => {
    TestBed.inject(I18nService).lang.set('th');
    fixture.detectChanges();
    expect(component.displayYear()).toBe(new Date().getFullYear() + 543);
  });

  it('should show current year when language is not th', () => {
    fixture.detectChanges();
    expect(component.displayYear()).toBe(new Date().getFullYear());
  });
});
