import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { TablerIconsModule, provideTablerIcons } from 'angular-tabler-icons';
import {
  IconLayoutDashboard, IconClipboard, IconList, IconLayoutKanban, IconPlus,
  IconUsers, IconDeviceDesktop, IconSettings, IconBell, IconUser, IconLogout,
  IconMenu2, IconMoon, IconSun, IconApps, IconChartBar, IconChartLine, IconChartPie,
} from 'angular-tabler-icons/icons';
import { HeaderComponent } from './header.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { LanguageSelectorComponent } from '../../shared/i18n/presentation/pages/language-selector/language-selector.component';

declare const window: any;

describe('HeaderComponent dropdown close behavior', () => {
  let fixture: ComponentFixture<HeaderComponent>;

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
        }),
        { provide: TranslateService, useValue: { currentLang: 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
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
});
