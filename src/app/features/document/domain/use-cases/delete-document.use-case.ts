import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDocumentRepository } from '../repositories/document.repository';
import { DOCUMENT_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class DeleteDocumentUseCase {
  constructor(@Inject(DOCUMENT_REPOSITORY) private repo: IDocumentRepository) {}

  execute(id: string): Observable<void> {
    return this.repo.delete(id);
  }
}
