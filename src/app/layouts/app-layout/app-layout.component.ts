import { Component, HostBinding, inject } from '@angular/core';
import { ThemeSwitcherService } from '../../core/services/theme-switcher.service';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './app-layout.component.html',
})
export class AppLayoutComponent {
  @HostBinding('class.page') pageClass = true;

  private themeSwitcher = inject(ThemeSwitcherService);

  isSidebarCollapsed = false;

  get isDarkMode(): boolean {
    return this.themeSwitcher.isDarkMode;
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    document.body.classList.toggle('sidebar-collapsed', this.isSidebarCollapsed);
  }
}
