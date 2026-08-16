import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { LayoutService } from '../../core/services/layout.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-layout-settings',
  standalone: true,
  imports: [NgFor, TranslatePipe],
  templateUrl: './layout-settings.component.html',
  styleUrls: ['./layout-settings.component.scss'],
})
export class LayoutSettingsComponent {
  protected layout = inject(LayoutService);

  themes = [
    { key: 'blue', class: 'bg-blue', label: 'layout.settings.colorBlue' },
    { key: 'azure', class: 'bg-azure', label: 'layout.settings.colorAzure' },
    { key: 'indigo', class: 'bg-indigo', label: 'layout.settings.colorIndigo' },
    { key: 'purple', class: 'bg-purple', label: 'layout.settings.colorPurple' },
    { key: 'pink', class: 'bg-pink', label: 'layout.settings.colorPink' },
    { key: 'red', class: 'bg-red', label: 'layout.settings.colorRed' },
    { key: 'orange', class: 'bg-orange', label: 'layout.settings.colorOrange' },
    { key: 'yellow', class: 'bg-yellow', label: 'layout.settings.colorYellow' },
    { key: 'lime', class: 'bg-lime', label: 'layout.settings.colorLime' },
    { key: 'green', class: 'bg-green', label: 'layout.settings.colorGreen' },
    { key: 'teal', class: 'bg-teal', label: 'layout.settings.colorTeal' },
    { key: 'cyan', class: 'bg-cyan', label: 'layout.settings.colorCyan' },
  ];
  fonts = [
    { key: 'sans-serif', label: 'layout.settings.fontSansSerif' },
    { key: 'serif', label: 'layout.settings.fontSerif' },
    { key: 'monospace', label: 'layout.settings.fontMonospace' },
    { key: 'comic', label: 'layout.settings.fontComic' },
  ];
  bases = ['slate', 'gray', 'zinc', 'neutral', 'stone'];
  radii = ['0', '0.5', '1', '1.5', '2'];

  reset(): void {
    this.layout.reset();
  }

  update(key: string, value: string): void {
    this.layout.update(key, value);
  }
}
