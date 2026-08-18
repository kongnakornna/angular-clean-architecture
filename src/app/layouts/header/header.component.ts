import { Component, inject } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { LayoutService } from "../../core/services/layout.service";

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
  private expIcon = ``;
  private invoiceIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-file-invoice">
	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<path d="M12 2l.117 .007a1 1 0 0 1 .876 .876l.007 .117v4l.005 .15a2 2 0 0 0 1.838 1.844l.157 .006h4l.117 .007a1 1 0 0 1 .876 .876l.007 .117v9a3 3 0 0 1 -2.824 2.995l-.176 .005h-10a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-14a3 3 0 0 1 2.824 -2.995l.176 -.005zm4 15h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0 -2m0 -4h-8a1 1 0 0 0 0 2h8a1 1 0 0 0 0 -2m-7 -7h-1a1 1 0 1 0 0 2h1a1 1 0 1 0 0 -2" />
	<path d="M19 7h-4l-.001 -4.001z" />
</svg>`;
  private themeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-adjustments-pause">
    	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
    	<path d="M4 10a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
    	<path d="M6 4v4" />
    	<path d="M6 12v8" />
    	<path d="M13.627 14.836a2 2 0 1 0 -.62 2.892" />
    	<path d="M12 4v10" />
    	<path d="M12 18v2" />
    	<path d="M16 7a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
    	<path d="M18 4v1" />
    	<path d="M17 17v5" />
    	<path d="M21 17v5" />
    	<path d="M18 9v4.5" />
    </svg>`;
  private languageIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-language">
    	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
    	<path d="M9 6.371c0 4.418 -2.239 6.629 -5 6.629" />
    	<path d="M4 6.371h7" />
    	<path d="M5 9c0 2.144 2.252 3.908 6 4" />
    	<path d="M12 20l4 -9l4 9" />
    	<path d="M19.1 18h-6.2" />
    	<path d="M6.694 3l.793 .582" />
    </svg>`;
  private AnalyticsIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-chart-area">
    	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
    	<path d="M20 18a1 1 0 0 1 .117 1.993l-.117 .007h-16a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" />
    	<path d="M15.22 5.375a1 1 0 0 1 1.393 -.165l.094 .083l4 4a1 1 0 0 1 .284 .576l.009 .131v5a1 1 0 0 1 -.883 .993l-.117 .007h-16.022l-.11 -.009l-.11 -.02l-.107 -.034l-.105 -.046l-.1 -.059l-.094 -.07l-.06 -.055l-.072 -.082l-.064 -.089l-.054 -.096l-.016 -.035l-.04 -.103l-.027 -.106l-.015 -.108l-.004 -.11l.009 -.11l.019 -.105c.01 -.04 .022 -.077 .035 -.112l.046 -.105l.059 -.1l4 -6a1 1 0 0 1 1.165 -.39l.114 .05l3.277 1.638l3.495 -4.369z" />
    </svg>`;
  private invoicesIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-file-invoice">
        	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
        	<path d="M12 2l.117 .007a1 1 0 0 1 .876 .876l.007 .117v4l.005 .15a2 2 0 0 0 1.838 1.844l.157 .006h4l.117 .007a1 1 0 0 1 .876 .876l.007 .117v9a3 3 0 0 1 -2.824 2.995l-.176 .005h-10a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-14a3 3 0 0 1 2.824 -2.995l.176 -.005zm4 15h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0 -2m0 -4h-8a1 1 0 0 0 0 2h8a1 1 0 0 0 0 -2m-7 -7h-1a1 1 0 1 0 0 2h1a1 1 0 1 0 0 -2" />
        	<path d="M19 7h-4l-.001 -4.001z" />
        </svg>`;
  private batchIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-file-time">
    	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
    	<path d="M12 2l.117 .007a1 1 0 0 1 .876 .876l.007 .117v4l.005 .15a2 2 0 0 0 1.838 1.844l.157 .006h4l.117 .007a1 1 0 0 1 .876 .876l.007 .117v9a3 3 0 0 1 -2.824 2.995l-.176 .005h-10a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-14a3 3 0 0 1 2.824 -2.995l.176 -.005zm0 8a5 5 0 0 0 -4.995 4.783l-.005 .217a5 5 0 1 0 5 -5m0 2a3 3 0 1 1 0 6a3 3 0 0 1 0 -6m0 .496a1 1 0 0 0 -1 1v1.504a1 1 0 0 0 .293 .707l1 1a1 1 0 0 0 1.414 0l.083 -.094a1 1 0 0 0 -.083 -1.32l-.707 -.708v-1.089a1 1 0 0 0 -1 -1" />
    	<path d="M19 7h-4l-.001 -4.001z" />
    </svg>`;
  private iotIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-satellite">
        	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
        	<path d="M21 14a1 1 0 0 1 1 1a7 7 0 0 1 -7 7a1 1 0 0 1 0 -2a5 5 0 0 0 5 -5a1 1 0 0 1 1 -1m-4 -.5a1 1 0 0 1 1 1a3.5 3.5 0 0 1 -3.5 3.5a1 1 0 0 1 -.117 -1.993l.117 -.007a1.5 1.5 0 0 0 1.493 -1.356l.007 -.144a1 1 0 0 1 1 -1m-13.829 -2.087l4 4.001q .212 .212 .445 .384l-.909 .91a1 1 0 0 1 -1.414 0l-3 -3a1 1 0 0 1 0 -1.415zm5.243 -8.413l5.586 5.586a2 2 0 0 1 0 2.828l-.586 .585l.793 .794a1 1 0 0 1 -1.414 1.414l-.793 -.794l-.586 .587a2 2 0 0 1 -2.828 0l-5.586 -5.586a2 2 0 0 1 -.18 -2.618l.127 -.152l.053 -.058l2.586 -2.586a2 2 0 0 1 2.828 0m5.293 -.707l3 3a1 1 0 0 1 0 1.414l-.908 .91a4 4 0 0 0 -.384 -.445l-4.001 -4l.879 -.88a1 1 0 0 1 1.414 0" />
        </svg>`;

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
    { label: "Profile", icon: "user", route: "/profile" },
    { label: "Analytics", icon: "chart-pie", route: "/analytics" },
    { divider: true },
    { label: "Settings & Privacy", route: "/settings" },
    { label: "Help" },
    { label: "Lock Screen", route: "lock-screen" },
    { label: "Sign out", action: "logout" },
  ];

  apps: MenuItem[] = [
    { label: "Dashboard", icon: "layout-dashboard", route: "/dashboard" },
    { label: "Customers", icon: "users", route: "/customers" },
    { label: "Quotations", icon: "file-text", route: "/quotations" },
    {
      label: "Purchase Orders",
      icon: "shopping-cart",
      route: "/purchase-orders",
    },
    { label: "Products", icon: "package", route: "/products" },
    { label: "Payments", icon: "credit-card", route: "/payments" },
    { label: "Documents", icon: "folder", route: "/documents" },
    { label: "Job Cards", icon: this.invoiceIcon, route: "/jobs" },
    { label: "Work Orders", icon: "clipboard", route: "/wos/orders" },
    { label: "Batch Jobs", icon: this.batchIcon, route: "/batch/jobs" },
    { label: "IoT Devices", icon: this.invoiceIcon, route: "/iot/devices" },
    { label: "Analytics", icon: this.invoiceIcon, route: "/analytics" },
    { label: "Reports", icon: this.invoiceIcon, route: "/reports" },
    { label: "Email", icon: this.invoiceIcon, route: "/email/templates" },
    { label: "Languages", icon: this.invoiceIcon, route: "/i18n/languages" },
    { label: "Users", icon: "user", route: "/users" },
  ];

  horizontalMenu: MenuItem[] = [
    { label: "Dashboard", icon: "layout-dashboard", route: "/dashboard" },
    {
      label: "IoT",
      icon: this.iotIcon,
      route: "/iot/devices",
      children: [
        { label: "Devices", icon: this.AnalyticsIcon, route: "/iot/devices" },
        { label: "IoT Settings", icon: this.themeIcon, route: "/iot/settings" },
        {
          label: "IoT Reports",
          icon: this.languageIcon,
          route: "/iot/reports",
        },
      ],
    },
    {
      label: "Customers",
      icon: "users",
      route: "/customers",
      children: [
        { label: "Users", icon: "user", route: "/users" },
        { label: "Roles", icon: "shield", route: "/roles" },
        { label: "Customer List", icon: "list", route: "/customers" },
        { label: "Customer Create", icon: "plus", route: "/customers/create" },
      ],
    },
    {
      label: "Service",
      icon: "list",
      route: "/payments",
      children: [
        { label: "Payments", icon: "credit-card", route: "/payments" },
        { label: "Invoices", icon: this.invoicesIcon, route: "/invoices" },
        { label: "Job Cards", icon: this.invoiceIcon, route: "/jobs" },
        { label: "Work Orders", icon: "clipboard", route: "/wos/orders" },
        { label: "Batch Jobs", icon: this.invoiceIcon, route: "/batch/jobs" },
        { label: "Quotations", icon: "file-text", route: "/quotations" },
        {
          label: "Purchase Orders",
          icon: "shopping-cart",
          route: "/purchase-orders",
        },
        { label: "Products", icon: "package", route: "/products" },
        {
          label: "Email Templates",
          icon: "clipboard",
          route: "/email/templates",
        },
        { label: "Email Compose", icon: "pencil", route: "/email/compose" },
        { label: "Email Logs", icon: "clipboard", route: "/email/logs" },
      ],
    },
    {
      label: "Settings",
      icon: "settings",
      route: "/settings/theme",
      children: [
        {
          label: "Languages",
          icon: this.languageIcon,
          route: "/i18n/languages",
        },
      ],
    },
    {
      label: "Reports",
      icon: "clipboard",
      route: "/reports",
      children: [
        { label: "Analytics", icon: this.AnalyticsIcon, route: "/analytics" },
        { label: "Theme", icon: this.themeIcon, route: "/settings/theme" },
        {
          label: "Language",
          icon: this.languageIcon,
          route: "/settings/language",
        },
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
