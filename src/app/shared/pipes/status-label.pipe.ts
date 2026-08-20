import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Helpers } from '../../core/utils/helpers';

@Pipe({ name: 'statusLabel', standalone: false })
export class StatusLabelPipe implements PipeTransform {
  private translate = inject(TranslateService);

  transform(value: string): string {
    const key = Helpers.getStatusLabel(value);
    return this.translate.instant(key);
  }
}
