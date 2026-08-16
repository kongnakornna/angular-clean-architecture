import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IAuthRepository } from '../repositories/auth.repository';
import { SignInCredentials, AuthResponse } from '../entities/user.entity';
import { APP_CONSTANTS } from '../../../../core/constants/app.constants';
import { AUTH_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class SignInUseCase {
  constructor(@Inject(AUTH_REPOSITORY) private authRepo: IAuthRepository) {}

  execute(credentials: SignInCredentials): Observable<AuthResponse> {
    return this.authRepo.signIn(credentials).pipe(
      tap((response) => {
        localStorage.setItem(APP_CONSTANTS.TOKEN_KEY, response.accessToken);
        localStorage.setItem(APP_CONSTANTS.REFRESH_TOKEN_KEY, response.refreshToken);
        localStorage.setItem(APP_CONSTANTS.USER_KEY, JSON.stringify(response.user));
      })
    );
  }
}
