export const environment = {
  production: false,
  demo: false,
  apiUrl: '/api',
  logger: {
    enabled: true,
    level: 'debug' as const,
    format: 'pretty' as const,
    prefix: '[iCmon-Dev]',
  },
};
