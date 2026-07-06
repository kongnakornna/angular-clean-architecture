# โมดูล Purchase Order (ใบสั่งซื้อ)

## ภาพรวม

โมดูล Purchase Order ใช้สำหรับจัดการใบสั่งซื้อสินค้าจากซัพพลายเออร์ รองรับการสร้าง ยกเลิก รับสินค้า ส่งออเดอร์ พร้อมติดตามประวัติการเปลี่ยนแปลง และจัดการรายการสินค้าในแต่ละใบสั่งซื้อ

## โครงสร้างโฟลเดอร์

```
purchase-order/
├── domain/
│   ├── entities/
│   │   └── purchase-order.entity.ts         — เอนทิตี้ใบสั่งซื้อ
│   ├── repositories/
│   │   └── purchase-order.repository.ts     — interface IPurchaseOrderRepository
│   └── use-cases/                            — (เตรียมไว้สำหรับ use cases)
├── data/
│   ├── datasources/
│   │   └── po.api.datasource.ts              — datasource สำหรับเรียก API
│   ├── dtos/                                 — (เตรียมไว้สำหรับ DTOs)
│   └── repositories/
│       └── purchase-order.repository.impl.ts — implement repository
└── presentation/
    └── pages/
        └── po-list/
            ├── po-list.component.ts
            ├── po-list.component.html
            └── po-list.component.spec.ts
```

## ไฟล์สำคัญ

| ไฟล์ | คำอธิบาย |
|------|----------|
| `domain/entities/purchase-order.entity.ts` | นิยามโครงสร้างข้อมูล Purchase Order |
| `domain/repositories/purchase-order.repository.ts` | interface สำหรับดำเนินการกับ Purchase Order |
| `data/datasources/po.api.datasource.ts` | จัดการการสื่อสารกับ REST API |
| `data/repositories/purchase-order.repository.impl.ts` | implement repository ตาม interface |
| `presentation/pages/po-list/` | คอมโพเนนต์แสดงรายการใบสั่งซื้อ |

## Route

- `/purchase-orders` — หน้ารายการใบสั่งซื้อ

## API Endpoints

| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| GET | `/api/v1/purchase-orders` | ดึงรายการใบสั่งซื้อทั้งหมด |
| POST | `/api/v1/purchase-orders` | สร้างใบสั่งซื้อใหม่ |
| GET | `/api/v1/purchase-orders/{id}` | ดึงใบสั่งซื้อตาม ID |
| PUT | `/api/v1/purchase-orders/{id}` | อัปเดตใบสั่งซื้อ |
| DELETE | `/api/v1/purchase-orders/{id}` | ลบใบสั่งซื้อ |
| PUT | `/api/v1/purchase-orders/{id}/cancel` | ยกเลิกใบสั่งซื้อ |
| PUT | `/api/v1/purchase-orders/{id}/receive` | รับสินค้าตามใบสั่งซื้อ |
| PUT | `/api/v1/purchase-orders/{id}/send` | ส่งใบสั่งซื้อไปยังซัพพลายเออร์ |
| GET | `/api/v1/purchase-orders/{id}/history` | ดึงประวัติการเปลี่ยนแปลงของใบสั่งซื้อ |
| POST | `/api/v1/purchase-orders/{poHeaderId}/details` | เพิ่มรายการสินค้าในใบสั่งซื้อ |
| PUT | `/api/v1/purchase-orders/{poHeaderId}/details` | อัปเดตรายการสินค้าในใบสั่งซื้อ |
| DELETE | `/api/v1/purchase-orders/{poHeaderId}/details` | ลบรายการสินค้าออกจากใบสั่งซื้อ |
