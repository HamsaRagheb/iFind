import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../Services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SignInUser } from '../../../../Models/auth.model';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  isLoading = false;
  userIsLogin = false;

  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {}

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  onSignIn() {
    this.isLoading = true;
    this._authService
      .signIn(this.signInForm.getRawValue() as SignInUser)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          this.userIsLogin = true;
          localStorage.setItem('userToken', res.token!);
          localStorage.setItem('userEmail', res.user?.email!);
          this._authService.setLoggedIn(true);
          this._router.navigate(['/home'], {
            queryParams: { welcome: 'true' },
          });
        },
        error: (err) => {
          this.isLoading = false;
        },
      });
  }
}
