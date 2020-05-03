import { Component, OnInit, OnDestroy } from '@angular/core';
import { BooksService } from 'src/app/shared/services/books-service/books.service';
import { ManageBooksService } from '../lib-services/services/manage-books/manage-books.service';
import { AuthService } from '../lib-services/services/auth.service';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.sass'],
  providers: []
})
export class ManageBooksComponent implements OnInit {

  allBooks: any = [];
  dummyImgUrl = 'https://dummyimage.com/600x400/cccccc/000000.jpg&text=No+Cover';
  inProgressCount = 0;
  completedCount = 0;
  selectedItem: any = [];

  constructor(private booksService: BooksService,
              private manageBooksService: ManageBooksService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.booksService.getAllBooks().subscribe(data => {
      this.allBooks = data;
    });
  }

  isClicked(id) {
    return this.selectedItem.find( book => book.bookId === id );
  }

  selectItemOnDblClick(book) {
    const unreadStack = {
      bookId: book._id,
      addedOn: new Date(),
      modifiedOn: new Date(),
      completionStatus: 0
    };
    this.selectedItem.push(unreadStack);
    console.log(this.selectedItem.length);
  }

  addToInProgress() {
    const userId = this.authService.currentUserValue;
    if (this.selectedItem.length !== 0) {
      this.manageBooksService.addBooksToUnreadBucket(this.selectedItem, userId.username).subscribe(response => {
        console.log('in manage ', response);
      });
    }
  }

}
