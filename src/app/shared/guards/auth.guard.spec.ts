import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard],
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should allow activation when token exists', () => {
    localStorage.setItem('access_token', 'test-token');
    expect(guard.canActivate()).toBeTrue();
    localStorage.removeItem('access_token');
  });

  it('should redirect to login when no token', () => {
    localStorage.removeItem('access_token');
    const result = guard.canActivate();
    expect(result.toString()).toContain('/login');
  });
});
