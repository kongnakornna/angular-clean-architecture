import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../data/i18n.service';
import type { SupportedLanguage } from '../../../domain/entities/translation.entity';

interface LangEntry {
  code: SupportedLanguage;
  name: string;
  flag: string;
}

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [NgFor, FormsModule],
  template: `
    <select class="form-select form-select-sm" [ngModel]="currentCode" (ngModelChange)="loadLanguage($event)">
      <option *ngFor="let lang of languages" [value]="lang.code">
        {{ lang.name }}
      </option>
    </select>
  `,
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent {
  protected i18n = inject(I18nService);

  languages: LangEntry[] = [
    { code: 'en', name: 'English', flag: 'us' },
    { code: 'th', name: 'ไทย', flag: 'th' },
    { code: 'zh', name: '中文', flag: 'cn' },
    { code: 'ja', name: '日本語', flag: 'jp' },
    { code: 'ko', name: '한국어', flag: 'kr' },
    { code: 'vi', name: 'Tiếng Việt', flag: 'vn' },
    { code: 'ms', name: 'Bahasa Melayu', flag: 'my' },
    { code: 'my', name: 'မြန်မာဘာသာ', flag: 'mm' },
    { code: 'km', name: 'ភាសាខ្មែរ', flag: 'kh' },
    { code: 'lo', name: 'ລາວ', flag: 'la' },
  ];

  get currentCode(): string {
    return this.i18n.lang();
  }

  get currentName(): string {
    const found = this.languages.find(l => l.code === this.currentCode);
    return found ? found.name : 'English';
  }

  loadLanguage(code: SupportedLanguage): void {
    this.i18n.loadLanguage(code);
  }
}