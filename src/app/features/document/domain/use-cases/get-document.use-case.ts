import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDocumentRepository } from '../repositories/document.repository';
import { DOCUMENT_REPOSITORY } from '../../../../core/di/tokens';
import { AppDocument } from '../entities/document.entity';

@Injectable({ providedIn: 'root' })
export class GetDocumentUseCase {
  constructor(@Inject(DOCUMENT_REPOSITORY) private repo: IDocumentRepository) {}

  execute(id: string): Observable<AppDocument> {
    return this.repo.getById(id);
  }
}
