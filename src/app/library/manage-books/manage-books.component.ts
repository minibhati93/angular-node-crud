import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { BooksService } from 'src/app/shared/services/books-service/books.service';
import { ManageBooksService } from '../lib-services/services/manage-books/manage-books.service';
import { AuthService } from '../lib-services/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.sass'],
  providers: []
})
export class ManageBooksComponent implements OnInit {

  allBooks: any = [];
  dummyImgUrl = 'https://dummyimage.com/600x400/cccccc/000000.jpg&text=No+Cover';
  inProgressCount: number;
  completedCount = 0;
  selectedItem: any = [];
  currentState = 'all';
  viewType = 'thumbnail';

  constructor(private booksService: BooksService,
              private manageBooksService: ManageBooksService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.currentState = this.route.snapshot.paramMap.get('state');
    const userId = this.authService.currentUserValue;
    if (this.currentState === 'all') {
      this.booksService.getAllBooks().subscribe(data => this.allBooks = data);
    } else {
      this.manageBooksService.getBooksByStatus(userId.username, this.currentState).subscribe((data: any) => this.allBooks = data.response);
    }
  }

  isClicked(id: any) {
    return this.selectedItem.find( book => book.bookId === id );
  }

  selectItemOnDblClick(book: { _id: any; }) {
    const unreadStack = {
      bookId: book._id,
      addedOn: new Date(),
      modifiedOn: new Date(),
      completionStatus: 0
    };
    this.selectedItem.push(unreadStack);
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
