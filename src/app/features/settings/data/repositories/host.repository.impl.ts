import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IHostRepository } from '../../domain/repositories/host.repository';
import { Host } from '../../domain/entities/host.entity';
import { HostApiDataSource } from '../datasources/host.api.datasource';

@Injectable({ providedIn: 'root' })
export class HostRepositoryImpl implements IHostRepository {
  constructor(private dataSource: HostApiDataSource) {}

  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: Host[]; total: number }> {
    return this.dataSource.list(params).pipe(
      map((res) => ({ data: res.data.map((dto) => this.mapToEntity(dto)), total: res.total }))
    );
  }

  getById(id: string): Observable<Host> {
    return this.dataSource.getById(id).pipe(map((dto) => this.mapToEntity(dto)));
  }

  create(host: Partial<Host>): Observable<Host> {
    return this.dataSource.create(host as any).pipe(map((dto) => this.mapToEntity(dto)));
  }

  update(id: string, host: Partial<Host>): Observable<Host> {
    return this.dataSource.update(id, host as any).pipe(map((dto) => this.mapToEntity(dto)));
  }

  delete(id: string): Observable<void> {
    return this.dataSource.delete(id);
  }

  private mapToEntity(dto: any): Host {
    return {
      id: dto.id,
      name: dto.name,
      ipAddress: dto.ipAddress,
      port: dto.port,
      type: dto.type,
      status: dto.status,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    };
  }
}
