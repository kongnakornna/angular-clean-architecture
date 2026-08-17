import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthRepository } from '../repositories/auth.repository';
import { AUTH_REPOSITORY } from '../../../../core/di/tokens';
import { Role, AssignRolePermissionsRequest } from '../entities/role.entity';

@Injectable()
export class AssignRolePermissionsUseCase {
  private authRepository = inject<IAuthRepository>(AUTH_REPOSITORY);

  execute(id: number, request: AssignRolePermissionsRequest): Observable<Role> {
    return this.authRepository.assignRolePermissions(id, request);
  }
}
