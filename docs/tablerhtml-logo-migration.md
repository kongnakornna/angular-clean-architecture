# Tabler HTML Templates - Logo & Favicon Migration

## ภาพรวม

เทมเพลต Tabler HTML ทั้งหมดใน `src/assets/tablerhtml/` เดิมฝังโลโก้เป็น inline SVG ของ Tabler และไม่มี favicon งานนี้เปลี่ยนให้ดึงทรัพยากรจากโฟลเดอร์ `src/assets/` ของโปรเจกต์แทน เพื่อให้โลโก้เป็นของแอปพลิเคชันจริง

## ทรัพยากรปลายทาง

| ทรัพยากร | ตำแหน่ง |
| --- | --- |
| โลโก้ | `src/assets/img/logo/logo-light.png` |
| Favicon | `src/assets/favicon.ico` |

## สิ่งที่ทำ

- เปลี่ยน inline SVG โลโก้ทั้งหมด (`<svg class="navbar-brand-image">...`) เป็น `<img src="(../|../../)img/logo/logo-light.png" class="navbar-brand-image" alt="Logo" />`
- เพิ่ม `<link rel="icon" href="(../|../../)favicon.ico" />` ไว้หลัง `<title>` ในทุกไฟล์
- คงคลาส `navbar-brand-autodark` เดิมไว้ → Tabler CSS จะ `filter: brightness(0) invert(1)` ให้โลโก้เป็นสีขาวในโหมดมืดอัตโนมัติ (พฤติกรรมเดียวกับ SVG เดิม)

### Prefix พาธสัมพัทธ์

- ไฟล์ใน `tablerhtml/` (root) → `../`
- ไฟล์ใน `tablerhtml/marketing/` และ `tablerhtml/docs/` → `../../`

### กรณีพิเศษ

- `page-loader.html` — เดิมใช้ `./static/logo-small.svg` เปลี่ยนเป็น `../img/logo/logo-light.png`
- `navigation.html:6405` — โลโก้คู่กับข้อความ "Dashboard" คงคลาส `me-3` ไว้
- `onboarding.html` — มีคลาส `logo-gray` ที่ไม่มี CSS rule ปล่อยไว้ ไม่กระทบ

### สิ่งที่ไม่แตะ

- `tablerhtml/dist/` (library files)
- `tablerhtml/docs/index.html` — เพิ่ม favicon เท่านั้น (เป็นหน้า redirect)
- งานอื่นที่มีอยู่ใน working tree ก่อนหน้านี้ (`src/app/...`, `src/assets/i18n/...`, `src/assets/img/l/`, ฯลฯ)

## ขอบเขต

- ไฟล์ที่แก้: **125 ไฟล์** (117 root + 7 marketing + 1 docs)
- `home.html` — ไฟล์เทมเพลตที่ยังไม่เคยถูก track เข้า git ถูกเพิ่มเข้า repo ใน commit นี้

## การตรวจสอบ

1. **พาธอ้างอิง** — ตรวจทั้ง 250 จุด (logo + favicon) ใน `src/` และ `dist/` ทุกจุด resolve ถึงไฟล์จริง
2. **Build** — `npm run build` ผ่าน เหลือเฉพาะ warning sweetalert2 (CommonJS) ที่มีอยู่เดิม
3. **Assets ถูกคัดลอก** — `dist/angular-clean-architecture-serverless/assets/` มี logo 2 ไฟล์, favicon, เทมเพลตครบ 117 หน้า + marketing

## Commit

```
f39198d Replace inline SVG logos with project logo and add favicon in tablerhtml templates
125 files changed, 6470 insertions(+), 1561 deletions(-)
```

## หมายเหตุ

- Encoding: ไฟล์เป็น UTF-8 ไม่มี BOM (รักษา encoding เดิมไว้)
- หากต้องการโลโก้สีอื่นในโหมดมืด ให้ใช้ `logo-dark.png` แทนได้ แต่จะต้องเอา CSS inversion ของ `navbar-brand-autodark` ออก
