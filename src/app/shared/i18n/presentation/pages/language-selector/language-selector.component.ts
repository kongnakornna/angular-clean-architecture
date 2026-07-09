import { Component, inject, HostListener, ElementRef } from '@angular/core';
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
    <div class="dropdown" [class.show]="open">
      <button class="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-2"
              type="button" (click)="toggle()">
        <img [src]="'assets/flags/' + currentCode + '.svg'" height="18" alt="">
        {{ currentName }}
      </button>
      <ul class="dropdown-menu dropdown-menu-end" [class.show]="open">
        <li *ngFor="let lang of languages">
          <button class="dropdown-item d-flex align-items-center gap-2"
                  type="button"
                  (click)="selectLanguage(lang.code)">
            <img [src]="'assets/flags/' + lang.code + '.svg'" height="18" alt="">
            {{ lang.name }}
          </button>
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent {
  protected i18n = inject(I18nService);
  private el = inject(ElementRef);
  open = false;

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.open && !this.el.nativeElement.contains(event.target)) {
      this.open = false;
    }
  }

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

  toggle(): void {
    this.open = !this.open;
  }

  selectLanguage(code: SupportedLanguage): void {
    this.i18n.loadLanguage(code);
    this.open = false;
  }
}