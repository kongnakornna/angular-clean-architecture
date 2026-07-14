# IoT Layout (PHP: `templateiot.php`)

> Horizontal navbar (IOT-specific) + simplified footer + optional IoT page wrapper

## Component Tree

```
IotLayoutComponent
├── IotNavbarComponent          ← headeriot.php + navbariot.php
│   ├── LogoComponent
│   ├── ThemeToggleComponent
│   └── UserDropdownComponent
├── HorizontalMenuComponent     ← navbar_menu_iot.php + sub-menus
├── PageWrapperComponent        ← pagewrapper_seeting (conditional)
├── <router-outlet>
└── FooterIotComponent          ← footeriot.php (simplified)
    └── SettingsPanelComponent  ← theme_setting_iot.php
```

---

## IotLayoutComponent

**iot-layout.component.ts**
```typescript
import { Component, HostBinding, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { LayoutService } from '../../core/services/layout.service';
import { IotNavbarComponent } from './iot-navbar.component';
import { HorizontalMenuComponent } from '../shared/horizontal-menu/horizontal-menu.component';
import { FooterIotComponent } from '../shared/footer/footer-iot.component';
import { SettingsPanelComponent } from '../shared/settings-panel/settings-panel.component';
import { PageWrapperComponent } from '../shared/page-wrapper/page-wrapper.component';

@Component({
  selector: 'app-iot-layout',
  standalone: true,
  imports: [
    NgIf, RouterOutlet,
    IotNavbarComponent,
    HorizontalMenuComponent,
    FooterIotComponent,
    SettingsPanelComponent,
    PageWrapperComponent,
  ],
  template: `
    <!-- PHP: headeriot.php — extracts system_id, location_id from session -->
    <app-iot-navbar
      [systemId]="systemId"
      [locationId]="locationId">
    </app-iot-navbar>

    <!-- PHP: navbar_menu_iot.php and sub-menus -->
    <app-horizontal-menu [menuItems]="iotMenuItems"></app-horizontal-menu>

    <app-page-wrapper *ngIf="layoutSvc.showPageWrapper()"></app-page-wrapper>

    <div class="page-wrapper">
      <main class="page-body" id="content">
        <ng-content select="[page-header]"></ng-content>
        <div class="container-xl">
          <router-outlet></router-outlet>
        </div>
      </main>

      <!-- PHP: footeriot.php — simplified footer -->
      <app-footer-iot></app-footer-iot>
    </div>

    <app-settings-panel></app-settings-panel>
  `,
  styles: [`
    :host { display: block; }
  `],
})
export class IotLayoutComponent implements OnInit {
  protected layoutSvc = inject(LayoutService);
  @HostBinding('class.page') pageClass = true;

  systemId = '';
  locationId = '';

  iotMenuItems = [
    { label: 'Dashboard', icon: 'layout-dashboard', route: '/iot/dashboard' },
    {
      label: 'Monitoring', icon: 'monitor',
      children: [
        { label: 'Real-time', icon: 'activity', route: '/iot/monitoring/realtime' },
        { label: 'History', icon: 'clock', route: '/iot/monitoring/history' },
        { label: 'Alerts', icon: 'alert-triangle', route: '/iot/monitoring/alerts' },
      ],
    },
    {
      label: 'Industry', icon: 'building-factory', route: '/iot/industry',
      children: [
        { label: 'Overview', route: '/iot/industry' },
        { label: 'Equipment', route: '/iot/industry/equipment' },
        { label: 'Production', route: '/iot/industry/production' },
      ],
    },
    {
      label: 'Irrigation', icon: 'droplet', route: '/iot/irrigation',
      children: [
        { label: 'Zones', route: '/iot/irrigation' },
        { label: 'Schedules', route: '/iot/irrigation/schedules' },
      ],
    },
    {
      label: 'Smart City', icon: 'city', route: '/iot/smartcity',
      children: [
        { label: 'Traffic', route: '/iot/smartcity/traffic' },
        { label: 'Lighting', route: '/iot/smartcity/lighting' },
      ],
    },
    {
      label: 'Smart Home', icon: 'home', route: '/iot/smarthome',
      children: [
        { label: 'Devices', route: '/iot/smarthome' },
        { label: 'Scenes', route: '/iot/smarthome/scenes' },
        { label: 'Automation', route: '/iot/smarthome/automation' },
      ],
    },
    { label: 'Reports', icon: 'chart-bar', route: '/iot/reports' },
  ];

  ngOnInit(): void {
    // PHP: extracts $system_id and $location_id from session
    this.systemId = localStorage.getItem('system_id') || '';
    this.locationId = localStorage.getItem('location_id') || '';
  }
}
```

---

## IotNavbarComponent (PHP: `headeriot.php` + `navbariot.php`)

**iot-navbar.component.ts**
```typescript
import { Component, Input, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LayoutService } from '../../../core/services/layout.service';

@Component({
  selector: 'app-iot-navbar',
  standalone: true,
  imports: [NgIf, RouterLink],
  template: `
    <!-- PHP: headeriot.php — DOCTYPE + <head> (same CSS as header.php) -->
    <!-- <head> rendered by index.html, same as classic -->

    <!-- PHP: navbariot.php — body tag + navbar -->
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
          <a routerLink="/iot">
            <img src="assets/img/logo/logo-dark.png" width="80" height="15"
                 class="navbar-brand-image" alt="iCmon IoT" />
            <span class="badge bg-green ms-2">IoT</span>
          </a>
        </div>

        <!-- Right section — simpler than classic (no notifications, no lang) -->
        <div class="navbar-nav flex-row order-md-last">
          <!-- System Info -->
          <div class="nav-item px-2 d-none d-md-flex" *ngIf="systemId">
            <span class="text-secondary small">
              System: {{ systemId }} | Location: {{ locationId }}
            </span>
          </div>

          <!-- Theme toggle -->
          <div class="nav-item">
            <a class="nav-link px-2" href="javascript:void(0)" (click)="layoutSvc.toggleTheme()">
              <svg *ngIf="layoutSvc.theme() === 'light'" class="icon icon-2"><!-- moon --></svg>
              <svg *ngIf="layoutSvc.theme() === 'dark'" class="icon icon-2"><!-- sun --></svg>
            </a>
          </div>

          <!-- User dropdown (same as classic but IoT context) -->
          <div class="nav-item dropdown">
            <a href="javascript:void(0)" class="nav-link d-flex lh-1 p-0 px-2"
               data-bs-toggle="dropdown">
              <span class="avatar avatar-sm"
                    style="background-image: url(assets/img/cmon.png)"></span>
              <div class="d-none d-xl-block ps-2">
                <div>{{ username }}</div>
                <div class="mt-1 small text-secondary">IoT Operator</div>
              </div>
            </a>
            <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <a class="dropdown-item" routerLink="/iot/dashboard">Dashboard</a>
              <a class="dropdown-item" routerLink="/user/profile">Profile</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" routerLink="/iot/settings">Settings</a>
              <a class="dropdown-item" (click)="logout()">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
})
export class IotNavbarComponent {
  @Input() systemId = '';
  @Input() locationId = '';
  protected layoutSvc = inject(LayoutService);
  username = 'IoT Admin';

  logout(): void {
    localStorage.clear();
    window.location.href = '/login';
  }
}
```

---

## FooterIotComponent (PHP: `footeriot.php`)

**footer-iot.component.ts**
```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer-iot',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer footer-transparent d-print-none">
      <div class="container-xl">
        <div class="row text-center align-items-center flex-row-reverse">
          <div class="col-12 col-lg-auto mt-3 mt-lg-0">
            <ul class="list-inline list-inline-dots mb-0">
              <li class="list-inline-item">
                Copyright &copy; <a routerLink="/" class="link-secondary">iCmon IoT</a>
                {{ currentYear }}. All rights reserved.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterIotComponent {
  currentYear = new Date().getFullYear();
}
```
