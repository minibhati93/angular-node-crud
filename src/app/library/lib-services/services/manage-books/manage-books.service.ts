import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageBooksService {

  /*
  @inprogressCountSubject: Returns the inprogress count as a Behaviour Subject
  @readCountSubject: Returns the read count as a Behaviour Subject
  */
  private BASE_URL = 'http://localhost:7000/api';
  public inprogressCountSubject$: BehaviorSubject<number>;
  public readCountSubject$: BehaviorSubject<number>;

  constructor(private http: HttpClient) {
    this.inprogressCountSubject$ = new BehaviorSubject<number>(0);
    this.readCountSubject$ = new BehaviorSubject<number>(0);
  }

  addBooksToUnreadBucket(books: Array<string>, userId: string) {
    return this.http.post(this.BASE_URL + '/library/add/unread', {userId, books});
  }

  booksReadCount(userId: string, status: string) {
    return this.http.get(this.BASE_URL + '/library/count/' + status + '/' + userId);
  }

  get getInProgressReadCount$() {
    return this.inprogressCountSubject$.value;
  }

  get getReadCount$() {
    return this.readCountSubject$.value;
  }
}
