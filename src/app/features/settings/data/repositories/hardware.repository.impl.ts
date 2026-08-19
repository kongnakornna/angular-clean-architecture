import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IHardwareRepository } from '../../domain/repositories/hardware.repository';
import { Hardware } from '../../domain/entities/hardware.entity';
import { HardwareApiDataSource } from '../datasources/hardware.api.datasource';

@Injectable({ providedIn: 'root' })
export class HardwareRepositoryImpl implements IHardwareRepository {
  constructor(private dataSource: HardwareApiDataSource) {}

  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: Hardware[]; total: number }> {
    return this.dataSource.list(params).pipe(
      map((res) => ({ data: res.data.map((dto) => this.mapToEntity(dto)), total: res.total }))
    );
  }

  getById(id: string): Observable<Hardware> {
    return this.dataSource.getById(id).pipe(map((dto) => this.mapToEntity(dto)));
  }

  create(hardware: Partial<Hardware>): Observable<Hardware> {
    return this.dataSource.create(hardware).pipe(map((dto) => this.mapToEntity(dto)));
  }

  update(id: string, hardware: Partial<Hardware>): Observable<Hardware> {
    return this.dataSource.update(id, hardware).pipe(map((dto) => this.mapToEntity(dto)));
  }

  delete(id: string): Observable<void> {
    return this.dataSource.delete(id);
  }

  private mapToEntity(dto: any): Hardware {
    return {
      id: dto.id,
      title: dto.title,
      typeName: dto.typeName,
      description: dto.description,
      price: dto.price,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    };
  }
}
