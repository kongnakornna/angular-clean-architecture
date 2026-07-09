# Auth — Domain Layer

business logic สำหรับระบบยืนยันตัวตน

## Entities

| Entity | Description |
|--------|-------------|
| `auth.entity.ts` | ข้อมูลล็อกอิน + token (access, refresh, expiresIn) |
| `user.entity.ts` | ข้อมูลผู้ใช้ (id, name, email, role, permissions, avatar, settings) |
| `login-request.entity.ts` | parameter สำหรับขอ login (email, password, rememberMe) |
| `refresh-token.entity.ts` | parameter สำหรับ refresh token |

## Repository Interface

| File | Description |
|------|-------------|
| `auth.repository.interface.ts` | `login`, `logout`, `refresh`, `forgotPassword`, `resetPassword`, `getMe`, `updatePermissions` |

## Use Cases

| Use Case | Description |
|--------|-------------|
| `login.usecase.ts` | Login → เก็บ token → redirect |
| `logout.usecase.ts` | Clear token → redirect |
| `refresh-token.usecase.ts` | Refreshes token → เก็บใหม่ |
| `forgot-password.usecase.ts` | ส่งอีเมลรีเซ็ตรหัสผ่าน |
| `reset-password.usecase.ts` | รีเซ็ตรหัสผ่านด้วย token |
| `get-me.usecase.ts` | ดึงข้อมูลผู้ใช้ปัจจุบัน + อัปเดต permission |
| `get-permissions.usecase.ts` | ดึงเฉพาะ permissions ของผู้ใช้ |