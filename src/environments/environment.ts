export const environment = {
  production: false,
  demo: false,
  useProxy: false,
  apiTargetUrl: 'http://localhost:5000',
  apiEndpoints: [
    { url: 'http://localhost:5000', name: 'Primary', priority: 1 },
    { url: 'http://localhost:3003', name: 'Secondary', priority: 2 },
    { url: 'http://localhost:8000', name: 'Tertiary', priority: 3 },
  ],
  apiFallback: {
    enabled: true,
    maxRetries: 2,
    retryDelay: 1000,
    healthCheckInterval: 30000,
    failureThreshold: 3,
  },
  logger: {
    enabled: true,
    level: 'debug' as const,
    format: 'pretty' as const,
    prefix: '[iCmon-Dev]',
  },
  ollamaUrl: 'http://localhost:11434',
  ollamaModel: 'llama3',
  chatbotEnabled: true,
};
