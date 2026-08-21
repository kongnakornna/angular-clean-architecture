# 09 — Testing Guide

## เครื่องมือ

| Tool | Version | หน้าที่ |
|------|---------|---------|
| Jasmine | 4.5 | Test framework |
| Karma | 6.4 | Test runner |
| Chrome Headless | — | Browser สำหรับรัน |

## คำสั่ง

```bash
npm test                    # watch mode (เปิด browser)
ng test --watch=false       # รันครั้งเดียว (สำหรับ CI)
ng test --code-coverage     # พร้อม coverage report
```

## ตำแหน่งไฟล์ Test

Spec files อยู่ข้างไฟล์ที่ test โดยใช้นามสกุล `.spec.ts`:

| ตำแหน่ง | สิ่งที่ test |
|---------|-------------|
| `core/di/*.spec.ts` | tokens + providers ครบถ้วน |
| `core/config/app.config.spec.ts` | default config |
| `core/interceptors/*.spec.ts` | header injection, error mapping |
| `core/services/*.spec.ts` | defaults, updates, reset |
| `core/utils/*.spec.ts` | helpers, formatters, validators (coverage เต็ม) |
| `shared/services/toast.service.spec.ts` | show/close behavior |
| `shared/guards/*.spec.ts` | redirect logic |
| `shared/components/*`, `directives/`, `pipes/` | rendering + transform |
| `features/**/**.spec.ts` | use cases + pages |

## Pattern การเขียน Test

### Use Case Test (mock repository)

```typescript
describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let mockRepo: jasmine.SpyObj<IAuthRepository>;

  beforeEach(() => {
    mockRepo = jasmine.createSpyObj('IAuthRepository', ['login', 'logout']);
    TestBed.configureTestingModule({
      providers: [
        LoginUseCase,
        { provide: AUTH_REPOSITORY, useValue: mockRepo },   // ← mock ผ่าน token
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

### Component Test

```typescript
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],           // standalone component
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

### Interceptor Test

```typescript
it('should add Authorization header', () => {
  localStorage.setItem('access_token', 'test-token');
  http.post('/api/test', {}).subscribe();

  const req = httpTestingController.expectOne('/api/test');
  expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
});
```

## สิ่งที่ควร Test ตามลำดับความสำคัญ

1. **Use Cases** — mock repo ผ่าน InjectionToken, ทดสอบ business flow
2. **Utils/Validators/Formatters** — pure functions, เขียนง่าย
3. **Interceptors** — ใช้ `HttpTestingController`
4. **Guards** — ทดสอบ redirect logic
5. **Components** — rendering + interaction พื้นฐาน

## สถานะ Coverage ปัจจุบัน

- ✅ Core utils — coverage เต็ม
- ✅ DI setup (tokens, providers) — test ครบ
- ✅ Services — basic coverage
- ⚠️ Feature use cases — มี test พื้นฐาน บางโมดูลยังไม่ครบ
- ❌ Page components จำนวนมากยังไม่มี spec
