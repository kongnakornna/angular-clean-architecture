# Iframe Layout (PHP: `iframe.php`)

> Dark theme embedded layout — no navbar, minimal footer, `data-bs-theme="dark"` on `<html>`

## Design Notes

- PHP `headeriframe.php` sets `data-bs-theme="dark"` on `<html>` tag (unique among all headers)
- No `<body>` tag or navbar loaded — just minimal HTML shell
- `footeriframe.php` has NO footer HTML — only closing script tags and `</body></html>`
- Theme Builder is **commented out** in footer
- Used for embedded widgets, dashboards in iframes, or dark-themed full-page views

## Component Tree

```
IframeLayoutComponent
├── IframeHeaderComponent       ← headeriframe.php (theme="dark", no navbar)
├── <router-outlet>             ← dynamic content
└── FooterIframeComponent       ← footeriframe.php (empty — only scripts)
```

---

## IframeLayoutComponent

```typescript
import { Component, HostBinding, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutService } from '../../core/services/layout.service';

@Component({
  selector: 'app-iframe-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <!-- PHP: headeriframe.php — <html data-bs-theme="dark"> applied via HostBinding -->
    <!-- No navbar — matches PHP behavior -->

    <main id="content">
      <ng-content select="[page-header]"></ng-content>
      <router-outlet></router-outlet>
    </main>

    <!-- PHP: footeriframe.php — no footer HTML, only scripts.
         Angular scripts managed by angular.json, not here. -->
  `,
  styles: [`
    :host { display: block; min-height: 100vh; }
  `],
})
export class IframeLayoutComponent implements OnInit, OnDestroy {
  private layoutSvc = inject(LayoutService);
  private previousTheme = '';

  @HostBinding('class.page') pageClass = true;
  @HostBinding('attr.data-bs-theme') theme = 'dark';

  ngOnInit(): void {
    // Save current theme and force dark
    this.previousTheme = this.layoutSvc.theme();
    this.layoutSvc.update('theme', 'dark');
    document.documentElement.setAttribute('data-bs-theme', 'dark');
  }

  ngOnDestroy(): void {
    // Restore previous theme when navigating away
    if (this.previousTheme) {
      this.layoutSvc.update('theme', this.previousTheme);
      document.documentElement.setAttribute('data-bs-theme', this.previousTheme);
    }
  }
}
```

---

## IframeHeaderComponent (PHP: `headeriframe.php`)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-iframe-header',
  standalone: true,
  template: `
    <!-- PHP: headeriframe.php — DOCTYPE + <head> with data-bs-theme="dark"
         <head> content handled by index.html; theme set by layout component.

         No body tag, no navbar — just the head section.
         This component is intentionally minimal/empty because all
         head-level metadata is managed by Angular's index.html.
    -->
    <!-- Minimal branding for iframe context -->
    <div class="d-flex align-items-center p-2 border-bottom border-dark">
      <img src="assets/img/logo/logo-light.png" width="60" height="11" alt="iCmon" />
      <span class="ms-2 small text-secondary">Embedded view</span>
    </div>
  `,
})
export class IframeHeaderComponent {}
```
