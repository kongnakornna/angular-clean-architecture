import { Pipe, PipeTransform } from '@angular/core';
import { Helpers } from '../../core/utils/helpers';

@Pipe({ name: 'statusLabel' })
export class StatusLabelPipe implements PipeTransform {
  transform(value: string): string {
    return Helpers.getStatusLabel(value);
  }
}
