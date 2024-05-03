import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userAuthGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)

  const token = localStorage.getItem('userToken')
  if (token) {    
    return true;
  } else {
    router.navigateByUrl('/home')
    return false
  }
};
