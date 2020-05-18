import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const login = /login/gi;
    const signup = /signup/gi;
    const token = localStorage.getItem('jwt');
    if (token && (request.url.search(login) === -1 && request.url.search(signup) === -1)) {
      request = request.clone({
        setHeaders: {
          'Content-Type':  'application/json',
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
