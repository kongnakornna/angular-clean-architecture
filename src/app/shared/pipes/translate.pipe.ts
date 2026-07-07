import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({ name: 'translate', standalone: false })
export class TranslatePipe implements PipeTransform {
  private translate = inject(TranslateService);

  transform(value: string): string {
    return value ? this.translate.instant(value) : value;
  }
}
