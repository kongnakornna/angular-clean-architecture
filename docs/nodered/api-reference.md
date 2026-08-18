# Node-RED REST API Reference

## Base URL

```
http://localhost:1880
```

---

## 1. FLOW MANAGEMENT

### GET /flows
ดึง flows ทั้งหมด

```bash
curl -u admin:password http://localhost:1880/flows
```

**Response:**
```json
[
  {
    "id": "unique-flow-id",
    "type": "tab",
    "label": "My Flow",
    "disabled": false,
    "info": "",
    "nodes": [
      {
        "id": "node-id",
        "type": "inject",
        "name": "Inject Node",
        "x": 150,
        "y": 100,
        "wires": [["output-node-id"]]
      }
    ]
  }
]
```

---

### GET /flow/:id
ดึง flow เดี่ยว

```bash
curl -u admin:password http://localhost:1880/flow/{flow-id}
```

**Response:**
```json
{
  "id": "unique-flow-id",
  "type": "tab",
  "label": "My Flow",
  "disabled": false,
  "info": "",
  "nodes": [...]
}
```

---

### POST /flows
สร้าง flow ใหม่

```bash
curl -X POST http://localhost:1880/flows \
  -u admin:password \
  -H "Content-Type: application/json" \
  -H "Node-RED-Deployment-Type: full" \
  -d '{
    "flows": [
      {
        "id": "new-flow-id",
        "type": "tab",
        "label": "New Flow",
        "disabled": false,
        "info": ""
      },
      {
        "id": "node-1",
        "type": "inject",
        "name": "Start",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 150,
        "y": 100,
        "z": "new-flow-id",
        "wires": [["node-2"]]
      },
      {
        "id": "node-2",
        "type": "debug",
        "name": "Debug",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 350,
        "y": 100,
        "z": "new-flow-id",
        "wires": []
      }
    ]
  }'
```

---

### PUT /flow/:id
อัพเดท flow

```bash
curl -X PUT http://localhost:1880/flow/{flow-id} \
  -u admin:password \
  -H "Content-Type: application/json" \
  -H "Node-RED-Deployment-Type: full" \
  -d '{
    "flows": [
      {
        "id": "new-flow-id",
        "type": "tab",
        "label": "Updated Flow",
        "disabled": false,
        "info": ""
      }
    ]
  }'
```

---

### DELETE /flow/:id
ลบ flow

```bash
curl -X DELETE http://localhost:1880/flow/{flow-id} \
  -u admin:password
```

---

## 2. NODE MANAGEMENT

### GET /nodes
ดึง nodes ที่ติดตั้งทั้งหมด

```bash
curl -u admin:password http://localhost:1880/nodes
```

**Response:**
```json
{
  "nodes": [
    {
      "id": "node-red",
      "types": [
        "tab",
        "debug",
        "inject",
        "http in",
        "http response",
        "function",
        "change",
        "switch",
        "template"
      ],
      "enabled": true,
      "local": true,
      "user": false,
      "version": "3.0.2"
    }
  ]
}
```

---

### GET /nodes/:module
ดึงข้อมูล module เฉพาะ

```bash
curl -u admin:password http://localhost:1880/nodes/node-red
```

---

### POST /nodes
ติดตั้ง module ใหม่

```bash
curl -X POST http://localhost:1880/nodes \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{
    "module": "node-red-node-email",
    "version": "1.0.0"
  }'
```

---

### PUT /nodes/:module
อัพเดท module

```bash
curl -X PUT http://localhost:1880/nodes/{module-name} \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{
    "enabled": true
  }'
```

---

### DELETE /nodes/:module
ลบ module

```bash
curl -X DELETE http://localhost:1880/nodes/{module-name} \
  -u admin:password
```

---

## 3. SETTINGS MANAGEMENT

### GET /settings
ดึงการตั้งค่าทั้งหมด

```bash
curl -u admin:password http://localhost:1880/settings
```

**Response:**
```json
{
  "flowFilePretty": true,
  "credentialSecret": false,
  "httpNodeRoot": "/",
  "uiPort": 1880,
  "logging": {...},
  "editorTheme": {...}
}
```

---

### GET /settings/:key
ดึงการตั้งค่าเฉพาะ

```bash
curl -u admin:password http://localhost:1880/settings/httpNodeRoot
```

---

## 4. LIBRARY MANAGEMENT

### GET /library/:type
ดึง entries จาก library

```bash
curl -u admin:password http://localhost:1880/library/flows
```

---

### GET /library/:type/:id
ดึง entry จาก library

```bash
curl -u admin:password http://localhost:1880/library/flows/{entry-id}
```

---

### POST /library/:type
บันทึก entry ลง library

```bash
curl -X POST http://localhost:1880/library/flows \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{
    "id": "my-saved-flow",
    "meta": {
      "name": "My Saved Flow",
      "description": "Description here"
    },
    "body": "{}"
  }'
```

---

## 5. CREDENTIALS

### GET /credentials
ดึง credentials

```bash
curl -u admin:password http://localhost:1880/credentials
```

> **หมายเหตุ:** ต้องมี admin permissions

---

## 6. AUTH TOKEN

### POST /auth/token
รับ authentication token

```bash
curl -X POST http://localhost:1880/auth/token \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "node-red-admin",
    "grant_type": "password",
    "username": "admin",
    "password": "password"
  }'
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 576000
}
```

---

## 7. CORS HEADERS

### ตั้งค่า CORS

```javascript
// settings.js
module.exports = {
  httpNodeCors: {
    origin: "*",
    methods: "GET,PUT,POST,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization"
  }
};
```

---

## 8. HTTP NODES (Built-in)

### HTTP In + HTTP Response

```json
{
  "id": "http-in-1",
  "type": "http in",
  "name": "API Endpoint",
  "url": "/api/test",
  "method": "get",
  "upload": false,
  "swaggerDoc": "",
  "x": 150,
  "y": 100,
  "z": "flow-1",
  "wires": [["http-response-1"]]
},
{
  "id": "http-response-1",
  "type": "http response",
  "name": "Response",
  "statusCode": "200",
  "headers": {},
  "x": 350,
  "y": 100,
  "z": "flow-1",
  "wires": []
}
```

---

## 9. TRIGGER / TEMPLATE NODES

### Trigger Node

```json
{
  "id": "trigger-1",
  "type": "trigger",
  "name": "Trigger",
  "op1": "val",
  "op1type": "str",
  "op2": "val",
  "op2type": "str",
  "duration": "5",
  "extend": false,
  "overrideDelay": false,
  "bysec": 1,
  "byfield": "",
  "x": 150,
  "y": 200,
  "z": "flow-1",
  "wires": [[]]
}
```

### Template Node

```json
{
  "id": "template-1",
  "type": "template",
  "name": "HTML Template",
  "field": "payload",
  "fieldType": "msg",
  "syntax": "mustache",
  "template": "<h1>Hello {{name}}</h1>",
  "x": 150,
  "y": 300,
  "z": "flow-1",
  "wires": [[]]
}
```

---

## HTTP Response Codes

| Code | คำอธิบาย |
|------|----------|
| 200 | สำเร็จ |
| 201 | สร้างสำเร็จ |
| 204 | ลบสำเร็จ (ไม่มี content) |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Content Types

ทุก request ที่ส่ง JSON ต้องใส่ header:

```
Content-Type: application/json
```

ทุก request ที่ต้องการ部署 (deploy) ต้องใส่ header:

```
Node-RED-Deployment-Type: full | nodes | flows
```
