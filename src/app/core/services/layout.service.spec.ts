import { TestBed } from '@angular/core/testing';
import { LayoutService } from './layout.service';

describe('LayoutService', () => {
  let service: LayoutService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default values', () => {
    expect(service.theme()).toBe('light');
    expect(service.themeFont()).toBe('sans-serif');
    expect(service.themeBase()).toBe('gray');
    expect(service.themeRadius()).toBe('1');
    expect(service.themePrimary()).toBe('blue');
  });

  it('should update property', () => {
    service.update('theme', 'dark');
    expect(service.theme()).toBe('dark');
  });

  it('should reset to defaults', () => {
    service.update('theme', 'dark');
    service.reset();
    expect(service.theme()).toBe('light');
  });
});
