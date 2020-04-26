import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = 'http://localhost:7000';

  constructor(private http: HttpClient) { }

  isLoggedIn() {
    return false;
  }

  login(body) {
    return this.http.post(this.BASE_URL + '/api/library/login', body);
  }
}
