import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/shared/models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = 'http://localhost:7000';
  private currentUserSubject: BehaviorSubject<string>;
  public currentUser: Observable<string>;


  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<string>('');
    this.currentUser = this.currentUserSubject.asObservable();
  }

  updateUserValue(user: any) {
    this.currentUserSubject.next(user);
  }

  login({username, password} ) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get(this.BASE_URL + '/login', {headers});
  }

  register(body: User) {
    return this.http.post(this.BASE_URL + '/signup', body);
  }

  setToken(token) {
    localStorage.setItem('jwt', token);
  }

  removeToken() {
    localStorage.removeItem('jwt');
  }

  getToken() {
    return localStorage.getItem('jwt');
  }

  isAuthenticated(): boolean {
    return this.getToken() ? true : false;
  }

  /** TBD
   */
  isTokenExpired(token: string) {
    return false;
  }
}
