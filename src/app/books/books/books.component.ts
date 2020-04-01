import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../shared/services/books-service/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent implements OnInit {

  allBooks: any = {};

  constructor(private booksService: BooksService) { }

  ngOnInit() {
    this.booksService.getAllBooks().subscribe(data => {
      console.log(data);
      this.allBooks = data;
    });
  }

}
