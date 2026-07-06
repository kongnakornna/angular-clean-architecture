import { APP_CONFIG, DEFAULT_APP_CONFIG } from './app.config';

describe('AppConfig', () => {
  it('should export APP_CONFIG injection token', () => {
    expect(APP_CONFIG).toBeDefined();
    expect(APP_CONFIG.toString()).toContain('app.config');
  });

  it('should export DEFAULT_APP_CONFIG with expected values', () => {
    expect(DEFAULT_APP_CONFIG).toEqual({
      appName: 'iCmon',
      version: '1.0.0',
      apiBaseUrl: '/api',
      production: false,
      defaultLanguage: 'th',
      pageSize: 10,
    });
  });
});
