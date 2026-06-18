import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  success(title: string, message: string = '') {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      confirmButtonColor: 'var(--soft-pink)',
    });
  }

  error(title: string, message: string = '') {
    Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      confirmButtonColor: 'var(--soft-pink)',
    });
  }

  warning(title: string, message: string = '') {
    Swal.fire({
      icon: 'warning',
      title: title,
      text: message,
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
    }).fire({ icon, title });
  }

  confirm(
    title: string = 'Are you sure?',
    message: string = "You won't be able to revert this!",
  ): Promise<boolean> {
    return Swal.fire({
      title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--dark-blue)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
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
      title: options.title ?? '',
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
