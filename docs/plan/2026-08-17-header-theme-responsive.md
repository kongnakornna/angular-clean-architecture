# Header สอดคล้องกับ Theme Settings

## ปัญหา

Header component ปัจจุบันมี 2 ปัญหาหลัก:

1. **`data-bs-theme="dark"` hardcoded** บน `<header>` tag (`header.component.html:1`) — ทำให้ header ไม่เปลี่ยนตาม dark/light mode ที่เลือกใน Theme Settings
2. **Header อยู่นอก `.page-wrapper`** (`app-layout.component.html:3-5`) — ทำให้ layout-boxed CSS ไม่มีผลกับ header เพราะ Tabler CSS ใช้ selector `.layout-boxed .page` แต่ DOM ไม่มี `.page` wrapper

## ภาพรวมการแก้ไข

| # | Layer | ไฟล์ | สิ่งที่แก้ |
|---|-------|------|-----------|
| 1 | structure | `app-layout.component.html` | เพิ่ม `<div class="page">` wrapper, ย้าย `<app-header>` เข้าไปภายใน |
| 2 | component | `header.component.ts` | เพิ่ม `readonly theme` computed signal จาก LayoutService |
| 3 | template | `header.component.html` | เปลี่ยน `data-bs-theme="dark"` → `[attr.data-bs-theme]="theme()"` |
| 4 | doc | `layouts/README.md` | อัปเดต template structure ให้ตรงกับจริง |

## Section 1: Structure Change — `app-layout.component.html`

**Location:** `src/app/layouts/app-layout/app-layout.component.html`

**From → to:** ปัจจุบัน header อยู่นอก `.page-wrapper` ไม่มี `.page` wrapper → เพิ่ม `<div class="page">` ครอบทุกอย่าง + ย้าย `<app-header>` เข้าไปภายใน

**Why:** Tabler CSS `.layout-boxed .page` ใช้ selector `.page > .page-wrapper` เพื่อกำหนด max-width + centered margin — ต้องมี `.page` wrapper ถึงจะทำงาน

```html
<!-- BEFORE -->
<app-header></app-header>

<div class="page-wrapper">
  <ng-content select="[page-header]"></ng-content>
  <main class="page-body" id="content">
    <div class="container-xl">
      <router-outlet></router-outlet>
    </div>
  </main>
  <app-footer></app-footer>
</div>

<app-layout-settings></app-layout-settings>

<!-- AFTER -->
<div class="page">
  <app-header></app-header>
  <div class="page-wrapper">
    <ng-content select="[page-header]"></ng-content>
    <main class="page-body" id="content">
      <div class="container-xl">
        <router-outlet></router-outlet>
      </div>
    </main>
    <app-footer></app-footer>
  </div>
</div>

<app-layout-settings></app-layout-settings>
```

**Effect chain:**
- `.page` → `display: flex; flex-direction: column; min-height: 100%` (จาก `_page.scss:3-8`)
- `.layout-boxed .page` → `max-width: var(--tblr-theme-boxed-width); margin: 0 auto` (จาก `_core.scss:61-64`)
- `.page-wrapper` ยังคงเป็น direct child ของ `.page` → selector `.page > .page-wrapper` ยัง match
- Header อยู่ภายใน `.page` → ได้ max-width constraint จาก layout-boxed โดยอัตโนมัติ

## Section 2: Reactive Theme Signal — `header.component.ts`

**Location:** `src/app/layouts/header/header.component.ts:63-68`

**From → to:** มี `isDarkMode` getter ที่อ่าน LayoutService อยู่แล้ว → เพิ่ม `readonly theme` computed signal สำหรับใช้ใน template

```typescript
// BEFORE (lines 63-68)
get isDarkMode(): boolean {
  return this.layout.theme() === 'dark';
}

// AFTER — เพิ่ม line ใหม่ก่อน isDarkMode
readonly theme = this.layout.theme;

get isDarkMode(): boolean {
  return this.layout.theme() === 'dark';
}
```

**Why:** ใช้ signal โดยตรงใน template ผ่าน `[attr.data-bs-theme]="theme()"` — reactive เมื่อ user เปลี่ยน theme ใน Settings

## Section 3: Reactive `data-bs-theme` — `header.component.html`

**Location:** `src/app/layouts/header/header.component.html:1`

**From → to:** `data-bs-theme="dark"` hardcoded → `[attr.data-bs-theme]="theme()"` reactive

```html
<!-- BEFORE -->
<header class="navbar navbar-expand-md d-print-none" data-bs-theme="dark">

<!-- AFTER -->
<header class="navbar navbar-expand-md d-print-none" [attr.data-bs-theme]="theme()">
```

**Effect chain:**
- LayoutService.update('theme', 'dark') → signal `theme()` เปลี่ยน → `data-bs-theme` attribute อัปเดตอัตโนมัติ
- Tabler CSS ใช้ `[data-bs-theme="dark"]` selector เพื่อกำหนดสี header → header เปลี่ยนตามทันที
- Moon/Sun icons (`hide-theme-dark`/`hide-theme-light` classes) ยังทำงานถูกต้อง เพราะ inherits `data-bs-theme` จาก `<html>` element

## Section 4: Documentation Update — `layouts/README.md`

**Location:** `src/app/layouts/README.md:34-45`

**From → to:** อัปเดต template structure diagram ให้ตรงกับโครงสร้างจริงใหม่

```markdown
<!-- BEFORE -->
**Template Structure:**
```html
<div class="app-wrapper">
  <app-sidebar [isCollapsed]="..."></app-sidebar>
  <div class="page-wrapper">
    <app-header (toggleSidebar)="toggleSidebar()"></app-header>
    <div class="page-body">
      <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>
  </div>
</div>
```

<!-- AFTER -->
**Template Structure:**
```html
<div class="page">
  <app-header></app-header>
  <div class="page-wrapper">
    <ng-content select="[page-header]"></ng-content>
    <main class="page-body" id="content">
      <div class="container-xl">
        <router-outlet></router-outlet>
      </div>
    </main>
    <app-footer></app-footer>
  </div>
</div>
```
```

## Unit Tests

**เขียน** — เพิ่ม test cases ใหม่ใน `header.component.spec.ts`:

1. **data-bs-theme reactive** — เรียก `layout.update('theme', 'dark')` → ตรวจ `<header>` attribute `data-bs-theme` == `'dark'`; เปลี่ยนเป็น `'light'` → `data-bs-theme` == `'light'`
2. **Layout mode ยังทำงาน** — ตรวจว่า layout mode toggle (fluid/boxed/boxed-2) ยังทำงานเหมือนเดิม (มีอยู่แล้ว)
3. **Theme toggle** — กด toggle dark/light → `layout.theme()` เปลี่ยนถูกต้อง

Test structure:
```typescript
it('sets data-bs-theme to dark when theme is dark', () => {
  layout.update('theme', 'dark');
  fixture.detectChanges();
  const header = fixture.nativeElement.querySelector('header');
  expect(header.getAttribute('data-bs-theme')).toBe('dark');
});

it('sets data-bs-theme to light when theme is light', () => {
  layout.update('theme', 'light');
  fixture.detectChanges();
  const header = fixture.nativeElement.querySelector('header');
  expect(header.getAttribute('data-bs-theme')).toBe('light');
});

it('toggleTheme switches from light to dark', () => {
  layout.update('theme', 'light');
  component.toggleTheme();
  expect(component.isDarkMode).toBeTrue();
});
```

## ไฟล์ที่ไม่ต้องแก้

- `assets/tablerhtml/*.html` — Demo files ของ Tabler, ไม่ใช่ source ของ app
- `assets/tabler/scss/layout/_page.scss` — Tabler SCSS, ไม่ต้องแก้
- `assets/tabler/scss/layout/_navbar.scss` — ใช้ selector `.navbar-vertical ~ .page-wrapper` สำหรับ vertical navbar, ไม่เกี่ยวกับ horizontal header ของเรา
- `layout-settings.component.*` — ใช้ LayoutService อยู่แล้ว, ไม่ต้องแก้

## ตรวจสอบหลังทำ

1. `ng build` — ต้องไม่มี error
2. `ng test` — ต้องผ่านทุก test
3. Manual test: เปลี่ยน theme dark/light ใน Settings → header เปลี่ยนตาม
4. Manual test: เปลี่ยน layout fluid/boxed/boxed-2 → header หด/ขยาย ตรงกับ content
5. Manual test: เปลี่ยน primary color/font/base/radius → header แสดงผลถูกต้อง
