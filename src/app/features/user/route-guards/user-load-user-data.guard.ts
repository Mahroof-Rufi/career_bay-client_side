import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../user-store/user.model';
import { loadUser } from '../user-store/user.actions';

export const userLoadUserDataGuard: CanActivateFn = (route, state) => {

  const userStore = inject(Store<{ user:User }>)
  userStore.dispatch(loadUser())
  return true;
};
