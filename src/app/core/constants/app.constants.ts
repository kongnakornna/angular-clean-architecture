export const APP_CONSTANTS = {
  TOKEN_KEY: 'access_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
  EXPIRES_IN_KEY: 'expires_in',
  TOKEN_TYPE_KEY: 'token_type',
  USER_KEY: 'current_user',
  LANGUAGE_KEY: 'app_language',
};

export const CACHE_TTL = {
  USER: 3600,
  PERMISSIONS: 3600,
  SESSION: 86400,
  REFRESH: 604800,
  CUSTOMER: 1800,
  CUSTOMER_LIST: 300,
  JOB: 1800,
  JOB_BOARD: 60,
  QUOTATION: 1800,
  PO: 1800,
  PRODUCT: 3600,
  PRODUCT_LIST: 300,
  LOW_STOCK: 60,
  DASHBOARD_STATS: 300,
  DASHBOARD_REVENUE: 900,
  TRANSLATION: 3600,
  DEVICE: 10,
  DEVICE_LOCATION: 5,
  EMAIL_TEMPLATE: 3600,
};

export const RATE_LIMIT = {
  LOGIN: { limit: 5, window: 60000 },
  FORGOT_PASSWORD: { limit: 3, window: 3600000 },
  RESET_PASSWORD: { limit: 5, window: 600000 },
  REFRESH: { limit: 10, window: 60000 },
  EMAIL_SEND: { limit: 20, window: 3600000 },
  EMAIL_BULK: { limit: 5, window: 3600000 },
  DOCUMENT_UPLOAD: { limit: 50, window: 3600000 },
  IOT_DEVICES: { limit: 100, window: 60000 },
  WOS_ORDERS: { limit: 30, window: 60000 },
  DEFAULT: { limit: 100, window: 60000 },
};
