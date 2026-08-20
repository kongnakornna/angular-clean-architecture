import { Component, HostBinding, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent {
  @HostBinding('class.page') pageClass = true;

  private router = inject(Router);

  isSettingsPage = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects.startsWith('/settings')),
    ),
    { initialValue: this.router.url.startsWith('/settings') },
  );

  isMonitoringPage = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects.startsWith('/monitoring')),
    ),
    { initialValue: this.router.url.startsWith('/monitoring') },
  );
}
