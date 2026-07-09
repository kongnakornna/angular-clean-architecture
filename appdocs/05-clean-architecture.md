# iCmon — Developer Manual

## 05 — Clean Architecture Pattern

### How Clean Architecture Works Here

Each feature module follows a strict 3-layer structure:

```
┌──────────────────────────────┐
│        PRESENTATION          │
│  (Pages, Components)         │
│  → injects Use Cases         │
│  → NEVER imports Data layer  │
├──────────────────────────────┤
│         DOMAIN               │
│  (Entities, Use Cases,       │
│   Repository Interfaces)     │
│  → pure TypeScript           │
│  → no Angular decorators     │
│  → no HttpClient             │
├──────────────────────────────┤
│          DATA                │
│  (Repository Impl,           │
│   DataSources, DTOs,        │
│   Mappers)                   │
│  → implements Domain repos   │
│  → HttpClient calls here     │
│  → DTO ↔ Entity mapping      │
└──────────────────────────────┘
```

### Dependency Rules

| Layer | Can Depend On | Cannot Depend On |
|-------|--------------|-----------------|
| **Presentation** | Domain, Core | Data directly |
| **Domain** | Core only | Presentation, Data |
| **Data** | Domain, Core | Presentation |

### How Layers Connect

**Step 1:** Domain defines the contract:
```typescript
// domain/repositories/auth.repository.ts
export interface IAuthRepository {
  login(credentials: LoginCredentials): Observable<AuthResponse>;
  logout(): Observable<void>;
  hasPermission(permission: string): Observable<boolean>;
}
```

**Step 2:** Domain defines use cases that consume the contract:
```typescript
// domain/use-cases/login.use-case.ts
@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  constructor(@Inject(AUTH_REPOSITORY) private authRepo: IAuthRepository) {}
  execute(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.authRepo.login(credentials).pipe(
      tap(response => localStorage.setItem('access_token', response.token))
    );
  }
}
```

**Step 3:** Data implements the contract:
```typescript
// data/repositories/auth.repository.impl.ts
@Injectable({ providedIn: 'root' })
export class AuthRepositoryImpl implements IAuthRepository {
  constructor(private dataSource: AuthApiDataSource) {}
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.dataSource.login(credentials).pipe(
      map(dto => this.mapToEntity(dto))
    );
  }
}
```

**Step 4:** Presentation consumes use case:
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

### InjectionToken Wiring

In `core/di/tokens.ts`:
```typescript
export const AUTH_REPOSITORY = new InjectionToken<IAuthRepository>('AuthRepository');
```

In `core/di/providers.ts`:
```typescript
{ provide: AUTH_REPOSITORY, useClass: AuthRepositoryImpl }
```

In use cases:
```typescript
constructor(@Inject(AUTH_REPOSITORY) private authRepo: IAuthRepository) {}
```

### Demo Mode

Set `demo: true` in `environment.ts` to swap the auth repository:
```typescript
... (environment.demo
  ? [{ provide: AUTH_REPOSITORY, useClass: DemoAuthRepositoryImpl }]
  : [])
```

`DemoAuthRepositoryImpl` accepts `admin / P@ssw0rd`, returns fake JWT + all permissions.