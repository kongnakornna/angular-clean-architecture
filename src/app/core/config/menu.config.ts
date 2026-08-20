export interface MenuItem {
  label: string;
  route: string;
  icon: string;
  permission: string;
  children?: MenuItem[];
}

export const MENU_CONFIG: MenuItem[] = [
  { label: 'Dashboard', route: '/dashboard', icon: 'layout-dashboard', permission: 'dashboard.view' },
  { label: 'Customers', route: '/customers', icon: 'users', permission: 'customer.view' },
  { label: 'Quotations', route: '/quotations', icon: 'file-text', permission: 'quotation.view' },
  { label: 'Purchase Orders', route: '/purchase-orders', icon: 'shopping-cart', permission: 'purchase_order.view' },
  { label: 'Products', route: '/products', icon: 'package', permission: 'inventory.view' },
  { label: 'Payments', route: '/payments', icon: 'credit-card', permission: 'payment.view' },
  { label: 'Documents', route: '/documents', icon: 'folder', permission: 'document.view' },
  { label: 'Email', route: '/email/templates', icon: 'mail', permission: 'email.view' },
  { label: 'Batch Jobs', route: '/batch/jobs', icon: 'layers', permission: 'batch.view' },
  {
    label: 'IoT',
    route: '/iot/devices',
    icon: 'cpu',
    permission: 'iot.view',
    children: [
      { label: 'Devices', route: '/iot/devices', icon: 'device-desktop', permission: 'iot.view' },
      { label: 'Settings', route: '/iot/settings', icon: 'settings', permission: 'iot.view' },
      { label: 'Reports', route: '/iot/reports', icon: 'chart-bar', permission: 'iot.view' },
      { label: 'MQTT Dashboard', route: '/mqtt/dashboard', icon: 'chart-bar', permission: 'iot.view' },
      { label: 'MQTT Flows', route: '/mqtt/flows', icon: 'radio', permission: 'iot.view' },
    ],
  },
  { label: 'Work Orders', route: '/wos/orders', icon: 'clipboard', permission: 'wos.view' },
  { label: 'Job Cards', route: '/jobs', icon: 'briefcase', permission: 'job_card.view' },
  { label: 'Users', route: '/users', icon: 'user', permission: 'user.view' },
  { label: 'Roles', route: '/roles', icon: 'shield', permission: 'role.view' },
  {
    label: 'Monitoring',
    route: '/monitoring',
    icon: 'eye',
    permission: 'monitoring.view',
    children: [
      { label: 'SmartHome', route: '/monitoring/smarthome', icon: 'home', permission: 'monitoring.view' },
      { label: 'SmartCity', route: '/monitoring/smartcity', icon: 'building-community', permission: 'monitoring.view' },
      { label: 'SmartMonitor', route: '/monitoring/smartmonitor', icon: 'chart-monitor', permission: 'monitoring.view' },
      { label: 'Industry', route: '/monitoring/industry', icon: 'factory', permission: 'monitoring.view' },
      { label: 'SmartSolarFarm', route: '/monitoring/smartsolarfarm', icon: 'sun', permission: 'monitoring.view' },
    ],
  },
  {
    label: 'Settings',
    route: '/settings',
    icon: 'settings',
    permission: 'settings.view',
    children: [
      { label: 'Schedule', route: '/settings/schedule', icon: 'calendar-event', permission: 'settings.view' },
      { label: 'Alarm', route: '/settings/alarm', icon: 'bell', permission: 'settings.view' },
      { label: 'InfluxDB', route: '/settings/influxdb', icon: 'database', permission: 'settings.view' },
      { label: 'Devices', route: '/settings/devices', icon: 'device-desktop', permission: 'settings.view' },
      { label: 'Location', route: '/settings/locations', icon: 'map-pin', permission: 'settings.view' },
      { label: 'Hardware', route: '/settings/hardware', icon: 'cpu', permission: 'settings.view' },
      { label: 'Sensor', route: '/settings/sensors', icon: 'thermometer', permission: 'settings.view' },
      { label: 'Node-RED', route: '/settings/nodered', icon: 'server', permission: 'settings.view' },
      { label: 'MQTT', route: '/settings/mqtt', icon: 'radio', permission: 'settings.view' },
      { label: 'Email', route: '/settings/email', icon: 'mail', permission: 'settings.view' },
      { label: 'LINE', route: '/settings/line', icon: 'message-circle', permission: 'settings.view' },
      { label: 'SMS', route: '/settings/sms', icon: 'phone', permission: 'settings.view' },
      { label: 'Host', route: '/settings/hosts', icon: 'server', permission: 'settings.view' },
      { label: 'API', route: '/settings/api', icon: 'api', permission: 'settings.view' },
      { label: 'Token', route: '/settings/tokens', icon: 'key', permission: 'settings.view' },
    ],
  },
  {
    label: 'AI',
    route: '/ai-analytics',
    icon: 'robot',
    permission: 'ai_analytics.view',
    children: [
      { label: 'Command Center', route: '/ai-analytics/command-center', icon: 'robot', permission: 'ai_analytics.view' },
      { label: 'Dashboard', route: '/ai-analytics/dashboard', icon: 'chart-area', permission: 'ai_analytics.view' },
      { label: 'Reports', route: '/ai-analytics/reports', icon: 'file-invoice', permission: 'ai_analytics.view' },
      { label: 'Activity Log', route: '/ai-analytics/logs', icon: 'list-details', permission: 'ai_analytics.view' },
      { label: 'Workflow AI', route: '/ai-analytics/workflow', icon: 'wave-square', permission: 'ai_analytics.view' },
      { label: 'Schedule', route: '/ai-analytics/schedule', icon: 'calendar-event', permission: 'ai_analytics.view' },
      { label: 'Alert Management', route: '/ai-analytics/alerts', icon: 'bell', permission: 'ai_analytics.view' },
      { label: 'Data Analyst', route: '/ai-analytics/analyst', icon: 'chart-dots-2', permission: 'ai_analytics.view' },
    ],
  },
];
