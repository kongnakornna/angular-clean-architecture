# โมดูล Document (เอกสาร)

## ภาพรวม

โมดูล Document ใช้สำหรับจัดการไฟล์อัปโหลด การดาวน์โหลดเอกสาร และเทมเพลตเอกสาร รองรับการอัปโหลดไฟล์ ดาวน์โหลดไฟล์ ลบเอกสาร การสร้างเอกสารจากเทมเพลต และจัดการเทมเพลตเอกสาร

## โครงสร้างโฟลเดอร์

```
document/
├── domain/
│   ├── entities/
│   │   └── document.entity.ts              — เอนทิตี้เอกสาร
│   ├── repositories/
│   │   └── document.repository.ts          — interface IDocumentRepository
│   └── use-cases/                           — (เตรียมไว้สำหรับ use cases)
├── data/
│   ├── datasources/
│   │   └── document.api.datasource.ts       — datasource สำหรับเรียก API
│   ├── dtos/                                — (เตรียมไว้สำหรับ DTOs)
│   └── repositories/
│       └── document.repository.impl.ts      — implement repository
└── presentation/
    └── pages/
        └── document-list/
            ├── document-list.component.ts
            ├── document-list.component.html
            └── document-list.component.spec.ts
```

## ไฟล์สำคัญ

| ไฟล์ | คำอธิบาย |
|------|----------|
| `domain/entities/document.entity.ts` | นิยามโครงสร้างข้อมูลเอกสาร |
| `domain/repositories/document.repository.ts` | interface สำหรับดำเนินการกับเอกสาร |
| `data/datasources/document.api.datasource.ts` | จัดการการสื่อสารกับ REST API |
| `data/repositories/document.repository.impl.ts` | implement repository ตาม interface |
| `presentation/pages/document-list/` | คอมโพเนนต์แสดงรายการเอกสาร |

## Route

- `/documents` — หน้ารายการเอกสาร

## API Endpoints

| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| GET | `/api/v1/documents` | ดึงรายการเอกสารทั้งหมด |
| POST | `/api/v1/documents/upload` | อัปโหลดไฟล์เอกสาร |
| GET | `/api/v1/documents/{id}` | ดึงข้อมูลเอกสารตาม ID |
| DELETE | `/api/v1/documents/{id}` | ลบเอกสาร |
| GET | `/api/v1/documents/{id}/download` | ดาวน์โหลดไฟล์เอกสาร |
| POST | `/api/v1/documents/generate` | สร้างเอกสารจากเทมเพลต |
| GET | `/api/v1/templates` | ดึงรายการเทมเพลตเอกสาร |
| POST | `/api/v1/templates` | สร้างเทมเพลตเอกสารใหม่ |
| DELETE | `/api/v1/templates` | ลบเทมเพลตเอกสาร |
