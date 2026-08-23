import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { TablerIconsModule, provideTablerIcons } from 'angular-tabler-icons';
import {
  IconLayoutDashboard, IconClipboard, IconList, IconLayoutKanban, IconPlus,
  IconUsers, IconDeviceDesktop, IconSettings, IconBell, IconUser, IconLogout,
  IconMenu2, IconMoon, IconSun, IconApps, IconChartBar, IconChartLine, IconChartPie,
  IconAdjustmentsAlt, IconArrowAutofitWidth, IconArrowsMinimize, IconAspectRatio, IconArrowsMaximize,
} from 'angular-tabler-icons/icons';
import { HeaderComponent } from './header.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { LanguageSelectorComponent } from '../../shared/i18n/presentation/pages/language-selector/language-selector.component';
import { LayoutService } from '../../core/services/layout.service';

declare const window: any;

describe('HeaderComponent dropdown close behavior', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let layout: LayoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        RouterTestingModule,
        TablerIconsModule,
        TranslatePipe,
        LanguageSelectorComponent,
      ],
      providers: [
        provideTablerIcons({
          IconLayoutDashboard, IconClipboard, IconList, IconLayoutKanban, IconPlus,
          IconUsers, IconDeviceDesktop, IconSettings, IconBell, IconUser, IconLogout,
          IconMenu2, IconMoon, IconSun, IconApps, IconChartBar, IconChartLine, IconChartPie,
          IconAdjustmentsAlt, IconArrowAutofitWidth, IconArrowsMinimize, IconAspectRatio, IconArrowsMaximize,
        }),
        { provide: TranslateService, useValue: { currentLang: 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    layout = TestBed.inject(LayoutService);
    fixture.detectChanges();
  });

  function profileToggle(): HTMLElement {
    return fixture.nativeElement.querySelector('a[aria-label="Open user menu"]') as HTMLElement;
  }

  function profileMenu(): HTMLElement {
    return profileToggle().nextElementSibling as HTMLElement;
  }

  function click(el: HTMLElement): void {
    el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, composed: true }));
    fixture.detectChanges();
  }

  it('bootstrap global is provided by tabler bundle only (no duplicate bootstrap)', () => {
    const win: any = window;
    expect(win.bootstrap).toBeUndefined();
    expect(win.tabler && win.tabler.bootstrap).toBeDefined();
  });

  it('opens the profile dropdown when the avatar is clicked', () => {
    click(profileToggle());
    expect(profileMenu().classList.contains('show')).toBeTrue();
    expect(profileToggle().getAttribute('aria-expanded')).toBe('true');
  });

  it('closes the profile dropdown when the navbar-toggler is clicked', () => {
    click(profileToggle());
    expect(profileMenu().classList.contains('show')).toBeTrue();

    const toggler = fixture.nativeElement.querySelector('.navbar-toggler') as HTMLElement;
    click(toggler);
    expect(profileMenu().classList.contains('show')).toBeFalse();
    expect(profileToggle().getAttribute('aria-expanded')).toBe('false');
  });

  it('toggles the horizontal menu collapse when the navbar-toggler is clicked', () => {
    const toggler = fixture.nativeElement.querySelector('.navbar-toggler') as HTMLElement;
    const collapse = document.getElementById('navbar-menu') as HTMLElement;
    click(toggler);
    expect(toggler.getAttribute('aria-expanded')).toBe('true');
    collapse.dispatchEvent(new Event('transitionend'));
    click(toggler);
    expect(toggler.getAttribute('aria-expanded')).toBe('false');
  });

  it('renders the profile menu matching the reference (labels, icons, divider)', () => {
    const items = Array.from(profileMenu().querySelectorAll('a.dropdown-item'));
    const dividers = profileMenu().querySelectorAll('.dropdown-divider');

    expect(items.length).toBe(5);
    expect(dividers.length).toBe(1);

    const labels = items.map((a) => a.textContent?.trim());
    expect(labels).toEqual(['Profile', 'Analytics', 'Settings & Privacy', 'Help', 'Sign out']);

    const icons = items.map((a) => a.querySelector('svg'));
    expect(icons[0]).not.toBeNull();
    expect(icons[1]).not.toBeNull();
    expect(icons[2]).toBeNull();
    expect(icons[3]).toBeNull();
    expect(icons[4]).toBeNull();
  });

  function layoutItems(): HTMLElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('a.list-group-item-actions')) as HTMLElement[];
  }

  it('renders the layout menu with 4 options', () => {
    const items = layoutItems();
    expect(items.length).toBe(4);
    expect(items[0].querySelector('svg')).not.toBeNull();
  });

  it('applies boxed layout to the body when Boxed is selected', () => {
    document.body.classList.remove('layout-boxed', 'layout-boxed-2');
    click(layoutItems()[1]);
    expect(document.body.classList.contains('layout-boxed')).toBeTrue();
    expect(document.body.classList.contains('layout-boxed-2')).toBeFalse();
    expect(component.layoutMode).toBe('boxed');
  });

  it('applies boxed-2 layout to the body when Boxed 2 is selected', () => {
    click(layoutItems()[2]);
    expect(document.body.classList.contains('layout-boxed')).toBeTrue();
    expect(document.body.classList.contains('layout-boxed-2')).toBeTrue();
    expect(component.layoutMode).toBe('boxed-2');
  });

  it('removes boxed classes when Fluid is selected', () => {
    click(layoutItems()[1]);
    expect(document.body.classList.contains('layout-boxed')).toBeTrue();
    click(layoutItems()[0]);
    expect(document.body.classList.contains('layout-boxed')).toBeFalse();
    expect(document.body.classList.contains('layout-boxed-2')).toBeFalse();
    expect(component.layoutMode).toBe('fluid');
  });

  it('enters fullscreen when Full Screen is selected', () => {
    const el = document.documentElement as any;
    const enterSpy = jasmine.createSpy('requestFullscreen');
    const exitSpy = jasmine.createSpy('exitFullscreen');
    Object.defineProperty(el, 'requestFullscreen', { value: enterSpy, configurable: true });
    Object.defineProperty(document, 'exitFullscreen', { value: exitSpy, configurable: true });

    Object.defineProperty(document, 'fullscreenElement', { value: null, configurable: true });
    click(layoutItems()[3]);
    expect(enterSpy).toHaveBeenCalled();

    Object.defineProperty(document, 'fullscreenElement', { value: el, configurable: true });
    click(layoutItems()[3]);
    expect(exitSpy).toHaveBeenCalled();
  });

  it('should not have data-bs-theme attribute on header element', () => {
    const header = fixture.nativeElement.querySelector('header');
    expect(header.hasAttribute('data-bs-theme')).toBeFalse();
  });

  it('should toggle theme via LayoutService', () => {
    layout.update('theme', 'light');
    expect(component.isDarkMode).toBeFalse();

    component.toggleTheme();
    expect(component.isDarkMode).toBeTrue();

    component.toggleTheme();
    expect(component.isDarkMode).toBeFalse();
  });
});
