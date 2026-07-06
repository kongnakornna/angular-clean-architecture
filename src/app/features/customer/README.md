# โมดูลลูกค้า (Customer Module)

## 1. ภาพรวมของโมดูล

โมดูลลูกค้าทำหน้าที่จัดการข้อมูลลูกค้าทั้งหมดในระบบ ครอบคลุมการจัดการบริษัท (Companies),
ผู้ติดต่อ (Contacts), ยานพาหนะ (Vehicles) และประวัติการเข้ารับบริการ (Service History)
ออกแบบตามหลัก Clean Architecture โดยแบ่งเป็น 3 ชั้น (Layers) ได้แก่ Domain, Data และ Presentation

## 2. โครงสร้างโฟลเดอร์

```
customer/
├── domain/
│   ├── entities/
│   │   └── customer.entity.ts
│   ├── repositories/
│   │   └── customer.repository.ts
│   └── use-cases/
│       ├── list-customers.use-case.ts
│       ├── list-customers.use-case.spec.ts
│       ├── create-customer.use-case.ts
│       └── create-customer.use-case.spec.ts
├── data/
│   ├── datasources/
│   │   └── customer.api.datasource.ts
│   ├── dtos/
│   │   └── customer-response.dto.ts
│   └── repositories/
│       └── customer.repository.impl.ts
└── presentation/
    └── pages/
        └── customer-list/
            ├── customer-list.component.ts
            ├── customer-list.component.html
            └── customer-list.component.spec.ts
```

## 3. ไฟล์สำคัญและหน้าที่

### Domain Layer
- **`domain/entities/customer.entity.ts`** — กำหนด Entity หลักของลูกค้า ซึ่งเป็นโครงสร้างข้อมูลที่ไม่ขึ้นกับเทคโนโลยีใด ๆ
- **`domain/repositories/customer.repository.ts`** — Interface ของ Repository ที่กำหนดสัญญาระหว่าง Domain และ Data Layer
- **`domain/use-cases/list-customers.use-case.ts`** — Use Case สำหรับดึงรายการลูกค้า (รองรับการค้นหาและแบ่งหน้า)
- **`domain/use-cases/create-customer.use-case.ts`** — Use Case สำหรับสร้างลูกค้าใหม่

### Data Layer
- **`data/datasources/customer.api.datasource.ts`** — จัดการการสื่อสารกับ API ภายนอก (ICMON API)
- **`data/dtos/customer-response.dto.ts`** — DTO (Data Transfer Object) สำหรับแปลงข้อมูลที่ได้จาก API
- **`data/repositories/customer.repository.impl.ts`** — Implement Repository ตาม Interface ที่ Domain กำหนด โดยเรียกใช้ Datasource

### Presentation Layer
- **`presentation/pages/customer-list/customer-list.component.ts`** — Standalone Component สำหรับแสดงรายการลูกค้า (เส้นทาง: `/customers`)
- **`presentation/pages/customer-list/customer-list.component.html`** — เทมเพลตของหน้าแสดงรายการลูกค้า

## 4. API Endpoints ที่ใช้งาน

โมดูลนี้ทำงานร่วมกับ **ICMON API v1** ผ่าน endpoints ดังนี้:

### Customers
| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| GET | `/api/v1/customers` | ค้นหาลูกค้า (รองรับ pagination) |
| POST | `/api/v1/customers` | สร้างลูกค้าใหม่ |
| GET | `/api/v1/customers/{id}` | ดึงข้อมูลลูกค้าตาม ID |
| PUT | `/api/v1/customers/{id}` | อัปเดตข้อมูลลูกค้า |
| DELETE | `/api/v1/customers/{id}` | ลบลูกค้า (soft delete) |
| GET | `/api/v1/customers/phone/{phone}` | ค้นหาลูกค้าตามเบอร์โทรศัพท์ |
| GET | `/api/v1/customers/{id}/history` | ดึงประวัติการเข้ารับบริการของลูกค้า |

### Cars
| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| POST | `/api/v1/cars` | สร้างรถใหม่ |
| GET | `/api/v1/cars/customer/{customerId}` | ดึงรายการรถของลูกค้า |
| GET | `/api/v1/cars/plate/{licensePlate}` | ค้นหารถตามทะเบียน |
| GET | `/api/v1/cars/{id}` | ดึงข้อมูลรถตาม ID |
| PUT | `/api/v1/cars/{id}` | อัปเดตข้อมูลรถ |
| DELETE | `/api/v1/cars/{id}` | ลบรถ (soft delete) |
