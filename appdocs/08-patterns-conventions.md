# iCmon — Developer Manual

## 08 — Common Patterns & Conventions

### Use Case Pattern

Every use case follows the Command Pattern via `Usecase<T, R>`:

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

For empty params, use `NoParam`:
```typescript
export class ListCustomersUseCase implements Usecase<NoParam, Customer[]> { ... }
```

### DI Pattern

```typescript
// 1. Token (core/di/tokens.ts)
export const CUSTOMER_REPOSITORY = new InjectionToken<ICustomerRepository>('CustomerRepository');

// 2. Provider mapping (core/di/providers.ts)
{ provide: CUSTOMER_REPOSITORY, useClass: CustomerRepositoryImpl }

// 3. Inject in Use Case
constructor(@Inject(CUSTOMER_REPOSITORY) private repo: ICustomerRepository) {}

// 4. Or in Component (Angular 14+)
private repo = inject(CUSTOMER_REPOSITORY);
```

### Lazy Loading

Pages use `loadComponent()` (standalone) whenever possible:

```typescript
{
  path: 'customers',
  loadComponent: () => import('./customer-list.component').then(m => m.CustomerListComponent),
}
```

Use `loadChildren()` only when the feature has sub-routes (e.g., `JobCardModule`).

### Guard Pattern

```typescript
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    return !!localStorage.getItem('access_token') || this.router.parseUrl('/login');
  }
}
```

### Signal-Based Services

```typescript
// LayoutService (core/services/layout.service.ts)
export class LayoutService {
  private state = signal<LayoutState>(this.loadState());

  readonly theme = this.state.asReadonly();
  readonly font = computed(() => this.state().font);
  readonly radius = signal<'none' | 'small' | 'normal' | 'large' | 'round'>('normal');

  updateFont(font: string): void {
    this.state.update(s => ({ ...s, font }));
    this.saveState();
  }
}
```

### Error Handling

Use `catchError` in components, never in use cases (keep domain pure):

```typescript
this.loginUseCase.execute(credentials).pipe(
  catchError(err => {
    // err.message is Thai from ErrorInterceptor
    this.toastService.show({ type: 'error', title: 'ผิดพลาด', message: err.message });
    return EMPTY;
  })
).subscribe(...);
```

### Naming Conventions

| Artifact | Convention | Example |
|----------|-----------|---------|
| Use Cases | `{action}-{entity}.use-case.ts` | `create-customer.use-case.ts` |
| Use Case Class | PascalCase | `CreateCustomerUseCase` |
| Entities | PascalCase interface | `Customer` |
| DTOs | PascalCase + Dto suffix | `CustomerResponseDto` |
| DataSources | PascalCase + DataSource suffix | `CustomerApiDataSource` |
| Repo Impl | PascalCase + Impl suffix | `CustomerRepositoryImpl` |
| Components | PascalCase + Component suffix | `CustomerListComponent` |
| Pages | kebab-case folder | `customer-list/` |

### API Endpoint Naming

Defined in `src/app/core/config/api.config.ts`:

```typescript
export const API_ENDPOINTS = {
  customers: {
    list: '/customers',
    create: '/customers',
    update: (id: string) => `/customers/${id}`,
    search: '/customers/search',
  },
  // ...
} as const;
```

### Adding a New Feature Checklist

1. Create folder at `src/app/features/<name>/`
2. Create `domain/entities/<name>.entity.ts`
3. Create `domain/repositories/<name>.repository.ts` (interface)
4. Create `domain/use-cases/` (at least: create, list, get)
5. Create `data/datasources/<name>.api.datasource.ts`
6. Create `data/dtos/`
7. Create `data/repositories/<name>.repository.impl.ts`
8. Create `presentation/pages/<name>-list/` (at minimum)
9. Add token in `core/di/tokens.ts`
10. Add provider in `core/di/providers.ts`
11. Add route in `app-routing.module.ts`
12. Add sidebar menu item in `layouts/sidebar/sidebar.component.ts`
13. Add API endpoints in `core/config/api.config.ts`
14. Write unit tests for use cases and components
15. Run `ng build` to verify no errors

### Maintenance Notes

- **Auth refresh token:** `AuthInterceptor.refreshToken()` is a TODO stub — needs real implementation
- **Permission check:** `PermissionGuard.checkPermission()` always returns `of(true)` — needs backend integration
- **Dashboard data:** Uses mock `setTimeout` data — needs real repository connection
- **JobCard sub-routes:** All currently point to `JobListComponent` — need dedicated components
- **Tabler SCSS:** Imported from GitHub dev branch in `src/scss/tabler/`