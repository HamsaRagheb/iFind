import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { AuthService } from '../../../../Services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { SignUpUser } from '../../../../Models/auth.model';

// 1. Define the custom cross-field validator
export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password');
  const rePassword = control.get('rePassword');

  if (password && rePassword && password.value !== rePassword.value) {
    rePassword.setErrors({ mismatch: true }); // set error directly on rePassword control
    return { mismatch: true };
  } else {
    // Clear only the mismatch error without removing other errors
    const errors = rePassword?.errors;
    if (errors) {
      delete errors['mismatch'];
      rePassword?.setErrors(Object.keys(errors).length ? errors : null);
    }
    return null;
  }
};

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  isLoading = false;

  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {}

  regForm = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#^])[A-Za-z\d@$!%*?&_#^]{8,32}$/,
        ),
        Validators.minLength(8),
      ]),
      rePassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^01[0125][0-9]{8}$'),
      ]),
    },
    {
      validators: passwordMatchValidator,
    },
  );

  onSignUp() {
    this.isLoading = true;
    this._authService
      .signUp(this.regForm.getRawValue() as SignUpUser)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.message === 'success') {
            this._router.navigate(['/signIn']);
          }
        },
        error: (err) => {
          this.isLoading = false;
        },
      });
  }
}
