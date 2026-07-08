import { TestBed } from '@angular/core/testing';
import { Toast, ToastService, ToastType } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ToastService] });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit toast on show()', (done) => {
    service.listen$.subscribe((toast) => {
      if (toast.isOpen) {
        expect(toast.title).toBe('Test Title');
        expect(toast.type).toBe(ToastType.success);
        done();
      }
    });
    service.show({ title: 'Test Title', type: ToastType.success });
  });

  it('should close toast', (done) => {
    const toasts: Toast[] = [];
    service.listen$.subscribe((t) => {
      toasts.push(t);
      if (toasts.length === 3) {
        expect(toasts[2].isOpen).toBeFalse();
        done();
      }
    });
    service.show({ title: 'Test' });
    service.close();
  });
});
