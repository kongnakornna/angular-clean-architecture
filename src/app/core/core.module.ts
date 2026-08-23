import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ApiResponseInterceptor } from './interceptors/api-response.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { FallbackInterceptor } from './interceptors/fallback.interceptor';
import { CONFIG_PROVIDERS, REPOSITORY_PROVIDERS } from './di/providers';

@NgModule({
  imports: [CommonModule],
  providers: [
    ...CONFIG_PROVIDERS,
    ...REPOSITORY_PROVIDERS,
    { provide: HTTP_INTERCEPTORS, useClass: FallbackInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiResponseInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class CoreModule {}
