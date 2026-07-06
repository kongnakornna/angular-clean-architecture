import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { TablerIconsModule } from 'angular-tabler-icons';

import { REPOSITORY_PROVIDERS } from './core/di/providers';
import { AUTH_REPOSITORY } from './core/di/tokens';
import { DemoAuthRepositoryImpl } from './features/auth/data/repositories/auth.repository.demo';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    AppLayoutComponent,
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
  ],
  providers: [
    ...REPOSITORY_PROVIDERS,
    ...(environment.demo ? [{ provide: AUTH_REPOSITORY, useClass: DemoAuthRepositoryImpl }] : []),
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
