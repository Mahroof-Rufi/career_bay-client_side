import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAPIServiceService } from '../services/user-api-service.service';

export const isUserAllowedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userAPIs = inject(UserAPIServiceService)

  userAPIs.isUserBlocked().subscribe({
    next: res => {
      return true
    },
    error: err => {
      router.navigateByUrl('/home');
      return false
    }
  })
  return true;
};
