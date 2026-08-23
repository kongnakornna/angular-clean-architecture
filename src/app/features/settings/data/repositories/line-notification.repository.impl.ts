import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ILineNotificationRepository } from '../../domain/repositories/line-notification.repository';
import { LineNotification } from '../../domain/entities/line-notification.entity';
import { LineNotificationApiDataSource } from '../datasources/line-notification.api.datasource';

@Injectable({ providedIn: 'root' })
export class LineNotificationRepositoryImpl implements ILineNotificationRepository {
  constructor(private dataSource: LineNotificationApiDataSource) {}

  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: LineNotification[]; total: number }> {
    return this.dataSource.list(params).pipe(
      map((res) => ({ data: res.data.map((dto) => this.mapToEntity(dto)), total: res.total }))
    );
  }

  getById(id: string): Observable<LineNotification> {
    return this.dataSource.getById(id).pipe(map((dto) => this.mapToEntity(dto)));
  }

  create(notification: Partial<LineNotification>): Observable<LineNotification> {
    return this.dataSource.create(notification as any).pipe(map((dto) => this.mapToEntity(dto)));
  }

  update(id: string, notification: Partial<LineNotification>): Observable<LineNotification> {
    return this.dataSource.update(id, notification as any).pipe(map((dto) => this.mapToEntity(dto)));
  }

  delete(id: string): Observable<void> {
    return this.dataSource.delete(id);
  }

  private mapToEntity(dto: any): LineNotification {
    return {
      id: dto.id,
      name: dto.name,
      channelAccessToken: dto.channelAccessToken,
      userId: dto.userId,
      status: dto.status,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    };
  }
}
