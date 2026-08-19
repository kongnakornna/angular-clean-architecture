import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILineNotificationRepository } from '../repositories/line-notification.repository';
import { LINE_NOTIFICATION_REPOSITORY } from '../../../../core/di/tokens';
import { LineNotification } from '../entities/line-notification.entity';

@Injectable({ providedIn: 'root' })
export class CreateLineNotificationUseCase {
  constructor(@Inject(LINE_NOTIFICATION_REPOSITORY) private repo: ILineNotificationRepository) {}

  execute(notification: Partial<LineNotification>): Observable<LineNotification> {
    return this.repo.create(notification);
  }
}
