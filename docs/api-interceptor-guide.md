# คู่มือระบบ HTTP Interceptor และ API Configuration

## สารบัญ

1. [ภาพรวมระบบ Interceptor Chain](#1-ภาพรวมระบบ-interceptor-chain)
2. [การตั้งค่า Proxy & Direct Mode](#2-การตั้งค่า-proxy--direct-mode)
3. [Auth Interceptor](#3-auth-interceptor)
4. [ApiResponse Interceptor](#4-apiresponse-interceptor)
5. [Error Interceptor](#5-error-interceptor)
6. [ลำดับการทำงานของ Interceptor Chain](#6-ลำดับการทำงานของ-interceptor-chain)
7. [การเพิ่ม Feature Module ที่เรียก API](#7-การเพิ่ม-feature-module-ที่เรียก-api)
8. [การ Debug API Calls](#8-การ-debug-api-calls)

---

## 1. ภาพรวมระบบ Interceptor Chain

ระบบ HTTP Interceptor ทำหน้าที่จัดการ Request/Response ทุกครั้งที่ Angular ส่ง request ไปยัง backend

### ไฟล์ที่เกี่ยวข้อง

| ไฟล์ | พาธ | หน้าที่ |
|------|-----|---------|
| **Auth Interceptor** | `src/app/core/interceptors/auth.interceptor.ts` | แนบ JWT token, จัดการ refresh token |
| **ApiResponse Interceptor** | `src/app/core/interceptors/api-response.interceptor.ts` | แกะ wrapper `{ data, error, is_success }` |
| **Error Interceptor** | `src/app/core/interceptors/error.interceptor.ts` | แปลง HTTP errors ให้เป็น error ที่ใช้งานได้ |
| **CoreModule** | `src/app/core/core.module.ts` | ลงทะเบียน interceptors |

### ลำดับ Interceptor Chain

```
Request  →  AuthInterceptor  →  ApiResponseInterceptor  →  ErrorInterceptor  →  Backend
              ↓                     ↓                         ↓
          แนบ Token           [ผ่านเฉยๆ]                 [ผ่านเฉยๆ]

Response ←  AuthInterceptor  ←  ApiResponseInterceptor  ←  ErrorInterceptor  ←  Backend
                              ↓                         ↓
                          แกะ {data, error,           จับ HTTP error
                          is_success} wrapper        Status Code
```

---

## 2. การตั้งค่า Proxy & Direct Mode

ระบบรองรับการเรียก API 2 รูปแบบ โดยควบคุมผ่าน flag `useProxy`:

### โหมด Proxy (ใช้ใน Dev)

```
Angular Dev Server (port 4200)  →  Proxy (/api/*)  →  Backend (port 5000)
```

### โหมด Direct (ใช้กับ Production หรือไม่ต้องการ proxy)

```
Angular App  →  http://localhost:5000/api/*  →  Backend (port 5000)
```

### วิธีเปลี่ยนโหมด

แก้ไขไฟล์ `src/environments/environment.ts` (สำหรับ dev) หรือ `environment.prod.ts` (สำหรับ production):

```typescript
export const environment = {
  production: false,
  demo: false,
  useProxy: true,        // true = ผ่าน proxy, false = call ตรง
  apiTargetUrl: 'http://localhost:5000',
  logger: { ... },
};
```

### ผลของการเปลี่ยน `useProxy`

| useProxy | apiBaseUrl ที่คำนวณได้ | ลักษณะการเรียก |
|----------|------------------------|----------------|
| `true` | `/api` | ผ่าน Angular CLI proxy |
| `false` | `http://localhost:5000/api` | ตรงไป backend (ต้องมี CORS) |

### กลไกการทำงาน

ใน `src/app/core/config/app.config.ts`:

```typescript
apiBaseUrl: environment.useProxy
  ? '/api'
  : `${environment.apiTargetUrl}/api`,
```

### Proxy Config (สำหรับโหมด Proxy)

ไฟล์ `proxy.conf.json`:

```json
{
  "/api": {
    "target": "http://localhost:5000",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

---

## 3. Auth Interceptor

**ไฟล์:** `src/app/core/interceptors/auth.interceptor.ts`

### หน้าที่

1. แนบ `Authorization: Bearer <token>` Header ให้ทุก request ยกเว้นหน้า login/refresh
2. เมื่อเจอ HTTP 401 ให้พยายาม refresh token อัตโนมัติ
3. ถ้า refresh สำเร็จ → retry request เดิม
4. ถ้า refresh ล้มเหลว → logout

### Request Flow

```
Request ออก
  │
  ├─ เป็น /auth/refresh? ──yes──→ ไม่แนบ Token, ข้าม 401 recovery
  │
  └─ ไม่ใช่
       │
       ├─ มี Token ใน localStorage? ──yes──→ แนบ Authorization header
       │
       └─ ไม่มี → ส่ง request ปกติ
```

### Response Flow (401 Handling)

```
Response 401
  │
  ├─ เป็น /auth/login หรือ /auth/refresh? ──yes──→ ส่ง error ต่อไป
  │
  └─ ไม่ใช่
       │
       ├─ กำลัง refresh อยู่แล้ว? ──yes──→ queue request, รอให้เสร็จ
       │
       └─ ยังไม่ refresh
            │
            ├─ POST /auth/refresh
            │    │
            │    ├─ success → เก็บ token ใหม่ → retry request เดิม
            │    │
            │    └─ fail → logout → redirect /login
            │
            └─ refresh fail → logout
```

### Refresh Token Queueing

เมื่อมี request หลายตัวเกิด 401 พร้อมกัน (เช่น แดชบอร์ดโหลดข้อมูลหลายแหล่ง) Interceptor จะ:

1. request แรกที่เจอ 401 → เริ่ม refresh
2. request ถัดไป → **ไม่**เริ่ม refresh ซ้ำ → เก็บไว้ใน queue
3. เมื่อ refresh เสร็จ → replay ทุก request ที่ค้างอยู่
4. ถ้า refresh ล้มเหลว → reject ทุก request

### Token Storage Keys

```typescript
// src/app/core/constants/app.constants.ts
TOKEN_KEY       = 'access_token';     // ใน localStorage
REFRESH_TOKEN_KEY = 'refresh_token';  // ใน localStorage
USER_KEY        = 'current_user';     // ใน localStorage
```

---

## 4. ApiResponse Interceptor

**ไฟล์:** `src/app/core/interceptors/api-response.interceptor.ts`

### หน้าที่

แกะ response wrapper ที่ backend ส่งมาในรูปแบบ:

```typescript
// ApiResponseDto<T>
{
  data: T | null;       // ข้อมูลจริง (null ถ้ามี error)
  error: string | null; // ข้อความ error (null ถ้า success)
  is_success: boolean;  // true = success, false = error
}
```

ให้กลายเป็นข้อมูลจริง (`data`) ก่อนส่งต่อให้ application

### วิธีการทำงาน

Interceptor จะตรวจสอบ response body ว่ามี structure `{ data, error, is_success }` หรือไม่:

- ถ้า **มี** structure นี้ → คืนค่า `data` ให้ subscriber
- ถ้า **ไม่มี** → ส่ง response body ดั้งเดิมต่อไป (สำหรับ endpoints ที่ไม่ใช้ wrapper)

### ตัวอย่าง

**Response จาก backend:**
```json
{
  "data": { "id": 1, "email": "user@example.com" },
  "error": null,
  "is_success": true
}
```

**หลังจากผ่าน ApiResponseInterceptor → subscriber ได้รับ:**
```json
{ "id": 1, "email": "user@example.com" }
```

### DTO Interface

```typescript
export interface ApiResponseDto<T> {
  data: T | null;
  error: string | null;
  is_success: boolean;
}
```

---

## 5. Error Interceptor

**ไฟล์:** `src/app/core/interceptors/error.interceptor.ts`

### หน้าที่

1. จับ HTTP error ทุกรูปแบบ
2. แปลงเป็น `AppError` object ที่ frontend เข้าใจ
3. ส่ง error ผ่าน LoggerService
4. ถ้าเป็น Validation Error → ดึง error messages จาก response body

### การทำงาน

```
HTTP Error (4xx, 5xx, timeout, network error)
  │
  ├─ Validation Error (422) → แยก field errors
  │
  ├─ Server Error (500) → log + แสดงข้อความทั่วไป
  │
  ├─ Network Error → log + แสดง "Connection refused"
  │
  ├─ Timeout → log + แสดง "Request timed out"
  │
  └─ Other → log + แสดง HTTP status text
```

---

## 6. ลำดับการทำงานของ Interceptor Chain

ตัวอย่าง request `GET /api/user/me`:

```
Step 1: AuthInterceptor
  - อ่าน access_token จาก localStorage
  - แนบ Header: Authorization: Bearer eyJhbGci...
  - ส่ง request ต่อไป

Step 2: ApiResponseInterceptor
  - ผ่าน request โดยไม่เปลี่ยนแปลง

Step 3: ErrorInterceptor
  - ผ่าน request โดยไม่เปลี่ยนแปลง

--- Backend ตอบกลับ ---

Step 4: ErrorInterceptor (response)
  - Check HTTP status
  - 200 OK → ส่งต่อไป

Step 5: ApiResponseInterceptor (response)
  - ตรวจสอบ response body
  - พบ { data: { id: 1, email: "..." }, error: null, is_success: true }
  - แกะเฉพาะ data → { id: 1, email: "..." }
  - ส่งต่อไป

Step 6: AuthInterceptor (response)
  - Check HTTP status
  - 200 OK → ส่งต่อไป

--- Subscriber ได้รับข้อมูล ---
```

## 7. การเพิ่ม Feature Module ที่เรียก API

### ขั้นตอน

1. **กำหนด API endpoints** ใน `src/app/core/config/api.config.ts`:

```typescript
export const API_ENDPOINTS = {
  // ... endpoints เดิม
  myFeature: {
    list: '/my-feature',
    detail: (id: string) => `/my-feature/${id}`,
    create: '/my-feature',
    update: (id: string) => `/my-feature/${id}`,
    delete: (id: string) => `/my-feature/${id}`,
  },
};
```

2. **สร้าง DTO** ใน `src/app/features/{feature}/data/dtos/`:

```typescript
export interface MyFeatureResponseDto {
  id: string;
  name: string;
  // ... properties
}
```

3. **สร้าง ApiDataSource** ใน `src/app/features/{feature}/data/datasources/`:

```typescript
@Injectable()
export class MyFeatureApiDataSource {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  list(): Observable<MyFeatureResponseDto[]> {
    return this.http.get<MyFeatureResponseDto[]>(
      `${this.config.apiBaseUrl}${API_ENDPOINTS.myFeature.list}`
    );
  }
}
```

4. **สร้าง Repository Implementation**:

```typescript
@Injectable()
export class MyFeatureRepositoryImpl implements IMyFeatureRepository {
  constructor(private datasource: MyFeatureApiDataSource) {}

  list(): Observable<MyFeature[]> {
    return this.datasource.list().pipe(
      map((dtos) => dtos.map((dto) => myFeatureMapper(dto)))
    );
  }
}
```

5. **ลงทะเบียน Repository Provider** ใน `src/app/core/di/providers.ts`:

```typescript
export const REPOSITORY_PROVIDERS: Provider[] = [
  // ... providers เดิม
  { provide: MY_FEATURE_REPOSITORY, useClass: MyFeatureRepositoryImpl },
];
```

6. **กำหนด Injection Token** ใน `src/app/core/di/tokens.ts`:

```typescript
export const MY_FEATURE_REPOSITORY = new InjectionToken<IMyFeatureRepository>(
  'MY_FEATURE_REPOSITORY'
);
```

### ข้อควรรู้

- **apiBaseUrl** จะถูกเติม prefix อัตโนมัติโดย `DEFAULT_APP_CONFIG` ตามค่า `useProxy`
- **ApiResponse Interceptor** แกะ `{ data, error, is_success }` ให้อัตโนมัติ → datasource ไม่ต้องจัดการ wrapper
- **Auth Token** ถูกแนบอัตโนมัติโดย AuthInterceptor

---

## 8. การ Debug API Calls

### เปิด Log Request/Response

แก้ไข `environment.ts`:

```typescript
export const environment = {
  production: false,
  useProxy: true,
  apiTargetUrl: 'http://localhost:5000',
  logger: {
    enabled: true,
    level: 'debug',  // debug = แสดง log ทั้งหมด
    format: 'pretty',
    prefix: '[iCmon-Dev]',
  },
};
```

### ตรวจสอบ Interceptor Chain

1. เปิด Chrome DevTools → Network Tab
2. ดู request headers:
   - `Authorization: Bearer ...` → AuthIntercepto ทำงาน
   - URL ขึ้นต้นด้วย `/api/...` → โหมด Proxy
   - URL ขึ้นต้นด้วย `http://localhost:5000/api/...` → โหมด Direct
3. ดู response body:
   - ถ้าได้ `{ data: ..., error: null, is_success: true }` → ApiResponseInterceptor **ยังไม่**ทำงาน (Interceptor มี bug)
   - ถ้าได้ `{ id: 1, ... }` โดยตรง → ApiResponseInterceptor ทำงานปกติ
4. ถ้าเจอ 401 ที่ `/auth/refresh` → ตรวจสอบใน AuthInterceptor ว่า exclude `/auth/refresh` หรือไม่

### Tools

| เครื่องมือ | การใช้งาน |
|-----------|-----------|
| Chrome DevTools → Network | ดู request/response headers และ body |
| Chrome DevTools → Console | ดู log จาก LoggerService (prefix `[iCmon-Dev]`) |
| `proxy.conf.json` → `logLevel: "debug"` | ดู proxy logs ใน terminal ที่รัน `ng serve` |

---

## Appendix: ข้อมูลเพิ่มเติม

### CoreModule Interceptor Registration

```typescript
// src/app/core/core.module.ts
providers: [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ApiResponseInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
]
```

**ลำดับการลงทะเบียนมีความสำคัญ:** Angular เรียก Interceptor ตามลำดับที่ register สำหรับ request และย้อนกลับสำหรับ response
