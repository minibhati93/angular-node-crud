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
  bookData: BookInterface;

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
      status: ''
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.name);
    console.log('Email', form.value.email);
    console.log('Message', form.value.message);
  }

}
