import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ErrorInterceptor } from './error.interceptor';

describe('ErrorInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should pass through successful requests', () => {
    httpClient.get('/api/test').subscribe((res) => {
      expect(res).toEqual({ data: 'ok' });
    });
    const req = httpMock.expectOne('/api/test');
    req.flush({ data: 'ok' });
  });

  it('should handle 401 error with legacy message body', () => {
    httpClient.get('/api/test').subscribe({
      error: (err) => {
        expect(err.status).toBe(401);
        expect(err.message).toBe('Unauthorized');
      },
    });
    const req = httpMock.expectOne('/api/test');
    req.flush({ message: 'Unauthorized' }, { status: 401, statusText: 'Unauthorized' });
  });

  it('should extract msg from backend envelope on HTTP 401', () => {
    const envelope = {
      data: null,
      error: { status: 401, statusText: 'wrong_password', msg: 'invalid credentials' },
      is_success: false,
    };
    httpClient.post('/api/auth/login', {}).subscribe({
      error: (err) => {
        expect(err.status).toBe(401);
        expect(err.message).toBe('invalid credentials');
      },
    });
    const req = httpMock.expectOne('/api/auth/login');
    req.flush(envelope, { status: 401, statusText: 'Unauthorized' });
  });

  it('should extract flat msg from error body', () => {
    httpClient.get('/api/test').subscribe({
      error: (err) => {
        expect(err.status).toBe(401);
        expect(err.message).toBe('invalid credentials');
      },
    });
    const req = httpMock.expectOne('/api/test');
    req.flush(
      { status: 401, statusText: 'wrong_password', msg: 'invalid credentials' },
      { status: 401, statusText: 'Unauthorized' }
    );
  });
});
