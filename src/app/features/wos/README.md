# โมดูล WOS (Web Order System)

## ภาพรวม

โมดูล WOS (Web Order System) ใช้สำหรับจัดการคำสั่งซื้อออนไลน์ ตะกร้าสินค้า แคตตาล็อกสินค้า ราคาขาย และการติดตามสถานะคำสั่งซื้อ รองรับการทำรายการสินค้าในตะกร้า ค้นหาและเรียกดูแคตตาล็อก จัดการคำสั่งซื้อ และกำหนดราคาขาย

## โครงสร้างโฟลเดอร์

```
wos/
├── domain/
│   ├── entities/
│   │   └── web-order.entity.ts             — เอนทิตี้คำสั่งซื้อออนไลน์
│   ├── repositories/
│   │   └── web-order.repository.ts         — interface IWebOrderRepository
│   └── use-cases/                           — (เตรียมไว้สำหรับ use cases)
├── data/
│   ├── datasources/
│   │   └── wos.api.datasource.ts            — datasource สำหรับเรียก API
│   ├── dtos/                                — (เตรียมไว้สำหรับ DTOs)
│   └── repositories/
│       └── web-order.repository.impl.ts     — implement repository
└── presentation/
    └── pages/
        └── order-list/
            ├── order-list.component.ts
            ├── order-list.component.html
            └── order-list.component.spec.ts
```

## ไฟล์สำคัญ

| ไฟล์ | คำอธิบาย |
|------|----------|
| `domain/entities/web-order.entity.ts` | นิยามโครงสร้างข้อมูลคำสั่งซื้อออนไลน์ |
| `domain/repositories/web-order.repository.ts` | interface สำหรับดำเนินการกับ WOS |
| `data/datasources/wos.api.datasource.ts` | จัดการการสื่อสารกับ REST API |
| `data/repositories/web-order.repository.impl.ts` | implement repository ตาม interface |
| `presentation/pages/order-list/` | คอมโพเนนต์แสดงรายการคำสั่งซื้อ |

## Route

- `/wos/orders` — หน้ารายการคำสั่งซื้อออนไลน์

## API Endpoints

### Cart (ตะกร้าสินค้า)

| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| GET | `/api/v1/wos/cart` | ดึงข้อมูลตะกร้าสินค้า |
| POST | `/api/v1/wos/cart` | เพิ่มสินค้าในตะกร้า |
| PUT | `/api/v1/wos/cart` | อัปเดตรายการในตะกร้า |
| DELETE | `/api/v1/wos/cart` | ลบสินค้าออกจากตะกร้า |

### Catalogue (แคตตาล็อก)

| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| GET | `/api/v1/wos/catalogue` | ดึงรายการสินค้าทั้งหมด |
| GET | `/api/v1/wos/catalogue/categories` | ดึงหมวดหมู่สินค้า |
| GET | `/api/v1/wos/catalogue/search` | ค้นหาสินค้า |

### Orders (คำสั่งซื้อ)

| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| GET | `/api/v1/wos/orders` | ดึงรายการคำสั่งซื้อ |
| POST | `/api/v1/wos/orders` | สร้างคำสั่งซื้อใหม่ |
| PUT | `/api/v1/wos/orders/{id}` | อัปเดตคำสั่งซื้อ |
| DELETE | `/api/v1/wos/orders/{id}` | ลบคำสั่งซื้อ |
| PUT | `/api/v1/wos/orders/{id}/status` | อัปเดตสถานะคำสั่งซื้อ |
| GET | `/api/v1/wos/orders/{id}/tracking` | ดึงข้อมูลการติดตามคำสั่งซื้อ |

### Sales Prices (ราคาขาย)

| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| GET | `/api/v1/wos/sales-prices` | ดึงรายการราคาขาย |
| POST | `/api/v1/wos/sales-prices` | สร้างราคาขายใหม่ |
| PUT | `/api/v1/wos/sales-prices/{id}` | อัปเดตราคาขาย |
| DELETE | `/api/v1/wos/sales-prices/{id}` | ลบราคาขาย |
