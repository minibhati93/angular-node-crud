import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BooksService } from '../../shared/services/books-service/books.service';
import { ContentviewService } from '../../shared/services/content-view-service/contentview.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class BooksComponent implements OnInit {

  allBooks: any = [];
  p = 1;
  viewType = 'thumbnail';

  constructor(private booksService: BooksService,
              private contentView: ContentviewService) { }

  ngOnInit() {
    this.booksService.getAllBooks().subscribe(data => {
      this.allBooks = data;
    });
    this.contentView.contentViewType$.subscribe(viewType$ => this.viewType = viewType$);
  }

}
