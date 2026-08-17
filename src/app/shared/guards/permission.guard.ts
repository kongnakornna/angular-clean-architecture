import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PermissionService } from '../../core/services/permission.service';
import { ROUTE_PERMISSIONS } from '../../core/config/route-permission.config';

@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {
  private permissionService = inject(PermissionService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const requiredPermission = route.data['permission'] as string || ROUTE_PERMISSIONS[route.routeConfig?.path || ''];

    if (!requiredPermission) {
      return new BehaviorSubject(true).asObservable();
    }

    return this.permissionService.hasPermission(requiredPermission).pipe(
      take(1),
      map((hasPermission) => {
        if (hasPermission) {
          return true;
        }
        return this.router.parseUrl('/dashboard');
      })
    );
  }
}
