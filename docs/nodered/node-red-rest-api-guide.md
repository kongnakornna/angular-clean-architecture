# Node-RED REST API - คู่มือการตั้งค่าและเรียกใช้งาน

## ภาพรวม

Node-RED มี REST API ในตัว (Admin API) สำหรับจัดการ flows, nodes, และการตั้งค่าทั้งหมดผ่าน HTTP requests

## การติดตั้ง Node-RED

### 1. ติดตั้งผ่าน npm

```bash
npm install -g node-red
```

### 2. รัน Node-RED

```bash
node-red
```

### 3. เข้าถึง Editor

- **Editor URL:** `http://localhost:1880`
- **Admin API URL:** `http://localhost:localhost:1880`

## การตั้งค่า Admin API

### เปิดใช้งาน Admin API ใน settings.js

แก้ไขไฟล์ `settings.js` ของ Node-RED:

```javascript
// settings.js
module.exports = {
  flowFile: 'flows.json',
  credentialSecret: false,

  // เปิดใช้งาน Admin API
  adminAuth: {
    type: "credentials",
    users: [
      {
        username: "admin",
        password: "$2a$08$zZWkjTFhoBtEgrViyBaXqOKaQRz7AO8AtQMhbKtVxJqKXfoMzK5H", // bcrypt hash
        permissions: "*"
      }
    ]
  },

  // HTTP Admin API
  uiPort: 1880,

  logging: {
    console: {
      level: "info",
      metrics: false,
      audit: false
    }
  },

  // Function node context
  functionGlobalContext: {}
};
```

### สร้าง Password Hash (bcrypt)

```bash
node -e "
const bcrypt = require('bcryptjs');
const password = 'your-password-here';
const hash = bcrypt.hashSync(password, 8);
console.log(hash);
"
```

## REST API Endpoints ทั้งหมด

### Flow Management

| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| GET | `/flows` | ดึง flows ทั้งหมด |
| GET | `/flow/:id` | ดึง flow เดี่ยว |
| POST | `/flows` | สร้าง flow ใหม่ |
| PUT | `/flow/:id` | อัพเดท flow |
| DELETE | `/flow/:id` | ลบ flow |

### Node Management

| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| GET | `/nodes` | ดึง nodes ที่ติดตั้งทั้งหมด |
| GET | `/nodes/:module` | ดึงข้อมูล module |
| POST | `/nodes` | ติดตั้ง module ใหม่ |
| PUT | `/nodes/:module` | อัพเดท module |
| DELETE | `/nodes/:module` | ลบ module |

### Setting Management

| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| GET | `/settings` | ดึงการตั้งค่า |
| GET | `/settings/:key` | ดึงการตั้งค่าเฉพาะ |

### Library

| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| GET | `/library/:type` | ดึง entries จาก library |
| GET | `/library/:type/:id` | ดึง entry จาก library |
| POST | `/library/:type` | บันทึก entry ลง library |

### Credentials

| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| GET | `/credentials` | ดึง credentials (ต้องมี permission) |

## Authentication

### 1. Basic Auth

```bash
curl -u admin:password http://localhost:1880/flows
```

### 2. Bearer Token

```bash
# รับ token จาก login
curl -X POST http://localhost:1880/auth/token \
  -H "Content-Type: application/json" \
  -d '{"client_id":"node-red-admin","grant_type":"password","username":"admin","password":"password"}'

# ใช้ token
curl -H "Authorization: Bearer <token>" http://localhost:1880/flows
```

## CORS Configuration

```javascript
// settings.js
module.exports = {
  // ...
  httpNodeCors: {
    origin: "*",
    methods: "GET,PUT,POST,DELETE"
  }
};
```

## การตั้งค่า HTTP Admin API บน Port อื่น

```javascript
// settings.js
module.exports = {
  // ...
  uiPort: 1880,
  uiHost: "0.0.0.0", // ฟังทุก interface
};
```

## ไฟล์ที่เกี่ยวข้อง

- [api-reference.md](./api-reference.md) - API ทั้งหมดแบบละเอียด
- [authentication.md](./authentication.md) - การยืนยันตัวตนแบบละเอียด
- [examples.md](./examples.md) - ตัวอย่างการใช้งาน
- [troubleshooting.md](./troubleshooting.md) - การแก้ไขปัญหา
