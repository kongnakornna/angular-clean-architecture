# iCmon → Angular Layout Architecture

## Mapping: PHP Template → Angular Module/Component

| PHP Template | Angular Layout | Usage |
|---|---|---|
| `template.php` | `ClassicLayoutComponent` | Standard horizontal navbar + content + footer |
| `template1.php` / `template2.php` / `template3.php` | `BlankLayoutComponent` | Content-only, no chrome |
| `templateiot.php` | `IotLayoutComponent` | IoT variant with horizontal navbar |
| `templater1.php` | `R1LayoutComponent` | R1 variant with custom navbar |
| `templatevertical.php` | `VerticalLayoutComponent` | Sidebar + header + footer |
| `templatevertical2.php` | `VerticalCompactLayoutComponent` | Sidebar v2 (compact footer) |
| `templatevertical3.php` | `VerticalMinimalLayoutComponent` | Sidebar only, no footer |
| `templatevertical4.php` | `VerticalIotLayoutComponent` | Sidebar + IoT dashboard wrapper |
| `iframe.php` | `IframeLayoutComponent` | Dark theme, no navbar, minimal |

## Component → PHP Partial Mapping

| Angular Component | PHP Partial(s) | Role |
|---|---|---|
| `ClassicHeaderComponent` | `header.php` + `navbar.php` + `navbar_item.php` | DOCTYPE + `<head>` + top navbar |
| `VerticalSidebarComponent` | `header_vertical.php` + `navbar_vertical.php` | DOCTYPE + `<head>` + vertical sidebar |
| `IotNavbarComponent` | `headeriot.php` + `navbariot.php` | IoT navbar |
| `IframeHeaderComponent` | `headeriframe.php` | Minimal dark header, no body/nav |
| `FooterBarComponent` | `footer.php` | Full footer + copyright + links |
| `FooterCompactComponent` | `footer_vertical2.php` | Simplified footer (no links) |
| `FooterMinimalComponent` | `footer_vertical4.php` | Minimal footer |
| `FooterIframeComponent` | `footeriframe.php` | Scripts only, no footer HTML |
| `SettingsPanelComponent` | `theme_setting.php` + `theme_builder.php` | Offcanvas Theme Builder |
| `NotificationDropdownComponent` | `navbar_notifications_*.php` | Notification bell + dropdown |
| `LanguageSelectorComponent` | `navbar_lang.php` | Language switcher |
| `ThemeToggleComponent` | `navbar_theme.php` | Dark/Light toggle |
| `UserDropdownComponent` | `navbar_item.php` (user avatar part) | Profile menu dropdown |
| `HorizontalMenuComponent` | `navbar_menu*.php` (all menus) | Horizontal nav links |
| `SidebarMenuComponent` | `navbar_menu_*.php` (vertical menus) | Vertical sidebar nav items |
| `PageWrapperComponent` | `pagewrapper_*.php` | Optional page wrapper div |
| `PageHeaderComponent` | (already exists) | Page title bar |
| `AuthLayoutComponent` | (already exists) | Login/register centered layout |

## Module Organization

```
layouts/
├── classic/           ← template.php (horizontal)
├── vertical/          ← templatevertical.php
├── vertical-compact/  ← templatevertical2.php
├── vertical-minimal/  ← templatevertical3.php
├── vertical-iot/      ← templatevertical4.php
├── iot/               ← templateiot.php
├── r1/                ← templater1.php
├── iframe/            ← iframe.php
├── blank/             ← template1~3.php
├── shared/            ← shared components (header, sidebar, footer, settings)
│   ├── header/
│   ├── sidebar/
│   ├── footer/
│   ├── settings-panel/
│   ├── notifications/
│   ├── language-selector/
│   ├── theme-toggle/
│   └── user-dropdown/
└── layout-service/
```

## Route Integration

```typescript
const routes: Routes = [
  // AUTH
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', ... },
      { path: 'register', ... },
    ],
  },
  // CLASSIC (horizontal navbar)
  {
    path: '',
    component: ClassicLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', ... },
      { path: 'reports', ... },
    ],
  },
  // VERTICAL (sidebar)
  {
    path: 'app',
    component: VerticalLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', ... },
      { path: 'settings', ... },
    ],
  },
  // IOT
  {
    path: 'iot',
    component: IotLayoutComponent,
    canActivate: [AuthGuard, IotGuard],
    children: [
      { path: 'devices', ... },
      { path: 'monitoring', ... },
    ],
  },
  // IFRAME (embedded)
  {
    path: 'embed',
    component: IframeLayoutComponent,
    children: [
      { path: 'widget/:id', ... },
    ],
  },
  // BLANK (no chrome)
  {
    path: 'blank',
    component: BlankLayoutComponent,
    children: [
      { path: 'page', ... },
    ],
  },
];
```

## LayoutService (shared across all layouts)

Uses the same signals pattern as the existing `LayoutService` but extends it with layout-specific state:

```typescript
@Injectable({ providedIn: 'root' })
export class LayoutService {
  // Existing theme signals...
  readonly theme = computed(...);
  readonly sidebarCollapsed = signal(false);
  readonly activeLayout = signal<'classic' | 'vertical' | 'iot' | 'iframe' | 'blank'>('classic');
  readonly navbarStyle = signal<'horizontal' | 'vertical'>('horizontal');
  readonly showFooter = signal(true);
  readonly footerVariant = signal<'full' | 'compact' | 'minimal' | 'none'>('full');
  readonly darkMode = signal(false);

  toggleSidebar(): void { this.sidebarCollapsed.update(v => !v); }
  setLayout(layout: string): void { ... }
}
```
