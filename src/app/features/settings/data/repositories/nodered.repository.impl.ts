import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { INodeRedRepository } from '../../domain/repositories/nodered.repository';
import { NodeRed } from '../../domain/entities/nodered.entity';
import { NodeRedApiDataSource } from '../datasources/nodered.api.datasource';

@Injectable({ providedIn: 'root' })
export class NodeRedRepositoryImpl implements INodeRedRepository {
  constructor(private dataSource: NodeRedApiDataSource) {}

  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: NodeRed[]; total: number }> {
    return this.dataSource.list(params).pipe(
      map((res) => ({ data: res.data.map((dto) => this.mapToEntity(dto)), total: res.total }))
    );
  }

  getById(id: string): Observable<NodeRed> {
    return this.dataSource.getById(id).pipe(map((dto) => this.mapToEntity(dto)));
  }

  create(nodered: Partial<NodeRed>): Observable<NodeRed> {
    return this.dataSource.create(nodered as any).pipe(map((dto) => this.mapToEntity(dto)));
  }

  update(id: string, nodered: Partial<NodeRed>): Observable<NodeRed> {
    return this.dataSource.update(id, nodered as any).pipe(map((dto) => this.mapToEntity(dto)));
  }

  testConnection(id: string): Observable<{ success: boolean; message: string }> {
    return this.dataSource.testConnection(id);
  }

  private mapToEntity(dto: any): NodeRed {
    return {
      id: dto.id,
      name: dto.name,
      url: dto.url,
      adminUrl: dto.adminUrl,
      flows: dto.flows,
      status: dto.status,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    };
  }
}
