# โมดูล Payment (การชำระเงิน)

## ภาพรวม

โมดูล Payment ใช้สำหรับจัดการบันทึกการชำระเงิน ใบเสร็จรับเงิน และการคืนเงิน รองรับการบันทึกการชำระเงิน การคืนเงิน ดูประวัติการชำระเงินของลูกค้า ตรวจสอบยอดค้างชำระ จัดการวิธีการชำระเงิน และสร้างเอกสารใบเสร็จ PDF

## โครงสร้างโฟลเดอร์

```
payment/
├── domain/
│   ├── entities/
│   │   └── payment.entity.ts              — เอนทิตี้การชำระเงิน
│   ├── repositories/
│   │   └── payment.repository.ts          — interface IPaymentRepository
│   └── use-cases/                          — (เตรียมไว้สำหรับ use cases)
├── data/
│   ├── datasources/
│   │   └── payment.api.datasource.ts       — datasource สำหรับเรียก API
│   ├── dtos/                               — (เตรียมไว้สำหรับ DTOs)
│   └── repositories/
│       └── payment.repository.impl.ts      — implement repository
└── presentation/
    └── pages/
        └── payment-list/
            ├── payment-list.component.ts
            ├── payment-list.component.html
            └── payment-list.component.spec.ts
```

## ไฟล์สำคัญ

| ไฟล์ | คำอธิบาย |
|------|----------|
| `domain/entities/payment.entity.ts` | นิยามโครงสร้างข้อมูลการชำระเงิน |
| `domain/repositories/payment.repository.ts` | interface สำหรับดำเนินการกับ Payment |
| `data/datasources/payment.api.datasource.ts` | จัดการการสื่อสารกับ REST API |
| `data/repositories/payment.repository.impl.ts` | implement repository ตาม interface |
| `presentation/pages/payment-list/` | คอมโพเนนต์แสดงรายการชำระเงิน |

## Route

- `/payments` — หน้ารายการชำระเงิน

## API Endpoints

| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| GET | `/api/v1/payments` | ดึงรายการชำระเงินทั้งหมด |
| POST | `/api/v1/payments` | บันทึกการชำระเงินใหม่ |
| GET | `/api/v1/payments/{id}` | ดึงข้อมูลการชำระเงินตาม ID |
| DELETE | `/api/v1/payments/{id}` | ลบรายการชำระเงิน |
| POST | `/api/v1/payments/{id}/refund` | ดำเนินการคืนเงิน |
| GET | `/api/v1/payments/history/{customerId}` | ดึงประวัติการชำระเงินของลูกค้า |
| GET | `/api/v1/payments/outstanding/{customerId}` | ดึงยอดค้างชำระของลูกค้า |
| GET | `/api/v1/payment-methods` | ดึงรายการวิธีการชำระเงิน |
| GET | `/api/v1/receipts/{id}` | ดึงข้อมูลใบเสร็จ |
| GET | `/api/v1/receipts/{id}/pdf` | ดาวน์โหลด PDF ใบเสร็จ |
