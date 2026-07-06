import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IAuthRepository } from '../repositories/auth.repository';
import { APP_CONSTANTS } from '../../../../core/constants/app.constants';

@Injectable({ providedIn: 'root' })
export class LogoutUseCase {
  constructor(private authRepo: IAuthRepository) {}

  execute(): Observable<void> {
    return this.authRepo.logout().pipe(
      tap(() => {
        localStorage.removeItem(APP_CONSTANTS.TOKEN_KEY);
        localStorage.removeItem(APP_CONSTANTS.REFRESH_TOKEN_KEY);
        localStorage.removeItem(APP_CONSTANTS.USER_KEY);
      })
    );
  }
}
