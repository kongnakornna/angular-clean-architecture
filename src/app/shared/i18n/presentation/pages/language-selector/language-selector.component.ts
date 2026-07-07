import { Component, inject } from '@angular/core';
import { I18nService } from '../../../data/i18n.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  template: `
    <select class="form-select form-select-sm w-auto" [value]="i18n.lang()" (change)="i18n.loadLanguage($any($event).target.value)">
      <option value="en">English</option>
      <option value="th">ไทย</option>
    </select>
  `,
})
export class LanguageSelectorComponent {
  protected i18n = inject(I18nService);
}
