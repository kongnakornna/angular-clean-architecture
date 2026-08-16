import { InjectionToken } from '@angular/core';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'off';
export type LogFormat = 'console' | 'json' | 'pretty';

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

export const LOGGER_CONFIG = new InjectionToken<LoggerConfig>('logger.config');

export const DEFAULT_LOGGER_CONFIG: LoggerConfig = {
  enabled: true,
  level: 'debug',
  format: 'console',
  prefix: '[App]',
  showTimestamp: true,
  showLevel: true,
  showContext: true,
  colorsEnabled: true,
  maxMessageLength: 1000,
};

export const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  off: 4,
};

export const LOG_LEVEL_COLORS: Record<LogLevel, string> = {
  debug: '#6c757d',
  info: '#0d6efd',
  warn: '#ffc107',
  error: '#dc3545',
  off: '#000000',
};

export const LOG_LEVEL_LABELS: Record<LogLevel, string> = {
  debug: 'DEBUG',
  info: 'INFO',
  warn: 'WARN',
  error: 'ERROR',
  off: 'OFF',
};