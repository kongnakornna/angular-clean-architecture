# Plan: แสดง `msg` จาก backend เมื่อ login ไม่ผ่าน

## ปัญหา (root cause ที่ยืนยันแล้ว)

Backend ตอบ login ล้มเหลว: **HTTP 401** + envelope
`{data:null, error:{status:401, statusText:"wrong_password", msg:"invalid credentials"}, is_success:false}`
(ยืนยันด้วย curl จริงกับ http://localhost:5000)

ข้อความ `msg` ถูกทิ้งใน fail path 3 ชั้น:

1. `AuthInterceptor` ดัก status 401 **ทุก URL รวม `/auth/login`** → เข้าสู่โหมด refresh-token → refresh ล้มเหลว → `logout()` reload หน้า (auth.interceptor.ts:37) — error ไม่เคยถึง component เลย
2. `ErrorInterceptor` อ่าน `error.error?.message` แต่ backend ส่ง field ชื่อ `msg` (ซ้อนใน envelope) → ข้อความ server หลุด เหลือ generic "Please login again" (error.interceptor.ts:76)
3. `LoginComponent` branch 401 hardcode ข้อความ i18n ทับ `err.message` เสมอ (login.component.ts:46-47)

นอกจากนี้ `handleError` ใน datasource ยัง override ข้อความ 401 ด้วยข้อความไทย hardcode ทับ server msg (auth.api.datasource.ts:71-72)

Error flow (ทิศทางการไหลกลับเข้า component):
`HTTP → ErrorInterceptor → AuthInterceptor → FallbackInterceptor → AuthApiDataSource.handleError → LoginComponent`

## ภาพรวมการแก้ไข

| # | Layer | ไฟล์ | สิ่งที่แก้ |
|---|-------|------|-----------|
| 1 | core interceptor | src/app/core/interceptors/error.interceptor.ts | extract `msg` จาก backend ทั้ง shape flat (`msg`) และ envelope (`error.msg`) |
| 2 | core interceptor | src/app/core/interceptors/auth.interceptor.ts | ยกเว้น `/auth/login` + `/auth/signin` จากการ hijack 401 (ไม่ refresh/logout ตอน login พลาด) |
| 3 | data datasource | src/app/features/auth/data/datasources/auth.api.datasource.ts | `handleError`: ให้ server msg ชนะข้อความ hardcode; รองรับ plain object `{status,message}` จาก interceptor |
| 4 | presentation | src/app/features/auth/presentation/pages/login/login.component.ts | branch 401 ใช้ `err.message` (msg จาก backend) แทน hardcode i18n |

---

## 1. ErrorInterceptor — extract `msg` จาก backend

**Location:** `src/app/core/interceptors/error.interceptor.ts:75-82`

**From:** อ่าน field เดียว `error.error?.message` — backend จริงส่ง `msg` (flat) หรือ `error.msg` (envelope `{data,error:{msg},is_success}`) ทำให้ `serverMessage` เป็น `undefined` เสมอ

```ts
// ถ้าเซิร์ฟเวอร์ส่ง message มาเอง ให้ใช้ข้อความนั้นทันที
const serverMessage = error.error?.message;
if (serverMessage) {
  return throwError(() => ({
    status: error.status,
    message: serverMessage,
  }));
}
```

**To:** normalize ทั้ง 3 shape ที่ backend ใช้จริง

```ts
// ถ้าเซิร์ฟเวอร์ส่ง message/msg มาเอง ให้ใช้ข้อความนั้นทันที
const errBody = error.error as
  | { message?: string; msg?: string; error?: { msg?: string } }
  | null;
const serverMessage = errBody?.message || errBody?.error?.msg || errBody?.msg;
if (serverMessage) {
  return throwError(() => ({
    status: error.status,
    message: serverMessage,
  }));
}
```

- HTTP 401 จริง → `error.error` = envelope → `errBody.error.msg` = `"invalid credentials"` ✓
- HTTP 200 + `is_success:false` (thrown โดย ApiResponseInterceptor) → `error.error` = `{status,statusText,msg}` → `errBody.msg` ✓
- shape เดิม `{message}` → backward compatible ✓

---

## 2. AuthInterceptor — ไม่ hijack 401 ของ login/signin

**Location:** `src/app/core/interceptors/auth.interceptor.ts:24` และ `:36-39`

**From:** เช็คเฉพาะ refresh endpoint; URL `/auth/login` ที่ตอบ 401 (password ผิด) ถูกพาเข้า `handle401Error` → พยายาม refresh → ล้มเหลว → `logout()` → `window.location.href='/login'` reload หน้า ทำให้ component ไม่เคยได้รับ error

```ts
const isRefreshRequest = req.url.includes(API_ENDPOINTS.auth.refresh);
...
const status = error?.status || error?.statusCode;
if (status === 401 && !isRefreshRequest) {
  return this.handle401Error(req, next);
}
```

**To:** รวม login/signin เป็น auth-flow requests ที่ไม่ refresh

```ts
const isAuthFlowRequest =
  req.url.includes(API_ENDPOINTS.auth.refresh) ||
  req.url.includes(API_ENDPOINTS.auth.login) ||
  req.url.includes(API_ENDPOINTS.auth.signin);
...
const status = error?.status || error?.statusCode;
if (status === 401 && !isAuthFlowRequest) {
  return this.handle401Error(req, next);
}
```

ผลข้างเคียงที่ถูกต้อง: token หมดอายุขณะใช้งานหน้าอื่น (endpoint ที่ไม่ใช่ login/signin/refresh) ยังเข้า refresh flow เหมือนเดิมทุกอย่าง

---

## 3. AuthApiDataSource.handleError — server msg มี priority สูงสุด

**Location:** `src/app/features/auth/data/datasources/auth.api.datasource.ts:57-88`

**From:** 2 bug ซ้อนกัน
- อ่าน `body` จาก `error.error` อย่างเดียว แต่หลังผ่าน interceptor error มาเป็น plain object `{status,message}` → `body` undefined → `serverMsg` null
- `if (error.status === 401)` **override ทับ** `serverMsg` ด้วย `'ไม่ได้รับอนุญาต...'` เสมอ แม้ server ส่ง msg มาแล้ว

**To:** rewrite `handleError` ให้ (a) รองรับทั้ง `HttpErrorResponse` และ plain object (b) server msg ชนะ hardcode เสมอ

```ts
private handleError(error: HttpErrorResponse | { status?: number; message?: string }): Observable<never> {
    const status = error?.status ?? 0;
    let errorMessage = 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์';

    if (error instanceof HttpErrorResponse) {
      const body = error.error as { error?: { msg?: string }; msg?: string; message?: string };
      const serverMsg = body?.error?.msg || body?.msg || body?.message;

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Client Error: ${error.error.message}`;
      } else if (serverMsg) {
        errorMessage = serverMsg;
      } else if (status === 401) {
        errorMessage = 'ไม่ได้รับอนุญาต กรุณาเข้าสู่ระบบอีกครั้ง';
      } else if (status === 403) {
        errorMessage = 'คุณไม่มีสิทธิ์เข้าถึง';
      } else if (status === 404) {
        errorMessage = 'ไม่พบข้อมูลที่ร้องขอ';
      } else if (status === 0) {
        errorMessage = 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบเครือข่าย';
      } else {
        errorMessage = `Server Error (${status}): ${error.message}`;
      }
    } else {
      // plain object {status, message} จาก ErrorInterceptor
      errorMessage = error?.message || errorMessage;
    }

    const appError = new Error(errorMessage) as Error & { status?: number };
    appError.status = status;

    // เก็บ log error ไว้เพื่อดีบัก (ถ้าต้องการเอาออกก็ลบได้)
    console.error('[AuthApiDataSource] HTTP Error:', errorMessage, error);
    return throwError(() => appError);
}
```

---

## 4. LoginComponent — branch 401 แสดง msg จาก backend

**Location:** `src/app/features/auth/presentation/pages/login/login.component.ts:44-56`

**From:**

```ts
error: (err) => {
  this.loading = false;
  if (err.status === 401) {
    this.error = this.i18n.translate('login.invalidCredentials');
  } else if (err.status === 422) {
    ...
```

**To:** ใช้ `err.message` ก่อน (ตอนนี้คือ `"invalid credentials"` จาก backend) — i18n เป็น fallback เมื่อ backend ไม่ส่ง msg

```ts
error: (err) => {
  this.loading = false;
  if (err.status === 401) {
    this.error = err.message || this.i18n.translate('login.invalidCredentials');
  } else if (err.status === 422) {
    ...
```

Template ไม่ต้องแก้ — banner `<div *ngIf="error" class="alert alert-danger mb-3">{{ error }}</div>` (login.component.html:4) แสดง `msg` ให้แล้ว

---

## Unit Tests — เขียน

อัปเดต spec เดิม 3 ไฟล์ ตาม pattern `HttpClientTestingModule` ที่มีอยู่แล้ว:

### 2.1 `src/app/core/interceptors/error.interceptor.spec.ts`

- regression: flush HTTP 401 + envelope `{data:null,error:{status:401,msg:"invalid credentials"},is_success:false}` → error ที่ subscriber ได้รับ `.status === 401` **และ `.message === 'invalid credentials'`**
- case: flush HTTP 200 + `is_success:false` (จำลอง thrown ของ ApiResponseInterceptor — flush body `{status:401,msg:"..."}` ตรง ๆ ให้ ErrorInterceptor) → `.message === '...'`
- case: body แบบเดิม `{message:'Unauthorized'}` → `.message === 'Unauthorized'` (backward compat, spec เดิม line 33-41 ขยาย assertion เพิ่ม)

### 2.2 `src/app/core/interceptors/auth.interceptor.spec.ts`

- regression: POST `/api/auth/login` ตอบ 401 → error ไหลผ่านถึง subscriber เป็น `{status:401,...}` **โดยไม่มี request ไป `/auth/refresh` และไม่มี redirect** (`expect(httpMock.expectNone('/api/auth/refresh'))`)
- case: GET `/api/other` ตอบ 401 + มี refresh_token ใน localStorage → ยังเรียก `/auth/refresh` ตามเดิม (behavior เดิมไม่พัง)

### 2.3 `src/app/features/auth/presentation/pages/login/login.component.spec.ts`

- regression: mock `LoginUseCase.execute` return `throwError(() => ({status:401, message:'invalid credentials'}))` → submit form → `component.error === 'invalid credentials'`
- case: error `{status:401, message:''}` → `component.error === 'login.invalidCredentials'` (fallback key)

---

## Verification

1. `npm test -- --include=**/error.interceptor.spec.ts --include=**/auth.interceptor.spec.ts --include=**/login.component.spec.ts` (Karma) หรือ run ทุก spec: `npm test`
2. Manual E2E: `ng serve` → login ด้วย password ผิด → banner แดงแสดง `invalid credentials`; login สำเร็จ → เข้า dashboard ปกติ
