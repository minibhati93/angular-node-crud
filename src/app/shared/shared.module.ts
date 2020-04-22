import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksService } from './services/books-service/books.service';
import { ContentviewService } from './services/content-view-service/contentview.service';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
  ],
  providers: [
    BooksService,
    ContentviewService
  ],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule { }
