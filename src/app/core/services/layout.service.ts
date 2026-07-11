import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private _state = signal<Record<string, string>>({});

  readonly theme = computed(() => this._state()['theme'] || 'light');
  readonly themeBase = computed(() => this._state()['theme-base'] || 'gray');
  readonly themeFont = computed(() => this._state()['theme-font'] || 'sans-serif');
  readonly themePrimary = computed(() => this._state()['theme-primary'] || 'blue');
  readonly themeRadius = computed(() => this._state()['theme-radius'] || '1');

  constructor() {
    this.loadSettings();
    this.applySettings();
  }

  update(property: string, value: string): void {
    this._state.update(state => ({ ...state, [property]: value }));
    this.saveSettings();
    this.applySettings();
  }

  reset(): void {
    this._state.set({});
    this.saveSettings();
    this.applySettings();
  }

  private applySettings(): void {
    const s = this._state();
    const el = document.documentElement;
    // theme (light/dark)
    el.setAttribute('data-bs-theme', s['theme'] || 'light');

    // theme-base
    el.setAttribute('data-bs-theme-base', s['theme-base'] || 'gray');

    // theme-font
    el.setAttribute('data-bs-theme-font', s['theme-font'] || 'sans-serif');

    // theme-primary
    el.setAttribute('data-bs-theme-primary', s['theme-primary'] || 'blue');

    // theme-radius
    el.setAttribute('data-bs-theme-radius', s['theme-radius'] || '1');

    // Add theme-base class for visibility
    el.classList.remove('theme-slate', 'theme-gray', 'theme-zinc', 'theme-neutral', 'theme-stone');
    el.classList.add('theme-' + (s['theme-base'] || 'gray'));

    el.classList.remove('font-sans-serif', 'font-serif', 'font-monospace', 'font-comic');
    el.classList.add('font-' + (s['theme-font'] || 'sans-serif'));
  }

  private loadSettings(): void {
    const keys = ['theme', 'theme-base', 'theme-font', 'theme-primary', 'theme-radius'];
    const defaults: Record<string, string> = {
      theme: 'light',
      'theme-base': 'gray',
      'theme-font': 'sans-serif',
      'theme-primary': 'blue',
      'theme-radius': '1',
    };
    const state: Record<string, string> = {};
    for (const key of keys) {
      state[key] = localStorage.getItem('tabler-' + key) || defaults[key];
    }
    this._state.set(state);
  }

  private saveSettings(): void {
    const s = this._state();
    for (const key of Object.keys(s)) {
      localStorage.setItem('tabler-' + key, s[key]);
    }
  }
}
