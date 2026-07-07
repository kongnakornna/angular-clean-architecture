import { Observable } from 'rxjs';
import { Translation, SupportedLanguage, LanguageOption } from '../entities/translation.entity';

export interface ITranslationRepository {
  getTranslations(lang: SupportedLanguage): Observable<Translation[]>;
  getAvailableLanguages(): Observable<LanguageOption[]>;
  setLanguage(lang: SupportedLanguage): void;
  getCurrentLanguage(): SupportedLanguage;
  instant(key: string): string;
}
