import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-settings-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, TablerIconComponent, TranslatePipe],
  templateUrl: './settings-layout.component.html',
  styleUrls: ['./settings-layout.component.scss'],
})
export class SettingsLayoutComponent {
  menuItems = [
    { route: '/settings/schedule', icon: 'calendar-event', labelKey: 'settings.menu.schedule' },
    { route: '/settings/alarm', icon: 'bell', labelKey: 'settings.menu.alarm' },
    { route: '/settings/influxdb', icon: 'database', labelKey: 'settings.menu.influxdb' },
    { route: '/settings/devices', icon: 'device-desktop', labelKey: 'settings.menu.devices' },
    { route: '/settings/locations', icon: 'map-pin', labelKey: 'settings.menu.locations' },
    { route: '/settings/hardware', icon: 'cpu', labelKey: 'settings.menu.hardware' },
    { route: '/settings/sensors', icon: 'thermometer', labelKey: 'settings.menu.sensors' },
    { route: '/settings/nodered', icon: 'server', labelKey: 'settings.menu.nodered' },
    { route: '/settings/mqtt', icon: 'radio', labelKey: 'settings.menu.mqtt' },
    { route: '/settings/email', icon: 'mail', labelKey: 'settings.menu.email' },
    { route: '/settings/line', icon: 'message-circle', labelKey: 'settings.menu.line' },
    { route: '/settings/sms', icon: 'phone', labelKey: 'settings.menu.sms' },
    { route: '/settings/hosts', icon: 'server', labelKey: 'settings.menu.hosts' },
    { route: '/settings/api', icon: 'api', labelKey: 'settings.menu.api' },
    { route: '/settings/tokens', icon: 'key', labelKey: 'settings.menu.tokens' },
  ];
}
