import { adminReducer } from '../store/admin.reducer';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadUsers } from '../store/admin.actions';
import { adminStateModel } from '../store/admin.model';

export const loadUsersGuard: CanActivateFn = (route, state) => {
  
  const adminStore = inject(Store<{ admin:adminStateModel }>)  
  adminStore.dispatch(loadUsers())
  return true;
};
