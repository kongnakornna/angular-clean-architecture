import { Pipe, PipeTransform, inject } from '@angular/core';
import { I18nService } from '../../data/i18n.service';

@Pipe({
  name: 'appTranslate',
  standalone: true,
  pure: false,
})
export class AppTranslatePipe implements PipeTransform {
  private i18n = inject(I18nService);

  transform(key: string): string {
    return this.i18n.translate(key);
  }
}
