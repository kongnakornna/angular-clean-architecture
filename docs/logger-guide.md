# Logger System Guide

## Overview

A configurable, environment-aware logging system for Angular Clean Architecture with support for multiple log levels, formats, and runtime control.

---

## Files Structure

```
src/app/core/
├── config/
│   ├── logger.config.ts      # LoggerConfig interface, tokens, defaults
│   ├── app.config.ts         # AppConfig with integrated LoggerConfig
│   └── index.ts              # Barrel export
├── services/
│   ├── logger.service.ts     # Main LoggerService implementation
│   └── index.ts              # Barrel export
├── di/
│   ├── providers.ts          # CONFIG_PROVIDERS, REPOSITORY_PROVIDERS
│   └── tokens.ts             # Injection tokens
├── core.module.ts            # CoreModule with providers
└── index.ts                  # Core barrel export
```

---

## Configuration

### Environment-specific Setup

```typescript
// src/environments/environment.ts (Development)
export const environment = {
  production: false,
  logger: {
    enabled: true,
    level: 'debug',
    format: 'pretty',
    prefix: '[iCmon-Dev]',
  },
};

// src/environments/environment.prod.ts (Production)
export const environment = {
  production: true,
  logger: {
    enabled: true,
    level: 'warn',
    format: 'json',
    prefix: '[iCmon-Prod]',
  },
};
```

### Log Levels

| Level | Value | Description |
|-------|-------|-------------|
| `debug` | 0 | Detailed debugging info |
| `info` | 1 | General operational info |
| `warn` | 2 | Potential issues |
| `error` | 3 | Error events |
| `off` | 4 | Disable all logging |

### Log Formats

| Format | Use Case | Example Output |
|--------|----------|----------------|
| `console` | Basic | `[prefix] [timestamp] LEVEL message` |
| `pretty` | Development | Colored, formatted with context |
| `json` | Production/ELK | Structured JSON for log aggregation |

---

## Usage

### Basic Injection

```typescript
import { LoggerService } from '@core/services';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private logger: LoggerService) {}

  createOrder(data: OrderDto) {
    this.logger.info('Creating order', { data });
    // ...
    this.logger.info('Order created', { orderId: '123' });
  }
}
```

### Logging Methods

```typescript
logger.debug('Debug message', { key: 'value' });
logger.info('Info message', { userId: '123' });
logger.warn('Warning message', { retryCount: 3 });
logger.error('Error message', { errorCode: 'E001' }, error); // Error as 3rd arg
```

### Context Stack (Auto-merged context)

```typescript
// Push context once, applies to all subsequent logs
logger.pushContext({ component: 'OrderService', userId: '123' });

logger.info('Step 1'); // Includes component, userId
logger.debug('Step 2'); // Includes component, userId

logger.popContext(); // Remove last context
```

### Child Logger (Recommended for Services)

```typescript
@Injectable({ providedIn: 'root' })
export class PaymentService {
  // Create child logger with fixed context
  private logger = this.logger.createChildLogger({ 
    component: 'PaymentService',
    merchantId: 'M001'
  });

  constructor(private logger: LoggerService) {}

  processPayment(data: PaymentDto) {
    this.logger.info('Processing payment', { amount: data.amount });
    // Logs include component, merchantId automatically
  }
}
```

### Performance Timing

```typescript
// Sync timing
const endTimer = logger.time('fetchOrders');
const orders = await this.api.getOrders();
endTimer(); // Logs: "fetchOrders completed" { duration: 245 }

// Async timing (auto)
await logger.timeAsync('fetchOrders', this.api.getOrders());
```

### Grouping Logs

```typescript
logger.group('Order Processing', () => {
  logger.info('Validating...');
  logger.info('Saving...');
  logger.info('Done');
});

// Collapsed group (click to expand in console)
logger.groupCollapsed('Large Operation', () => {
  // many logs...
});
```

### Utilities

```typescript
logger.table(users, ['id', 'name', 'email']);  // Table output
logger.count('api-calls');                       // Counter
logger.countReset('api-calls');                  // Reset counter
logger.trace('Deep debug', { stack: true });     // With stack trace
```

---

## Runtime Control

```typescript
// Change log level dynamically
logger.setLevel('debug');    // Show all
logger.setLevel('warn');     // Only warn/error
logger.setLevel('off');      // Disable all

// Enable/disable
logger.setEnabled(false);    // Pause logging
logger.setEnabled(true);     // Resume

// Change format
logger.setFormat('json');    // JSON output
logger.setFormat('pretty');  // Colored pretty

// Read current state
logger.getLevel();           // 'debug' | 'info' | ...
logger.isEnabled();          // true | false
```

---

## Environment Behavior

| Environment | Level | Format | Colors | Purpose |
|-------------|-------|--------|--------|---------|
| Development | `debug` | `pretty` | ✅ | Full visibility |
| Staging | `info` | `pretty` | ✅ | Main flow tracking |
| Production | `warn` | `json` | ❌ | Log aggregation |
| Test | `off` | `json` | ❌ | Silent tests |

---

## Best Practices

1. **Use Child Loggers** - One per service/component with fixed context
2. **Log Context Objects** - Not strings: `{ orderId: '123' }` not `'orderId: 123'`
3. **Include Error Objects** - Pass Error as 3rd argument to `error()`
4. **Structured Context** - Use consistent keys: `component`, `userId`, `requestId`, `duration`
5. **Don't Log Secrets** - No tokens, passwords, PII
6. **Use Timing** - `timeAsync` for async operations

---

## Migration from console.log

| Old | New |
|-----|-----|
| `console.log('msg', data)` | `logger.info('msg', data)` |
| `console.warn('msg', data)` | `logger.warn('msg', data)` |
| `console.error('msg', err)` | `logger.error('msg', { error }, err)` |
| `console.table(data)` | `logger.table(data)` |
| `console.time('x')` | `logger.time('x')` / `logger.timeAsync('x', promise)` |
| `console.group('x')` | `logger.group('x', fn)` |

---

## Configuration Reference

```typescript
interface LoggerConfig {
  enabled: boolean;           // Master on/off
  level: LogLevel;            // Minimum level to log
  format: LogFormat;          // Output format
  prefix: string;             // Prefix for all logs
  showTimestamp: boolean;     // Include ISO timestamp
  showLevel: boolean;         // Include log level label
  showContext: boolean;       // Include context object
  colorsEnabled: boolean;     // ANSI colors (pretty format)
  maxMessageLength: number;   // Truncate long messages
}
```

Default values in `DEFAULT_LOGGER_CONFIG` (logger.config.ts).