import { Pipe, PipeTransform } from '@angular/core';
import { Formatters } from '../../core/utils/formatters';

@Pipe({ name: 'fileSize', standalone: false })
export class FileSizePipe implements PipeTransform {
  transform(bytes: number): string {
    return Formatters.fileSize(bytes);
  }
}
