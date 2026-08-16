import { APP_CONFIG, DEFAULT_APP_CONFIG } from './app.config';

describe('AppConfig', () => {
  it('should export APP_CONFIG injection token', () => {
    expect(APP_CONFIG).toBeDefined();
    expect(APP_CONFIG.toString()).toContain('app.config');
  });

  it('should export DEFAULT_APP_CONFIG with expected values', () => {
    expect(DEFAULT_APP_CONFIG.appName).toBe('iCmon');
    expect(DEFAULT_APP_CONFIG.version).toBe('1.0.0');
    expect(DEFAULT_APP_CONFIG.defaultLanguage).toBe('en');
    expect(DEFAULT_APP_CONFIG.pageSize).toBe(10);
    expect(DEFAULT_APP_CONFIG.logger).toBeDefined();
    expect(DEFAULT_APP_CONFIG.logger.enabled).toBe(true);
  });
});
