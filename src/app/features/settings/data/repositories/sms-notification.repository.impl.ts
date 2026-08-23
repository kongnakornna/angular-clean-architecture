import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ISmsNotificationRepository } from '../../domain/repositories/sms-notification.repository';
import { SmsNotification } from '../../domain/entities/sms-notification.entity';
import { SmsNotificationApiDataSource } from '../datasources/sms-notification.api.datasource';

@Injectable({ providedIn: 'root' })
export class SmsNotificationRepositoryImpl implements ISmsNotificationRepository {
  constructor(private dataSource: SmsNotificationApiDataSource) {}

  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: SmsNotification[]; total: number }> {
    return this.dataSource.list(params).pipe(
      map((res) => ({ data: res.data.map((dto) => this.mapToEntity(dto)), total: res.total }))
    );
  }

  getById(id: string): Observable<SmsNotification> {
    return this.dataSource.getById(id).pipe(map((dto) => this.mapToEntity(dto)));
  }

  create(notification: Partial<SmsNotification>): Observable<SmsNotification> {
    return this.dataSource.create(notification as any).pipe(map((dto) => this.mapToEntity(dto)));
  }

  update(id: string, notification: Partial<SmsNotification>): Observable<SmsNotification> {
    return this.dataSource.update(id, notification as any).pipe(map((dto) => this.mapToEntity(dto)));
  }

  delete(id: string): Observable<void> {
    return this.dataSource.delete(id);
  }

  private mapToEntity(dto: any): SmsNotification {
    return {
      id: dto.id,
      name: dto.name,
      gatewayUrl: dto.gatewayUrl,
      apiKey: dto.apiKey,
      phone: dto.phone,
      status: dto.status,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    };
  }
}
