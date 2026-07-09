# iCmon — Developer Manual

## 07 — Layouts & UI

### Layout Architecture

```
AppLayoutComponent
├── app-sidebar            # Vertical nav menu (left)
├── app-header             # Top bar (right)
├── <router-outlet>        # Page content
├── app-footer             # Copyright
└── app-layout-settings    # Offcanvas theme panel
```

### Layouts

| Component | Selector | File |
|-----------|----------|------|
| AppLayout | `app-layout` | `layouts/app-layout/app-layout.component.ts` |
| AppHeader | `app-header` | `layouts/header/header.component.ts` |
| AppSidebar | `app-sidebar` | `layouts/sidebar/sidebar.component.ts` |
| AppFooter | `app-footer` | `layouts/footer/footer.component.ts` |
| AppPageHeader | `app-page-header` | `layouts/page-header/page-header.component.ts` |
| AppLayoutSettings | `app-layout-settings` | `layouts/layout-settings/layout-settings.component.ts` |

### Sidebar Menu Structure

```
Dashboard
├─ Jobs
│  ├─ Job List
│  ├─ Kanban Board
│  └─ Create Job
├─ Customers
├─ Quotations
├─ Purchase Orders
├─ Products
├─ Payments
│  └─ Invoices
├─ Documents
├─ Email
│  ├─ Templates
│  ├─ Compose
│  └─ Logs
├─ Batch Jobs
├─ IoT Devices
├─ WOS Orders
├─ Reports
├─ Tabler UI (9 demo items)
└─ System
   ├─ Users
   ├─ Roles
   └─ Language
```

Sidebar state (`expandedMenus: Set<string>`) toggles submenu visibility via `(click)` handlers. Active route detection via `routerLinkActive`.

### Theme Customizer (LayoutSettings)

| Setting | Options | Values |
|---------|---------|--------|
| Color Mode | Light / Dark | `light` / `dark` |
| Color Scheme | 12 colors | `blue`, `green`, `red`, `yellow`, `pink`, `indigo`, `purple`, `orange`, `teal`, `cyan`, `lime`, `violet` |
| Font Family | 4 options | `Default`, `Sans-Serif`, `System UI`, `Mono` |
| Theme Base | 5 options | `Default`, `Carbon`, `Crimson`, `Ocean`, `Forest` |
| Corner Radius | 5 options | `None`, `Small`, `Normal`, `Large`, `Round` |

All settings persist to localStorage via `LayoutService` (`src/app/core/services/layout.service.ts`).

### Theme Switcher (Header toggle)
- `ThemeSwitcherService` (`src/app/core/services/theme-switcher.service.ts`)
- Uses `BehaviorSubject<boolean>` for dark mode state
- Persists to localStorage (`tabler-theme`)
- Applies `data-bs-theme` attribute + `.dark` CSS class

### Shared Components

| Component | Props | Events |
|-----------|-------|--------|
| `PrimaryButton` | `icon, loading, disabled` | `onClick` |
| `ConfirmModal` | `visible, title, message, confirmText, cancelText` | `onConfirm, onCancel` |
| `Toast` | (auto via ToastService) | auto-close after 5s |

### ToastService (`src/app/shared/services/toast.service.ts`)
```typescript
toastService.show({ type: 'success', title: 'สำเร็จ', message: 'บันทึกข้อมูลเรียบร้อย' });
```

### i18n Strategy

**Primary:** `@ngx-translate/core` with `HttpLoader` (`assets/i18n/{en,th}.json`)
**Custom:** `I18nService` (Angular signals) with local datasource containing hard-coded TH/EN translations

`TranslatePipe` wraps `@ngx-translate/core` for the general app. `I18nService` provides signal-based translations for the shared i18n sub-module.