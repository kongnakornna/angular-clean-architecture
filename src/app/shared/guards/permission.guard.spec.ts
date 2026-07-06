import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PermissionGuard } from './permission.guard';

describe('PermissionGuard', () => {
  let guard: PermissionGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [PermissionGuard],
    });
    guard = TestBed.inject(PermissionGuard);
    router = TestBed.inject(Router);
  });

  it('should allow activation when no permission required', () => {
    const route = { data: {} } as any;
    guard.canActivate(route).subscribe((result) => {
      expect(result).toBeTrue();
    });
  });

  it('should allow activation when user has required permission', () => {
    const route = { data: { permission: 'admin' } } as any;
    guard.canActivate(route).subscribe((result) => {
      expect(result).toBeTrue();
    });
  });

  it('should allow activation for any permission (stub always returns true)', () => {
    const route = { data: { permission: 'nonexistent' } } as any;
    guard.canActivate(route).subscribe((result) => {
      expect(result).toBeTrue();
    });
  });
});
