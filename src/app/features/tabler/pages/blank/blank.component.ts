import { Component } from '@angular/core';
import { DefaultLayoutComponent } from '../../layouts/default/default.component';

@Component({
  selector: 'app-tabler-blank-page',
  standalone: true,
  imports: [DefaultLayoutComponent],
  template: `
    <app-tabler-default-layout title="Blank page" pretitle="Page title">
      <div class="card">
        <div class="card-body">
          <p class="text-secondary">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias cumque doloremque
            eaque est excepturi ipsam iste iusto, magni odit optio pariatur perspiciatis quas recusandae
            saepe sapiente ut velit voluptate?
          </p>
        </div>
      </div>
    </app-tabler-default-layout>
  `,
  styles: [`
    :host { display: contents; }
  `]
})
export class BlankPageComponent {}
