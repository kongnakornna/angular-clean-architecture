import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISmsNotificationRepository } from '../repositories/sms-notification.repository';
import { SMS_NOTIFICATION_REPOSITORY } from '../../../../core/di/tokens';
import { SmsNotification } from '../entities/sms-notification.entity';

@Injectable({ providedIn: 'root' })
export class ListSmsNotificationsUseCase {
  constructor(@Inject(SMS_NOTIFICATION_REPOSITORY) private repo: ISmsNotificationRepository) {}

  execute(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: SmsNotification[]; total: number }> {
    return this.repo.list(params);
  }
}
