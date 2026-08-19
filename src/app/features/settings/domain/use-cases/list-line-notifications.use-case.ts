import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILineNotificationRepository } from '../repositories/line-notification.repository';
import { LINE_NOTIFICATION_REPOSITORY } from '../../../../core/di/tokens';
import { LineNotification } from '../entities/line-notification.entity';

@Injectable({ providedIn: 'root' })
export class ListLineNotificationsUseCase {
  constructor(@Inject(LINE_NOTIFICATION_REPOSITORY) private repo: ILineNotificationRepository) {}

  execute(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: LineNotification[]; total: number }> {
    return this.repo.list(params);
  }
}
