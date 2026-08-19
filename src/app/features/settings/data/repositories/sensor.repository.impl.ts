import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ISensorRepository } from '../../domain/repositories/sensor.repository';
import { Sensor } from '../../domain/entities/sensor.entity';
import { SensorApiDataSource } from '../datasources/sensor.api.datasource';

@Injectable({ providedIn: 'root' })
export class SensorRepositoryImpl implements ISensorRepository {
  constructor(private dataSource: SensorApiDataSource) {}

  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: Sensor[]; total: number }> {
    return this.dataSource.list(params).pipe(
      map((res) => ({ data: res.data.map((dto) => this.mapToEntity(dto)), total: res.total }))
    );
  }

  getById(id: string): Observable<Sensor> {
    return this.dataSource.getById(id).pipe(map((dto) => this.mapToEntity(dto)));
  }

  create(sensor: Partial<Sensor>): Observable<Sensor> {
    return this.dataSource.create(sensor).pipe(map((dto) => this.mapToEntity(dto)));
  }

  update(id: string, sensor: Partial<Sensor>): Observable<Sensor> {
    return this.dataSource.update(id, sensor).pipe(map((dto) => this.mapToEntity(dto)));
  }

  delete(id: string): Observable<void> {
    return this.dataSource.delete(id);
  }

  private mapToEntity(dto: any): Sensor {
    return {
      id: dto.id,
      name: dto.name,
      type: dto.type,
      unit: dto.unit,
      minThreshold: dto.minThreshold,
      maxThreshold: dto.maxThreshold,
      status: dto.status,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    };
  }
}
