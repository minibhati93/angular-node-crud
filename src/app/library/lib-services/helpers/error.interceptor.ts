import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthService,
              private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          if (error.status === 401) {
            this.router.navigateByUrl('/login');
          }
        }
        return throwError(error);
    }));
  }
}
