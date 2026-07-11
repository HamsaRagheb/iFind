import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { catchError, map, of } from 'rxjs';

export const userGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);
  const decodedToken = _authService.decodeToken();

  if (decodedToken) {
    return _authService.verifyToken().pipe(
      map((verifyRes) => {
        if (verifyRes.message === 'verified' && verifyRes.decoded?.id) {
          _router.navigate(['/home']);
          return false;
        }
        return true;
      }),
      catchError(() => {
        return of(true);
      }),
    );
  }
  return of(true);
};
