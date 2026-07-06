import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmailRepository } from '../repositories/email.repository';
import { EMAIL_REPOSITORY } from '../../../../core/di/tokens';
import { EmailTemplate } from '../entities/email-template.entity';

@Injectable({ providedIn: 'root' })
export class CreateEmailTemplateUseCase {
  constructor(@Inject(EMAIL_REPOSITORY) private repo: IEmailRepository) {}

  execute(template: Partial<EmailTemplate>): Observable<EmailTemplate> {
    return this.repo.createTemplate(template);
  }
}
