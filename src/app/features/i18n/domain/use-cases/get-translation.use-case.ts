import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITranslationRepository } from '../repositories/translation.repository';
import { TRANSLATION_REPOSITORY } from '../../../../core/di/tokens';
import { Translation, SupportedLanguage } from '../entities/translation.entity';

@Injectable({ providedIn: 'root' })
export class GetTranslationUseCase {
  constructor(@Inject(TRANSLATION_REPOSITORY) private repo: ITranslationRepository) {}

  execute(lang: SupportedLanguage): Observable<Translation[]> {
    return this.repo.getTranslations(lang);
  }
}
