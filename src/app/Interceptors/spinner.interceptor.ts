import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const _spinner = inject(NgxSpinnerService);

  _spinner.show();
  document.body.classList.add('spinner-active');
  return next(req).pipe(
    finalize(() => {
      _spinner.hide();
      document.body.classList.remove('spinner-active');
    }),
  );
};
