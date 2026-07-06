# โมดูล Email (อีเมล)

## ภาพรวม

โมดูล Email ใช้สำหรับจัดการการส่งอีเมล เทมเพลตอีเมล และประวัติการส่ง รองรับการส่งอีเมลเดี่ยว ส่งอีเมลจากเทมเพลต ส่งแบบกลุ่ม ตรวจสอบสถานะการส่ง จัดการเทมเพลตอีเมล และดูประวัติการส่ง

## โครงสร้างโฟลเดอร์

```
email/
├── domain/
│   ├── entities/
│   │   └── email-template.entity.ts        — เอนทิตี้เทมเพลตอีเมล
│   ├── repositories/
│   │   └── email.repository.ts             — interface IEmailRepository
│   └── use-cases/                           — (เตรียมไว้สำหรับ use cases)
├── data/
│   ├── datasources/
│   │   └── email.api.datasource.ts          — datasource สำหรับเรียก API
│   ├── dtos/                                — (เตรียมไว้สำหรับ DTOs)
│   └── repositories/
│       └── email.repository.impl.ts         — implement repository
└── presentation/
    └── pages/
        └── email-templates/
            ├── email-templates.component.ts
            ├── email-templates.component.html
            └── email-templates.component.spec.ts
```

## ไฟล์สำคัญ

| ไฟล์ | คำอธิบาย |
|------|----------|
| `domain/entities/email-template.entity.ts` | นิยามโครงสร้างข้อมูลเทมเพลตอีเมล |
| `domain/repositories/email.repository.ts` | interface สำหรับดำเนินการกับอีเมล |
| `data/datasources/email.api.datasource.ts` | จัดการการสื่อสารกับ REST API |
| `data/repositories/email.repository.impl.ts` | implement repository ตาม interface |
| `presentation/pages/email-templates/` | คอมโพเนนต์จัดการเทมเพลตอีเมล |

## Route

- `/email/templates` — หน้าจัดการเทมเพลตอีเมล

## API Endpoints

| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| POST | `/api/v1/email/send` | ส่งอีเมลเดี่ยว |
| POST | `/api/v1/email/send-template` | ส่งอีเมลจากเทมเพลต |
| POST | `/api/v1/email/bulk` | ส่งอีเมลแบบกลุ่ม |
| GET | `/api/v1/email/status/{emailId}` | ตรวจสอบสถานะการส่งอีเมล |
| GET | `/api/v1/email/templates` | ดึงรายการเทมเพลตอีเมล |
| POST | `/api/v1/email/templates` | สร้างเทมเพลตอีเมลใหม่ |
| PUT | `/api/v1/email/templates` | อัปเดตเทมเพลตอีเมล |
| DELETE | `/api/v1/email/templates` | ลบเทมเพลตอีเมล |
| GET | `/api/v1/email/history` | ดึงประวัติการส่งอีเมล |
