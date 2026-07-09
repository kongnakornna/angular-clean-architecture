import { Component, inject } from '@angular/core';
import { I18nService } from '../../../data/i18n.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  template: `
    <div class="language-switcher">
          <a href="javascript:void(0)" (click)="i18n.loadLanguage('en')">
            <img src="assets/lang/en.svg" height="25" title="English">
          </a>
          <a href="javascript:void(0)" (click)="i18n.loadLanguage('th')">
            <img src="assets/lang/th.svg" height="25" title="ไทย">
          </a>
    </div>
    <br>
  `,
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent {
  protected i18n = inject(I18nService);
}
