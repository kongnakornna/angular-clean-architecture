# Auth — Presentation Pages

หน้าจอสำหรับระบบยืนยันตัวตน

| Component | Route | Description |
|-----------|-------|-------------|
| `LoginComponent` | `/auth/login` | ฟอร์มล็อกอิน |
| `RegisterComponent` | `/auth/register` | ฟอร์มสมัครสมาชิก |
| `ForgotPasswordComponent` | `/auth/forgot-password` | ฟอร์มขอรีเซ็ตรหัสผ่าน |
| `ResetPasswordComponent` | `/auth/reset-password` | ฟอร์มรีเซ็ตรหัสผ่านด้วย token |

ทุก component ใช้ `BlankLayout` และมีฟังก์ชันหลัก:
- แสดง/ซ่อนรหัสผ่าน (toggle password visibility)
- validation ก่อน submit
- แสดงสถานะ loading ระหว่างเรียก API
- แสดงข้อความ error/success