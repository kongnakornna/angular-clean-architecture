import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutService } from '../../../../../core/services/layout.service';
import { AppTranslatePipe } from '../../../../../shared/i18n/presentation/pipes/translate.pipe';

@Component({
  selector: 'app-theme-builder',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, AppTranslatePipe],
  templateUrl: './theme-builder.component.html',
})
export class ThemeBuilderComponent {
  private layoutService = inject(LayoutService);

  theme = this.layoutService.theme;
  fontFamily = this.layoutService.fontFamily;
  themeBase = this.layoutService.themeBase;
  borderRadius = this.layoutService.borderRadius;
  rtlMode = this.layoutService.rtlMode;

  themes = [
    { key: 'blue', label: 'layout.settings.colorBlue' },
    { key: 'azure', label: 'layout.settings.colorAzure' },
    { key: 'indigo', label: 'layout.settings.colorIndigo' },
    { key: 'purple', label: 'layout.settings.colorPurple' },
    { key: 'pink', label: 'layout.settings.colorPink' },
    { key: 'red', label: 'layout.settings.colorRed' },
    { key: 'orange', label: 'layout.settings.colorOrange' },
    { key: 'yellow', label: 'layout.settings.colorYellow' },
    { key: 'lime', label: 'layout.settings.colorLime' },
    { key: 'green', label: 'layout.settings.colorGreen' },
    { key: 'teal', label: 'layout.settings.colorTeal' },
    { key: 'cyan', label: 'layout.settings.colorCyan' },
  ];

  fonts = [
    { key: 'sans-serif', label: 'layout.settings.fontSansSerif' },
    { key: 'serif', label: 'layout.settings.fontSerif' },
    { key: 'monospace', label: 'layout.settings.fontMonospace' },
    { key: 'comic', label: 'layout.settings.fontComic' },
  ];

  bases = [
    { key: 'slate', label: 'Slate' },
    { key: 'dark', label: 'Dark' },
  ];

  updateTheme(key: string): void {
    this.layoutService.update('theme', key);
  }

  updateFont(key: string): void {
    this.layoutService.update('theme-font', key);
  }

  updateBase(key: string): void {
    this.layoutService.update('theme-base', key);
  }

  updateRadius(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.layoutService.update('theme-radius', value);
  }

  toggleRtl(): void {
    this.layoutService.update('rtl-mode', this.rtlMode() === 'true' ? 'false' : 'true');
  }

  resetSettings(): void {
    this.layoutService.reset();
  }
}
