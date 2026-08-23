# Tabler Theme — Recipe ที่ใช้งานได้จริง (สำหรับสร้างหน้าใหม่)

> เอกสารนี้เป็นผลจากการวิเคราะห์เชิงลึกว่าทำไม "คัดลอก template แล้วธีม/สไตล์ไม่ขึ้น" และให้
> **ขั้นตอนที่พิสูจน์แล้วว่าใช้ได้จริง** พร้อมไฟล์ที่แก้แล้วใน commit นี้
>
> คู่กันกับ `docs/theme-architecture.md` (แผนผังภาพรวม) — เล่มนี้เป็น "วิธีใช้"

---

## 1. สรุป: อะไรพัง และแก้ไปแล้ว (ใน commit นี้)

ปัญหาที่ผู้ใช้พบเวลาคัดลอกหน้าจาก `src/assets/tablerhtml/*.html` เข้ามาใน Angular = 3 อย่างนี้:

| # | อาการ | Root cause | สถานะ |
|---|-------|-----------|--------|
| 1 | ธงชาติ / payment logos / social buttons / marketing section ไม่แสดงสไตล์ | `styles.scss` compile แค่ `tabler.scss` (core) — **ไม่รวม** flags / socials / payments / marketing | ✅ แก้แล้ว: ใส่ prebuilt CSS เข้า `angular.json` (ดู §2) |
| 2 | Font ของระบบไม่ตรง template (ไม่มี Inter) | compiled CSS มี **0 `@font-face`** — template โหลด `rsms.me/inter/inter.css` แต่แอปไม่โหลด | ✅ แก้แล้ว: เพิ่ม `<link>` Inter ใน `src/index.html` (ดู §3) |
| 3 | ไอคอนบางตัว "หายเงียบ" | แอปใช้ `<i-tabler>` (ต้อง register ทุกตัวใน `provideTablerIcons`) ส่วน template ใช้ inline SVG หรือคลาส font `ti ti-*` (ไม่มีในแอป) | ✅ ทำความเข้าใจแล้ว: กฎการเลือกไอคอนใน §4 |

**สิ่งที่ "ไม่ได้พัง" (พิสูจน์แล้วว่าทำงานใน SPA แล้ว):**
- Dropdown / Modal / Offcanvas / Tab / Collapse — Bootstrap data-API ถูก delegate ไว้ที่ document
  (`bootstrap.bundle.min.js` + `tabler.js` ใน `angular.json` scripts) → ใช้ `data-bs-toggle` กับ content ที่ Angular render หลัง load ได้เลย ไม่ต้องมี directive
- สลับ dark/light / base color / primary / radius / font — `LayoutService` เขียน `data-bs-theme*` บน `<html>` แล้ว CSS มี selector รองรับครบ (ตรวจใน compiled CSS แล้ว: `data-bs-theme-primary`=15, `theme-base`=6, `hide-theme-dark`=3)

---

## 2. CSS Modules ที่ต้องโหลดเพิ่ม (แก้ใน `angular.json`)

Template โหลด 8 ไฟล์ แต่แอป compile แค่ core → เพิ่ม prebuilt CSS เหล่านี้ใน `styles` array
(**build + test target ต้องแก้ทั้งคู่**):

```jsonc
"styles": [
  "src/styles.scss",
  "src/assets/css/tabler-flags.css",      // .flag.flag-country-*
  "src/assets/css/tabler-socials.css",    // .social .social-* (github, x, ...)
  "src/assets/css/tabler-payments.css",   // .payment .payment-provider-*
  "src/assets/css/tabler-marketing.css"   // .cover, .pricing, marketing sections
]
```

เหตุผลที่ใช้ **ไฟล์ CSS ที่ vendor ไว้ใน `src/assets/css/`** (ไม่ใช้ `@use ... with ($assets-base)`
ใน styles.scss): sass-postcss resolve `url()` เทียบกับตำแหน่งไฟล์ต้นทาง (ใน node_modules) ทำให้
path รูปภาพเพี้ยนและ build error — ไฟล์ที่ vendor ไว้แล้วอ้าง `../img/...` ซึ่งชี้ไป
`src/assets/img/...` ที่มีอยู่จริง และ webpack เอา SVG ไป emit ให้ (ตรวจแล้ว: dist มี 522 ไฟล์ `.svg`)

> ⚠️ **`tabler-vendors.css` ยังไม่ใส่** — มันแต่ง widget จาก libs ภายนอก (apexcharts, litepicker,
> tom-select, jsvectormap, ฯลฯ) ซึ่งแอป **ยังไม่มี** libs เหล่านี้ (check `package.json` แล้ว) → ใส่ CSS
> ไปแล้ว widget ก็ไม่ทำงาน ต้องติดตั้ง JS lib ก่อน ถ้าจะใช้ต้องทำเป็นชิ้นงานแยก

---

## 3. Font (Inter) — แก้ใน `src/index.html`

`$font-google: null` ใน Tabler → ไม่มี `@font-face` ถูก compile เลย ต้องโหลดฟอนต์เองแบบเดียวกับ template:

```html
<link rel="preconnect" href="https://rsms.me/" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
```

หลังจากนี้ `--tblr-font-sans-serif: "Inter Var", Inter, ...` จึงได้ Inter จริง และ
`data-bs-theme-font="sans-serif|serif|monospace|comic"` จะเห็นผลต่างชัดเจน

---

## 4. กฎไอคอน (สำคัญ — ทำให้ "หายเงียบ" บ่อยสุด)

| ที่มาไอคอน | ใช้ได้ในแอป? | เงื่อนไข |
|---|---|---|
| `<i-tabler name="...">` | ✅ | ต้อง register ใน `provideTablerIcons({ ... })` ที่ `src/app/app.module.ts` — ตัวที่ไม่ register จะ render ว่าง **โดยไม่มี error** |
| Inline SVG `class="icon"` | ✅ | คัดลอกจาก template ได้เลย ไม่ต้อง register |
| `class="ti ti-*"` (icon font) | ❌ | ใช้ไม่ได้ — แอปไม่มี `.ti` font (compiled CSS ไม่มีเลย) ต้องแปลงเป็น `<i-tabler>` |

ตรวจว่ามี register แล้วหรือยัง: `grep "Icon" src/app/app.module.ts` — ถ้าไม่มีให้เพิ่ม
`IconXxx` เข้า object ใน `provideTablerIcons` (ตัว import อยู่แล้วใน `angular-tabler-icons/icons`)

---

## 5. สร้างหน้าใหม่ด้วยธีม (ขั้นตอนที่ใช้ได้จริง)

### 5A — หน้าแบบมี sidebar (AppLayout)

1. เพิ่ม route ใน `src/app/app-routing.module.ts` ใต้ `path: '' component: AppLayoutComponent`
2. สร้าง standalone component ที่ `src/app/features/<module>/presentation/pages/<page>/`
3. Template ต้องมีโครงสร้างตามนี้เท่านั้น (ห้ามใส่ `<div class="page-body">` / `<div class="container-xl">` ซ้ำ):

```html
<div class="page-header d-print-none">
  <div class="row g-2 align-items-center">
    <div class="col">
      <div class="page-pretitle">{{ 'xxx.subtitle' | translate }}</div>
      <h1 class="page-title">
        <i-tabler name="settings" class="icon me-2"></i-tabler>
        {{ 'xxx.title' | translate }}
      </h1>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <!-- ปุ่มขวา: ใช้ routerLink อย่างเดียว ห้ามใช้ href="page.html" -->
    </div>
  </div>
</div>

<!-- เนื้อหา: เริ่มด้วย row-card / card ได้เลย เพราะ AppLayout ให้ container-xl อยู่แล้ว -->
<div class="row row-deck row-cards"> ... </div>
```

   - ตัวอย่างที่อ้างอิงได้: `src/app/features/iot/presentation/pages/device-list/device-list.component.html`
   - มี `<app-page-header>` ทางเลือกใน `src/app/layouts/page-header/` (ใส่ `[actions]` ได้)
     — ใช้ได้ทั้งคู่ แต่ควรยึดแบบเดียวเพื่อลดทางเลือก

### 5B — หน้าแบบ Auth (AuthLayout)

1. เพิ่ม route ใต้ `path: '' component: AuthLayoutComponent`
2. Template เริ่มจาก `<div class="card card-md">` เลย (AuthLayout มี `page.page-center > container-tight` ให้แล้ว + ปุ่ม floating theme builder)

```html
<div class="card card-md">
  <div class="card-body">
    <h2 class="h2 text-center mb-4">{{ 'login.title' | appTranslate }}</h2>
    ...
  </div>
</div>
```

   - ตัวอย่าง: `src/app/features/auth/presentation/pages/login/login.component.html`
   - หน้า Auth ใช้ pipe `appTranslate` (อิง i18n ของ auth) ส่วนหน้าใน AppLayout ใช้ `translate` — ดูไฟล์ข้างเคียงในโมดูลนั้นเป็นหลัก

### 5C — Widgets ที่ใช้ `data-bs-*` (ทำงานได้เลยใน SPA)

```html
<!-- Dropdown -->
<div class="dropdown">
  <button class="btn dropdown-toggle" data-bs-toggle="dropdown">Menu</button>
  <div class="dropdown-menu">...</div>
</div>

<!-- Modal: วาง `<div class="modal fade" id="...">` ไว้ท้าย component (จะถูกสลับเข้า body อัตโนมัติ) -->
<button class="btn" data-bs-toggle="modal" data-bs-target="#modal-small">Open</button>

<!-- Offcanvas (ใช้กับ offcanvas ของ AppLayout: id="offcanvas-settings") -->
<button class="btn" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-settings">Settings</button>
```

---

## 6. ข้อควรระวัง / อย่าคัดลอกมาจาก template

- ❌ **อย่า** คัดลอก `<head>`, `<link>` (ไฟล์ css), `<script>` (demo.js / theme settings JS), ส่วน `?theme=` links เข้า component — ระบบธีมแอปทำงานผ่าน `LayoutService` + settings UI ที่มีอยู่แล้ว
- ❌ **อย่า** ใช้ `href="page.html"` → ใช้ `routerLink="/..."` เสมอ
- ❌ **อย่า** ใส่ `<div class="page-body">` / `<div class="container-xl">` ซ้ำ (AppLayout ให้แล้ว) — ตัวอย่างที่ผิด: `src/app/features/pages/presentation/modals/modals.component.html` (ซ้อน container + ใช้ `role="modal"` ซึ่งควรเป็น `role="dialog"`)
- ⚠️ `tabler-theme.js` (boot script) ลบ `data-bs-*` ออกจาก `<html>` ถ้าค่าเท่ากับ default (light/gray/sans-serif/blue/1) แต่ `LayoutService.applySettings()` set เสมอ → สอดคล้องกันอยู่แล้ว
- ⚠️ `?theme=dark` URL param ทำงานเฉพาะตอน hard reload (boot script รันครั้งเดียว) — ใน SPA ให้ใช้ settings UI แทน
- ⚠️ `LayoutService` เพิ่ม class `theme-{base}` / `font-{font}` บน `<html>` ด้วย แต่ compiled CSS ไม่มี selector แบบ class (มีแค่ `[data-bs-theme-*]`) → class นั้นเป็น dead code ไม่มีผลข้างเคียง
- ⚠️ header ฝัง `data-bs-theme="dark"` ตายตัว (ตามดีไซน์ Tabler) — ไม่เกี่ยวกับการตั้งธีมจาก LayoutService
- 💀 `features/pages/` (showcase: modals, cards, ...) เป็น **dead code** — `PagesModule` ไม่ถูก import ใน app เลย ไม่ต้องอ้างอิง
- 💀 `src/assets/tabler/scss/` ชุด SCSS เก่าไม่ถูก import (มีแค่ `custom/_utilities.scss` ที่ใช้จริง)

---

## 7. Checklist ตอนสร้างหน้าใหม่

- [ ] route อยู่ใน layout ที่ถูกต้อง (AppLayout ↔ AuthLayout)
- [ ] ไม่มี page-body / container-xl ซ้อน
- [ ] ทุก link เป็น `routerLink`
- [ ] ไอคอนทุกตัวเป็น `<i-tabler>` (ถ้าใช้) และถูก register ใน app.module.ts
- [ ] ไม่มี `ti ti-*` class, ไม่มี inline `<script>`
- [ ] ข้อความทุกจุดผ่าน pipe `translate` / `appTranslate` (i18n)
- [ ] รัน `npm run build` ผ่าน

---

## 8. ไฟล์ที่แก้ใน commit นี้

| ไฟล์ | การแก้ |
|---|---|
| `angular.json` | เพิ่ม `tabler-flags/socials/payments/marketing.css` ใน styles (build + test) |
| `src/index.html` | เพิ่ม `<link>` Inter font + preconnect |
| `docs/tabler-theme-recipe.md` | เอกสารนี้ |
| `note/promt/tabler-theme-page.md` | Prompt ใช้สร้างหน้าใหม่ |
| `note/AI/SKILL-tabler-theme.md` | Skill ต่อยอดระบบธีม |
