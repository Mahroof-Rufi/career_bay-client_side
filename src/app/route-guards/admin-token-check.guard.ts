import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminTokenCheckGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  const token = localStorage.getItem('adminToken')
  if (!token) {
    
    return true;
  } else {
    
    router.navigateByUrl('admin/dashboard')
    return false
  }
};
