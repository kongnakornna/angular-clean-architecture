import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDocumentRepository } from '../repositories/document.repository';
import { DOCUMENT_REPOSITORY } from '../../../../core/di/tokens';
import { AppDocument } from '../entities/document.entity';

@Injectable({ providedIn: 'root' })
export class UploadDocumentUseCase {
  constructor(@Inject(DOCUMENT_REPOSITORY) private repo: IDocumentRepository) {}

  execute(file: File, metadata: Partial<AppDocument>): Observable<AppDocument> {
    return this.repo.upload(file, metadata);
  }
}
