import { Observable } from 'rxjs';
import { LineNotification } from '../entities/line-notification.entity';

export interface ILineNotificationRepository {
  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: LineNotification[]; total: number }>;
  getById(id: string): Observable<LineNotification>;
  create(notification: Partial<LineNotification>): Observable<LineNotification>;
  update(id: string, notification: Partial<LineNotification>): Observable<LineNotification>;
  delete(id: string): Observable<void>;
}
