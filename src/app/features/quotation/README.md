# โมดูล Quotation (ใบเสนอราคา)

## ภาพรวม

โมดูล Quotation ใช้สำหรับจัดการเอกสารใบเสนอราคา (Quotation) และใบเสนอโครงการ (Proposal) ให้กับลูกค้า รองรับการสร้าง แก้ไข อนุมัติ ปฏิเสธ และสร้าง PDF ของใบเสนอราคา พร้อมจัดการรายการอะไหล่และบริการภายในใบเสนอราคา

## โครงสร้างโฟลเดอร์

```
quotation/
├── domain/
│   ├── entities/
│   │   └── quotation.entity.ts          — เอนทิตี้ใบเสนอราคา
│   ├── repositories/
│   │   └── quotation.repository.ts      — interface IQuotationRepository
│   └── use-cases/                        — (เตรียมไว้สำหรับ use cases)
├── data/
│   ├── datasources/
│   │   └── quotation.api.datasource.ts   — datasource สำหรับเรียก API
│   ├── dtos/                             — (เตรียมไว้สำหรับ DTOs)
│   └── repositories/
│       └── quotation.repository.impl.ts  — implement repository
└── presentation/
    └── pages/
        └── quotation-list/
            ├── quotation-list.component.ts
            ├── quotation-list.component.html
            └── quotation-list.component.spec.ts
```

## ไฟล์สำคัญ

| ไฟล์ | คำอธิบาย |
|------|----------|
| `domain/entities/quotation.entity.ts` | นิยามโครงสร้างข้อมูล Quotation |
| `domain/repositories/quotation.repository.ts` | interface สำหรับดำเนินการกับ Quotation |
| `data/datasources/quotation.api.datasource.ts` | จัดการการสื่อสารกับ REST API |
| `data/repositories/quotation.repository.impl.ts` | implement repository ตาม interface |
| `presentation/pages/quotation-list/` | คอมโพเนนต์แสดงรายการใบเสนอราคา |

## Route

- `/quotations` — หน้ารายการใบเสนอราคา

## API Endpoints

| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| GET | `/api/v1/quotations` | ดึงรายการใบเสนอราคาทั้งหมด |
| POST | `/api/v1/quotations` | สร้างใบเสนอราคาใหม่ |
| GET | `/api/v1/quotations/{id}` | ดึงใบเสนอราคาตาม ID |
| PUT | `/api/v1/quotations/{id}` | อัปเดตใบเสนอราคา |
| DELETE | `/api/v1/quotations/{id}` | ลบใบเสนอราคา |
| PUT | `/api/v1/quotations/{id}/approve` | อนุมัติใบเสนอราคา |
| PUT | `/api/v1/quotations/{id}/reject` | ปฏิเสธใบเสนอราคา |
| GET | `/api/v1/quotations/{id}/pdf` | ดาวน์โหลด PDF ของใบเสนอราคา |
| POST | `/api/v1/quotations/parts` | เพิ่มอะไหล่ในใบเสนอราคา |
| GET | `/api/v1/quotations/parts` | ดึงรายการอะไหล่ในใบเสนอราคา |
| PUT | `/api/v1/quotations/parts` | อัปเดตอะไหล่ในใบเสนอราคา |
| DELETE | `/api/v1/quotations/parts` | ลบอะไหล่ออกจากใบเสนอราคา |
| POST | `/api/v1/quotations/services` | เพิ่มบริการในใบเสนอราคา |
| GET | `/api/v1/quotations/services` | ดึงรายการบริการในใบเสนอราคา |
| PUT | `/api/v1/quotations/services` | อัปเดตบริการในใบเสนอราคา |
| DELETE | `/api/v1/quotations/services` | ลบบริการออกจากใบเสนอราคา |
