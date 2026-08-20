import { InjectionToken } from '@angular/core';

import { environment } from '../../../environments/environment';
import { LoggerConfig, DEFAULT_LOGGER_CONFIG } from './logger.config';

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
  ollamaUrl: string;
  ollamaModel: string;
  chatbotEnabled: boolean;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

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
  ollamaUrl: environment.ollamaUrl || 'http://localhost:11434',
  ollamaModel: environment.ollamaModel || 'llama3',
  chatbotEnabled: environment.chatbotEnabled ?? true,
};
