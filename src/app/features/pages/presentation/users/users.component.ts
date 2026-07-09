import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, TablerIconsModule],
  templateUrl: './users.component.html',
})
export class UsersComponent {}