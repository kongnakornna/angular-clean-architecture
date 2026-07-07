import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthRepository } from '../repositories/auth.repository';
import { AUTH_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class ForgotPasswordUseCase {
  constructor(@Inject(AUTH_REPOSITORY) private authRepo: IAuthRepository) {}

  execute(email: string): Observable<void> {
    return this.authRepo.forgotPassword(email);
  }
}
