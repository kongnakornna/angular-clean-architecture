import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';
import { LanguageSelectorComponent } from '../../../../../shared/i18n/presentation/pages/language-selector/language-selector.component';
import { ThemeBuilderComponent } from '../../components/theme-builder/theme-builder.component';
import { AppTranslatePipe } from '../../../../../shared/i18n/presentation/pipes/translate.pipe';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, TablerIconComponent, LanguageSelectorComponent, ThemeBuilderComponent, AppTranslatePipe],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {
  @HostBinding('class.page') pageClass = true;
}
