import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SweetAlertService } from '../../../Services/sweet-alert.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe, ReactiveFormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private _sweetAlert: SweetAlertService) {}

  onSubscribe() {
    const emailControl = this.emailForm.get('email');

    // Mark as touched so errors show in the template too
    emailControl?.markAsTouched();

    if (!emailControl?.value) {
      this._sweetAlert.warning(
        'Email Required',
        'Please enter your email address.',
      );
    } else if (emailControl.invalid) {
      this._sweetAlert.error(
        'Invalid Email',
        'Please enter a valid email address.',
      );
    } else {
      this._sweetAlert.success(
        'Subscribed!',
        'Thank you for subscribing to our newsletter.',
      );
      this.emailForm.reset();
    }
  }
}
