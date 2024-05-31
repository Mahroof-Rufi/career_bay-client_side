import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const userTokenCheckGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router)

  const token = localStorage.getItem('userAccessToken')
  if (!token) {
    console.log('if');
    
    return true;
  } else {
    console.log('else');
    
    router.navigateByUrl('user/dashboard')
    return false
  }

};
