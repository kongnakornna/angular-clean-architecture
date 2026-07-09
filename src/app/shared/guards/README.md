# Shared — Route Guards

Guard ป้องกันการเข้าถึงหน้า

| File | Description |
|------|-------------|
| `auth.guard.ts` | ต้อง login แล้ว — redirect ไป `/auth/login` ถ้ายังไม่ login |
| `role.guard.ts` | ต้องมีบทบาทที่กำหนด — redirect ไป `/unauthorized` |
| `permission.guard.ts` | ต้องมี permission ที่กำหนด — redirect ไป `/unauthorized` |