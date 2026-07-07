import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthRepository, RegisterCredentials } from '../repositories/auth.repository';
import { AUTH_REPOSITORY } from '../../../../core/di/tokens';

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
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
