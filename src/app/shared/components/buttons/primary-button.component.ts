import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  standalone: false,
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss'],
})
export class PrimaryButtonComponent {
  @Input() icon?: string;
  @Input() loading = false;
  @Input() disabled = false;
  @Output() onClick = new EventEmitter<Event>();
}
