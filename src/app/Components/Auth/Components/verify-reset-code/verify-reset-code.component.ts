import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
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

@Component({
  selector: 'app-verify-reset-code',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './verify-reset-code.component.html',
  styleUrl: './verify-reset-code.component.css',
})
export class VerifyResetCodeComponent implements OnInit {
  @ViewChildren('otpInputs') otpInputs!: QueryList<
    ElementRef<HTMLInputElement>
  >;

  isLoading = false;
  email = ''; // received from forget-password page

  otpForm = new FormGroup({
    digit0: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]'),
    ]),
    digit1: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]'),
    ]),
    digit2: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]'),
    ]),
    digit3: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]'),
    ]),
    digit4: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]'),
    ]),
    digit5: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]'),
    ]),
  });

  constructor(
    private _authService: AuthService,
    private _sweetAlert: SweetAlertService,
    private _router: Router,
    private _translate: TranslateService,
  ) {}

  ngOnInit() {
    // Read the email passed from forget-password page
    this.email = history.state?.email ?? '';

    // If someone navigates here directly without going through forget-password, redirect them
    if (!this.email) {
      this._router.navigate(['/forget-password']);
    }
  }

  onVerify() {
    this.isLoading = true;
    const code = Object.values(this.otpForm.value).join('');

    this._authService.verifyResetCode(code).subscribe({
      next: (res) => {
        this.isLoading = false;

        if (res.status === 'Success') {
          this._sweetAlert.success(
            this._translate.instant('AUTH.VERIFY_RESET_CODE.SUCCESS_TITLE'),
            this._translate.instant('AUTH.VERIFY_RESET_CODE.SUCCESS_MESSAGE'),
          );

          this._router.navigateByUrl('/reset-password', {
            state: { email: this.email },
          });
        }
      },
      error: () => (this.isLoading = false),
    });
  }

  private getInputs(): HTMLInputElement[] {
    return this.otpInputs.toArray().map((el) => el.nativeElement);
  }

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/[^0-9]/g, '');
    input.value = value;
    this.otpForm.get('digit' + index)?.setValue(value);
    if (value && index < 5) this.getInputs()[index + 1].focus();
  }

  onKeydown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace') {
      const current = this.getInputs()[index];
      if (!current.value && index > 0) this.getInputs()[index - 1].focus();
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pasted =
      event.clipboardData?.getData('text').replace(/[^0-9]/g, '') ?? '';
    const digits = pasted.slice(0, 6).split('');
    const inputs = this.getInputs();
    digits.forEach((digit, i) => {
      inputs[i].value = digit;
      this.otpForm.get('digit' + i)?.setValue(digit);
    });
    inputs[Math.min(digits.length - 1, 5)].focus();
  }
}
