import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthRepository } from '../repositories/auth.repository';
import { AUTH_REPOSITORY } from '../../../../core/di/tokens';
import { Role, CreateRoleRequest } from '../entities/role.entity';

@Injectable()
export class CreateRoleUseCase {
  private authRepository = inject<IAuthRepository>(AUTH_REPOSITORY);

  execute(request: CreateRoleRequest): Observable<Role> {
    return this.authRepository.createRole(request);
  }
}
