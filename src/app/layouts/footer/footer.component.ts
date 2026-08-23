import { Component, computed, inject } from '@angular/core';
import { I18nService } from '../../shared/i18n/data/i18n.service';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  private i18nService = inject(I18nService);

  currentYear = new Date().getFullYear();
  displayYear = computed(() => (this.i18nService.lang() === 'th' ? this.currentYear + 543 : this.currentYear));
  appVersion = '1.0';
}
