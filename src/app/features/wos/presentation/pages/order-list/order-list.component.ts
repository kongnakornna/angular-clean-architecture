import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './order-list.component.html',
})
export class OrderListComponent {}
