import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styles: [`
    .app-wrapper { display: flex; min-height: 100vh; }
    .page-wrapper { display: flex; flex-direction: column; flex: 1; min-height: 100vh; margin-left: 240px; background: var(--tblr-body-bg); transition: margin-left 0.3s ease; }
    .page-body { flex: 1; padding: 1.5rem 0; }
    .sidebar-collapsed .page-wrapper { margin-left: 60px; }
  `],
})
export class AppLayoutComponent {
  isSidebarCollapsed = false;

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    document.body.classList.toggle('sidebar-collapsed');
  }
}
