export const environment = {
  production: true,
  demo: false,
  apiBaseUrl: '/api',
  apiTargetUrl: 'http://localhost:5000',
  logger: {
    enabled: true,
    level: 'warn' as const,
    format: 'json' as const,
    prefix: '[iCmon-Prod]',
  },
};
