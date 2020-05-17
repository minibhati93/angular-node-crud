import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LibraryRoutingModule } from './library-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './lib-services/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { AsideComponent } from './aside/aside.component';
import { SearchComponent } from './search/search.component';
import { ManageBooksComponent } from './manage-books/manage-books.component';
import { ChartsComponent } from './charts/charts.component';
import { DragulaModule, DragulaService } from 'ng2-dragula';
import { ToggleMenuService } from './lib-services/services/toggle-menu/toggle-menu.service';
import { SignupComponent } from './signup/signup.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthInterceptor } from './lib-services/helpers/auth.interceptor';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    DashboardComponent,
    LoginComponent,
    ErrorComponent,
    AsideComponent,
    SearchComponent, ManageBooksComponent, ChartsComponent, SignupComponent],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    FormsModule,
    DragulaModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    AuthService,
    DragulaService,
    ToggleMenuService,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
  ]
})
export class LibraryModule { }
