import { Observable } from 'rxjs';
import { AppDocument, DocumentFolder } from '../entities/document.entity';

export interface IDocumentRepository {
  list(params?: { folderId?: string; search?: string; page?: number; pageSize?: number }): Observable<{ data: AppDocument[]; total: number }>;
  getById(id: string): Observable<AppDocument>;
  upload(file: File, metadata: Partial<AppDocument>): Observable<AppDocument>;
  delete(id: string): Observable<void>;
  share(id: string, userIds: string[]): Observable<void>;
  listFolders(): Observable<DocumentFolder[]>;
}
