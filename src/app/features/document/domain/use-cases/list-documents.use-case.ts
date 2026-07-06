import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDocumentRepository } from '../repositories/document.repository';
import { DOCUMENT_REPOSITORY } from '../../../../core/di/tokens';
import { AppDocument } from '../entities/document.entity';

@Injectable({ providedIn: 'root' })
export class ListDocumentsUseCase {
  constructor(@Inject(DOCUMENT_REPOSITORY) private repo: IDocumentRepository) {}

  execute(params?: { folderId?: string; search?: string; page?: number; pageSize?: number }): Observable<{ data: AppDocument[]; total: number }> {
    return this.repo.list(params);
  }
}
