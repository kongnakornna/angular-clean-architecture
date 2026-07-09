# Core — Config

การตั้งค่ากลางของแอปพลิเคชัน

| File | Description |
|------|-------------|
| `api.config.ts` | `API_ENDPOINTS` — จุดสิ้นสุด API ทั้งหมดแบ่งตาม module |
| `app.config.ts` | `AppConfig` interface + `APP_CONFIG` InjectionToken + ค่าเริ่มต้น |

## API_ENDPOINTS

รวม endpoint path สำหรับ backend API v1:
- `auth` — login, logout, refresh, forgot/reset password, me, permissions
- `users`, `customers`, `jobs`, `quotations`, `purchaseOrders`, `products`
- `payments`, `dashboard`, `documents`, `email`, `batch`, `iot`, `wos`