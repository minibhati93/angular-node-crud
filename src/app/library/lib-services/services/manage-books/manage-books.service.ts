import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManageBooksService {

  private BASE_URL = 'http://localhost:7000';

  constructor(private http: HttpClient) { }

  addBooksToUnreadBucket(books: Array<string>, userId) {
    return this.http.post(this.BASE_URL + '/library/books/unread', {userId, books});
  }
}
