import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'library', pathMatch: 'full'},
  {path: 'books', loadChildren: './books/books.module#BooksModule'},
  {path: 'library', loadChildren: './library/library.module#LibraryModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
