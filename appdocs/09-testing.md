# iCmon — Developer Manual

## 09 — Testing Guide

### Test Setup

| Tool | Purpose |
|------|---------|
| Jasmine 4.5 | Test framework |
| Karma 6.4 | Test runner |
| Chrome Headless | Default browser |

Run tests:
```bash
ng test      # watch mode (browser)
ng test --watch=false   # single run (CI)
```

### Test Locations

**40+ spec files** across the project:

| Location | Files | What's Tested |
|----------|-------|---------------|
| `core/di/` | `tokens.spec.ts`, `providers.spec.ts` | All tokens + providers exist |
| `core/config/` | `app.config.spec.ts` | Default config values |
| `core/interceptors/` | `auth.interceptor.spec.ts`, `error.interceptor.spec.ts` | Header injection, error mapping |
| `core/services/` | `page-seo.service.spec.ts`, `layout.service.spec.ts` | Defaults, updates, reset |
| `core/utils/` | `helpers.spec.ts`, `formatters.spec.ts`, `validators.spec.ts` | All utility functions |
| `shared/services/` | `toast.service.spec.ts` | Show/close behavior |
| `shared/guards/` | `auth.guard.spec.ts`, `permission.guard.spec.ts` | Guard redirect logic |
| `shared/components/` | buttons, modals, toast specs | Component rendering |
| `shared/directives/` | `click-outside.directive.spec.ts` | Event emission |
| `shared/pipes/` | translate, status-label, file-size specs | Transform logic |
| Feature modules | `auth/*`, `customer/*`, `job-card/*`, `dashboard/*` | Use cases + pages |

### Testing Patterns

**Service/Use Case Test:**
```typescript
describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let mockRepo: jasmine.SpyObj<IAuthRepository>;

  beforeEach(() => {
    mockRepo = jasmine.createSpyObj('IAuthRepository', ['login', 'logout']);
    TestBed.configureTestingModule({
      providers: [
        LoginUseCase,
        { provide: AUTH_REPOSITORY, useValue: mockRepo },
      ],
    });
    useCase = TestBed.inject(LoginUseCase);
  });

  it('should login with credentials', () => {
    mockRepo.login.and.returnValue(of({ token: 'abc', user: {} } as AuthResponse));
    useCase.execute({ username: 'test', password: 'pass' }).subscribe(res => {
      expect(res.token).toBe('abc');
    });
  });
});
```

**Component Test:**
```typescript
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [/* mock use cases */],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

**Interceptor Test:**
```typescript
it('should add Authorization header', () => {
  localStorage.setItem('access_token', 'test-token');
  const req = httpTestingController.expectOne('/api/test');
  expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
});
```

### Coverage Notes

- Core utils have **full coverage** (helpers, validators, formatters)
- DI setup fully tested (tokens, providers)
- Services have basic coverage (defaults, mutation)
- Feature use cases have **basic tests** — coverage varies
- Many page components are **not yet tested** (most specs are in use cases)