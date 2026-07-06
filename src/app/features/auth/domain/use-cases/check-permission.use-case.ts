import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthRepository } from '../repositories/auth.repository';
import { AUTH_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class CheckPermissionUseCase {
  constructor(@Inject(AUTH_REPOSITORY) private authRepo: IAuthRepository) {}

  execute(permission: string): Observable<boolean> {
    return this.authRepo.hasPermission(permission);
  }
}
