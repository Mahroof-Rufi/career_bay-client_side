import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const validateUserTokenGuard: CanActivateChildFn = (route, state) => {

  const router = inject(Router);

  if (localStorage.getItem('userAccessToken')) {
    return true;
  } else {
    router.navigateByUrl('/home')
    return false;
  }
};
