import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../shared/services/books-service/books.service';
import { BookInterface } from '../../shared/models/book.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent implements OnInit {

  allBooks: any = [];
  p = 1;

  constructor(private booksService: BooksService) { }

  ngOnInit() {
    this.booksService.getAllBooks().subscribe(data => {
      this.allBooks = data;
    });
  }

}
