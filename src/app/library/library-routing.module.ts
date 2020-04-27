import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './lib-services/guards/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { ManageBooksComponent } from './manage-books/manage-books.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'prefix',
    canActivateChild: [AuthGuardService] ,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'manage', component: ManageBooksComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
