import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent {
  @HostBinding('class.page') pageClass = true;

  isSidebarCollapsed = false;
  isSidebarEnd = false;
  isSidebarDark = false;
  sidebarBackground = '';

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    document.body.classList.toggle('sidebar-collapsed', this.isSidebarCollapsed);
  }
}