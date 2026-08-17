import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthRepository } from '../repositories/auth.repository';
import { AUTH_REPOSITORY } from '../../../../core/di/tokens';
import { Role } from '../entities/role.entity';

@Injectable()
export class GetRoleUseCase {
  private authRepository = inject<IAuthRepository>(AUTH_REPOSITORY);

  execute(id: number): Observable<Role> {
    return this.authRepository.getRole(id);
  }
}
