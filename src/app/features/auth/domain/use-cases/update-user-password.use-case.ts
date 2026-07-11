import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthRepository } from '../repositories/auth.repository';
import { AUTH_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class UpdateUserPasswordUseCase {
  constructor(@Inject(AUTH_REPOSITORY) private authRepo: IAuthRepository) {}

  execute(id: string, oldPassword: string, newPassword: string, confirmPassword: string): Observable<void> {
    return this.authRepo.updateUserPassword(id, oldPassword, newPassword, confirmPassword);
  }
}
