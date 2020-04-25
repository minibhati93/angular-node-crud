import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';

import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { HeaderComponent} from '../shared/header/header.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { HomeComponent } from './home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BooksComponent,
    BookDetailComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BooksModule { }
