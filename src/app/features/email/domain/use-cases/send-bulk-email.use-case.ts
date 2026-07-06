import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmailRepository } from '../repositories/email.repository';
import { EMAIL_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class SendBulkEmailUseCase {
  constructor(@Inject(EMAIL_REPOSITORY) private repo: IEmailRepository) {}

  execute(recipients: string[], subject: string, body: string): Observable<void> {
    return this.repo.sendBulk(recipients, subject, body);
  }
}
