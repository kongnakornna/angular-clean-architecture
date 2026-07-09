import { Component, HostBinding, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { ThemeBuilderComponent } from '../../components/theme-builder/theme-builder.component';
import { LanguageSelectorComponent } from '../../../../../shared/i18n/presentation/pages/language-selector/language-selector.component';
import { LayoutService } from '../../../../../core/services/layout.service';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, ThemeBuilderComponent, LanguageSelectorComponent, NgIf],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
})
export class AuthLayoutComponent {
  layoutService = inject(LayoutService);
  @HostBinding('class.page') pageClass = true;
}