import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthRepository, ChangeMyPasswordCredentials } from '../repositories/auth.repository';

@Injectable({ providedIn: 'root' })
export class ChangeMyPasswordUseCase {
  constructor(@Inject('AUTH_REPOSITORY') private authRepo: IAuthRepository) {}

  execute(credentials: ChangeMyPasswordCredentials): Observable<void> {
    return this.authRepo.changeMyPassword(credentials);
  }
}
