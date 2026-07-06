import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Client Error: ${error.error.message}`;
        } else {
          switch (error.status) {
            case 400:
              errorMessage = error.error?.message || 'ข้อมูลไม่ถูกต้อง';
              break;
            case 401:
              errorMessage = 'กรุณาเข้าสู่ระบบอีกครั้ง';
              break;
            case 403:
              errorMessage = 'คุณไม่มีสิทธิ์เข้าถึงข้อมูลนี้';
              break;
            case 404:
              errorMessage = 'ไม่พบข้อมูลที่ต้องการ';
              break;
            case 409:
              errorMessage = 'ข้อมูลซ้ำกับที่มีอยู่ในระบบ';
              break;
            case 422:
              errorMessage = 'ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง';
              break;
            case 429:
              errorMessage = 'คุณส่งคำขอมากเกินไป กรุณารอสักครู่';
              break;
            case 500:
              errorMessage = 'เซิร์ฟเวอร์เกิดข้อผิดพลาด กรุณาลองใหม่ภายหลัง';
              break;
            case 503:
              errorMessage = 'ระบบกำลังปรับปรุง กรุณาลองใหม่ภายหลัง';
              break;
          }
        }

        console.error(`HTTP Error ${error.status}: ${errorMessage}`);
        return throwError(() => ({ status: error.status, message: errorMessage }));
      })
    );
  }
}
