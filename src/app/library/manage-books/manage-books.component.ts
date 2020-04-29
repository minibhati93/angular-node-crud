import { Component, OnInit, OnDestroy } from '@angular/core';
import { BooksService } from 'src/app/shared/services/books-service/books.service';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.sass'],
  providers: []
})
export class ManageBooksComponent implements OnInit {

  allBooks: any = [];
  dummyImgUrl = 'https://dummyimage.com/600x400/cccccc/000000.jpg&text=No+Cover';

  constructor(private booksService: BooksService,
              private dragulaService: DragulaService) {
  }

  ngOnInit() {
    this.booksService.getAllBooks().subscribe(data => {
      this.allBooks = data;
    });
  }

}
