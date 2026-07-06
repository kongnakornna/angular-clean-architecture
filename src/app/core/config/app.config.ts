import { InjectionToken } from '@angular/core';

export interface AppConfig {
  appName: string;
  version: string;
  apiBaseUrl: string;
  production: boolean;
  defaultLanguage: string;
  pageSize: number;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const DEFAULT_APP_CONFIG: AppConfig = {
  appName: 'BizAdmin',
  version: '1.0.0',
  apiBaseUrl: '/api',
  production: false,
  defaultLanguage: 'th',
  pageSize: 10,
};
