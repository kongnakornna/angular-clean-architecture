export const environment = {
  production: true,
  demo: false,
  useProxy: true,
  apiTargetUrl: 'http://localhost:5000',
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
