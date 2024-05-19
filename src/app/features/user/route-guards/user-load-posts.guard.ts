import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../../../store/user-store/user.model';
import { loadPosts } from '../../../store/user-store/user.actions';

export const userLoadPostsGuard: CanActivateFn = (route, state) => {
  const UserStore = inject(Store<{ user:User }>)

  UserStore.dispatch(loadPosts())
  return true;
};
