# โมดูล Auth (Authentication)

## 1. ภาพรวมของโมดูล

โมดูล `Auth` จัดการเกี่ยวกับการพิสูจน์ตัวตนของผู้ใช้งาน ประกอบด้วยฟังก์ชันหลักดังนี้:

- **Login** — เข้าสู่ระบบด้วยอีเมลและรหัสผ่าน
- **Logout** — ออกจากระบบ
- **Refresh Token** — ต่ออายุ JWT token อัตโนมัติ
- **Forgot Password / Reset Password** — ขอรีเซ็ตรหัสผ่านและตั้งรหัสผ่านใหม่
- **Check Permission** — ตรวจสอบสิทธิ์การเข้าถึงของผู้ใช้งาน

สถาปัตยกรรมเป็นแบบ **Clean Architecture** แบ่งเป็น 3 layers: Domain, Data, และ Presentation

---

## 2. โครงสร้างโฟลเดอร์และแต่ละ Layer

```
auth/
├── domain/                      # Domain Layer — ไม่ขึ้นกับ framework หรือ external libs
│   ├── entities/                # ข้อมูลหลัก (entities / interfaces)
│   │   ├── user.entity.ts       # User, LoginCredentials, AuthResponse
│   │   └── permission.entity.ts # Permission
│   ├── repositories/            # Interface ของ repository
│   │   └── auth.repository.ts   # IAuthRepository
│   └── use-cases/               # Use cases (business logic)
│       ├── login.use-case.ts
│       ├── logout.use-case.ts
│       ├── refresh-token.use-case.ts
│       └── check-permission.use-case.ts
│
├── data/                        # Data Layer — จัดการ data source และ DTO
│   ├── datasources/
│   │   └── auth.api.datasource.ts   # เรียก API จริงผ่าน HttpClient
│   ├── dtos/
│   │   ├── login-request.dto.ts     # LoginRequestDto
│   │   └── login-response.dto.ts    # LoginResponseDto
│   └── repositories/
│       ├── auth.repository.impl.ts  # AuthRepositoryImpl — implementation จริง
│       └── auth.repository.demo.ts  # DemoAuthRepositoryImpl — สำหรับโหมด Demo
│
└── presentation/                # Presentation Layer — UI Components
    └── pages/
        ├── login/
        │   ├── login.component.ts
        │   ├── login.component.html
        │   └── login.component.spec.ts
        └── forgot-password/
            ├── forgot-password.component.ts
            ├── forgot-password.component.html
            └── forgot-password.component.spec.ts
```

---

## 3. ไฟล์สำคัญและหน้าที่

### Domain Layer

| ไฟล์ | หน้าที่ |
|------|--------|
| `entities/user.entity.ts` | กำหนด interface `User`, `LoginCredentials`, `AuthResponse` |
| `entities/permission.entity.ts` | กำหนด interface `Permission` (id, name, description, module) |
| `repositories/auth.repository.ts` | กำหนด interface `IAuthRepository` ที่ Data layer ต้อง implement |
| `use-cases/login.use-case.ts` | รับ `LoginCredentials` → เรียก `IAuthRepository.login()` |
| `use-cases/logout.use-case.ts` | เรียก `IAuthRepository.logout()` |
| `use-cases/refresh-token.use-case.ts` | เรียก `IAuthRepository.refreshToken()` |
| `use-cases/check-permission.use-case.ts` | ตรวจสอบว่าผู้ใช้มี permission ที่กำหนดหรือไม่ |

### Data Layer

| ไฟล์ | หน้าที่ |
|------|--------|
| `datasources/auth.api.datasource.ts` | ส่ง HTTP request ไปยัง API endpoints ต่าง ๆ ผ่าน `HttpClient` |
| `dtos/login-request.dto.ts` | DTO สำหรับส่งข้อมูล login (email, password) |
| `dtos/login-response.dto.ts` | DTO สำหรับรับข้อมูล response จากการ login |
| `repositories/auth.repository.impl.ts` | Implementation จริงของ `IAuthRepository` — เรียก `AuthApiDataSource` |
| `repositories/auth.repository.demo.ts` | Mock implementation สำหรับ Demo mode — login ด้วย demo/demo ได้ทันที |

### Presentation Layer

| ไฟล์ | หน้าที่ |
|------|--------|
| `pages/login/login.component.ts` | หน้า Login (Standalone Component) — route `/login` |
| `pages/forgot-password/forgot-password.component.ts` | หน้า Forgot Password (Standalone Component) — route `/forgot-password` |

---

## 4. API Endpoints ที่ใช้งาน

โมดูลเชื่อมต่อกับ **ICMON API v1** ผ่าน endpoints ดังนี้:

| Method | Endpoint | ฟังก์ชัน |
|--------|----------|----------|
| POST | `/api/v1/auth/login` | เข้าสู่ระบบ |
| POST | `/api/v1/auth/logout` | ออกจากระบบ |
| POST | `/api/v1/auth/refresh` | ต่ออายุ JWT Token |
| POST | `/api/v1/auth/forgot-password` | ขอรีเซ็ตรหัสผ่าน |
| POST | `/api/v1/auth/reset-password` | ตั้งรหัสผ่านใหม่ |
| GET | `/api/v1/auth/me` | ดึงข้อมูลโปรไฟล์ผู้ใช้ปัจจุบัน |
| GET | `/api/v1/auth/permissions` | ดึงสิทธิ์การเข้าถึงของผู้ใช้ |

> หมายเหตุ: URL ของ endpoints ถูกกำหนดไว้ใน `API_ENDPOINTS` ที่ `core/config/api.config.ts`

---

## 5. หมายเหตุเกี่ยวกับ Demo Mode

- เมื่อ `environment.demo = true` ระบบจะใช้ `DemoAuthRepositoryImpl` แทน `AuthRepositoryImpl`
- ในโหมด Demo สามารถ login ได้ด้วย **email: `demo`** และ **password: `demo`** โดยไม่ต้องเชื่อมต่อ API จริง
- การสลับการทำงานระหว่างโหมดจริงและ Demo ใช้ **DI token `AUTH_REPOSITORY`** ซึ่งประกาศไว้ที่ `core/di/tokens.ts`:
  ```typescript
  export const AUTH_REPOSITORY = new InjectionToken<IAuthRepository>('auth.repository');
  ```
- การ inject ใช้ `@Inject(AUTH_REPOSITORY)` ใน use cases ทุกตัว
- Provider จะถูกตั้งค่าใน `app.module.ts` ตามค่า `environment.demo`
