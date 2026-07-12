export const environment = {
  production: false,
  demo: false,
  useProxy: false,
  apiTargetUrl: 'http://localhost:5000',
  logger: {
    enabled: true,
    level: 'debug' as const,
    format: 'pretty' as const,
    prefix: '[iCmon-Dev]',
  },
};
