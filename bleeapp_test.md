# คู่มือการทดสอบ (Testing Guide)

## สารบัญ
1. [ภาพรวม](#1-ภาพรวม)
2. [รันเทส](#2-รันเทส)
3. [โครงสร้างเทสไฟล์](#3-โครงสร้างเทสไฟล์)
4. [รูปแบบการเขียนเทส](#4-รูปแบบการเขียนเทส)
   - [Standalone Component](#41-standalone-component)
   - [Module-Declared Component](#42-module-declared-component)
   - [Service](#43-service)
   - [Pipe](#44-pipe)
   - [Guard](#45-guard)
   - [Interceptor](#46-interceptor)
   - [Use Case (Domain)](#47-use-case-domain)
5. [Mocking Patterns](#5-mocking-patterns)
6. [เทส Tabler Components](#6-เทส-tabler-components)
7. [ข้อปฏิบัติ](#7-ข้อปฏิบัติ)

---

## 1. ภาพรวม

โปรเจกต์นี้ใช้ **Karma** เป็น test runner และ **Jasmine** เป็น test framework (ver 4.5)

| เครื่องมือ | เวอร์ชัน |
|---|---|
| `jasmine-core` | ~4.5.0 |
| `karma` | ~6.4.0 |
| `karma-chrome-launcher` | ~3.1.0 |
| `karma-coverage` | ~2.2.0 |

**ไม่มี** `karma.conf.js` — Angular CLI สร้าง config ให้อัตโนมัติ

**ไม่ได้ใช้** `@testing-library/angular`, `ng-mocks`, `Spectator`, หรือ `Jest`

---

## 2. รันเทส

```bash
npm test
# หรือ
ng test
```

- Browser: Chrome (เปิด browser อัตโนมัติ)
- Coverage report: สร้างใน `coverage/` (ไม่มี threshold)
- เทสทั้งหมดอยู่ใน `src/app/**/*.spec.ts`

> **สำคัญ**: ถ้าเพิ่ม Component หรือ Service ใหม่ อย่าลืมสร้าง `.spec.ts` ไฟล์ด้วย

---

## 3. โครงสร้างเทสไฟล์

เทสไฟล์วางไว้คู่กับไฟล์ที่ทดสอบ:

```
src/app/features/customer/presentation/pages/customer-list/
├── customer-list.component.ts
├── customer-list.component.html
├── customer-list.component.scss
└── customer-list.component.spec.ts      ← วางไว้ที่เดียวกัน
```

**ทุกไฟล์ควรมีอย่างน้อย 1 test case** (`should create`)

---

## 4. รูปแบบการเขียนเทส

### 4.1 Standalone Component

คอมโพเนนต์ใหม่ส่วนใหญ่เป็น standalone (`standalone: true`) ให้ใช้ `imports` แทน `declarations`:

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerListComponent } from './customer-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerListComponent, RouterTestingModule],  // ← standalone component ใน imports
      providers: [
        { provide: TranslateService, useValue: mockTranslateService() },
        // mock use cases / services ที่ depend
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### 4.2 Module-Declared Component

คอมโพเนนต์เก่าที่ `standalone: false` ใช้ `declarations`:

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { ToastService, ToastType } from '../../services/toast.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [ToastComponent],            // ← module-declared ใน declarations
      providers: [ToastService],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### 4.3 Service

```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MyApiService } from './my-api.service';

describe('MyApiService', () => {
  let service: MyApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MyApiService],
    });
    service = TestBed.inject(MyApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch data', () => {
    service.getData().subscribe((data) => {
      expect(data).toEqual({ id: 1 });
    });

    const req = httpMock.expectOne('/api/data');
    expect(req.request.method).toBe('GET');
    req.flush({ id: 1 });
  });
});
```

### 4.4 Pipe

Pipe ที่ไม่มี dependency — instantiate โดยตรง:

```typescript
import { MyPipe } from './my.pipe';

describe('MyPipe', () => {
  const pipe = new MyPipe();

  it('should transform value', () => {
    expect(pipe.transform('hello')).toBe('HELLO');
  });
});
```

Pipe ที่มี dependency — ใช้ TestBed:

```typescript
import { TestBed } from '@angular/core/testing';
import { TranslatePipe } from './translate.pipe';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('TranslatePipe', () => {
  let pipe: TranslatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TranslatePipe,
        { provide: TranslateService, useValue: { instant: (k: string) => k, onLangChange: of({}) } },
      ],
    });
    pipe = TestBed.inject(TranslatePipe);
  });

  it('should return key as fallback', () => {
    expect(pipe.transform('hello.world')).toBe('hello.world');
  });
});
```

### 4.5 Guard

```typescript
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: { isAuthenticated: () => true } },
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should allow activation when authenticated', () => {
    const result = guard.canActivate(null!, null!);
    expect(result).toBeTrue();
  });
});
```

### 4.6 Interceptor

```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should add Authorization header', () => {
    httpClient.get('/api/data').subscribe();
    const req = httpMock.expectOne('/api/data');
    expect(req.request.headers.has('Authorization')).toBeTrue();
    req.flush({});
  });
});
```

### 4.7 Use Case (Domain)

Use case เป็น pure class — instantiate โดยตรง ไม่ต้องใช้ TestBed:

```typescript
import { CreateCustomerUseCase } from './create-customer.use-case';
import { of } from 'rxjs';

describe('CreateCustomerUseCase', () => {
  let useCase: CreateCustomerUseCase;
  let mockRepo: jasmine.SpyObj<ICustomerRepository>;

  beforeEach(() => {
    mockRepo = jasmine.createSpyObj('ICustomerRepository', ['create']);
    mockRepo.create.and.returnValue(of({ id: '1', name: 'Test' }));
    useCase = new CreateCustomerUseCase(mockRepo);
  });

  it('should call repository.create', (done) => {
    useCase.execute({ name: 'Test' }).subscribe((result) => {
      expect(mockRepo.create).toHaveBeenCalledWith({ name: 'Test' });
      expect(result.name).toBe('Test');
      done();
    });
  });
});
```

---

## 5. Mocking Patterns

**jasmine.createSpyObj** — สำหรับ mock service/repository:

```typescript
const mockRepo = jasmine.createSpyObj('ICustomerRepository', ['create', 'getAll']);
mockRepo.create.and.returnValue(of({ id: '1' }));
mockRepo.getAll.and.returnValue(of({ data: [], total: 0 }));
```

**Object literal** — สำหรับ mock ที่ไม่ซับซ้อน:

```typescript
{ provide: TranslateService, useValue: {
  currentLang: 'en',
  getCurrentLang: () => 'en',
  getBrowserLang: () => 'en',
  instant: (k: string) => k,
  use: () => of({}),
  onLangChange: of({}),
} }
```

**Inline mock** — สำหรับ use case ที่ component เรียกใช้:

```typescript
{ provide: ListCustomersUseCase, useValue: { execute: () => of({ data: [], total: 0 }) } }
```

**SpyOn EventEmitter** — สำหรับทดสอบ @Output:

```typescript
spyOn(component.onClick, 'emit');
component.onClick.emit();
expect(component.onClick.emit).toHaveBeenCalled();
```

---

## 6. เทส Tabler Components

Tabler components ทั้งหมด 136 ตัวเป็น **standalone** (`standalone: true`) และใช้ `imports`

รูปแบบเทสมาตรฐาน:

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionComponent } from './accordion.component';

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

> Tabler components ไม่มี dependency ภายนอก (ไม่มี TranslateService, Router ฯลฯ) ดังนั้นไม่ต้องมี providers หรือ imports เพิ่ม

---

## 7. ข้อปฏิบัติ

| หัวข้อ | ข้อกำหนด |
|---|---|
| **ทุกไฟล์** | ต้องมี `should create` อย่างน้อย 1 test |
| **async/await** | ใช้ `async` + `compileComponents()` ทุกครั้ง |
| **beforeAll vs beforeEach** | ใช้ `beforeEach` เสมอ (ไม่ใช้ `beforeAll`) |
| **HTTP** | ใช้ `HttpClientTestingModule` + `HttpTestingController` |
| **Router** | ใช้ `RouterTestingModule` ถ้ามี RouterLink หรือ route logic |
| **Spy ภาษาไทย** | ใช้ `spyOn` เสมอ ไม่ใช้ `jasmine.createSpy` (deprecated) |
| **Pure class** | Instantiate โดยตรง ไม่ต้องใช้ TestBed |
| **Inline mock** | ใช้ object literal สำหรับ mock ที่ไม่ซับซ้อน |
| **Coverage** | เน้นที่ business logic (service, use case, pipe) |
| **命名** | ชื่อ describe = ชื่อ class, ข้อความ it = ภาษาไทยหรืออังกฤษก็ได้ |
| **NO_ERRORS_SCHEMA** | ใช้เฉพาะกรณี layout component ที่มี child components เยอะ |
| **เทสใหม่อ้างอิงเก่า** | ดู spec ของ `customer-list`, `toast`, `sidebar`, `primary-button` เป็นตัวอย่าง |
