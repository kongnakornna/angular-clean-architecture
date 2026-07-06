import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-po-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './po-list.component.html',
})
export class POListComponent {}
