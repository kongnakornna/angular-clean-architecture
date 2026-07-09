import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeBuilderComponent } from '../../components/theme-builder/theme-builder.component';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, ThemeBuilderComponent, TablerIconsModule],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
})
export class AuthLayoutComponent {
  @HostBinding('class.page') pageClass = true;
}
