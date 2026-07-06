import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { APP_CONSTANTS } from '../../core/constants/app.constants';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem(APP_CONSTANTS.TOKEN_KEY);
    if (token) {
      return true;
    }
    return this.router.parseUrl('/login');
  }
}
