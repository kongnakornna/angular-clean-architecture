import { Component, HostBinding, inject } from '@angular/core';
import { ThemeSwitcherService } from '../../core/services/theme-switcher.service';
import { LayoutService } from '../../core/services/layout.service';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './app-layout.component.html',
})
export class AppLayoutComponent {
  @HostBinding('class.page') pageClass = true;
  @HostBinding('class.layout-fluid') get fluid() { return this.layout.snapshot.layoutMode === 'fluid'; }
  @HostBinding('class.layout-boxed') get boxed() { return this.layout.snapshot.layoutMode === 'boxed'; }
  @HostBinding('class.layout-rtl') get rtl() { return this.layout.snapshot.rtlMode; }

  private themeSwitcher = inject(ThemeSwitcherService);
  private layout = inject(LayoutService);

  isSidebarCollapsed = false;

  get isDarkMode(): boolean {
    return this.themeSwitcher.isDarkMode;
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    document.body.classList.toggle('sidebar-collapsed', this.isSidebarCollapsed);
  }

  get layoutMode() { return this.layout.snapshot.layoutMode; }
  get navbarPosition() { return this.layout.snapshot.navbarPosition; }
}
