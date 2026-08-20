import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, timer, of, Subscription } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { APP_CONFIG, AppConfig, ApiEndpointConfig } from '../config/app.config';

export interface EndpointHealth {
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
  private healthCheckSubscription$?: Subscription;

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) {
    this.initializeEndpoints();
    if (this.config.apiFallback.enabled) {
      this.startHealthChecks();
    }
  }

  private initializeEndpoints(): void {
    const endpoints = this.config.apiEndpoints || [];
    this.endpoints = [...endpoints]
      .sort((a, b) => a.priority - b.priority)
      .map(endpoint => ({
        endpoint,
        isHealthy: true,
        failureCount: 0,
        lastChecked: new Date(),
      }));

    if (this.endpoints.length > 0) {
      this.activeEndpoint$.next(this.endpoints[0].endpoint);
    }
  }

  private startHealthChecks(): void {
    const interval = Math.max(this.config.apiFallback.healthCheckInterval, 5000);

    this.healthCheckSubscription$ = timer(0, interval).subscribe(() => {
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
      const currentActive = this.activeEndpoint$.value;
      const newActive = healthyEndpoints[0].endpoint;

      if (!currentActive || currentActive.url !== newActive.url) {
        console.log(`[ApiFallbackService] Switching to: ${newActive.name} (${newActive.url})`);
        this.activeEndpoint$.next(newActive);
      }
    } else {
      console.warn('[ApiFallbackService] No healthy endpoints available');
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
        console.warn(`[ApiFallbackService] Endpoint marked unhealthy: ${health.endpoint.name}`);
        this.updateActiveEndpoint();
      }
    }
  }

  reportSuccess(endpointUrl: string): void {
    const health = this.endpoints.find(h => h.endpoint.url === endpointUrl);
    if (health) {
      health.failureCount = 0;
      health.isHealthy = true;
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

  checkNow(): void {
    this.checkAllEndpointsHealth();
  }
}
