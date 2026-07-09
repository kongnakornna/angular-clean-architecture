# Auth — Data Layer

จัดการข้อมูลและการสื่อสารกับ API สำหรับระบบยืนยันตัวตน

## โครงสร้าง

```
data/
├── datasources/          # เรียก API จริง
│   ├── auth.remote.datasource.ts
│   └── auth.remote.datasource.impl.ts
├── dto/                  # Data Transfer Objects
│   ├── auth-request.dto.ts
│   ├── auth-response.dto.ts
│   ├── login-request.dto.ts
│   ├── login-response.dto.ts
│   ├── user-profile.dto.ts
│   └── refresh-token.dto.ts
├── repositories/         # Implement repository interface
│   └── auth.repository.impl.ts
└── mappers/              # DTO ↔ Entity mapping
    ├── auth.mapper.ts
    └── user.mapper.ts
```

| Component | Description |
|-----------|-------------|
| `AuthRemoteDataSource` | Abstract class กำหนด method API |
| `AuthRemoteDataSourceImpl` | เรียก HTTP API จริง ใช้ HttpClient |
| `*Dto` | ข้อมูลสำหรับส่ง/รับจาก API |
| `AuthRepositoryImpl` | ใช้ DataSource → Mapper → return Entity |
| `auth.mapper` | Map LoginResponseDto → AuthEntity |
| `user.mapper` | Map UserProfileDto → UserEntity |