# ClassicLayout (PHP: `template.php`)

> Horizontal top navbar + footer — standard layout for iCmon dashboard

## Component Tree

```
ClassicLayoutComponent          ← shell (selector: 'app-classic-layout')
├── ClassicHeaderComponent      ← header.php + navbar.php
│   ├── LogoComponent
│   ├── NotificationDropdownComponent  ← navbar_notifications_all.php
│   ├── ThemeToggleComponent          ← navbar_theme.php
│   ├── LanguageSelectorComponent     ← navbar_lang.php
│   └── UserDropdownComponent         ← navbar_item.php (user dropdown part)
├── HorizontalMenuComponent     ← navbar_menu_main.php + navbar_menu_*.php
├── PageWrapperComponent        ← pagewrapper_seeting.php (conditional)
├── <router-outlet>             ← dynamic content view ($content_view)
└── FooterBarComponent          ← footer.php
    └── SettingsPanelComponent  ← theme_setting.php + theme_builder.php
```

---

## ClassicLayoutComponent

**classic-layout.component.ts**
```typescript
import { Component, HostBinding, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LayoutService } from '../../core/services/layout.service';
import { ClassicHeaderComponent } from './classic-header.component';
import { HorizontalMenuComponent } from '../shared/horizontal-menu/horizontal-menu.component';
import { FooterBarComponent } from '../shared/footer/footer-bar.component';
import { SettingsPanelComponent } from '../shared/settings-panel/settings-panel.component';
import { PageWrapperComponent } from '../shared/page-wrapper/page-wrapper.component';

@Component({
  selector: 'app-classic-layout',
  standalone: true,
  imports: [
    NgIf, RouterOutlet,
    ClassicHeaderComponent,
    HorizontalMenuComponent,
    FooterBarComponent,
    SettingsPanelComponent,
    PageWrapperComponent,
  ],
  template: `
    <app-classic-header></app-classic-header>
    <app-horizontal-menu></app-horizontal-menu>

    <app-page-wrapper *ngIf="layoutSvc.showPageWrapper()">
      <!-- optional page wrapper content -->
    </app-page-wrapper>

    <div class="page-wrapper">
      <main class="page-body" id="content">
        <ng-content select="[page-header]"></ng-content>
        <div class="container-xl">
          <router-outlet></router-outlet>
        </div>
      </main>
      <app-footer-bar></app-footer-bar>
    </div>

    <app-settings-panel></app-settings-panel>
  `,
  styles: [':host { display: block; }'],
})
export class ClassicLayoutComponent {
  protected layoutSvc = inject(LayoutService);
  @HostBinding('class.page') pageClass = true;
}
```

---

## ClassicHeaderComponent (PHP: `header.php` + `navbar.php`)

**classic-header.component.ts**
```typescript
import { Component, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { LayoutService } from '../../../core/services/layout.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface Notification {
  id: number;
  title: string;
  time: string;
  icon: string;
  read: boolean;
}

@Component({
  selector: 'app-classic-header',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, RouterLinkActive],
  template: `
    <!-- DOCTYPE + <head> rendered via index.html → no need in Angular -->

    <header class="navbar navbar-expand-md d-print-none">
      <div class="container-xl">
        <!-- Toggler -->
        <button class="navbar-toggler" type="button"
                (click)="layoutSvc.toggleSidebar()"
                aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Logo -->
        <div class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
          <a routerLink="/">
            <img [src]="'assets/img/logo/logo-' + (layoutSvc.theme() === 'dark' ? 'light' : 'dark') + '.png'"
                 width="80" height="15" class="navbar-brand-image" alt="iCmon" />
          </a>
        </div>

        <!-- Right section -->
        <div class="navbar-nav flex-row order-md-last">
          <div class="d-none d-md-flex">
            <!-- Theme toggle -->
            <div class="nav-item">
              <a class="nav-link px-2" href="javascript:void(0)" (click)="layoutSvc.toggleTheme()"
                 [attr.aria-label]="(layoutSvc.theme() === 'dark' ? 'switch to light' : 'switch to dark')">
                <svg *ngIf="layoutSvc.theme() === 'light'" class="icon icon-2" ...><!-- moon --></svg>
                <svg *ngIf="layoutSvc.theme() === 'dark'" class="icon icon-2" ...><!-- sun --></svg>
              </a>
            </div>

            <!-- Notifications -->
            <div class="nav-item dropdown">
              <a class="nav-link px-2" href="javascript:void(0)" data-bs-toggle="dropdown"
                 aria-label="Notifications">
                <svg class="icon icon-2"><!-- bell --></svg>
                <span *ngIf="unreadCount" class="badge bg-red badge-pill">{{ unreadCount }}</span>
              </a>
              <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <ng-container *ngFor="let n of notifications">
                  <a *ngIf="!n.read" class="dropdown-item" href="javascript:void(0)">
                    <span class="badge bg-green me-2">{{ n.icon }}</span> {{ n.title }}
                    <small class="text-secondary ms-auto">{{ n.time }}</small>
                  </a>
                </ng-container>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item text-center" routerLink="/notifications">
                  View all notifications
                </a>
              </div>
            </div>

            <!-- User dropdown (from navbar_item.php) -->
            <div class="nav-item dropdown">
              <a href="javascript:void(0)" class="nav-link d-flex lh-1 p-0 px-2"
                 data-bs-toggle="dropdown" aria-expanded="false">
                <span class="avatar avatar-sm"
                      style="background-image: url(assets/img/cmon.png)"></span>
                <div class="d-none d-xl-block ps-2">
                  <div>{{ username }}</div>
                  <div class="mt-1 small text-secondary">Cmon user</div>
                </div>
              </a>
              <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <a class="dropdown-item" routerLink="/dashboard">Overview</a>
                <a class="dropdown-item" routerLink="/user/profile">Profile</a>
                <a class="dropdown-item" routerLink="/log/history">History log</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" routerLink="/settings">Settings</a>
                <a class="dropdown-item" id="logout-link" (click)="logout()">Logout</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" (click)="switchLang('english')">English</a>
                <a class="dropdown-item" (click)="switchLang('thai')">Thai</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    :host { display: block; }
    .badge-pill { position: absolute; top: 0; right: 0; }
    .nav-item.dropdown { position: relative; }
  `],
})
export class ClassicHeaderComponent {
  protected layoutSvc = inject(LayoutService);
  username = 'Admin';

  unreadCount = 5;

  notifications: Notification[] = [
    { id: 1, title: 'New job assigned', time: '2m ago', icon: 'new', read: false },
    { id: 2, title: 'Quotation approved', time: '1h ago', icon: 'check', read: false },
    { id: 3, title: 'Stock low warning', time: '3h ago', icon: 'alert', read: true },
  ];

  logout(): void {
    // SweetAlert2 equivalent using Angular CDK or simple confirm
    if (confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      window.location.href = '/login';
    }
  }

  switchLang(lang: string): void {
    // Use TranslateService
  }
}
```

---

## HorizontalMenuComponent (PHP: `navbar_menu_main.php` + all menu partials)

**horizontal-menu.component.ts**
```typescript
import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
  children?: MenuItem[];
  badge?: string;
  badgeColor?: string;
  divider?: boolean;
}

@Component({
  selector: 'app-horizontal-menu',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, RouterLinkActive],
  template: `
    <div class="collapse navbar-collapse" id="navbar-menu">
      <div class="navbar navbar-expand-lg">
        <div class="container-xl">
          <div class="navbar-nav">
            <ng-container *ngFor="let item of menuItems">
              <!-- Divider -->
              <div *ngIf="item.divider" class="nav-item dropdown-divider"></div>

              <!-- Item with children -->
              <div *ngIf="item.children" class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="javascript:void(0)"
                   data-bs-toggle="dropdown" data-bs-auto-close="outside"
                   [class.active]="isChildActive(item.children)">
                  <i-tabler *ngIf="item.icon" [name]="item.icon" class="icon me-2"></i-tabler>
                  {{ item.label }}
                </a>
                <div class="dropdown-menu">
                  <ng-container *ngFor="let child of item.children">
                    <a *ngIf="!child.children" class="dropdown-item"
                       routerLink="{{ child.route }}" routerLinkActive="active"
                       [routerLinkActiveOptions]="{ exact: true }">
                      <i-tabler *ngIf="child.icon" [name]="child.icon" class="icon me-2"></i-tabler>
                      {{ child.label }}
                      <span *ngIf="child.badge"
                            class="badge ms-auto bg-{{ child.badgeColor }}">{{ child.badge }}</span>
                    </a>
                    <!-- Nested dropdown -->
                    <div *ngIf="child.children" class="dropend">
                      <a class="dropdown-item dropdown-toggle" href="javascript:void(0)"
                         data-bs-toggle="dropdown" data-bs-auto-close="outside">
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
              </div>

              <!-- Leaf item -->
              <a *ngIf="!item.children && !item.divider" class="nav-item nav-link"
                 routerLink="{{ item.route }}" routerLinkActive="active"
                 [routerLinkActiveOptions]="{ exact: true }">
                <i-tabler *ngIf="item.icon" [name]="item.icon" class="icon me-2"></i-tabler>
                {{ item.label }}
                <span *ngIf="item.badge"
                      class="badge ms-auto bg-{{ item.badgeColor }}">{{ item.badge }}</span>
              </a>
            </ng-container>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class HorizontalMenuComponent {
  @Input() menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'layout-dashboard', route: '/dashboard' },
    { label: 'Monitoring', icon: 'activity', route: '/monitoring' },
    {
      label: 'IoT', icon: 'device-desktop',
      children: [
        { label: 'Devices', icon: 'device-desktop', route: '/iot/devices' },
        { label: 'Industry', icon: 'building-factory', route: '/iot/industry' },
        { label: 'Irrigation', icon: 'droplet', route: '/iot/irrigation' },
        { label: 'Smart City', icon: 'city', route: '/iot/smartcity' },
        { label: 'Smart Home', icon: 'home', route: '/iot/smarthome' },
        { label: 'Monitoring', icon: 'monitor', route: '/iot/monitoring' },
      ],
    },
    {
      label: 'Admin', icon: 'shield',
      children: [
        { label: 'Users', icon: 'users', route: '/admin/users' },
        { label: 'Settings', icon: 'settings', route: '/admin/settings' },
        { label: 'Logs', icon: 'list-check', route: '/admin/logs' },
      ],
    },
    { label: 'Reports', icon: 'chart-bar', route: '/reports', badge: '3', badgeColor: 'red' },
    { label: 'Help', icon: 'help-circle', route: '/help' },
    { label: 'divider', divider: true },
    { label: 'Organization', icon: 'building', route: '/org' },
    { label: 'Other', icon: 'dots', route: '/other' },
  ];

  isChildActive(children: MenuItem[]): boolean {
    // Check if any child route is currently active
    return false;
  }
}
```

---

## FooterBarComponent (PHP: `footer.php`)

**footer-bar.component.ts**
```typescript
import { Component, Input } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-footer-bar',
  standalone: true,
  imports: [NgIf, NgClass],
  template: `
    <footer class="footer footer-transparent d-print-none"
            [ngClass]="{ 'footer-compact': compact, 'footer-minimal': minimal }">
      <div class="container-xl">
        <div class="row text-center align-items-center flex-row-reverse">
          <!-- Right links (hidden in compact/minimal) -->
          <div class="col-lg-auto ms-lg-auto" *ngIf="!compact && !minimal">
            <nav aria-label="Footer">
              <ul class="list-inline list-inline-dots mb-0">
                <li class="list-inline-item">
                  <a routerLink="/about/manual" class="link-secondary">Documentation</a>
                </li>
                <li class="list-inline-item">
                  <a routerLink="/about/license" class="link-secondary">License</a>
                </li>
                <li class="list-inline-item">
                  <a routerLink="/about/manual" class="link-secondary">
                    <svg class="icon text-pink icon-inline icon-4"><use href="tabler-icons.svg#heart"></use></svg>
                    iCmon IoT
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <!-- Copyright -->
          <div class="col-12 col-lg-auto mt-3 mt-lg-0">
            <ul class="list-inline list-inline-dots mb-0">
              <li class="list-inline-item">
                Copyright &copy; <a routerLink="/" class="link-secondary">iCmon</a>
                {{ currentYear }}. All rights reserved.
              </li>
              <li class="list-inline-item" *ngIf="showVersion">{{ appVersion }}</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterBarComponent {
  @Input() compact = false;
  @Input() minimal = false;
  @Input() showVersion = true;
  @Input() appVersion = 'v2.0.0';

  currentYear = new Date().getFullYear();
}
```
