# Vertical Layouts (PHP: `templatevertical.php` + variants)

## Layout Comparison

| Angular Component | PHP Source | Sidebar | Footer | Page Wrapper | Notes |
|---|---|---|---|---|---|
| `VerticalLayoutComponent` | `templatevertical.php` | `navbar_vertical.php` | full | `pagewrapper_dasdboard` + `seeting_vertical` | Full sidebar + dashboard wrapper |
| `VerticalCompactLayoutComponent` | `templatevertical2.php` | `navbar_vertical-l2.php` | compact (no links) | same | Theme Builder **commented** |
| `VerticalMinimalLayoutComponent` | `templatevertical3.php` | `navbar_vertical-l3.php` | none | none | No footer — bare skeleton |
| `VerticalIotLayoutComponent` | `templatevertical4.php` | `navbar_vertical-l2.php` | minimal (copyright only) | `pagewrapper_dasdboard_iot` | IoT variant with sidebar |

---

## VerticalLayoutComponent

**vertical-layout.component.ts**
```typescript
import { Component, HostBinding, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LayoutService } from '../../core/services/layout.service';
import { VerticalSidebarComponent } from '../shared/sidebar/vertical-sidebar.component';
import { FooterBarComponent } from '../shared/footer/footer-bar.component';
import { SettingsPanelComponent } from '../shared/settings-panel/settings-panel.component';
import { DashboardWrapperComponent } from '../shared/page-wrapper/dashboard-wrapper.component';

@Component({
  selector: 'app-vertical-layout',
  standalone: true,
  imports: [
    NgIf, RouterOutlet,
    VerticalSidebarComponent,
    FooterBarComponent,
    SettingsPanelComponent,
    DashboardWrapperComponent,
  ],
  template: `
    <!-- PHP: header_vertical.php + navbar_vertical.php -->
    <app-vertical-sidebar
      [isCollapsed]="layoutSvc.sidebarCollapsed()"
      [dark]="true"
      [background]="'dark'">
    </app-vertical-sidebar>

    <div class="page-wrapper">
      <!-- PHP: pagewrapper_dasdboard.php — optional dashboard header -->
      <app-dashboard-wrapper *ngIf="layoutSvc.showDashboardWrapper()">
      </app-dashboard-wrapper>

      <main class="page-body" id="content">
        <ng-content select="[page-header]"></ng-content>
        <div class="container-xl">
          <router-outlet></router-outlet>
        </div>
      </main>

      <!-- PHP: footer_vertical.php — full footer with links + theme builder -->
      <app-footer-bar></app-footer-bar>
    </div>

    <app-settings-panel></app-settings-panel>
  `,
  styles: [`
    :host { display: flex; min-height: 100vh; }
    .page-wrapper { flex: 1; display: flex; flex-direction: column; }
    .page-body { flex: 1; }
  `],
})
export class VerticalLayoutComponent {
  protected layoutSvc = inject(LayoutService);
  @HostBinding('class.page') pageClass = true;
  @HostBinding('class.layout-fluid') layoutFluid = true;
}
```

---

## VerticalCompactLayoutComponent (PHP: `templatevertical2.php`)

**vertical-compact-layout.component.ts**
```typescript
import { Component, HostBinding, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutService } from '../../core/services/layout.service';
import { VerticalSidebarV2Component } from '../shared/sidebar/vertical-sidebar-v2.component';
import { FooterCompactComponent } from '../shared/footer/footer-compact.component';
import { DashboardWrapperComponent } from '../shared/page-wrapper/dashboard-wrapper.component';

@Component({
  selector: 'app-vertical-compact-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    VerticalSidebarV2Component,
    FooterCompactComponent,
    DashboardWrapperComponent,
  ],
  template: `
    <!-- PHP: header_vertical2.php + navbar_vertical-l2.php -->
    <app-vertical-sidebar-v2
      [isCollapsed]="layoutSvc.sidebarCollapsed()">
    </app-vertical-sidebar-v2>

    <div class="page-wrapper">
      <app-dashboard-wrapper *ngIf="layoutSvc.showDashboardWrapper()">
      </app-dashboard-wrapper>

      <main class="page-body" id="content">
        <ng-content select="[page-header]"></ng-content>
        <div class="container-xl">
          <router-outlet></router-outlet>
        </div>
      </main>

      <!-- PHP: footer_vertical2.php — compact footer, NO documentation links,
           Theme Builder fully commented out -->
      <app-footer-compact></app-footer-compact>
    </div>
    <!-- No <app-settings-panel> — Theme Builder commented out in PHP -->
  `,
  styles: [`
    :host { display: flex; min-height: 100vh; }
    .page-wrapper { flex: 1; }
  `],
})
export class VerticalCompactLayoutComponent {
  protected layoutSvc = inject(LayoutService);
  @HostBinding('class.page') pageClass = true;
}
```

---

## VerticalMinimalLayoutComponent (PHP: `templatevertical3.php`)

```typescript
import { Component, HostBinding, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutService } from '../../core/services/layout.service';
import { VerticalSidebarV3Component } from '../shared/sidebar/vertical-sidebar-v3.component';

@Component({
  selector: 'app-vertical-minimal-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    VerticalSidebarV3Component,
  ],
  template: `
    <!-- PHP: header_vertical3.php + navbar_vertical-l3.php
         NOTE: templatevertical3.php does NOT load any footer -->
    <app-vertical-sidebar-v3
      [isCollapsed]="layoutSvc.sidebarCollapsed()">
    </app-vertical-sidebar-v3>

    <div class="page-wrapper">
      <main class="page-body" id="content">
        <div class="container-xl">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>

    <!-- ⚠ No footer — matches PHP behavior -->
  `,
  styles: [`
    :host { display: flex; min-height: 100vh; }
    .page-wrapper { flex: 1; }
  `],
})
export class VerticalMinimalLayoutComponent {
  protected layoutSvc = inject(LayoutService);
  @HostBinding('class.page') pageClass = true;
}
```

---

## VerticalIotLayoutComponent (PHP: `templatevertical4.php`)

```typescript
import { Component, HostBinding, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutService } from '../../core/services/layout.service';
import { VerticalSidebarV2Component } from '../shared/sidebar/vertical-sidebar-v2.component';
import { FooterMinimalComponent } from '../shared/footer/footer-minimal.component';
import { SettingsPanelComponent } from '../shared/settings-panel/settings-panel.component';
import { IotDashboardWrapperComponent } from '../shared/page-wrapper/iot-dashboard-wrapper.component';

@Component({
  selector: 'app-vertical-iot-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    VerticalSidebarV2Component,
    FooterMinimalComponent,
    SettingsPanelComponent,
    IotDashboardWrapperComponent,
  ],
  template: `
    <!-- PHP: header_vertical2.php + navbar_vertical-l2.php
         (reuses vertical-l2 sidebar, same as compact layout) -->
    <app-vertical-sidebar-v2
      [isCollapsed]="layoutSvc.sidebarCollapsed()">
    </app-vertical-sidebar-v2>

    <div class="page-wrapper">
      <!-- PHP: pagewrapper_dasdboard_iot.php — IoT-specific dashboard wrapper -->
      <app-iot-dashboard-wrapper>
      </app-iot-dashboard-wrapper>

      <main class="page-body" id="content">
        <ng-content select="[page-header]"></ng-content>
        <div class="container-xl">
          <router-outlet></router-outlet>
        </div>
      </main>

      <!-- PHP: footer_vertical4m.php — minimal (copyright only, no links) -->
      <app-footer-minimal></app-footer-minimal>
    </div>

    <app-settings-panel></app-settings-panel>
  `,
  styles: [`
    :host { display: flex; min-height: 100vh; }
    .page-wrapper { flex: 1; }
  `],
})
export class VerticalIotLayoutComponent {
  protected layoutSvc = inject(LayoutService);
  @HostBinding('class.page') pageClass = true;
}
```

---

## VerticalSidebarComponent (PHP: `navbar_vertical.php`)

**vertical-sidebar.component.ts**
```typescript
import { Component, Input, inject } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

export interface SidebarMenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: SidebarMenuItem[];
  badge?: string;
  badgeColor?: string;
}

@Component({
  selector: 'app-vertical-sidebar',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, RouterLink, RouterLinkActive],
  template: `
    <aside class="navbar navbar-vertical navbar-expand-lg"
           [class.navbar-collapsed]="isCollapsed"
           [class.navbar-dark]="dark"
           [attr.data-bs-theme]="dark ? 'dark' : null">
      <div class="container-fluid">
        <!-- Mobile toggler -->
        <button class="navbar-toggler" type="button"
                (click)="collapsed = !collapsed"
                aria-label="Toggle sidebar">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Brand -->
        <div class="navbar-brand navbar-brand-autodark">
          <a routerLink="/">
            <img src="assets/img/logo/logo-dark.png" width="80" height="15"
                 class="navbar-brand-image" alt="iCmon" />
          </a>
        </div>

        <!-- Menu -->
        <div class="collapse navbar-collapse" id="sidebar-menu"
             [class.show]="!collapsed">
          <ul class="navbar-nav pt-lg-3">
            <ng-container *ngFor="let item of menuItems">
              <!-- Leaf item -->
              <li *ngIf="!item.children" class="nav-item">
                <a class="nav-link" routerLink="{{ item.route }}"
                   routerLinkActive="active"
                   [routerLinkActiveOptions]="{ exact: true }">
                  <i-tabler [name]="item.icon" class="icon me-2"></i-tabler>
                  <span class="nav-link-title">{{ item.label }}</span>
                </a>
              </li>

              <!-- Item with children (dropdown) -->
              <li *ngIf="item.children" class="nav-item dropdown"
                  [class.active]="isChildActive(item.children)">
                <a class="nav-link dropdown-toggle" href="javascript:void(0)"
                   (click)="toggleSubmenu(item.label)"
                   data-bs-toggle="dropdown">
                  <i-tabler [name]="item.icon" class="icon me-2"></i-tabler>
                  <span class="nav-link-title">{{ item.label }}</span>
                </a>
                <div class="dropdown-menu" [class.show]="isExpanded(item.label)">
                  <ng-container *ngFor="let child of item.children">
                    <a *ngIf="!child.children" class="dropdown-item"
                       routerLink="{{ child.route }}" routerLinkActive="active">
                      {{ child.label }}
                    </a>
                    <!-- Nested -->
                    <div *ngIf="child.children" class="dropend">
                      <a class="dropdown-item dropdown-toggle" href="javascript:void(0)"
                         data-bs-toggle="dropdown">
                        {{ child.label }}
                      </a>
                      <div class="dropdown-menu">
                        <a *ngFor="let sub of child.children" class="dropdown-item"
                           routerLink="{{ sub.route }}">
                          {{ sub.label }}
                        </a>
                      </div>
                    </div>
                  </ng-container>
                </div>
              </li>
            </ng-container>
          </ul>
        </div>
      </div>
    </aside>
  `,
  styles: [`
    :host { display: block; }
    .navbar-vertical { width: 15rem; }
    .navbar-collapsed { width: 4rem; }
  `],
})
export class VerticalSidebarComponent {
  @Input() isCollapsed = false;
  @Input() dark = true;
  @Input() background = '';

  collapsed = false;
  private router = inject(Router);

  expandedMenus = new Set<string>();

  menuItems: SidebarMenuItem[] = [
    { label: 'nav.home', icon: 'home', route: '/' },
    { label: 'nav.dashboard', icon: 'layout-dashboard', route: '/dashboard' },
    {
      label: 'nav.admin', icon: 'shield',
      children: [
        { label: 'nav.users', icon: 'users', route: '/admin/users' },
        { label: 'nav.devices', icon: 'device-desktop', route: '/admin/devices' },
        { label: 'nav.settings', icon: 'settings', route: '/admin/settings' },
        { label: 'nav.logs', icon: 'list-check', route: '/admin/logs' },
      ],
    },
    {
      label: 'nav.dev', icon: 'code',
      children: [
        { label: 'nav.api', icon: 'api', route: '/dev/api' },
        { label: 'nav.docs', icon: 'file-text', route: '/dev/docs' },
      ],
    },
    { label: 'nav.reports', icon: 'chart-bar', route: '/reports' },
    { label: 'nav.usecases', icon: 'briefcase', route: '/usecases' },
    { label: 'nav.help', icon: 'help-circle', route: '/help' },
    { label: 'nav.other', icon: 'dots', route: '/other' },
  ];

  toggleSubmenu(label: string): void {
    if (this.expandedMenus.has(label)) {
      this.expandedMenus.delete(label);
    } else {
      this.expandedMenus.add(label);
    }
  }

  isExpanded(label: string): boolean {
    return this.expandedMenus.has(label);
  }

  isChildActive(children?: SidebarMenuItem[]): boolean {
    if (!children) return false;
    return children.some(c =>
      (c.route && this.router.isActive(c.route, { paths: 'subset', queryParams: 'ignored', fragment: 'ignored', matrixParams: 'ignored' })) ||
      this.isChildActive(c.children)
    );
  }
}
```

---

## Footer Variants

### FooterCompactComponent (PHP: `footer_vertical2.php`)
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-compact',
  standalone: true,
  template: `
    <footer class="footer footer-transparent d-print-none">
      <div class="container-xl">
        <div class="row text-center align-items-center flex-row-reverse">
          <div class="col-12 col-lg-auto mt-3 mt-lg-0">
            <ul class="list-inline list-inline-dots mb-0">
              <li class="list-inline-item">
                Copyright &copy; <a routerLink="/" class="link-secondary">iCmon</a>
                {{ currentYear }}. All rights reserved.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
    <!-- No Theme Builder — matches PHP footer_vertical2.php behavior -->
  `,
})
export class FooterCompactComponent {
  currentYear = new Date().getFullYear();
}
```

### FooterMinimalComponent (PHP: `footer_vertical4.php` / `footer_vertical4m.php`)
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-minimal',
  standalone: true,
  template: `
    <footer class="footer footer-transparent d-print-none">
      <div class="container-xl">
        <div class="row text-center align-items-center flex-row-reverse">
          <div class="col-12 col-lg-auto mt-3 mt-lg-0">
            <ul class="list-inline list-inline-dots mb-0">
              <li class="list-inline-item">
                Copyright &copy; <a routerLink="/" class="link-secondary">iCmon</a>
                {{ currentYear }}. All rights reserved.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterMinimalComponent {
  currentYear = new Date().getFullYear();
}
```

### FooterIframeComponent (PHP: `footeriframe.php`)
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-iframe',
  standalone: true,
  template: `
    <!-- PHP: footeriframe.php — NO footer HTML, only scripts.
         Angular scripts loaded via angular.json, not here.
         This component is intentionally empty. -->
  `,
})
export class FooterIframeComponent {}
```
