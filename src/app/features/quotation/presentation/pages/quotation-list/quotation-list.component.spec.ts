import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { QuotationListComponent } from './quotation-list.component';

describe('QuotationListComponent', () => {
  let component: QuotationListComponent;
  let fixture: ComponentFixture<QuotationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotationListComponent, RouterTestingModule],
      providers: [
        { provide: TranslateService, useValue: { currentLang: 'en', getCurrentLang: () => 'en', getBrowserLang: () => 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuotationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
