# Angular Clean Architecture - คู่มือการพัฒนาและบำรุงรักษา

## สารบัญ

1. [ภาพรวมโครงสร้าง](#ภาพรวมโครงสร้าง)
2. [หลักการออกแบบ Clean Architecture](#หลักการออกแบบ-clean-architecture)
3. [โครงสร้างโปรเจคโดยละเอียด](#โครงสร้างโปรเจคโดยละเอียด)
4. [แนวทางการพัฒนา](#แนวทางการพัฒนา)
5. [การบำรุงรักษา](#การบำรุงรักษา)
6. [กลยุทธ์การ Upgrade ในอนาคต](#กลยุทธ์การ-upgrade-ในอนาคต)
7. [Best Practices & Patterns](#best-practices--patterns)
8. [Troubleshooting & FAQ](#troubleshooting--faq)

---

## ภาพรวมโครงสร้าง

```
angular-clean-architecture/
├── docs/                           # เอกสารเทคนิค
├── src/
│   ├── app/
│   │   ├── core/                   # Core Module - Singleton services, interceptors, config
│   │   │   ├── config/             # App config, API config, Logger config
│   │   │   ├── contracts/          # Interfaces/Abstract classes (UseCase, Mapper)
│   │   │   ├── constants/            # App constants, enums
│   │   │   ├── di/                 # Dependency Injection tokens & providers
│   │   │   ├── interceptors/       # HTTP interceptors (auth, error, logging)
│   │   │   ├── params/             # Parameter objects
│   │   │   ├── services/           # Core services (logger, theme, layout, SEO)
│   │   │   ├── types/              # Shared type definitions
│   │   │   ├── utils/              # Pure utility functions
│   │   │   ├── core.module.ts
│   │   │   └── index.ts            # Barrel export
│   │   │
│   │   ├── shared/                 # Shared Module - Reusable UI components, pipes, directives
│   │   │   ├── components/         # Dumb/Presentation components
│   │   │   ├── pipes/              # Custom pipes
│   │   │   ├── directives/         # Custom directives
│   │   │   ├── services/           # Shared services (toast, i18n)
│   │   │   ├── i18n/               # Internationalization
│   │   │   ├── shared.module.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── features/               # Feature Modules - Business logic by domain
│   │   │   ├── auth/
│   │   │   ├── wos/                # Web Order System
│   │   │   ├── job-card/
│   │   │   ├── document/
│   │   │   ├── dashboard/
│   │   │   ├── customer/
│   │   │   ├── quotation/
│   │   │   ├── purchase-order/
│   │   │   ├── inventory/
│   │   │   ├── payment/
│   │   │   ├── batch/
│   │   │   ├── email/
│   │   │   ├── iot/
│   │   │   ├── orders/
│   │   │   ├── system/
│   │   │   └── websocket/
│   │   │
│   │   ├── layouts/                # Layout components (optional)
│   │   │   └── default-layout/
│   │   │
│   │   ├── app.routes.ts           # Main routing config
│   │   ├── app.config.ts           # App configuration (standalone)
│   │   ├── app.component.ts
│   │   └── app.module.ts           # Legacy module (if needed)
│   │
│   ├── assets/                     # Static assets
│   ├── environments/               # Environment configs
│   ├── styles.scss                 # Global styles
│   └── main.ts                     # Bootstrap
│
├── angular.json                    # Angular CLI config
├── package.json
├── tsconfig.json
└── README.md
```

---

## หลักการออกแบบ Clean Architecture

### Dependency Rule (กติกาหลัก)

```
┌─────────────────────────────────────┐
│         Presentation Layer          │  ← Components, Pages
│        (Features - UI)              │
└─────────────────┬───────────────────┘
                  │ depends on
                  ▼
┌─────────────────────────────────────┐
│        Application Layer            │  ← Use Cases, DTOs
│      (Features - Domain)            │
└─────────────────┬───────────────────┘
                  │ depends on
                  ▼
┌─────────────────────────────────────┐
│          Domain Layer               │  ← Entities, Repository Interfaces
│      (Features - Domain)            │
└─────────────────┬───────────────────┘
                  │ depends on (inverted)
                  ▼
┌─────────────────────────────────────┐
│        Infrastructure Layer         │  ← Repository Impl, API DataSource
│      (Features - Data)              │
└─────────────────────────────────────┘
```

### Layer Responsibilities

| Layer | ตำแหน่ง | หน้าที่ | ตัวอย่าง |
|-------|---------|---------|---------|
| **Presentation** | `features/*/presentation/` | UI Components, Pages, Forms | `order-list.component.ts` |
| **Application** | `features/*/domain/use-cases/` | Business logic, Orchestration | `create-web-order.use-case.ts` |
| **Domain** | `features/*/domain/` | Entities, Repository Contracts | `web-order.entity.ts`, `web-order.repository.ts` |
| **Infrastructure** | `features/*/data/` | API calls, Repository Implementation | `web-order.repository.impl.ts`, `wos.api.datasource.ts` |

---

## โครงสร้าง Feature Module แบบละเอียด

```
features/wos/                          # Web Order System
├── domain/                            # 🎯 Domain Layer (Pure TS, no Angular)
│   ├── entities/
│   │   └── web-order.entity.ts        # Business object with behavior
│   ├── repositories/
│   │   └── web-order.repository.ts    # Interface (Contract)
│   └── use-cases/
│       ├── create-web-order.use-case.ts
│       ├── get-web-order.use-case.ts
│       ├── list-web-orders.use-case.ts
│       ├── update-web-order-status.use-case.ts
│       └── cancel-web-order.use-case.ts
│
├── data/                              # 🔧 Data Layer (Implementation)
│   ├── datasources/
│   │   └── wos.api.datasource.ts      # HTTP calls
│   ├── dtos/
│   │   ├── web-order-response.dto.ts
│   │   └── create-web-order-request.dto.ts
│   ├── mappers/
│   │   └── web-order.mapper.ts        # DTO ↔ Entity mapping
│   └── repositories/
│       └── web-order.repository.impl.ts
│
└── presentation/                      # 🎨 Presentation Layer
    ├── pages/
    │   ├── order-list/
    │   │   ├── order-list.component.ts
    │   │   ├── order-list.component.html
    │   │   ├── order-list.component.scss
    │   │   └── order-list.component.spec.ts
    │   ├── order-detail/
    │   └── order-create/
    ├── components/                    # Feature-specific UI components
    │   └── order-status-badge/
    └── wos.module.ts                  # Feature module (optional, for lazy loading)
```

---

## แนวทางการพัฒนา

### 1. สร้าง Feature ใหม่ (Checklist)

```bash
# 1. สร้างโครงสร้างโฟลเดอร์
mkdir -p src/app/features/feature-name/{domain/{entities,repositories,use-cases},data/{datasources,dtos,mappers,repositories},presentation/{pages,components}}

# 2. สร้าง Domain Entity
# 3. สร้าง Repository Interface
# 4. สร้าง Use Cases
# 5. สร้าง DTOs & Mapper
# 6. สร้าง API DataSource
# 7. สร้าง Repository Implementation
# 8. สร้าง Presentation Components
# 9. เพิ่ม Routes (Lazy loading)
# 10. Register DI tokens ใน core/di/providers.ts
# 11. เขียน Unit Tests
```

### 2. Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| **Entity** | PascalCase + `.entity.ts` | `web-order.entity.ts` |
| **Repository Interface** | PascalCase + `.repository.ts` | `web-order.repository.ts` |
| **Repository Impl** | PascalCase + `.repository.impl.ts` | `web-order.repository.impl.ts` |
| **Use Case** | kebab-case + `.use-case.ts` | `create-web-order.use-case.ts` |
| **DTO** | PascalCase + `.dto.ts` | `create-web-order-request.dto.ts` |
| **Mapper** | PascalCase + `.mapper.ts` | `web-order.mapper.ts` |
| **DataSource** | PascalCase + `.datasource.ts` | `wos.api.datasource.ts` |
| **Component** | kebab-case + `.component.ts` | `order-list.component.ts` |
| **Service** | kebab-case + `.service.ts` | `toast.service.ts` |
| **Pipe** | kebab-case + `.pipe.ts` | `translate.pipe.ts` |
| **Directive** | kebab-case + `.directive.ts` | `click-outside.directive.ts` |
| **Interface** | PascalCase (no suffix) | `WebOrder` |
| **Type** | PascalCase + `Type` suffix | `PaginationType` |
| **Enum** | PascalCase | `OrderStatus` |
| **Injection Token** | UPPER_SNAKE_CASE | `WEB_ORDER_REPOSITORY` |

### 3. Use Case Pattern

```typescript
// domain/use-cases/create-web-order.use-case.ts
import { Injectable } from '@angular/core';
import { WebOrderRepository } from '../repositories/web-order.repository';
import { WebOrder } from '../entities/web-order.entity';
import { CreateWebOrderDto } from '../../data/dtos/create-web-order-request.dto';

export interface CreateWebOrderUseCase {
  execute(dto: CreateWebOrderDto): Promise<WebOrder>;
}

@Injectable({ providedIn: 'root' })
export class CreateWebOrderUseCase implements CreateWebOrderUseCase {
  constructor(
    private readonly repository: WebOrderRepository,
    private readonly mapper: WebOrderMapper
  ) {}

  async execute(dto: CreateWebOrderDto): Promise<WebOrder> {
    // 1. Validate business rules
    this.validate(dto);
    
    // 2. Map DTO to Entity
    const entity = this.mapper.toEntity(dto);
    
    // 3. Execute via repository
    return this.repository.create(entity);
  }

  private validate(dto: CreateWebOrderDto): void {
    if (!dto.customerId) {
      throw new ValidationError('Customer ID is required');
    }
  }
}
```

### 4. Repository Pattern

```typescript
// domain/repositories/web-order.repository.ts (Interface)
export interface WebOrderRepository {
  findById(id: string): Promise<WebOrder | null>;
  findAll(params: ListWebOrdersParams): Promise<PaginatedResult<WebOrder>>;
  create(order: WebOrder): Promise<WebOrder>;
  update(id: string, order: Partial<WebOrder>): Promise<WebOrder>;
  delete(id: string): Promise<void>;
}

// data/repositories/web-order.repository.impl.ts (Implementation)
@Injectable({ providedIn: 'root' })
export class WebOrderRepositoryImpl implements WebOrderRepository {
  constructor(
    private readonly dataSource: WosApiDataSource,
    private readonly mapper: WebOrderMapper
  ) {}

  async findById(id: string): Promise<WebOrder | null> {
    const dto = await this.dataSource.getWebOrder(id);
    return dto ? this.mapper.toEntity(dto) : null;
  }

  async create(order: WebOrder): Promise<WebOrder> {
    const dto = this.mapper.toCreateDto(order);
    const response = await this.dataSource.createWebOrder(dto);
    return this.mapper.toEntity(response);
  }
  // ... other methods
}
```

### 5. Dependency Injection Setup

```typescript
// core/di/tokens.ts
import { InjectionToken } from '@angular/core';
import { WebOrderRepository } from '../../features/wos/domain/repositories/web-order.repository';

export const WEB_ORDER_REPOSITORY = new InjectionToken<WebOrderRepository>('WEB_ORDER_REPOSITORY');

// core/di/providers.ts
import { Provider } from '@angular/core';
import { WEB_ORDER_REPOSITORY } from './tokens';
import { WebOrderRepositoryImpl } from '../../features/wos/data/repositories/web-order.repository.impl';

export const REPOSITORY_PROVIDERS: Provider[] = [
  { provide: WEB_ORDER_REPOSITORY, useClass: WebOrderRepositoryImpl },
  // ... other repositories
];

// Usage in component
@Component({...})
export class OrderListComponent {
  constructor(
    @Inject(WEB_ORDER_REPOSITORY) private repository: WebOrderRepository
  ) {}
}
```

---

## การบำรุงรักษา

### 1. Code Quality Gates

```json
// package.json scripts
{
  "scripts": {
    "lint": "ng lint",
    "format": "prettier --write \"src/**/*.{ts,html,scss,json}\"",
    "test": "ng test --watch=false --browsers=ChromeHeadless",
    "test:coverage": "ng test --code-coverage",
    "build:prod": "ng build --configuration production",
    "analyze": "ng build --stats-json && npx webpack-bundle-analyzer dist/stats.json"
  }
}
```

### 2. Git Hooks (Husky)

```json
// .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

```json
// package.json
{
  "lint-staged": {
    "*.{ts,html,scss}": ["prettier --write", "eslint --fix"],
    "*.json": ["prettier --write"]
  }
}
```

### 3. Code Review Checklist

- [ ] **Architecture**: Follows Clean Architecture layers?
- [ ] **DI**: Uses Injection Tokens, not concrete classes?
- [ ] **Tests**: Unit tests for use cases, mappers, services?
- [ ] **Types**: No `any`, proper interfaces?
- [ ] **Performance**: OnPush change detection, trackBy?
- [ ] **Accessibility**: ARIA labels, semantic HTML?
- [ ] **i18n**: No hardcoded strings?
- [ ] **Documentation**: JSDoc for public APIs?

### 4. Dependency Updates

```bash
# Monthly maintenance
npm outdated                    # Check outdated
npm update                      # Minor/patch updates
npx npm-check-updates -u        # Major updates (review first!)
npm install                     # Reinstall
npm run test                    # Verify
npm run build:prod              # Verify build
```

### 5. Monitoring Bundle Size

```bash
# Analyze bundle
ng build --stats-json
npx webpack-bundle-analyzer dist/angular-clean-architecture/stats.json

# Budgets (angular.json)
"budgets": [
  { "type": "initial", "maximumWarning": "500kb", "maximumError": "1mb" },
  { "type": "anyComponentStyle", "maximumWarning": "10kb", "maximumError": "20kb" }
]
```

---

## กลยุทธ์การ Upgrade ในอนาคต

### 1. Angular Version Upgrade

```bash
# แนวทาง: Upgrade ทีละ Major version
ng update @angular/core@17 @angular/cli@17
ng update @angular/core@18 @angular/cli@18
ng update @angular/core@19 @angular/cli@19

# หลังแต่ละ version
ng update @angular/material@xx  # หากใช้ Material
npm run test
npm run build:prod
```

### 2. Migration Checklist per Version

| Version | Breaking Changes | Action Required |
|---------|-----------------|-----------------|
| v17 | Signals, built-in control flow | Optional: adopt signals, `@if`/`@for` |
| v18 | Input signals, `provideHttpClient` | Migrate to `provideHttpClient()` |
| v19 | Zoneless (experimental) | Evaluate for performance |
| v20 | TBD | Follow official guide |

### 3. RxJS Upgrades

```bash
# Check compatibility
npx rxjs-migration-tool

# Common migrations
# v7 → v8: pipe() operators, remove deprecated
# v8 → v9: internal changes only
```

### 4. TypeScript Upgrades

```json
// tsconfig.json - update target/module
{
  "compilerOptions": {
    "target": "ES2022",    // Update with Angular version
    "module": "ES2022",
    "lib": ["ES2022", "dom"]
  }
}
```

### 5. Deprecation Strategy

```typescript
// ใช้ @deprecated JSDoc
/**
 * @deprecated Use createWebOrderUseCase.execute() instead
 * Will be removed in v2.0
 */
@Deprecated()
legacyCreateOrder(data: any): Promise<Order> { ... }

// วิธีตรวจสอบ deprecated usage
ng build --configuration production 2>&1 | grep -i deprecated
```

---

## Best Practices & Patterns

### 1. Smart vs Dumb Components

```typescript
// Smart Component (Container) - Connected to store/services
@Component({...})
export class OrderListPage {
  orders$ = this.store.select(selectOrders);
  constructor(private store: Store) {}
  
  loadOrders() { this.store.dispatch(loadOrders()); }
}

// Dumb Component (Presentational) - Only @Input/@Output
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div *ngFor="let order of orders">{{ order.name }}</div>`
})
export class OrderListComponent {
  @Input() orders: Order[] = [];
  @Output() select = new EventEmitter<Order>();
}
```

### 2. OnPush Change Detection

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
export class MyComponent {
  // ใช้ signals หรือ async pipe
  data$ = this.service.getData();
  
  // หรือ signals (Angular 17+)
  data = signal<Data[]>([]);
}
```

### 3. TrackBy Functions

```typescript
// ใน template
<div *ngFor="let item of items; trackBy: trackById">{{ item.name }}</div>

// ใน component
trackById = (index: number, item: Item) => item.id;
```

### 4. Error Handling Pattern

```typescript
// core/interceptors/error.interceptor.ts
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Log error
        this.logger.error('HTTP Error', { 
          url: req.url, 
          status: error.status,
          message: error.message 
        }, error);
        
        // Transform to user-friendly error
        const appError = this.mapError(error);
        return throwError(() => appError);
      })
    );
  }
}
```

### 5. Loading State Pattern

```typescript
// Shared loading service
@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingSubject = new BehaviorSubject<string | null>(null);
  loading$ = this.loadingSubject.asObservable();
  
  show(key: string) { this.loadingSubject.next(key); }
  hide() { this.loadingSubject.next(null); }
}

// In component
this.loadingService.show('orders');
this.orders$.pipe(
  finalize(() => this.loadingService.hide())
).subscribe();
```

---

## Troubleshooting & FAQ

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| `NullInjectorError` | Missing provider | Check `providers.ts`, import module |
| `Circular dependency` | Barrel exports, mutual imports | Use forwardRef, restructure imports |
| `ExpressionChangedAfterChecked` | OnPush + async data | Use `markForCheck()`, `detectChanges()` |
| `Zone.js pollution` | Too many async ops | Use `runOutsideAngular` for heavy ops |
| `Memory leak` | Unsubscribed observables | Use `takeUntilDestroyed()` or `async` pipe |

### Debug Commands

```bash
# Analyze dependencies
npx madge --circular --extensions ts src/app

# Check bundle
ng build --stats-json && npx webpack-bundle-analyzer dist/stats.json

# Type check
npx tsc --noEmit

# Test specific file
ng test --include="**/order-list.component.spec.ts"
```

### Performance Profiling

```typescript
// ใน Chrome DevTools
// 1. Performance tab → Record
// 2. กดปุ่ม/โหลดหน้าที่ช้า
// 3. หา "Scripting" สีเหลืองนาน → optimize

// Angular DevTools
// - Components: ตรวจ Change Detection cycles
// - Profiler: Record change detection
```

---

## Quick Reference: File Templates

### Entity Template
```typescript
// features/xyz/domain/entities/xyz.entity.ts
export interface Xyz {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class XyzEntity implements Xyz {
  constructor(
    public readonly id: string,
    public name: string,
    public readonly createdAt: Date,
    public updatedAt: Date
  ) {}
  
  updateName(name: string): void {
    this.name = name;
    this.updatedAt = new Date();
  }
}
```

### Use Case Template
```typescript
// features/xyz/domain/use-cases/do-something.use-case.ts
import { Injectable } from '@angular/core';
import { XyzRepository } from '../repositories/xyz.repository';
import { Xyz } from '../entities/xyz.entity';

export interface DoSomethingUseCase {
  execute(input: DoSomethingInput): Promise<Xyz>;
}

export interface DoSomethingInput {
  id: string;
  data: string;
}

@Injectable({ providedIn: 'root' })
export class DoSomethingUseCaseImpl implements DoSomethingUseCase {
  constructor(private readonly repository: XyzRepository) {}
  
  async execute(input: DoSomethingInput): Promise<Xyz> {
    // Validate
    // Execute
    // Return
  }
}
```

---

## เอกสารอ้างอิง

- [Angular Style Guide](https://angular.io/guide/styleguide)
- [Clean Architecture by Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Angular Architecture Patterns](https://angular-architecture-patterns.github.io/)
- [RxJS Best Practices](https://rxjs.dev/guide/overview)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

*Last updated: 2026-07-11 | Version: 1.0.0*
