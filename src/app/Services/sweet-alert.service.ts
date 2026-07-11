import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  constructor(private _translate: TranslateService) {}

  success(title: string, message: string = '') {
    Swal.fire({
      icon: 'success',
      title: this._translate.instant(title),
      text: message ? this._translate.instant(message) : '',
      confirmButtonText: this._translate.instant('SWEET_ALERT.OK'),
      confirmButtonColor: 'var(--soft-pink)',
    });
  }

  successWithAction(
    title: string,
    message: string = '',
    actionText: string = '',
  ): Promise<boolean> {
    return Swal.fire({
      icon: 'success',
      title: this._translate.instant(title),
      text: message ? this._translate.instant(message) : '',
      confirmButtonColor: 'var(--dark-blue)',
      confirmButtonText: this._translate.instant(actionText),
      showCancelButton: true,
      cancelButtonText: this._translate.instant(
        'SWEET_ALERT.CONTINUE_SHOPPING',
      ),
      cancelButtonColor: 'var(--soft-pink)',
    }).then((result) => result.isConfirmed);
  }

  error(title: string, message: string = '') {
    Swal.fire({
      icon: 'error',
      title: this._translate.instant(title),
      text: message ? this._translate.instant(message) : '',
      confirmButtonText: this._translate.instant('SWEET_ALERT.OK'),
      confirmButtonColor: 'var(--soft-pink)',
    });
  }

  warning(title: string, message: string = '') {
    Swal.fire({
      icon: 'warning',
      title: this._translate.instant(title),
      text: message ? this._translate.instant(message) : '',
      confirmButtonText: this._translate.instant('SWEET_ALERT.OK'),
      confirmButtonColor: 'var(--soft-pink)',
    });
  }

  toast(icon: SweetAlertIcon, title: string) {
    Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    }).fire({ icon, title: this._translate.instant(title) });
  }

  confirm(
    title: string = 'SWEET_ALERT.ARE_YOU_SURE',
    message: string = 'SWEET_ALERT.CANNOT_REVERT',
  ): Promise<boolean> {
    return Swal.fire({
      title: this._translate.instant(title),
      text: this._translate.instant(message),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--dark-blue)',
      cancelButtonColor: '#d33',
      confirmButtonText: this._translate.instant('SWEET_ALERT.YES_DELETE'),
      cancelButtonText: this._translate.instant('SWEET_ALERT.CANCEL'),
    }).then((result) => result.isConfirmed);
  }

  custom(
    options: {
      title?: string;
      width?: string | number;
      padding?: string | number;
      color?: string;
      background?: string;
      backdrop?: string | boolean;
      confirmButtonColor?: string;
    } = {},
  ) {
    Swal.fire({
      title: options.title ? this._translate.instant(options.title) : '',
      width: options.width ?? 600,
      padding: options.padding ?? '3em',
      color: options.color ?? 'var(--dark-blue)',
      confirmButtonColor: options.confirmButtonColor ?? 'var(--soft-pink)',
      background: options.background ?? '#fff url(/images/trees.png)',
      backdrop:
        options.backdrop ??
        `
    rgba(0,0,0,0.4)
    url("/images/nyan-cat.gif")
    left top
    no-repeat
  `,
    });
  }
}
