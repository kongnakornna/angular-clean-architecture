import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { TablerIconComponent } from 'angular-tabler-icons';
import { SetLanguageUseCase } from '../../../domain/use-cases/set-language.use-case';
import { GetAvailableLanguagesUseCase } from '../../../domain/use-cases/get-available-languages.use-case';
import { GetCurrentLanguageUseCase } from '../../../domain/use-cases/get-current-language.use-case';
import { LanguageOption } from '../../../domain/entities/translation.entity';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [NgFor, NgIf, TablerIconComponent],
  template: `
    <div class="nav-item dropdown">
      <a class="nav-link px-2 dropdown-toggle" data-bs-toggle="dropdown" href="javascript:void(0)" title="เปลี่ยนภาษา">
        <i-tabler name="language"></i-tabler>
        <span class="d-none d-md-inline ms-1">
          {{ currentLanguage?.flag }} {{ currentLanguage?.name }}
        </span>
      </a>
      <div class="dropdown-menu dropdown-menu-end">
        <a *ngFor="let lang of languages"
           class="dropdown-item"
           [class.active]="currentLanguage?.code === lang.code"
           (click)="setLanguage(lang.code)"
           href="javascript:void(0)">
          <i-tabler *ngIf="currentLanguage?.code === lang.code" name="check" class="dropdown-icon"></i-tabler>
          {{ lang.flag }} {{ lang.name }}
        </a>
      </div>
    </div>
  `,
})
export class LanguageSelectorComponent implements OnInit {
  private setLangUseCase = inject(SetLanguageUseCase);
  private getLangsUseCase = inject(GetAvailableLanguagesUseCase);
  private getCurrentLangUseCase = inject(GetCurrentLanguageUseCase);

  languages: LanguageOption[] = [];
  currentLanguage: LanguageOption | null = null;

  ngOnInit() {
    this.getLangsUseCase.execute().subscribe(langs => {
      this.languages = langs;
      const currentCode = this.getCurrentLangUseCase.execute();
      this.currentLanguage = langs.find(l => l.code === currentCode) || null;
    });
  }

  setLanguage(code: string) {
    this.setLangUseCase.execute(code as any);
    const lang = this.languages.find(l => l.code === code);
    if (lang) {
      this.currentLanguage = lang;
    }
  }
}