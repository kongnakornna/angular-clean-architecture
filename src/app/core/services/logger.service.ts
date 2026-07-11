import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoggerConfig, LOGGER_CONFIG, DEFAULT_LOGGER_CONFIG, LogLevel, LogFormat, LOG_LEVELS, LOG_LEVEL_COLORS, LOG_LEVEL_LABELS } from '../config/logger.config';

export interface LogContext {
  [key: string]: unknown;
  component?: string;
  method?: string;
  action?: string;
  userId?: string;
  requestId?: string;
  duration?: number;
  error?: Error | unknown;
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  label: string;
  message: string;
  context?: LogContext;
}

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private config: LoggerConfig;
  private enabled: boolean;

  constructor(@Optional() @Inject(LOGGER_CONFIG) config?: LoggerConfig) {
    this.config = { ...DEFAULT_LOGGER_CONFIG, ...config };
    this.enabled = this.config.enabled && !environment.production;
  }

  configure(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config };
    this.enabled = this.config.enabled && !environment.production;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled && !environment.production;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  getLevel(): LogLevel {
    return this.config.level;
  }

  setLevel(level: LogLevel): void {
    this.config.level = level;
  }

  debug(message: string, context?: LogContext): void {
    this.log('debug', message, context);
  }

  info(message: string, context?: LogContext): void {
    this.log('info', message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.log('warn', message, context);
  }

  error(message: string, context?: LogContext): void {
    this.log('error', message, context);
  }

  log(level: LogLevel, message: string, context?: LogContext): void {
    if (!this.shouldLog(level)) {
      return;
    }

    const entry = this.createLogEntry(level, message, context);
    this.output(entry);
  }

  private shouldLog(level: LogLevel): boolean {
    if (!this.enabled) {
      return false;
    }
    return LOG_LEVELS[level] >= LOG_LEVELS[this.config.level];
  }

  private createLogEntry(level: LogLevel, message: string, context?: LogContext): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      label: LOG_LEVEL_LABELS[level],
      message: this.truncateMessage(message),
      context: this.sanitizeContext(context),
    };
  }

  private sanitizeContext(context?: LogContext): LogContext | undefined {
    if (!context) {
      return undefined;
    }

    const sanitized: LogContext = {};
    for (const [key, value] of Object.entries(context)) {
      if (value instanceof Error) {
        sanitized[key] = {
          name: value.name,
          message: value.message,
          stack: value.stack,
        };
      } else if (value !== undefined && value !== null) {
        sanitized[key] = value;
      }
    }

    return Object.keys(sanitized).length > 0 ? sanitized : undefined;
  }

  private truncateMessage(message: string): string {
    if (message.length <= this.config.maxMessageLength) {
      return message;
    }
    return message.substring(0, this.config.maxMessageLength - 3) + '...';
  }

  private output(entry: LogEntry): void {
    switch (this.config.format) {
      case 'json':
        this.outputJson(entry);
        break;
      case 'pretty':
        this.outputPretty(entry);
        break;
      case 'console':
      default:
        this.outputConsole(entry);
        break;
    }
  }

  private outputConsole(entry: LogEntry): void {
    const { timestamp, level, label, message, context } = entry;
    const prefix = this.config.prefix ? `${this.config.prefix} ` : '';
    const parts: string[] = [];

    if (this.config.showTimestamp) {
      parts.push(`[${timestamp}]`);
    }

    if (this.config.showLevel) {
      const color = this.config.colorsEnabled ? LOG_LEVEL_COLORS[level] : '';
      if (color) {
        parts.push(`%c${label}%c`);
      } else {
        parts.push(label);
      }
    }

    parts.push(`${prefix}${message}`);

    const args: unknown[] = [parts.join(' ')];

    if (this.config.colorsEnabled && this.config.showLevel) {
      args.splice(1, 0, `color: ${LOG_LEVEL_COLORS[level]}; font-weight: bold;`, 'color: inherit;');
    }

    const consoleMethod = this.getConsoleMethod(entry.level);

    if (context && this.config.showContext) {
      consoleMethod.apply(console, [...args, context]);
    } else {
      consoleMethod.apply(console, args);
    }
  }

  private outputPretty(entry: LogEntry): void {
    const { timestamp, level, label, message, context } = entry;
    const prefix = this.config.prefix ? `${this.config.prefix} ` : '';
    const color = this.config.colorsEnabled ? LOG_LEVEL_COLORS[level] : '';

    const style = color ? `color: ${color}; font-weight: bold;` : '';
    const resetStyle = color ? 'color: inherit; font-weight: normal;' : '';

    const timestampStr = this.config.showTimestamp ? `[${timestamp}] ` : '';
    const levelStr = this.config.showLevel ? `%c${label}%c ` : '';
    const prefixStr = `${prefix}`;

    const args = [`%c${timestampStr}${levelStr}${prefixStr}%c${message}`, style, resetStyle, ''];

    const consoleMethod = this.getConsoleMethod(level);

    if (context && this.config.showContext) {
      consoleMethod.apply(console, [...args, 'Context:', context]);
    } else {
      consoleMethod.apply(console, args);
    }
  }

  private outputJson(entry: LogEntry): void {
    const jsonEntry = {
      ...entry,
      '@timestamp': entry.timestamp,
      level: entry.label,
      message: entry.message,
      context: entry.context,
    };

    const consoleMethod = this.getConsoleMethod(entry.level);
    consoleMethod(JSON.stringify(jsonEntry));
  }

  private getConsoleMethod(level: LogLevel): (...args: unknown[]) => void {
    switch (level) {
      case 'debug':
        return console.debug.bind(console);
      case 'info':
        return console.info.bind(console);
      case 'warn':
        return console.warn.bind(console);
      case 'error':
        return console.error.bind(console);
      default:
        return console.log.bind(console);
    }
  }

  createChildLogger(context: LogContext): LoggerService {
    const childLogger = new LoggerService();
    childLogger.configure(this.config);
    childLogger.setEnabled(this.enabled);
    return childLogger;
  }

  time(label: string): () => void {
    const start = performance.now();
    return () => {
      const duration = performance.now() - start;
      this.debug(`${label} completed`, { duration: Math.round(duration) });
    };
  }

  timeAsync<T>(label: string, promise: Promise<T>): Promise<T> {
    const endTimer = this.time(label);
    return promise.finally(endTimer);
  }

  group(label: string, fn: () => void): void {
    if (!this.enabled) {
      fn();
      return;
    }
    console.group(label);
    try {
      fn();
    } finally {
      console.groupEnd();
    }
  }

  groupCollapsed(label: string, fn: () => void): void {
    if (!this.enabled) {
      fn();
      return;
    }
    console.groupCollapsed(label);
    try {
      fn();
    } finally {
      console.groupEnd();
    }
  }
}