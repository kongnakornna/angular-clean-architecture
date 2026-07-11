import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthRepository } from '../repositories/auth.repository';
import { User, UserUpdatePayload } from '../entities/user.entity';
import { AUTH_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class UpdateUserUseCase {
  constructor(@Inject(AUTH_REPOSITORY) private authRepo: IAuthRepository) {}

  execute(id: string, data: Partial<UserUpdatePayload>): Observable<User> {
    return this.authRepo.updateUser(id, data);
  }
}
