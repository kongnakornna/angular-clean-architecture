import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IAuthRepository } from '../../features/auth/domain/repositories/auth.repository';
import { AUTH_REPOSITORY } from '../di/tokens';
import { User } from '../../features/auth/domain/entities/user.entity';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  private authRepository = inject<IAuthRepository>(AUTH_REPOSITORY);
  private permissions$ = new BehaviorSubject<string[]>([]);
  private loaded = false;

  loadPermissions(user: User): Observable<string[]> {
    if (this.loaded) {
      return this.permissions$.asObservable();
    }

    return this.authRepository.getPermissions().pipe(
      tap((permissions) => {
        this.permissions$.next(permissions);
        this.loaded = true;
      }),
      catchError(() => {
        // Fallback 1: ใช้ User.permissions
        if (user.permissions && user.permissions.length > 0) {
          const permissionNames = user.permissions.map((p) => p.name);
          this.permissions$.next(permissionNames);
        } else {
          // Fallback 2: empty array
          this.permissions$.next([]);
        }
        this.loaded = true;
        return this.permissions$.asObservable();
      })
    );
  }

  hasPermission(permission: string): Observable<boolean> {
    // isSuperuser bypass
    const user = this.getCurrentUser();
    if (user?.isSuperuser) {
      return of(true);
    }

    return this.permissions$.pipe(
      map((permissions) => permissions.includes(permission))
    );
  }

  hasAnyPermission(permissions: string[]): Observable<boolean> {
    const user = this.getCurrentUser();
    if (user?.isSuperuser) {
      return of(true);
    }

    return this.permissions$.pipe(
      map((userPermissions) => permissions.some((p) => userPermissions.includes(p)))
    );
  }

  filterByPermission<T>(items: T[], getPerm: (item: T) => string): Observable<T[]> {
    const user = this.getCurrentUser();
    if (user?.isSuperuser) {
      return of(items);
    }

    return this.permissions$.pipe(
      map((permissions) => items.filter((item) => permissions.includes(getPerm(item))))
    );
  }

  refreshPermissions(): Observable<string[]> {
    this.loaded = false;
    const user = this.getCurrentUser();
    if (!user) {
      return of([]);
    }
    return this.loadPermissions(user);
  }

  private getCurrentUser(): User | null {
    const userStr = localStorage.getItem('current_user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
}
