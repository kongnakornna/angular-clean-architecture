# API Call Structure Guide

## โครงสร้างโฟลเดอร์

```
src/app/
├── core/
│   ├── config/
│   │   ├── api.config.ts          ← API endpoint definitions
│   │   └── app.config.ts          ← apiBaseUrl configuration
│   └── interceptors/
│       ├── auth.interceptor.ts    ← Attach Bearer token
│       ├── api-response.interceptor.ts ← Unwrap response
│       └── error.interceptor.ts   ← Handle errors
│
└── features/
    └── auth/
        ├── data/
        │   ├── datasources/
        │   │   └── auth.api.datasource.ts  ← HTTP calls จริงๆ
        │   ├── repositories/
        │   │   └── auth.repository.impl.ts ← Map DTO → Entity
        │   └── dtos/
        │       └── login-request.dto.ts    ← Request/Response types
        ├── domain/
        │   ├── entities/
        │   │   └── user.entity.ts          ← Domain models
        │   ├── repositories/
        │   │   └── auth.repository.ts      ← Interface
        │   └── use-cases/
        │       └── login.use-case.ts       ← Business logic
        └── presentation/
            └── pages/
                └── login/
                    └── login.component.ts   ← UI component
```

## Flow การ Call API

```
Component → UseCase → Repository → DataSource → HTTP POST
```

### ตัวอย่าง Login Flow

1. **LoginComponent** (`login.component.ts`)
   - เรียก `loginUseCase.execute({ username, password })`

2. **LoginUseCase** (`login.use-case.ts:14`)
   - เรียก `authRepo.login(credentials)`
   - เก็บ token ใน localStorage

3. **AuthRepositoryImpl** (`auth.repository.impl.ts:16`)
   - เรียก `dataSource.login()`
   - Map DTO เป็น Entity

4. **AuthApiDataSource** (`auth.api.datasource.ts:25`)
   - ส่ง POST request จริงๆ
   - URL: `${apiBaseUrl}/auth/login`

5. **Interceptors** ทำงาน
   - `AuthInterceptor` → แนบ Bearer token
   - `ApiResponseInterceptor` → Unwrap response envelope
   - `ErrorInterceptor` → Handle errors

## Configuration Files

| ไฟล์ | หน้าที่ |
|------|---------|
| `src/environments/environment.ts` | ตั้งค่า `useProxy`, `apiTargetUrl` |
| `src/app/core/config/app.config.ts` | คำนวณ `apiBaseUrl` |
| `src/app/core/config/api.config.ts` | กำหนด endpoint paths ทั้งหมด |
| `proxy.conf.json` | Angular proxy config |
| `angular.json` | ตั้งค่า `proxyConfig` |

## API Base URL Calculation

```typescript
// app.config.ts:49
apiBaseUrl = useProxy ? '/api' : `${apiTargetUrl}/api`

// ตัวอย่าง:
// useProxy: true  → '/api'
// useProxy: false → 'http://localhost:5000/api'
```

## Proxy Configuration

```json
// proxy.conf.json
{
  "/api": {
    "target": "http://localhost:5000",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

## Interceptor Chain

```
Request:  AuthInterceptor → ApiResponseInterceptor → ErrorInterceptor → Backend
Response: Backend → ErrorInterceptor → ApiResponseInterceptor → AuthInterceptor
```

| Interceptor | หน้าที่ |
|-------------|---------|
| `AuthInterceptor` | แนบ Bearer token, handle 401 refresh |
| `ApiResponseInterceptor` | Unwrap `{ is_success, data, error }` → `data` |
| `ErrorInterceptor` | แปลง HTTP errors เป็น user-friendly messages |

## Common Issues

### CORS Error
- **สาเหตุ:** `useProxy: false` + backend ไม่มี CORS config
- **แก้:** เปลี่ยน `useProxy: true` ใน `environment.ts`

### 401 Not Refreshing
- **สาเหตุ:** ErrorInterceptor แปลง error เป็น plain object ก่อน
- **แก้:** เปลี่ยน `instanceof HttpErrorResponse` เป็น `error?.status`

### Path Mismatch
- **สาเหตุ:** Frontend path ไม่ตรงกับ backend route
- **แก้:** ตรวจสอบ `api.config.ts` ว่า path ถูกต้อง
