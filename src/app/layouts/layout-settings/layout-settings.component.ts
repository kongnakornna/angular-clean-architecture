import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { LayoutService, LayoutSettings } from '../../core/services/layout.service';

@Component({
  selector: 'app-layout-settings',
  standalone: false,
  templateUrl: './layout-settings.component.html',
})
export class LayoutSettingsComponent {
  private layout = inject(LayoutService);

  get s(): LayoutSettings { return this.layout.snapshot; }

  layoutModes = [
    { value: 'vertical', label: 'layout.settings.layoutVertical' },
    { value: 'fluid', label: 'layout.settings.layoutFluid' },
    { value: 'boxed', label: 'layout.settings.layoutBoxed' },
    { value: 'condensed', label: 'layout.settings.layoutCondensed' },
  ];
  colorSchemes = [
    { value: 'blue', label: 'น้ำเงิน' },
    { value: 'azure', label: 'ฟ้า' },
    { value: 'indigo', label: 'คราม' },
    { value: 'purple', label: 'ม่วง' },
    { value: 'pink', label: 'ชมพู' },
    { value: 'red', label: 'แดง' },
    { value: 'orange', label: 'ส้ม' },
    { value: 'yellow', label: 'เหลือง' },
    { value: 'lime', label: 'เขียวอ่อน' },
    { value: 'green', label: 'เขียว' },
    { value: 'teal', label: 'เขียวน้ำเงิน' },
    { value: 'cyan', label: 'ฟ้าอ่อน' },
  ];
  fontFamilies = [
    { value: 'sans-serif', label: 'Sans-serif' },
    { value: 'serif', label: 'Serif' },
    { value: 'monospace', label: 'Monospace' },
    { value: 'comic', label: 'Comic' },
  ];
  themeBases = [
    { value: 'slate', label: 'Slate' },
    { value: 'gray', label: 'Gray' },
    { value: 'zinc', label: 'Zinc' },
    { value: 'neutral', label: 'Neutral' },
    { value: 'stone', label: 'Stone' },
  ];
  radiusOptions = [0, 0.5, 1, 1.5, 2];

  update(key: keyof LayoutSettings, value: any): void {
    this.layout.update({ [key]: value });
  }

  reset(): void {
    this.layout.reset();
  }

  toggle(key: keyof LayoutSettings): void {
    this.layout.update({ [key]: !this.s[key] });
  }
}
