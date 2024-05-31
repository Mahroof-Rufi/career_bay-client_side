import { HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs';

export const setTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next) => {

  const userAccessToken = localStorage.getItem('userAccessToken');
  const employerAccessToken = localStorage.getItem('employerAccessToken')
  const adminAccessToken = localStorage.getItem('adminAccessToken')

  let newReq
  if(userAccessToken) {
    newReq = req.clone({ headers: req.headers.set('User-Token', userAccessToken) }) 
  } else if (employerAccessToken) {
    newReq = req.clone({ headers: req.headers.set('Employer-Token', employerAccessToken) })
  } else if (adminAccessToken) {
    newReq = req.clone({ headers: req.headers.set('Admin-Token', adminAccessToken) }) 
  } else {
    newReq = req
  }

  return next(newReq).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        
        const userAccessToken = (event as HttpResponse<any>).body?.user?.accessToken;
        const userRefreshToken = (event as HttpResponse<any>).body?.user?.refreshToken;

        const employerAccessToken = (event as HttpResponse<any>).body?.employer?.accessToken;
        const employerRefreshToken = (event as HttpResponse<any>).body?.employer?.refreshToken;

        const adminAccessToken = (event as HttpResponse<any>).body?.admin?.accessToken;
        const adminRefreshToken = (event as HttpResponse<any>).body?.admin?.refreshToken;

        if (userAccessToken && userRefreshToken) {
          localStorage.setItem('userAccessToken', userAccessToken);
          localStorage.setItem('userRefreshToken', userRefreshToken);
        } else if (employerAccessToken && employerRefreshToken) {
          localStorage.setItem('employerAccessToken', employerAccessToken);
          localStorage.setItem('employerRefreshToken', employerRefreshToken);
        } else if (adminAccessToken && adminRefreshToken) {
          localStorage.setItem('adminAccessToken', adminAccessToken);
          localStorage.setItem('adminRefreshToken', adminRefreshToken);
        }
      }
    })
  );
  
};
