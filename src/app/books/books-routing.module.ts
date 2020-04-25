import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent ,
    children: [
      { path: '', component: BooksComponent, pathMatch: 'full' },
      { path: 'edit', redirectTo: 'edit/', pathMatch: 'full'},
      { path: 'edit/:id', component: BookDetailComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
