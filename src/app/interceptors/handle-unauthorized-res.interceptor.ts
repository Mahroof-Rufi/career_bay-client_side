import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Inject, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TuiAlertService } from '@taiga-ui/core';
import { catchError, throwError } from 'rxjs';
import { AuthApiService } from '../services/auth-api-service.service';

export const handleUnauthorizedResInterceptor: HttpInterceptorFn = (req, next) => {

  const alert = inject(TuiAlertService)
  const authAPIs = inject(AuthApiService)
  const router = inject(Router)
  
  return next(req).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {   
        if (err.status === 401) {
          console.log('going to start');
          
          const refreshToken = localStorage.getItem('userRefreshToken')

          authAPIs.userRefreshToken(refreshToken)
        } else {
          
          // console.log('HTTP log:', err);
        }
      } else {
        // Handle non-HTTP logs
        console.log('An error occurred:', err);
      }

      // Re-throw the error to propagate it further
      return throwError(() => err); 
    })
  );;
};
