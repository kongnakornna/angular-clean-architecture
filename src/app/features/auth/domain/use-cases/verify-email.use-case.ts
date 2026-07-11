import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthRepository, VerifyEmailCredentials } from '../repositories/auth.repository';
import { AUTH_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class VerifyEmailUseCase {
  constructor(@Inject(AUTH_REPOSITORY) private authRepo: IAuthRepository) {}

  execute(credentials: VerifyEmailCredentials): Observable<string> {
    return this.authRepo.verifyEmail(credentials);
  }
}
