# Multi-API Fallback System - Implementation Plan

## Overview

Implement a configurable multi-API fallback system that allows the application to automatically switch to alternative API endpoints when the primary endpoint fails or is unreachable. The system should be configurable through environment files and support adding new endpoints in the future.

## Current State Analysis

### Architecture
- Angular 21.x with Clean Architecture (Domain-Driven Design)
- State management: `@ngrx/component-store`
- HTTP interceptors: Auth → ApiResponse → Error
- Configuration: `environment.ts` → `app.config.ts` → `APP_CONFIG` token

### API URL Patterns (3 inconsistent patterns)
1. **Pattern A** (Most datasources): Uses `APP_CONFIG.apiBaseUrl`
2. **Pattern B** (Customer, JobCard, etc.): Uses bare `API_ENDPOINTS` paths (relies on proxy)
3. **Pattern C** (AI Chatbot): Uses `environment` directly

### Key Files
- `src/environments/environment.ts` - Dev environment config
- `src/environments/environment.prod.ts` - Production environment config
- `src/app/core/config/app.config.ts` - App configuration interface
- `src/app/core/interceptors/error.interceptor.ts` - Error handling interceptor
- `src/app/core/core.module.ts` - Interceptor registration
- `proxy.conf.json` - Dev server proxy configuration

## Implementation Plan

### Phase 1: Configuration Layer

#### 1.1 Update Environment Configuration
**File:** `src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  demo: false,
  useProxy: false, // Disable proxy for multi-API to work
  apiTargetUrl: 'http://localhost:5000', // Keep for backward compatibility
  apiEndpoints: [
    { url: 'http://localhost:5000', name: 'Primary', priority: 1 },
    { url: 'http://localhost:3003', name: 'Secondary', priority: 2 },
  ],
  apiFallback: {
    enabled: true,
    maxRetries: 2,
    retryDelay: 1000, // ms
    healthCheckInterval: 30000, // ms
    failureThreshold: 3, // failures before marking as unhealthy
  },
  logger: { ... },
  ollamaUrl: 'http://localhost:11434',
  ollamaModel: 'llama3',
  chatbotEnabled: true,
};
```

#### 1.2 Update Production Environment
**File:** `src/environments/environment.prod.ts`

```typescript
export const environment = {
  production: true,
  demo: false,
  useProxy: false,
  apiTargetUrl: 'http://localhost:5000',
  apiEndpoints: [
    { url: 'http://localhost:5000', name: 'Primary', priority: 1 },
    { url: 'http://localhost:3003', name: 'Secondary', priority: 2 },
  ],
  apiFallback: {
    enabled: true,
    maxRetries: 2,
    retryDelay: 1000,
    healthCheckInterval: 30000,
    failureThreshold: 3,
  },
  logger: { ... },
  ollamaUrl: 'http://localhost:11434',
  ollamaModel: 'llama3',
  chatbotEnabled: true,
};
```

#### 1.3 Update AppConfig Interface
**File:** `src/app/core/config/app.config.ts`

Add new interfaces and update DEFAULT_APP_CONFIG:

```typescript
export interface ApiEndpointConfig {
  url: string;
  name: string;
  priority: number;
}

export interface ApiFallbackConfig {
  enabled: boolean;
  maxRetries: number;
  retryDelay: number;
  healthCheckInterval: number;
  failureThreshold: number;
}

export interface AppConfig {
  appName: string;
  version: string;
  apiBaseUrl: string;
  apiTargetUrl: string;
  apiEndpoints: ApiEndpointConfig[];
  apiFallback: ApiFallbackConfig;
  useProxy: boolean;
  production: boolean;
  defaultLanguage: string;
  pageSize: number;
  logger: LoggerConfig;
  ollamaUrl: string;
  ollamaModel: string;
  chatbotEnabled: boolean;
}

export const DEFAULT_APP_CONFIG: AppConfig = {
  // ... existing config ...
  apiEndpoints: environment.apiEndpoints || [
    { url: environment.apiTargetUrl, name: 'Default', priority: 1 },
  ],
  apiFallback: environment.apiFallback || {
    enabled: false,
    maxRetries: 2,
    retryDelay: 1000,
    healthCheckInterval: 30000,
    failureThreshold: 3,
  },
};
```

### Phase 2: Core Services

#### 2.1 Create ApiFallbackService
**File:** `src/app/core/services/api-fallback.service.ts` (NEW)

This service manages the list of API endpoints, tracks their health status, and provides the current active URL.

```typescript
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, timer, of } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { APP_CONFIG, AppConfig, ApiEndpointConfig } from '../config/app.config';

interface EndpointHealth {
  endpoint: ApiEndpointConfig;
  isHealthy: boolean;
  failureCount: number;
  lastChecked: Date;
  lastFailure?: Date;
}

@Injectable({ providedIn: 'root' })
export class ApiFallbackService {
  private endpoints: EndpointHealth[] = [];
  private activeEndpoint$ = new BehaviorSubject<ApiEndpointConfig | null>(null);
  private healthCheckTimer$ = new BehaviorSubject<void>(undefined);

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) {
    this.initializeEndpoints();
    this.startHealthChecks();
  }

  private initializeEndpoints(): void {
    this.endpoints = (this.config.apiEndpoints || [])
      .sort((a, b) => a.priority - b.priority)
      .map(endpoint => ({
        endpoint,
        isHealthy: true,
        failureCount: 0,
        lastChecked: new Date(),
      }));

    // Set initial active endpoint (highest priority = lowest number)
    if (this.endpoints.length > 0) {
      this.activeEndpoint$.next(this.endpoints[0].endpoint);
    }
  }

  private startHealthChecks(): void {
    if (!this.config.apiFallback.enabled) return;

    this.healthCheckTimer$.pipe(
      switchMap(() => timer(0, this.config.apiFallback.healthCheckInterval))
    ).subscribe(() => {
      this.checkAllEndpointsHealth();
    });
  }

  private checkAllEndpointsHealth(): void {
    this.endpoints.forEach(health => {
      this.checkEndpointHealth(health).subscribe();
    });
  }

  private checkEndpointHealth(health: EndpointHealth): Observable<boolean> {
    const healthUrl = `${health.endpoint.url}/api/health`;
    return this.http.get(healthUrl, { timeout: 5000 }).pipe(
      map(() => true),
      catchError(() => of(false)),
      tap(isHealthy => {
        health.isHealthy = isHealthy;
        health.lastChecked = new Date();
        if (!isHealthy) {
          health.failureCount++;
          health.lastFailure = new Date();
        } else {
          health.failureCount = 0;
        }
        this.updateActiveEndpoint();
      })
    );
  }

  private updateActiveEndpoint(): void {
    const healthyEndpoints = this.endpoints
      .filter(h => h.isHealthy)
      .sort((a, b) => a.endpoint.priority - b.endpoint.priority);

    if (healthyEndpoints.length > 0) {
      this.activeEndpoint$.next(healthyEndpoints[0].endpoint);
    }
  }

  getActiveEndpoint(): Observable<ApiEndpointConfig | null> {
    return this.activeEndpoint$.asObservable();
  }

  getActiveBaseUrl(): string {
    const endpoint = this.activeEndpoint$.value;
    return endpoint ? `${endpoint.url}/api` : '/api';
  }

  reportFailure(endpointUrl: string): void {
    const health = this.endpoints.find(h => h.endpoint.url === endpointUrl);
    if (health) {
      health.failureCount++;
      health.lastFailure = new Date();
      if (health.failureCount >= this.config.apiFallback.failureThreshold) {
        health.isHealthy = false;
        this.updateActiveEndpoint();
      }
    }
  }

  reportSuccess(endpointUrl: string): void {
    const health = this.endpoints.find(h => h.endpoint.url === endpointUrl);
    if (health) {
      health.failureCount = 0;
      health.isHealthy = true;
      this.updateActiveEndpoint();
    }
  }

  getEndpointsHealth(): EndpointHealth[] {
    return [...this.endpoints];
  }

  addEndpoint(endpoint: ApiEndpointConfig): void {
    const exists = this.endpoints.some(h => h.endpoint.url === endpoint.url);
    if (!exists) {
      this.endpoints.push({
        endpoint,
        isHealthy: true,
        failureCount: 0,
        lastChecked: new Date(),
      });
      this.updateActiveEndpoint();
    }
  }

  removeEndpoint(url: string): void {
    this.endpoints = this.endpoints.filter(h => h.endpoint.url !== url);
    this.updateActiveEndpoint();
  }
}
```

#### 2.2 Create FallbackInterceptor
**File:** `src/app/core/interceptors/fallback.interceptor.ts` (NEW)

This interceptor catches connection failures and retries with the next API endpoint.

```typescript
import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, switchMap, mergeMap } from 'rxjs/operators';
import { ApiFallbackService } from '../services/api-fallback.service';

@Injectable()
export class FallbackInterceptor implements HttpInterceptor {
  private retryQueue: Map<string, number> = new Map();

  constructor(private fallbackService: ApiFallbackService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Skip interceptor for health check endpoints
    if (req.url.includes('/health')) {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Only retry on connection failures (status 0, 503, 504)
        if (this.shouldRetry(error)) {
          return this.handleRetry(req, next, error);
        }
        return throwError(() => error);
      })
    );
  }

  private shouldRetry(error: HttpErrorResponse): boolean {
    const retryableStatuses = [0, 503, 504];
    return retryableStatuses.includes(error.status);
  }

  private handleRetry(
    req: HttpRequest<unknown>,
    next: HttpHandler,
    originalError: HttpErrorResponse
  ): Observable<HttpEvent<unknown>> {
    const requestKey = this.getRequestKey(req);
    const retryCount = this.retryQueue.get(requestKey) || 0;
    const maxRetries = 2; // Can be made configurable

    if (retryCount >= maxRetries) {
      this.retryQueue.delete(requestKey);
      return throwError(() => originalError);
    }

    this.retryQueue.set(requestKey, retryCount + 1);

    // Report failure for current endpoint
    const currentUrl = this.extractBaseUrl(req.url);
    this.fallbackService.reportFailure(currentUrl);

    // Get next endpoint and retry
    return this.fallbackService.getActiveEndpoint().pipe(
      mergeMap(endpoint => {
        if (!endpoint) {
          return throwError(() => new Error('No available API endpoints'));
        }

        // Rebuild URL with new base
        const newUrl = this.rebuildUrl(req.url, endpoint.url);
        const newReq = req.clone({ url: newUrl });

        // Add delay before retry
        return timer(1000).pipe(
          switchMap(() => next.handle(newReq))
        );
      })
    );
  }

  private getRequestKey(req: HttpRequest<unknown>): string {
    return `${req.method}:${req.url}`;
  }

  private extractBaseUrl(url: string): string {
    // Extract base URL from full URL
    try {
      const parsed = new URL(url);
      return `${parsed.protocol}//${parsed.host}`;
    } catch {
      return '';
    }
  }

  private rebuildUrl(originalUrl: string, newBaseUrl: string): string {
    try {
      const parsed = new URL(originalUrl);
      const newParsed = new URL(newBaseUrl);
      return `${newParsed.protocol}//${newParsed.host}${parsed.pathname}${parsed.search}`;
    } catch {
      return originalUrl;
    }
  }
}
```

### Phase 3: Integration

#### 3.1 Register FallbackInterceptor
**File:** `src/app/core/core.module.ts`

```typescript
import { FallbackInterceptor } from './interceptors/fallback.interceptor';

@NgModule({
  imports: [CommonModule],
  providers: [
    ...CONFIG_PROVIDERS,
    ...REPOSITORY_PROVIDERS,
    { provide: HTTP_INTERCEPTORS, useClass: FallbackInterceptor, multi: true }, // Add first
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiResponseInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class CoreModule {}
```

#### 3.2 Update Datasources to Use FallbackService
**Pattern A datasources** (already using `APP_CONFIG.apiBaseUrl`):
- Modify to inject `ApiFallbackService` and use `getActiveBaseUrl()` instead of `config.apiBaseUrl`

**Example:** `src/app/features/auth/data/datasources/auth.api.datasource.ts`

```typescript
import { ApiFallbackService } from '../../../../core/services/api-fallback.service';

@Injectable({ providedIn: 'root' })
export class AuthApiDataSource {
  private readonly http = inject(HttpClient);
  private readonly fallbackService = inject(ApiFallbackService);
  private readonly config = inject(APP_CONFIG);
  private readonly httpBackend = inject(HttpBackend);
  private readonly httpWithoutInterceptor = new HttpClient(this.httpBackend);

  private get baseUrl(): string {
    return this.fallbackService.getActiveBaseUrl();
  }
  // ... rest of the code
}
```

**Pattern B datasources** (using bare `API_ENDPOINTS`):
- Modify to inject `ApiFallbackService` and prepend `getActiveBaseUrl()`

**Example:** `src/app/features/customer/data/datasources/customer.api.datasource.ts`

```typescript
import { inject } from '@angular/core';
import { ApiFallbackService } from '../../../../core/services/api-fallback.service';

@Injectable({ providedIn: 'root' })
export class CustomerApiDataSource {
  private http = inject(HttpClient);
  private fallbackService = inject(ApiFallbackService);

  private endpoint(path: string): string {
    return `${this.fallbackService.getActiveBaseUrl()}${path}`;
  }

  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<...> {
    // ...
    return this.http.get<{ data: any[]; total: number }>(this.endpoint(API_ENDPOINTS.customers.list), { params: httpParams });
  }
  // ... rest of the code
}
```

#### 3.3 Update AuthInterceptor
**File:** `src/app/core/interceptors/auth.interceptor.ts`

The refresh token logic needs to use the fallback service:

```typescript
import { ApiFallbackService } from '../services/api-fallback.service';

constructor(
  private http: HttpClient,
  @Inject(APP_CONFIG) private config: AppConfig,
  private fallbackService: ApiFallbackService
) {}

private refreshToken(refreshToken: string): Observable<string> {
  const baseUrl = this.fallbackService.getActiveBaseUrl();
  return this.http.post<LoginResponseDto>(
    `${baseUrl}${API_ENDPOINTS.auth.refresh}`,
    { refreshToken }
  ).pipe(
    map((response) => {
      if (response.refreshToken) {
        localStorage.setItem(APP_CONSTANTS.REFRESH_TOKEN_KEY, response.refreshToken);
      }
      return response.accessToken;
    })
  );
}
```

### Phase 4: Configuration Updates

#### 4.1 Update Angular.json for Environment Replacement
**File:** `angular.json`

Ensure environment files are properly replaced during build:

```json
"fileReplacements": [
  {
    "replace": "src/environments/environment.ts",
    "with": "src/environments/environment.prod.ts"
  }
]
```

#### 4.2 Update proxy.conf.json (Optional)
**File:** `proxy.conf.json`

If keeping proxy for development, update to support multiple targets:

```json
{
  "/api": {
    "target": "http://localhost:5000",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug",
    "bypass": function(req, res, proxyOptions) {
      // Can add custom logic here
      return null;
    }
  }
}
```

**Note:** With multi-API fallback, it's recommended to set `useProxy: false` in environment files and let the fallback service handle URL resolution directly.

### Phase 5: Testing & Validation

#### 5.1 Unit Tests
- Test `ApiFallbackService` health checking and endpoint switching
- Test `FallbackInterceptor` retry logic
- Test configuration loading from environment files

#### 5.2 Integration Tests
- Test with multiple API endpoints running
- Test failover when primary endpoint goes down
- Test recovery when primary endpoint comes back online

#### 5.3 Manual Testing Checklist
- [ ] Start with both APIs running → should use primary (localhost:5000)
- [ ] Stop primary API → should fallback to secondary (localhost:3003)
- [ ] Restart primary API → should switch back to primary
- [ ] Add new endpoint via configuration → should be recognized
- [ ] Remove endpoint → should not attempt to use it

## File Changes Summary

### New Files
1. `src/app/core/services/api-fallback.service.ts` - Fallback service
2. `src/app/core/interceptors/fallback.interceptor.ts` - Fallback interceptor
3. `src/app/features/settings/presentation/components/api-health/api-health.component.ts` - Health dashboard UI

### Modified Files
1. `src/environments/environment.ts` - Add apiEndpoints and apiFallback config
2. `src/environments/environment.prod.ts` - Add apiEndpoints and apiFallback config
3. `src/app/core/config/app.config.ts` - Update AppConfig interface
4. `src/app/core/config/menu.config.ts` - Add API Health menu item
5. `src/app/core/core.module.ts` - Register FallbackInterceptor
6. `src/app/core/interceptors/auth.interceptor.ts` - Use FallbackService for refresh token
7. `src/app/features/settings/settings.routes.ts` - Add health dashboard route
8. All datasource files (31 files) - Update to use FallbackService

## Migration Strategy

### Step 1: Add New Files (No Breaking Changes)
- Create `ApiFallbackService`
- Create `FallbackInterceptor`
- Create `ApiHealthComponent`
- Update environment files with new config (keep existing config)

### Step 2: Update Core Configuration
- Update `AppConfig` interface
- Register `FallbackInterceptor`
- Update `AuthInterceptor`
- Add health dashboard route
- Add API Health menu item

### Step 3: Update Datasources (One by One)
- Start with Pattern A datasources (already using `APP_CONFIG.apiBaseUrl`)
- Then update Pattern B datasources (add `endpoint()` helper)
- Finally update Pattern C datasources (AI Chatbot)

### Step 4: Update Environment Defaults
- Set `useProxy: false` for multi-API to work
- Add default `apiEndpoints` configuration

### Step 5: Testing & Validation
- Test each feature module
- Verify failover behavior
- Test health dashboard UI
- Document configuration options

### Phase 6: Health Dashboard UI (User Requested)

#### 6.1 Create ApiHealthComponent
**File:** `src/app/features/settings/presentation/components/api-health/api-health.component.ts` (NEW)

A component to display the health status of all API endpoints using Tabler UI (Bootstrap-based) and Tailwind CSS.

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ApiFallbackService, EndpointHealth } from '../../../../../core/services/api-fallback.service';

@Component({
  selector: 'app-api-health',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">API Health Status</h3>
        <div class="card-subtitle">
          Active: {{ activeEndpoint?.name || 'None' }}
        </div>
      </div>
      <div class="card-body">
        <div class="list-group list-group-flush">
          @for (health of endpoints; track health.endpoint.url) {
            <div class="list-group-item" [class.list-group-item-danger]="!health.isHealthy">
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                  <span class="status-indicator me-2" [class.bg-success]="health.isHealthy" [class.bg-danger]="!health.isHealthy"></span>
                  <div>
                    <div class="fw-bold">{{ health.endpoint.name }}</div>
                    <small class="text-muted">{{ health.endpoint.url }}</small>
                    <br>
                    <small class="text-muted">Priority: {{ health.endpoint.priority }}</small>
                  </div>
                </div>
                <div class="text-end">
                  @if (health.failureCount > 0) {
                    <span class="badge bg-danger">Failures: {{ health.failureCount }}</span>
                  }
                  <br>
                  <small class="text-muted">
                    Last checked: {{ health.lastChecked | date:'short' }}
                  </small>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
      <div class="card-footer">
        <button class="btn btn-primary" (click)="refreshHealth()">
          <i class="ti ti-refresh"></i> Refresh
        </button>
      </div>
    </div>
  `,
  styles: [`
    .status-indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      display: inline-block;
    }
  `]
})
export class ApiHealthComponent implements OnInit, OnDestroy {
  endpoints: EndpointHealth[] = [];
  activeEndpoint: { name: string; url: string } | null = null;
  private subscription?: Subscription;

  constructor(private fallbackService: ApiFallbackService) {}

  ngOnInit(): void {
    this.loadHealthData();
    this.subscription = this.fallbackService.getActiveEndpoint().subscribe(endpoint => {
      this.activeEndpoint = endpoint;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  loadHealthData(): void {
    this.endpoints = this.fallbackService.getEndpointsHealth();
  }

  refreshHealth(): void {
    this.loadHealthData();
  }
}
```

#### 6.2 Add Route for Health Dashboard
**File:** `src/app/features/settings/settings.routes.ts`

Add a route for the health dashboard (after the existing `api` route):

```typescript
{
  path: 'api-health',
  loadComponent: () =>
    import('./presentation/components/api-health/api-health.component').then(
      (m) => m.ApiHealthComponent
    ),
},
```

#### 6.3 Add Navigation Menu Item
**File:** `src/app/core/config/menu.config.ts`

Add a menu item for API Health under the Settings section:

```typescript
{
  label: 'Settings',
  route: '/settings',
  icon: 'settings',
  permission: 'settings.view',
  children: [
    // ... existing children
    { label: 'API', route: '/settings/api', icon: 'api', permission: 'settings.view' },
    { label: 'API Health', route: '/settings/api-health', icon: 'heart-rate-monitor', permission: 'settings.view' },
    { label: 'Token', route: '/settings/tokens', icon: 'key', permission: 'settings.view' },
  ],
},
```

## Implementation Notes

### Backend Requirements
The backend API should implement a health check endpoint at `/api/health` that returns a simple response:

```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

This endpoint should:
- Return HTTP 200 when the service is healthy
- Return HTTP 503 when the service is unhealthy
- Be lightweight and fast (no database queries)
- Be accessible without authentication

### CORS Configuration
Ensure all API endpoints allow cross-origin requests from the frontend domain:

```python
# Example for FastAPI (Python)
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

```javascript
// Example for Express (Node.js)
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:4200', 'https://your-frontend-domain.com'],
  credentials: true
}));
```

### CORS Configuration
Ensure all API endpoints allow cross-origin requests from the frontend domain:

```python
# Example for FastAPI (Python)
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

```javascript
// Example for Express (Node.js)
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:4200', 'https://your-frontend-domain.com'],
  credentials: true
}));
```

### Configuration Examples

#### Example 1: Two APIs with Different Priorities
```typescript
apiEndpoints: [
  { url: 'http://localhost:5000', name: 'Primary', priority: 1 },
  { url: 'http://localhost:3003', name: 'Secondary', priority: 2 },
]
```

#### Example 2: Three APIs with Load Balancing Ready
```typescript
apiEndpoints: [
  { url: 'http://api1.example.com', name: 'API Server 1', priority: 1 },
  { url: 'http://api2.example.com', name: 'API Server 2', priority: 2 },
  { url: 'http://api3.example.com', name: 'API Server 3', priority: 3 },
]
```

#### Example 3: Different Environments
```typescript
// development
apiEndpoints: [
  { url: 'http://localhost:5000', name: 'Local Dev', priority: 1 },
  { url: 'http://localhost:3003', name: 'Local Backup', priority: 2 },
]

// production
apiEndpoints: [
  { url: 'https://api.production.com', name: 'Production', priority: 1 },
  { url: 'https://api-backup.production.com', name: 'Production Backup', priority: 2 },
]
```

### Error Handling Flow

1. **Request initiated** → FallbackInterceptor intercepts
2. **Request fails** (status 0, 503, 504) → FallbackInterceptor catches error
3. **Report failure** → ApiFallbackService updates endpoint health
4. **Get next endpoint** → ApiFallbackService returns next healthy endpoint
5. **Retry request** → FallbackInterceptor rebuilds URL and retries
6. **If all endpoints fail** → Error is thrown to ErrorInterceptor
7. **ErrorInterceptor** → Translates error message and displays to user

### Health Check Flow

1. **Service starts** → ApiFallbackService initializes endpoints
2. **Health check timer** → Runs every `healthCheckInterval` (default: 30s)
3. **Check each endpoint** → HTTP GET to `/api/health`
4. **Update health status** → Mark endpoint as healthy/unhealthy
5. **Update active endpoint** → Switch to next healthy endpoint if needed
6. **UI updates** → ApiHealthComponent reflects current health status

### Migration Considerations

1. **Backward Compatibility**: The system maintains backward compatibility with existing `apiBaseUrl` configuration
2. **Proxy Configuration**: When using multi-API fallback, set `useProxy: false` to allow direct API calls
3. **CORS**: Ensure all API endpoints allow cross-origin requests from the frontend domain
4. **Authentication**: Token refresh logic must work with any active endpoint
5. **State Management**: Consider synchronizing state across multiple API endpoints

### Performance Considerations

1. **Health Check Overhead**: Health checks are lightweight (simple GET request)
2. **Retry Delay**: Configurable delay between retries (default: 1000ms)
3. **Failure Threshold**: Number of failures before marking endpoint as unhealthy (default: 3)
4. **Timeout**: Health check timeout (default: 5000ms)
5. **Caching**: Consider caching health status in localStorage for faster startup

### CORS Configuration
Ensure all API endpoints allow cross-origin requests from the frontend domain:

```python
# Example for FastAPI (Python)
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

```javascript
// Example for Express (Node.js)
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:4200', 'https://your-frontend-domain.com'],
  credentials: true
}));
```

### Authentication Token Refresh
When using multiple API endpoints, the token refresh logic must work with any active endpoint:

1. Token refresh requests should bypass the FallbackInterceptor (already handled)
2. The refresh token endpoint should be accessible on all API endpoints
3. Consider implementing token synchronization across endpoints

### State Synchronization
If using multiple API endpoints with different databases:

1. Consider implementing eventual consistency
2. Use event sourcing for critical operations
3. Implement conflict resolution strategies
4. Consider using a message queue for cross-endpoint synchronization

## Future Enhancements

1. **Runtime Configuration**: Load API endpoints from backend instead of environment files
2. **Automatic Recovery**: Auto-recover endpoints when they come back online
3. **Load Balancing**: Distribute requests across healthy endpoints
4. **Circuit Breaker Pattern**: Implement full circuit breaker with half-open state
5. **Metrics & Logging**: Track endpoint performance and failure rates
6. **Prometheus Metrics**: Export health metrics for monitoring
7. **Slack/Email Alerts**: Notify administrators when endpoints fail
