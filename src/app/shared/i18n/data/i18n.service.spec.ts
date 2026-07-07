import { TestBed } from '@angular/core/testing';
import { I18nService } from './i18n.service';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('I18nService', () => {
  let service: I18nService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TranslateService, useValue: { currentLang: 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
      ],
    });
    service = TestBed.inject(I18nService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
