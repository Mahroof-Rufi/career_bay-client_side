import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const employerAuthGuard: CanActivateFn = (route, state) => {

    const router = inject(Router)
  
    const token = localStorage.getItem('employerToken')
    const userData = localStorage.getItem('employerData')
    if (token && userData) {
      return true;
    } else {
      router.navigateByUrl('/home')
      return false
    }
  };
