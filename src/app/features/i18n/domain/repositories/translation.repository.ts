import { Observable } from 'rxjs';
import { Translation, SupportedLanguage } from '../entities/translation.entity';

export interface ITranslationRepository {
  getTranslations(lang: SupportedLanguage): Observable<Translation[]>;
  setLanguage(lang: SupportedLanguage): void;
  getCurrentLanguage(): SupportedLanguage;
  getAvailableLanguages(): SupportedLanguage[];
}
