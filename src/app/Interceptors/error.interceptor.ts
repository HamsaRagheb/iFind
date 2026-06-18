import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SweetAlertService } from '../Services/sweet-alert.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const _router = inject(Router);
  const _sweetAlert = inject(SweetAlertService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (!err.status || err.status === 0) {
        _sweetAlert.error(
          'Network Error',
          'Please check your internet connection and try again.',
        );
        return throwError(() => err);
      }

      switch (err.status) {
        case 401:
          localStorage.removeItem('userToken');
          _router.navigate(['/login']);
          _sweetAlert.error('Unauthorized', 'Please log in to continue.');
          break;
        case 403:
          _sweetAlert.error(
            'Forbidden',
            'You do not have permission to access this resource.',
          );
          break;
        case 404:
          _sweetAlert.error(
            'Not Found',
            'The requested resource was not found.',
          );
          break;
        case 405:
          _sweetAlert.error(
            'Method Not Allowed',
            'The requested method is not allowed for this resource.',
          );
          break;
        case 409:
          _sweetAlert.error(
            'Conflict',
            'The requested action could not be completed due to a conflict.',
          );
          break;
        case 422:
          _sweetAlert.error(
            'Validation Error',
            err.error?.message || 'Please check your input and try again.',
          );
          break;
        case 500:
          _sweetAlert.error(
            'Internal Server Error',
            'Something went wrong on our end.',
          );
          break;
        default:
          _sweetAlert.error(
            'Error',
            err.error?.message ||
              'An unexpected error occurred. Please try again later.',
          );
          break;
      }

      return throwError(() => err);
    }),
  );
};
