# 02 — Clean Architecture

โปรเจกต์นี้ implement แนวคิด Clean Architecture ของ Robert C. Martin (Uncle Bob)
ในรูปแบบ **4 เลเยอร์** — ทุก feature module ใช้โครงสร้างเดียวกัน

## แผนภาพเลเยอร์

```
┌──────────────────────────────────────┐
│ PRESENTATION (Pages, Components)     │  → depends on Domain + Core
├──────────────────────────────────────┤
│ DOMAIN (Entities, Use Cases,         │  → pure business logic
│         Repository Interfaces)       │  → depends on Core only
├──────────────────────────────────────┤
│ DATA (Repo Impl, DataSources, DTOs,  │  → implements Domain interfaces
│       Mappers)                       │  → depends on Domain + Core
├──────────────────────────────────────┤
│ CORE (Config, Utils, Interceptors,   │  → shared across all layers
│       DI, Params)                    │
└──────────────────────────────────────┘
```

## Dependency Rules (กฎการพึ่งพา)

| เลเยอร์ | Depend ได้ | ห้าม Depend |
|---------|-----------|-------------|
| **Presentation** | Domain, Core | Data โดยตรง ❌ |
| **Domain** | Core เท่านั้น | Presentation, Data ❌ |
| **Data** | Domain, Core | Presentation ❌ |

## Flow การทำงานของ 1 Request

### Step 1 — Domain ประกาศ contract (interface)

```typescript
// features/auth/domain/repositories/auth.repository.ts
export interface IAuthRepository {
  login(credentials: LoginCredentials): Observable<AuthResponse>;
  logout(): Observable<void>;
  hasPermission(permission: string): Observable<boolean>;
}
```

### Step 2 — Domain เขียน Use Case ที่ consume contract

```typescript
// features/auth/domain/use-cases/login.use-case.ts
@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  constructor(@Inject(AUTH_REPOSITORY) private authRepo: IAuthRepository) {}

  execute(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.authRepo.login(credentials).pipe(
      tap(res => localStorage.setItem('access_token', res.token))
    );
  }
}
```

### Step 3 — Data implement contract

```typescript
// features/auth/data/repositories/auth.repository.impl.ts
@Injectable({ providedIn: 'root' })
export class AuthRepositoryImpl implements IAuthRepository {
  constructor(private dataSource: AuthApiDataSource) {}

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.dataSource.login(credentials).pipe(
      map(dto => this.mapToEntity(dto))   // Mapper: DTO → Entity
    );
  }
}
```

### Step 4 — Presentation เรียก Use Case

```typescript
// presentation/pages/login/login.component.ts
@Component({ standalone: true, ... })
export class LoginComponent {
  private loginUseCase = inject(LoginUseCase);

  login() {
    this.loginUseCase.execute(credentials).subscribe(...);
  }
}
```

## InjectionToken Wiring (DI)

จุดเชื่อมระหว่าง interface (Domain) กับ implementation (Data):

```typescript
// 1) core/di/tokens.ts — ประกาศ token
export const AUTH_REPOSITORY = new InjectionToken<IAuthRepository>('auth.repository');

// 2) core/di/providers.ts — map token → class
{ provide: AUTH_REPOSITORY, useClass: AuthRepositoryImpl }

// 3) Use case inject ผ่าน token
constructor(@Inject(AUTH_REPOSITORY) private repo: IAuthRepository) {}
```

> ทำไมต้องทำแบบนี้? — Domain ไม่รู้จัก Data layer เลย (Inversion of Control)
> สลับ implementation ได้โดยไม่แตะ business logic เช่น Demo mode

## Demo Mode

ตั้ง `demo: true` ใน `environment.ts` แล้ว AppModule จะ override provider:

```typescript
...(environment.demo
  ? [{ provide: AUTH_REPOSITORY, useClass: DemoAuthRepositoryImpl }]
  : [])
```

`DemoAuthRepositoryImpl` รับ login `admin / P@ssw0rd` และคืน fake JWT + ทุก permission
— ใช้ทดสอบ UI โดยไม่ต้องมี backend

## ข้อดีของการใช้ Clean Architecture

1. **Testable** — mock repository ผ่าน InjectionToken ได้ง่าย
2. **Swap implementation ได้** — เปลี่ยน API → LocalStorage → Demo ได้ที่ provider เดียว
3. **Framework-agnostic domain** — entity/use case เป็น pure TypeScript
4. **ทีมงานขยายได้** — ทุก feature โครงสร้างเหมือนกันหมด หาโค้ดเจอเร็ว
