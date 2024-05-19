import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { Employer } from '../../../store/employer-store/employer.model';
import { loadEmployerPosts } from '../../../store/employer-store/employer.actions';

export const loadEmployerPostsGuard: CanActivateFn = (route, state) => {
  const employerState = inject(Store<{employer:Employer}>)
  employerState.dispatch(loadEmployerPosts())
  
  return true;
};
