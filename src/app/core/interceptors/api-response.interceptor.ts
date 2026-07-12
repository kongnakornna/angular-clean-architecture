import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable()
export class ApiResponseInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse && event.body && typeof event.body === 'object' && 'is_success' in event.body) {
          const apiResponse = event.body as { is_success: boolean; data: unknown; error?: { status: number; statusText: string; msg: string } };
          if (apiResponse.is_success) {
            return event.clone({ body: apiResponse.data });
          }
          throw new HttpErrorResponse({
            status: apiResponse.error?.status || 500,
            statusText: apiResponse.error?.statusText || 'Unknown error',
            error: apiResponse.error,
          });
        }
        return event;
      })
    );
  }
}
