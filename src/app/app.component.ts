import { Component, OnInit } from '@angular/core';

import { PageSeoService } from './core/services/page-seo.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public constructor(
    private seoService: PageSeoService
  ) {}

  ngOnInit(): void {
    this.seoService.setSEO();
  }
}
