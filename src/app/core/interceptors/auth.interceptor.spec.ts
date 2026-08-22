import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthInterceptor } from './auth.interceptor';
import { APP_CONFIG } from '../config/app.config';

describe('AuthInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: APP_CONFIG, useValue: { apiBaseUrl: '/api', apiEndpoints: [], apiFallback: { enabled: false, healthCheckInterval: 5000 } } },
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.setItem('access_token', 'test-token');
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should add Authorization header for non-refresh requests', () => {
    httpClient.get('/api/test').subscribe();
    const req = httpMock.expectOne('/api/test');
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush({});
  });

  it('should skip Authorization header for refresh requests', () => {
    localStorage.setItem('access_token', 'test-token');
    httpClient.get('/api/auth/refresh').subscribe();
    const req = httpMock.expectOne('/api/auth/refresh');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush({});
  });

  it('should not hijack 401 from login endpoint and propagate error without refresh', () => {
    localStorage.setItem('access_token', 'test-token');
    localStorage.setItem('refresh_token', 'refresh-token');
    let receivedError: any = null;
    httpClient.post('/api/auth/login', {}).subscribe({ error: (err) => (receivedError = err) });

    const req = httpMock.expectOne('/api/auth/login');
    req.flush(
      {
        data: null,
        error: { status: 401, statusText: 'wrong_password', msg: 'invalid credentials' },
        is_success: false,
      },
      { status: 401, statusText: 'Unauthorized' }
    );

    expect(receivedError).toBeTruthy();
    expect(receivedError.status).toBe(401);
    httpMock.expectNone('/api/auth/refresh');
  });

  it('should still attempt refresh on 401 from non-auth endpoints', () => {
    localStorage.setItem('access_token', 'stale-token');
    localStorage.setItem('refresh_token', 'refresh-token');

    httpClient.get('/api/other').subscribe();
    const req = httpMock.expectOne('/api/other');
    req.flush({}, { status: 401, statusText: 'Unauthorized' });

    const refreshReq = httpMock.expectOne('/api/auth/refresh');
    refreshReq.flush({ accessToken: 'new-token' });

    const retryReq = httpMock.expectOne('/api/other');
    expect(retryReq.request.headers.get('Authorization')).toBe('Bearer new-token');
    retryReq.flush({});
  });
});
