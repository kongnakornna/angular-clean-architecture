import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IScheduleRepository } from '../../domain/repositories/schedule.repository';
import { Schedule } from '../../domain/entities/schedule.entity';
import { ScheduleApiDataSource } from '../datasources/schedule.api.datasource';

@Injectable({ providedIn: 'root' })
export class ScheduleRepositoryImpl implements IScheduleRepository {
  constructor(private dataSource: ScheduleApiDataSource) {}

  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: Schedule[]; total: number }> {
    return this.dataSource.list(params).pipe(
      map((res) => ({ data: res.data.map((dto) => this.mapToEntity(dto)), total: res.total }))
    );
  }

  getById(id: string): Observable<Schedule> {
    return this.dataSource.getById(id).pipe(map((dto) => this.mapToEntity(dto)));
  }

  create(schedule: Partial<Schedule>): Observable<Schedule> {
    return this.dataSource.create(schedule).pipe(map((dto) => this.mapToEntity(dto)));
  }

  update(id: string, schedule: Partial<Schedule>): Observable<Schedule> {
    return this.dataSource.update(id, schedule).pipe(map((dto) => this.mapToEntity(dto)));
  }

  delete(id: string): Observable<void> {
    return this.dataSource.delete(id);
  }

  private mapToEntity(dto: any): Schedule {
    return {
      id: dto.id,
      name: dto.name,
      startTime: dto.startTime,
      event: dto.event,
      sunday: dto.sunday,
      monday: dto.monday,
      tuesday: dto.tuesday,
      wednesday: dto.wednesday,
      thursday: dto.thursday,
      friday: dto.friday,
      saturday: dto.saturday,
      status: dto.status,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    };
  }
}
