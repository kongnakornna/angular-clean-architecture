import { Component, Input } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-page-header',
  standalone: false,
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() pretitle = '';
  @Input() description = '';
  @Input() icon = '';
  @Input() class = '';
  @Input() overlap = false;
  @Input() dark = false;
}
