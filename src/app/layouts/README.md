# Layout Components

โมดูลสำหรับโครงสร้างหลักของแอปพลิเคชัน (App Shell) ประกอบด้วย Layout หลัก header, sidebar, และ footer

## โครงสร้างโฟลเดอร์

```
layouts/
├── app-layout/
│   ├── app-layout.component.ts   # AppLayoutComponent - shell หลัก
│   └── app-layout.component.html # template
├── header/
│   ├── header.component.ts       # HeaderComponent - แถบนำทางด้านบน
│   └── header.component.html
├── sidebar/
│   ├── sidebar.component.ts      # SidebarComponent - เมนูด้านข้าง
│   └── sidebar.component.html
├── footer/
│   ├── footer.component.ts       # FooterComponent - ส่วนท้าย
│   └── footer.component.html
└── README.md
```

## รายละเอียด Components

### AppLayoutComponent

Component หลักที่รวมทุกส่วนเป็น App Shell:
- เลือกใช้ `app-layout` selector
- ใช้ `standalone: false`
- มี `isSidebarCollapsed` state สำหรับควบคุมการแสดง sidebar
- Method `toggleSidebar()` สำหรับสลับสถานะ sidebar พร้อม toggle class `sidebar-collapsed` ที่ `document.body`

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

**CSS Highlights:**
- `.app-wrapper` - flex container ความสูงเต็มจอ
- `.page-wrapper` - content area มี `margin-left: 240px` เท่ากับความกว้าง sidebar
- `.sidebar-collapsed .page-wrapper` - เมื่อ sidebar ยุบ margin-left เหลือ 60px
- มี `transition: margin-left 0.3s ease`

### HeaderComponent

แถบนำทางด้านบน:
- `@Output() toggleSidebar` - emit event เมื่อคลิกปุ่มแสดง/ซ่อน sidebar
- มี `unreadCount` แสดงจำนวนการแจ้งเตือนที่ยังไม่ได้อ่าน
- `notifications` array - รายการแจ้งเตือนตัวอย่าง
- `profileMenu` array - เมนูโปรไฟล์ (โปรไฟล์, ตั้งค่า, ออกจากระบบ)
- Method `logout()` - ลบ localStorage และ redirect ไป `/login`

### SidebarComponent

เมนูนำทางด้านข้าง:
- `@Input() isCollapsed` - รับสถานะจาก AppLayoutComponent
- `MenuItem` interface: `{ label, icon, route?, children? }`
- รายการเมนู:
  - แดชบอร์ด
  - การจัดการงาน (รายการงาน, บอร์ดงาน, สร้างงาน)
  - ลูกค้า (รายการลูกค้า, เพิ่มลูกค้า)
  - ใบเสนอราคา
  - ใบสั่งซื้อ
  - สินค้าคงคลัง
  - การชำระเงิน
  - เอกสาร
  - อุปกรณ์ IoT
  - คำสั่งซื้อออนไลน์
  - ระบบ (ผู้ใช้งาน, บทบาท)
- `expandedMenus: Set<string>` - จัดการสถานะ expansion ของเมนูย่อย
- Method `toggleSubmenu(label)` และ `isExpanded(label)` สำหรับเปิด/ปิดเมนูย่อย

### FooterComponent

ส่วนท้ายของหน้า:
- `currentYear` - ปีปัจจุบัน สำหรับแสดง copyright
- CSS: `margin-top: auto` เพื่อให้ footer อยู่ด้านล่างเสมอ

## การใช้งาน

Layout components ถูกใช้งานร่วมกับ Angular Router:

```typescript
// ใน Routing module
{
  path: '',
  component: AppLayoutComponent,
  children: [
    { path: 'dashboard', component: DashboardComponent },
    // feature routes อื่น ๆ
  ]
}
```

## สีและธีม

Components ใช้ CSS variables จาก Tabler (`var(--tblr-*)`) เพื่อรองรับการเปลี่ยนธีม
