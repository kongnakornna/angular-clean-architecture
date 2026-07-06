# โมดูล IoT (อุปกรณ์ IoT)

## ภาพรวม

โมดูล IoT ใช้สำหรับจัดการติดตามและตรวจสอบอุปกรณ์ IoT รองรับการลงทะเบียนอุปกรณ์ การติดตามตำแหน่ง ดูประวัติการเคลื่อนไหว และอ่านค่าจากเซ็นเซอร์ของอุปกรณ์

## โครงสร้างโฟลเดอร์

```
iot/
├── domain/
│   ├── entities/
│   │   └── device.entity.ts                — เอนทิตี้อุปกรณ์ IoT
│   ├── repositories/
│   │   └── iot.repository.ts              — interface IIoTRepository
│   └── use-cases/                          — (เตรียมไว้สำหรับ use cases)
├── data/
│   ├── datasources/
│   │   └── iot.api.datasource.ts           — datasource สำหรับเรียก API
│   ├── dtos/                               — (เตรียมไว้สำหรับ DTOs)
│   └── repositories/
│       └── iot.repository.impl.ts          — implement repository
└── presentation/
    └── pages/
        └── device-list/
            ├── device-list.component.ts
            ├── device-list.component.html
            └── device-list.component.spec.ts
```

## ไฟล์สำคัญ

| ไฟล์ | คำอธิบาย |
|------|----------|
| `domain/entities/device.entity.ts` | นิยามโครงสร้างข้อมูลอุปกรณ์ IoT |
| `domain/repositories/iot.repository.ts` | interface สำหรับดำเนินการกับอุปกรณ์ IoT |
| `data/datasources/iot.api.datasource.ts` | จัดการการสื่อสารกับ REST API |
| `data/repositories/iot.repository.impl.ts` | implement repository ตาม interface |
| `presentation/pages/device-list/` | คอมโพเนนต์แสดงรายการอุปกรณ์ |

## Route

- `/iot/devices` — หน้ารายการอุปกรณ์ IoT

## API Endpoints

| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| GET | `/api/v1/iot/devices` | ดึงรายการอุปกรณ์ IoT ทั้งหมด |
| POST | `/api/v1/iot/devices` | ลงทะเบียนอุปกรณ์ IoT ใหม่ |
| GET | `/api/v1/iot/devices/{id}/location` | ดึงตำแหน่งปัจจุบันของอุปกรณ์ |
| GET | `/api/v1/iot/devices/{id}/history` | ดึงประวัติการเคลื่อนไหวของอุปกรณ์ |
| GET | `/api/v1/iot/devices/{id}/sensors` | ดึงค่าจากเซ็นเซอร์ของอุปกรณ์ |
