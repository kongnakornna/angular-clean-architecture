import { Observable } from 'rxjs';
import { SmsNotification } from '../entities/sms-notification.entity';

export interface ISmsNotificationRepository {
  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: SmsNotification[]; total: number }>;
  getById(id: string): Observable<SmsNotification>;
  create(notification: Partial<SmsNotification>): Observable<SmsNotification>;
  update(id: string, notification: Partial<SmsNotification>): Observable<SmsNotification>;
  delete(id: string): Observable<void>;
}
