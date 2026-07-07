import { Injectable, computed, signal } from '@angular/core';

export interface LayoutSettings {
  layoutMode: string;
  navbarPosition: string;
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
  private _state = signal<Record<string, string>>({});

  readonly theme = computed(() => this._state()['theme'] || 'blue');
  readonly fontFamily = computed(() => this._state()['theme-font'] || this._state()['fontFamily'] || 'sans-serif');
  readonly themeBase = computed(() => this._state()['theme-base'] || this._state()['themeBase'] || 'slate');
  readonly borderRadius = computed(() => this._state()['theme-radius'] || this._state()['borderRadius'] || '1');
  readonly rtlMode = computed(() => this._state()['rtl-mode'] || String(this._state()['rtlMode'] === 'true') || 'false');
  readonly layoutMode = computed(() => this._state()['layoutMode'] || 'vertical');
  readonly navbarPosition = computed(() => this._state()['navbarPosition'] || 'left');
  readonly navbarDark = computed(() => this._state()['navbarDark'] === 'true');
  readonly navbarOverlap = computed(() => this._state()['navbarOverlap'] === 'true');
  readonly navbarSticky = computed(() => this._state()['navbarSticky'] === 'true');
  readonly colorScheme = computed(() => this._state()['colorScheme'] || 'blue');

  get snapshot(): LayoutSettings {
    return {
      layoutMode: this.layoutMode(),
      navbarPosition: this.navbarPosition(),
      navbarDark: this.navbarDark(),
      navbarOverlap: this.navbarOverlap(),
      navbarSticky: this.navbarSticky(),
      rtlMode: this.rtlMode() === 'true',
      colorScheme: this.colorScheme(),
      fontFamily: this.fontFamily(),
      themeBase: this.themeBase(),
      borderRadius: Number(this.borderRadius()),
    };
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

  constructor() {
    this.loadSettings();
    this.applySettings();
  }

  update(property: string, value: string): void {
    this._state.update(state => ({ ...state, [property]: value }));
    this.saveSettings();
    this.applySettings();
  }

  updateSettings(partial: Partial<LayoutSettings>): void {
    const mapped: Record<string, string> = {};
    if (partial.layoutMode !== undefined) mapped['layoutMode'] = partial.layoutMode;
    if (partial.navbarPosition !== undefined) mapped['navbarPosition'] = partial.navbarPosition;
    if (partial.navbarDark !== undefined) mapped['navbarDark'] = String(partial.navbarDark);
    if (partial.navbarOverlap !== undefined) mapped['navbarOverlap'] = String(partial.navbarOverlap);
    if (partial.navbarSticky !== undefined) mapped['navbarSticky'] = String(partial.navbarSticky);
    if (partial.rtlMode !== undefined) mapped['rtl-mode'] = String(partial.rtlMode);
    if (partial.colorScheme !== undefined) mapped['theme'] = partial.colorScheme;
    if (partial.fontFamily !== undefined) mapped['theme-font'] = partial.fontFamily;
    if (partial.themeBase !== undefined) mapped['theme-base'] = partial.themeBase;
    if (partial.borderRadius !== undefined) mapped['theme-radius'] = String(partial.borderRadius);
    if (Object.keys(mapped).length > 0) {
      this._state.update(state => ({ ...state, ...mapped }));
      this.saveSettings();
      this.applySettings();
    }
  }

  reset(): void {
    this._state.set({});
    this.saveSettings();
    this.applySettings();
  }

  private applySettings(): void {
    const s = this._state();
    const el = document.documentElement;

    const isDark = s['theme-base'] === 'dark' || s['themeBase'] === 'dark';
    el.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');
    el.setAttribute('data-bs-color-scheme', s['theme'] || s['colorScheme'] || 'blue');
    el.setAttribute('data-bs-font-family', s['theme-font'] || s['fontFamily'] || 'sans-serif');

    const radius = Number(s['theme-radius'] || s['borderRadius'] || 1);
    el.style.setProperty('--tblr-border-radius', (radius * 0.25) + 'rem');

    const rtl = s['rtl-mode'] === 'true' || s['rtlMode'] === 'true';
    el.dir = rtl ? 'rtl' : 'ltr';

    const keys = ['layout-fluid', 'layout-boxed', 'layout-rtl', 'navbar-overlap', 'navbar-sticky', 'navbar-dark', 'navbar-vertical-right'];
    keys.forEach(k => document.body.classList.toggle(k, false));
    this.layoutClasses.forEach(c => document.body.classList.add(c));
  }

  private loadSettings(): void {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) this._state.set(JSON.parse(raw));
    } catch { }
  }

  private saveSettings(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._state()));
  }
}
