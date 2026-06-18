import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import {
  AuthResponse,
  ChangePasswordPayload,
  ForgetPasswordResponse,
  SignInUser,
  SignUpUser,
  UsersResponse,
  VerifyTokenResponse,
} from '../Models/auth.model';

/************************************************************************ */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Check localStorage on app start => Shared Variable
  private isLoggedIn = new BehaviorSubject<boolean>(
    !!localStorage.getItem('userToken'),
  );

  // public stream that components will subscribe to
  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
  ) {}

  // Method (setLoggedIn) to update the login state
  setLoggedIn(value: boolean) {
    this.isLoggedIn.next(value);
  }

  //Post => SignUp Method
  signUp(payload: SignUpUser): Observable<AuthResponse> {
    return this._httpClient.post<AuthResponse>(
      `${environment.baseUrl}/auth/signup`,
      payload,
    );
  }

  //Post => SignIn Method
  signIn(payload: SignInUser): Observable<AuthResponse> {
    return this._httpClient.post<AuthResponse>(
      `${environment.baseUrl}/auth/signin`,
      payload,
    );
  }

  //Post => Forgot Password
  forgetPassword(email: string): Observable<ForgetPasswordResponse> {
    return this._httpClient.post<ForgetPasswordResponse>(
      `${environment.baseUrl}/auth/forgotPasswords`,
      {
        email,
      },
    );
  }

  // Post => Verify Reset Code
  verifyResetCode(resetCode: string): Observable<any> {
    return this._httpClient.post(
      `${environment.baseUrl}/auth/verifyResetCode`,
      { resetCode },
    );
  }
  // PUT => Reset Password (after OTP verification)
  resetPassword(email: string, newPassword: string): Observable<AuthResponse> {
    return this._httpClient.put<AuthResponse>(
      `${environment.baseUrl}/auth/resetPassword`,
      { email, newPassword },
    );
  }
  // Get => Verify token Method
  verifyToken(): Observable<VerifyTokenResponse> {
    return this._httpClient.get<VerifyTokenResponse>(
      `${environment.baseUrl}/auth/verifyToken`,
    );
  }

  //jwt-decode: for token decoding locally (no HttpClient call)
  decodeToken(): VerifyTokenResponse['decoded'] | null {
    const token = localStorage.getItem('userToken');

    if (!token) return null;

    try {
      return jwtDecode<VerifyTokenResponse['decoded']>(token);
    } catch {
      return null;
    }
  }

  // Get => Get all users Method
  getAllUsers(): Observable<UsersResponse> {
    return this._httpClient.get<UsersResponse>(`${environment.baseUrl}/users`);
  }

  //Put => Update Logged user password
  updatePassword(payload: ChangePasswordPayload): Observable<AuthResponse> {
    return this._httpClient.put<AuthResponse>(
      `${environment.baseUrl}/users/changeMyPassword`,
      payload,
    );
  }
  // Logout Method
  logout(): void {
    localStorage.removeItem('userToken');
    this.setLoggedIn(false);
    this._router.navigate(['/signIn']);
  }
}
