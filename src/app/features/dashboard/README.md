# โมดูล Dashboard

## ภาพรวม

โมดูล Dashboard ใช้สำหรับแสดงภาพรวมของธุรกิจ ได้แก่ เมตริกสำคัญ (KPI), กราฟรายได้, กิจกรรมล่าสุด และตัวชี้วัดประสิทธิภาพต่าง ๆ ออกแบบตามหลัก Clean Architecture เพื่อแยกส่วนการทำงานระหว่าง Domain, Data และ Presentation อย่างชัดเจน

## โครงสร้างโฟลเดอร์

```
dashboard/
├── data/
│   ├── datasources/
│   │   └── dashboard.api.datasource.ts
│   └── repositories/
│       └── dashboard.repository.impl.ts
├── domain/
│   ├── entities/
│   │   └── dashboard-stats.entity.ts
│   └── repositories/
│       └── dashboard.repository.ts
└── presentation/
    └── pages/
        └── main-dashboard/
            ├── main-dashboard.component.ts
            ├── main-dashboard.component.html
            └── main-dashboard.component.spec.ts
```

## ไฟล์สำคัญและหน้าที่

| ไฟล์ | หน้าที่ |
|------|--------|
| `domain/entities/dashboard-stats.entity.ts` | นิยาม Interface `DashboardStats`, `RevenueData`, `Activity` |
| `domain/repositories/dashboard.repository.ts` | Interface `IDashboardRepository` สำหรับเข้าถึงข้อมูล dashboard |
| `data/datasources/dashboard.api.datasource.ts` | Data source เรียก API จริงผ่าน HttpClient |
| `data/repositories/dashboard.repository.impl.ts` | Implement `IDashboardRepository` โดย map ข้อมูลจาก datasource |
| `presentation/pages/main-dashboard/main-dashboard.component.ts` | หน้า Dashboard หลัก (standalone component, route: `/dashboard`, ต้องผ่าน Auth guard) |

## API Endpoints ที่ใช้งาน

| Method | Endpoint | รายละเอียด |
|--------|----------|-------------|
| GET | `/api/v1/dashboard/overview` | ภาพรวม dashboard |
| POST | `/api/v1/dashboard/filtered` | ข้อมูล dashboard แบบกรอง |
| GET | `/api/v1/dashboard/financial` | สรุปข้อมูลทางการเงิน |
| GET | `/api/v1/dashboard/inventory` | ภาพรวมสินค้าคงคลัง |
| GET | `/api/v1/dashboard/job-status` | สรุปสถานะงาน |
| GET | `/api/v1/dashboard/revenue` | รายได้ตามช่วงเวลา |
| GET | `/api/v1/dashboard/sales` | ภาพรวมยอดขาย |
| GET | `/api/v1/dashboard/service-category` | รายได้ตามหมวดหมู่บริการ |
| GET | `/api/v1/dashboard/top-parts` | อะไหล่ขายดีที่สุด |

## หมายเหตุ

ปัจจุบัน `MainDashboardComponent` ใช้ **mock data ภายใน (hard-coded)** ผ่าน `setTimeout` ใน `ngOnInit` ยังไม่ได้เชื่อมต่อกับ `IDashboardRepository` หรือ `DashboardApiDataSource` จริง การเชื่อมต่อกับ API จริงจะต้องทำการ Inject `DashboardRepositoryImpl` และเรียกใช้ method ต่าง ๆ แทน mock data ปัจจุบัน
