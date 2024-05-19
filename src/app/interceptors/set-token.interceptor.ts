import { HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';

export const setTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next) => {

  const token = localStorage.getItem('userToken');
  const employerToken = localStorage.getItem('employerToken')
  const adminToken = localStorage.getItem('adminToken')

  let newReq
  if(token) {
    newReq = req.clone({ headers: req.headers.set('User-Token', token) }) 
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
        
        const responseToken = (event as HttpResponse<any>).body?.user?.token;
        const employerToken = (event as HttpResponse<any>).body?.employer?.token;
        const adminToken = (event as HttpResponse<any>).body?.admin?.adminToken;
        if (responseToken) {
          localStorage.setItem('userToken', responseToken);
        } else if (employerToken) {
          localStorage.setItem('employerToken', employerToken);
        } else if (adminToken) {
          localStorage.setItem('adminToken', adminToken)
        }
      }
    })
  );
  
};
