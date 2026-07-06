import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const requiredPermission = route.data['permission'] as string;
    if (!requiredPermission) {
      return of(true);
    }
    return this.checkPermission(requiredPermission).pipe(
      map((hasPermission) => {
        if (hasPermission) return true;
        return this.router.parseUrl('/dashboard');
      }),
      catchError(() => of(this.router.parseUrl('/dashboard')))
    );
  }

  private checkPermission(permission: string): Observable<boolean> {
    // TODO: implement actual permission check via AuthRepository
    return of(true);
  }
}
