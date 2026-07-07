import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthRepository } from '../repositories/auth.repository';
import { AUTH_REPOSITORY } from '../../../../core/di/tokens';

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class SignUpUseCase {
  constructor(@Inject(AUTH_REPOSITORY) private authRepo: IAuthRepository) {}

  execute(credentials: SignUpCredentials): Observable<void> {
    if (!this.authRepo.register) {
      return new Observable<void>(observer => {
        observer.complete();
      });
    }
    return this.authRepo.register(credentials);
  }
}
