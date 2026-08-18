export const environment = {
  production: false,
  demo: false,
  useProxy: true,
  apiTargetUrl: 'http://localhost:5000',
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
