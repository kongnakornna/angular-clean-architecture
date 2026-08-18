# Node-RED Authentication Guide

## ประเภทของ Authentication

### 1. Basic Authentication

ใช้ username/password ตรง

```bash
# Syntax
curl -u username:password http://localhost:1880/flows

# ตัวอย่าง
curl -u admin:mysecretpassword http://localhost:1880/flows
```

### 2. Bearer Token Authentication

ใช้ JWT token หลังจาก login

**Step 1: รับ Token**

```bash
curl -X POST http://localhost:1880/auth/token \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "node-red-admin",
    "grant_type": "password",
    "username": "admin",
    "password": "mysecretpassword"
  }'
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiww...",
  "token_type": "bearer",
  "expires_in": 576000
}
```

**Step 2: ใช้ Token**

```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  http://localhost:1880/flows
```

---

## การตั้งค่า adminAuth

### Basic Users

```javascript
// settings.js
module.exports = {
  adminAuth: {
    type: "credentials",
    users: [
      {
        username: "admin",
        password: "$2a$08$zZWkjTFhoBtEgrViyBaXqOKaQRz7AO8AtQMhbKtVxJqKXfoMzK5H",
        permissions: "*"
      },
      {
        username: "viewer",
        password: "$2a$08$zZWkjTFhoBtEgrViyBaXqOKaQRz7AO8AtQMhbKtVxJqKXfoMzK5H",
        permissions: "read"
      }
    ]
  }
};
```

### Permission Levels

| Permission | คำอธิบาย |
|-----------|----------|
| `*` | Full access - อ่าน/เขียน/ลบ ทุกอย่าง |
| `read` | อ่านเท่านั้น |
| `write` | เขียนเท่านั้น |

---

## การสร้าง Password Hash

### Using Node.js

```bash
node -e "
const bcrypt = require('bcryptjs');
const password = 'your-password-here';
const hash = bcrypt.hashSync(password, 8);
console.log(hash);
"
```

### Using Python

```python
import bcrypt

password = b'your-password-here'
hashed = bcrypt.hashpw(password, bcrypt.gensalt(rounds=8))
print(hashed.decode())
```

---

## OAuth2 / External Authentication

```javascript
// settings.js
module.exports = {
  adminAuth: {
    type: "oauth2",
    clientID: "your-client-id",
    clientSecret: "your-client-secret",
    authorizeURL: "https://your-auth-server/authorize",
    tokenURL: "https://your-auth-server/token",
    userURL: "https://your-auth-server/userinfo",
    scope: "openid profile email",
    namespace: "node-red-users"
  }
};
```

---

## Session Management

### Token Expiration

Token หมดอายุตามค่า `expires_in` (default: 576000 วินาที = 6.67 วัน)

### Refresh Token

```bash
curl -X POST http://localhost:1880/auth/token \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "node-red-admin",
    "grant_type": "refresh_token",
    "refresh_token": "your-refresh-token"
  }'
```

---

## API Key Authentication

### สร้าง API Key

```javascript
// settings.js
module.exports = {
  adminAuth: {
    type: "api-key",
    keys: [
      {
        key: "your-api-key-here",
        permissions: "*"
      }
    ]
  }
};
```

### ใช้ API Key

```bash
curl -H "X-API-Key: your-api-key-here" \
  http://localhost:1880/flows
```

---

## ตัวอย่าง Integration

### Angular Application

```typescript
// auth.service.ts
@Injectable()
export class AuthService {
  private token: string;

  login(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:1880/auth/token', {
      client_id: 'node-red-admin',
      grant_type: 'password',
      username: username,
      password: password
    }).pipe(
      tap((response: any) => {
        this.token = response.access_token;
        localStorage.setItem('nodered_token', this.token);
      })
    );
  }

  getFlows(): Observable<any> {
    const token = localStorage.getItem('nodered_token');
    return this.http.get('http://localhost:1880/flows', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
```

### cURL Script

```bash
#!/bin/bash
# nodered-auth.sh

USERNAME="admin"
PASSWORD="password"
BASE_URL="http://localhost:1880"

# Login
TOKEN=$(curl -s -X POST "$BASE_URL/auth/token" \
  -H "Content-Type: application/json" \
  -d "{
    \"client_id\": \"node-red-admin\",
    \"grant_type\": \"password\",
    \"username\": \"$USERNAME\",
    \"password\": \"$PASSWORD\"
  }" | jq -r '.access_token')

# ใช้ token
curl -s -H "Authorization: Bearer $TOKEN" "$BASE_URL/flows" | jq .
```

---

## Security Best Practices

1. **เปลี่ยน password default** ทันทีหลังติดตั้ง
2. **ใช้ HTTPS** ใน production
3. **จำกัด CORS** ให้เฉพาะ domain ที่ต้องการ
4. **เก็บ token** อย่างปลอดภัย (ไม่เก็บใน localStorage ใน production)
5. **ใช้ environment variables** สำหรับ secrets
6. **Monitor logs** สำหรับ suspicious activity
