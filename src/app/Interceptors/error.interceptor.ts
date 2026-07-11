import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SweetAlertService } from '../Services/sweet-alert.service';
import { catchError, throwError } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../Services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const _router = inject(Router);
  const _sweetAlert = inject(SweetAlertService);
  const _translate = inject(TranslateService);
  const _authService = inject(AuthService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (!err.status) {
        _sweetAlert.error(
          _translate.instant('ERRORS.NETWORK_TITLE'),
          _translate.instant('ERRORS.NETWORK_MESSAGE'),
        );
        return throwError(() => err);
      }

      switch (err.status) {
        case 401:
          _authService.logout();
          _sweetAlert.error(
            _translate.instant('ERRORS.UNAUTHORIZED_TITLE'),
            _translate.instant('ERRORS.UNAUTHORIZED_MESSAGE'),
          );
          break;

        case 403:
          _sweetAlert.error(
            _translate.instant('ERRORS.FORBIDDEN_TITLE'),
            _translate.instant('ERRORS.FORBIDDEN_MESSAGE'),
          );
          break;

        case 404:
          _sweetAlert.error(
            _translate.instant('ERRORS.NOT_FOUND_TITLE'),
            _translate.instant('ERRORS.NOT_FOUND_MESSAGE'),
          );
          break;

        case 405:
          _sweetAlert.error(
            _translate.instant('ERRORS.METHOD_NOT_ALLOWED_TITLE'),
            _translate.instant('ERRORS.METHOD_NOT_ALLOWED_MESSAGE'),
          );
          break;

        case 409:
          _sweetAlert.error(
            _translate.instant('ERRORS.CONFLICT_TITLE'),
            _translate.instant('ERRORS.CONFLICT_MESSAGE'),
          );

          _router.navigate(['/signIn']);
          break;

        case 422:
          _sweetAlert.error(
            _translate.instant('ERRORS.VALIDATION_TITLE'),
            err.error?.message ||
              _translate.instant('ERRORS.VALIDATION_MESSAGE'),
          );
          break;

        case 500:
          _sweetAlert.error(
            _translate.instant('ERRORS.SERVER_ERROR_TITLE'),
            _translate.instant('ERRORS.SERVER_ERROR_MESSAGE'),
          );
          break;

        default:
          _sweetAlert.error(
            _translate.instant('ERRORS.ERROR_TITLE'),
            err.error?.message || _translate.instant('ERRORS.ERROR_MESSAGE'),
          );
          break;
      }

      return throwError(() => err);
    }),
  );
};
