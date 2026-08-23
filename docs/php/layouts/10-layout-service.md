# LayoutService — Extended for Multiple Layout Variants

> Based on existing `C:\github\angular-clean-architecture\src\app\core\services\layout.service.ts`
> Extended to support all iCmon layout variants with signals-based reactive state.

```typescript
import { Injectable, signal, computed, effect } from '@angular/core';

export type LayoutType = 'classic' | 'vertical' | 'vertical-compact' | 'vertical-minimal' | 'vertical-iot' | 'iot' | 'r1' | 'iframe' | 'blank';
export type FooterVariant = 'full' | 'compact' | 'minimal' | 'iot' | 'iframe' | 'r1' | 'none';
export type NavbarStyle = 'horizontal' | 'vertical';
export type SidebarVariant = 'v1' | 'v2' | 'v3' | 'none';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  // ──────────────────────────────────────
  //  ORIGINAL THEME STATE (from existing code)
  // ──────────────────────────────────────
  private _state = signal<Record<string, string>>({});

  readonly theme = computed(() => this._state()['theme'] || 'light');
  readonly themeBase = computed(() => this._state()['theme-base'] || 'gray');
  readonly themeFont = computed(() => this._state()['theme-font'] || 'sans-serif');
  readonly themePrimary = computed(() => this._state()['theme-primary'] || 'blue');
  readonly themeRadius = computed(() => this._state()['theme-radius'] || '1');

  // ──────────────────────────────────────
  //  LAYOUT VARIANT STATE
  // ──────────────────────────────────────
  readonly activeLayout = signal<LayoutType>('classic');
  readonly sidebarCollapsed = signal(false);
  readonly sidebarVariant = signal<SidebarVariant>('none');
  readonly footerVariant = signal<FooterVariant>('full');
  readonly navbarStyle = signal<NavbarStyle>('horizontal');
  readonly showFooter = signal(true);
  readonly showPageWrapper = signal(false);
  readonly showDashboardWrapper = signal(false);
  readonly darkMode = signal(false);

  // ──────────────────────────────────────
  //  LAYOUT-SPECIFIC COMPUTED STATE
  // ──────────────────────────────────────
  readonly isVertical = computed(() =>
    ['vertical', 'vertical-compact', 'vertical-minimal', 'vertical-iot'].includes(this.activeLayout())
  );
  readonly isIframe = computed(() => this.activeLayout() === 'iframe');
  readonly isIot = computed(() => ['iot', 'vertical-iot'].includes(this.activeLayout()));
  readonly isBlank = computed(() => this.activeLayout() === 'blank');

  // ──────────────────────────────────────
  //  CONSTRUCTOR
  // ──────────────────────────────────────
  constructor() {
    this.loadSettings();
    this.applySettings();

    // Reactively apply theme to DOM when state changes
    effect(() => {
      this.applySettings();
    });
  }

  // ──────────────────────────────────────
  //  APPLY A SPECIFIC LAYOUT
  // ──────────────────────────────────────
  applyLayout(layout: LayoutType): void {
    this.activeLayout.set(layout);

    switch (layout) {
      case 'classic':
        this.navbarStyle.set('horizontal');
        this.sidebarVariant.set('none');
        this.footerVariant.set('full');
        this.showFooter.set(true);
        this.showPageWrapper.set(false);
        this.showDashboardWrapper.set(false);
        this.darkMode.set(false);
        break;

      case 'vertical':
        this.navbarStyle.set('vertical');
        this.sidebarVariant.set('v1');
        this.footerVariant.set('full');
        this.showFooter.set(true);
        this.showPageWrapper.set(true);
        this.showDashboardWrapper.set(true);
        break;

      case 'vertical-compact':
        this.navbarStyle.set('vertical');
        this.sidebarVariant.set('v2');
        this.footerVariant.set('compact');
        this.showFooter.set(true);
        this.showPageWrapper.set(true);
        this.showDashboardWrapper.set(true);
        break;

      case 'vertical-minimal':
        this.navbarStyle.set('vertical');
        this.sidebarVariant.set('v3');
        this.footerVariant.set('none');
        this.showFooter.set(false);
        this.showPageWrapper.set(false);
        this.showDashboardWrapper.set(false);
        break;

      case 'vertical-iot':
        this.navbarStyle.set('vertical');
        this.sidebarVariant.set('v2');
        this.footerVariant.set('minimal');
        this.showFooter.set(true);
        this.showPageWrapper.set(false);
        this.showDashboardWrapper.set(true);
        break;

      case 'iot':
        this.navbarStyle.set('horizontal');
        this.sidebarVariant.set('none');
        this.footerVariant.set('iot');
        this.showFooter.set(true);
        this.showPageWrapper.set(false);
        this.showDashboardWrapper.set(false);
        break;

      case 'r1':
        this.navbarStyle.set('horizontal');
        this.sidebarVariant.set('none');
        this.footerVariant.set('r1');
        this.showFooter.set(true);
        this.showPageWrapper.set(true);
        this.showDashboardWrapper.set(false);
        break;

      case 'iframe':
        this.navbarStyle.set('horizontal');
        this.sidebarVariant.set('none');
        this.footerVariant.set('iframe');
        this.showFooter.set(false);
        this.showPageWrapper.set(false);
        this.showDashboardWrapper.set(false);
        this.darkMode.set(true);
        break;

      case 'blank':
        this.navbarStyle.set('horizontal');
        this.sidebarVariant.set('none');
        this.footerVariant.set('none');
        this.showFooter.set(false);
        this.showPageWrapper.set(false);
        this.showDashboardWrapper.set(false);
        break;
    }
  }

  // ──────────────────────────────────────
  //  SIDEBAR
  // ──────────────────────────────────────
  toggleSidebar(): void {
    this.sidebarCollapsed.update(v => !v);
  }

  collapseSidebar(): void {
    this.sidebarCollapsed.set(true);
  }

  expandSidebar(): void {
    this.sidebarCollapsed.set(false);
  }

  // ──────────────────────────────────────
  //  THEME (original + extended)
  // ──────────────────────────────────────
  toggleTheme(): void {
    this.update('theme', this.theme() === 'light' ? 'dark' : 'light');
  }

  update(property: string, value: string): void {
    this._state.update(state => ({ ...state, [property]: value }));
    this.saveSettings();
  }

  reset(): void {
    this._state.set({});
    this.saveSettings();
  }

  // ──────────────────────────────────────
  //  PERSISTENCE
  // ──────────────────────────────────────
  private applySettings(): void {
    const s = this._state();
    const el = document.documentElement;

    el.setAttribute('data-bs-theme', s['theme'] || 'light');
    el.setAttribute('data-bs-theme-base', s['theme-base'] || 'gray');
    el.setAttribute('data-bs-theme-font', s['theme-font'] || 'sans-serif');
    el.setAttribute('data-bs-theme-primary', s['theme-primary'] || 'blue');
    el.setAttribute('data-bs-theme-radius', s['theme-radius'] || '1');

    el.classList.remove(
      'theme-slate', 'theme-gray', 'theme-zinc', 'theme-neutral', 'theme-stone'
    );
    el.classList.add('theme-' + (s['theme-base'] || 'gray'));

    el.classList.remove(
      'font-sans-serif', 'font-serif', 'font-monospace', 'font-comic'
    );
    el.classList.add('font-' + (s['theme-font'] || 'sans-serif'));

    // Apply dark mode for iframe layout
    if (this.darkMode()) {
      el.setAttribute('data-bs-theme', 'dark');
    }
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
```

---

## Usage Example: Switching Layouts Dynamically

```typescript
import { Component, inject } from '@angular/core';
import { LayoutService } from './core/services/layout.service';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  private layoutSvc = inject(LayoutService);

  constructor() {
    // Layout is set by the route component.
    // Each layout shell calls layoutSvc.applyLayout() in its ngOnInit.
  }
}
```

**In each layout component's ngOnInit:**

```typescript
// classic-layout.component.ts
ngOnInit(): void {
  this.layoutSvc.applyLayout('classic');
}

// vertical-layout.component.ts
ngOnInit(): void {
  this.layoutSvc.applyLayout('vertical');
}

// iot-layout.component.ts
ngOnInit(): void {
  this.layoutSvc.applyLayout('iot');
}

// iframe-layout.component.ts
ngOnInit(): void {
  this.layoutSvc.applyLayout('iframe');
}
```
