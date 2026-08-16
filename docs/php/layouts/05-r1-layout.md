# R1 Layout (PHP: `templater1.php`)

> Horizontal navbar with R1-specific header + footer + custom page wrapper

## Component Tree

```
R1LayoutComponent
├── R1HeaderComponent           ← headerr1.php + navbar_r1.php
├── HorizontalMenuComponent
├── PageWrapperR1Component      ← pagewrapper_seetingr1.php
├── <router-outlet>
└── FooterR1Component           ← footerr1.php
    └── SettingsPanelComponent
```

---

## R1LayoutComponent

```typescript
import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { R1HeaderComponent } from './r1-header.component';
import { HorizontalMenuComponent } from '../shared/horizontal-menu/horizontal-menu.component';
import { FooterR1Component } from '../shared/footer/footer-r1.component';
import { SettingsPanelComponent } from '../shared/settings-panel/settings-panel.component';
import { PageWrapperR1Component } from '../shared/page-wrapper/page-wrapper-r1.component';

@Component({
  selector: 'app-r1-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    R1HeaderComponent,
    HorizontalMenuComponent,
    FooterR1Component,
    SettingsPanelComponent,
    PageWrapperR1Component,
  ],
  template: `
    <app-r1-header></app-r1-header>
    <app-horizontal-menu [menuItems]="menuItems"></app-horizontal-menu>
    <app-page-wrapper-r1></app-page-wrapper-r1>

    <div class="page-wrapper">
      <main class="page-body" id="content">
        <ng-content select="[page-header]"></ng-content>
        <div class="container-xl">
          <router-outlet></router-outlet>
        </div>
      </main>
      <app-footer-r1></app-footer-r1>
    </div>

    <app-settings-panel></app-settings-panel>
  `,
})
export class R1LayoutComponent {
  @HostBinding('class.page') pageClass = true;

  menuItems = [
    { label: 'Dashboard', icon: 'layout-dashboard', route: '/r1/dashboard' },
    { label: 'Jobs', icon: 'clipboard', route: '/r1/jobs' },
    { label: 'Reports', icon: 'chart-bar', route: '/r1/reports' },
  ];
}
```

## R1HeaderComponent (PHP: `headerr1.php` + `navbar_r1.php`)

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-r1-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- Identical structure to ClassicHeaderComponent but with R1 branding -->
    <header class="navbar navbar-expand-md d-print-none">
      <div class="container-xl">
        <button class="navbar-toggler" type="button" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="navbar-brand navbar-brand-autodark">
          <a routerLink="/r1">
            <img src="assets/img/logo/logo-dark.png" width="80" height="15"
                 class="navbar-brand-image" alt="iCmon R1" />
          </a>
        </div>

        <div class="navbar-nav flex-row order-md-last">
          <!-- Same user dropdown, theme toggle, notifications as classic -->
        </div>
      </div>
    </header>
  `,
})
export class R1HeaderComponent {}

// FooterR1Component — identical to FooterBarComponent (full footer with links + theme builder)
// See footer-bar.component.ts in classic layout
```
