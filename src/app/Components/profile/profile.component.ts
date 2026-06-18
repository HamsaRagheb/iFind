import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VerifyTokenResponse } from '../../Models/auth.model';
import { AuthService } from '../../Services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user: VerifyTokenResponse['decoded'] | null = null;
  userEmail: string | null = '';
  constructor(private _auth: AuthService) {}

  ngOnInit() {
    this.user = this._auth.decodeToken();
    this.userEmail = localStorage.getItem('userEmail');
  }

  ngOnDestroy() {}
}
