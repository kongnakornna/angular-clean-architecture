import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { of } from 'rxjs';
import { PermissionGuard } from './permission.guard';
import { PermissionService } from '../../core/services/permission.service';

describe('PermissionGuard', () => {
  let guard: PermissionGuard;
  let mockPermissionService: jasmine.SpyObj<PermissionService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockPermissionService = jasmine.createSpyObj('PermissionService', ['hasPermission']);
    mockRouter = jasmine.createSpyObj('Router', ['parseUrl']);

    TestBed.configureTestingModule({
      providers: [
        PermissionGuard,
        { provide: PermissionService, useValue: mockPermissionService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    guard = TestBed.inject(PermissionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when user has required permission', (done) => {
    const route = { data: { permission: 'customer.view' } } as unknown as ActivatedRouteSnapshot;
    mockPermissionService.hasPermission.and.returnValue(of(true));

    guard.canActivate(route).subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
  });

  it('should deny access when user lacks permission', (done) => {
    const route = { data: { permission: 'customer.view' } } as unknown as ActivatedRouteSnapshot;
    mockPermissionService.hasPermission.and.returnValue(of(false));
    mockRouter.parseUrl.and.returnValue({} as UrlTree);

    guard.canActivate(route).subscribe((result) => {
      expect(result).toEqual({} as UrlTree);
      expect(mockRouter.parseUrl).toHaveBeenCalledWith('/dashboard');
      done();
    });
  });

  it('should allow access for superuser regardless of permission', (done) => {
    const route = { data: { permission: 'customer.view' } } as unknown as ActivatedRouteSnapshot;
    mockPermissionService.hasPermission.and.returnValue(of(true));

    guard.canActivate(route).subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
  });

  it('should redirect to /dashboard when denied', (done) => {
    const route = { data: { permission: 'customer.view' } } as unknown as ActivatedRouteSnapshot;
    mockPermissionService.hasPermission.and.returnValue(of(false));
    mockRouter.parseUrl.and.returnValue({} as UrlTree);

    guard.canActivate(route).subscribe((result) => {
      expect(mockRouter.parseUrl).toHaveBeenCalledWith('/dashboard');
      done();
    });
  });

  it('should allow access when no permission required in route data', (done) => {
    const route = { data: {} } as unknown as ActivatedRouteSnapshot;

    guard.canActivate(route).subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
  });
});
