# Shared Components

## Page Wrapper Variants

### DashboardWrapperComponent (PHP: `pagewrapper_dasdboard.php`)

```typescript
import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard-wrapper',
  standalone: true,
  imports: [NgIf],
  template: `
    <!-- PHP: pagewrapper_dasdboard.php — wraps dashboard content -->
    <div class="dashboard-wrapper" [ngClass]="class">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .dashboard-wrapper { padding: 1rem 0; }
  `],
})
export class DashboardWrapperComponent {
  @Input() class = '';
}
```

### IotDashboardWrapperComponent (PHP: `pagewrapper_dasdboard_iot.php`)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-iot-dashboard-wrapper',
  standalone: true,
  template: `
    <!-- PHP: pagewrapper_dasdboard_iot.php — IoT-specific dashboard header -->
    <div class="iot-dashboard-header">
      <div class="container-xl">
        <div class="row g-3 align-items-center mb-3">
          <div class="col">
            <h2 class="page-title">
              <i-tabler name="device-desktop" class="icon me-2"></i-tabler>
              IoT Dashboard
            </h2>
          </div>
          <div class="col-auto">
            <div class="btn-list">
              <a href="javascript:void(0)" class="btn btn-outline-primary btn-sm">
                <i-tabler name="refresh" class="icon"></i-tabler> Refresh
              </a>
              <a href="javascript:void(0)" class="btn btn-primary btn-sm">
                <i-tabler name="plus" class="icon"></i-tabler> Add Device
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class IotDashboardWrapperComponent {}
```

### PageWrapperComponent (PHP: `pagewrapper_seeting.php`)

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-wrapper',
  standalone: true,
  template: `
    <!-- PHP: pagewrapper_seeting.php — settings page wrapper (optional) -->
    <div class="page-wrapper-settings" *ngIf="visible">
      <div class="container-xl">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class PageWrapperComponent {
  @Input() visible = true;
}
```

### PageWrapperR1Component (PHP: `pagewrapper_seetingr1.php`)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-page-wrapper-r1',
  standalone: true,
  template: `
    <div class="page-wrapper-r1">
      <ng-content></ng-content>
    </div>
  `,
})
export class PageWrapperR1Component {}
```

### PageWrapperVerticalComponent (PHP: `pagewrapper_seeting_vertical.php`)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-page-wrapper-vertical',
  standalone: true,
  template: `
    <div class="page-wrapper-vertical">
      <ng-content></ng-content>
    </div>
  `,
})
export class PageWrapperVerticalComponent {}
```

---

## Sidebar Variants

### VerticalSidebarV2Component (PHP: `navbar_vertical-l2.php`)

```typescript
import { Component, Input, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-vertical-sidebar-v2',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, RouterLinkActive],
  template: `
    <aside class="navbar navbar-vertical navbar-expand-lg"
           [class.navbar-collapsed]="isCollapsed">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button"
                (click)="collapsed = !collapsed">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-brand navbar-brand-autodark">
          <a routerLink="/">
            <img src="assets/img/logo/logo-dark.png" width="80" height="15"
                 class="navbar-brand-image" alt="iCmon" />
          </a>
        </div>
        <div class="collapse navbar-collapse" id="sidebar-menu"
             [class.show]="!collapsed">
          <ul class="navbar-nav pt-lg-3">
            <li *ngFor="let item of menuItems" class="nav-item">
              <a *ngIf="!item.children" class="nav-link"
                 routerLink="{{ item.route }}" routerLinkActive="active">
                <i-tabler [name]="item.icon" class="icon me-2"></i-tabler>
                <span class="nav-link-title">{{ item.label }}</span>
              </a>
              <div *ngIf="item.children" class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="javascript:void(0)"
                   (click)="toggleSubmenu(item.label)">
                  <i-tabler [name]="item.icon" class="icon me-2"></i-tabler>
                  <span class="nav-link-title">{{ item.label }}</span>
                </a>
                <div class="dropdown-menu" [class.show]="isExpanded(item.label)">
                  <a *ngFor="let child of item.children" class="dropdown-item"
                     routerLink="{{ child.route }}" routerLinkActive="active">
                    {{ child.label }}
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  `,
})
export class VerticalSidebarV2Component {
  @Input() isCollapsed = false;
  collapsed = false;
  private router = inject(Router);

  expandedMenus = new Set<string>();

  menuItems = [
    { label: 'Home', icon: 'home', route: '/' },
    { label: 'Dashboard', icon: 'layout-dashboard', route: '/dashboard' },
    {
      label: 'Settings', icon: 'settings',
      children: [
        { label: 'General', route: '/settings' },
        { label: 'User', route: '/settings/user' },
        { label: 'Admin', route: '/settings/admin' },
        { label: 'Developer', route: '/settings/dev' },
        { label: 'End User', route: '/settings/enduser' },
        { label: 'Vertical', route: '/settings/vertical' },
      ],
    },
    {
      label: 'Smart Building', icon: 'building',
      children: [
        { label: 'Overview', route: '/smartbuilding' },
        { label: 'Floors', route: '/smartbuilding/floors' },
        { label: 'Devices', route: '/smartbuilding/devices' },
      ],
    },
    {
      label: 'Smart Home', icon: 'home',
      children: [
        { label: 'Devices', route: '/smarthome' },
        { label: 'Scenes', route: '/smarthome/scenes' },
        { label: 'Automation', route: '/smarthome/automation' },
      ],
    },
  ];

  toggleSubmenu(label: string): void {
    if (this.expandedMenus.has(label)) this.expandedMenus.delete(label);
    else this.expandedMenus.add(label);
  }
  isExpanded(label: string): boolean {
    return this.expandedMenus.has(label);
  }
}
```

### VerticalSidebarV3Component (PHP: `navbar_vertical-l3.php`)

```typescript
import { Component, Input, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-vertical-sidebar-v3',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, RouterLinkActive],
  template: `
    <aside class="navbar navbar-vertical navbar-expand-lg"
           [class.navbar-collapsed]="isCollapsed">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button"
                (click)="collapsed = !collapsed">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-brand navbar-brand-autodark">
          <a routerLink="/">
            <img src="assets/img/logo/logo-dark.png" width="80" height="15"
                 class="navbar-brand-image" alt="iCmon" />
          </a>
        </div>
        <div class="collapse navbar-collapse" id="sidebar-menu"
             [class.show]="!collapsed">
          <ul class="navbar-nav pt-lg-3">
            <li *ngFor="let item of menuItems" class="nav-item">
              <a class="nav-link" routerLink="{{ item.route }}"
                 routerLinkActive="active">
                <i-tabler [name]="item.icon" class="icon me-2"></i-tabler>
                <span class="nav-link-title">{{ item.label }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  `,
})
export class VerticalSidebarV3Component {
  @Input() isCollapsed = false;
  collapsed = false;

  // Simpler flat menu (no dropdowns) — matches navbar_vertical-l3.php style
  menuItems = [
    { label: 'Home', icon: 'home', route: '/' },
    { label: 'Dashboard', icon: 'layout-dashboard', route: '/dashboard' },
    { label: 'Devices', icon: 'device-desktop', route: '/devices' },
    { label: 'Monitoring', icon: 'activity', route: '/monitoring' },
    { label: 'Reports', icon: 'chart-bar', route: '/reports' },
    { label: 'Settings', icon: 'settings', route: '/settings' },
  ];
}
```

---

## Notification Components

### NotificationDropdownComponent (PHP: `navbar_notifications_all.php` / `navbar_notifications_air.php` / `navbar_notifications_tab.php`)

```typescript
import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface AppNotification {
  id: number;
  title: string;
  time: string;
  icon: string;
  color: string;
  read: boolean;
}

@Component({
  selector: 'app-notification-dropdown',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  template: `
    <div class="nav-item dropdown">
      <a class="nav-link px-2" href="javascript:void(0)" data-bs-toggle="dropdown"
         aria-label="Notifications">
        <svg class="icon icon-2"><!-- bell icon --></svg>
        <span *ngIf="unreadCount" class="badge bg-red badge-pill">{{ unreadCount }}</span>
      </a>
      <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow"
           [class.dropdown-menu-lg]="showAll">
        <div class="dropdown-header d-flex">
          <span class="h5 mb-0">{{ title }}</span>
          <a *ngIf="showAllLink" routerLink="/notifications"
             class="ms-auto text-secondary">View all</a>
        </div>
        <a *ngFor="let n of notifications" class="dropdown-item"
           [class.text-secondary]="n.read"
           href="javascript:void(0)">
          <span class="badge bg-{{ n.color }} me-2">{{ n.icon }}</span>
          {{ n.title }}
          <small class="text-secondary ms-auto">{{ n.time }}</small>
        </a>
        <div *ngIf="notifications.length === 0" class="dropdown-item text-center text-secondary">
          No notifications
        </div>
      </div>
    </div>
  `,
  styles: [`
    .badge-pill { position: absolute; top: 0; right: 0; }
  `],
})
export class NotificationDropdownComponent {
  @Input() title = 'Notifications';
  @Input() showAll = false;
  @Input() showAllLink = true;
  @Input() notifications: AppNotification[] = [];
  @Input() unreadCount = 0;
}
```

---

## SettingsPanelComponent (PHP: `theme_setting.php` + `theme_builder.php`)

```typescript
import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { LayoutService } from '../../../core/services/layout.service';

@Component({
  selector: 'app-settings-panel',
  standalone: true,
  imports: [NgFor],
  template: `
    <!-- PHP: theme_setting.php — floating settings button -->
    <div class="settings">
      <a href="javascript:void(0)" class="btn btn-floating btn-icon btn-primary"
         data-bs-toggle="offcanvas" data-bs-target="#offcanvasSettings"
         aria-label="Theme Settings">
        <svg class="icon icon-1"><!-- settings icon --></svg>
      </a>

      <!-- PHP: theme_builder.php — offcanvas panel -->
      <form class="offcanvas offcanvas-start offcanvas-narrow" tabindex="-1"
            id="offcanvasSettings">
        <div class="offcanvas-header">
          <h2 class="offcanvas-title">Theme Builder</h2>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas"
                  aria-label="Close"></button>
        </div>
        <div class="offcanvas-body d-flex flex-column">
          <!-- Color mode -->
          <div class="mb-3">
            <label class="form-label">Color mode</label>
            <div class="btn-group w-100">
              <input type="radio" class="btn-check" name="theme"
                     id="theme-light" value="light" autocomplete="off"
                     [checked]="layout.theme() === 'light'"
                     (change)="update('theme', 'light')">
              <label class="btn" for="theme-light">
                <svg class="icon"><!-- sun --></svg> Light
              </label>
              <input type="radio" class="btn-check" name="theme"
                     id="theme-dark" value="dark" autocomplete="off"
                     [checked]="layout.theme() === 'dark'"
                     (change)="update('theme', 'dark')">
              <label class="btn" for="theme-dark">
                <svg class="icon"><!-- moon --></svg> Dark
              </label>
            </div>
          </div>

          <!-- Color scheme (12 colors) -->
          <div class="mb-3">
            <label class="form-label">Color scheme</label>
            <div class="row g-1">
              <div *ngFor="let t of themes" class="col-3">
                <input type="radio" class="btn-check" name="theme-primary"
                       [id]="'theme-' + t.key" [value]="t.key" autocomplete="off"
                       [checked]="layout.themePrimary() === t.key"
                       (change)="update('theme-primary', t.key)">
                <label class="btn btn-icon w-100" [for]="'theme-' + t.key"
                       [style.background]="t.color">
                  <span class="text-white" *ngIf="layout.themePrimary() === t.key">✓</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Font family -->
          <div class="mb-3">
            <label class="form-label">Font family</label>
            <div class="btn-group w-100">
              <input *ngFor="let f of fonts" type="radio" class="btn-check"
                     name="theme-font" [id]="'font-' + f.value" [value]="f.value"
                     autocomplete="off"
                     [checked]="layout.themeFont() === f.value"
                     (change)="update('theme-font', f.value)">
              <label class="btn" [for]="'font-' + f.value">{{ f.label }}</label>
            </div>
          </div>

          <!-- Theme base -->
          <div class="mb-3">
            <label class="form-label">Theme base</label>
            <div class="btn-group w-100">
              <input *ngFor="let b of bases" type="radio" class="btn-check"
                     name="theme-base" [id]="'base-' + b.value" [value]="b.value"
                     autocomplete="off"
                     [checked]="layout.themeBase() === b.value"
                     (change)="update('theme-base', b.value)">
              <label class="btn" [for]="'base-' + b.value">{{ b.label }}</label>
            </div>
          </div>

          <!-- Corner radius -->
          <div class="mb-3">
            <label class="form-label">Corner radius</label>
            <div class="btn-group w-100">
              <input *ngFor="let r of radii" type="radio" class="btn-check"
                     name="theme-radius" [id]="'radius-' + r.value" [value]="r.value"
                     autocomplete="off"
                     [checked]="layout.themeRadius() === r.value"
                     (change)="update('theme-radius', r.value)">
              <label class="btn" [for]="'radius-' + r.value">{{ r.label }}</label>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-auto space-y">
            <button type="button" class="btn w-100" (click)="reset()">
              Reset changes
            </button>
            <a href="javascript:void(0)" class="btn btn-primary w-100"
               data-bs-dismiss="offcanvas">
              Save settings
            </a>
          </div>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .settings { position: fixed; bottom: 2rem; right: 2rem; z-index: 1050; }
  `],
})
export class SettingsPanelComponent {
  protected layout = inject(LayoutService);

  themes = [
    { key: 'blue', color: '#206bc4' }, { key: 'azure', color: '#4299e1' },
    { key: 'indigo', color: '#4263eb' }, { key: 'purple', color: '#ae3ec9' },
    { key: 'pink', color: '#d6336c' }, { key: 'red', color: '#d63939' },
    { key: 'orange', color: '#f76707' }, { key: 'yellow', color: '#f59f00' },
    { key: 'lime', color: '#74b816' }, { key: 'green', color: '#2fb344' },
    { key: 'teal', color: '#0ca678' }, { key: 'cyan', color: '#17a2b8' },
  ];
  fonts = [
    { label: 'Sans', value: 'sans-serif' },
    { label: 'Serif', value: 'serif' },
    { label: 'Mono', value: 'monospace' },
    { label: 'Comic', value: 'comic' },
  ];
  bases = [
    { label: 'Slate', value: 'slate' },
    { label: 'Gray', value: 'gray' },
    { label: 'Zinc', value: 'zinc' },
    { label: 'Neutral', value: 'neutral' },
    { label: 'Stone', value: 'stone' },
  ];
  radii = [
    { label: '0', value: '0' },
    { label: '0.5', value: '0.5' },
    { label: '1', value: '1' },
    { label: '1.5', value: '1.5' },
    { label: '2', value: '2' },
  ];

  update(key: string, value: string): void {
    this.layout.update(key, value);
  }
  reset(): void {
    this.layout.reset();
  }
}
```

---

## LanguageSelectorComponent (PHP: `navbar_lang.php`)

```typescript
import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="nav-item dropdown">
      <a class="nav-link px-2" href="javascript:void(0)" data-bs-toggle="dropdown"
         aria-label="Language">
        <svg class="icon icon-2"><!-- globe icon --></svg>
        <span class="d-none d-md-inline ms-1">{{ currentLang }}</span>
      </a>
      <div class="dropdown-menu dropdown-menu-end">
        <a *ngFor="let lang of languages" class="dropdown-item"
           href="javascript:void(0)" (click)="switchLang(lang.code)">
          <span class="me-2">{{ lang.flag }}</span> {{ lang.name }}
        </a>
      </div>
    </div>
  `,
})
export class LanguageSelectorComponent {
  currentLang = 'EN';
  languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  ];

  switchLang(code: string): void {
    this.currentLang = code.toUpperCase();
    // Use TranslateService to switch language
  }
}
```

---

## Logout Confirmation (SweetAlert2 equivalent)

Since PHP uses SweetAlert2 for logout confirmation, the Angular equivalent uses a dedicated service:

```typescript
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LogoutService {
  constructor(private router: Router) {}

  confirmLogout(): void {
    const confirmed = confirm('Are you sure you want to log out?');
    if (confirmed) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}
```

For a true SweetAlert2 equivalent in Angular, use `@angular/cdk/dialog`:

```typescript
import { Injectable, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LogoutService {
  private dialog = inject(Dialog);
  private router = inject(Router);

  confirmLogout(): void {
    const dialogRef = this.dialog.open<string>(LogoutDialogComponent, {
      data: { title: 'Logout', message: 'Are you sure you want to log out?' },
    });
    dialogRef.closed.subscribe(result => {
      if (result === 'confirm') {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }
}

// LogoutDialogComponent would be a standalone Angular CDK dialog component
```
