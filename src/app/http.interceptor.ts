import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('req', req);

  // Token toevoegen aan de requests
  let token = localStorage.getItem('WT_TOKEN');
  if (!!token) {
    console.log('Token is bekend: ' + token);

    // Clone the request and add the authorization header
    const cloneReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(cloneReq);
  }

  return next(req);
};
