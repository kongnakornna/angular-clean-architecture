import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthRepository } from '../repositories/auth.repository';
import { ChangePasswordPayload } from '../entities/user.entity';
import { AUTH_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class ChangeMyPasswordUseCase {
  constructor(@Inject(AUTH_REPOSITORY) private authRepo: IAuthRepository) {}

  execute(data: ChangePasswordPayload): Observable<void> {
    return this.authRepo.changeMyPassword(data);
  }
}
