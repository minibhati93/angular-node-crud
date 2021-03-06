import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private BASE_URL = 'http://localhost:7000';

  constructor(private http: HttpClient) { }

  getAllBooks() {
    return this.http.get(this.BASE_URL + '/api/books');
  }

  getBookByIsbn(isbn: string) {
    return this.http.get(this.BASE_URL + '/api/books/' + isbn);
  }

  getBookById(id: string) {
    return this.http.get(this.BASE_URL + '/api/books/' + id);
  }

  updateBookData(id, params) {
    return this.http.put(this.BASE_URL + '/api/books/' + id, params);
  }

  deleteBook(id) {
    return this.http.delete(this.BASE_URL + '/api/books/' + id);
  }
}
