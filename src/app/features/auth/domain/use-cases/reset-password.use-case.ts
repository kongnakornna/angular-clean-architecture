import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthRepository } from '../repositories/auth.repository';
import { AUTH_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class ResetPasswordUseCase {
  constructor(@Inject(AUTH_REPOSITORY) private authRepo: IAuthRepository) {}

  execute(token: string, password: string): Observable<void> {
    return this.authRepo.resetPassword(token, password);
  }
}
