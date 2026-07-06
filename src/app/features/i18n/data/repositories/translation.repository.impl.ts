import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITranslationRepository } from '../../domain/repositories/translation.repository';
import { Translation, SupportedLanguage } from '../../domain/entities/translation.entity';
import { TranslationLocalDataSource } from '../datasources/translation-local.datasource';
import { APP_CONSTANTS } from '../../../../core/constants/app.constants';

@Injectable({ providedIn: 'root' })
export class TranslationRepositoryImpl implements ITranslationRepository {
  constructor(private localDs: TranslationLocalDataSource) {}

  getTranslations(lang: SupportedLanguage): Observable<Translation[]> {
    return this.localDs.getTranslations(lang);
  }

  setLanguage(lang: SupportedLanguage): void {
    localStorage.setItem(APP_CONSTANTS.LANGUAGE_KEY, lang);
  }

  getCurrentLanguage(): SupportedLanguage {
    return (localStorage.getItem(APP_CONSTANTS.LANGUAGE_KEY) as SupportedLanguage) || 'th';
  }

  getAvailableLanguages(): SupportedLanguage[] {
    return ['th', 'en'];
  }
}
