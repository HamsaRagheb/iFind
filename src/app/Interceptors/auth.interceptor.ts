import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('userToken');

  // If no token, send request as-is (login/signup calls)
  if (!token) {
    return next(req);
  }
  // If token exists, clone request and add token to headers
  const cloneReq = req.clone({
    headers: req.headers.set('token', token),
  });
  return next(cloneReq);
};
