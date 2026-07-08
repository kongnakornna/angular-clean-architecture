import { DecimalPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { QuotationCreateComponent } from './quotation-create.component';

describe('QuotationCreateComponent', () => {
  let component: QuotationCreateComponent;
  let fixture: ComponentFixture<QuotationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotationCreateComponent, RouterTestingModule, DecimalPipe],
      providers: [
        { provide: TranslateService, useValue: { currentLang: 'en', getCurrentLang: () => 'en', getBrowserLang: () => 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuotationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
