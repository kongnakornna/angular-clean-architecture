import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ILocationRepository } from '../../domain/repositories/location.repository';
import { Location } from '../../domain/entities/location.entity';
import { LocationApiDataSource } from '../datasources/location.api.datasource';

@Injectable({ providedIn: 'root' })
export class LocationRepositoryImpl implements ILocationRepository {
  constructor(private dataSource: LocationApiDataSource) {}

  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: Location[]; total: number }> {
    return this.dataSource.list(params).pipe(
      map((res) => ({ data: res.data.map((dto) => this.mapToEntity(dto)), total: res.total }))
    );
  }

  getById(id: string): Observable<Location> {
    return this.dataSource.getById(id).pipe(map((dto) => this.mapToEntity(dto)));
  }

  create(location: Partial<Location>): Observable<Location> {
    return this.dataSource.create(location as any).pipe(map((dto) => this.mapToEntity(dto)));
  }

  update(id: string, location: Partial<Location>): Observable<Location> {
    return this.dataSource.update(id, location as any).pipe(map((dto) => this.mapToEntity(dto)));
  }

  delete(id: string): Observable<void> {
    return this.dataSource.delete(id);
  }

  private mapToEntity(dto: any): Location {
    return {
      id: dto.id,
      name: dto.name,
      typeName: dto.typeName,
      emailId: dto.emailId,
      bucket: dto.bucket,
      org: dto.org,
      deviceCount: dto.deviceCount,
      status: dto.status,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    };
  }
}
