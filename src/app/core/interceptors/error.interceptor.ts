import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  // Inject Injector แทน TranslateService โดยตรง
  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorKey = 'errors.unknown';
        let errorMessage = 'An unknown error occurred';

        if (error.error instanceof ErrorEvent) {
          errorKey = 'errors.client';
          errorMessage = 'Client error';
        } else {
          switch (error.status) {
            case 400:
              errorKey = 'errors.400';
              errorMessage = 'Invalid data';
              break;
            case 401:
              errorKey = 'errors.401';
              errorMessage = 'Please login again';
              break;
            case 403:
              errorKey = 'errors.403';
              errorMessage = 'You do not have permission to access this data';
              break;
            case 404:
              errorKey = 'errors.404';
              errorMessage = 'Data not found';
              break;
            case 409:
              errorKey = 'errors.409';
              errorMessage = 'Duplicate data';
              break;
            case 422:
              errorKey = 'errors.422';
              errorMessage = 'Invalid data, please check again';
              break;
            case 429:
              errorKey = 'errors.429';
              errorMessage = 'Too many requests, please wait';
              break;
            case 500:
              errorKey = 'errors.500';
              errorMessage = 'Server error, please try again later';
              break;
            case 503:
              errorKey = 'errors.503';
              errorMessage = 'System is under maintenance, please try again later';
              break;
            case 504:
              errorKey = 'errors.504';
              errorMessage = 'Gateway Timeout';
              break;
            default:
              errorKey = 'errors.unknown';
              errorMessage = 'An unknown error occurred';
          }
        }

        // ถ้าเซิร์ฟเวอร์ส่ง message/msg มาเอง ให้ใช้ข้อความนั้นทันที
        const errBody = error.error as
          | { message?: string; msg?: string; error?: { msg?: string } }
          | null;
        const serverMessage = errBody?.message || errBody?.error?.msg || errBody?.msg;
        if (serverMessage) {
          return throwError(() => ({
            status: error.status,
            message: serverMessage,
          }));
        }

        // เรียกใช้ TranslateService แบบ Lazy ผ่าน Injector
        const translate = this.injector.get(TranslateService);
        // alert(`HTTP Error ${error.status}: ${errorMessage}`);
        // alert(`HTTP Error ${error.status}: ${translate.instant(errorKey) || errorMessage}`);
        return translate.get(errorKey).pipe(
          take(1),
          switchMap((translated: string) => {
            const finalMessage = translated || errorMessage;
            console.error(`HTTP Error ${error.status}: ${finalMessage}`);
            return throwError(() => ({
              status: error.status,
              message: finalMessage,
            }));
          }),
          catchError(() => {
            console.error(`HTTP Error ${error.status}: ${errorMessage}`);
            return throwError(() => ({
              status: error.status,
              message: errorMessage,
            }));
          })
        );
      })
    );
  }
}
