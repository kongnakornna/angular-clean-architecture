# THEMAPP — Tabler → Angular Architecture Design

## 1. เป้าหมาย

ย้าย Tabler UI (Liquid templates + compiled CSS/JS) มาเป็น Angular component structure
โดยอิงโครงสร้างจาก 3 directories หลัก:

```
src/assets/tabler/
├── dist/          →  compiled CSS/JS (ใช้ตรง ไม่ต้อง rebuild)
├── includes/      →  reusable partials → Angular Components
└── layouts/       →  page skeletons → Angular Layout Components
```

---

## 2. Source Mapping: Liquid → Angular

### 2.1 Layouts (Skeletons)

| Liquid File | Angular Component | บทบาท |
|-------------|------------------|--------|
| `layouts/base.html` | `BaseLayoutComponent` | ราก: html/head/body, theme script, global includes |
| `layouts/default.html` | `DefaultLayoutComponent` | หลัก: sidebar + navbar + page-header + content + footer |
| `layouts/error.html` | `ErrorLayoutComponent` | หน้า error (centered content) |
| `layouts/homepage.html` | `HomepageLayoutComponent` | หน้าแรก (full-width marketing) |
| `layouts/marketing.html` | `MarketingLayoutComponent` | marketing pages |
| `layouts/prose.html` | `ProseLayoutComponent` | เนื้อหาเอกสาร |
| `layouts/single.html` | `SingleLayoutComponent` | หน้าเดี่ยว clean |
| `layouts/redirect.html` | `RedirectComponent` | เปลี่ยนเส้นทาง |
| `layouts/card.html` | `CardLayoutComponent` | card-centric layout |
| `layouts/pay.html` | `PayLayoutComponent` | หน้าชำระเงิน |
| `layouts/settings.html` | `SettingsLayoutComponent` | หน้าการตั้งค่า |

Layout structure hierarchy:

```
BaseLayoutComponent
├── ThemeScript (inline dist/js/tabler-theme.js)
├── ng-content
└── GlobalModals / Settings / JS

DefaultLayoutComponent extends BaseLayoutComponent
├── SidebarComponent
├── NavbarComponent
├── PageHeaderComponent
├── ng-content (page body)
└── FooterComponent
```

### 2.2 Includes: Layout Partials

| Liquid File | Angular Component | Properties |
|-------------|------------------|------------|
| `layout/navbar.html` | `NavbarComponent` | `@Input()` condensed, dark, sticky, overlap, transparent, hideBrand, hideMenu, hideSearch, showTheme, showNotifications, showApps, showLanguage, showUser |
| `layout/sidebar.html` | `SidebarComponent` | `@Input()` end, dark, transparent, hideBrand |
| `layout/footer.html` | `FooterComponent` | — |
| `layout/page-header.html` | `PageHeaderComponent` | `@Input()` title, pretitle, description, icon, actions |
| `layout/navbar-menu.html` | `NavbarMenuComponent` | `@Input()` items: NavItem[] |
| `layout/navbar-search.html` | `NavbarSearchComponent` | — |
| `layout/navbar-logo.html` | `NavbarLogoComponent` | `@Input()` smallLogo, hideLogo, showTitle |
| `layout/navbar-side.html` | `NavbarSideComponent` | `@Input()` items: NavSideItem[] |
| `layout/navbar-toggler.html` | `NavbarTogglerComponent` | `@Input()` target |
| `layout/skip-link.html` | `SkipLinkComponent` | — |
| `layout/banner.html` | `BannerComponent` | — |
| `layout/headers/*.html` | `HeaderActionsComponent` | — |
| `layout/css.html` | — → ใช้ via angular.json | — |
| `layout/js.html` | — → ใช้ via angular.json | — |
| `layout/js-libs.html` | — → ใช้ via angular.json | — |
| `layout/og.html` | `OgMetaComponent` | `@Input()` title, description, image, url |
| `layout/analytics.html` | — → ใช้ environment config | — |
| `layout/sentry.html` | — → ใช้ environment config | — |

### 2.3 Includes: UI Components

| Liquid File | Angular Component | บทบาท |
|-------------|------------------|--------|
| `ui/accordion.html` | `AccordionComponent` | Accordion/collapse |
| `ui/alert.html` | `AlertComponent` | Alert messages |
| `ui/avatar.html` | `AvatarComponent` | User avatar |
| `ui/avatar-list.html` | `AvatarListComponent` | Avatar stack |
| `ui/avatar-upload.html` | `AvatarUploadComponent` | Avatar upload |
| `ui/badge.html` | `BadgeComponent` | Badge/tag |
| `ui/breadcrumb.html` | `BreadcrumbComponent` | Breadcrumb nav |
| `ui/button.html` | `ButtonComponent` | ปุ่ม + loading/spinner/icon |
| `ui/button-group.html` | `ButtonGroupComponent` | Group buttons |
| `ui/card-dropdown.html` | `CardDropdownComponent` | Card dropdown |
| `ui/card-title.html` | `CardTitleComponent` | Card title helper |
| `ui/carousel.html` | `CarouselComponent` | Bootstrap carousel |
| `ui/chart.html` | `ChartComponent` | Chart wrapper |
| `ui/chart-heatmap.html` | `ChartHeatmapComponent` | Heatmap chart |
| `ui/chart-sparkline.html` | `ChartSparklineComponent` | Sparkline chart |
| `ui/chat.html` | `ChatComponent` | Chat widget |
| `ui/colorpicker.html` | `ColorpickerComponent` | Color picker |
| `ui/datepicker.html` | `DatepickerComponent` | Date picker |
| `ui/dropdown.html` | `DropdownComponent` | Dropdown menu |
| `ui/dropdown-menu.html` | `DropdownMenuComponent` | Dropdown menu items |
| `ui/dropdown-menu-all.html` | — | ใช้ร่วมกับ DropdownComponent |
| `ui/dropzone.html` | `DropzoneComponent` | File upload zone |
| `ui/empty.html` | `EmptyStateComponent` | Empty state |
| `ui/flag.html` | `FlagComponent` | Flag icon |
| `ui/form/` | `FormFieldComponent` | Form field group |
| `ui/fullcalendar.html` | `FullcalendarComponent` | Calendar |
| `ui/hr.html` | `HrComponent` | Divider |
| `ui/icon.html` | `IconComponent` | SVG icon |
| `ui/illustration.html` | `IllustrationComponent` | Illustration |
| `ui/inline-player.html` | `InlinePlayerComponent` | Video player |
| `ui/map.html` | `MapComponent` | Map |
| `ui/map-vector.html` | `MapVectorComponent` | Vector map |
| `ui/modal.html` | `ModalComponent` | Modal dialog |
| `ui/modal/` | — | Modal sub-components |
| `ui/nav.html` | `NavComponent` | Nav tabs/pills |
| `ui/nav-segmented.html` | `NavSegmentedComponent` | Segmented nav |
| `ui/pagination.html` | `PaginationComponent` | Pagination |
| `ui/payment.html` | `PaymentIconComponent` | Payment method icon |
| `ui/photo.html` | `PhotoComponent` | Photo/image |
| `ui/progress.html` | `ProgressComponent` | Progress bar |
| `ui/progress-description.html` | `ProgressDescriptionComponent` | Progress with label |
| `ui/progress-steps.html` | `ProgressStepsComponent` | Step progress |
| `ui/progressbg.html` | `ProgressBgComponent` | Background progress |
| `ui/range.html` | `RangeSliderComponent` | Range slider |
| `ui/rating.html` | `RatingComponent` | Star rating |
| `ui/responsive-image.html` | `ResponsiveImageComponent` | Responsive image |
| `ui/ribbon.html` | `RibbonComponent` | Ribbon badge |
| `ui/select.html` | `SelectComponent` | Custom select |
| `ui/shape.html` | `ShapeComponent` | Shape divider |
| `ui/signature.html` | `SignatureComponent` | Signature pad |
| `ui/spinner.html` | `SpinnerComponent` | Loading spinner |
| `ui/stars.html` | `StarsComponent` | Star display |
| `ui/status.html` | `StatusComponent` | Status indicator |
| `ui/status-dot.html` | `StatusDotComponent` | Status dot |
| `ui/status-indicator.html` | `StatusIndicatorComponent` | Status indicator |
| `ui/steps.html` | `StepsComponent` | Step wizard |
| `ui/switch-icon.html` | `SwitchIconComponent` | Toggle icon |
| `ui/table.html` | `TableComponent` | Table wrapper |
| `ui/tag.html` | `TagComponent` | Tag chip |
| `ui/timeline.html` | `TimelineComponent` | Timeline |
| `ui/toast.html` | `ToastComponent` | Toast notification |
| `ui/tracking.html` | `TrackingComponent` | Tracking pixel |
| `ui/trending.html` | `TrendingComponent` | Trending indicator |
| `ui/typed.html` | `TypedComponent` | Typed animation |
| `ui/wysiwyg.html` | `WysiwygComponent` | Rich text editor |
| `ui/advanced-table.html` | `AdvancedTableComponent` | Data table with features |
| `ui/svg.html` | `SvgComponent` | Inline SVG |

### 2.4 Includes: Cards (Composite Widgets)

ทั้งหมด 79 files → กลุ่ม widgets/pages ที่ประกอบจาก UI components

| กลุ่ม | ตัวอย่าง | Angular |
|-------|----------|---------|
| `cards/activity.html` | Activity feed card | `CardActivityComponent` |
| `cards/sign-in.html` | Sign-in form card | `CardSignInComponent` |
| `cards/sign-up.html` | Sign-up form card | `CardSignUpComponent` |
| `cards/profile.html` | Profile card | `CardProfileComponent` |
| `cards/pricing-card.html` | Pricing card | `CardPricingComponent` |
| `cards/stat-card.html` | Stat card | `CardStatComponent` |
| `cards/small-stats.html` | Small stats | `CardSmallStatsComponent` |
| ... | (77 more) | `Card*Component` pattern |

### 2.5 Includes: Forms

| Liquid File | Angular |
|-------------|---------|
| `forms/form-elements-1.html` | `FormElementsComponent` |
| `forms/form-elements-2.html` | — |
| `forms/form-elements-3.html` | — |
| `forms/form-elements-4.html` | — |
| `forms/form-elements-5.html` | — |
| `forms/form-elements-6.html` | — |
| `forms/sign-in.html` | — |

### 2.6 Includes: Other

| Directory | Angular Feature | บทบาท |
|-----------|----------------|--------|
| `marketing/` | `@tabler/marketing` | Hero sections, brand strips, section dividers |
| `docs/` | `@tabler/docs` | Docs page components (menu, TOC, code example) |
| `parts/` | `@tabler/parts` | Datagrid, calendar, activity, demo-layout |
| `example/` | `@tabler/example` | Example code blocks |
| `js/` | — | JS library wrappers (countup, nouislider) |

---

## 3. Angular Project Structure

```
src/app/
├── core/                              # Singleton services, guards, interceptors
│   ├── services/
│   ├── guards/
│   └── interceptors/
│
├── features/
│   ├── tabler/
│   │   ├── layouts/                   # Layout components
│   │   │   ├── base/
│   │   │   ├── default/
│   │   │   ├── marketing/
│   │   │   ├── error/
│   │   │   ├── homepage/
│   │   │   ├── prose/
│   │   │   ├── single/
│   │   │   ├── card/
│   │   │   ├── pay/
│   │   │   └── settings/
│   │   │
│   │   ├── components/                # UI Components (จาก includes/ui, includes/layout)
│   │   │   ├── navbar/
│   │   │   ├── sidebar/
│   │   │   ├── footer/
│   │   │   ├── page-header/
│   │   │   ├── accordion/
│   │   │   ├── avatar/
│   │   │   ├── badge/
│   │   │   ├── breadcrumb/
│   │   │   ├── button/
│   │   │   ├── card/
│   │   │   ├── chart/
│   │   │   ├── dropdown/
│   │   │   ├── icon/
│   │   │   ├── modal/
│   │   │   ├── progress/
│   │   │   ├── spinner/
│   │   │   ├── table/
│   │   │   ├── tabs/
│   │   │   └── ...                    # ~70 components
│   │   │
│   │   ├── widgets/                   # Card widgets (จาก includes/cards)
│   │   │   ├── card-activity/
│   │   │   ├── card-profile/
│   │   │   ├── card-pricing/
│   │   │   ├── card-stat/
│   │   │   └── ...                    # ~79 components
│   │   │
│   │   ├── pages/                     # Complete pages (ใช้ layouts + components)
│   │   │   ├── dashboard/
│   │   │   ├── blank/
│   │   │   ├── sign-in/
│   │   │   ├── sign-up/
│   │   │   ├── forgot-password/
│   │   │   ├── error-404/
│   │   │   ├── error-500/
│   │   │   ├── pricing/
│   │   │   ├── profile/
│   │   │   ├── settings/
│   │   │   ├── invoices/
│   │   │   ├── tasks/
│   │   │   └── ...                    # ~116 pages
│   │   │
│   │   └── tabler-routing.module.ts   # Lazy-load routes
│   │
│   ├── auth/                          # (existing)
│   ├── dashboard/                     # (existing)
│   └── ...
│
├── layouts/                           # App-level layouts (sidebar, etc.)
├── shared/                            # Shared modules
└── app-routing.module.ts              # Root routes
```

---

## 4. CSS Strategy

### 4.1 Global Styles (angular.json build.styles)

ลำดับความสำคัญสูง → ต่ำ:

```json
"styles": [
  "src/styles.scss",                          // Custom overrides
  "src/assets/tabler/dist/css/tabler.css",     // Core Tabler (จำเป็น)
  "src/assets/tabler/dist/css/tabler-marketing.css",  // Marketing pages
  "src/assets/tabler/dist/css/tabler-vendors.css",    // Vendor plugins
  "src/assets/tabler/dist/css/tabler-themes.css"      // Theme variants
]
```

> **หมายเหตุ**: `tabler-flags.css`, `tabler-payments.css`, `tabler-socials.css` ใช้เฉพาะเมื่อจำเป็น — lazy-load หรือ include per-component

### 4.2 หลีกเลี่ยง PostCSS/SVG errors

CSS bundles ที่ reference `../img/*` (flags, payments, socials) จะรวมแยกเฉพาะหน้าที่ใช้เท่านั้น:
- ใช้ `@angular/elements` หรือ dynamic styles injection
- หรือ exclude จาก global styles → import per-component

### 4.3 JS Scripts

```json
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
  "src/assets/tabler/dist/js/tabler.js"
]
```

`tabler-theme.js` → inline ใน `<head>` ของ `BaseLayoutComponent` (for dark mode FOUC prevention)

---

## 5. Component Design Principles

### 5.1 Layout Components

```typescript
@Component({
  selector: 'app-tabler-default-layout',
  template: `
    <app-tabler-sidebar [dark]="dark" [end]="end"></app-tabler-sidebar>
    <div class="page">
      <app-tabler-navbar [condensed]="condensed" ...></app-tabler-navbar>
      <div class="page-wrapper">
        <app-tabler-page-header [title]="title" ...></app-tabler-page-header>
        <main class="page-body">
          <div class="container-xl">
            <ng-content></ng-content>
          </div>
        </main>
        <app-tabler-footer></app-tabler-footer>
      </div>
    </div>
  `,
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, PageHeaderComponent, FooterComponent]
})
export class DefaultLayoutComponent {
  @Input() dark?: boolean;
  @Input() condensed?: boolean;
  @Input() sticky?: boolean;
  @Input() title?: string;
  // ...
}
```

### 5.2 UI Components

- **Standalone components** ทุกตัว (ไม่ต้อง NgModule)
- **Input properties** ตรงจาก Liquid variable names
- **Content projection** (`<ng-content>`) สำหรับ children
- **No business logic** — เป็น pure presentational components

### 5.3 Page Components

```typescript
// dashboard.page.ts
@Component({
  selector: 'app-tabler-dashboard',
  template: `
    <app-tabler-default-layout title="Dashboard">
      <!-- dashboard content here -->
      <div class="row">
        <app-card-stat class="col-sm-6 col-lg-3" ...></app-card-stat>
        <app-card-chart class="col-12" ...></app-card-chart>
      </div>
    </app-tabler-default-layout>
  `,
  standalone: true,
  imports: [DefaultLayoutComponent, CardStatComponent, CardChartComponent]
})
export class DashboardPageComponent {}
```

---

## 6. Routing

```typescript
// tabler-routing.module.ts
const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'blank', component: BlankPageComponent },
      { path: 'sign-in', component: SignInPageComponent },
      { path: 'sign-up', component: SignUpPageComponent },
      { path: 'error-404', component: Error404PageComponent },
      { path: 'error-500', component: Error500PageComponent },
      // ...
    ]
  },
  {
    path: 'marketing',
    component: MarketingLayoutComponent,
    children: [
      { path: '', component: MarketingHomePageComponent },
      // ...
    ]
  },
  {
    path: 'auth',
    component: SingleLayoutComponent,
    children: [
      { path: 'sign-in', component: SignInPageComponent },
      { path: 'sign-up', component: SignUpPageComponent },
      // ...
    ]
  }
];
```

---

## 7. Implementation Phases

### Phase 1: Foundation
- Setup `dist/` CSS/JS in angular.json
- Build `BaseLayoutComponent` (html/head/body shell)
- Build `DefaultLayoutComponent` (sidebar + navbar + content + footer)
- Verify build & test pass

### Phase 2: Core UI Components
- IconComponent (SVG system)
- ButtonComponent, BadgeComponent, SpinnerComponent
- NavbarComponent, SidebarComponent, FooterComponent, PageHeaderComponent
- CardComponent, ModalComponent, DropdownComponent

### Phase 3: All UI Components
- ~70 components from `includes/ui/`
- Grouped and generated from Liquid source

### Phase 4: Pages
- Generate ~116 pages from root `*.html` files
- Each page is a standalone component wrapping a layout + content

### Phase 5: Widgets (Cards)
- ~79 card/widget components from `includes/cards/`
- Composite components built from UI components

### Phase 6: Marketing & Docs
- Marketing layout + sections
- Documentation pages

### Phase 7: Cleanup
- Remove old 136 fragmented components
- Remove redundant SCSS
- End-to-end test all routes

---

## 8. File Inventory

| Source | Count | Destination |
|--------|-------|-------------|
| `layouts/*.html` | 11 | Layout components |
| `includes/layout/*.html` | 27 | Layout partial components |
| `includes/ui/*.html` | 68 | UI components (excl. subdirs) |
| `includes/ui/form/*` | ~15 | Form field components |
| `includes/ui/modal/*` | ~5 | Modal variants |
| `includes/ui/marketing/*` | ~5 | Marketing UI blocks |
| `includes/cards/*.html` | 79 | Card widget components |
| `includes/forms/*.html` | 7 | Form page components |
| `includes/marketing/**` | ~15 | Marketing section components |
| `includes/docs/*.html` | 14 | Docs components |
| `includes/parts/*` | ~10 | Parts components |
| `*.html` (root) | 116 | Page components |
| **Total** | **~350+** | |

---

## 9. Key Decisions

1. **Standalone components เท่านั้น** — ไม่ใช้ NgModules ยกเว้น routing module
2. **CSS ใช้จาก `dist/` โดยตรง** — ไม่แปลงเป็น SCSS, ไม่ import source files
3. **Asset paths**: rewrite `./dist/` → `assets/tabler/dist/` ใน templates
4. **Liquid → Angular**: `{{ variable }}` → `{{ variable }}` (Angular interpolation ทำงานเหมือนกัน), `{% if %}` → `*ngIf`, `{% for %}` → `*ngFor`, `{% include %}` → component selector
5. **No build step for Tabler** — ใช้ compiled assets จาก dist/ โดยตรง
6. **Bootstrap JS** — ใช้ bootstrap.bundle.min.js ผ่าน angular.json scripts
