import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { LayoutService } from '../../../../../core/services/layout.service';
import { AppTranslatePipe } from '../../../../../shared/i18n/presentation/pipes/translate.pipe';

@Component({
  selector: 'app-theme-builder',
  standalone: true,
  imports: [NgFor, AppTranslatePipe],
  templateUrl: './theme-builder.component.html',
  styleUrls: ['./theme-builder.component.scss'],
})
export class ThemeBuilderComponent {
  private layoutService = inject(LayoutService);

  theme = this.layoutService.theme;
  themePrimary = this.layoutService.themePrimary;
  themeFont = this.layoutService.themeFont;
  themeBase = this.layoutService.themeBase;
  themeRadius = this.layoutService.themeRadius;

  themes = [
    { key: 'blue', class: 'bg-blue', labelKey: 'layout.settings.colorBlue' },
    { key: 'azure', class: 'bg-azure', labelKey: 'layout.settings.colorAzure' },
    { key: 'indigo', class: 'bg-indigo', labelKey: 'layout.settings.colorIndigo' },
    { key: 'purple', class: 'bg-purple', labelKey: 'layout.settings.colorPurple' },
    { key: 'pink', class: 'bg-pink', labelKey: 'layout.settings.colorPink' },
    { key: 'red', class: 'bg-red', labelKey: 'layout.settings.colorRed' },
    { key: 'orange', class: 'bg-orange', labelKey: 'layout.settings.colorOrange' },
    { key: 'yellow', class: 'bg-yellow', labelKey: 'layout.settings.colorYellow' },
    { key: 'lime', class: 'bg-lime', labelKey: 'layout.settings.colorLime' },
    { key: 'green', class: 'bg-green', labelKey: 'layout.settings.colorGreen' },
    { key: 'teal', class: 'bg-teal', labelKey: 'layout.settings.colorTeal' },
    { key: 'cyan', class: 'bg-cyan', labelKey: 'layout.settings.colorCyan' },
  ];

  fonts = [
    { key: 'sans-serif', labelKey: 'layout.settings.fontSansSerif' },
    { key: 'serif', labelKey: 'layout.settings.fontSerif' },
    { key: 'monospace', labelKey: 'layout.settings.fontMonospace' },
    { key: 'comic', labelKey: 'layout.settings.fontComic' },
  ];

  bases = ['slate', 'gray', 'zinc', 'neutral', 'stone'];
  radii = ['0', '0.5', '1', '1.5', '2'];

  update(key: string, value: string): void {
    this.layoutService.update(key, value);
  }

  reset(): void {
    this.layoutService.reset();
  }
}