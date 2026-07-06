import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDocumentRepository } from '../repositories/document.repository';
import { DOCUMENT_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class ShareDocumentUseCase {
  constructor(@Inject(DOCUMENT_REPOSITORY) private repo: IDocumentRepository) {}

  execute(id: string, userIds: string[]): Observable<void> {
    return this.repo.share(id, userIds);
  }
}
