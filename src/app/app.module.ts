import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { LayoutSettingsComponent } from './layouts/layout-settings/layout-settings.component';
import { PageHeaderComponent } from './layouts/page-header/page-header.component';
import { TranslatePipe } from './shared/pipes/translate.pipe';
import { LanguageSelectorComponent } from './shared/i18n/presentation/pages/language-selector/language-selector.component';
import { TablerIconsModule, provideTablerIcons } from 'angular-tabler-icons';
import {
  IconLayoutDashboard, IconClipboard, IconList, IconLayoutKanban, IconPlus,
  IconUsers, IconFileText, IconShoppingCart, IconPackage, IconCreditCard,
  IconFolder, IconDeviceDesktop, IconShoppingBag, IconSettings, IconUserCircle,
  IconShield, IconMenu2, IconBell, IconUser, IconLogout,
  IconEye, IconEyeOff, IconBrandGithub, IconBrandX,
  IconActivity, IconMessage, IconChecklist, IconHelpCircle, IconPhoto,
  IconReport, IconLicense, IconListCheck, IconCurrencyDollar, IconGridDots,
  IconApps, IconUserPlus, IconFileCheck, IconAlertTriangle, IconClipboardCheck,
  IconSend, IconMessageCircle, IconCheck, IconCircleCheck, IconClock, IconLayout,
} from 'angular-tabler-icons/icons';

import { REPOSITORY_PROVIDERS } from './core/di/providers';
import { AUTH_REPOSITORY } from './core/di/tokens';
import { DemoAuthRepositoryImpl } from './features/auth/data/repositories/auth.repository.demo';
import { environment } from '../environments/environment';
import { APP_CONFIG, DEFAULT_APP_CONFIG } from './core/config/app.config';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    AppLayoutComponent,
    PageHeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    TablerIconsModule,
    LanguageSelectorComponent,
    TranslatePipe,
    LayoutSettingsComponent,
  ],
  providers: [
    ...REPOSITORY_PROVIDERS,
    ...(environment.demo ? [{ provide: AUTH_REPOSITORY, useClass: DemoAuthRepositoryImpl }] : []),
    { provide: APP_CONFIG, useValue: { ...DEFAULT_APP_CONFIG, apiBaseUrl: environment.apiBaseUrl, production: environment.production } },
    provideTablerIcons({
      IconLayoutDashboard, IconClipboard, IconList, IconLayoutKanban, IconPlus,
      IconUsers, IconFileText, IconShoppingCart, IconPackage, IconCreditCard,
      IconFolder, IconDeviceDesktop, IconShoppingBag, IconSettings, IconUserCircle,
      IconShield, IconMenu2, IconBell, IconUser, IconLogout,
      IconEye, IconEyeOff, IconBrandGithub, IconBrandX,
      IconActivity, IconMessage, IconChecklist, IconHelpCircle, IconPhoto,
      IconReport, IconLicense, IconListCheck, IconCurrencyDollar, IconGridDots,
      IconApps, IconUserPlus, IconFileCheck, IconAlertTriangle, IconClipboardCheck,
      IconSend, IconMessageCircle, IconCheck, IconCircleCheck, IconClock, IconLayout,
    }),
    provideTranslateService({ fallbackLang: 'en', lang: 'en' }),
    provideTranslateHttpLoader({ prefix: 'assets/i18n/', suffix: '.json' }),
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
