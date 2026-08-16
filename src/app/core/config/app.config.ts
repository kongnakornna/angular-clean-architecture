import { InjectionToken } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface LoggerConfig {
  enabled: boolean;
  level: LogLevel;
  format: LogFormat;
  prefix: string;
  showTimestamp: boolean;
  showLevel: boolean;
  showContext: boolean;
  colorsEnabled: boolean;
  maxMessageLength: number;
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'off';
export type LogFormat = 'console' | 'pretty' | 'json';

export interface AppConfig {
  appName: string;
  version: string;
  apiBaseUrl: string;
  apiTargetUrl: string;
  useProxy: boolean;
  production: boolean;
  defaultLanguage: string;
  pageSize: number;
  logger: LoggerConfig;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
export const LOGGER_CONFIG = new InjectionToken<LoggerConfig>('logger.config');

export const DEFAULT_LOGGER_CONFIG: LoggerConfig = {
  enabled: true,
  level: 'debug',
  format: 'pretty',
  prefix: '[iCmon]',
  showTimestamp: true,
  showLevel: true,
  showContext: true,
  colorsEnabled: true,
  maxMessageLength: 10000,
};

export const DEFAULT_APP_CONFIG: AppConfig = {
  appName: 'iCmon',
  version: '1.0.0',
  apiBaseUrl: environment.useProxy ? '/api' : `${environment.apiTargetUrl}/api`,
  apiTargetUrl: environment.apiTargetUrl,
  useProxy: environment.useProxy,
  production: environment.production,
  defaultLanguage: 'en',
  pageSize: 10,
  logger: {
    ...DEFAULT_LOGGER_CONFIG,
    ...environment.logger,
  },
};
