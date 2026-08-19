import { Provider } from '@angular/core';
import { APP_CONFIG, LOGGER_CONFIG, DEFAULT_APP_CONFIG } from '../config/app.config';
import {
  AUTH_REPOSITORY, JOB_CARD_REPOSITORY, CUSTOMER_REPOSITORY,
  QUOTATION_REPOSITORY, PURCHASE_ORDER_REPOSITORY, INVENTORY_REPOSITORY,
  PAYMENT_REPOSITORY, DASHBOARD_REPOSITORY, DOCUMENT_REPOSITORY,
  EMAIL_REPOSITORY, BATCH_JOB_REPOSITORY, TRANSLATION_REPOSITORY,
  IOT_REPOSITORY,   WEB_ORDER_REPOSITORY, ORDER_REPOSITORY, SYSTEM_REPOSITORY, MQTT_REPOSITORY,
  AI_ANALYTICS_REPOSITORY,
  CHATBOT_REPOSITORY,
  LIST_ROLES_USE_CASE, GET_ROLE_USE_CASE, CREATE_ROLE_USE_CASE,
  UPDATE_ROLE_USE_CASE, DELETE_ROLE_USE_CASE, ASSIGN_ROLE_PERMISSIONS_USE_CASE,
  SCHEDULE_REPOSITORY, LOCATION_REPOSITORY, HARDWARE_REPOSITORY, SENSOR_REPOSITORY,
  NODERED_REPOSITORY, LINE_NOTIFICATION_REPOSITORY, SMS_NOTIFICATION_REPOSITORY,
  HOST_REPOSITORY, API_SETTING_REPOSITORY, TOKEN_REPOSITORY,
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
import { MqttRepositoryImpl } from '../../features/mqtt/data/repositories/mqtt.repository.impl';
import { AIAnalyticsRepositoryImpl } from '../../features/ai-analytics/data/repositories/ai-analytics.repository.impl';
import { ChatbotRepositoryImpl } from '../../features/ai-chatbot/data/repositories/chatbot.repository.impl';
import { ScheduleRepositoryImpl } from '../../features/settings/data/repositories/schedule.repository.impl';
import { LocationRepositoryImpl } from '../../features/settings/data/repositories/location.repository.impl';
import { HardwareRepositoryImpl } from '../../features/settings/data/repositories/hardware.repository.impl';
import { SensorRepositoryImpl } from '../../features/settings/data/repositories/sensor.repository.impl';
import { NodeRedRepositoryImpl } from '../../features/settings/data/repositories/nodered.repository.impl';
import { LineNotificationRepositoryImpl } from '../../features/settings/data/repositories/line-notification.repository.impl';
import { SmsNotificationRepositoryImpl } from '../../features/settings/data/repositories/sms-notification.repository.impl';
import { HostRepositoryImpl } from '../../features/settings/data/repositories/host.repository.impl';
import { ApiSettingRepositoryImpl } from '../../features/settings/data/repositories/api-setting.repository.impl';
import { TokenRepositoryImpl } from '../../features/settings/data/repositories/token.repository.impl';
import { OllamaApiDataSource } from '../../features/ai-chatbot/data/datasources/ollama-api.datasource';
import { ContextProviderService } from '../../features/ai-chatbot/data/services/context-provider.service';
import { ActionExecutorService } from '../../features/ai-chatbot/data/services/action-executor.service';
import { ChatHistoryService } from '../../features/ai-chatbot/data/services/chat-history.service';
import { ListRolesUseCase } from '../../features/auth/domain/use-cases/list-roles.use-case';
import { GetRoleUseCase } from '../../features/auth/domain/use-cases/get-role.use-case';
import { CreateRoleUseCase } from '../../features/auth/domain/use-cases/create-role.use-case';
import { UpdateRoleUseCase } from '../../features/auth/domain/use-cases/update-role.use-case';
import { DeleteRoleUseCase } from '../../features/auth/domain/use-cases/delete-role.use-case';
import { AssignRolePermissionsUseCase } from '../../features/auth/domain/use-cases/assign-role-permissions.use-case';

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
  { provide: MQTT_REPOSITORY, useClass: MqttRepositoryImpl },
  { provide: AI_ANALYTICS_REPOSITORY, useClass: AIAnalyticsRepositoryImpl },
  { provide: CHATBOT_REPOSITORY, useClass: ChatbotRepositoryImpl },
  { provide: SCHEDULE_REPOSITORY, useClass: ScheduleRepositoryImpl },
  { provide: LOCATION_REPOSITORY, useClass: LocationRepositoryImpl },
  { provide: HARDWARE_REPOSITORY, useClass: HardwareRepositoryImpl },
  { provide: SENSOR_REPOSITORY, useClass: SensorRepositoryImpl },
  { provide: NODERED_REPOSITORY, useClass: NodeRedRepositoryImpl },
  { provide: LINE_NOTIFICATION_REPOSITORY, useClass: LineNotificationRepositoryImpl },
  { provide: SMS_NOTIFICATION_REPOSITORY, useClass: SmsNotificationRepositoryImpl },
  { provide: HOST_REPOSITORY, useClass: HostRepositoryImpl },
  { provide: API_SETTING_REPOSITORY, useClass: ApiSettingRepositoryImpl },
  { provide: TOKEN_REPOSITORY, useClass: TokenRepositoryImpl },
  OllamaApiDataSource,
  ContextProviderService,
  ActionExecutorService,
  ChatHistoryService,
];

export const USE_CASE_PROVIDERS: Provider[] = [
  { provide: LIST_ROLES_USE_CASE, useClass: ListRolesUseCase },
  { provide: GET_ROLE_USE_CASE, useClass: GetRoleUseCase },
  { provide: CREATE_ROLE_USE_CASE, useClass: CreateRoleUseCase },
  { provide: UPDATE_ROLE_USE_CASE, useClass: UpdateRoleUseCase },
  { provide: DELETE_ROLE_USE_CASE, useClass: DeleteRoleUseCase },
  { provide: ASSIGN_ROLE_PERMISSIONS_USE_CASE, useClass: AssignRolePermissionsUseCase },
];
