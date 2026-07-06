import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmailRepository } from '../repositories/email.repository';
import { EMAIL_REPOSITORY } from '../../../../core/di/tokens';
import { EmailLog } from '../entities/email-template.entity';

@Injectable({ providedIn: 'root' })
export class GetEmailLogsUseCase {
  constructor(@Inject(EMAIL_REPOSITORY) private repo: IEmailRepository) {}

  execute(params?: { page?: number; pageSize?: number }): Observable<{ data: EmailLog[]; total: number }> {
    return this.repo.getLogs(params);
  }
}
