import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, TablerIconComponent],
  template: `
<div class="page page-center">
  <div class="container container-tight py-4">
    <div class="text-center mb-4">
      <a href="/" class="navbar-brand navbar-brand-autodark">
        <i-tabler name="layout-dashboard" class="navbar-brand-image"></i-tabler>
        iCmon
      </a>
    </div>
    <router-outlet></router-outlet>
  </div>
</div>
  `,
})
export class AuthLayoutComponent {
  @HostBinding('class.page') pageClass = true;
}
