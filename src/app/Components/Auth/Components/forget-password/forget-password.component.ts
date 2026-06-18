import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../Services/auth.service';
import { SweetAlertService } from '../../../../Services/sweet-alert.service';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  isLoading = false;

  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private _authService: AuthService,
    private _sweetAlert: SweetAlertService,
    private _router: Router,
  ) {}

  onSendEmail() {
    this.emailForm.markAllAsTouched();
    if (this.emailForm.invalid) return;

    this.isLoading = true;
    const email = this.emailForm.get('email')?.value!;

    this._authService.forgetPassword(email).subscribe({
      next: () => {
        this.isLoading = false;
        this._sweetAlert.toast('success', 'Reset code sent to your email!');
        this._router.navigateByUrl('/verify-reset-code', { state: { email } });
      },
      error: () => (this.isLoading = false),
    });
  }
}
