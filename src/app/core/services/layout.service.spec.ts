import { TestBed } from '@angular/core/testing';
import { LayoutService } from './layout.service';

describe('LayoutService', () => {
  let service: LayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default values', () => {
    expect(service.theme()).toBe('blue');
    expect(service.fontFamily()).toBe('sans-serif');
    expect(service.themeBase()).toBe('slate');
    expect(service.borderRadius()).toBe('1');
    expect(service.rtlMode()).toBe('false');
  });

  it('should update property', () => {
    service.update('theme', 'green');
    expect(service.theme()).toBe('green');
  });

  it('should reset to defaults', () => {
    service.update('theme', 'green');
    service.reset();
    expect(service.theme()).toBe('blue');
  });
});
