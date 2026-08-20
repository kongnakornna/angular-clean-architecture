export const environment = {
  production: true,
  demo: false,
  useProxy: false,
  apiTargetUrl: 'http://localhost:5000',
  apiEndpoints: [
    { url: 'http://localhost:5000', name: 'Primary', priority: 1 },
    { url: 'http://localhost:3003', name: 'Secondary', priority: 2 },
    { url: 'http://localhost:8000', name: 'Tertiary', priority: 3 },
  ],
  apiFallback: {
    enabled: false,
    maxRetries: 2,
    retryDelay: 1000,
    healthCheckInterval: 30000,
    failureThreshold: 3,
  },
  logger: {
    enabled: true,
    level: 'warn' as const,
    format: 'json' as const,
    prefix: '[iCmon-Prod]',
  },
  ollamaUrl: 'http://localhost:11434',
  ollamaModel: 'llama3',
  chatbotEnabled: true,
};
