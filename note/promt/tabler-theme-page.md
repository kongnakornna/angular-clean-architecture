# Prompt: สร้างหน้าใหม่ด้วย Tabler Theme (เวอร์ชันสั้น)

> ใส่ `<...>` แล้ววางให้ AI — ฉบับเต็ม + รายละเอียดอยู่ใน `docs/tabler-theme-recipe.md`

---

## เริ่ม

คุณคือ Senior Angular Developer (Angular 18+ Clean Architecture + Tabler UI v1.4.0)

### เป้าหมาย
สร้างหน้า `<PAGE_NAME>` ให้ได้ธีม Tabler ของแอป โดยไม่แก้ CSS/theme

### ข้อมูล
- **Module:** `<MODULE_NAME>` → `src/app/features/<module>/presentation/pages/<page>/`
- **Route:** `<ROUTE_PATH>`
- **Layout:** `<AppLayout | AuthLayout>`
- **Features:** `<ตาราง + ปุ่มสร้าง + dropdown ฟิลเตอร์ ...>`

### กติกา (ละเมิดไม่ได้)
1. AppLayout: ขึ้นต้นด้วย `page-header` + `row row-deck row-cards` — **ห้าม** ใส่ `page-body`/`container-xl` ซ้ำ
2. AuthLayout: ขึ้นต้นด้วย `<div class="card card-md">`
3. ไอคอน: ใช้ `<i-tabler>` ทุกตัว + register ใน `provideTablerIcons` (`app.module.ts`) — ห้าม `ti ti-*`
4. Link: `routerLink` เท่านั้น
5. i18n: `| translate` (AppLayout) / `| appTranslate` (Auth) + เพิ่ม key ให้ครบ
6. Widgets: `data-bs-toggle` ใช้ได้เลย, modal วางท้าย component
7. ห้ามคัดลอก `<head>`/`<link>`/`<script>`/`?theme=` จาก template
8. เป็น standalone component พร้อม `.spec.ts`

### อ้างอิง
- device-list (AppLayout): `src/app/features/iot/presentation/pages/device-list/`
- login (AuthLayout): `src/app/features/auth/presentation/pages/login/`
- route: `src/app/app-routing.module.ts` (loadComponent)

### ขั้นตอน
1. ดูตัวอย่างก่อนเขียน 2. เพิ่ม i18n 3. ตรวจ icon 4. เขียน component+route 5. เขียน spec 6. `npm run build` ผ่าน → สรุป

## จบ
