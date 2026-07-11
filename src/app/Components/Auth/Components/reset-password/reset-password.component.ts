import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../Services/auth.service';
import { SweetAlertService } from '../../../../Services/sweet-alert.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

// Custom validator: confirm must match password
const passwordMatchValidator: ValidatorFn = (form: AbstractControl) => {
  const password = form.get('newPassword')?.value;
  const confirm = form.get('confirmPassword')?.value;
  return password === confirm ? null : { mismatch: true };
};

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  isLoading = false;
  email = '';

  resetForm = new FormGroup(
    {
      newPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#^])[A-Za-z\d@$!%*?&_#^]{8,32}$/,
        ),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: passwordMatchValidator },
  );

  constructor(
    private _authService: AuthService,
    private _sweetAlert: SweetAlertService,
    private _router: Router,
    private _translate: TranslateService,
  ) {}

  ngOnInit() {
    this.email = history.state?.email ?? '';
    if (!this.email) {
      this._router.navigate(['/forget-password']);
    }
  }

  onReset() {
    this.isLoading = true;
    const newPassword = this.resetForm.get('newPassword')?.value!;

    this._authService.resetPassword(this.email, newPassword).subscribe({
      next: () => {
        this.isLoading = false;
        this._sweetAlert.success(
          this._translate.instant('AUTH.RESET_PASSWORD.SUCCESS_TITLE'),
          this._translate.instant('AUTH.RESET_PASSWORD.SUCCESS_MESSAGE'),
        );
        this._router.navigate(['/signIn']);
      },
      error: () => (this.isLoading = false),
    });
  }
}
