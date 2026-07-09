import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { provideTablerIcons } from 'angular-tabler-icons';
import { IconCheck, IconX } from 'angular-tabler-icons/icons';
import { QuotationDetailComponent } from './quotation-detail.component';

describe('QuotationDetailComponent', () => {
  let component: QuotationDetailComponent;
  let fixture: ComponentFixture<QuotationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotationDetailComponent, RouterTestingModule],
      providers: [
        provideTablerIcons({ IconCheck, IconX }),
        { provide: TranslateService, useValue: { currentLang: 'en', getCurrentLang: () => 'en', getBrowserLang: () => 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuotationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
