import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IDocumentRepository } from '../../domain/repositories/document.repository';
import { AppDocument, DocumentFolder } from '../../domain/entities/document.entity';
import { DocumentApiDataSource } from '../datasources/document.api.datasource';

@Injectable({ providedIn: 'root' })
export class DocumentRepositoryImpl implements IDocumentRepository {
  constructor(private ds: DocumentApiDataSource) {}

  list(params?: any): Observable<{ data: AppDocument[]; total: number }> {
    return this.ds.list(params).pipe(map((r) => ({ data: r.data.map((d: any) => this.toDoc(d)), total: r.total })));
  }
  getById(id: string): Observable<AppDocument> { return this.ds.getById(id).pipe(map((d) => this.toDoc(d))); }

  upload(file: File, metadata: Partial<AppDocument>): Observable<AppDocument> {
    const formData = new FormData();
    formData.append('file', file);
    if (metadata.folderId) formData.append('folderId', metadata.folderId);
    if (metadata.description) formData.append('description', metadata.description);
    if (metadata.tags) formData.append('tags', JSON.stringify(metadata.tags));
    return this.ds.upload(formData).pipe(map((d) => this.toDoc(d)));
  }

  delete(id: string): Observable<void> { return this.ds.delete(id); }
  share(id: string, userIds: string[]): Observable<void> { return this.ds.share(id, userIds); }

  listFolders(): Observable<DocumentFolder[]> {
    return this.ds.listFolders().pipe(map((list) => list.map((d: any) => ({ id: d.id, name: d.name, parentId: d.parentId, createdAt: new Date(d.createdAt) }))));
  }

  private toDoc(d: any): AppDocument {
    return {
      id: d.id, fileName: d.fileName, originalName: d.originalName, fileSize: d.fileSize,
      fileType: d.fileType, folderId: d.folderId, folderName: d.folderName, tags: d.tags || [],
      description: d.description, url: d.url, uploadedBy: d.uploadedBy,
      createdAt: new Date(d.createdAt), updatedAt: new Date(d.updatedAt),
    };
  }
}
