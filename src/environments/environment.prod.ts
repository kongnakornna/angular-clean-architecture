export const environment = {
  production: true,
  demo: false,
  apiUrl: 'http://localhost:5000/api',
  logger: {
    enabled: true,
    level: 'warn' as const,
    format: 'json' as const,
    prefix: '[iCmon-Prod]',
  },
};
