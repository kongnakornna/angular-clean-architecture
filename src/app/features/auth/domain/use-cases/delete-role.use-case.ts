import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthRepository } from '../repositories/auth.repository';
import { AUTH_REPOSITORY } from '../../../../core/di/tokens';

@Injectable()
export class DeleteRoleUseCase {
  private authRepository = inject<IAuthRepository>(AUTH_REPOSITORY);

  execute(id: number): Observable<void> {
    return this.authRepository.deleteRole(id);
  }
}
