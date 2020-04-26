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


@NgModule({
  declarations: [HomeComponent, HeaderComponent, DashboardComponent, LoginComponent, ErrorComponent, AsideComponent],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    AuthService
  ]
})
export class LibraryModule { }
