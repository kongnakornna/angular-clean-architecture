import { Component, OnInit } from '@angular/core';

import { PageSeoService } from './core/services/page-seo.service';
import { ThemeSwitcherService } from './core/services/theme-switcher.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public themePref$ = this.themeService.pref$;

  public constructor(
    private themeService: ThemeSwitcherService,
    private seoService: PageSeoService
  ) {}

  ngOnInit(): void {
    this.seoService.setSEO();
  }
}
