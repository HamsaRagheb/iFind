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
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  isLoading = false;
  private subscription!: Subscription;

  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private _authService: AuthService,
    private _sweetAlert: SweetAlertService,
    private _router: Router,
    private _translate: TranslateService,
  ) {}

  onSendEmail() {
    this.isLoading = true;
    const email = this.emailForm.get('email')?.value!;

    this.subscription = this._authService.forgetPassword(email).subscribe({
      next: () => {
        this.isLoading = false;
        this._sweetAlert.toast(
          'success',
          this._translate.instant('AUTH.FORGET_PASSWORD.RESET_CODE_SENT'),
        );
        this._router.navigateByUrl('/verify-reset-code', { state: { email } });
      },
      error: () => (this.isLoading = false),
    });
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
