# Node-RED Troubleshooting Guide

## ปัญหาที่พบบ่อย

### 1. Cannot connect to Node-RED

**สาเหตุ:** Node-RED ไม่ได้ทำงาน หรือ port ไม่ถูกต้อง

**วิธีแก้:**

```bash
# ตรวจสอบว่า Node-RED ทำงานอยู่
netstat -an | grep 1880

# รัน Node-RED
node-red

# ตรวจสอบ log
node-red -v
```

---

### 2. 401 Unauthorized

**สาเหตุ:** Authentication ไม่ถูกต้อง

**วิธีแก้:**

```bash
# ตรวจสอบ username/password
curl -v -u admin:password http://localhost:1880/flows

# ตรวจสอบ adminAuth ใน settings.js
cat ~/.node-red/settings.js | grep -A 10 "adminAuth"
```

---

### 3. CORS Error

**สาเหตุ:** CORS ไม่ได้ตั้งค่า

**วิธีแก้:**

```javascript
// settings.js
module.exports = {
  httpNodeCors: {
    origin: "*",
    methods: "GET,PUT,POST,DELETE,OPTIONS"
  }
};
```

---

### 4. Flow ไม่ deploy

**สาเหตุ:** ไม่มี header `Node-RED-Deployment-Type`

**วิธีแก้:**

```bash
curl -X POST http://localhost:1880/flows \
  -u admin:password \
  -H "Content-Type: application/json" \
  -H "Node-RED-Deployment-Type: full" \
  -d '...'
```

---

### 5. Node Module ติดตั้งไม่ได้

**สาเหตุ:** permission ไม่พอ หรือ module ไม่มี

**วิธีแก้:**

```bash
# ตรวจสอบ permission
ls -la ~/.node-red/

# ติดตั้ง module ผ่าน npm
cd ~/.node-red
npm install node-red-node-email

# รีสตาร์ท Node-RED
node-red
```

---

### 6. Port 1880 ถูกใช้งาน

**สาเหตุ:** port อื่นใช้งานอยู่

**วิธีแก้:**

```bash
# ตรวจสอบ port ที่ใช้งาน
netstat -an | grep 1880

# เปลี่ยน port ใน settings.js
module.exports = {
  uiPort: process.env.PORT || 1881
};
```

---

### 7. Credentials Error

**สาเหตุ:** credentialSecret ไม่ตรง

**วิธีแก้:**

```javascript
// settings.js
module.exports = {
  credentialSecret: false // ปิด encryption ชั่วคราว
};
```

---

## Debug Commands

### ดู Log

```bash
# Debug mode
node-red -v

# ดู log file
tail -f ~/.node-red/node-red.log
```

### ตรวจสอบ Flows

```bash
# ดู flows ทั้งหมด
curl -u admin:password http://localhost:1880/flows | jq .

# ดู nodes ที่ติดตั้ง
curl -u admin:password http://localhost:1880/nodes | jq .
```

### ตรวจสอบ Settings

```bash
curl -u admin:password http://localhost:1880/settings | jq .
```

---

## Common Error Messages

| Error | สาเหตุ | วิธีแก้ |
|-------|--------|---------|
| `ECONNREFUSED` | Node-RED ไม่ได้ทำงาน | รัน `node-red` |
| `EACCES` | Permission denied | ตรวจสอบ permission |
| `ENOENT` | ไฟล์ไม่พบ | ตรวจสอบ path |
| `EINVAL` | ค่าไม่ถูกต้อง | ตรวจสอบ input |
| `ETIMEOUT` | Timeout | ตรวจสอบ network |

---

## Performance Issues

### ตรวจสอบ Memory

```bash
# ตรวจสอบ memory usage
ps aux | grep node-red

# ตรวจสอบ memory ใน Node-RED
curl -u admin:password http://localhost:1880/settings | jq '.logging'
```

### ตรวจสอบ CPU

```bash
# ตรวจสอบ CPU usage
top -p $(pgrep -f "node-red")
```

---

## Security Checklist

- [ ] เปลี่ยน password default
- [ ] ตั้งค่า HTTPS
- [ ] จำกัด CORS
- [ ] ใช้ environment variables สำหรับ secrets
- [ ] ตรวจสอบ logs สม่ำเสมอ
- [ ] อัพเดท Node-RED เป็นประจำ

---

## Useful Links

- [Node-RED Official Documentation](https://nodered.org/docs/)
- [Node-RED Admin API](https://nodered.org/docs/user-guide/runtime/admin-api)
- [Node-RED GitHub](https://github.com/node-red/node-red)
- [Node-RED Forum](https://discourse.nodered.org/)
