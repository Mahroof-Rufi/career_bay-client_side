import { HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs';

export const setTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next) => {

  const userAccessToken = localStorage.getItem('userAccessToken');
  const employerToken = localStorage.getItem('employerToken')
  const adminToken = localStorage.getItem('adminToken')

  let newReq
  if(userAccessToken) {
    newReq = req.clone({ headers: req.headers.set('User-Token', userAccessToken) }) 
  } else if (employerToken) {
    newReq = req.clone({ headers: req.headers.set('Employer-Token', employerToken) })
  } else if (adminToken) {
    newReq = req.clone({ headers: req.headers.set('Admin-Token', adminToken) }) 
  } else {
    newReq = req
  }

  return next(newReq).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        
        const userAccessToken = (event as HttpResponse<any>).body?.user?.accessToken;
        const userRefreshToken = (event as HttpResponse<any>).body?.user?.refreshToken;
        const employerToken = (event as HttpResponse<any>).body?.employer?.token;
        const adminToken = (event as HttpResponse<any>).body?.admin?.adminToken;
        if (userAccessToken && userRefreshToken) {
          localStorage.setItem('userAccessToken', userAccessToken);
          localStorage.setItem('userRefreshToken', userRefreshToken);
        } else if (employerToken) {
          localStorage.setItem('employerToken', employerToken);
        } else if (adminToken) {
          localStorage.setItem('adminToken', adminToken)
        }
      }
    })
  );
  
};
