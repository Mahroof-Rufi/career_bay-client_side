import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';
import { catchError, throwError } from 'rxjs';
import { AuthApiService } from '../services/auth-api-service.service';

export const handleUnauthorizedResInterceptor: HttpInterceptorFn = (req, next) => {

  const authAPIs = inject(AuthApiService)
  const alert = inject(TuiAlertService)

  return next(req).pipe(
    catchError((err: any) => {

      if (err instanceof HttpErrorResponse) {

        if (err.status === 401) {
          switch (err.error.message) {
            case 'Unauthorized user access denied':
            case 'User token expired':
              const userRefreshToken = localStorage.getItem('userRefreshToken');
              authAPIs.userRefreshToken(userRefreshToken)
              break;

            case 'Unauthorized employer access denied':
            case 'Employer token expired':
              const employerRefreshToken = localStorage.getItem('employerRefreshToken');
              authAPIs.employerRefreshToken(employerRefreshToken)
              break;

            case 'Unauthorized admin access denied':
            case 'Admin token expired':
              const adminRefreshToken = localStorage.getItem('adminRefreshToken');
              authAPIs.adminRefreshToken(adminRefreshToken)
              break;
          }

        } else {
          alert.open('', {
            label: err.error.message,
            status: 'error',
            autoClose: false,
            hasCloseButton: true
          }).subscribe()
        }
      } else {
        console.log('An error occurred:', err);
      }

      return throwError(() => err);
    })
  );;
};
