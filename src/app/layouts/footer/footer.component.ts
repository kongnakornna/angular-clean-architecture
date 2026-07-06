import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styles: [`
    .footer { padding: 1rem 0; border-top: 1px solid var(--tblr-border-color); margin-top: auto; }
  `],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
