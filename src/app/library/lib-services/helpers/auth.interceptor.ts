import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.authdata) {
      // request = request.clone({
      //   setHeaders: {
      //       Authorization: `Basic ${currentUser.authdata}`
      //   }
      // });
    }
    return next.handle(request);
  }
}
