import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthRepository, RegisterCredentials } from '../repositories/auth.repository';
import { User } from '../entities/user.entity';
import { AUTH_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class CreateUserUseCase {
  constructor(@Inject(AUTH_REPOSITORY) private authRepo: IAuthRepository) {}

  execute(data: RegisterCredentials): Observable<User> {
    return this.authRepo.createUser(data);
  }
}
