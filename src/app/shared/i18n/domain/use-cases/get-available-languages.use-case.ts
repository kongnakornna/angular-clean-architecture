import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITranslationRepository } from '../repositories/translation.repository';
import { TRANSLATION_REPOSITORY } from '../../../../core/di/tokens';
import { LanguageOption } from '../entities/translation.entity';

@Injectable({ providedIn: 'root' })
export class GetAvailableLanguagesUseCase {
  constructor(@Inject(TRANSLATION_REPOSITORY) private repo: ITranslationRepository) {}

  execute(): Observable<LanguageOption[]> {
    return this.repo.getAvailableLanguages();
  }
}
