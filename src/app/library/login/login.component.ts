import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../lib-services/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';

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
  // redirect to home if already logged in
  if (this.authService.currentUserValue) {
    this.router.navigateByUrl('/');
  }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: '',
      password: ''
    });
  }

  login(value) {
    this.authService.login(value).subscribe((user: User) => {
      if (user) {
        this.router.navigateByUrl('/');
      }
    });
  }

}
