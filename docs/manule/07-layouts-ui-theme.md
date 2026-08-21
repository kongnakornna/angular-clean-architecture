# 07 — Layouts, UI & Theme

## Layout Architecture

```
AppLayoutComponent (layouts/app-layout/)
├── app-sidebar            # เมนูแนวตั้งซ้าย
├── app-header             # Top bar ขวา
├── <router-outlet>        # เนื้อหาหน้า
├── app-footer             # Copyright
└── app-layout-settings    # Offcanvas theme panel
```

Layouts ที่มีทั้งหมด: `app-layout`, `blank`, `classic` (+ auth-layout ใน feature/auth)

| Component | Selector | Path |
|-----------|----------|------|
| AppLayout | `app-layout` | `layouts/app-layout/app-layout.component.ts` |
| AppHeader | `app-header` | `layouts/header/header.component.ts` |
| AppSidebar | `app-sidebar` | `layouts/sidebar/sidebar.component.ts` |
| AppFooter | `app-footer` | `layouts/footer/footer.component.ts` |
| PageHeader | `app-page-header` | `layouts/page-header/page-header.component.ts` |
| LayoutSettings | `app-layout-settings` | `layouts/layout-settings/layout-settings.component.ts` |

## Sidebar

- 30+ menu items + nested submenus (Jobs, Email, System, ...)
- State: `expandedMenus: Set<string>` toggle ผ่าน `(click)`
- Active route: `routerLinkActive`
- เพิ่มเมนูใหม่ → แก้ `layouts/sidebar/sidebar.component.ts`

โครงสร้างเมนูหลัก:

```
Dashboard
├─ Jobs (List / Kanban Board / Create)
├─ Customers
├─ Quotations
├─ Purchase Orders
├─ Products
├─ Payments / Invoices
├─ Documents
├─ Email (Templates / Compose / Logs)
├─ Batch Jobs
├─ IoT Devices / MQTT
├─ WOS Orders
├─ Reports / Analytics
├─ AI Analytics / Monitoring
└─ System (Users / Roles / Language)
```

## Theme Customizer (LayoutSettings offcanvas)

| Setting | Options |
|---------|---------|
| Color Mode | Light / Dark |
| Color Scheme | blue, green, red, yellow, pink, indigo, purple, orange, teal, cyan, lime, violet (12) |
| Font Family | Default, Sans-Serif, System UI, Mono |
| Theme Base | Default, Carbon, Crimson, Ocean, Forest |
| Corner Radius | None, Small, Normal, Large, Round |

ทุกค่า persist ลง localStorage ผ่าน **LayoutService** (`core/services/layout.service.ts`)
ซึ่งใช้ Angular Signals:

```typescript
private state = signal<LayoutState>(this.loadState());
readonly theme = this.state.asReadonly();
readonly font = computed(() => this.state().font);

updateFont(font: string): void {
  this.state.update(s => ({ ...s, font }));
  this.saveState();
}
```

## Dark/Light Switch

- `ThemeSwitcherService` (`core/services/theme-switcher.service.ts`)
- `BehaviorSubject<boolean>` + persist localStorage (`tabler-theme`)
- Apply ผ่าน attribute `data-bs-theme="dark"` + class `.dark`

## Shared Components

| Component | Inputs | Outputs |
|-----------|--------|---------|
| `PrimaryButton` | icon, loading, disabled | onClick |
| `ConfirmModal` | visible, title, message, confirmText, cancelText | onConfirm, onCancel |
| `Toast` | (จัดการผ่าน ToastService) | auto-close 5 วินาที |

### ToastService (`shared/services/toast.service.ts`)

```typescript
this.toastService.show({
  type: 'success',            // success | error | warning | info
  title: 'สำเร็จ',
  message: 'บันทึกข้อมูลเรียบร้อย',
});
```

## Pipes

| Pipe | หน้าที่ |
|------|---------|
| `TranslatePipe` | wrapper ของ @ngx-translate/core |
| `StatusLabelPipe` | สถานะ → label ภาษาไทย |
| `FileSizePipe` | bytes → KB/MB/GB |

## Directives

| Directive | หน้าที่ |
|-----------|---------|
| `ClickOutsideDirective` | emit event เมื่อคลิกนอก element |

## i18n Strategy

1. **@ngx-translate/core** — หลัก โหลดไฟล์จาก `assets/i18n/{en,th,...}.json` ผ่าน HttpLoader
2. **I18nService** — signal-based translations (hard-coded TH/EN) ใน `shared/i18n/`

ภาษาที่รองรับใน assets/i18n/: en, th, zh, vi, my, ms, lo, ko, km, ja

## Styling Stack

- **Tabler SCSS** — import ผ่าน `src/scss/tabler/` (custom theme)
- **Bootstrap 5.3** — grid + utilities
- **Tailwind CSS 3.2** — utility classes (config ใน `tailwind.config.js`)
- Global styles: `src/styles.scss`

> หมายเหตุ: build script เซ็ต `SASS_SILENCE_DEPRECATIONS=import` เพื่อกด Sass warning
