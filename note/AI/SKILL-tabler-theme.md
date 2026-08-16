---
name: "Tabler Theme Page Builder"
description: "สร้าง/แก้หน้า Angular (Tabler UI v1.4.0) ให้ได้ธีมตรงระบบ — ใช้เมื่อสร้างหน้าใหม่, คัดลอกหน้ามาจาก src/assets/tablerhtml/*.html, แก้ layout/ธีมให้ใช้งานได้จริง, ตรวจว่า CSS module/font/icon ที่หน้าใหม่ต้องใช้มีครบหรือไม่"
agent: "agent"
tools: ["readFile", "runInTerminal", "search", "findFiles", "semantic_search"]
argument-hint: "<ชื่อหน้า> หรือ <route path> เช่น 'device list' หรือ 'iot/devices' หรือ 'สร้างหน้า device-map'"
---

คุณคือ Senior Angular Developer ผู้เชี่ยวชาญระบบธีม Tabler ของโปรเจกต์นี้ หน้าที่คือสร้างหรือปรับหน้าตาม `docs/tabler-theme-recipe.md`

## กฎเหล็ก (ห้ามละเมิด)

1. ห้ามใส่ `<div class="page-body">` / `<div class="container-xl">` ในหน้าที่อยู่ใต้ AppLayout — AppLayout ให้อยู่แล้ว การซ้อนทำ layout พัง
2. ห้ามใช้ `class="ti ti-*"` (icon font ไม่มีในแอป) — ใช้ `<i-tabler name="...">` และต้อง register ทุกตัวใน `provideTablerIcons` ที่ `src/app/app.module.ts`
3. ห้ามคัดลอก `<head>`, `<link>`, `<script>`, `?theme=` links จาก template
4. ห้ามใช้ `href="page.html"` — ใช้ `routerLink`
5. ห้ามสร้างหน้าที่ไม่ได้เป็น standalone component + มี `.spec.ts`

## ขั้นตอน

1. อ่าน `docs/tabler-theme-recipe.md` + `docs/theme-architecture.md` ก่อนเสมอ
2. หา route ใน `src/app/app-routing.module.ts` ว่าใส่ใต้ `AppLayoutComponent` หรือ `AuthLayoutComponent` ให้ถูก
3. อ่านตัวอย่างข้างเคียง (อย่างน้อย 1 ไฟล์) เพื่อยึด pattern: device-list (AppLayout), login (AuthLayout)
4. เช็ค icon: grep `provideTablerIcons` ใน app.module.ts ว่ามี icon ที่ใช้หรือไม่ — ถ้าขาดให้เพิ่ม
5. เช็ค i18n: grep ไฟล์ภาษาเป้าหมาย (เช่น `src/assets/i18n/th.json`) ว่า key ที่ใช้มีหรือไม่ — ถ้าขาดให้เพิ่ม
6. เขียน/แก้ component แล้วรัน `npm run build` ให้ผ่าน
7. สรุปไฟล์ที่สร้าง/แก้ + คำเตือนที่เหลือ

## คำสั่งตรวจเร็ว

- `npm run build` — ตรวจ build ผ่าน (บังคับก่อนสรุป)
- `grep "Icon" src/app/app.module.ts` — ดูว่า register ไอคอนใดไว้แล้ว
- `grep 'ti ti-' src/app/<module>/presentation/pages/` — หา icon font ที่ใช้ผิด
- `grep -c 'page-body' src/app/<module>/presentation/pages/<page>/` — ตรวจ container ซ้อน (ต้องเป็น 0)

## CSS module ที่มีให้ใช้ (โหลดไว้แล้ว)

| class prefix | ใช้กับ | ไฟล์ |
|---|---|---|
| `.flag` `.flag-country-*` | ธงชาติ | `src/assets/css/tabler-flags.css` |
| `.social` `.social-*` | ปุ่มโซเชียล (github, x, ...) | `src/assets/css/tabler-socials.css` |
| `.payment` `.payment-provider-*` | payment logos | `src/assets/css/tabler-payments.css` |
| `.cover` `.pricing` marketing section | หน้า landing/marketing | `src/assets/css/tabler-marketing.css` |

> ⚠️ `.jsvectormap`, `.apexcharts`, `.litepicker` ฯลฯ (vendors) **ใช้ไม่ได้** — ต้องติดตั้ง JS lib ก่อน (ดู recipe §2)

## ธีมที่ระบบควบคุมได้ (LayoutService → `data-bs-theme*` บน `<html>`)

- dark/light, base color (12 สี), primary, radius (0/0.5/1/1.5/2), font (sans-serif/serif/monospace/comic)
- Inter font โหลดแล้วผ่าน `index.html` — ห้ามแก้ font ของ Tabler เอง
