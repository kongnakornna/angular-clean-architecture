import { Component, inject } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { LayoutService } from "../../core/services/layout.service";

import {
  EXP_ICON,
  IOT_ICON,
  AI_ICON,
  LAYOUT_DASHBOARD_ICON,
  USERS_ICON,
  USER_ICON,
  FILE_TEXT_ICON,
  SHOPPING_CART_ICON,
  PACKAGE_ICON,
  CREDIT_CARD_ICON,
  FOLDER_ICON,
  BRIEFCASE_ICON,
  CLIPBOARD_ICON,
  LAYERS_ICON,
  CPU_ICON,
  RADIO_ICON,
  CHART_AREA_ICON,
  FILE_INVOICE_ICON,
  MAIL_ICON,
  LANGUAGE_ICON,
  ROBOT_ICON,
  CHART_PIE_ICON,
  DEVICE_DESKTOP_ICON,
  SETTINGS_ICON,
  CHART_BAR_ICON,
  SHIELD_ICON,
  LIST_ICON,
  PLUS_ICON,
  PENCIL_ICON,
  LIST_DETAILS_ICON,
  PALETTE_ICON,
  CHART_DOTS_2_ICON,
  WAVE_SQUARE_ICON,
  CALENDAR_EVENT_ICON,
  BELL_ICON,
  DATABASE_ICON,
  MAP_PIN_ICON,
  THERMOMETER_ICON,
  SERVER_ICON,
  MESSAGE_CIRCLE_ICON,
  PHONE_ICON,
  KEY_ICON,
  API_ICON,
  MONITORING_ICON,
  REPORT_ICON,
} from "./header.icons";

interface MenuItem {
  label?: string;
  icon?: string;
  route?: string;
  action?: string;
  divider?: boolean;
  children?: MenuItem[];
}

@Component({
  selector: "app-header",
  standalone: false,
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  private layout = inject(LayoutService);
  private sanitizer = inject(DomSanitizer);

  unreadCount = 3;

  trustHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  isSvgIcon(icon?: string): boolean {
    return !!icon && icon.startsWith("<svg");
  }

  getIconName(icon?: string): string {
    return icon?.startsWith("<svg") ? "" : icon || "";
  }

  get username(): string {
    return localStorage.getItem("username") || "User";
  }

  notifications = [
    { id: 1, title: "งานใหม่ถูกสร้าง", time: "5 นาทีที่แล้ว", read: false },
    {
      id: 2,
      title: "Quotation ถูกอนุมัติ",
      time: "1 ชั่วโมงที่แล้ว",
      read: false,
    },
    { id: 3, title: "สต็อกสินค้าต่ำ", time: "2 ชั่วโมงที่แล้ว", read: true },
  ];

  profileMenu: MenuItem[] = [
    { label: "Profile", icon: USER_ICON, route: "/profile" },
    { label: "Analytics", icon: CHART_PIE_ICON, route: "/analytics" },
    { divider: true },
    { label: "Settings & Privacy", route: "/settings" },
    { label: "Help" },
    { label: "Lock Screen", route: "lock-screen" },
    { label: "Sign out", action: "logout" },
  ];

  apps: MenuItem[] = [
    { label: "Dashboard", icon: LAYOUT_DASHBOARD_ICON, route: "/dashboard" },
    { label: "Customers", icon: USERS_ICON, route: "/customers" },
    { label: "Quotations", icon: FILE_TEXT_ICON, route: "/quotations" },
    { label: "Purchase Orders", icon: SHOPPING_CART_ICON, route: "/purchase-orders" },
    { label: "Products", icon: PACKAGE_ICON, route: "/products" },
    { label: "Payments", icon: CREDIT_CARD_ICON, route: "/payments" },
    { label: "Documents", icon: FOLDER_ICON, route: "/documents" },
    { label: "Job Cards", icon: BRIEFCASE_ICON, route: "/jobs" },
    { label: "Work Orders", icon: CLIPBOARD_ICON, route: "/wos/orders" },
    { label: "Batch Jobs", icon: LAYERS_ICON, route: "/batch/jobs" },
    { label: "IoT Devices", icon: CPU_ICON, route: "/iot/devices" },
    { label: "MQTT Dashboard", icon: CHART_BAR_ICON, route: "/mqtt/dashboard" },
    { label: "MQTT Flows", icon: RADIO_ICON, route: "/mqtt/flows" },
    { label: "Analytics", icon: CHART_AREA_ICON, route: "/analytics" },
    { label: "Reports", icon: REPORT_ICON, route: "/reports" },
    { label: "Email", icon: MAIL_ICON, route: "/email/templates" },
    { label: "Languages", icon: LANGUAGE_ICON, route: "/i18n/languages" },
    { label: "Users", icon: USER_ICON, route: "/users" },
    { label: "AI", icon: ROBOT_ICON, route: "/ai-analytics" },
  ];

  horizontalMenu: MenuItem[] = [
    { label: "nav.dashboard", icon: LAYOUT_DASHBOARD_ICON, route: "/dashboard" },
    {
      label: "nav.iot",
      icon: IOT_ICON,
      route: "/iot/devices",
      children: [
        {
          label: "nav.iotDevices",
          icon: DEVICE_DESKTOP_ICON,
          children: [
            { label: "nav.iotDevices", icon: DEVICE_DESKTOP_ICON, route: "/iot/devices" },
            { label: "nav.devices", icon: LAYERS_ICON, route: "/iot/device-groups" },
          ],
        },
        {
          label: "nav.monitoring",
          icon: CHART_AREA_ICON,
          children: [
            { label: "nav.liveDashboard", icon: CHART_AREA_ICON, route: "/iot/dashboard" },
            { label: "nav.reports", icon: CHART_BAR_ICON, route: "/iot/reports" },
            { label: "nav.alerts", icon: BELL_ICON, route: "/iot/alerts" },
          ],
        },
        { label: "nav.iotSettings", icon: SETTINGS_ICON, route: "/iot/settings" },
        { label: "nav.mqttDashboard", icon: CHART_BAR_ICON, route: "/mqtt/dashboard" },
        { label: "nav.mqttFlows", icon: RADIO_ICON, route: "/mqtt/flows" },
      ],
    },
    {
      label: "nav.users",
      icon: USERS_ICON,
      route: "/users",
      children: [
        {
          label: "nav.userManagement",
          icon: USERS_ICON,
          children: [
            { label: "nav.userList", icon: LIST_ICON, route: "/users" },
            { label: "nav.createUser", icon: PLUS_ICON, route: "/users/create" },
          ],
        },
        { label: "nav.roles", icon: SHIELD_ICON, route: "/roles" },
      ],
    },
    {
      label: "nav.service",
      icon: BRIEFCASE_ICON,
      route: "/quotations",
      children: [
        {
          label: "nav.finance",
          icon: CREDIT_CARD_ICON,
          children: [
            { label: "nav.payments", icon: CREDIT_CARD_ICON, route: "/payments" },
            { label: "nav.invoices", icon: FILE_INVOICE_ICON, route: "/invoices" },
            { label: "nav.quotations", icon: FILE_TEXT_ICON, route: "/quotations" },
            { label: "nav.purchaseOrders", icon: SHOPPING_CART_ICON, route: "/purchase-orders" },
          ],
        },
        {
          label: "nav.operations",
          icon: BRIEFCASE_ICON,
          children: [
            { label: "nav.jobs", icon: BRIEFCASE_ICON, route: "/jobs" },
            { label: "nav.wos", icon: CLIPBOARD_ICON, route: "/wos/orders" },
            { label: "nav.batchJobs", icon: LAYERS_ICON, route: "/batch/jobs" },
            { label: "nav.products", icon: PACKAGE_ICON, route: "/products" },
          ],
        },
        {
          label: "nav.email",
          icon: MAIL_ICON,
          children: [
            { label: "nav.emailTemplates", icon: MAIL_ICON, route: "/email/templates" },
            { label: "nav.emailCompose", icon: PENCIL_ICON, route: "/email/compose" },
            { label: "nav.emailLogs", icon: LIST_DETAILS_ICON, route: "/email/logs" },
          ],
        },
      ],
    },
    {
      label: "nav.settings",
      icon: SETTINGS_ICON,
      route: "/settings",
      children: [
        {
          label: "nav.automation",
          icon: CALENDAR_EVENT_ICON,
          children: [
            { label: "nav.schedule", icon: CALENDAR_EVENT_ICON, route: "/settings/schedule" },
          ],
        },
        {
          label: "nav.alerting",
          icon: BELL_ICON,
          children: [
            { label: "nav.alarm", icon: BELL_ICON, route: "/settings/alarm" },
          ],
        },
        {
          label: "nav.storage",
          icon: DATABASE_ICON,
          children: [
            { label: "nav.influxdb", icon: DATABASE_ICON, route: "/settings/influx" },
          ],
        },
        {
          label: "nav.device",
          icon: DEVICE_DESKTOP_ICON,
          children: [
            { label: "nav.devices", icon: DEVICE_DESKTOP_ICON, route: "/settings/device" },
            { label: "nav.locations", icon: MAP_PIN_ICON, route: "/settings/location" },
            { label: "nav.hardware", icon: CPU_ICON, route: "/settings/hardware" },
            { label: "nav.sensors", icon: THERMOMETER_ICON, route: "/settings/sensor" },
          ],
        },
        {
          label: "nav.connectivity",
          icon: RADIO_ICON,
          children: [
            { label: "nav.nodered", icon: SERVER_ICON, route: "/settings/nodered" },
            { label: "nav.mqtt", icon: RADIO_ICON, route: "/settings/mqtt" },
          ],
        },
        {
          label: "nav.notification",
          icon: MAIL_ICON,
          children: [
            { label: "nav.email", icon: MAIL_ICON, route: "/settings/email" },
            { label: "nav.line", icon: MESSAGE_CIRCLE_ICON, route: "/settings/line" },
            { label: "nav.sms", icon: PHONE_ICON, route: "/settings/sms" },
          ],
        },
        {
          label: "nav.system",
          icon: SERVER_ICON,
          children: [
            { label: "nav.hosts", icon: SERVER_ICON, route: "/settings/host" },
            { label: "nav.api", icon: API_ICON, route: "/settings/api" },
            { label: "nav.tokens", icon: KEY_ICON, route: "/settings/token" },
          ],
        },
      ],
    },
    {
      label: "nav.monitoring",
      icon: MONITORING_ICON,
      route: "/monitoring",
      children: [
        { label: "nav.smarthome", icon: MONITORING_ICON, route: "/monitoring/smarthome" },
        { label: "nav.smartcity", icon: MONITORING_ICON, route: "/monitoring/smartcity" },
        { label: "nav.smartmonitor", icon: MONITORING_ICON, route: "/monitoring/smartmonitor" },
        { label: "nav.industry", icon: MONITORING_ICON, route: "/monitoring/industry" },
        { label: "nav.smartsolarfarm", icon: MONITORING_ICON, route: "/monitoring/smartsolarfarm" },
      ],
    },
    {
      label: "nav.reports",
      icon: REPORT_ICON,
      route: "/reports",
      children: [
        {
          label: "nav.iotReports",
          icon: CHART_BAR_ICON,
          children: [
            { label: "nav.scheduleReport", icon: CALENDAR_EVENT_ICON, route: "/reports/schedule" },
            { label: "nav.alarmReport", icon: BELL_ICON, route: "/reports/alarm" },
            { label: "nav.logsControlReport", icon: LIST_DETAILS_ICON, route: "/reports/logs-control" },
            { label: "nav.deviceReport", icon: DEVICE_DESKTOP_ICON, route: "/reports/device" },
          ],
        },
        {
          label: "nav.analytics",
          icon: CHART_AREA_ICON,
          children: [
            { label: "nav.overview", icon: CHART_AREA_ICON, route: "/analytics" },
            { label: "nav.dataAnalyst", icon: CHART_DOTS_2_ICON, route: "/analytics/analyst" },
          ],
        },
        {
          label: "nav.appearance",
          icon: PALETTE_ICON,
          children: [
            { label: "nav.theme", icon: PALETTE_ICON, route: "/settings/theme" },
            { label: "nav.language", icon: LANGUAGE_ICON, route: "/settings/language" },
          ],
        },
      ],
    },
    {
      label: "nav.ai",
      icon: AI_ICON,
      route: "/ai-analytics",
      children: [
        {
          label: "nav.operations",
          icon: ROBOT_ICON,
          children: [
            { label: "nav.commandCenter", icon: ROBOT_ICON, route: "/ai-analytics/command-center" },
            { label: "nav.dashboard", icon: CHART_AREA_ICON, route: "/ai-analytics/dashboard" },
            { label: "nav.activityLog", icon: LIST_DETAILS_ICON, route: "/ai-analytics/logs" },
          ],
        },
        {
          label: "nav.automation",
          icon: WAVE_SQUARE_ICON,
          children: [
            { label: "nav.workflowAi", icon: WAVE_SQUARE_ICON, route: "/ai-analytics/workflow" },
            { label: "nav.schedule", icon: CALENDAR_EVENT_ICON, route: "/ai-analytics/schedule" },
            { label: "nav.alertManagement", icon: BELL_ICON, route: "/ai-analytics/alerts" },
          ],
        },
        { label: "nav.reports", icon: FILE_INVOICE_ICON, route: "/ai-analytics/reports" },
        { label: "nav.dataAnalyst", icon: CHART_DOTS_2_ICON, route: "/ai-analytics/analyst" },
      ],
    },
  ];

  get isDarkMode(): boolean {
    return this.layout.theme() === "dark";
  }

  get layoutMode(): string {
    return this.layout.layout();
  }

  toggleTheme(): void {
    this.layout.update("theme", this.isDarkMode ? "light" : "dark");
  }

  setLayout(mode: "fluid" | "boxed" | "boxed-2"): void {
    this.layout.update("layout", mode);
  }

  openFullscreen(): void {
    const el = document.documentElement as HTMLElement & {
      webkitRequestFullscreen?: () => void;
      msRequestFullscreen?: () => void;
      mozRequestFullScreen?: () => void;
    };

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen();
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    }
  }

  logout(): void {
    const themeKeys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("tabler-")) {
        themeKeys.push(key);
      }
    }
    const themeValues: Record<string, string> = {};
    themeKeys.forEach((k) => {
      themeValues[k] = localStorage.getItem(k) || "";
    });

    localStorage.clear();

    Object.entries(themeValues).forEach(([k, v]) => localStorage.setItem(k, v));

    window.location.href = "/login";
  }
}
