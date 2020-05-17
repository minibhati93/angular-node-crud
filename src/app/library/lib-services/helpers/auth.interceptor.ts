import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    const token = localStorage.getItem('jwt');
    if (token) {
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
