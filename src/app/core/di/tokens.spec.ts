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

describe('DI Tokens', () => {
  it('should export AUTH_REPOSITORY token', () => {
    expect(AUTH_REPOSITORY.toString()).toContain('auth.repository');
  });

  it('should export JOB_CARD_REPOSITORY token', () => {
    expect(JOB_CARD_REPOSITORY.toString()).toContain('job-card.repository');
  });

  it('should export CUSTOMER_REPOSITORY token', () => {
    expect(CUSTOMER_REPOSITORY.toString()).toContain('customer.repository');
  });

  it('should export QUOTATION_REPOSITORY token', () => {
    expect(QUOTATION_REPOSITORY.toString()).toContain('quotation.repository');
  });

  it('should export PURCHASE_ORDER_REPOSITORY token', () => {
    expect(PURCHASE_ORDER_REPOSITORY.toString()).toContain('purchase-order.repository');
  });

  it('should export INVENTORY_REPOSITORY token', () => {
    expect(INVENTORY_REPOSITORY.toString()).toContain('inventory.repository');
  });

  it('should export PAYMENT_REPOSITORY token', () => {
    expect(PAYMENT_REPOSITORY.toString()).toContain('payment.repository');
  });

  it('should export DASHBOARD_REPOSITORY token', () => {
    expect(DASHBOARD_REPOSITORY.toString()).toContain('dashboard.repository');
  });

  it('should export DOCUMENT_REPOSITORY token', () => {
    expect(DOCUMENT_REPOSITORY.toString()).toContain('document.repository');
  });

  it('should export EMAIL_REPOSITORY token', () => {
    expect(EMAIL_REPOSITORY.toString()).toContain('email.repository');
  });

  it('should export BATCH_JOB_REPOSITORY token', () => {
    expect(BATCH_JOB_REPOSITORY.toString()).toContain('batch-job.repository');
  });

  it('should export TRANSLATION_REPOSITORY token', () => {
    expect(TRANSLATION_REPOSITORY.toString()).toContain('translation.repository');
  });

  it('should export IOT_REPOSITORY token', () => {
    expect(IOT_REPOSITORY.toString()).toContain('iot.repository');
  });

  it('should export WEB_ORDER_REPOSITORY token', () => {
    expect(WEB_ORDER_REPOSITORY.toString()).toContain('web-order.repository');
  });

  it('should have all tokens defined', () => {
    const tokens = [
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
    ];
    tokens.forEach((token) => expect(token).toBeDefined());
  });
});
