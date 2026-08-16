# Prompt: สร้างหน้าใหม่แบบ Vertical Layout

> Copy ตั้งแต่ "เริ่ม" ถึง "จบ" วางให้ AI แล้วระบุ **ชื่อหน้า / route / features**
>
> อ้างอิง: `src/assets/tablerhtml/layout-vertical.html` (ต้นแบบ), `docs/php/layouts/03-vertical-layouts.md` (แผน layout), `docs/tabler-theme-recipe.md`

---

## เริ่ม

คุณคือ Senior Angular Developer ของโปรเจกต์นี้ (Angular 18+ Clean Architecture + Tabler UI v1.4.0)

### เป้าหมาย

สร้างหน้า `<PAGE_NAME>` ใหม่แบบ **Vertical Layout** (sidebar แนวตั้งทางซ้าย) ให้ตรงระบบธีมของแอป โดยไม่ต้องแก้ CSS/theme

### ⚠️ ข้อเท็จจริงที่ต้องรู้ก่อน

- **Vertical layout component ยังไม่ถูกสร้างในแอป** — มีแค่ blueprint ใน `docs/php/layouts/03-vertical-layouts.md` (VerticalLayoutComponent, VerticalCompact, VerticalMinimal, VerticalIot) และ template ต้นแบบ `src/assets/tablerhtml/layout-vertical.html`
- แอปปัจจุบันมีแค่ `AppLayoutComponent` (header+sidebar) กับ `AuthLayoutComponent` (หน้า auth)
- งานนี้ = **สร้าง layout ใหม่ก่อน** (ถ้ายังไม่มี) แล้วค่อยสร้างหน้า

### ข้อมูลหน้า

- **ชื่อ module:** `<MODULE_NAME>` (`src/app/features/<module>/presentation/pages/<page>/`)
- **Route:** `<ROUTE_PATH>`
- **Variant ที่ต้องการ:** `<VerticalLayout | VerticalCompact | VerticalMinimal | VerticalIot>` (อิง blueprint ใน docs/php/layouts/03-vertical-layouts.md)
- **Features ที่ต้องมี:** `<รายการ เช่น ตาราง + ปุ่มสร้าง + dropdown ฟิลเตอร์>`

### ข้อกำหนดบังคับ

1. **สร้าง layout component ก่อน** (ถ้ายังไม่มี) ที่ `src/app/layouts/<vertical-...>/`:
   - โครงสร้าง: `<aside class="navbar navbar-vertical navbar-expand-lg" data-bs-theme="dark">` + `<div class="page-wrapper">` > `<main class="page-body">` > `<div class="container-xl">` + router-outlet
   - ตัวอย่างโครงสร้างตาม blueprint: `docs/php/layouts/03-vertical-layouts.md`
2. **หน้า (AppLayout-style):** เริ่มด้วย `<div class="page-header d-print-none">` + `<div class="row row-deck row-cards">` — ห้ามใส่ `<div class="page-body">`/`<div class="container-xl">` ซ้ำ (layout ให้อยู่แล้ว)
3. **ไอคอน:** ใช้ `<i-tabler name="...">` ทุกตัว ตรวจ register ใน `provideTablerIcons` ที่ `app.module.ts` — ถ้าขาดให้เพิ่ม **ห้าม** ใช้ `ti ti-*`
4. **Link:** ใช้ `routerLink` ห้าม `href="page.html"` / `href="javascript:void(0)"`
5. **i18n:** ใช้ `| translate` — เพิ่ม key ในไฟล์ภาษาเป้าหมาย (เช่น `src/assets/i18n/th.json`)
6. **Widgets JS:** ใช้ `data-bs-toggle`/`data-bs-target` ได้เลย (Bootstrap delegate แล้ว)
7. ห้ามคัดลอก `<head>`, `<link>`, `<script>`, `?theme=` จาก template
8. ต้องเป็น standalone component มี `.ts` + `.spec.ts` + `.html` + `.scss`

### ตัวอย่างอ้างอิง

- ต้นแบบ HTML: `src/assets/tablerhtml/layout-vertical.html` (sidebar+page-wrapper ส่วนที่ใช้งาน)
- Blueprint layout: `docs/php/layouts/03-vertical-layouts.md`
- หน้าปัจจุบัน (AppLayout): `src/app/features/iot/presentation/pages/device-list/device-list.component.{ts,html}`
- Route: `src/app/app-routing.module.ts` (ใช้ `loadComponent` ใต้ layout ใหม่)

### ขั้นตอน

1. อ่าน blueprint + template ต้นแบบก่อน
2. สร้าง layout component (ถ้ายังไม่มี) + route ใหม่ใน app-routing.module.ts
3. เพิ่ม key i18n ที่ขาด
4. ตรวจ/เพิ่ม icon ใน `app.module.ts`
5. เขียนหน้า component + `.spec.ts` (อย่างน้อย happy path)
6. รัน `npm run build` ให้ผ่าน แล้วสรุปสิ่งที่สร้าง

## จบ
