# 01 — ภาพรวมโปรเจกต์ (Project Overview)

## ข้อมูลทั่วไป

| รายการ | ค่า |
|--------|-----|
| ชื่อโปรเจกต์ | **iCmon** (`icmonwebapp` ใน package.json) |
| ประเภท | ระบบบริหารจัดการธุรกิจครบวงจร (Job Card, CRM, Inventory, IoT, AI) |
| Framework | Angular 21.2.17 (NgModule root + Standalone pages) |
| ภาษา | TypeScript ~5.9 |
| UI Kit | Tabler (@tabler/core) + Bootstrap 5.3.8 + Tailwind CSS 3.2.4 |
| State | Angular Signals + @ngrx/component-store |
| i18n | @ngx-translate/core 18 (ไฟล์แปลใน `src/assets/i18n/`) |
| Charts | Chart.js 4 + ng2-charts 10 |
| Icons | angular-tabler-icons / ngx-tabler-icons |
| Testing | Jasmine 4.5 + Karma 6.4 |
| Deploy | Docker (nginx) / Netlify |

## Tech Stack ฉบับเต็ม

```json
// dependencies หลัก (package.json)
@angular/* ^21.2.17        // framework
@ngrx/component-store ^21  // local state
@ngx-translate/core ^18    // i18n
@tabler/core ^1.4          // UI theme
chart.js + ng2-charts      // dashboard charts
date-fns                   // date utilities
sweetalert2                // dialogs
mongodb                    // (ใช้ใน netlify functions)
```

## สั่งรันโปรเจกต์

| คำสั่ง | ความหมาย |
|--------|----------|
| `npm start` | `ng serve` — dev server ที่ `http://localhost:4200` (hot reload) |
| `npm run build` | production build → `dist/` |
| `npm run watch` | build แบบ watch + development config |
| `npm test` | รัน unit tests ผ่าน Karma (Chrome) |

> ทุก script เซ็ต `SASS_SILENCE_DEPRECATIONS=import` เพื่อซ่อน deprecation warning ของ Sass

## Environment Configuration

| ไฟล์ | โหมด |
|------|------|
| `src/environments/environment.ts` | Development |
| `src/environments/environment.prod.ts` | Production |

```typescript
export const environment = {
  production: false,
  demo: false,               // true = ใช้ DemoAuthRepositoryImpl
  useProxy: true,            // dev ใช้ proxy.conf.json
  apiTargetUrl: 'http://localhost:5000',
  apiEndpoints: [            // Multi-API Fallback
    { url: 'http://localhost:5000', name: 'Primary', priority: 1 },
    { url: 'http://localhost:3003', name: 'Secondary', priority: 2 },
    { url: 'http://localhost:8000', name: 'Tertiary', priority: 3 },
  ],
  apiFallback: { enabled: true, maxRetries: 2, ... },
  logger: { enabled: true, level: 'debug', prefix: '[iCmon-Dev]' },
  ollamaUrl: 'http://localhost:11434',   // AI Chatbot (Ollama)
  ollamaModel: 'llama3',
  chatbotEnabled: true,
};
```

### Proxy (Dev)

`proxy.conf.json` ยิง request ผ่าน proxy ไปที่ backend `http://localhost:5000`
(ดูรายละเอียดเพิ่มใน `docs/api-fallback/`)

## โมดูลฟีเจอร์ทั้งหมด

ปัจจุบันมี **24 feature folders** ใน `src/app/features/`:

ai-analytics, ai-chatbot, alarm, auth, batch, customer, dashboard, document,
email, inventory, iot, job-card, monitoring, mqtt, orders, pages, payment,
purchase-order, quotation, report, settings, system, websocket, wos

(รายละเอียดแต่ละโมดูล → [05-feature-modules.md](05-feature-modules.md))

## บทบาทผู้ใช้ (Roles)

| บทบาท | สิทธิ์ |
|-------|--------|
| Admin | ทุกโมดูล + จัดการผู้ใช้/Role |
| Manager | Job Card, Quotation, PO, Dashboard, Reports |
| Staff | Job Card, Customer, Inventory (บางส่วน) |
| Technician | Job Card (อัปเดตสถานะ), GPS Tracking, IoT |
| Customer | Web Order System (WOS) |
