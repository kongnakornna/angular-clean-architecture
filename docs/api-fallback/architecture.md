# Architecture & Design

> สถาปัตยกรรมและการออกแบบ Multi-API Fallback System  
> *Last updated: 2026-08-20 | Version: 1.0.0*

---

## สารบัญ

1. [ภาพรวมสถาปัตยกรรม](#ภาพรวมสถาปัตยกรรม)
2. [Component Diagram](#component-diagram)
3. [Data Flow](#data-flow)
4. [Core Components](#core-components)
5. [Interceptor Chain](#interceptor-chain)
6. [Health Check System](#health-check-system)
7. [State Management](#state-management)
8. [Error Handling Flow](#error-handling-flow)
9. [Design Patterns](#design-patterns)

---

## ภาพรวมสถาปัตยกรรม

ระบบ Multi-API Fallback ใช้สถาปัตยกรรมแบบ Layered ตาม Clean Architecture ของโปรเจค โดยมีส่วนประกอบหลักดังนี้:

1. **Configuration Layer**: กำหนด API endpoints และ fallback settings
2. **Service Layer**: จัดการ health checking และ endpoint selection
3. **Interceptor Layer**: จัดการ retry และ URL replacement
4. **DataSource Layer**: ใช้ active endpoint ในการ making HTTP calls

---

## Component Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Angular Application                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │ Environment │───▶│  App Config │───▶│  APP_CONFIG │         │
│  │   Files     │    │  (Token)    │    │   (DI)      │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
│                           │                                      │
│                           ▼                                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  ApiFallbackService                       │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │   │
│  │  │  Endpoints  │  │   Health    │  │   Active    │     │   │
│  │  │   Registry  │  │   Tracker   │  │   Endpoint  │     │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           │                                      │
│                           ▼                                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   Interceptor Chain                       │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐│   │
│  │  │ Fallback │─▶│   Auth   │─▶│  API     │─▶│  Error   ││   │
│  │  │Interceptor│  │Interceptor│  │Response  │  │Interceptor││   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘│   │
│  └─────────────────────────────────────────────────────────┘   │
│                           │                                      │
│                           ▼                                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    DataSource Layer                       │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐│   │
│  │  │   Auth   │  │Dashboard │  │   IoT    │  │   ...    ││   │
│  │  │DataSource│  │DataSource│  │DataSource│  │DataSource││   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘│   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Backend APIs                                │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐│
│  │   Primary API   │  │  Secondary API  │  │   Backup API    ││
│  │  (localhost:5000)│  │ (localhost:3003)│  │(backup.example) ││
│  └─────────────────┘  └─────────────────┘  └─────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### 1. Normal Request Flow

```
Component
    │
    ▼
DataSource (e.g., AuthApiDataSource)
    │
    ▼
HttpClient.get(url)
    │
    ▼
FallbackInterceptor.intercept()
    │
    ▼
AuthInterceptor.intercept()
    │
    ▼
ApiResponseInterceptor.intercept()
    │
    ▼
ErrorInterceptor.intercept()
    │
    ▼
HTTP Request to Active Endpoint
    │
    ▼
Backend Response
    │
    ▼
Interceptor Chain (reverse)
    │
    ▼
Component receives response
```

### 2. Failover Flow

```
Component
    │
    ▼
DataSource
    │
    ▼
HttpClient.get(url)
    │
    ▼
FallbackInterceptor.intercept()
    │
    ▼
HTTP Request to Endpoint A
    │
    ▼
[ERROR: Connection failed / Status 0 / 503 / 504]
    │
    ▼
FallbackInterceptor catches error
    │
    ▼
ApiFallbackService.reportFailure(endpointA)
    │
    ▼
ApiFallbackService.getActiveEndpoint()
    │
    ▼
[Returns Endpoint B]
    │
    ▼
Rebuild URL with Endpoint B
    │
    ▼
Retry HTTP Request to Endpoint B
    │
    ▼
Success Response
    │
    ▼
Component receives response
```

### 3. Health Check Flow

```
ApiFallbackService
    │
    ▼
Timer (every 30s)
    │
    ▼
checkAllEndpointsHealth()
    │
    ▼
For each endpoint:
    │
    ▼
HTTP GET /api/health
    │
    ├───[200 OK]───▶ Mark as Healthy
    │
    └───[Error]────▶ Increment failure count
                        │
                        ▼
                   [failureCount >= threshold]
                        │
                        ▼
                   Mark as Unhealthy
                        │
                        ▼
                   Update Active Endpoint
```

---

## Core Components

### 1. ApiEndpointConfig

Interface สำหรับกำหนด API endpoint

```typescript
interface ApiEndpointConfig {
  url: string;      // Base URL
  name: string;     // Display name
  priority: number; // Priority (1 = highest)
}
```

### 2. ApiFallbackConfig

Interface สำหรับ fallback settings

```typescript
interface ApiFallbackConfig {
  enabled: boolean;
  maxRetries: number;
  retryDelay: number;
  healthCheckInterval: number;
  failureThreshold: number;
}
```

### 3. EndpointHealth

Interface สำหรับเก็บ health status ของ endpoint

```typescript
interface EndpointHealth {
  endpoint: ApiEndpointConfig;
  isHealthy: boolean;
  failureCount: number;
  lastChecked: Date;
  lastFailure?: Date;
}
```

---

## Interceptor Chain

### ลำดับ Interceptor

```
Request ──▶ FallbackInterceptor
              │
              ▼
           AuthInterceptor
              │
              ▼
           ApiResponseInterceptor
              │
              ▼
           ErrorInterceptor
              │
              ▼
           Backend API
```

### ลำดับ Response

```
Backend API
    │
    ▼
ErrorInterceptor
    │
    ▼
ApiResponseInterceptor
    │
    ▼
AuthInterceptor
    │
    ▼
FallbackInterceptor
    │
    ▼
Component
```

### FallbackInterceptor

- **Position**: First interceptor (outermost)
- **Responsibility**: Catch connection failures and retry with next endpoint
- **Retryable Statuses**: 0 (connection failed), 503, 504

### AuthInterceptor

- **Position**: Second interceptor
- **Responsibility**: Attach Bearer token, handle 401 with token refresh
- **Special**: Uses `ApiFallbackService` for refresh token URL

### ApiResponseInterceptor

- **Position**: Third interceptor
- **Responsibility**: Unwrap API response envelope `{ is_success, data, error }`

### ErrorInterceptor

- **Position**: Fourth interceptor (innermost)
- **Responsibility**: Map HTTP errors to user-friendly messages

---

## Health Check System

### Architecture

```
┌─────────────────────────────────────────┐
│           ApiFallbackService             │
│                                          │
│  ┌─────────────────────────────────┐   │
│  │       Health Check Timer         │   │
│  │  (every healthCheckInterval)     │   │
│  └─────────────────────────────────┘   │
│              │                           │
│              ▼                           │
│  ┌─────────────────────────────────┐   │
│  │    checkAllEndpointsHealth()     │   │
│  └─────────────────────────────────┘   │
│              │                           │
│              ▼                           │
│  ┌─────────────────────────────────┐   │
│  │    checkEndpointHealth()         │   │
│  │  GET /api/health for each        │   │
│  └─────────────────────────────────┘   │
│              │                           │
│              ▼                           │
│  ┌─────────────────────────────────┐   │
│  │    updateActiveEndpoint()        │   │
│  │  Select highest priority healthy │   │
│  └─────────────────────────────────┘   │
│                                          │
└─────────────────────────────────────────┘
```

### Health Check Endpoint

Backend ต้อง implement endpoint:

```
GET /api/health

Response 200:
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z"
}

Response 503:
{
  "status": "unhealthy",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Health Status Updates

```typescript
// สำเร็จ
health.isHealthy = true;
health.failureCount = 0;

// ล้มเหลว
health.failureCount++;
health.lastFailure = new Date();
if (health.failureCount >= failureThreshold) {
  health.isHealthy = false;
}
```

---

## State Management

### BehaviorSubject

ใช้ `BehaviorSubject` สำหรับ reactive state:

```typescript
private activeEndpoint$ = new BehaviorSubject<ApiEndpointConfig | null>(null);

// Subscribe
this.fallbackService.getActiveEndpoint().subscribe(endpoint => {
  // Use endpoint
});

// Get current value
const current = this.activeEndpoint$.value;
```

### State Transitions

```
Initial State:
  activeEndpoint = endpoints[0] (highest priority)
  allEndpoints healthy

After Failure:
  activeEndpoint = endpoints[1] (next priority)
  endpoints[0] marked unhealthy

After Recovery:
  activeEndpoint = endpoints[0] (back to highest priority)
  endpoints[0] marked healthy
```

---

## Error Handling Flow

### Connection Failure (Status 0)

```
Request fails with status 0
    │
    ▼
FallbackInterceptor catches
    │
    ▼
shouldRetry(error) returns true
    │
    ▼
handleRetry() called
    │
    ▼
reportFailure(currentEndpoint)
    │
    ▼
getActiveEndpoint() returns next endpoint
    │
    ▼
Rebuild URL with new endpoint
    │
    ▼
Retry request
    │
    ▼
[If still fails] Repeat up to maxRetries
    │
    ▼
[If all retries fail] Throw error to ErrorInterceptor
```

### Server Error (Status 500)

```
Request fails with status 500
    │
    ▼
FallbackInterceptor catches
    │
    ▼
shouldRetry(error) returns false
    │
    ▼
Throw error to ErrorInterceptor
    │
    ▼
ErrorInterceptor maps to user message
```

### Auth Error (Status 401)

```
Request fails with status 401
    │
    ▼
FallbackInterceptor catches
    │
    ▼
shouldRetry(error) returns false
    │
    ▼
Throw error to AuthInterceptor
    │
    ▼
AuthInterceptor handles token refresh
```

---

## Design Patterns

### 1. Circuit Breaker Pattern

ระบบใช้ Circuit Breaker pattern แบบง่าย:

- **Closed State**: Normal operation, request goes through
- **Open State**: Endpoint marked unhealthy, skip this endpoint
- **Half-Open State**: Health check periodically to see if endpoint recovers

### 2. Strategy Pattern

ใช้ Strategy pattern สำหรับ endpoint selection:

```typescript
// กลยุทธ์: เลือก endpoint ที่มี priority ต่ำสุด (สำคัญที่สุด) ที่ healthy
private updateActiveEndpoint(): void {
  const healthyEndpoints = this.endpoints
    .filter(h => h.isHealthy)
    .sort((a, b) => a.endpoint.priority - b.endpoint.priority);
  
  if (healthyEndpoints.length > 0) {
    this.activeEndpoint$.next(healthyEndpoints[0].endpoint);
  }
}
```

### 3. Observer Pattern

ใช้ RxJS BehaviorSubject สำหรับ state management:

```typescript
// Publisher
private activeEndpoint$ = new BehaviorSubject<ApiEndpointConfig | null>(null);

// Subscriber
this.fallbackService.getActiveEndpoint().subscribe(endpoint => {
  this.activeEndpoint = endpoint;
});
```

### 4. Chain of Responsibility

ใช้ Interceptor chain สำหรับ request/response processing:

```
Request → Fallback → Auth → ApiResponse → Error → Backend
Backend → Error → ApiResponse → Auth → Fallback → Component
```

---

## Architecture Decisions

### 1. Why Interceptor?

- **Centralized**: จัดการ retry logic จุดเดียว
- **Transparent**: DataSource ไม่ต้องแก้ไขมาก
- **Composable**: ทำงานร่วมกับ interceptors อื่นๆ ได้

### 2. Why Environment Files?

- **Build-time**: ไม่ต้องเพิ่ม runtime overhead
- **Secure**: API URLs ไม่暴露ใน production build
- **Simple**: ไม่ต้องมี额外 infrastructure

### 3. Why Health Check?

- **Proactive**: ตรวจสอบก่อนเกิดปัญหา
- **Accurate**: รู้สถานะจริงของ endpoints
- **Automatic**: ไม่ต้อง manual intervention

---

**ถัดไป:** [รายละเอียดการ implement](./implementation.md)
