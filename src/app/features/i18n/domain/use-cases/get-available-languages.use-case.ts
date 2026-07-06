import { Inject, Injectable } from '@angular/core';
import { ITranslationRepository } from '../repositories/translation.repository';
import { TRANSLATION_REPOSITORY } from '../../../../core/di/tokens';
import { SupportedLanguage } from '../entities/translation.entity';

@Injectable({ providedIn: 'root' })
export class GetAvailableLanguagesUseCase {
  constructor(@Inject(TRANSLATION_REPOSITORY) private repo: ITranslationRepository) {}

  execute(): SupportedLanguage[] {
    return this.repo.getAvailableLanguages();
  }
}
