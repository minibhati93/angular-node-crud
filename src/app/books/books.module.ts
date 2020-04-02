import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';

import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';

import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    BooksComponent,
    BookDetailComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    NgxPaginationModule
  ]
})
export class BooksModule { }
