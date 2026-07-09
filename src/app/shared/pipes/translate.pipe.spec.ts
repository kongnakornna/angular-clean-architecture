import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { TranslatePipe } from './translate.pipe';

describe('TranslatePipe', () => {
  let pipe: TranslatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TranslatePipe,
        { provide: TranslateService, useValue: { currentLang: 'en', getCurrentLang: () => 'en', getBrowserLang: () => 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
      ],
    });
    pipe = TestBed.inject(TranslatePipe);
  });

  it('should return the same value (placeholder)', () => {
    expect(pipe.transform('test')).toBe('test');
  });
});
