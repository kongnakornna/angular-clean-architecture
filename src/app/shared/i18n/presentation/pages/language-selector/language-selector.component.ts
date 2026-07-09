import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
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
  imports: [NgFor],
  template: `
    <div class="dropdown">
      <button class="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-2"
              type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <img [src]="'assets/flags/' + currentCode + '.svg'" height="18" alt="">
        {{ currentName }}
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li *ngFor="let lang of languages">
          <a class="dropdown-item d-flex align-items-center gap-2"
             (click)="loadLanguage(lang.code)"
             data-bs-toggle="dropdown">
            <img [src]="'assets/flags/' + lang.code + '.svg'" height="18" alt="">
            {{ lang.name }}
          </a>
        </li>
      </ul>
    </div>
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