import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BookInterface } from 'src/app/shared/models/book.model';
import { BooksService } from '../../shared/services/books-service/books.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.sass']
})
export class BookDetailComponent implements OnInit {

  bookId: string;
  bookDetailsForm: FormGroup;
  bookData: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private booksService: BooksService) { }

  ngOnInit() {

    this.bookId = this.route.snapshot.paramMap.get('id');
    this.bookDetailsForm = this.fb.group({
      title: '',
      isbn: '',
      shortDesc: '',
      longDesc: '',
      pageCount: '',
      publishedDate: '',
      thumbnailUrl: '',
      status: '',
      authors: '',
      categories: ''
    });

    this.booksService.getBookById(this.bookId).subscribe( data =>  {
      this.bookData = data ;
      this.bookDetailsForm.patchValue({
        title: this.bookData.title,
        isbn: this.bookData.isbn,
        shortDesc: this.bookData.shortDescription || '',
        longDesc: this.bookData.longDescription || '',
        status: this.bookData.status || '',
        pageCount: this.bookData.pageCount || '',
        authors: this.bookData.authors || '',
        categories: this.bookData.categories || ''
      });
    });

  }

  updateFormValues(bookDetailsFormData) {
    if (bookDetailsFormData) {
      this.bookData = this.bookDetailsForm;
    }

    console.log(bookDetailsFormData);
    this.booksService.updateBookData(this.bookId, bookDetailsFormData).subscribe(data => {
      console.log(' data ', data);
    });
  }

}
