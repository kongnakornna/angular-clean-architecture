import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IApiSettingRepository } from '../../domain/repositories/api-setting.repository';
import { ApiSetting } from '../../domain/entities/api-setting.entity';
import { ApiSettingApiDataSource } from '../datasources/api-setting.api.datasource';

@Injectable({ providedIn: 'root' })
export class ApiSettingRepositoryImpl implements IApiSettingRepository {
  constructor(private dataSource: ApiSettingApiDataSource) {}

  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: ApiSetting[]; total: number }> {
    return this.dataSource.list(params).pipe(
      map((res) => ({ data: res.data.map((dto) => this.mapToEntity(dto)), total: res.total }))
    );
  }

  getById(id: string): Observable<ApiSetting> {
    return this.dataSource.getById(id).pipe(map((dto) => this.mapToEntity(dto)));
  }

  create(apiSetting: Partial<ApiSetting>): Observable<ApiSetting> {
    return this.dataSource.create(apiSetting as any).pipe(map((dto) => this.mapToEntity(dto)));
  }

  update(id: string, apiSetting: Partial<ApiSetting>): Observable<ApiSetting> {
    return this.dataSource.update(id, apiSetting as any).pipe(map((dto) => this.mapToEntity(dto)));
  }

  delete(id: string): Observable<void> {
    return this.dataSource.delete(id);
  }

  private mapToEntity(dto: any): ApiSetting {
    return {
      id: dto.id,
      name: dto.name,
      endpoint: dto.endpoint,
      method: dto.method,
      headers: dto.headers,
      status: dto.status,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    };
  }
}
