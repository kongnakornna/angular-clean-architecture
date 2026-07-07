import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITranslationRepository } from '../../domain/repositories/translation.repository';
import { Translation, SupportedLanguage, LanguageOption } from '../../domain/entities/translation.entity';
import { TranslationLocalDataSource } from '../datasources/translation-local.datasource';
import { APP_CONSTANTS } from '../../../../core/constants/app.constants';

@Injectable({ providedIn: 'root' })
export class TranslationRepositoryImpl implements ITranslationRepository {
  private translate = inject(TranslateService);
  private localDs = inject(TranslationLocalDataSource);

  getTranslations(lang: SupportedLanguage): Observable<Translation[]> {
    const data = this.translate.getTranslations(lang);
    return of(flattenObject(data as unknown as Record<string, any>).map(t => ({ ...t, language: lang })));
  }

  getAvailableLanguages(): Observable<LanguageOption[]> {
    return this.localDs.getLanguageOptions();
  }

  setLanguage(lang: SupportedLanguage): void {
    localStorage.setItem(APP_CONSTANTS.LANGUAGE_KEY, lang);
    this.translate.use(lang).subscribe();
  }

  getCurrentLanguage(): SupportedLanguage {
    return (localStorage.getItem(APP_CONSTANTS.LANGUAGE_KEY) as SupportedLanguage)
      || this.translate.getCurrentLang() as SupportedLanguage
      || 'en';
  }

  instant(key: string): string {
    return this.translate.instant(key) as string;
  }
}

function flattenObject(obj: Record<string, any>, prefix = ''): Translation[] {
  const result: Translation[] = [];
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      result.push(...flattenObject(obj[key], fullKey));
    } else {
      result.push({ key: fullKey, value: obj[key], language: '' });
    }
  }
  return result;
}