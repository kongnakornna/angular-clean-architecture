# โมดูล Batch (งานตามช่วงเวลา)

## ภาพรวม

โมดูล Batch ใช้สำหรับจัดการงานที่ทำงานตามช่วงเวลาหรือแบตช์ (scheduled/batch jobs) รองรับการดูรายการงานที่กำหนดไว้ การสร้างงานใหม่ การเรียกใช้งานด้วยตนเอง และการดูประวัติการทำงาน

## โครงสร้างโฟลเดอร์

```
batch/
├── domain/
│   ├── entities/
│   │   └── batch-job.entity.ts             — เอนทิตี้ batch job
│   ├── repositories/
│   │   └── batch-job.repository.ts         — interface IBatchJobRepository
│   └── use-cases/                           — (เตรียมไว้สำหรับ use cases)
├── data/
│   ├── datasources/
│   │   └── batch.api.datasource.ts          — datasource สำหรับเรียก API
│   ├── dtos/                                — (เตรียมไว้สำหรับ DTOs)
│   └── repositories/
│       └── batch-job.repository.impl.ts     — implement repository
└── presentation/
    └── pages/
        └── batch-list/
            ├── batch-list.component.ts
            ├── batch-list.component.html
            └── batch-list.component.spec.ts
```

## ไฟล์สำคัญ

| ไฟล์ | คำอธิบาย |
|------|----------|
| `domain/entities/batch-job.entity.ts` | นิยามโครงสร้างข้อมูล batch job |
| `domain/repositories/batch-job.repository.ts` | interface สำหรับดำเนินการกับ batch job |
| `data/datasources/batch.api.datasource.ts` | จัดการการสื่อสารกับ REST API |
| `data/repositories/batch-job.repository.impl.ts` | implement repository ตาม interface |
| `presentation/pages/batch-list/` | คอมโพเนนต์แสดงรายการ batch job |

## Route

- `/batch/jobs` — หน้ารายการ batch job

## API Endpoints

| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| GET | `/api/v1/batch/jobs` | ดึงรายการ batch jobs ทั้งหมด |
| POST | `/api/v1/batch/jobs` | สร้าง batch job ใหม่ |
| POST | `/api/v1/batch/jobs/{id}/trigger` | สั่งให้ batch job ทำงานทันที |
| GET | `/api/v1/batch/jobs/{id}/history` | ดึงประวัติการทำงานของ batch job |
