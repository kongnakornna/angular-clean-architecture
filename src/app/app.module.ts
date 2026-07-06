import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MarkdownModule } from 'ngx-markdown';

import { ToastService } from 'src/app/presenter/components/shared/toast/toast.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { DATA_BOOKMARK_IOC, DATA_POST_IOC, DATA_PROJECT_IOC } from './data/data.ioc';
import { PresenterModule } from './presenter/presenter.module';

import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';

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
    MarkdownModule.forRoot(),
    AppRoutingModule,
    PresenterModule,
    CoreModule,
    SharedModule,
  ],
  providers: [
    ...DATA_BOOKMARK_IOC,
    ...DATA_PROJECT_IOC,
    ...DATA_POST_IOC,
    ToastService,
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
