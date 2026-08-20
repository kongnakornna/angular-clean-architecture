# Multi-API Fallback System

> ระบบสลับ API อัตโนมัติเมื่อ API หลักล่ม  
> *Last updated: 2026-08-20 | Version: 1.0.0*

---

## สารบัญ

1. [ภาพรวม](#ภาพรวม)
2. [คุณสมบัติ](#คุณสมบัติ)
3. [โครงสร้างไฟล์](#โครงสร้างไฟล์)
4. [เอกสารประกอบ](#เอกสารประกอบ)
5. [Quick Start](#quick-start)
6. [ Links ที่เกี่ยวข้อง](#links-ที่เกี่ยวข้อง)

---

## ภาพรวม

ระบบ Multi-API Fallback ช่วยให้ Angular application สามารถสลับไปใช้ API endpoint อื่นโดยอัตโนมัติเมื่อ API หลักไม่ตอบสนองหรือล่ม ระบบนี้มีความยืดหยุ่นและสามารถเพิ่ม API endpoint ใหม่ได้ง่ายผ่าน configuration

### ปัญหาที่แก้ไข

- **API ล่ม**: เมื่อ API หลักไม่ตอบสนอง ระบบจะสลับไปใช้ API สำรองอัตโนมัติ
- **การเพิ่ม API ใหม่**: สามารถเพิ่ม API endpoint ใหม่ได้ง่ายผ่าน environment configuration
- **การตรวจสอบสถานะ**: สามารถตรวจสอบสถานะของ API endpoints ทั้งหมดได้แบบ real-time
- **การกู้คืน**: ระบบจะสลับกลับมาใช้ API หลักโดยอัตโนมัติเมื่อกลับมาทำงานปกติ

---

## คุณสมบัติ

### Automatic Failover
- ตรวจสอบ health ของ API endpoints ทุก 30 วินาที
- สลับไปใช้ API สำรองเมื่อ API หลักล้มเหลว
- กลับมาใช้ API หลักโดยอัตโนมัติเมื่อกลับมาทำงานปกติ

### Configurable
- กำหนด API endpoints ผ่าน environment files
- กำหนด priority สำหรับแต่ละ endpoint
- กำหนดค่า health check interval, failure threshold, retry delay

### Health Dashboard
- แสดงสถานะของ API endpoints ทั้งหมดในหน้า Settings
- แสดงเวลาที่ตรวจสอบล่าสุด
- แสดงจำนวนครั้งที่ล้มเหลว

### Flexible Configuration
- รองรับ API endpoints หลายตัว
- สามารถเพิ่ม/ลบ endpoint ได้ง่าย
- รองรับ environment ต่างๆ (development, production)

---

## โครงสร้างไฟล์

```
docs/api-fallback/
├── README.md                    ← ไฟล์นี้ (ภาพรวม)
├── configuration.md             ← คู่มือการกำหนดค่า
├── architecture.md              ← สถาปัตยกรรมและการออกแบบ
├── implementation.md            ← รายละเอียดการ implement
├── testing.md                   ← คู่มือการทดสอบ
├── troubleshooting.md           ← การแก้ไขปัญหา
└── backend-requirements.md      ← ความต้องการฝั่ง Backend
```

---

## เอกสารประกอบ

### สำหรับนักพัฒนา
- [คู่มือการกำหนดค่า](./configuration.md) - วิธีกำหนด API endpoints และ fallback settings
- [สถาปัตยกรรมและการออกแบบ](./architecture.md) - รายละเอียดการออกแบบและ flow ของระบบ
- [รายละเอียดการ implement](./implementation.md) - โค้ดและวิธี implement แต่ละส่วน
- [คู่มือการทดสอบ](./testing.md) - วิธีทดสอบระบบ fallback

### สำหรับ DevOps/Backend
- [ความต้องการฝั่ง Backend](./backend-requirements.md) - สิ่งที่ Backend ต้องเตรียม

### การแก้ไขปัญหา
- [การแก้ไขปัญหา](./troubleshooting.md) - ปัญหาที่พบบ่อยและวิธีแก้ไข

---

## Quick Start

### 1. กำหนด API endpoints ใน environment.ts

```typescript
// src/environments/environment.ts
export const environment = {
  useProxy: false,
  apiEndpoints: [
    { url: 'http://localhost:5000', name: 'Primary', priority: 1 },
    { url: 'http://localhost:3003', name: 'Secondary', priority: 2 },
  ],
  apiFallback: {
    enabled: true,
    maxRetries: 2,
    retryDelay: 1000,
    healthCheckInterval: 30000,
    failureThreshold: 3,
  },
  // ... other config
};
```

### 2. ตรวจสอบ Backend Health Endpoint

Backend ต้องมี endpoint `GET /api/health` ที่ return 200 เมื่อ healthy

### 3. ทดสอบระบบ

1. รัน API ทั้ง 2 ตัว
2. ปิด API หลัก
3. ตรวจสอบว่าระบบสลับไปใช้ API สำรองอัตโนมัติ

---

## Links ที่เกี่ยวข้อง

### Internal
- [Plan: Multi-API Fallback System](../plan/multi-api-fallback/plan.md)
- [Architecture Guide](../architecture-guide.md)
- [API Call Structure Guide](../guides/api-call-structure.md)

### External
- [Angular HTTP Interceptors](https://angular.dev/guide/http/interceptors)
- [RxJS Retry Operators](https://rxjs.dev/api/operators/retry)
- [Circuit Breaker Pattern](https://martinfowler.com/bliki/CircuitBreaker.html)

---

## สรุป

ระบบ Multi-API Fallback เป็นระบบที่ช่วยเพิ่ม availability ของ application โดยการสลับ API อัตโนมัติเมื่อ API หลักล่ม ระบบนี้มีความยืดหยุ่นและง่ายต่อการบำรุงรักษา

**เอกสารที่เกี่ยวข้อง:**
- [คู่มือการกำหนดค่า](./configuration.md)
- [สถาปัตยกรรมและการออกแบบ](./architecture.md)
- [รายละเอียดการ implement](./implementation.md)
- [คู่มือการทดสอบ](./testing.md)
- [การแก้ไขปัญหา](./troubleshooting.md)
- [ความต้องการฝั่ง Backend](./backend-requirements.md)
