import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../lib-services/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: '',
      password: ''
    });
  }

  login(value) {
    this.authService.login(value).subscribe((response: any) => {
      if (response.token) {
        if (!this.authService.getToken()) {
          this.authService.setToken(response.token);
        }
        this.router.navigateByUrl('/');
      }
    }, err => this.catchError(err));
  }

  catchError(err: HttpErrorResponse) {
    console.log(err);
  }

}
