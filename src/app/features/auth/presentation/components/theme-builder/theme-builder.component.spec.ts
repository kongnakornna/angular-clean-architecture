import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { ThemeBuilderComponent } from './theme-builder.component';
import { LayoutService } from '../../../../../core/services/layout.service';

describe('ThemeBuilderComponent', () => {
  let component: ThemeBuilderComponent;
  let fixture: ComponentFixture<ThemeBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeBuilderComponent],
      providers: [
        {
          provide: LayoutService,
          useValue: {
            theme: signal('light'),
            themePrimary: signal('blue'),
            themeFont: signal('sans-serif'),
            themeBase: signal('slate'),
            themeRadius: signal('1'),
            update: jasmine.createSpy('update'),
            reset: jasmine.createSpy('reset'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call update on layout service', () => {
    const layoutService = TestBed.inject(LayoutService);
    component.update('theme', 'dark');
    expect(layoutService.update).toHaveBeenCalledWith('theme', 'dark');
  });

  it('should call reset on layout service', () => {
    const layoutService = TestBed.inject(LayoutService);
    component.reset();
    expect(layoutService.reset).toHaveBeenCalled();
  });
});