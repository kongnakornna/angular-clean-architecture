import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { BaseLayoutComponent } from '../base/base.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';

@Component({
  selector: 'app-tabler-default-layout',
  standalone: true,
  imports: [NgIf, BaseLayoutComponent, NavbarComponent, SidebarComponent, FooterComponent, PageHeaderComponent],
  template: `
    <app-tabler-base-layout>
      <div class="page">
        <app-tabler-sidebar *ngIf="sidebar" [dark]="sidebarDark" [end]="sidebarEnd"></app-tabler-sidebar>

        <app-tabler-navbar [condensed]="condensed"
                           [dark]="navbarDark"
                           [sticky]="navbarSticky"
                           [overlap]="navbarOverlap"
                           [transparent]="navbarTransparent">
        </app-tabler-navbar>

        <div class="page-wrapper" [class.page-wrapper-full]="wrapperFull">
          <app-tabler-page-header *ngIf="title"
                                  [title]="title"
                                  [pretitle]="pretitle">
          </app-tabler-page-header>

          <main id="content" class="page-body">
            <div class="container-xl">
              <ng-content></ng-content>
            </div>
          </main>

          <app-tabler-footer></app-tabler-footer>
        </div>
      </div>
    </app-tabler-base-layout>
  `,
  styles: [`
    :host { display: contents; }
  `]
})
export class DefaultLayoutComponent {
  @Input() title = '';
  @Input() pretitle = '';
  @Input() sidebar = false;
  @Input() sidebarDark = true;
  @Input() sidebarEnd = false;
  @Input() condensed = false;
  @Input() navbarDark = false;
  @Input() navbarSticky = false;
  @Input() navbarOverlap = false;
  @Input() navbarTransparent = false;
  @Input() wrapperFull = false;
}
