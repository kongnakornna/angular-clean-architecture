import { Provider } from '@angular/core';
import { APP_CONFIG, LOGGER_CONFIG, DEFAULT_APP_CONFIG } from '../config/app.config';
import {
  AUTH_REPOSITORY, JOB_CARD_REPOSITORY, CUSTOMER_REPOSITORY,
  QUOTATION_REPOSITORY, PURCHASE_ORDER_REPOSITORY, INVENTORY_REPOSITORY,
  PAYMENT_REPOSITORY, DASHBOARD_REPOSITORY, DOCUMENT_REPOSITORY,
  EMAIL_REPOSITORY, BATCH_JOB_REPOSITORY, TRANSLATION_REPOSITORY,
  IOT_REPOSITORY, WEB_ORDER_REPOSITORY, ORDER_REPOSITORY, SYSTEM_REPOSITORY,
} from './tokens';
import { AuthRepositoryImpl } from '../../features/auth/data/repositories/auth.repository.impl';
import { JobCardRepositoryImpl } from '../../features/job-card/data/repositories/job-card.repository.impl';
import { CustomerRepositoryImpl } from '../../features/customer/data/repositories/customer.repository.impl';
import { QuotationRepositoryImpl } from '../../features/quotation/data/repositories/quotation.repository.impl';
import { PurchaseOrderRepositoryImpl } from '../../features/purchase-order/data/repositories/purchase-order.repository.impl';
import { InventoryRepositoryImpl } from '../../features/inventory/data/repositories/inventory.repository.impl';
import { PaymentRepositoryImpl } from '../../features/payment/data/repositories/payment.repository.impl';
import { DashboardRepositoryImpl } from '../../features/dashboard/data/repositories/dashboard.repository.impl';
import { DocumentRepositoryImpl } from '../../features/document/data/repositories/document.repository.impl';
import { EmailRepositoryImpl } from '../../features/email/data/repositories/email.repository.impl';
import { BatchJobRepositoryImpl } from '../../features/batch/data/repositories/batch-job.repository.impl';
import { TranslationRepositoryImpl } from '../../shared/i18n/data/repositories/translation.repository.impl';
import { IoTRepositoryImpl } from '../../features/iot/data/repositories/iot.repository.impl';
import { WebOrderRepositoryImpl } from '../../features/wos/data/repositories/web-order.repository.impl';
import { OrderRepositoryImpl } from '../../features/orders/data/repositories/order.repository.impl';
import { SystemRepositoryImpl } from '../../features/system/data/repositories/system.repository.impl';

export const CONFIG_PROVIDERS: Provider[] = [
  { provide: APP_CONFIG, useValue: DEFAULT_APP_CONFIG },
  { provide: LOGGER_CONFIG, useValue: DEFAULT_APP_CONFIG.logger },
];

export const REPOSITORY_PROVIDERS: Provider[] = [
  { provide: AUTH_REPOSITORY, useClass: AuthRepositoryImpl },
  { provide: JOB_CARD_REPOSITORY, useClass: JobCardRepositoryImpl },
  { provide: CUSTOMER_REPOSITORY, useClass: CustomerRepositoryImpl },
  { provide: QUOTATION_REPOSITORY, useClass: QuotationRepositoryImpl },
  { provide: PURCHASE_ORDER_REPOSITORY, useClass: PurchaseOrderRepositoryImpl },
  { provide: INVENTORY_REPOSITORY, useClass: InventoryRepositoryImpl },
  { provide: PAYMENT_REPOSITORY, useClass: PaymentRepositoryImpl },
  { provide: DASHBOARD_REPOSITORY, useClass: DashboardRepositoryImpl },
  { provide: DOCUMENT_REPOSITORY, useClass: DocumentRepositoryImpl },
  { provide: EMAIL_REPOSITORY, useClass: EmailRepositoryImpl },
  { provide: BATCH_JOB_REPOSITORY, useClass: BatchJobRepositoryImpl },
  { provide: TRANSLATION_REPOSITORY, useClass: TranslationRepositoryImpl },
  { provide: IOT_REPOSITORY, useClass: IoTRepositoryImpl },
  { provide: WEB_ORDER_REPOSITORY, useClass: WebOrderRepositoryImpl },
  { provide: ORDER_REPOSITORY, useClass: OrderRepositoryImpl },
  { provide: SYSTEM_REPOSITORY, useClass: SystemRepositoryImpl },
];
