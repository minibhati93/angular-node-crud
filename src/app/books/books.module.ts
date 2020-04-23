import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';

import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { HeaderComponent} from '../shared/header/header.component';

import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    BooksComponent,
    BookDetailComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    NgxPaginationModule
  ]
})
export class BooksModule { }
