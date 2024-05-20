import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { adminStateModel } from '../store/admin.model';
import { loadUsers } from '../store/admin.actions';

export const loadUsersGuard: CanActivateFn = (route, state) => {
  
  const adminStore = inject(Store<{ admin:adminStateModel }>)
  adminStore.dispatch(loadUsers())
  return true;
};
