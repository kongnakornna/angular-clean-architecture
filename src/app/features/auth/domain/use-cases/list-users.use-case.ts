import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthRepository } from '../repositories/auth.repository';
import { User } from '../entities/user.entity';
import { AUTH_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class ListUsersUseCase {
  constructor(@Inject(AUTH_REPOSITORY) private authRepo: IAuthRepository) {}

  execute(params?: { limit?: number; offset?: number; email?: string; username?: string; status?: string; roleId?: number }): Observable<User[]> {
    return this.authRepo.listUsers(params);
  }
}
