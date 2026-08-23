import { Injectable } from '@angular/core';
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
  private retryQueue = new Map<string, number>();
  private readonly RETRYABLE_STATUSES = [0, 503, 504];
  private readonly MAX_RETRIES = 2;

  constructor(private fallbackService: ApiFallbackService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.includes('/health') || req.url.includes('/api/health')) {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (this.shouldRetry(error)) {
          return this.handleRetry(req, next, error);
        }
        return throwError(() => error);
      })
    );
  }

  private shouldRetry(error: HttpErrorResponse): boolean {
    return this.RETRYABLE_STATUSES.includes(error.status);
  }

  private handleRetry(
    req: HttpRequest<unknown>,
    next: HttpHandler,
    originalError: HttpErrorResponse
  ): Observable<HttpEvent<unknown>> {
    const requestKey = this.getRequestKey(req);
    const retryCount = this.retryQueue.get(requestKey) || 0;

    if (retryCount >= this.MAX_RETRIES) {
      this.retryQueue.delete(requestKey);
      return throwError(() => originalError);
    }

    this.retryQueue.set(requestKey, retryCount + 1);

    const currentUrl = this.extractBaseUrl(req.url);
    if (currentUrl) {
      this.fallbackService.reportFailure(currentUrl);
    }

    return this.fallbackService.getActiveEndpoint().pipe(
      mergeMap(endpoint => {
        if (!endpoint) {
          return throwError(() => new Error('No available API endpoints'));
        }

        const newUrl = this.rebuildUrl(req.url, endpoint.url);
        if (!newUrl) {
          return throwError(() => originalError);
        }

        const newReq = req.clone({ url: newUrl });

        return timer(this.fallbackService['config']?.apiFallback?.retryDelay || 1000).pipe(
          switchMap(() => next.handle(newReq))
        );
      })
    );
  }

  private getRequestKey(req: HttpRequest<unknown>): string {
    return `${req.method}:${req.url}`;
  }

  private extractBaseUrl(url: string): string {
    try {
      const parsed = new URL(url);
      return `${parsed.protocol}//${parsed.host}`;
    } catch {
      return '';
    }
  }

  private rebuildUrl(originalUrl: string, newBaseUrl: string): string | null {
    try {
      const parsed = new URL(originalUrl);
      const newParsed = new URL(newBaseUrl);
      return `${newParsed.protocol}//${newParsed.host}${parsed.pathname}${parsed.search}`;
    } catch {
      return null;
    }
  }
}
