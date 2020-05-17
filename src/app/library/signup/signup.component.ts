import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../lib-services/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  // redirect to home if already logged in
  if (this.authService.currentUserValue) {
    this.router.navigateByUrl('/');
  }
  }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
      role: 'user'
    });
  }

  signUp(value) {
    this.authService.register(value).subscribe((data: any) => {
      if (data) {
        if (data.response === 'success') {
          this.router.navigateByUrl('/login');
        }
      }
    }, err => console.log('eror in signup '));
  }
}
