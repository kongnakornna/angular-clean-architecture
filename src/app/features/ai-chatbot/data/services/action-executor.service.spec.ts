import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActionExecutorService } from './action-executor.service';

describe('ActionExecutorService', () => {
  let service: ActionExecutorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActionExecutorService]
    });
    service = TestBed.inject(ActionExecutorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('execute', () => {
    it('should return error for unknown action', (done) => {
      service.execute('unknown_action', {}).subscribe(result => {
        expect(result.success).toBeFalse();
        expect(result.content).toContain('Unknown action');
        done();
      });
    });

    it('should call correct endpoint for create_job', (done) => {
      const params = { title: 'Test Job', customerId: '123', description: 'Test', priority: 'high' };
      service.execute('create_job', params).subscribe(result => {
        expect(result.success).toBeTrue();
        done();
      });

      const req = httpMock.expectOne((r) => r.url.endsWith('/jobs'));
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        title: 'Test Job',
        customer_id: '123',
        description: 'Test',
        priority: 'high'
      });
      req.flush({ id: 1 });
    });

    it('should call correct endpoint for send_email', (done) => {
      const params = { to: 'test@example.com', subject: 'Test', body: 'Hello' };
      service.execute('send_email', params).subscribe(result => {
        expect(result.success).toBeTrue();
        done();
      });

      const req = httpMock.expectOne((r) => r.url.endsWith('/email/send'));
      expect(req.request.method).toBe('POST');
      req.flush({ sent: true });
    });

    it('should call correct endpoint for get_dashboard_data', (done) => {
      service.execute('get_dashboard_data', {}).subscribe(result => {
        expect(result.success).toBeTrue();
        done();
      });

      const req = httpMock.expectOne((r) => r.url.endsWith('/dashboard/summary'));
      expect(req.request.method).toBe('GET');
      req.flush({ revenue: 1000 });
    });

    it('should handle HTTP errors gracefully', (done) => {
      const params = { title: 'Test' };
      service.execute('create_job', params).subscribe(result => {
        expect(result.success).toBeFalse();
        expect(result.content).toContain('Action failed');
        done();
      });

      const req = httpMock.expectOne((r) => r.url.endsWith('/jobs'));
      req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });
    });
  });
});
