# 08 — Patterns & Conventions

## Use Case Pattern (Command Pattern)

ทุก use case implement `Usecase<T, R>`:

```typescript
import { Usecase } from 'src/app/core/contracts/usecase.contract';

@Injectable({ providedIn: 'root' })
export class CreateCustomerUseCase implements Usecase<CreateCustomerParams, Customer> {
  constructor(@Inject(CUSTOMER_REPOSITORY) private repo: ICustomerRepository) {}

  execute(params: CreateCustomerParams): Observable<Customer> {
    return this.repo.create(params);
  }
}
```

ไม่มี params → ใช้ `NoParam`:

```typescript
export class ListCustomersUseCase implements Usecase<NoParam, Customer[]> { ... }
```

## DI Pattern

```typescript
// 1. ประกาศ token — core/di/tokens.ts
export const CUSTOMER_REPOSITORY = new InjectionToken<ICustomerRepository>('customer.repository');

// 2. Map provider — core/di/providers.ts
{ provide: CUSTOMER_REPOSITORY, useClass: CustomerRepositoryImpl }

// 3. Inject ใน use case
constructor(@Inject(CUSTOMER_REPOSITORY) private repo: ICustomerRepository) {}

// 4. หรือ inject ใน component (Angular modern API)
private repo = inject(CUSTOMER_REPOSITORY);
```

## Mapper Pattern

DTO ↔ Entity แปลกันใน data layer เท่านั้น:

```typescript
export class CustomerMapper extends Mapper<Customer, CustomerResponseDto> {
  mapFrom(dto: CustomerResponseDto): Customer { ... }  // DTO → Entity
  mapTo(entity: Customer): CustomerResponseDto { ... } // Entity → DTO
}
```

## Signal-Based Services

Service ที่มี state ใช้ Angular Signals:

```typescript
export class LayoutService {
  private state = signal<LayoutState>(this.loadState());
  readonly theme = this.state.asReadonly();
  readonly font = computed(() => this.state().font);

  updateFont(font: string): void {
    this.state.update(s => ({ ...s, font }));
    this.saveState();   // persist localStorage
  }
}
```

## Error Handling

- **catchError ใน component** — ไม่ใส่ใน use case (รักษา domain ให้บริสุทธิ์)

```typescript
this.loginUseCase.execute(credentials).pipe(
  catchError(err => {
    // err.message เป็นภาษาไทยจาก ErrorInterceptor
    this.toastService.show({ type: 'error', title: 'ผิดพลาด', message: err.message });
    return EMPTY;
  })
).subscribe(...);
```

## Naming Conventions

| Artifact | Convention | Example |
|----------|-----------|---------|
| Use Case file | `{action}-{entity}.use-case.ts` | `create-customer.use-case.ts` |
| Use Case class | PascalCase | `CreateCustomerUseCase` |
| Entity | PascalCase interface | `Customer` |
| DTO | PascalCase + Dto | `CustomerResponseDto` |
| DataSource | PascalCase + DataSource | `CustomerApiDataSource` |
| Repo Impl | PascalCase + Impl | `CustomerRepositoryImpl` |
| Component | PascalCase + Component | `CustomerListComponent` |
| Page folder | kebab-case | `customer-list/` |

## API Endpoint Naming

รวมศูนย์ใน `core/config/api.config.ts`:

```typescript
export const API_ENDPOINTS = {
  customers: {
    list: '/customers',
    create: '/customers',
    update: (id: string) => `/customers/${id}`,
    search: '/customers/search',
  },
} as const;
```

---

# Checklist: เพิ่ม Feature Module ใหม่

1. ☐ สร้างโฟลเดอร์ `src/app/features/<name>/` + ย่อย `domain/`, `data/`, `presentation/`
2. ☐ `domain/entities/<name>.entity.ts`
3. ☐ `domain/repositories/<name>.repository.ts` (interface)
4. ☐ `domain/use-cases/` — อย่างน้อย create, list, get
5. ☐ `data/datasources/<name>.api.datasource.ts`
6. ☐ `data/dtos/` (request/response)
7. ☐ `data/repositories/<name>.repository.impl.ts`
8. ☐ `presentation/pages/<name>-list/` (ขั้นต่ำ)
9. ☐ เพิ่ม token ใน `core/di/tokens.ts`
10. ☐ เพิ่ม provider ใน `core/di/providers.ts`
11. ☐ เพิ่ม endpoint ใน `core/config/api.config.ts`
12. ☐ เพิ่ม route ใน `app-routing.module.ts` (+ PermissionGuard ถ้าจำเป็น)
13. ☐ เพิ่ม menu ใน `layouts/sidebar/sidebar.component.ts`
14. ☐ เขียน unit test ของ use cases และ components
15. ☐ รัน `npm run build` ตรวจว่าไม่มี error

---

# Known Issues / TODO

| ประเด็น | ไฟล์ |
|---------|------|
| Refresh token ยังเป็น stub (`'new-token'`) | `core/interceptors/auth.interceptor.ts` |
| PermissionGuard ยังไม่ได้เชื่อม backend | `shared/guards/permission.guard.ts` |
| Dashboard ใช้ mock data (setTimeout) | `features/dashboard/presentation/pages/main-dashboard/` |
| JobCard sub-routes ชี้ที่ JobListComponent หมด | `features/job-card/job-card.module.ts` |
| โมดูล alarm/orders/system/websocket ยังไม่มี UI | `features/*/presentation` |
