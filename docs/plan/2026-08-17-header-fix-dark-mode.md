# แก้ไข Header Dark Mode

## ปัญหา

Header ยังเป็น dark แม้เลือก light mode ใน Theme Settings

## Root cause

`header.component.html` มี `[attr.data-bs-theme]="theme()"` ซ้ำกับ root `<html>` ที่ LayoutService ตั้งไว้แล้ว

Tabler CSS มี rule บังคับ:
```css
body[data-bs-theme='dark'] [data-bs-theme='light'] {
  @extend [data-bs-theme='dark'];
}
```

→ header ที่ set `data-bs-theme="light"` ถูกบังคับกลับเป็น dark เมื่ออยู่ใน dark body

## ภาพรวมการแก้ไข

| # | Layer | ไฟล์ | สิ่งที่แก้ |
|---|-------|------|-----------|
| 1 | template | `header.component.html` | ลบ `[attr.data-bs-theme]="theme()"` |
| 2 | component | `header.component.ts` | ลบ `readonly theme` property |
| 3 | tests | `header.component.spec.ts` | ลบ 3 tests เดิม + เขียน tests ใหม่ 2 tests |

## Section 1: ลบ attribute binding

**Location:** `src/app/layouts/header/header.component.html:1`

**From:**
```html
<header class="navbar navbar-expand-md d-print-none" [attr.data-bs-theme]="theme()">
```

**To:**
```html
<header class="navbar navbar-expand-md d-print-none">
```

**เหตุผล:** Header inherit จาก root `<html>` ผ่าน CSS variable cascade อยู่แล้ว — ไม่ต้อง set `data-bs-theme` ซ้ำ

## Section 2: ลบ theme property

**Location:** `src/app/layouts/header/header.component.ts:63`

**From:**
```typescript
readonly theme = this.layout.theme;
```

**To:** ลบบรรทัดนี้ออก

**เหตุผล:** ไม่มี usage ใน template แล้ว — `isDarkMode` getter ใช้ `this.layout.theme()` ตรง ๆ

## Section 3: แก้ unit tests

**Location:** `src/app/layouts/header/header.component.spec.ts`

**ลบ 3 tests เดิม:**
- `should set data-bs-theme to 'dark' when theme is dark`
- `should set data-bs-theme to 'light' when theme is light`
- `should toggle theme between light and dark`

**เขียน tests ใหม่ 2 tests:**
1. `should not have data-bs-theme attribute on header` — ทดสอบว่า header ไม่มี `data-bs-theme` attribute (inherit จาก root)
2. `should toggle theme via LayoutService` — ทดสอบว่า `toggleTheme()` เปลี่ยน LayoutService theme ได้ถูกต้อง

## Unit Tests

**เขียน**

Tests ที่ครอบคลุม:
- Header ไม่มี `data-bs-theme` attribute (inherit จาก root)
- `toggleTheme()` เปลี่ยน LayoutService theme ได้ถูกต้อง
- `isDarkMode` getter คืนค่าถูกต้องตาม LayoutService theme
