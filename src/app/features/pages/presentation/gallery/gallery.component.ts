import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, TablerIconsModule],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent {}