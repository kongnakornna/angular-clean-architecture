# Theme Architecture - แผนผังระบบธีมทั้งโครงการ

## ภาพรวม

ระบบธีมของโปรเจกต์อิงจาก **Tabler v1.4.0** ประกอบด้วย 2 โลกที่ทำงานคู่กัน:

1. **Angular app** — ควบคุมธีมผ่าน `LayoutService` (signals)
2. **Static templates** (`src/assets/tablerhtml/`) — self-contained ใช้ `dist/js/tabler-theme.min.js`

ทั้งสองโลกเชื่อมกันผ่าน **localStorage key `tabler-*`** และ `data-bs-theme*` attributes บน `<html>` จึง sync ธีมเดียวกันได้

## Mermaid Flowchart

```mermaid
flowchart TD
    subgraph BOOT["BROWSER BOOT (pre-paint)"]
        A[index.html] --> B["tabler-theme.js<br/>อ่าน ?theme= / localStorage 'tabler-*'"]
        B --> C["ตั้ง data-bs-theme* บน <html><br/>(ป้องกัน FOUC)"]
    end

    subgraph ANGULAR["ANGULAR BOOT"]
        D["LayoutService<br/>src/app/core/services/layout.service.ts"]
        D --> E["signal _state<br/>theme / base / font / primary / radius"]
        E --> F["loadSettings() ← localStorage 'tabler-*'"]
        F --> G["applySettings()<br/>data-bs-theme* + class theme-{base} font-{font}"]
    end

    subgraph CSS["CSS VARIABLES"]
        H["styles.scss<br/>@use @tabler/core/scss/tabler + tabler-themes"]
        H --> I["[data-bs-theme=dark] → --tblr-* โหมดมืด<br/>(layout/_dark.scss)"]
        H --> J["[data-bs-theme-base] → gray palette 50–950"]
        H --> K["[data-bs-theme-primary] → --tblr-primary (+rgb)"]
        H --> L["[data-bs-theme-radius] → --tblr-border-radius-scale"]
        H --> M["[data-bs-theme-font] → --tblr-body-font-family"]
        H --> N["+ custom/_utilities.scss<br/>(ตัวแทรกของโปรเจกต์)"]
    end

    subgraph UI["USER INTERACTION"]
        O["Header toggle"]
        P["LayoutSettings offcanvas"]
        Q["ThemeBuilder (auth)"]
        R["ThemeSettings page /settings/theme"]
    end

    subgraph REACTIVE["REACTIVE COMPONENTS"]
        S["AuthLayout<br/>*ngIf swap logo-light ↔ logo-dark"]
        T["Header<br/>isDarkMode + ปุ่ม moon/sun (hide-theme-*)"]
        U["Sidebar<br/>[attr.data-bs-theme] + autodark"]
    end

    subgraph STATIC["STATIC TEMPLATES"]
        V["src/assets/tablerhtml/*.html"]
        V --> W["dist/js/tabler-theme.min.js<br/>(ใช้ localStorage 'tabler-*' เดียวกัน)"]
        V --> X["navbar-brand-autodark + img logo-light.png<br/>(CSS invert โหมดมืด)"]
        V --> Y["ลิงก์ ?theme=dark / ?theme=light"]
    end

    C --> D
    G --> H
    UI --> Z["layout.update(key, value)<br/>signal → saveSettings('tabler-*') → applySettings(DOM)"]
    Z --> G
    G --> REACTIVE
    W <-->|"localStorage 'tabler-*'"| F
```

## ข้อมูลสำคัญ

| รายการ | ตำแหน่ง | หมายเหตุ |
| --- | --- | --- |
| State store | `src/app/core/services/layout.service.ts` | signals 5 ค่า (theme/base/font/primary/radius) |
| Boot script | `node_modules/@tabler/core/dist/js/tabler-theme.js` | รันก่อน Angular, ป้องกัน FOUC |
| จุดเชื่อมสองโลก | localStorage key `tabler-*` | Angular + static templates อ่าน/เขียนชุดเดียวกัน |
| Settings UI | `layout-settings/*`, `theme-builder/*`, `theme-settings/*` | ตัวเลือก 5 กลุ่มเหมือนกันทั้ง 3 จุด |
| CSS | `src/styles.scss` → `@tabler/core/scss/{tabler,tabler-themes}` + `custom/_utilities.scss` | |
| Components ที่ผูกธีม | `auth-layout.component.html`, `header.component.{ts,html}`, `sidebar.component.html` | |

## ข้อสังเกต / Dead Code

- ธีมมีแค่ **light / dark** — ไม่มีโหมด auto (`prefers-color-scheme`)
- `src/assets/tabler/scss/` มี Tabler SCSS ทั้งชุดที่ **ไม่ถูก import** (dead weight) — มีเฉพาะ `custom/_utilities.scss` ที่ใช้จริง
- คีย์ i18n กลุ่ม layout (navbarDark, layoutMode, rtlMode ฯลฯ) ถูกนิยามไว้แต่ UI ยังไม่ใช้

## localStorage Keys

| Key | ใช้โดย | สถานะ |
| --- | --- | --- |
| `tabler-theme`, `tabler-theme-base`, `tabler-theme-font`, `tabler-theme-primary`, `tabler-theme-radius` | `LayoutService` + `tabler-theme.js` + static templates | ✅ ใช้งานจริง |
| `tablerMenuPosition/Behavior/ContainerLayout` | `preview/js/demo.js` (static templates) | เฉพาะ demo |

## Data Flow (ข้อความ)

```
[BROWSER BOOT]  tabler-theme.js → data-bs-theme* บน <html>
      ▼
[ANGULAR BOOT]  LayoutService → loadSettings('tabler-*') → applySettings(DOM)
      ▼
[CSS VARS]      [data-bs-theme*] selectors → --tblr-* variables
      ▼
[USER]          Header / LayoutSettings / ThemeBuilder / ThemeSettings
      ▼
                layout.update(key, value) → signal → saveSettings → applySettings
      ▼
[REACTIVE]      AuthLayout (logo swap) / Header (ปุ่ม moon-sun) / Sidebar
```
