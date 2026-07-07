import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONSTANTS } from '../../../core/constants/app.constants';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private translateService = inject(TranslateService);

  readonly lang = signal<string>('en');

  constructor() {
    const saved = localStorage.getItem(APP_CONSTANTS.LANGUAGE_KEY);
    if (saved && saved !== 'en') {
      this.translateService.use(saved).subscribe({
        next: () => this.lang.set(saved),
        error: () => this.lang.set('en'),
      });
    } else {
      this.lang.set('en');
    }
  }

  translate(key: string): string {
    return this.translateService.instant(key);
  }

  loadLanguage(lang: string): void {
    localStorage.setItem(APP_CONSTANTS.LANGUAGE_KEY, lang);
    this.translateService.use(lang).subscribe({
      next: () => this.lang.set(lang),
      error: () => this.lang.set(lang),
    });
  }
}
