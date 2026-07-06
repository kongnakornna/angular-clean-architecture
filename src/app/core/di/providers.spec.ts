import { REPOSITORY_PROVIDERS } from './providers';
import {
  AUTH_REPOSITORY,
  JOB_CARD_REPOSITORY,
  CUSTOMER_REPOSITORY,
  QUOTATION_REPOSITORY,
  PURCHASE_ORDER_REPOSITORY,
  INVENTORY_REPOSITORY,
  PAYMENT_REPOSITORY,
  DASHBOARD_REPOSITORY,
  DOCUMENT_REPOSITORY,
  EMAIL_REPOSITORY,
  BATCH_JOB_REPOSITORY,
  TRANSLATION_REPOSITORY,
  IOT_REPOSITORY,
  WEB_ORDER_REPOSITORY,
} from './tokens';

describe('REPOSITORY_PROVIDERS', () => {
  it('should export REPOSITORY_PROVIDERS as an array', () => {
    expect(Array.isArray(REPOSITORY_PROVIDERS)).toBeTrue();
  });

  it('should have 14 providers', () => {
    expect(REPOSITORY_PROVIDERS.length).toBe(14);
  });

  it('should include AUTH_REPOSITORY provider', () => {
    const provider = REPOSITORY_PROVIDERS.find((p: any) => p.provide === AUTH_REPOSITORY);
    expect(provider).toBeDefined();
    expect((provider as any).useClass.name).toContain('AuthRepositoryImpl');
  });

  it('should include all repository tokens', () => {
    const tokens = [
      AUTH_REPOSITORY, JOB_CARD_REPOSITORY, CUSTOMER_REPOSITORY,
      QUOTATION_REPOSITORY, PURCHASE_ORDER_REPOSITORY, INVENTORY_REPOSITORY,
      PAYMENT_REPOSITORY, DASHBOARD_REPOSITORY, DOCUMENT_REPOSITORY,
      EMAIL_REPOSITORY, BATCH_JOB_REPOSITORY, TRANSLATION_REPOSITORY,
      IOT_REPOSITORY, WEB_ORDER_REPOSITORY,
    ];
    const providedTokens = REPOSITORY_PROVIDERS.map((p: any) => p.provide);
    tokens.forEach((token) => expect(providedTokens).toContain(token));
  });
});
