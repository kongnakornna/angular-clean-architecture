import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private translateService = inject(TranslateService);

  readonly lang = signal<string>('en');

  constructor() {
    try {
      const current = (this.translateService as any).getCurrentLang?.() || 'en';
      this.lang.set(current);
    } catch {
      this.lang.set('en');
    }
  }

  translate(key: string): string {
    return this.translateService.instant(key);
  }

  loadLanguage(lang: string): void {
    this.translateService.use(lang);
    this.lang.set(lang);
  }
}
