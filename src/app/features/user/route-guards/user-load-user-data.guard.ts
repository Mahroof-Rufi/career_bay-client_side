import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../../../store/user-store/user.model';
import { loadUser } from '../../../store/user-store/user.actions';

export const userLoadUserDataGuard: CanActivateFn = (route, state) => {

  const userStore = inject(Store<{ user:User }>)
  userStore.dispatch(loadUser())
  return true;
};
