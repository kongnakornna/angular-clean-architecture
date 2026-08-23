# Configuration Guide

> คู่มือการกำหนดค่า Multi-API Fallback System  
> *Last updated: 2026-08-20 | Version: 1.0.0*

---

## สารบัญ

1. [ภาพรวม Configuration](#ภาพรวม-configuration)
2. [Environment Configuration](#environment-configuration)
3. [API Endpoints Configuration](#api-endpoints-configuration)
4. [Fallback Settings](#fallback-settings)
5. [ตัวอย่าง Configuration](#ตัวอย่าง-configuration)
6. [Configuration สำหรับ Production](#configuration-สำหรับ-production)
7. [Error Handling](#error-handling)

---

## ภาพรวม Configuration

ระบบ Multi-API Fallback ใช้ environment files ในการกำหนดค่า API endpoints และ fallback settings การกำหนดค่าจะถูกแทนที่ (file replacement) ในระหว่าง build process ตาม environment (development/production)

### Configuration Files

| File | Description |
|------|-------------|
| `src/environments/environment.ts` | Development configuration |
| `src/environments/environment.prod.ts` | Production configuration |
| `src/app/core/config/app.config.ts` | App configuration interface |

---

## Environment Configuration

### โครงสร้าง Environment

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  demo: false,
  useProxy: false,                    // ต้องเป็น false สำหรับ multi-API
  apiTargetUrl: 'http://localhost:5000',  // backward compatibility
  apiEndpoints: [...],                // API endpoints list
  apiFallback: {...},                 // Fallback settings
  logger: {...},
  ollamaUrl: 'http://localhost:11434',
  ollamaModel: 'llama3',
  chatbotEnabled: true,
};
```

### สำคัญ: useProxy

**ต้องตั้ง `useProxy: false`** เพื่อให้ระบบ multi-API fallback ทำงานได้ถูกต้อง

- เมื่อ `useProxy: true`: ทุก request จะไปที่ proxy (`/api`) ซึ่งจะ forward ไปที่ single target
- เมื่อ `useProxy: false`: request จะไปที่ URL ที่ระบุโดยตรง ทำให้ fallback ทำงานได้

---

## API Endpoints Configuration

### Interface

```typescript
interface ApiEndpointConfig {
  url: string;      // Base URL ของ API (ไม่มี trailing slash)
  name: string;     // ชื่อที่แสดงใน health dashboard
  priority: number; // ลำดับความสำคัญ (1 = สำคัญที่สุด)
}
```

### ตัวอย่าง Configuration

```typescript
apiEndpoints: [
  { 
    url: 'http://localhost:5000', 
    name: 'Primary API', 
    priority: 1 
  },
  { 
    url: 'http://localhost:3003', 
    name: 'Secondary API', 
    priority: 2 
  },
  { 
    url: 'http://backup.example.com', 
    name: 'Backup API', 
    priority: 3 
  },
]
```

### Priority

- **Priority 1**: สำคัญที่สุด จะถูกใช้ก่อนเมื่อทุก endpoint healthy
- **Priority 2**: สำรองเมื่อ priority 1 ไม่ทำงาน
- **Priority 3**: สำรองเมื่อ priority 1 และ 2 ไม่ทำงาน

### URL Format

- ต้องเป็น base URL เท่านั้น (ไม่ต้องมี `/api`)
- ต้องไม่มี trailing slash
- ต้องไม่มี path ต่อท้าย

**ตัวอย่างที่ถูกต้อง:**
- `http://localhost:5000`
- `https://api.production.com`
- `http://192.168.1.100:8080`

**ตัวอย่างที่ผิด:**
- `http://localhost:5000/` (มี trailing slash)
- `http://localhost:5000/api` (มี path)
- `localhost:5000` (ไม่มี protocol)

---

## Fallback Settings

### Interface

```typescript
interface ApiFallbackConfig {
  enabled: boolean;           // เปิด/ปิดระบบ fallback
  maxRetries: number;         // จำนวนครั้งสูงสุดที่ retry
  retryDelay: number;         // เวลาหน่วงระหว่าง retry (ms)
  healthCheckInterval: number; // ช่วงเวลา health check (ms)
  failureThreshold: number;   // จำนวนครั้งที่ล้มเหลวก่อน marking unhealthy
}
```

### ค่า Default

```typescript
apiFallback: {
  enabled: true,
  maxRetries: 2,
  retryDelay: 1000,
  healthCheckInterval: 30000,  // 30 วินาที
  failureThreshold: 3,
}
```

### รายละเอียดแต่ละ Field

#### enabled
- **Type**: `boolean`
- **Default**: `true`
- **Description**: เปิด/ปิดระบบ fallback
- **Effect**: เมื่อ `false` จะไม่สลับ API อัตโนมัติ

#### maxRetries
- **Type**: `number`
- **Default**: `2`
- **Description**: จำนวนครั้งสูงสุดที่จะ retry request ที่ล้มเหลว
- **Effect**: ถ้า retry ครบจำนวนแล้วยังล้มเหลว จะ throw error

#### retryDelay
- **Type**: `number` (milliseconds)
- **Default**: `1000`
- **Description**: เวลาหน่วงระหว่าง retry
- **Effect**: ให้เวลา API ฟื้นตัวก่อน retry

#### healthCheckInterval
- **Type**: `number` (milliseconds)
- **Default**: `30000` (30 วินาที)
- **Description**: ช่วงเวลาที่จะตรวจสอบ health ของทุก endpoints
- **Effect**: ยิ่งสั้นยิ่งตรวจบ่อย แต่กิน bandwidth มากขึ้น

#### failureThreshold
- **Type**: `number`
- **Default**: `3`
- **Description**: จำนวนครั้งที่ล้มเหลวก่อนจะ marking endpoint ว่า unhealthy
- **Effect**: ป้องกันการสลับ API เนื่องจาก error ชั่วคราว

---

## ตัวอย่าง Configuration

### ตัวอย่าง 1: สอง API

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  useProxy: false,
  apiTargetUrl: 'http://localhost:5000',
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

### ตัวอย่าง 2: สาม API

```typescript
apiEndpoints: [
  { url: 'http://localhost:5000', name: 'Local Dev', priority: 1 },
  { url: 'http://localhost:3003', name: 'Local Backup', priority: 2 },
  { url: 'http://staging.example.com', name: 'Staging', priority: 3 },
],
```

### ตัวอย่าง 3: Production

```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  useProxy: false,
  apiTargetUrl: 'https://api.production.com',
  apiEndpoints: [
    { url: 'https://api.production.com', name: 'Production', priority: 1 },
    { url: 'https://api-backup.production.com', name: 'Production Backup', priority: 2 },
  ],
  apiFallback: {
    enabled: true,
    maxRetries: 3,
    retryDelay: 2000,
    healthCheckInterval: 60000,  // 1 นาที
    failureThreshold: 5,
  },
  // ... other config
};
```

### ตัวอย่าง 4: Development (ไม่ใช้ fallback)

```typescript
apiEndpoints: [
  { url: 'http://localhost:5000', name: 'Local', priority: 1 },
],
apiFallback: {
  enabled: false,  // ปิด fallback สำหรับ development
  maxRetries: 0,
  retryDelay: 0,
  healthCheckInterval: 30000,
  failureThreshold: 3,
},
```

---

## Configuration สำหรับ Production

### CORS Configuration

Backend ต้องตั้งค่า CORS อนุญาตให้ frontend domain เข้าถึง:

```python
# FastAPI (Python)
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200",           # Development
        "https://your-frontend-domain.com" # Production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

```javascript
// Express (Node.js)
const cors = require('cors');
app.use(cors({
  origin: [
    'http://localhost:4200',
    'https://your-frontend-domain.com'
  ],
  credentials: true
}));
```

### Environment Variables

ถ้าต้องการใช้ environment variables สำหรับ API URLs:

```typescript
apiEndpoints: [
  { 
    url: process.env['NG_APP_API_PRIMARY_URL'] || 'http://localhost:5000', 
    name: 'Primary', 
    priority: 1 
  },
  { 
    url: process.env['NG_APP_API_SECONDARY_URL'] || 'http://localhost:3003', 
    name: 'Secondary', 
    priority: 2 
  },
],
```

**หมายเหตุ**: Angular จะแทนที่ `process.env` ด้วยค่าจริงในระหว่าง build

---

## Error Handling

### Configuration Validation

ระบบจะ validate configuration ใน runtime:

```typescript
// ตรวจสอบว่า apiEndpoints ไม่ว่าง
if (!environment.apiEndpoints || environment.apiEndpoints.length === 0) {
  console.error('apiEndpoints must not be empty');
}

// ตรวจสอบ URL format
environment.apiEndpoints.forEach(ep => {
  if (!ep.url.startsWith('http://') && !ep.url.startsWith('https://')) {
    console.error(`Invalid URL format: ${ep.url}`);
  }
});
```

### Fallback Behavior

เมื่อ configuration ไม่ถูกต้อง:

1. **apiEndpoints ว่าง**: จะใช้ `apiTargetUrl` เป็น fallback
2. **healthCheckInterval ต่ำเกินไป**: จะถูก clamp เป็นค่า minimum (5000ms)
3. **failureThreshold ต่ำเกินไป**: จะถูก clamp เป็น 1

---

## Quick Reference

### Configuration Keys

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `useProxy` | `boolean` | `false` | ต้องเป็น false สำหรับ multi-API |
| `apiEndpoints` | `ApiEndpointConfig[]` | `[]` | รายการ API endpoints |
| `apiEndpoints[].url` | `string` | - | Base URL ของ API |
| `apiEndpoints[].name` | `string` | - | ชื่อที่แสดง |
| `apiEndpoints[].priority` | `number` | - | ลำดับความสำคัญ |
| `apiFallback.enabled` | `boolean` | `true` | เปิด/ปิด fallback |
| `apiFallback.maxRetries` | `number` | `2` | จำนวน retry สูงสุด |
| `apiFallback.retryDelay` | `number` | `1000` | เวลาหน่วง (ms) |
| `apiFallback.healthCheckInterval` | `number` | `30000` | ช่วง health check (ms) |
| `apiFallback.failureThreshold` | `number` | `3` | จำนวน failure ก่อน marking unhealthy |

---

**ถัดไป:** [สถาปัตยกรรมและการออกแบบ](./architecture.md)
