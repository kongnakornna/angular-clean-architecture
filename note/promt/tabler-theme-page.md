# Prompt: สร้างหน้าใหม่ด้วย Tabler Theme (ใช้งานได้จริง)

> Copy ข้อความนี้ (ตั้งแต่บรรทัด "เริ่ม" ถึง "จบ") วางให้ AI แล้วระบุ **ชื่อหน้า / route / layout / features** ที่ต้องการ
>
> เอกสารอ้างอิง: `docs/tabler-theme-recipe.md` + `docs/theme-architecture.md`

---

## เริ่ม

คุณคือ Senior Angular Developer ของโปรเจกต์นี้ (Angular 18+ Clean Architecture + Tabler UI v1.4.0)

### เป้าหมาย

สร้างหน้า `<PAGE_NAME>` ใหม่ ให้ได้สไตล์ Tabler ตรงตามระบบธีมของแอป (dark/light, base color, primary, radius, font) **โดยไม่ต้องแก้ CSS/theme ใหม่**

### ข้อมูลหน้า

- **ชื่อ module:** `<MODULE_NAME>` (สร้างโฟลเดอร์ `src/app/features/<module>/presentation/pages/<page>/`)
- **Route:** `<ROUTE_PATH>` (เช่น `dashboard/analytics`)
- **Layout:** `<AppLayout | AuthLayout>` (AuthLayout = หน้า login-style มีแค่การ์ด; AppLayout = มี sidebar/header)
- **Features ที่ต้องมี:** `<รายการ เช่น ตาราง + ปุ่มสร้าง + dropdown ฟิลเตอร์>`

### ข้อกำหนดบังคับ (ดู docs/tabler-theme-recipe.md §5)

1. **โครงสร้างหน้า (AppLayout):** เริ่มด้วย `<div class="page-header d-print-none">` ตามรูปแบบ `device-list.component.html` แล้วตามด้วย `<div class="row row-deck row-cards">` — **ห้าม** ใส่ `<div class="page-body">` หรือ `<div class="container-xl">` เพราะ AppLayout ให้อยู่แล้ว (ซ้อนแล้ว layout พัง)
2. **โครงสร้างหน้า (AuthLayout):** เริ่มด้วย `<div class="card card-md">` — AuthLayout ให้ `page.page-center > container-tight` แล้ว
3. **ไอคอน:** ใช้ `<i-tabler name="...">` ทุกตัว และ check ก่อนว่ามี register ใน `provideTablerIcons({...})` ที่ `src/app/app.module.ts` หรือไม่ — ถ้าไม่มีให้เพิ่ม `IconXxx` เข้า object นั้น **ห้าม** ใช้ `class="ti ti-*"` (icon font ไม่มีในแอป)
4. **Link:** ใช้ `routerLink` ทุกจุด ห้าม `href="page.html"` หรือ `href="javascript:void(0)"` สำหรับ navigation
5. **i18n:** ข้อความทุกจุดผ่าน pipe translate — หน้า AppLayout ใช้ `| translate`, หน้า Auth ใช้ `| appTranslate`; เพิ่ม key ในไฟล์ i18n ของภาษานั้นๆ (ดูไฟล์ข้างเคียงในโมดูลเดียวกันเป็นตัวอย่าง)
6. **Widgets JS (dropdown/modal/offcanvas/tab):** ใช้ `data-bs-toggle`/`data-bs-target` ได้โดยตรง (Bootstrap delegate ไว้แล้ว) — modal ให้วาง `<div class="modal fade" id="...">` ไว้ท้าย component
7. **อย่า** คัดลอก `<head>`, `<link>`, `<script>`, `?theme=` จาก template มา
8. **อย่า** สร้าง component ที่มีเฉพาะ HTML เดียวกับ template — ต้องเป็น standalone component มี `.ts` + `.spec.ts` + `.html` + `.scss` (scss ว่างได้ถ้าไม่ต้องปรับ)

### ตัวอย่างที่อ้างอิง

- AppLayout: `src/app/features/iot/presentation/pages/device-list/device-list.component.{ts,html}`
- AuthLayout: `src/app/features/auth/presentation/pages/login/login.component.{ts,html}`
- Route: `src/app/app-routing.module.ts` (ใช้ `loadComponent` ใต้ layout ที่ถูกต้อง)

### ขั้นตอน

1. ตรวจโครงสร้าง/ตัวอย่างข้างต้นก่อนเขียนโค้ด
2. ตรวจ i18n ไฟล์ของภาษาเป้าหมาย แล้วเพิ่ม key ที่ขาด
3. ตรวจ `app.module.ts` ว่า icon ที่ใช้ register ครบไหม — เพิ่มถ้าขาด
4. เขียน component + เพิ่ม route
5. เขียน `.spec.ts` อย่างน้อย happy path (อิง spec ของเพื่อนบ้าน)
6. รัน `npm run build` ให้ผ่าน แล้วสรุปสิ่งที่สร้าง

## จบ
