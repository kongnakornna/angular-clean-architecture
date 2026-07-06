import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface LayoutSettings {
  layoutMode: 'vertical' | 'fluid' | 'boxed' | 'condensed';
  navbarPosition: 'left' | 'right';
  navbarDark: boolean;
  navbarOverlap: boolean;
  navbarSticky: boolean;
  rtlMode: boolean;
  colorScheme: string;
  fontFamily: string;
  themeBase: string;
  borderRadius: number;
}

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private readonly STORAGE_KEY = 'LAYOUT_SETTINGS';
  private settings: BehaviorSubject<LayoutSettings>;
  public settings$: Observable<LayoutSettings>;

  private defaults: LayoutSettings = {
    layoutMode: 'vertical',
    navbarPosition: 'left',
    navbarDark: false,
    navbarOverlap: false,
    navbarSticky: false,
    rtlMode: false,
    colorScheme: 'blue',
    fontFamily: 'sans-serif',
    themeBase: 'slate',
    borderRadius: 1,
  };

  constructor() {
    const saved = this.loadSettings();
    this.settings = new BehaviorSubject<LayoutSettings>(saved);
    this.settings$ = this.settings.asObservable();
    this.applySettings(saved);
  }

  get snapshot(): LayoutSettings {
    return this.settings.getValue();
  }

  get layoutClasses(): string[] {
    const s = this.snapshot;
    const classes: string[] = [];
    if (s.layoutMode === 'fluid') classes.push('layout-fluid');
    if (s.layoutMode === 'boxed') classes.push('layout-boxed');
    if (s.navbarDark) classes.push('navbar-dark');
    if (s.navbarOverlap) classes.push('navbar-overlap');
    if (s.navbarSticky) classes.push('navbar-sticky');
    if (s.rtlMode) classes.push('layout-rtl');
    if (s.navbarPosition === 'right') classes.push('navbar-vertical-right');
    return classes;
  }

  update(partial: Partial<LayoutSettings>): void {
    const next = { ...this.snapshot, ...partial };
    this.settings.next(next);
    this.saveSettings(next);
    this.applySettings(next);
  }

  reset(): void {
    this.settings.next({ ...this.defaults });
    this.saveSettings(this.defaults);
    this.applySettings(this.defaults);
  }

  private applySettings(s: LayoutSettings): void {
    const el = document.documentElement;

    el.setAttribute('data-bs-theme', s.layoutMode === 'boxed' ? 'dark' : 'light');

    if (s.rtlMode) {
      el.setAttribute('dir', 'rtl');
    } else {
      el.setAttribute('dir', 'ltr');
    }

    const keys = ['layout-fluid', 'layout-boxed', 'layout-rtl', 'navbar-overlap', 'navbar-sticky', 'navbar-dark', 'navbar-vertical-right'];
    keys.forEach(k => document.body.classList.toggle(k, false));
    this.layoutClasses.forEach(c => document.body.classList.add(c));
  }

  private loadSettings(): LayoutSettings {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) return { ...this.defaults, ...JSON.parse(raw) };
    } catch { }
    return { ...this.defaults };
  }

  private saveSettings(s: LayoutSettings): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(s));
  }
}
