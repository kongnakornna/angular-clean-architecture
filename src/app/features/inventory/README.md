# โมดูล Inventory (สินค้าคงคลัง)

## ภาพรวม

โมดูล Inventory ใช้สำหรับจัดการสินค้า/อะไหล่ ระดับสต็อก การเคลื่อนไหวของสินค้า และการปรับปรุงสต็อก รองรับการจัดการชิ้นส่วน การตรวจสอบสินค้าคงเหลือต่ำ การปรับยอดสต็อก การนับสต็อก การเบิกจ่าย และการรับเข้าสินค้า

## โครงสร้างโฟลเดอร์

```
inventory/
├── domain/
│   ├── entities/
│   │   └── product.entity.ts              — เอนทิตี้สินค้า/อะไหล่
│   ├── repositories/
│   │   └── inventory.repository.ts        — interface IInventoryRepository
│   └── use-cases/                          — (เตรียมไว้สำหรับ use cases)
├── data/
│   ├── datasources/
│   │   └── inventory.api.datasource.ts     — datasource สำหรับเรียก API
│   ├── dtos/                               — (เตรียมไว้สำหรับ DTOs)
│   └── repositories/
│       └── inventory.repository.impl.ts    — implement repository
└── presentation/
    └── pages/
        └── product-list/
            ├── product-list.component.ts
            ├── product-list.component.html
            └── product-list.component.spec.ts
```

## ไฟล์สำคัญ

| ไฟล์ | คำอธิบาย |
|------|----------|
| `domain/entities/product.entity.ts` | นิยามโครงสร้างข้อมูลสินค้า/อะไหล่ |
| `domain/repositories/inventory.repository.ts` | interface สำหรับดำเนินการกับสินค้าคงคลัง |
| `data/datasources/inventory.api.datasource.ts` | จัดการการสื่อสารกับ REST API |
| `data/repositories/inventory.repository.impl.ts` | implement repository ตาม interface |
| `presentation/pages/product-list/` | คอมโพเนนต์แสดงรายการสินค้า |

## Route

- `/products` — หน้ารายการสินค้า

## API Endpoints

| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| GET | `/api/v1/parts` | ดึงรายการอะไหล่ทั้งหมด |
| POST | `/api/v1/parts` | สร้างอะไหล่ใหม่ |
| GET | `/api/v1/parts/{id}` | ดึงอะไหล่ตาม ID |
| PUT | `/api/v1/parts/{id}` | อัปเดตอะไหล่ |
| DELETE | `/api/v1/parts/{id}` | ลบอะไหล่ |
| GET | `/api/v1/parts/low-stock` | ดึงรายการอะไหล่ที่สต็อกต่ำ |
| POST | `/api/v1/stock-adjustments` | ปรับยอดสต็อก |
| POST | `/api/v1/stock-takes` | บันทึกผลการนับสต็อก |
| GET | `/api/v1/stock-locations` | ดึงรายการตำแหน่งจัดเก็บ |
| POST | `/api/v1/stock-locations` | สร้างตำแหน่งจัดเก็บใหม่ |
| POST | `/api/v1/inventory/issue` | เบิกจ่ายสินค้าออกจากสต็อก |
| POST | `/api/v1/inventory/receive` | รับสินค้าเข้าสต็อก |
| POST | `/api/v1/part-picking` | บันทึกการหยิบอะไหล่ |
