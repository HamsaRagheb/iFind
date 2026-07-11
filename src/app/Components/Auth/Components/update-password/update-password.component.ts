import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../Services/auth.service';
import { Subscription } from 'rxjs';
import { ChangePasswordPayload } from '../../../../Models/auth.model';
import { SweetAlertService } from '../../../../Services/sweet-alert.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password');
  const rePassword = control.get('rePassword');

  if (password && rePassword && password.value !== rePassword.value) {
    rePassword.setErrors({ mismatch: true });
    return { mismatch: true };
  } else {
    const errors = rePassword?.errors;
    if (errors) {
      delete errors['mismatch'];
      rePassword.setErrors(Object.keys(errors).length ? errors : null);
    }
    return null;
  }
};

@Component({
  selector: 'app-update-password',
  imports: [ReactiveFormsModule, CommonModule, TranslatePipe],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css',
})
export class UpdatePasswordComponent {
  isLoading = false;
  private subscription!: Subscription;

  constructor(
    private _authService: AuthService,
    private _sweetAlert: SweetAlertService,
    private _router: Router,
  ) {}

  passwordForm = new FormGroup(
    {
      currentPassword: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#^])[A-Za-z\d@$!%*?&_#^]{8,32}$/,
        ),
      ]),
      rePassword: new FormControl('', [Validators.required]),
    },
    {
      validators: passwordMatchValidator,
    },
  );

  onChangePassword() {
    this.isLoading = true;
    this.subscription = this._authService
      .updatePassword(this.passwordForm.getRawValue() as ChangePasswordPayload)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          this._sweetAlert.success(
            'Password Updated!',
            'Your password has been changed successfully.',
          );
          this._router.navigate(['/profile']);
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
