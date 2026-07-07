import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageSelectorComponent } from '../../../../../shared/i18n/presentation/pages/language-selector/language-selector.component';
import { ThemeBuilderComponent } from '../../components/theme-builder/theme-builder.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, LanguageSelectorComponent, ThemeBuilderComponent],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {
  @HostBinding('class.page') pageClass = true;
}
