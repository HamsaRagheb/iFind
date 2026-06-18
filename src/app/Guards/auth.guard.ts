import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);

  const decodeToken = _authService.decodeToken();
  // Step 1: Token exists at all or it's valid?
  if (!decodeToken) {
    _authService.logout();
    return false;
  }
  // Step 2: Verify token with backend
  return _authService.verifyToken().pipe(
    map((verifyRes) => {
      if (verifyRes.message === 'verified' && verifyRes.decoded?.id) {
        return true;
      }
      _authService.logout();
      return false;
    }),
    catchError(() => {
      _authService.logout();
      return of(false);
    }),
  );
};
