import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { BooksService } from 'src/app/shared/services/books-service/books.service';
import { ManageBooksService } from '../lib-services/services/manage-books/manage-books.service';
import { AuthService } from '../lib-services/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.sass'],
  providers: []
})
export class ManageBooksComponent implements OnInit {

  allBooks: any = [];
  filteredBooksList = [];
  dummyImgUrl = 'https://dummyimage.com/600x400/cccccc/000000.jpg&text=No+Cover';
  inProgressCount: number;
  completedCount = 0;
  selectedItem: any = [];
  currentState = 'all';
  viewType = 'thumbnail';
  form: FormGroup;
  optionsList: any = [
    { id: 'title', name: 'Title' },
    { id: 'page', name: 'Pagecount' }
  ];
  selectedBook;

  constructor(private booksService: BooksService,
              private manageBooksService: ManageBooksService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.form = this.formBuilder.group({
        options: ['']
      });
  }

  ngOnInit() {
    this.currentState = this.route.snapshot.paramMap.get('state');
    if (this.currentState === 'all') {
      this.booksService.getAllBooks().subscribe(data => {
        this.allBooks = data;
        this.filteredBooksList = [...this.allBooks];
      });
    } else {
      this.manageBooksService.getBooksByStatus(this.currentState).subscribe((data: any) => this.allBooks = data.response);
    }
  }

  get options() {
    return this.form.get('options');
  }

  sortBy(e) {
    const sortByValue = e.target.value;
    this.options.setValue(sortByValue , {
      onlySelf: true
    });
    if (sortByValue === '') {
      this.filteredBooksList = [...this.allBooks];
    } else if (sortByValue === 'title') {
      this.filteredBooksList.sort((a, b) => a.title.localeCompare(b.title) );
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
    if (this.selectedItem.length !== 0) {
      this.manageBooksService.addBooksToUnreadBucket(this.selectedItem).subscribe(response => {
        console.log('in manage ', response);
      });
    }
  }

  openDetailedView(book) {
    this.selectedBook = book;
  }
}
