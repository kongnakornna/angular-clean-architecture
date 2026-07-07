import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { LayoutService } from '../../../../../core/services/layout.service';

@Component({
  selector: 'app-theme-builder',
  standalone: true,
  imports: [NgFor],
  templateUrl: './theme-builder.component.html',
})
export class ThemeBuilderComponent {
  private layoutService = inject(LayoutService);

  theme = this.layoutService.theme;
  themePrimary = this.layoutService.themePrimary;
  themeFont = this.layoutService.themeFont;
  themeBase = this.layoutService.themeBase;
  themeRadius = this.layoutService.themeRadius;

  themes = [
    { key: 'blue', class: 'bg-blue' },
    { key: 'azure', class: 'bg-azure' },
    { key: 'indigo', class: 'bg-indigo' },
    { key: 'purple', class: 'bg-purple' },
    { key: 'pink', class: 'bg-pink' },
    { key: 'red', class: 'bg-red' },
    { key: 'orange', class: 'bg-orange' },
    { key: 'yellow', class: 'bg-yellow' },
    { key: 'lime', class: 'bg-lime' },
    { key: 'green', class: 'bg-green' },
    { key: 'teal', class: 'bg-teal' },
    { key: 'cyan', class: 'bg-cyan' },
  ];

  fonts = ['sans-serif', 'serif', 'monospace', 'comic'];
  bases = ['slate', 'gray', 'zinc', 'neutral', 'stone'];
  radii = ['0', '0.5', '1', '1.5', '2'];

  update(key: string, value: string): void {
    this.layoutService.update(key, value);
  }

  reset(): void {
    this.layoutService.reset();
  }
}
