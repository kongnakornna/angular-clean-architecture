import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContextProviderService } from './context-provider.service';

describe('ContextProviderService', () => {
  let service: ContextProviderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContextProviderService]
    });
    service = TestBed.inject(ContextProviderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('detectContextTypes', () => {
    it('should detect dashboard keywords', () => {
      const types = service.detectContextTypes('show me the dashboard KPIs');
      expect(types).toContain('dashboard');
    });

    it('should detect job keywords', () => {
      const types = service.detectContextTypes('what jobs are pending?');
      expect(types).toContain('jobs');
    });

    it('should detect customer keywords', () => {
      const types = service.detectContextTypes('list all customers');
      expect(types).toContain('customers');
    });

    it('should detect iot keywords', () => {
      const types = service.detectContextTypes('show device sensor data');
      expect(types).toContain('iot');
    });

    it('should detect analytics keywords', () => {
      const types = service.detectContextTypes('generate analytics report');
      expect(types).toContain('analytics');
    });

    it('should detect multiple context types', () => {
      const types = service.detectContextTypes('show job status and customer data');
      expect(types).toContain('jobs');
      expect(types).toContain('customers');
    });

    it('should return empty array for unrelated messages', () => {
      const types = service.detectContextTypes('hello how are you');
      expect(types).toEqual([]);
    });
  });

  describe('getContext', () => {
    it('should return empty string for empty contextTypes', (done) => {
      service.getContext([]).subscribe(result => {
        expect(result).toBe('');
        done();
      });
    });
  });
});
