import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';
import { LanguageSelectorComponent } from '../../../../../shared/i18n/presentation/pages/language-selector/language-selector.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, TablerIconComponent, LanguageSelectorComponent],
  template: `
<div class="page page-center">
  <div class="container container-tight py-4">
    <div class="text-center mb-4">
      <a href="/" class="navbar-brand navbar-brand-autodark">
        <i-tabler name="layout-dashboard" class="navbar-brand-image"></i-tabler>
        iCmon
      </a>
    </div>
    <div class="text-end mb-2">
      <app-language-selector></app-language-selector>
    </div>
    <router-outlet></router-outlet>
  </div>
</div>
  `,
})
export class AuthLayoutComponent {
  @HostBinding('class.page') pageClass = true;
}