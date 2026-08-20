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
    { label: "Reports", icon: FILE_INVOICE_ICON, route: "/reports" },
    { label: "Email", icon: MAIL_ICON, route: "/email/templates" },
    { label: "Languages", icon: LANGUAGE_ICON, route: "/i18n/languages" },
    { label: "Users", icon: USER_ICON, route: "/users" },
    { label: "AI", icon: ROBOT_ICON, route: "/ai-analytics" },
  ];

  horizontalMenu: MenuItem[] = [
    { label: "Dashboard", icon: LAYOUT_DASHBOARD_ICON, route: "/dashboard" },
    {
      label: "IoT",
      icon: IOT_ICON,
      route: "/iot/devices",
      children: [
        {
          label: "Devices",
          icon: DEVICE_DESKTOP_ICON,
          children: [
            { label: "All Devices", icon: DEVICE_DESKTOP_ICON, route: "/iot/devices" },
            { label: "Device Groups", icon: LAYERS_ICON, route: "/iot/device-groups" },
          ],
        },
        {
          label: "Monitoring",
          icon: CHART_AREA_ICON,
          children: [
            { label: "Live Dashboard", icon: CHART_AREA_ICON, route: "/iot/dashboard" },
            { label: "Reports", icon: CHART_BAR_ICON, route: "/iot/reports" },
            { label: "Alerts", icon: BELL_ICON, route: "/iot/alerts" },
          ],
        },
        { label: "IoT Settings", icon: SETTINGS_ICON, route: "/iot/settings" },
        { label: "MQTT Dashboard", icon: CHART_BAR_ICON, route: "/mqtt/dashboard" },
        { label: "MQTT Flows", icon: RADIO_ICON, route: "/mqtt/flows" },
      ],
    },
    {
      label: "Users",
      icon: USERS_ICON,
      route: "/users",
      children: [
        {
          label: "User Management",
          icon: USERS_ICON,
          children: [
            { label: "User List", icon: LIST_ICON, route: "/users" },
            { label: "Create User", icon: PLUS_ICON, route: "/users/create" },
          ],
        },
        { label: "Roles", icon: SHIELD_ICON, route: "/roles" },
      ],
    },
    {
      label: "Service",
      icon: BRIEFCASE_ICON,
      route: "/quotations",
      children: [
        {
          label: "Finance",
          icon: CREDIT_CARD_ICON,
          children: [
            { label: "Payments", icon: CREDIT_CARD_ICON, route: "/payments" },
            { label: "Invoices", icon: FILE_INVOICE_ICON, route: "/invoices" },
            { label: "Quotations", icon: FILE_TEXT_ICON, route: "/quotations" },
            { label: "Purchase Orders", icon: SHOPPING_CART_ICON, route: "/purchase-orders" },
          ],
        },
        {
          label: "Operations",
          icon: BRIEFCASE_ICON,
          children: [
            { label: "Job Cards", icon: BRIEFCASE_ICON, route: "/jobs" },
            { label: "Work Orders", icon: CLIPBOARD_ICON, route: "/wos/orders" },
            { label: "Batch Jobs", icon: LAYERS_ICON, route: "/batch/jobs" },
            { label: "Products", icon: PACKAGE_ICON, route: "/products" },
          ],
        },
        {
          label: "Email",
          icon: MAIL_ICON,
          children: [
            { label: "Templates", icon: MAIL_ICON, route: "/email/templates" },
            { label: "Compose", icon: PENCIL_ICON, route: "/email/compose" },
            { label: "Logs", icon: LIST_DETAILS_ICON, route: "/email/logs" },
          ],
        },
      ],
    },
    {
      label: "Settings",
      icon: SETTINGS_ICON,
      route: "/settings",
      children: [
        {
          label: "Automation",
          icon: CALENDAR_EVENT_ICON,
          children: [
            { label: "Schedule", icon: CALENDAR_EVENT_ICON, route: "/settings/schedule" },
          ],
        },
        {
          label: "Alerting",
          icon: BELL_ICON,
          children: [
            { label: "Alarm", icon: BELL_ICON, route: "/settings/alarm" },
          ],
        },
        {
          label: "Storage",
          icon: DATABASE_ICON,
          children: [
            { label: "InfluxDB", icon: DATABASE_ICON, route: "/settings/influx" },
          ],
        },
        {
          label: "Device",
          icon: DEVICE_DESKTOP_ICON,
          children: [
            { label: "Devices", icon: DEVICE_DESKTOP_ICON, route: "/settings/device" },
            { label: "Locations", icon: MAP_PIN_ICON, route: "/settings/location" },
            { label: "Hardware", icon: CPU_ICON, route: "/settings/hardware" },
            { label: "Sensors", icon: THERMOMETER_ICON, route: "/settings/sensor" },
          ],
        },
        {
          label: "Connectivity",
          icon: RADIO_ICON,
          children: [
            { label: "Node-RED", icon: SERVER_ICON, route: "/settings/nodered" },
            { label: "MQTT", icon: RADIO_ICON, route: "/settings/mqtt" },
          ],
        },
        {
          label: "Notification",
          icon: MAIL_ICON,
          children: [
            { label: "Email", icon: MAIL_ICON, route: "/settings/email" },
            { label: "LINE", icon: MESSAGE_CIRCLE_ICON, route: "/settings/line" },
            { label: "SMS", icon: PHONE_ICON, route: "/settings/sms" },
          ],
        },
        {
          label: "System",
          icon: SERVER_ICON,
          children: [
            { label: "Hosts", icon: SERVER_ICON, route: "/settings/host" },
            { label: "API", icon: API_ICON, route: "/settings/api" },
            { label: "Tokens", icon: KEY_ICON, route: "/settings/token" },
          ],
        },
      ],
    },
    {
      label: "Monitoring",
      icon: MONITORING_ICON,
      route: "/monitoring",
      children: [
        { label: "SmartHome", icon: MONITORING_ICON, route: "/monitoring/smarthome" },
        { label: "SmartCity", icon: MONITORING_ICON, route: "/monitoring/smartcity" },
        { label: "SmartMonitor", icon: MONITORING_ICON, route: "/monitoring/smartmonitor" },
        { label: "Industry", icon: MONITORING_ICON, route: "/monitoring/industry" },
        { label: "SmartSolarFarm", icon: MONITORING_ICON, route: "/monitoring/smartsolarfarm" },
      ],
    },
    {
      label: "Reports",
      icon: CLIPBOARD_ICON,
      route: "/reports",
      children: [
        {
          label: "Analytics",
          icon: CHART_AREA_ICON,
          children: [
            { label: "Overview", icon: CHART_AREA_ICON, route: "/analytics" },
            { label: "Data Analyst", icon: CHART_DOTS_2_ICON, route: "/analytics/analyst" },
          ],
        },
        {
          label: "Appearance",
          icon: PALETTE_ICON,
          children: [
            { label: "Theme", icon: PALETTE_ICON, route: "/settings/theme" },
            { label: "Language", icon: LANGUAGE_ICON, route: "/settings/language" },
          ],
        },
      ],
    },
    {
      label: "AI",
      icon: AI_ICON,
      route: "/ai-analytics",
      children: [
        {
          label: "Operations",
          icon: ROBOT_ICON,
          children: [
            { label: "Command Center", icon: ROBOT_ICON, route: "/ai-analytics/command-center" },
            { label: "Dashboard", icon: CHART_AREA_ICON, route: "/ai-analytics/dashboard" },
            { label: "Activity Log", icon: LIST_DETAILS_ICON, route: "/ai-analytics/logs" },
          ],
        },
        {
          label: "Automation",
          icon: WAVE_SQUARE_ICON,
          children: [
            { label: "Workflow AI", icon: WAVE_SQUARE_ICON, route: "/ai-analytics/workflow" },
            { label: "Schedule", icon: CALENDAR_EVENT_ICON, route: "/ai-analytics/schedule" },
            { label: "Alert Management", icon: BELL_ICON, route: "/ai-analytics/alerts" },
          ],
        },
        { label: "Reports", icon: FILE_INVOICE_ICON, route: "/ai-analytics/reports" },
        { label: "Data Analyst", icon: CHART_DOTS_2_ICON, route: "/ai-analytics/analyst" },
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
