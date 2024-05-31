import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  const token = localStorage.getItem('adminAccessToken')
  if (token) {
    return true;
  } else {
    router.navigateByUrl('admin/login')
    return false
  }
};
