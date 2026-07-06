import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthRepository } from '../repositories/auth.repository';

@Injectable({ providedIn: 'root' })
export class CheckPermissionUseCase {
  constructor(private authRepo: IAuthRepository) {}

  execute(permission: string): Observable<boolean> {
    return this.authRepo.hasPermission(permission);
  }
}
