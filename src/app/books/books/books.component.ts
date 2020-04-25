import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BooksService } from '../../shared/services/books-service/books.service';
import { ContentviewService } from '../../shared/services/content-view-service/contentview.service';
import { BookInterface } from '../../shared/models/book.model';
import { Router } from '@angular/router';

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
              private contentView: ContentviewService,
              private router: Router) { }

  ngOnInit() {
    this.booksService.getAllBooks().subscribe(data => {
      this.allBooks = data;
    });
    this.contentView.contentViewType$.subscribe(viewType$ => this.viewType = viewType$);
  }

  editBook(book: BookInterface) {
    this.router.navigate(['/edit', book._id]);
  }

  deleteBook(book: BookInterface) {
    const id = book._id;
    this.booksService.deleteBook(book._id).subscribe(() => {
      const index = this.allBooks.findIndex( item => {
        return item._id === id;
      });
      this.allBooks.splice(index, 1);
    });
  }

}
